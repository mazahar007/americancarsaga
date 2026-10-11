<?php
// Shared helpers for the small PHP endpoints. Secrets live OUTSIDE public_html
// in acs-config.php (see deploy/acs-config.sample.php), never in this repo.
declare(strict_types=1);

function acs_config(): array {
    static $cfg = null;
    if ($cfg !== null) return $cfg;
    $candidates = [
        dirname(__DIR__, 2) . '/acs-config.php', // /home/USER/acs-config.php when site is in /home/USER/public_html
        dirname(__DIR__, 3) . '/acs-config.php',
    ];
    foreach ($candidates as $file) {
        if (is_file($file)) { $cfg = (array) require $file; return $cfg; }
    }
    $cfg = [];
    return $cfg;
}

function acs_cfg(string $key, string $default = ''): string {
    $v = acs_config()[$key] ?? getenv(strtoupper($key));
    return is_string($v) && $v !== '' ? $v : $default;
}
