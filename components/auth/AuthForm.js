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
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { firebaseAuth, firestore } from '../../lib/firebase';
import AnimatedGradientBg from '../AnimatedGradientBg';
import { ROLES, otherRole, authErrorMessage } from './roles';
import { PHARMACIST_PORTAL_ENABLED } from './portalFlags';
import { useAuthProfile } from './useAuthProfile';
import { setPortalRole } from './portalMode';

const EMPTY = {
  name: '',
  email: '',
  password: '',
  confirm: '',
  workplace: '',
  registrationNumber: '',
  website: '', // hidden anti-bot field
  phone: '',
  city: '',
  privatePractice: '',
  declared: false,
};

// "Dr. Asha Rao" from "asha rao" / "Dr Asha Rao" / "dr. Asha Rao" (prefix added once)
function withPrefix(prefix, name) {
  const clean = name.trim().replace(/^dr\.?\s+/i, '');
  return prefix ? `${prefix} ${clean}` : clean;
}

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
  const [requestSent, setRequestSent] = useState(false);
  // Registration by request (psychiatrists): no password on this form
  const isRequest = isSignup && Boolean(r.requestAccess);

  // Already signed in with an account of THIS role → straight to the portal.
  // An account of the other role stays on this form: each portal has its own accounts.
  useEffect(() => {
    if (!loading && !busy && user && profile?.role === role) router.replace(r.base);
  }, [loading, busy, user, profile, role, router, r.base]);

  const set = (e) => {
    const { name, type, checked, value } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');

    if (isSignup) {
      if (!isRequest && values.password.length < 8) return setError('Password must be at least 8 characters.');
      if (!isRequest && values.password !== values.confirm) return setError('Passwords do not match.');
      if (r.askPhone && values.phone.trim() && !/^\+?[0-9\s-]{7,16}$/.test(values.phone.trim())) {
        return setError('Please enter a valid phone number, or leave it empty.');
      }
      if (r.declaration && !values.declared) return setError('Please tick the declaration to continue.');
    }

    setBusy(true);

    if (isRequest) {
      const request = {
        role,
        status: 'new',
        name: withPrefix(r.namePrefix, values.name),
        email: values.email.trim().toLowerCase(),
        workplace: values.workplace.trim(),
        phone: values.phone.trim(),
        city: values.city.trim(),
        privatePractice: values.privatePractice,
        selfDeclared: true,
      };
      // 1. Save it for the team page (if this fails, the team email still carries everything)
      let requestId = '';
      if (!values.website) {
        try {
          const ref = await addDoc(collection(firestore(), 'registrationRequests'), {
            ...request,
            createdAt: serverTimestamp(),
          });
          requestId = ref.id;
        } catch (err) {
          console.error('Could not save the registration request', err);
        }
      }
      // 2. Email the team + the thank-you to the psychiatrist
      try {
        const res = await fetch('/api/psychiatrist-registration', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...request, requestId, website: values.website }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setRequestSent(true);
      } catch {
        setError(
          requestId
            ? 'Your details were received, but we couldn’t send the confirmation email. Our team will still contact you.'
            : 'Something went wrong and your details could not be sent. Please try again in a moment.'
        );
        if (requestId) setRequestSent(true);
      }
      setBusy(false);
      return;
    }

    try {
      const auth = firebaseAuth();
      if (isSignup) {
        const cred = await createUserWithEmailAndPassword(auth, values.email.trim(), values.password);
        const fullName = withPrefix(r.namePrefix, values.name);
        await updateProfile(cred.user, { displayName: fullName });
        // Access is instant: new accounts are created as "approved" (Leiutis can block one later
        // by setting status to "rejected" in Firestore)
        try {
          await setDoc(doc(firestore(), 'users', cred.user.uid), {
            role,
            status: 'approved',
            name: fullName,
            email: values.email.trim().toLowerCase(),
            workplace: values.workplace.trim(),
            registrationNumber: values.registrationNumber.trim(),
            ...(r.askPhone && { phone: values.phone.trim() }),
            ...(r.askCity && { city: values.city.trim() }),
            ...(r.askPrivatePractice && { privatePractice: values.privatePractice }),
            ...(r.declaration && { selfDeclared: true }),
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
            {isRequest ? 'Register for professional access.' : isSignup ? 'Create your professional account.' : 'Log in to your professional account.'}
          </p>
        </div>
      </section>

      <section className="cx-authp-body">
        <div className="container">
          <div className="cx-authp-card">
            <div className="cx-authp-tabs">
              <Link href={`${r.base}/signup`} className={`cx-authp-tab ${isSignup ? 'is-active' : ''}`} aria-current={isSignup ? 'page' : undefined}>
                {r.requestAccess ? 'Register' : 'Sign Up'}
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

            {requestSent ? (
              // Shown after a registration request is sent
              <div className="cx-authp-thanks" role="status">
                <span className="cx-authp-thanks-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                </span>
                <h2 className="cx-authp-thanks-h2">Thank you</h2>
                <p>
                  Thank you for sharing your details with us. Our team will reach out to you with
                  registration details soon.
                </p>
                {error && <p className="cx-auth-error" role="alert">{error}</p>}
                <p className="cx-authp-thanks-meta">
                  A confirmation has been sent to <strong>{values.email.trim()}</strong>.{' '}
                  <Link href="/">Back to the home page</Link>
                </p>
              </div>
            ) : (
            <form className="cx-authp-form" onSubmit={handleSubmit}>
              {isSignup && (
                <label className="cx-auth-field">
                  <span>Full name *</span>
                  {r.namePrefix ? (
                    // Fixed "Dr." in front of the name
                    <div className="cx-auth-prefixed">
                      <span className="cx-auth-prefix" aria-hidden="true">{r.namePrefix}</span>
                      <input
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        value={values.name}
                        onChange={set}
                        // "Dr" typed by hand is dropped — the fixed prefix already shows it
                        onBlur={() => setValues((v) => ({ ...v, name: v.name.replace(/^\s*dr\.?\s+/i, '') }))}
                      />
                    </div>
                  ) : (
                    <input name="name" required autoComplete="name" placeholder="Your full name" value={values.name} onChange={set} />
                  )}
                </label>
              )}

              <label className="cx-auth-field">
                <span>Email *</span>
                <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" value={values.email} onChange={set} />
              </label>

              {!isRequest && (
                <PasswordField
                  label="Password"
                  name="password"
                  value={values.password}
                  onChange={set}
                  placeholder="Enter your password"
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                />
              )}

              {isSignup && (
                <>
                  {!isRequest && (
                    <PasswordField
                      label="Confirm password"
                      name="confirm"
                      value={values.confirm}
                      onChange={set}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                    />
                  )}
                  {isRequest && (
                    // Anti-bot field: hidden from people, often filled in by bots
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="cx-auth-hp"
                      value={values.website}
                      onChange={set}
                    />
                  )}
                  <label className="cx-auth-field">
                    <span>{r.workplaceLabel}{r.workplaceRequired && ' *'}</span>
                    <input name="workplace" required={Boolean(r.workplaceRequired)} autoComplete="organization" placeholder={r.workplacePlaceholder} value={values.workplace} onChange={set} />
                  </label>
                  {r.showRegistration && (
                    <label className="cx-auth-field">
                      <span>{r.registrationLabel}</span>
                      <input name="registrationNumber" placeholder={r.registrationPlaceholder} value={values.registrationNumber} onChange={set} />
                    </label>
                  )}
                  {r.askPhone && (
                    <label className="cx-auth-field">
                      <span>Phone number</span>
                      <input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Your phone number (not mandatory)" value={values.phone} onChange={set} />
                    </label>
                  )}
                  {r.askCity && (
                    <label className="cx-auth-field">
                      <span>City *</span>
                      <input name="city" required autoComplete="address-level2" placeholder="Your city" value={values.city} onChange={set} />
                    </label>
                  )}
                  {r.askPrivatePractice && (
                    <div className="cx-auth-field cx-auth-choice" role="radiogroup" aria-labelledby="cx-pp-label">
                      <span id="cx-pp-label">Do you have a private practice?</span>
                      <div className="cx-auth-choice-opts">
                        {['yes', 'no'].map((opt) => (
                          <label key={opt} className="cx-auth-radio">
                            <input type="radio" name="privatePractice" value={opt} checked={values.privatePractice === opt} onChange={set} />
                            <span>{opt === 'yes' ? 'Yes' : 'No'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  {r.declaration && (
                    <label className="cx-auth-check is-full">
                      <input type="checkbox" name="declared" required checked={values.declared} onChange={set} />
                      <span>{r.declaration} *</span>
                    </label>
                  )}
                </>
              )}

              {error && <p className="cx-auth-error is-full" role="alert">{error}</p>}
              {notice && <p className="cx-auth-notice is-full" role="status">{notice}</p>}

              <button type="submit" className="cx-authp-submit is-full" disabled={busy}>
                <span>{busy ? 'Please wait…' : isRequest ? 'Submit Registration' : isSignup ? 'Sign Up' : 'Log In'}</span>
                {!busy && (
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 11 11 3M11 3H4.5M11 3v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              <div className="cx-authp-meta is-full">
                {isSignup ? (
                  <p>
                    {isRequest
                      ? 'By registering, you agree that Leiutis may store these details to verify your registration. Our team will email your login details once verified.'
                      : 'By signing up, you agree that Leiutis may store these details for your professional account.'}
                  </p>
                ) : (
                  <button type="button" className="cx-auth-link-btn" onClick={handleReset}>
                    Forgot password?
                  </button>
                )}
                <p className="cx-authp-meta-other">
                  {/* Link to the other portal — hidden while the pharmacist portal is off */}
                  {(PHARMACIST_PORTAL_ENABLED || other.id !== 'pharmacist') && (
                    <>
                      Not a {r.label.toLowerCase()}? <Link href={`${other.base}/login`}>{other.label} portal</Link>
                      {' · '}
                    </>
                  )}
                  <Link href="/anxiety">Patient information (no login)</Link>
                </p>
              </div>
            </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
