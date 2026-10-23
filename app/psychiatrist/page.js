import PortalGate from '../../components/auth/PortalGate';
import ProHome from '../../components/pro/ProHome';

export const metadata = {
  title: 'Psychiatrist Portal — Canxiol | Leiutis',
  robots: { index: false, follow: false },
};

// Approved psychiatrists see the professional Canxiol home; everyone else gets the
// login / under-review screens from PortalGate.
export default function PsychiatristPortalPage() {
  return (
    <PortalGate role="psychiatrist" fullPage>
      <ProHome role="psychiatrist" />
    </PortalGate>
  );
}
