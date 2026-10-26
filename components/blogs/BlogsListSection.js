import BlogCard from './BlogCard';
import { blogPosts } from './blogPosts';

// Every post is listed (no "load more")
export default function BlogsListSection() {
  return (
    <section id="recent-blogs" className="cx-blogs-list">
      <div className="container">
        <h2 className="cx-blog-section-title cx-blogs-list-title">Recent blog posts.</h2>

        <div className="row cx-blog-grid">
          {blogPosts.map((post) => (
            <div className="col-12 col-md-4" key={post.id}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
