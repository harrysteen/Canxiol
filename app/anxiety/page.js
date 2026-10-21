import CanxiolNavbar from '../../components/CanxiolNavbar';
import CanxiolFooter from '../../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../../components/PsychiatristInquiryProvider';
import AnxietySubNav from '../../components/anxiety/AnxietySubNav';
import AnxietyHero from '../../components/anxiety/AnxietyHero';
import AnxietyConcernSection from '../../components/anxiety/AnxietyConcernSection';
import AnxietyIndiaScaleSection from '../../components/anxiety/AnxietyIndiaScaleSection';
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
      {/* No bottom info bar on this page, so the hero takes the full screen height */}
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', '--cx-infobar-h': '0px' }}>
        <CanxiolNavbar />
        <AnxietySubNav />
        <AnxietyHero />
        <AnxietyConcernSection />
        <AnxietyIndiaScaleSection />
        <AnxietyWhoSection />
        <AnxietyQuoteBand />
        <AnxietyWhenConcernSection />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
