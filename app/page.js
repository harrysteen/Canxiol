import CanxiolNavbar from '../components/CanxiolNavbar';
import CanxiolHero from '../components/CanxiolHero';
import CanxiolNoticeBar from '../components/CanxiolNoticeBar';
import CanxiolAnxietySection from '../components/CanxiolAnxietySection';
import CanxiolGettingHelpSection from '../components/CanxiolGettingHelpSection';
import CanxiolStatsSection from '../components/CanxiolStatsSection';
import AnxietyGlobalSection from '../components/anxiety/AnxietyGlobalSection';
import SeekUntreatedSection from '../components/anxiety/SeekUntreatedSection';
import CanxiolSmallStepSection from '../components/CanxiolSmallStepSection';
import CanxiolBlogSection from '../components/CanxiolBlogSection';
import CanxiolChoosePathSection from '../components/CanxiolChoosePathSection';
import CanxiolFooter from '../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../components/PsychiatristInquiryProvider';

export default function Home() {
  return (
    <PsychiatristInquiryProvider>
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <CanxiolNavbar />
        <CanxiolHero />
        <CanxiolAnxietySection />
        <CanxiolStatsSection />
        <CanxiolGettingHelpSection />
        <AnxietyGlobalSection
          className="cx-anx-global--home"
          animatedBg
          eyebrow={null}
          heading={<>A Global Perspective<br />on Anxiety</>}
          lead="Anxiety disorders are the most common mental health condition worldwide, affecting 359 million people in 2021. (WHO, 2025)"
        />
        <SeekUntreatedSection variant="home" />
        <CanxiolSmallStepSection />
        <CanxiolBlogSection />
        <CanxiolChoosePathSection />
        {/* Sticky to the viewport bottom; rests above the footer at the end of the page */}
        <CanxiolNoticeBar />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
