import CanxiolNavbar from '../../../components/CanxiolNavbar';
import CanxiolFooter from '../../../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../../../components/PsychiatristInquiryProvider';
import AnxietySubNav from '../../../components/anxiety/AnxietySubNav';
import AnxietyHero from '../../../components/anxiety/AnxietyHero';
import AnxietyQuoteBand from '../../../components/anxiety/AnxietyQuoteBand';
import AnxietyNotes from '../../../components/anxiety/AnxietyNotes';
import SeekIntroSection from '../../../components/anxiety/SeekIntroSection';
import SeekSignsSection from '../../../components/anxiety/SeekSignsSection';
import SeekProfessionalSection from '../../../components/anxiety/SeekProfessionalSection';

// TODO: swap for the therapy-session cut-out (transparent PNG) once it is added to /public/images
const SEEK_HERO_IMAGE = '/images/when to seek help.png';

export const metadata = {
  title: 'When to Seek Help for Anxiety — Canxiol | Leiutis',
  description: 'Recognize the common signs of an anxiety disorder and when to seek professional help.',
};

export default function WhenToSeekHelpPage() {
  return (
    <PsychiatristInquiryProvider>
      {/* No bottom info bar on this page, so the hero takes the full screen height */}
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', '--cx-infobar-h': '0px' }}>
        <CanxiolNavbar />
        <AnxietySubNav />
        <AnxietyHero
          id="when-to-seek-help"
          title="When to seek help."
          text="Anxiety disorders are common mental health conditions characterized by excessive fear and worry. Understanding when everyday stress transitions into a condition requiring professional support is a vital step toward long-term well-being and recovery."
          imageSrc={SEEK_HERO_IMAGE}
          imageAlt="A man talking with a counsellor who takes notes during a therapy session"
          imageToEdge
        />
        <SeekIntroSection />
        <SeekSignsSection />
        <SeekProfessionalSection />
        <AnxietyQuoteBand>Manage anxiety without worrying about side-effects.</AnxietyQuoteBand>
        {/* Medical disclaimer, sources and the link on to Treatment */}
        <section className="cx-anx-notes-section">
          <div className="container">
            <AnxietyNotes nextHref="/anxiety/treatment" nextLabel="Next: Treatment" />
          </div>
        </section>
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
