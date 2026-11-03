'use client';
import PvPathwaysSection from './PvPathwaysSection';
import { usePortalRole } from '../auth/portalMode';

// Logged-in pharmacists and psychiatrists get both columns (Patients + Psychiatrist);
// public visitors get the Patients column only.
export default function PvPathwaysForRole() {
  return <PvPathwaysSection showPsychiatrist={Boolean(usePortalRole())} />;
}
