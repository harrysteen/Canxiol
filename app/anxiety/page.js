import CanxiolNavbar from '../../components/CanxiolNavbar';
import CanxiolInfoBar from '../../components/CanxiolInfoBar';
import CanxiolFooter from '../../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../../components/PsychiatristInquiryProvider';
import AnxietySubNav from '../../components/anxiety/AnxietySubNav';
import AnxietyHero from '../../components/anxiety/AnxietyHero';
import AnxietyConcernSection from '../../components/anxiety/AnxietyConcernSection';
import AnxietyIndiaScaleSection from '../../components/anxiety/AnxietyIndiaScaleSection';
import AnxietyGlobalSection from '../../components/anxiety/AnxietyGlobalSection';
import AnxietyWhoSection from '../../components/anxiety/AnxietyWhoSection';
import AnxietyQuoteBand from '../../components/anxiety/AnxietyQuoteBand';
import AnxietyWhenConcernSection from '../../components/anxiety/AnxietyWhenConcernSection';

export const metadata = {
  title: 'Anxiety and its Effects — Canxiol | Leiutis',
  description: 'Understand anxiety disorders, when to seek help, and available treatment options.',
};

export default function AnxietyPage() {
  return (
    <PsychiatristInquiryProvider>
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <CanxiolNavbar />
        <AnxietySubNav />
        <AnxietyHero />
        <AnxietyConcernSection />
        <AnxietyIndiaScaleSection />
        <AnxietyGlobalSection />
        <AnxietyWhoSection />
        <AnxietyQuoteBand />
        <AnxietyWhenConcernSection />
        {/* Sticky to the viewport bottom; rests above the footer at the end of the page */}
        <CanxiolInfoBar />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
