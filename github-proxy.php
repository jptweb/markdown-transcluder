<?php

// Suppress deprecation warnings from Parsedown on PHP 8.4+
// so they don't corrupt JSON output
error_reporting(E_ALL & ~E_DEPRECATED);

require_once 'vendor/autoload.php';

use Phpfastcache\CacheManager;
use Phpfastcache\Config\ConfigurationOption;

class GitHubProxy
{
    private $config;
    private $cache;

    public function __construct()
    {
        $this->config = require 'config.php';

        // Create cache directory BEFORE initializing cache manager
        if (!is_dir($this->config['cache']['path'])) {
            mkdir($this->config['cache']['path'], 0755, true);
        }

        // Initialize cache
        CacheManager::setDefaultConfig(new ConfigurationOption([
            'path' => $this->config['cache']['path']
        ]));

        $this->cache = CacheManager::getInstance($this->config['cache']['driver']);
    }

    public function handleRequest()
    {
        // Handle CORS preflight
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            $this->setCorsHeaders();
            http_response_code(200);
            exit;
        }

        $this->setCorsHeaders();

        // Get parameters
        $repo = $_GET['repo'] ?? null;
        $file = $_GET['file'] ?? null;
        $refresh = isset($_GET['refresh']);

        if (!$repo || !$file) {
            $this->sendError('Missing required parameters: repo and file');
            return;
        }

        try {
            $content = $this->getFileContent($repo, $file, $refresh);
            $this->sendSuccess($content);
        } catch (Exception $e) {
            $this->sendError($e->getMessage());
        }
    }

    private function getFileContent($repo, $file, $forceRefresh = false)
    {
        $cacheKey = 'github_' . md5($repo . $file);
        $timestampKey = $cacheKey . '_ts';

        // Try to get from cache first
        $cachedItem = $this->cache->getItem($cacheKey);
        if ($cachedItem->isHit()) {
            // If not a forced refresh, serve cache
            if (!$forceRefresh) {
                return $cachedItem->get();
            }

            // If forced refresh, only bypass cache if it's older than min_refresh_interval
            $tsItem = $this->cache->getItem($timestampKey);
            $cachedAt = $tsItem->isHit() ? $tsItem->get() : 0;
            $minInterval = $this->config['cache']['min_refresh_interval'] ?? 300;

            if ((time() - $cachedAt) < $minInterval) {
                return $cachedItem->get(); // Too soon, serve cache anyway
            }
        }

        // Fetch from GitHub API
        $url = $this->config['github']['api_url'] . '/repos/' . $repo . '/contents/' . $file;

        $headers = [
            'User-Agent: MyCourses-GitHub-Reader/1.0'
        ];

        if ($this->config['github']['token']) {
            $headers[] = 'Authorization: Bearer ' . $this->config['github']['token'];
        }

        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => implode("\r\n", $headers),
                'timeout' => $this->config['response']['timeout']
            ]
        ]);

        $response = @file_get_contents($url, false, $context);

        if ($response === false) {
            // Try to serve stale cache if available (re-check in case TTL config allows it)
            $cachedItem = $this->cache->getItem($cacheKey);
            $cachedValue = $cachedItem->get();
            if ($cachedValue !== null) {
                return $cachedValue;
            }
            throw new Exception('Failed to fetch from GitHub API');
        }

        $data = json_decode($response, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON response from GitHub');
        }

        if (isset($data['message'])) {
            throw new Exception('GitHub API Error: ' . $data['message']);
        }

        // Decode base64 content
        $content = base64_decode($data['content']);

        // Convert markdown to HTML if enabled
        if ($this->config['response']['enable_markdown_conversion'] &&
            $this->isMarkdownFile($file)) {
            $parsedown = new Parsedown();
            $content = $parsedown->text($content);

            // Rewrite relative URLs to absolute GitHub URLs
            if ($this->config['response']['rewrite_relative_urls'] ?? true) {
                $content = $this->rewriteRelativeUrls($content, $repo, $file);
            }
        }

        // Cache the result and record the timestamp
        $cachedItem = $this->cache->getItem($cacheKey);
        $cachedItem->set($content)->expiresAfter($this->config['cache']['default_ttl']);
        $this->cache->save($cachedItem);

        $tsItem = $this->cache->getItem($timestampKey);
        $tsItem->set(time())->expiresAfter($this->config['cache']['default_ttl']);
        $this->cache->save($tsItem);

        return $content;
    }

    private function rewriteRelativeUrls($html, $repo, $file)
    {
        // Get the directory of the current file for resolving relative paths
        $fileDir = dirname($file);
        if ($fileDir === '.') {
            $fileDir = '';
        }

        // Rewrite href and src attributes that are relative
        $html = preg_replace_callback(
            '/(href|src)=["\']([^"\']+)["\']/i',
            function ($matches) use ($repo, $fileDir) {
                $attr = $matches[1];
                $url = $matches[2];

                // Skip absolute URLs, anchors, mailto, tel, data URIs
                if (preg_match('/^(https?:\/\/|mailto:|tel:|data:|#)/', $url)) {
                    // Still add target="_blank" to absolute links
                    if ($attr === 'href' && preg_match('/^https?:\/\//', $url)) {
                        return $attr . '="' . $url . '" target="_blank" rel="noopener noreferrer"';
                    }
                    return $matches[0];
                }

                // Resolve the relative path
                $resolvedPath = $this->resolveRelativePath($fileDir, $url);

                // Images use raw.githubusercontent.com so they render inline
                if ($attr === 'src') {
                    $absoluteUrl = 'https://raw.githubusercontent.com/' . $repo . '/main/' . $resolvedPath;
                    return $attr . '="' . $absoluteUrl . '"';
                }

                // Links go to github.com blob view and open in new tab
                $absoluteUrl = 'https://github.com/' . $repo . '/blob/main/' . $resolvedPath;
                return $attr . '="' . $absoluteUrl . '" target="_blank" rel="noopener noreferrer"';
            },
            $html
        );

        return $html;
    }

    private function resolveRelativePath($baseDir, $relativePath)
    {
        // Split any anchor or query string off the path
        $fragment = '';
        if (($pos = strpos($relativePath, '#')) !== false) {
            $fragment = substr($relativePath, $pos);
            $relativePath = substr($relativePath, 0, $pos);
        }

        // Combine base directory with relative path
        if ($baseDir !== '') {
            $path = $baseDir . '/' . $relativePath;
        } else {
            $path = $relativePath;
        }

        // Resolve ../ and ./ segments
        $parts = [];
        foreach (explode('/', $path) as $segment) {
            if ($segment === '..') {
                array_pop($parts);
            } elseif ($segment !== '.' && $segment !== '') {
                $parts[] = $segment;
            }
        }

        return implode('/', $parts) . $fragment;
    }

    private function isMarkdownFile($filename)
    {
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        return in_array($extension, ['md', 'markdown']);
    }

    private function setCorsHeaders()
    {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        $allowedOrigins = $this->config['cors']['allowed_origins'];

        // Check if origin is allowed
        $originAllowed = false;
        foreach ($allowedOrigins as $allowed) {
            if ($allowed === $origin ||
                (strpos($allowed, '*') !== false && $this->matchWildcard($allowed, $origin))) {
                $originAllowed = true;
                break;
            }
        }

        if ($originAllowed) {
            header('Access-Control-Allow-Origin: ' . $origin);
        }

        header('Access-Control-Allow-Methods: ' . implode(', ', $this->config['cors']['allowed_methods']));
        header('Access-Control-Allow-Headers: ' . implode(', ', $this->config['cors']['allowed_headers']));
        header('Access-Control-Allow-Credentials: true');
    }

    private function matchWildcard($pattern, $string)
    {
        return fnmatch($pattern, $string);
    }

    private function sendSuccess($content)
    {
        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'content' => $content,
            'timestamp' => time()
        ]);
    }

    private function sendError($message)
    {
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $message,
            'timestamp' => time()
        ]);
    }
}

// Handle the request with error catching to always return JSON
try {
    $proxy = new GitHubProxy();
    $proxy->handleRequest();
} catch (Throwable $e) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server configuration error. Check PHP error logs for details.',
        'timestamp' => time()
    ]);
    error_log('GitHubProxy fatal error: ' . $e->getMessage());
}