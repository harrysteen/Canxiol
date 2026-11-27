import nodemailer from 'nodemailer';

// Shared email helpers for the API routes. Mail goes out through the canxiol.com mailbox
// on GoDaddy (SMTP_* settings in .env.local locally, and in Vercel's environment variables).

export const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const clean = (value, max = 300) => String(value ?? '').trim().slice(0, max);

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// Display names: no line breaks, quotes or angle brackets, kept short
export const safeName = (name) => String(name ?? '').replace(/[\r\n"<>]/g, ' ').slice(0, 80);

export function mailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

export function transporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const port = Number(SMTP_PORT) || 465;
  return nodemailer.createTransport({
    host: SMTP_HOST || 'smtpout.secureserver.net',
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

// Team inbox for portal registrations (falls back to the inquiry inbox, then the mailbox itself)
export const teamInbox = () =>
  process.env.REGISTRATION_TO || process.env.INQUIRY_TO || process.env.SMTP_USER;

// The site's own address, for links in emails (e.g. https://canxiol.com)
export function siteUrl(request) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '');
  return new URL(request.url).origin;
}

// Label / value table used in the team emails
export function tableHtml(rows) {
  return `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="font-weight:bold;vertical-align:top;border-bottom:1px solid #eee">${escapeHtml(k)}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
    )
    .join('')}</table>`;
}

// Simple branded wrapper for emails sent to psychiatrists
export function letterHtml(paragraphsHtml) {
  return `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1A1918;max-width:560px">
  <p style="font-size:20px;font-weight:bold;color:#471D41;letter-spacing:1px;margin:0 0 18px">CANXIOL</p>
  ${paragraphsHtml}
  <p style="margin-top:28px;color:#6B5A75">Team Canxiol<br/>Leiutis Pharmaceuticals LLP</p>
</div>`;
}
