# Markdown Transcluder

[Transclude](https://en.wikipedia.org/wiki/Transclusion) GitHub-hosted Markdown files directly into any web page — keep your notes centralized in a GitHub repo and pull them into LMS platforms (Brightspace/MyCourses, Canvas, etc.), internal wikis, or any HTML page. A PHP proxy fetches content server-side to bypass CORS restrictions, and a lightweight JavaScript widget renders it with GitHub-style formatting and syntax highlighting.

## How It Works

1. **Your web page** includes a small `<div>` with data attributes pointing to a GitHub repo and file
2. **The JavaScript widget** requests the content from your PHP proxy
3. **The PHP proxy** fetches the file from GitHub's API, converts Markdown to HTML, caches it, and returns it
4. **The widget** renders the content with GitHub-style styling and syntax highlighting

No iframes. No CORS issues. Content stays fresh via configurable caching.

## Quick Start

### 1. Install PHP dependencies

```bash
composer install
```

### 2. Configure

Copy `config.example.php` to `config.php` and fill in your settings:

```bash
cp config.example.php config.php
```

Add your GitHub token (optional but recommended — raises rate limit from 60 to 5,000 requests/hour) and update the CORS `allowed_origins` to include your site's domain.

### 3. Upload to your web server

Upload these files:
- `github-proxy.php`
- `config.php` (your configured copy — not tracked by git)
- `github-embed.js`
- `github-embed.css`
- `vendor/` (after composer install)

### 4. Embed in your page

```html
<link rel="stylesheet" href="https://your-server.com/path/to/github-embed.css">
<script src="https://your-server.com/path/to/github-embed.js"></script>

<div class="github-notes"
     data-repo="username/repo-name"
     data-file="notes/lecture-01.md"
     data-proxy-url="https://your-server.com/path/to/github-proxy.php">
</div>

<noscript>
  <p>JavaScript is required to display this content.
     <a href="https://github.com/username/repo-name/blob/main/notes/lecture-01.md">View on GitHub</a></p>
</noscript>
```

### Embed Generator

Don't want to write the HTML by hand? Open `generate-embed.html` in your browser — paste a GitHub URL and it generates the embed code for you with a copy button.

## Configuration

### Widget Data Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `data-repo` | Yes | GitHub repository (`username/repo-name`) |
| `data-file` | Yes | File path in repository (supports `#anchor` to scroll to a section) |
| `data-proxy-url` | No | URL to your proxy (defaults to `./github-proxy.php`) |
| `data-auto-refresh` | No | `"true"` to enable periodic refresh |
| `data-refresh-interval` | No | Refresh interval in seconds (default: 300) |
| `data-loading-text` | No | Custom loading message |
| `data-youtube-embeds` | No | `"true"` to upgrade YouTube links to embedded players (off by default) |

### Server Config (`config.php`)

```php
'cache' => [
    'driver' => 'files',              // or 'redis', 'memcache'
    'path' => __DIR__ . '/cache',
    'default_ttl' => 1800,            // 30 minutes — normal cache lifetime
    'min_refresh_interval' => 300,    // 5 minutes — minimum age before manual refresh can bypass cache
],
'cors' => [
    'allowed_origins' => [
        'https://your-lms.edu',
        'http://localhost',
    ],
],
'response' => [
    'enable_markdown_conversion' => true,
    'rewrite_relative_urls' => true,  // Convert relative links/images to absolute GitHub URLs
],
```

### JavaScript API

```javascript
// Manual initialization
window.initGitHubNotesWidget('.my-selector', {
    proxyUrl: 'https://your-server.com/github-proxy.php',
    autoRefresh: false,
    refreshInterval: 300000,
    showLastUpdated: true,
    showRefreshButton: true,
    loadingText: 'Loading notes...',
    maxRetries: 3,
    errorRetryDelay: 5000,
    youtubeEmbeds: false
});
```

## Features

- **Markdown to HTML** — automatic conversion via Parsedown
- **Relative URL rewriting** — relative links and images in markdown are rewritten to absolute GitHub URLs; links open in new tabs, images render inline
- **Caching** — configurable TTL with stale-content fallback on API failure
- **Rate limit protection** — server-side `min_refresh_interval` prevents manual refresh from exceeding API limits, regardless of how many users click refresh
- **Syntax highlighting** — embedded Prism.js (Dart, C-like, and more)
- **GitHub-style theme** — typography, code blocks, tables, blockquotes
- **Error handling** — retry logic with fallback "View on GitHub" link when all retries fail
- **YouTube embeds** — opt-in (`data-youtube-embeds="true"`) upgrades standalone YouTube links and thumbnail image-links to embedded `<iframe>` players; supports all YouTube URL formats and timestamps; uses privacy-enhanced `youtube-nocookie.com`
- **Anchor linking** — link to a specific section with `data-file="notes.md#section-name"` and the widget auto-scrolls to that heading after loading
- **Clickable header** — repo/file name in widget header links directly to the file on GitHub
- **Auto-refresh** — optional periodic content updates
- **Responsive** — mobile-friendly layout
- **Print-friendly** — clean output for printing
- **No-JS fallback** — `<noscript>` support with direct GitHub link

## LMS Integration Notes

This was originally built for **Brightspace/MyCourses** at RIT, but works with any platform that allows custom HTML content (Canvas, Blackboard, Moodle, WordPress, etc.).

**Brightspace/MyCourses:** Create an HTML content item and paste the embed code. Make sure your proxy server's domain is accessible from the LMS.

**CORS:** Update `allowed_origins` in `config.php` to include your LMS domain(s).

## Requirements

- PHP 7.4+ with `allow_url_fopen` enabled
- Write permissions for the `cache/` directory
- A GitHub Personal Access Token (recommended)

## File Structure

```
├── github-proxy.php       # PHP proxy — fetches from GitHub API, caches, rewrites URLs
├── config.example.php     # Example configuration (copy to config.php)
├── github-embed.js        # Client widget with Prism.js syntax highlighting
├── github-embed.css       # GitHub-style theme
├── generate-embed.html    # Embed code generator tool
├── example-embed.html     # Usage examples
├── composer.json          # PHP dependencies (phpFastCache, Parsedown)
├── cache/                 # Cache directory (auto-created)
└── vendor/                # Composer dependencies
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Unexpected token '<'" JSON error | PHP is outputting warnings before JSON. Check server PHP version and error logs. |
| Content not loading | Verify `data-repo` and `data-file` values. Test proxy directly: `github-proxy.php?repo=user/repo&file=path.md` |
| CORS errors | Add your page's origin to `allowed_origins` in `config.php` |
| Rate limited | Add a GitHub token to `config.php` (60/hr without, 5000/hr with) |
| Stale content | Use the refresh button or append `?refresh=1` to the proxy URL |
| Relative links broken | Ensure `rewrite_relative_urls` is `true` in `config.php` (default) |
