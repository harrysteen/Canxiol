import CanxiolNavbar from '../../components/CanxiolNavbar';
import CanxiolInfoBar from '../../components/CanxiolInfoBar';
import CanxiolFooter from '../../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../../components/PsychiatristInquiryProvider';
import AboutHero from '../../components/about/AboutHero';
import AboutResearchSection from '../../components/about/AboutResearchSection';
import AboutDecadeSection from '../../components/about/AboutDecadeSection';
import AboutSmileSection from '../../components/about/AboutSmileSection';
import AboutHealSection from '../../components/about/AboutHealSection';
import CanxiolPerspectiveSection from '../../components/CanxiolPerspectiveSection';

export const metadata = {
  title: 'About Leiutis — Where science becomes care',
  description: 'Leiutis turns scientific advances into care that changes patients’ lives.',
};

export default function AboutLeiutisPage() {
  return (
    <PsychiatristInquiryProvider>
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <CanxiolNavbar />
        <AboutHero />
        <AboutResearchSection />
        <AboutDecadeSection />
        <AboutSmileSection />
        <AboutHealSection />
        <CanxiolPerspectiveSection showButtons />
        {/* Sticky to the viewport bottom; rests above the footer at the end of the page */}
        <CanxiolInfoBar />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
