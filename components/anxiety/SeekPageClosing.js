'use client';
import SeekUntreatedSection from './SeekUntreatedSection';
import AnxietyNotes from './AnxietyNotes';
import { usePortalRole } from '../auth/portalMode';

// End of the When to seek help page. Logged-in pharmacists and psychiatrists get the extra
// "What happens when anxiety goes untreated" section (which carries the notes and the
// Next: Treatment link); everyone else gets just the notes.
export default function SeekPageClosing() {
  // Any portal role ('pharmacist' or 'psychiatrist'); public visitors get null
  const isProfessional = Boolean(usePortalRole());

  if (isProfessional) return <SeekUntreatedSection />;

  return (
    <section className="cx-anx-notes-section">
      <div className="container">
        <AnxietyNotes nextHref="/anxiety/treatment" nextLabel="Next: Treatment" />
      </div>
    </section>
  );
}
