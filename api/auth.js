// GitHub login for the /admin panel (Decap CMS) when the site runs on Vercel.
// (On PHP hosting, public/api/auth.php does the same job.)
// Vercel → Project → Settings → Environment Variables:
//   GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET   (from your GitHub OAuth App)
// GitHub OAuth App callback URL: https://YOUR-SITE.vercel.app/api/auth
import crypto from 'node:crypto';

const COOKIE = 'acs_oauth_state';

function finish(res, status, payload) {
  const msg = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const js = JSON.stringify(msg).replace(/</g, '\\u003c');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(`<!doctype html><meta charset=utf-8><title>Signing in…</title><p>Signing in…</p><script>
(function () {
  var msg = ${js};
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
</script>`);
}

function readCookie(req, name) {
  const m = (req.headers.cookie || '').match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[1]) : '';
}

export default async function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID || '';
  const secret = process.env.GITHUB_CLIENT_SECRET || '';
  if (!clientId || !secret) {
    return finish(res, 'error', { message: 'Login is not configured: add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Vercel environment variables.' });
  }
  const query = req.query || {};

  // Step 1: send the user to GitHub
  if (!query.code) {
    const state = crypto.randomBytes(16).toString('hex');
    res.setHeader('Set-Cookie', `${COOKIE}=${state}; Path=/api/auth; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);
    const scope = query.scope === 'public_repo' ? 'public_repo' : 'repo';
    const url = 'https://github.com/login/oauth/authorize?' + new URLSearchParams({ client_id: clientId, scope, state });
    res.setHeader('Location', url);
    return res.status(302).end();
  }

  // Step 2: GitHub sent the user back — check state, swap code for a token
  const expected = readCookie(req, COOKIE);
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/api/auth; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
  const got = String(query.state || '');
  const ok = expected && got.length === expected.length && crypto.timingSafeEqual(Buffer.from(got), Buffer.from(expected));
  if (!ok) return finish(res, 'error', { message: 'Login expired or invalid. Please try again.' });

  try {
    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'americancarsaga-cms' },
      body: new URLSearchParams({ client_id: clientId, client_secret: secret, code: String(query.code) }),
    });
    const data = await r.json();
    if (!data.access_token) return finish(res, 'error', { message: 'GitHub did not return a token: ' + (data.error_description || 'unknown error') });
    return finish(res, 'success', { token: data.access_token, provider: 'github' });
  } catch (e) {
    return finish(res, 'error', { message: 'Could not reach GitHub. Please try again.' });
  }
}
