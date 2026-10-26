'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { firebaseAuth, firestore } from '../../lib/firebase';
import AnimatedGradientBg from '../AnimatedGradientBg';
import { ROLES, otherRole, authErrorMessage } from './roles';
import { useAuthProfile } from './useAuthProfile';
import { setPortalRole } from './portalMode';

const EMPTY = {
  name: '',
  email: '',
  password: '',
  confirm: '',
  workplace: '',
  registrationNumber: '',
};

function EyeIcon({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {!open && <path d="M4 4l16 16" />}
    </svg>
  );
}

// Password input with a show / hide toggle
function PasswordField({ label, name, value, onChange, placeholder, autoComplete, required = true }) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="cx-auth-field">
      <span>{label}{required && ' *'}</span>
      <div className="cx-auth-pw">
        <input
          name={name}
          type={visible ? 'text' : 'password'}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="cx-auth-pw-toggle"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((v) => !v)}
        >
          <EyeIcon open={!visible} />
        </button>
      </div>
    </label>
  );
}

// Sign-up / log-in page for one professional role: gradient header + tabbed form card.
// mode: 'login' | 'signup'   role: 'psychiatrist' | 'pharmacist'
export default function AuthForm({ mode, role }) {
  const r = ROLES[role];
  const other = otherRole(role);
  const isSignup = mode === 'signup';
  const router = useRouter();
  const { user, profile, loading } = useAuthProfile();

  const [values, setValues] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  // Already signed in with an account of THIS role → straight to the portal.
  // An account of the other role stays on this form: each portal has its own accounts.
  useEffect(() => {
    if (!loading && !busy && user && profile?.role === role) router.replace(r.base);
  }, [loading, busy, user, profile, role, router, r.base]);

  const set = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');

    if (isSignup) {
      if (values.password.length < 8) return setError('Password must be at least 8 characters.');
      if (values.password !== values.confirm) return setError('Passwords do not match.');
    }

    setBusy(true);
    try {
      const auth = firebaseAuth();
      if (isSignup) {
        const cred = await createUserWithEmailAndPassword(auth, values.email.trim(), values.password);
        await updateProfile(cred.user, { displayName: values.name.trim() });
        // Access is instant: new accounts are created as "approved" (Leiutis can block one later
        // by setting status to "rejected" in Firestore)
        try {
          await setDoc(doc(firestore(), 'users', cred.user.uid), {
            role,
            status: 'approved',
            name: values.name.trim(),
            email: values.email.trim().toLowerCase(),
            workplace: values.workplace.trim(),
            registrationNumber: values.registrationNumber.trim(),
            consentAt: serverTimestamp(),
            createdAt: serverTimestamp(),
          });
        } catch (profileErr) {
          // Don't leave a login without a profile behind — remove it so the person can try again
          try {
            await cred.user.delete();
          } catch {
            await signOut(auth);
          }
          throw profileErr;
        }
      } else {
        const cred = await signInWithEmailAndPassword(auth, values.email.trim(), values.password);
        // Only accounts registered for this portal may log in here
        const snap = await getDoc(doc(firestore(), 'users', cred.user.uid));
        if (snap.exists() && snap.data().role !== role) {
          await signOut(auth);
          setPortalRole(null);
          setError(
            `This email is registered as a ${other.label.toLowerCase()}, so it can't be used for the ${r.label.toLowerCase()} portal. ` +
            `Please log in with your ${r.label.toLowerCase()} account, or create one with a different email.`
          );
          setBusy(false);
          return;
        }
      }
      router.replace(r.base);
    } catch (err) {
      setError(
        isSignup && err?.code === 'auth/email-already-in-use'
          ? `This email already has a Canxiol account. Each portal needs its own account, so please use a different email for your ${r.label.toLowerCase()} account — or log in if you already registered as a ${r.label.toLowerCase()}.`
          : authErrorMessage(err)
      );
      setBusy(false);
    }
  };

  const handleReset = async () => {
    setError('');
    setNotice('');
    if (!values.email.trim()) return setError('Enter your email above, then click "Forgot password?" again.');
    try {
      await sendPasswordResetEmail(firebaseAuth(), values.email.trim());
      setNotice('If an account exists for this email, a password reset link has been sent.');
    } catch (err) {
      setError(authErrorMessage(err));
    }
  };

  return (
    <div className="cx-authp">
      {/* One animated gradient behind the whole area: header and form card */}
      <AnimatedGradientBg speed={0.5} direction={0} distortion={0.15} scale={1.5} />

      <section className="cx-authp-hero">
        <div className="container cx-authp-hero-inner">
          <span className="cx-authp-eyebrow">Professional access</span>
          <h1 className="cx-authp-h1">{r.label} Portal</h1>
          <p className="cx-authp-lead">
            {isSignup ? 'Create your professional account.' : 'Log in to your professional account.'}
          </p>
        </div>
      </section>

      <section className="cx-authp-body">
        <div className="container">
          <div className="cx-authp-card">
            <div className="cx-authp-tabs">
              <Link href={`${r.base}/signup`} className={`cx-authp-tab ${isSignup ? 'is-active' : ''}`} aria-current={isSignup ? 'page' : undefined}>
                Sign Up
              </Link>
              <Link href={`${r.base}/login`} className={`cx-authp-tab ${!isSignup ? 'is-active' : ''}`} aria-current={!isSignup ? 'page' : undefined}>
                Log In
              </Link>
            </div>

            {!loading && user && profile && profile.role !== role && (
              <p className="cx-auth-notice">
                You’re currently logged in to the {other.label.toLowerCase()} portal. Logging in or creating an
                account here will log you out of it.
              </p>
            )}

            <form className="cx-authp-form" onSubmit={handleSubmit}>
              {isSignup && (
                <label className="cx-auth-field">
                  <span>Full name *</span>
                  <input name="name" required autoComplete="name" placeholder="Your full name" value={values.name} onChange={set} />
                </label>
              )}

              <label className="cx-auth-field">
                <span>Email *</span>
                <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" value={values.email} onChange={set} />
              </label>

              <PasswordField
                label="Password"
                name="password"
                value={values.password}
                onChange={set}
                placeholder="Enter your password"
                autoComplete={isSignup ? 'new-password' : 'current-password'}
              />

              {isSignup && (
                <>
                  <PasswordField
                    label="Confirm password"
                    name="confirm"
                    value={values.confirm}
                    onChange={set}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                  />
                  <label className="cx-auth-field">
                    <span>{r.workplaceLabel}</span>
                    <input name="workplace" autoComplete="organization" placeholder={r.workplacePlaceholder} value={values.workplace} onChange={set} />
                  </label>
                  <label className="cx-auth-field">
                    <span>{r.registrationLabel}</span>
                    <input name="registrationNumber" placeholder={r.registrationPlaceholder} value={values.registrationNumber} onChange={set} />
                  </label>
                </>
              )}

              {error && <p className="cx-auth-error is-full" role="alert">{error}</p>}
              {notice && <p className="cx-auth-notice is-full" role="status">{notice}</p>}

              <button type="submit" className="cx-authp-submit is-full" disabled={busy}>
                <span>{busy ? 'Please wait…' : isSignup ? 'Sign Up' : 'Log In'}</span>
                {!busy && (
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 11 11 3M11 3H4.5M11 3v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              <div className="cx-authp-meta is-full">
                {isSignup ? (
                  <p>
                    By signing up, you agree that Leiutis may store these details for your professional account.
                  </p>
                ) : (
                  <button type="button" className="cx-auth-link-btn" onClick={handleReset}>
                    Forgot password?
                  </button>
                )}
                <p className="cx-authp-meta-other">
                  Not a {r.label.toLowerCase()}? <Link href={`${other.base}/login`}>{other.label} portal</Link>
                  {' · '}
                  <Link href="/anxiety">Patient information (no login)</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
