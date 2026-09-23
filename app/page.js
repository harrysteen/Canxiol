import CanxiolNavbar from '../components/CanxiolNavbar';
import CanxiolHero from '../components/CanxiolHero';
import CanxiolInfoBar from '../components/CanxiolInfoBar';
import CanxiolAnxietySection from '../components/CanxiolAnxietySection';
import CanxiolMeetSection from '../components/CanxiolMeetSection';
import CanxiolGettingHelpSection from '../components/CanxiolGettingHelpSection';
import CanxiolStatsSection from '../components/CanxiolStatsSection';
import CanxiolKnowMoreSection from '../components/CanxiolKnowMoreSection';
import CanxiolFooter from '../components/CanxiolFooter';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <CanxiolNavbar />
      <CanxiolHero />
      <CanxiolInfoBar />
      <CanxiolAnxietySection />
      <CanxiolMeetSection />
      <CanxiolGettingHelpSection />
      <CanxiolStatsSection />
      <CanxiolKnowMoreSection />
      <CanxiolFooter />
    </main>
  );
}
