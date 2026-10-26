import { notFound } from 'next/navigation';
import CanxiolNavbar from '../../../components/CanxiolNavbar';
import ProOnlyInfoBar from '../../../components/auth/ProOnlyInfoBar';
import CanxiolFooter from '../../../components/CanxiolFooter';
import PsychiatristInquiryProvider from '../../../components/PsychiatristInquiryProvider';
import BlogArticle from '../../../components/blogs/BlogArticle';
import RelatedBlogsSection from '../../../components/blogs/RelatedBlogsSection';
import { blogPosts, getPostBySlug } from '../../../components/blogs/blogPosts';

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.filter((post) => post.content).map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.articleTitle || post.title} —Canxiol Blogs | Leiutis`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post || !post.content) notFound();

  return (
    <PsychiatristInquiryProvider>
      <main style={{ minHeight: '100vh', backgroundColor: '#FAF9F7' }}>
        <CanxiolNavbar />
        <BlogArticle post={post} />
        <RelatedBlogsSection />
        {/* Prescription notice bar — logged-in pharmacists / psychiatrists only */}
        <ProOnlyInfoBar />
        <CanxiolFooter />
      </main>
    </PsychiatristInquiryProvider>
  );
}
