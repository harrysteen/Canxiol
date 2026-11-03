import CanxiolNavbar from '../../components/CanxiolNavbar';
import CanxiolFooter from '../../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../../components/PsychiatristInquiryProvider';
import PvHero from '../../components/pharmacovigilance/PvHero';
import PvPathwaysForRole from '../../components/pharmacovigilance/PvPathwaysForRole';
import PvContactSection from '../../components/pharmacovigilance/PvContactSection';

export const metadata = {
  title: 'Pharmacovigilance — Canxiol | Leiutis',
  description: 'Report a suspected adverse reaction to Canxiol and access the patient reporting documents.',
};

export default function PharmacovigilancePage() {
  return (
    <PsychiatristInquiryProvider>
      {/* No bottom info bar on this page, so the hero takes the full screen height */}
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', '--cx-infobar-h': '0px' }}>
        <CanxiolNavbar />
        <PvHero />
        {/* Patients only; logged-in pharmacists and psychiatrists also get the Psychiatrist column */}
        <PvPathwaysForRole />
        <PvContactSection />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
