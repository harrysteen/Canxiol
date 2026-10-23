'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { firebaseAuth, firestore } from '../../lib/firebase';
import { ROLES, otherRole, authErrorMessage } from './roles';
import { useAuthProfile } from './useAuthProfile';
import { setPortalRole } from './portalMode';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  registrationNumber: '',
  council: '',
  city: '',
  password: '',
  confirm: '',
};

// Login or sign-up card for one professional role.
// mode: 'login' | 'signup'   role: 'psychiatrist' | 'pharmacist'
export default function AuthForm({ mode, role }) {
  const r = ROLES[role];
  const other = otherRole(role);
  const isSignup = mode === 'signup';
  const router = useRouter();
  const { user, profile, loading } = useAuthProfile();

  const [values, setValues] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
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
      if (!consent) return setError('Please accept the privacy notice to create an account.');
    }

    setBusy(true);
    try {
      const auth = firebaseAuth();
      if (isSignup) {
        const cred = await createUserWithEmailAndPassword(auth, values.email.trim(), values.password);
        await updateProfile(cred.user, { displayName: values.name.trim() });
        // New accounts always start as "pending" — Leiutis approves them (see firestore.rules)
        await setDoc(doc(firestore(), 'users', cred.user.uid), {
          role,
          status: 'pending',
          name: values.name.trim(),
          email: values.email.trim().toLowerCase(),
          phone: values.phone.trim(),
          registrationNumber: values.registrationNumber.trim(),
          council: values.council.trim(),
          city: values.city.trim(),
          consentAt: serverTimestamp(),
          createdAt: serverTimestamp(),
        });
        try {
          await sendEmailVerification(cred.user);
        } catch {
          // Not critical — the portal page offers to resend it
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
    <div className={`cx-auth-card ${isSignup ? 'is-wide' : ''}`}>
      <span className="cx-auth-eyebrow">{r.label} portal</span>
      <h1 className="cx-auth-h1">{isSignup ? 'Create your account' : 'Log in'}</h1>
      <p className="cx-auth-lead">
        {isSignup
          ? `For registered ${r.label.toLowerCase()}s. New accounts are reviewed by Leiutis before access is granted.`
          : `Log in to the Canxiol ${r.label.toLowerCase()} portal.`}
      </p>

      {!loading && user && profile && profile.role !== role && (
        <p className="cx-auth-notice">
          You’re currently logged in to the {other.label.toLowerCase()} portal. Logging in or creating an
          account here will log you out of it.
        </p>
      )}

      <form className="cx-auth-form" onSubmit={handleSubmit}>
        {isSignup && (
          <label className="cx-auth-field is-full">
            <span>Full name</span>
            <input name="name" required autoComplete="name" placeholder={r.namePlaceholder} value={values.name} onChange={set} />
          </label>
        )}

        <label className={`cx-auth-field ${isSignup ? '' : 'is-full'}`}>
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="name@hospital.com" value={values.email} onChange={set} />
        </label>

        {isSignup && (
          <>
            <label className="cx-auth-field">
              <span>Phone</span>
              <input name="phone" type="tel" required autoComplete="tel" placeholder="+91 98000 00000" value={values.phone} onChange={set} />
            </label>
            <label className="cx-auth-field">
              <span>{r.registrationLabel}</span>
              <input name="registrationNumber" required placeholder={r.registrationPlaceholder} value={values.registrationNumber} onChange={set} />
            </label>
            <label className="cx-auth-field">
              <span>Registering council</span>
              <input name="council" required placeholder={r.councilPlaceholder} value={values.council} onChange={set} />
            </label>
            <label className="cx-auth-field is-full">
              <span>City</span>
              <input name="city" required autoComplete="address-level2" placeholder="e.g. Hyderabad" value={values.city} onChange={set} />
            </label>
          </>
        )}

        <label className={`cx-auth-field ${isSignup ? '' : 'is-full'}`}>
          <span>Password</span>
          <input
            name="password"
            type="password"
            required
            minLength={isSignup ? 8 : undefined}
            autoComplete={isSignup ? 'new-password' : 'current-password'}
            placeholder={isSignup ? 'At least 8 characters' : ''}
            value={values.password}
            onChange={set}
          />
        </label>

        {isSignup && (
          <label className="cx-auth-field">
            <span>Confirm password</span>
            <input name="confirm" type="password" required autoComplete="new-password" value={values.confirm} onChange={set} />
          </label>
        )}

        {isSignup && (
          <label className="cx-auth-consent is-full">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>
              I agree that Leiutis may store and use these details to verify my registration and give me
              access to professional information about Canxiol.
            </span>
          </label>
        )}

        {error && <p className="cx-auth-error is-full" role="alert">{error}</p>}
        {notice && <p className="cx-auth-notice is-full" role="status">{notice}</p>}

        <div className="cx-auth-actions is-full">
          <button type="submit" className="cx-auth-btn" disabled={busy}>
            {busy ? 'Please wait…' : isSignup ? 'Create account' : 'Log in'}
          </button>
          {!isSignup && (
            <button type="button" className="cx-auth-link-btn" onClick={handleReset}>
              Forgot password?
            </button>
          )}
        </div>
      </form>

      <div className="cx-auth-switch">
        {isSignup ? (
          <p>Already have an account? <Link href={`${r.base}/login`}>Log in</Link></p>
        ) : (
          <p>New here? <Link href={`${r.base}/signup`}>Create a {r.label.toLowerCase()} account</Link></p>
        )}
        <p className="cx-auth-switch-other">
          Not a {r.label.toLowerCase()}? <Link href={`${other.base}/login`}>{other.label} login</Link>
          {' · '}
          <Link href="/anxiety">Patient information (no login)</Link>
        </p>
      </div>
    </div>
  );
}
