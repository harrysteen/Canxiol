import CanxiolNavbar from '../../../components/CanxiolNavbar';
import CanxiolFooter from '../../../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../../../components/PsychiatristInquiryProvider';
import AnxietySubNav from '../../../components/anxiety/AnxietySubNav';
import AnxietyHero from '../../../components/anxiety/AnxietyHero';
import TreatmentApproachSection from '../../../components/anxiety/TreatmentApproachSection';
import TreatmentSupportSection from '../../../components/anxiety/TreatmentSupportSection';
import TreatmentPsychiatristSection from '../../../components/anxiety/TreatmentPsychiatristSection';

// Same photo as the When to seek help intro. Swap for a background-removed (transparent PNG)
// version once it is added to /public/images, so it blends into the hero like the design.
const TREATMENT_HERO_IMAGE = '/images/when-to-seek-intro.png';

export const metadata = {
  title: 'Diagnosis and Treatment of Anxiety — Canxiol | Leiutis',
  description: 'How anxiety disorders are diagnosed and treated, supportive everyday strategies, and why seeing a Psychiatrist is a sensible health decision.',
};

export default function TreatmentPage() {
  return (
    <PsychiatristInquiryProvider>
      {/* No bottom info bar on this page, so the hero takes the full screen height */}
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', '--cx-infobar-h': '0px' }}>
        <CanxiolNavbar />
        <AnxietySubNav />
        <AnxietyHero
          id="treatment"
          title="Diagnosis and Treatment."
          subtitle="Anxiety disorders are treatable."
          text="If anxiety is persistent, difficult to manage, or interfering with daily life, professional assessment is recommended. A diagnosis of an anxiety disorder is made by a qualified healthcare professional (Psychiatrist) after considering the person’s symptoms, their duration, severity, impact on daily functioning, and other possible medical or psychological causes."
          imageSrc={TREATMENT_HERO_IMAGE}
          imageAlt="Young woman with curly hair smiling with her eyes closed in the open air"
        />
        <TreatmentApproachSection />
        <TreatmentSupportSection />
        <TreatmentPsychiatristSection />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
