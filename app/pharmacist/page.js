import PortalGate from '../../components/auth/PortalGate';
import ProHome from '../../components/pro/ProHome';

export const metadata = {
  title: 'Pharmacist Portal — Canxiol | Leiutis',
  robots: { index: false, follow: false },
};

// Approved pharmacists see the professional Canxiol home; everyone else gets the
// login / under-review screens from PortalGate.
export default function PharmacistPortalPage() {
  return (
    <PortalGate role="pharmacist" fullPage>
      <ProHome role="pharmacist" />
    </PortalGate>
  );
}
