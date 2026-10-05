import BlogCard from './BlogCard';
import { blogPosts } from './blogPosts';

export default function RelatedBlogsSection() {
  return (
    <section className="cx-related-blogs">
      <div className="container">
        <h2 className="cx-blog-section-title cx-blogs-list-title">Recent blog posts.</h2>
        <div className="row cx-blog-grid">
          {blogPosts.slice(0, 3).map((post) => (
            <div className="col-12 col-md-4" key={post.id}>
              <BlogCard post={post} showMeta={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
