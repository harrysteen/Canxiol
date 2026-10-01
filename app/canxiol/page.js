import CanxiolNavbar from '../../components/CanxiolNavbar';
import CanxiolInfoBar from '../../components/CanxiolInfoBar';
import CanxiolFooter from '../../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../../components/PsychiatristInquiryProvider';
import CanxiolPageHero from '../../components/canxiol/CanxiolPageHero';
import CanxiolWhatIsSection from '../../components/canxiol/CanxiolWhatIsSection';
import CanxiolWhenSection from '../../components/canxiol/CanxiolWhenSection';
import CanxiolHowToTakeSection from '../../components/canxiol/CanxiolHowToTakeSection';
import CanxiolDoseTimingSection from '../../components/canxiol/CanxiolDoseTimingSection';
import CanxiolStorageSection from '../../components/canxiol/CanxiolStorageSection';
import CanxiolQuestionsSection from '../../components/canxiol/CanxiolQuestionsSection';

export const metadata = {
  title: 'Canxiol — Cannabidiol Oral Solution 150 mg/mL | Leiutis',
  description: 'Canxiol is a prescription cannabidiol oral solution for management of mild to moderate anxiety disorders.',
};

export default function CanxiolPage() {
  return (
    <PsychiatristInquiryProvider>
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <CanxiolNavbar />
        <CanxiolPageHero />
        <CanxiolWhatIsSection />
        <CanxiolWhenSection />
        <CanxiolHowToTakeSection />
        <CanxiolDoseTimingSection />
        <CanxiolStorageSection />
        <CanxiolQuestionsSection />
        {/* Sticky to the viewport bottom; rests above the footer at the end of the page */}
        <CanxiolInfoBar />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
