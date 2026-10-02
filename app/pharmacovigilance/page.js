import CanxiolNavbar from '../../components/CanxiolNavbar';
import CanxiolInfoBar from '../../components/CanxiolInfoBar';
import CanxiolFooter from '../../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../../components/PsychiatristInquiryProvider';
import PvHero from '../../components/pharmacovigilance/PvHero';
import PvPathwaysSection from '../../components/pharmacovigilance/PvPathwaysSection';
import PvContactSection from '../../components/pharmacovigilance/PvContactSection';

export const metadata = {
  title: 'Pharmacovigilance — Canxiol | Leiutis',
  description: 'Report a suspected adverse reaction to Canxiol and access the reporting documents for psychiatrists and patients.',
};

export default function PharmacovigilancePage() {
  return (
    <PsychiatristInquiryProvider>
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <CanxiolNavbar />
        <PvHero />
        <PvPathwaysSection />
        <PvContactSection />
        {/* Sticky to the viewport bottom; rests above the footer at the end of the page */}
        <CanxiolInfoBar />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
