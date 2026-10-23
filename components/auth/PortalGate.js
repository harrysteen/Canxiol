'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { sendEmailVerification, signOut } from 'firebase/auth';
import { firebaseAuth } from '../../lib/firebase';
import { ROLES, otherRole } from './roles';
import { useAuthProfile } from './useAuthProfile';
import AuthPageShell from './AuthPageShell';
import PortalUserBar from './PortalUserBar';
import { setPortalRole } from './portalMode';

function StatusCard({ title, children, onSignOut }) {
  return (
    <AuthPageShell>
      <div className="cx-auth-card">
        <h1 className="cx-auth-h1">{title}</h1>
        {children}
        {onSignOut && (
          <button type="button" className="cx-auth-link-btn cx-auth-signout" onClick={onSignOut}>
            Log out
          </button>
        )}
      </div>
    </AuthPageShell>
  );
}

// Shows the portal only to a signed-in, approved user of this role.
// Everyone else gets the right message: log in, wrong portal, pending review or not approved.
// fullPage: the children are a complete page (own navbar/footer) rather than content for the card shell.
export default function PortalGate({ role, fullPage = false, children }) {
  const r = ROLES[role];
  const router = useRouter();
  const { user, profile, loading } = useAuthProfile();
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace(`${r.base}/login`);
  }, [loading, user, router, r.base]);

  // Keep the site-wide portal look in step with the account: on for an approved
  // professional (in their own role), off for everyone else
  useEffect(() => {
    if (loading) return;
    if (user && profile?.status === 'approved') {
      setPortalRole(profile.role, profile.name || user.displayName || user.email);
    } else {
      setPortalRole(null);
    }
  }, [loading, user, profile]);

  const logOut = async () => {
    setPortalRole(null);
    await signOut(firebaseAuth());
    router.replace(`${r.base}/login`);
  };

  if (loading || !user) {
    return (
      <AuthPageShell>
        <div className="cx-auth-card cx-auth-loading" aria-busy="true">Loading…</div>
      </AuthPageShell>
    );
  }

  if (!profile) {
    return (
      <StatusCard title="Registration incomplete" onSignOut={logOut}>
        <p className="cx-auth-lead">
          We couldn’t find the registration details for this account. Please{' '}
          <Link href="/contact">contact us</Link> and we’ll help you complete it.
        </p>
      </StatusCard>
    );
  }

  if (profile.role !== role) {
    const other = otherRole(role);
    return (
      <StatusCard title={`${r.label} account needed`}>
        <p className="cx-auth-lead">
          You’re signed in as a {other.label.toLowerCase()}. The {r.label.toLowerCase()} portal uses
          separate {r.label.toLowerCase()} accounts.
        </p>
        <div className="cx-auth-actions">
          <button type="button" className="cx-auth-btn" onClick={logOut}>
            Log in as a {r.label.toLowerCase()}
          </button>
          <Link href={other.base} className="cx-auth-link-btn">Back to the {other.label.toLowerCase()} portal</Link>
        </div>
      </StatusCard>
    );
  }

  if (profile.status === 'rejected') {
    return (
      <StatusCard title="Account not approved" onSignOut={logOut}>
        <p className="cx-auth-lead">
          We weren’t able to verify your registration. If you think this is a mistake, please{' '}
          <Link href="/contact">contact us</Link>.
        </p>
      </StatusCard>
    );
  }

  if (profile.status !== 'approved') {
    return (
      <StatusCard title="Your account is under review" onSignOut={logOut}>
        <p className="cx-auth-lead">
          Thank you for registering, {profile.name || user.displayName}. Leiutis is verifying your{' '}
          {r.registrationLabel.toLowerCase()}. You’ll get access to the {r.label.toLowerCase()} portal
          as soon as it’s approved — this page updates automatically.
        </p>
        {!user.emailVerified && (
          <div className="cx-auth-notice">
            Please also confirm your email address using the link we sent to <strong>{user.email}</strong>.{' '}
            {resent ? (
              'A new link has been sent.'
            ) : (
              <button
                type="button"
                className="cx-auth-link-btn"
                onClick={async () => {
                  try {
                    await sendEmailVerification(user);
                  } finally {
                    setResent(true);
                  }
                }}
              >
                Resend link
              </button>
            )}
          </div>
        )}
      </StatusCard>
    );
  }

  if (fullPage) return children;

  return (
    <AuthPageShell>
      <PortalUserBar role={role} />
      {children}
    </AuthPageShell>
  );
}
