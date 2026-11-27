import {
  clean,
  isEmail,
  letterHtml,
  mailConfigured,
  safeName,
  siteUrl,
  tableHtml,
  teamInbox,
  transporter,
} from '../../../lib/mailer';

// Psychiatrist registration request (the "Register" form at /psychiatrist/signup).
//   1. Emails the details to the team inbox (REGISTRATION_TO, else INQUIRY_TO).
//   2. Emails the psychiatrist a thank-you.
// The request itself is saved in Firestore by the browser (registrationRequests); the team
// creates the login on /team/registrations after cross-verifying.

// Light abuse guard: a few requests per address per 10 minutes (per server instance)
const hits = new Map();
function tooMany(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(request) {
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local';
  if (tooMany(ip)) {
    return Response.json({ ok: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  // Hidden "website" field: people never fill it, bots usually do
  if (clean(body.website)) return Response.json({ ok: true });

  const d = {
    name: clean(body.name, 120),
    email: clean(body.email, 200).toLowerCase(),
    workplace: clean(body.workplace, 160),
    phone: clean(body.phone, 20),
    city: clean(body.city, 80),
    privatePractice: ['yes', 'no'].includes(body.privatePractice) ? body.privatePractice : '',
    requestId: clean(body.requestId, 60),
  };

  if (!d.name || !d.email || !d.workplace || !d.city || body.selfDeclared !== true) {
    return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }
  if (!isEmail(d.email)) {
    return Response.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }
  if (!mailConfigured()) {
    console.error('psychiatrist-registration: SMTP_USER / SMTP_PASS are not set');
    return Response.json({ ok: false, error: 'Email is not configured' }, { status: 500 });
  }

  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const site = siteUrl(request);
  const reviewUrl = `${site}/team/registrations`;
  const rows = [
    ['Full name', d.name],
    ['Email', d.email],
    ['Hospital / Institution', d.workplace],
    ['Phone number', d.phone || '—'],
    ['City', d.city],
    ['Private practice', d.privatePractice ? (d.privatePractice === 'yes' ? 'Yes' : 'No') : '—'],
    ['Self-declaration', 'Confirmed: "I confirm that I am a certified practising psychiatrist"'],
    ['Submitted (IST)', submittedAt],
  ];

  const mail = transporter();
  const from = { name: 'Canxiol', address: process.env.SMTP_USER };

  try {
    // 1. Team
    await mail.sendMail({
      from: { name: `${safeName(d.name)} (via Canxiol website)`, address: process.env.SMTP_USER },
      to: teamInbox(),
      replyTo: d.email,
      // Fixed prefix so every request can be found with one mailbox search
      subject: `[Canxiol Psychiatrist Registration] ${d.name} — ${d.city}`,
      text:
        rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
        `\n\nAfter cross-verifying, create the login here: ${reviewUrl}` +
        (d.requestId ? '' : '\n(Note: this request was not saved to the team page — use "Create a login manually" there.)'),
      html:
        tableHtml(rows) +
        `<p style="font-family:Arial,sans-serif;font-size:14px;margin-top:18px">After cross-verifying, create the login on the
          <a href="${reviewUrl}">team registrations page</a>.</p>` +
        (d.requestId
          ? ''
          : '<p style="font-family:Arial,sans-serif;font-size:13px;color:#a33">This request was not saved to the team page — use “Create a login manually” there.</p>'),
    });

    // 2. Psychiatrist
    await mail.sendMail({
      from,
      to: d.email,
      replyTo: teamInbox(),
      subject: 'Thank you for registering with Canxiol',
      text:
        `Dear ${d.name},\n\n` +
        'Thank you for sharing your details with us. Our team will reach out to you with registration details soon.\n\n' +
        'Team Canxiol\nLeiutis Pharmaceuticals LLP',
      html: letterHtml(
        `<p>Dear ${safeName(d.name)},</p>
         <p>Thank you for sharing your details with us. Our team will reach out to you with registration details soon.</p>`
      ),
    });
  } catch (err) {
    console.error('psychiatrist-registration: failed to send email', err);
    return Response.json({ ok: false, error: 'Could not send email' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
