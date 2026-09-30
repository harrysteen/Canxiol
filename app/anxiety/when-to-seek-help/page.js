import CanxiolNavbar from '../../../components/CanxiolNavbar';
import CanxiolInfoBar from '../../../components/CanxiolInfoBar';
import CanxiolFooter from '../../../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../../../components/PsychiatristInquiryProvider';
import AnxietySubNav from '../../../components/anxiety/AnxietySubNav';
import AnxietyHero from '../../../components/anxiety/AnxietyHero';
import AnxietyQuoteBand from '../../../components/anxiety/AnxietyQuoteBand';
import SeekIntroSection from '../../../components/anxiety/SeekIntroSection';
import SeekSignsSection from '../../../components/anxiety/SeekSignsSection';
import SeekProfessionalSection from '../../../components/anxiety/SeekProfessionalSection';
import SeekUntreatedSection from '../../../components/anxiety/SeekUntreatedSection';

// TODO: swap for the therapy-session cut-out (transparent PNG) once it is added to /public/images
const SEEK_HERO_IMAGE = '/images/psychiatrist-doctor.png';

export const metadata = {
  title: 'When to Seek Help for Anxiety — Canxiol | Leiutis',
  description: 'Recognize the common signs of an anxiety disorder, when to seek professional help, and what happens when anxiety goes untreated.',
};

export default function WhenToSeekHelpPage() {
  return (
    <PsychiatristInquiryProvider>
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <CanxiolNavbar />
        <AnxietySubNav />
        <AnxietyHero
          id="when-to-seek-help"
          title="When to seek help"
          text="Anxiety disorders are common mental health conditions characterized by excessive fear and worry. Understanding when everyday stress transitions into a condition requiring professional support is a vital step toward long-term well-being and recovery."
          imageSrc={SEEK_HERO_IMAGE}
          imageAlt="A man talking with a counsellor who takes notes during a therapy session"
        />
        <SeekIntroSection />
        <SeekSignsSection />
        <SeekProfessionalSection />
        <AnxietyQuoteBand>Manage anxiety without worrying about side-effects.</AnxietyQuoteBand>
        <SeekUntreatedSection />
        {/* Sticky to the viewport bottom; rests above the footer at the end of the page */}
        <CanxiolInfoBar />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
