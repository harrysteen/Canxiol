'use client';
import CanxiolInfoBar from '../CanxiolInfoBar';
import { usePortalRole } from './portalMode';

// The 4-column "prescribed by psychiatrists only" bar, shown only to logged-in
// pharmacists / psychiatrists. Patients and other visitors don't see it.
export default function ProOnlyInfoBar() {
  const portalRole = usePortalRole();
  return portalRole ? <CanxiolInfoBar /> : null;
}
