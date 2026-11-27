'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { firebaseAuth, firestore, provisioningAuth } from '../../lib/firebase';
import { authErrorMessage } from '../auth/roles';

// Team page (/team/registrations): psychiatrist registration requests.
// After cross-verifying a request, a team member clicks "Create login & send email":
//   1. a login is created with a random temporary password (on a separate Firebase
//      connection, so the team member stays logged in)
//   2. the psychiatrist's profile is saved (users/{uid}, status "approved")
//   3. the login details are emailed to them (/api/psychiatrist-credentials)
// Only people listed in the Firestore "admins" collection can use this page.

// 12 characters, no look-alikes (0/O, 1/l/I), always with upper, lower and a digit
function makePassword() {
  const sets = ['ABCDEFGHJKLMNPQRSTUVWXYZ', 'abcdefghijkmnopqrstuvwxyz', '23456789'];
  const all = sets.join('');
  const pick = (s) => s[crypto.getRandomValues(new Uint32Array(1))[0] % s.length];
  const chars = [...sets.map(pick), ...Array.from({ length: 9 }, () => pick(all))];
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}

const withDr = (name) => `Dr. ${name.trim().replace(/^dr\.?\s+/i, '')}`;

const fmtDate = (ts) =>
  ts?.toDate
    ? ts.toDate().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' })
    : '—';

const FILTERS = [
  ['new', 'New'],
  ['approved', 'Login created'],
  ['rejected', 'Rejected'],
  ['all', 'All'],
];

// Creates the login + profile and emails the details. Returns { password, emailed }.
async function createLogin(person, requestId) {
  const password = makePassword();
  const pAuth = provisioningAuth();
  const cred = await createUserWithEmailAndPassword(pAuth, person.email, password);
  await updateProfile(cred.user, { displayName: person.name });
  const uid = cred.user.uid;
  await signOut(pAuth);

  await setDoc(doc(firestore(), 'users', uid), {
    role: 'psychiatrist',
    status: 'approved',
    name: person.name,
    email: person.email,
    workplace: person.workplace || '',
    phone: person.phone || '',
    city: person.city || '',
    privatePractice: person.privatePractice || '',
    ...(requestId && { selfDeclared: true, requestId }),
    createdAt: serverTimestamp(),
  });

  const me = firebaseAuth().currentUser;
  if (requestId) {
    await updateDoc(doc(firestore(), 'registrationRequests', requestId), {
      status: 'approved',
      uid,
      decidedAt: serverTimestamp(),
      decidedBy: me?.email || '',
    });
  }

  let emailed = false;
  try {
    const res = await fetch('/api/psychiatrist-credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${await me.getIdToken()}` },
      body: JSON.stringify({ name: person.name, email: person.email, password }),
    });
    emailed = res.ok;
  } catch {
    emailed = false;
  }
  return { password, emailed };
}

function createErrorMessage(err) {
  if (err?.code === 'auth/email-already-in-use') {
    return 'A login already exists for this email. The psychiatrist can use “Forgot password?” on the log-in page to set a new password.';
  }
  if (err?.code === 'permission-denied') {
    return 'The login was created but the profile could not be saved (permission denied). Check that the latest firestore.rules are published.';
  }
  return authErrorMessage(err);
}

// Result box after creating a login
function CreatedNotice({ result }) {
  if (!result) return null;
  return result.emailed ? (
    <p className="cx-auth-notice">
      Login created and emailed to <strong>{result.email}</strong>.
    </p>
  ) : (
    <p className="cx-auth-error">
      Login created for <strong>{result.email}</strong>, but the email could not be sent. Please send these
      details yourself — Email: <strong>{result.email}</strong> · Temporary password:{' '}
      <code className="cx-team-pw">{result.password}</code>
    </p>
  );
}

function RequestCard({ req }) {
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const approve = async () => {
    if (!window.confirm(`Create a login for ${req.name} (${req.email}) and email it to them?`)) return;
    setBusy('approve');
    setError('');
    try {
      const out = await createLogin(req, req.id);
      setResult({ ...out, email: req.email });
    } catch (err) {
      setError(createErrorMessage(err));
    }
    setBusy('');
  };

  const reject = async () => {
    if (!window.confirm(`Reject the request from ${req.name}? No email is sent.`)) return;
    setBusy('reject');
    setError('');
    try {
      await updateDoc(doc(firestore(), 'registrationRequests', req.id), {
        status: 'rejected',
        decidedAt: serverTimestamp(),
        decidedBy: firebaseAuth().currentUser?.email || '',
      });
    } catch (err) {
      setError(authErrorMessage(err));
    }
    setBusy('');
  };

  const reopen = async () => {
    await updateDoc(doc(firestore(), 'registrationRequests', req.id), { status: 'new' });
  };

  const rows = [
    ['Email', req.email],
    ['Hospital / Institution', req.workplace],
    ['Phone', req.phone || '—'],
    ['City', req.city],
    ['Private practice', req.privatePractice ? (req.privatePractice === 'yes' ? 'Yes' : 'No') : '—'],
    ['Self-declaration', req.selfDeclared ? 'Confirmed' : '—'],
    ['Submitted', fmtDate(req.createdAt)],
  ];

  return (
    <article className="cx-team-card">
      <header className="cx-team-card-head">
        <h3>{req.name}</h3>
        <span className={`cx-team-status is-${req.status}`}>
          {req.status === 'approved' ? 'Login created' : req.status === 'rejected' ? 'Rejected' : 'New'}
        </span>
      </header>
      <dl className="cx-team-dl">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {req.status !== 'new' && req.decidedAt && (
        <p className="cx-team-meta">
          {req.status === 'approved' ? 'Login created' : 'Rejected'} {fmtDate(req.decidedAt)}
          {req.decidedBy ? ` by ${req.decidedBy}` : ''}
        </p>
      )}
      <CreatedNotice result={result} />
      {error && <p className="cx-auth-error">{error}</p>}
      {req.status === 'new' && !result && (
        <div className="cx-team-actions">
          <button type="button" className="cx-auth-btn" onClick={approve} disabled={Boolean(busy)}>
            {busy === 'approve' ? 'Creating…' : 'Create login & send email'}
          </button>
          <button type="button" className="cx-auth-link-btn" onClick={reject} disabled={Boolean(busy)}>
            {busy === 'reject' ? 'Rejecting…' : 'Reject'}
          </button>
        </div>
      )}
      {req.status === 'rejected' && (
        <div className="cx-team-actions">
          <button type="button" className="cx-auth-link-btn" onClick={reopen}>Move back to New</button>
        </div>
      )}
    </article>
  );
}

// For someone whose request isn't listed (e.g. it came in only by email)
function ManualCreate() {
  const empty = { name: '', email: '', workplace: '', phone: '', city: '' };
  const [v, setV] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const set = (e) => setV((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    const person = { ...v, name: withDr(v.name), email: v.email.trim().toLowerCase() };
    if (!window.confirm(`Create a login for ${person.name} (${person.email}) and email it to them?`)) return;
    setBusy(true);
    try {
      const out = await createLogin(person, '');
      setResult({ ...out, email: person.email });
      setV(empty);
    } catch (err) {
      setError(createErrorMessage(err));
    }
    setBusy(false);
  };

  return (
    <details className="cx-team-manual">
      <summary>Create a login manually</summary>
      <form className="cx-authp-form" onSubmit={submit}>
        <label className="cx-auth-field">
          <span>Full name * (Dr. is added)</span>
          <input name="name" required value={v.name} onChange={set} placeholder="Full name" />
        </label>
        <label className="cx-auth-field">
          <span>Email *</span>
          <input name="email" type="email" required value={v.email} onChange={set} placeholder="name@example.com" />
        </label>
        <label className="cx-auth-field">
          <span>Hospital / Institution</span>
          <input name="workplace" value={v.workplace} onChange={set} />
        </label>
        <label className="cx-auth-field">
          <span>City</span>
          <input name="city" value={v.city} onChange={set} />
        </label>
        <label className="cx-auth-field">
          <span>Phone</span>
          <input name="phone" value={v.phone} onChange={set} />
        </label>
        <div className="cx-auth-field cx-team-manual-submit">
          <button type="submit" className="cx-auth-btn" disabled={busy}>
            {busy ? 'Creating…' : 'Create login & send email'}
          </button>
        </div>
        <div className="is-full">
          <CreatedNotice result={result} />
          {error && <p className="cx-auth-error">{error}</p>}
        </div>
      </form>
    </details>
  );
}

function Dashboard({ user }) {
  const [requests, setRequests] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [filter, setFilter] = useState('new');

  useEffect(
    () =>
      onSnapshot(
        query(collection(firestore(), 'registrationRequests'), orderBy('createdAt', 'desc')),
        (snap) => setRequests(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
        (err) => setLoadError(createErrorMessage(err))
      ),
    []
  );

  const counts = useMemo(() => {
    const c = { new: 0, approved: 0, rejected: 0, all: requests?.length || 0 };
    (requests || []).forEach((r) => {
      c[r.status] = (c[r.status] || 0) + 1;
    });
    return c;
  }, [requests]);

  const shown = (requests || []).filter((r) => filter === 'all' || r.status === filter);

  return (
    <div className="cx-team">
      <div className="cx-team-top">
        <div>
          <span className="cx-auth-eyebrow">Leiutis team</span>
          <h1 className="cx-auth-h1">Psychiatrist registrations</h1>
          <p className="cx-team-meta">
            Logged in as {user.email} ·{' '}
            <button type="button" className="cx-auth-link-btn" onClick={() => signOut(firebaseAuth())}>Log out</button>
          </p>
        </div>
      </div>

      <div className="cx-team-filters" role="tablist">
        {FILTERS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={filter === id}
            className={`cx-team-filter ${filter === id ? 'is-active' : ''}`}
            onClick={() => setFilter(id)}
          >
            {label} <span>{counts[id] || 0}</span>
          </button>
        ))}
      </div>

      {loadError && <p className="cx-auth-error">{loadError}</p>}
      {!requests && !loadError && <p className="cx-auth-loading">Loading…</p>}
      {requests && shown.length === 0 && <p className="cx-team-empty">No requests here.</p>}

      <div className="cx-team-list">
        {shown.map((r) => (
          <RequestCard key={r.id} req={r} />
        ))}
      </div>

      <ManualCreate />
    </div>
  );
}

function TeamLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signInWithEmailAndPassword(firebaseAuth(), email.trim(), password);
    } catch (err) {
      setError(authErrorMessage(err));
    }
    setBusy(false);
  };

  const reset = async () => {
    setError('');
    if (!email.trim()) return setError('Enter your email above, then click "Forgot password?" again.');
    await sendPasswordResetEmail(firebaseAuth(), email.trim()).catch(() => {});
    setNotice('If an account exists for this email, a password reset link has been sent.');
  };

  return (
    <div className="cx-auth-card">
      <span className="cx-auth-eyebrow">Leiutis team</span>
      <h1 className="cx-auth-h1">Team log in</h1>
      <p className="cx-auth-lead">Review psychiatrist registrations and create their logins.</p>
      <form className="cx-team-login" onSubmit={submit}>
        <label className="cx-auth-field">
          <span>Email</span>
          <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="cx-auth-field">
          <span>Password</span>
          <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="cx-auth-error">{error}</p>}
        {notice && <p className="cx-auth-notice">{notice}</p>}
        <div className="cx-auth-actions">
          <button type="submit" className="cx-auth-btn" disabled={busy}>{busy ? 'Please wait…' : 'Log in'}</button>
          <button type="button" className="cx-auth-link-btn" onClick={reset}>Forgot password?</button>
        </div>
      </form>
    </div>
  );
}

export default function TeamRegistrations() {
  const [user, setUser] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(undefined);

  useEffect(
    () =>
      onAuthStateChanged(firebaseAuth(), async (u) => {
        setUser(u);
        setIsAdmin(undefined);
        if (!u) return;
        try {
          setIsAdmin((await getDoc(doc(firestore(), 'admins', u.uid))).exists());
        } catch {
          setIsAdmin(false);
        }
      }),
    []
  );

  if (user === undefined || (user && isAdmin === undefined)) {
    return <div className="cx-auth-card cx-auth-loading" aria-busy="true">Loading…</div>;
  }
  if (!user) return <TeamLogin />;
  if (!isAdmin) {
    return (
      <div className="cx-auth-card">
        <h1 className="cx-auth-h1">No team access</h1>
        <p className="cx-auth-lead">
          {user.email} isn’t on the Leiutis team list. Ask an administrator to add your account in Firebase
          (Firestore → <code>admins</code>, document ID = your User UID: <code>{user.uid}</code>).
        </p>
        <button type="button" className="cx-auth-link-btn" onClick={() => signOut(firebaseAuth())}>Log out</button>
      </div>
    );
  }
  return <Dashboard user={user} />;
}
