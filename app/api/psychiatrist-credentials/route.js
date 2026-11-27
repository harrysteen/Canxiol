import { clean, escapeHtml, isEmail, letterHtml, mailConfigured, safeName, siteUrl, transporter, teamInbox } from '../../../lib/mailer';

// Emails a psychiatrist their new login (sent from /team/registrations).
// Only Leiutis team members may use it: the caller's Firebase ID token must belong to a user
// listed in the Firestore "admins" collection. Checked with Firebase's own REST APIs, so no
// service-account key is needed:
//   1. accounts:lookup turns the ID token into a user ID (fails if the token is invalid/expired)
//   2. reading admins/{uid} with that token succeeds only for admins (see firestore.rules)
async function isTeamMember(idToken) {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!idToken || !apiKey || !projectId) return false;

  const lookup = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
  if (!lookup.ok) return false;
  const uid = (await lookup.json()).users?.[0]?.localId;
  if (!uid) return false;

  const adminDoc = await fetch(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/admins/${encodeURIComponent(uid)}`,
    { headers: { Authorization: `Bearer ${idToken}` } }
  );
  return adminDoc.ok;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  const idToken = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!(await isTeamMember(idToken))) {
    return Response.json({ ok: false, error: 'Not allowed' }, { status: 403 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const password = clean(body.password, 64);
  if (!name || !isEmail(email) || password.length < 8) {
    return Response.json({ ok: false, error: 'Missing details' }, { status: 400 });
  }
  if (!mailConfigured()) {
    return Response.json({ ok: false, error: 'Email is not configured' }, { status: 500 });
  }

  const loginUrl = `${siteUrl(request)}/psychiatrist/login`;

  try {
    await transporter().sendMail({
      from: { name: 'Canxiol', address: process.env.SMTP_USER },
      to: email,
      replyTo: teamInbox(),
      subject: 'Your Canxiol psychiatrist portal login',
      text:
        `Dear ${name},\n\n` +
        'Thank you for registering with Canxiol. Your account for the Canxiol psychiatrist portal is ready.\n\n' +
        `Log in at: ${loginUrl}\n` +
        `Email: ${email}\n` +
        `Temporary password: ${password}\n\n` +
        'For your security, please change this password after your first login: on the log-in page, ' +
        'click "Forgot password?" and follow the link we email you.\n\n' +
        'Team Canxiol\nLeiutis Pharmaceuticals LLP',
      html: letterHtml(
        `<p>Dear ${safeName(name)},</p>
         <p>Thank you for registering with Canxiol. Your account for the Canxiol psychiatrist portal is ready.</p>
         <table cellpadding="6" style="border-collapse:collapse;font-size:15px;margin:8px 0 14px">
           <tr><td style="color:#6B5A75">Email</td><td><strong>${escapeHtml(email)}</strong></td></tr>
           <tr><td style="color:#6B5A75">Temporary password</td><td><strong style="font-family:Consolas,monospace;font-size:16px">${escapeHtml(password)}</strong></td></tr>
         </table>
         <p><a href="${loginUrl}" style="display:inline-block;background:#471D41;color:#fff;text-decoration:none;padding:12px 22px;font-weight:bold;letter-spacing:.5px">LOG IN TO THE PORTAL</a></p>
         <p style="font-size:13px;color:#6B5A75">For your security, please change this password after your first login:
           on the log-in page, click “Forgot password?” and follow the link we email you.</p>`
      ),
    });
  } catch (err) {
    console.error('psychiatrist-credentials: failed to send email', err);
    return Response.json({ ok: false, error: 'Could not send email' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
