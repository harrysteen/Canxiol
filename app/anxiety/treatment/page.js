import CanxiolNavbar from '../../../components/CanxiolNavbar';
import CanxiolInfoBar from '../../../components/CanxiolInfoBar';
import CanxiolFooter from '../../../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../../../components/PsychiatristInquiryProvider';
import AnxietySubNav from '../../../components/anxiety/AnxietySubNav';
import AnxietyHero from '../../../components/anxiety/AnxietyHero';
import TreatmentApproachSection from '../../../components/anxiety/TreatmentApproachSection';
import TreatmentSupportSection from '../../../components/anxiety/TreatmentSupportSection';
import TreatmentPsychiatristSection from '../../../components/anxiety/TreatmentPsychiatristSection';

// TODO: swap for the man-with-Canxiol cut-out (transparent PNG) once it is added to /public/images
const TREATMENT_HERO_IMAGE = '/images/canxiol_bottle_hand.png';

export const metadata = {
  title: 'Diagnosis and Treatment of Anxiety — Canxiol | Leiutis',
  description: 'How anxiety disorders are diagnosed and treated, supportive everyday strategies, and why seeing a Psychiatrist is a sensible health decision.',
};

export default function TreatmentPage() {
  return (
    <PsychiatristInquiryProvider>
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <CanxiolNavbar />
        <AnxietySubNav />
        <AnxietyHero
          id="treatment"
          title="Diagnosis and Treatment"
          subtitle="Anxiety disorders are treatable."
          text="If anxiety is persistent, difficult to manage, or interfering with daily life, professional assessment is recommended. A diagnosis of an anxiety disorder is made by a qualified healthcare professional (Psychiatrist) after considering the person’s symptoms, their duration, severity, impact on daily functioning, and other possible medical or psychological causes."
          imageSrc={TREATMENT_HERO_IMAGE}
          imageAlt="Young man measuring Canxiol oral solution with a dropper into a glass of water"
        />
        <TreatmentApproachSection />
        <TreatmentSupportSection />
        <TreatmentPsychiatristSection />
        {/* Sticky to the viewport bottom; rests above the footer at the end of the page */}
        <CanxiolInfoBar />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
