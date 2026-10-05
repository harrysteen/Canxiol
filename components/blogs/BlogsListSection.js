'use client';
import { useState } from 'react';
import BlogCard from './BlogCard';
import { blogPosts } from './blogPosts';

const PAGE_SIZE = 6;

export default function BlogsListSection() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const hasMore = visibleCount < blogPosts.length;

  return (
    <section id="recent-blogs" className="cx-blogs-list">
      <div className="container">
        <h2 className="cx-blog-section-title cx-blogs-list-title">Recent blog posts.</h2>

        <div className="row cx-blog-grid">
          {blogPosts.slice(0, visibleCount).map((post) => (
            <div className="col-12 col-md-4" key={post.id}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        {/* Always shown; reveals the next batch while more posts exist */}
        <div className="cx-blogs-load-wrap">
          <button
            type="button"
            className="cx-blogs-load-more"
            onClick={() => hasMore && setVisibleCount((n) => n + PAGE_SIZE)}
          >
            <span>Load more blogs</span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.08337 9.91666L9.91671 4.08333M9.91671 4.08333H4.66671M9.91671 4.08333V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
