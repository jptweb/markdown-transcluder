<?php

return [
    // GitHub API Configuration
    'github' => [
        'token' => null, // Your GitHub Personal Access Token (recommended) — https://github.com/settings/tokens
        'api_url' => 'https://api.github.com',
    ],

    // Cache Configuration
    'cache' => [
        'driver' => 'files', // files, redis, memcache, etc.
        'path' => __DIR__ . '/cache',
        'default_ttl' => 1800, // 30 minutes in seconds
        'min_refresh_interval' => 300, // 5 minutes — minimum cache age before refresh=1 can bypass
    ],

    // CORS Configuration
    'cors' => [
        'allowed_origins' => [
            'https://your-lms-domain.edu', // Replace with your LMS domain
            'http://localhost', // for local testing
        ],
        'allowed_methods' => ['GET', 'OPTIONS'],
        'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With'],
    ],

    // Response Configuration
    'response' => [
        'enable_markdown_conversion' => true,
        'rewrite_relative_urls' => true, // Convert relative links/images to absolute GitHub URLs
        'max_file_size' => 1048576, // 1MB in bytes
        'timeout' => 30, // seconds for GitHub API requests
    ]
];