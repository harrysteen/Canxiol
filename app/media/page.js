import CanxiolNavbar from '../../components/CanxiolNavbar';
import CanxiolInfoBar from '../../components/CanxiolInfoBar';
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
        {/* Sticky to the viewport bottom; rests above the footer at the end of the page */}
        <CanxiolInfoBar />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
