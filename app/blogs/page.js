import CanxiolNavbar from '../../components/CanxiolNavbar';
import CanxiolInfoBar from '../../components/CanxiolInfoBar';
import CanxiolFooter from '../../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../../components/PsychiatristInquiryProvider';
import BlogsHero from '../../components/blogs/BlogsHero';
import BlogsListSection from '../../components/blogs/BlogsListSection';

export const metadata = {
  title: 'Blogs — Canxiol | Leiutis',
  description: 'Insights that inform. Perspectives that matter. Articles on anxiety, mental health and treatment.',
};

export default function BlogsPage() {
  return (
    <PsychiatristInquiryProvider>
      <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <CanxiolNavbar />
        <BlogsHero />
        <BlogsListSection />
        {/* Sticky to the viewport bottom; rests above the footer at the end of the page */}
        <CanxiolInfoBar />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
