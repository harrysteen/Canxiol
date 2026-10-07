import CanxiolNavbar from '../../components/CanxiolNavbar';
import CanxiolInfoBar from '../../components/CanxiolInfoBar';
import CanxiolFooter from '../../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../../components/PsychiatristInquiryProvider';
import PsyWhatIsSection from '../../components/psychiatrists/PsyWhatIsSection';
import PsyConfigurationSection from '../../components/psychiatrists/PsyConfigurationSection';
import PsyStandOutSection from '../../components/psychiatrists/PsyStandOutSection';
import PsyAdministerSection from '../../components/psychiatrists/PsyAdministerSection';
import PsyClinicalTrialSection from '../../components/psychiatrists/PsyClinicalTrialSection';
import PsyAdverseReactionsSection from '../../components/psychiatrists/PsyAdverseReactionsSection';
import PsyInteractionsSection from '../../components/psychiatrists/PsyInteractionsSection';
import PsyPharmacokineticsSection from '../../components/psychiatrists/PsyPharmacokineticsSection';
import PsyBannerSection from '../../components/psychiatrists/PsyBannerSection';
import PsyLeafletSection from '../../components/psychiatrists/PsyLeafletSection';

export const metadata = {
  title: 'For Psychiatrists — Canxiol | Leiutis',
  description: 'Scientific, clinical and prescribing information on Canxiol for Psychiatrists.',
};

export default function PsychiatristsPage() {
  return (
    <PsychiatristInquiryProvider>
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <CanxiolNavbar />
        <PsyWhatIsSection />
        <PsyConfigurationSection />
        <PsyStandOutSection />
        <PsyAdministerSection />
        <PsyClinicalTrialSection />
        <PsyAdverseReactionsSection />
        <PsyInteractionsSection />
        <PsyPharmacokineticsSection />
        <PsyBannerSection />
        <PsyLeafletSection />
        {/* Sticky to the viewport bottom; rests above the footer at the end of the page */}
        <CanxiolInfoBar />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
