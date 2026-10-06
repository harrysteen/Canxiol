import nodemailer from 'nodemailer';

// Emails each "For Psychiatrists" form submission to INQUIRY_TO.
// Sends through the canxiol.com mailbox on GoDaddy (SMTP_* settings) — set them in
// .env.local locally, and in the hosting provider's environment variables in production.
const FIELD_LIMIT = 2000;

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const clean = (value) => String(value ?? '').trim().slice(0, FIELD_LIMIT);

// Sender display name: no line breaks, quotes or angle brackets, kept short
const senderName = (name) => name.replace(/[\r\n"<>]/g, ' ').slice(0, 80);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  const data = {
    name: clean(body.name),
    email: clean(body.email),
    city: clean(body.city),
    country: clean(body.country),
    message: clean(body.message),
  };

  if (!data.name || !data.email || !data.city || !data.country) {
    return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return Response.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, INQUIRY_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error('psychiatrist-inquiry: SMTP_USER / SMTP_PASS are not set');
    return Response.json({ ok: false, error: 'Email is not configured' }, { status: 500 });
  }

  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const rows = [
    ['Full name', data.name],
    ['Email', data.email],
    ['City', data.city],
    ['Country', data.country],
    ['Message / request', data.message || '—'],
    ['Submitted (IST)', submittedAt],
  ];

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || 'smtpout.secureserver.net',
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      // Shows the psychiatrist's name as the sender; the address stays the canxiol.com
      // mailbox because GoDaddy only lets us send from it. Replying goes to them.
      from: { name: `${senderName(data.name)} (via Canxiol website)`, address: SMTP_USER },
      to: INQUIRY_TO || SMTP_USER,
      replyTo: data.email,
      // Fixed prefix so every submission can be found and counted with one mailbox search
      subject: `[Canxiol Psychiatrist Inquiry] ${data.name} — ${data.city}, ${data.country}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html: `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
        .map(
          ([k, v]) =>
            `<tr><td style="font-weight:bold;vertical-align:top;border-bottom:1px solid #eee">${k}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
        )
        .join('')}</table>`,
    });
  } catch (err) {
    console.error('psychiatrist-inquiry: failed to send email', err);
    return Response.json({ ok: false, error: 'Could not send email' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
