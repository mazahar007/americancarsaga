<?php
// GitHub login for the /admin panel (Decap CMS) — replaces Netlify's login service.
// GitHub OAuth App callback URL must be: https://YOUR-DOMAIN/api/auth.php
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

header('Cache-Control: no-store');
$clientId = acs_cfg('github_client_id');
$secret   = acs_cfg('github_client_secret');

function finish(string $status, array $payload): void {
    $msg = 'authorization:github:' . $status . ':' . json_encode($payload, JSON_UNESCAPED_SLASHES);
    $js  = json_encode($msg, JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
    header('Content-Type: text/html; charset=utf-8');
    echo "<!doctype html><meta charset=utf-8><title>Signing in…</title><p>Signing in…</p><script>
(function () {
  var msg = $js;
  var here = window.location.origin;
  var alt = here.indexOf('://www.') > -1 ? here.replace('://www.', '://') : here.replace('://', '://www.');
  function receive(e) {
    if (e.origin !== here && e.origin !== alt) return; // only our own site may receive the token
    window.opener.postMessage(msg, e.origin);
    window.removeEventListener('message', receive);
    setTimeout(function () { window.close(); }, 300);
  }
  window.addEventListener('message', receive);
  window.opener && window.opener.postMessage('authorizing:github', '*');
})();
</script>";
    exit;
}

if ($clientId === '' || $secret === '') {
    finish('error', ['message' => 'Login is not configured: acs-config.php with github_client_id / github_client_secret was not found.']);
}

session_set_cookie_params(['httponly' => true, 'secure' => !empty($_SERVER['HTTPS']), 'samesite' => 'Lax']);
session_start();

// Step 1: send the user to GitHub
if (!isset($_GET['code'])) {
    $state = bin2hex(random_bytes(16));
    $_SESSION['acs_oauth_state'] = $state;
    $scope = ($_GET['scope'] ?? 'repo') === 'public_repo' ? 'public_repo' : 'repo';
    header('Location: https://github.com/login/oauth/authorize?' . http_build_query([
        'client_id' => $clientId, 'scope' => $scope, 'state' => $state,
    ]));
    exit;
}

// Step 2: GitHub sent the user back — check state, swap code for a token
$expected = $_SESSION['acs_oauth_state'] ?? '';
unset($_SESSION['acs_oauth_state']);
if ($expected === '' || !hash_equals($expected, (string) ($_GET['state'] ?? ''))) {
    finish('error', ['message' => 'Login expired or invalid. Please try again.']);
}

$ch = curl_init('https://github.com/login/oauth/access_token');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_HTTPHEADER => ['Accept: application/json', 'User-Agent: americancarsaga-cms'],
    CURLOPT_POSTFIELDS => http_build_query([
        'client_id' => $clientId, 'client_secret' => $secret, 'code' => (string) $_GET['code'],
    ]),
]);
$res = curl_exec($ch);
curl_close($ch);
$data = is_string($res) ? json_decode($res, true) : null;

if (!is_array($data) || empty($data['access_token'])) {
    finish('error', ['message' => 'GitHub did not return a token: ' . ($data['error_description'] ?? 'unknown error')]);
}
finish('success', ['token' => $data['access_token'], 'provider' => 'github']);
