// Contact form handler when the site runs on Vercel (PHP hosting uses public/api/contact.php).
// Sends the message by email through Resend (resend.com — free tier available).
// Vercel → Project → Settings → Environment Variables:
//   RESEND_API_KEY   your Resend API key
//   CONTACT_TO       where messages go, e.g. you@example.com
//   CONTACT_FROM     a sender on a domain you verified in Resend, e.g. no-reply@americancarsaga.com
//                    (until you verify a domain, Resend's test sender onboarding@resend.dev works)

const clean = (v, max) => String(v ?? '').replace(/[\r\0]/g, '').trim().slice(0, max);

export default async function handler(req, res) {
  const go = (path) => { res.setHeader('Location', path); res.status(303).end(); };
  if (req.method !== 'POST') return go('/contact');

  const body = req.body && typeof req.body === 'object' ? req.body : Object.fromEntries(new URLSearchParams(String(req.body || '')));
  if (body.company) return go('/thank-you'); // spam trap: real people leave it empty

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const topic = clean(body.topic, 100);
  const message = clean(body.message, 5000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) return go('/contact?error=1');

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) return go('/contact?error=1');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `American Car Saga <${process.env.CONTACT_FROM || 'onboarding@resend.dev'}>`,
        to: [to],
        reply_to: email,
        subject: `[American Car Saga] ${topic || 'Message'} from ${name.replace(/\n/g, ' ')}`,
        text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}\n`,
      }),
    });
    return go(r.ok ? '/thank-you' : '/contact?error=1');
  } catch (e) {
    return go('/contact?error=1');
  }
}
