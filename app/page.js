import CanxiolNavbar from '../components/CanxiolNavbar';
import CanxiolHero from '../components/CanxiolHero';
import CanxiolInfoBar from '../components/CanxiolInfoBar';
import CanxiolAnxietySection from '../components/CanxiolAnxietySection';
import CanxiolMeetSection from '../components/CanxiolMeetSection';
import CanxiolGettingHelpSection from '../components/CanxiolGettingHelpSection';
import CanxiolStatsSection from '../components/CanxiolStatsSection';
import CanxiolKnowMoreSection from '../components/CanxiolKnowMoreSection';
import CanxiolBlogSection from '../components/CanxiolBlogSection';
import CanxiolPerspectiveSection from '../components/CanxiolPerspectiveSection';
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
        <CanxiolMeetSection />
        <CanxiolKnowMoreSection />
        <CanxiolBlogSection />
        <CanxiolPerspectiveSection />
        {/* Sticky to the viewport bottom; rests above the footer at the end of the page */}
        <CanxiolInfoBar />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
