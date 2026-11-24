import CanxiolNavbar from '../../components/CanxiolNavbar';
import ProOnlyInfoBar from '../../components/auth/ProOnlyInfoBar';
import CanxiolFooter from '../../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../../components/PsychiatristInquiryProvider';
import MediaCoverageSection from '../../components/media/MediaCoverageSection';

export const metadata = {
  title: 'Leiutis in the Media — Canxiol | Leiutis',
  description: 'News, media coverage, articles and updates about Leiutis Pharmaceuticals, its scientific work and its products.',
};

export default function MediaPage() {
  return (
    <PsychiatristInquiryProvider>
      <main style={{ minHeight: '100vh', backgroundColor: '#FAF9F7' }}>
        <CanxiolNavbar />
        <MediaCoverageSection />
        {/* Sticky info bar: logged-in pharmacists / psychiatrists only, not patients */}
        <ProOnlyInfoBar />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
