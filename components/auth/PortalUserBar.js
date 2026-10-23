'use client';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../../lib/firebase';
import { ROLES } from './roles';
import { useAuthProfile } from './useAuthProfile';
import { setPortalRole } from './portalMode';

// "Signed in as … · Log out" strip shown at the top of a portal
export default function PortalUserBar({ role, inContainer = false }) {
  const r = ROLES[role];
  const router = useRouter();
  const { user, profile } = useAuthProfile();
  if (!user) return null;

  const logOut = async () => {
    setPortalRole(null);
    await signOut(firebaseAuth());
    router.replace(`${r.base}/login`);
  };

  const bar = (
    <div className="cx-portal-bar">
      <span>
        Signed in as <strong>{profile?.name || user.email}</strong> · {r.label}
      </span>
      <button type="button" className="cx-auth-link-btn" onClick={logOut}>Log out</button>
    </div>
  );

  return inContainer ? <div className="container cx-portal-bar-wrap">{bar}</div> : bar;
}
