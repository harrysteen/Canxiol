import CanxiolNavbar from '../../components/CanxiolNavbar';
import ProOnlyInfoBar from '../../components/auth/ProOnlyInfoBar';
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
        {/* Prescription notice bar — logged-in pharmacists / psychiatrists only */}
        <ProOnlyInfoBar />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
