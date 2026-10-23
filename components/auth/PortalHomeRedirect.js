'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePortalRole } from './portalMode';
import { ROLES } from './roles';

// On the public home page: a logged-in pharmacist or psychiatrist is sent to their own home instead
export default function PortalHomeRedirect() {
  const router = useRouter();
  const portalRole = usePortalRole();

  useEffect(() => {
    if (ROLES[portalRole]) router.replace(ROLES[portalRole].base);
  }, [portalRole, router]);

  return null;
}
