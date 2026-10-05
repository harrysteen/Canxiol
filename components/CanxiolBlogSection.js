import React from 'react';
import Link from 'next/link';
import BlogCard from './blogs/BlogCard';
import { blogPosts } from './blogs/blogPosts';

export default function CanxiolBlogSection() {
  return (
    <section className="cx-blog-section">
      <div className="container">
        <div className="cx-blog-header-row">
          <h2 className="cx-blog-section-title">Recent blog posts.</h2>
          <Link href="/blogs" className="cx-blog-view-more">
            <span>View more blogs</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.08337 9.91666L9.91671 4.08333M9.91671 4.08333H4.66671M9.91671 4.08333V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="row cx-blog-grid">
          {blogPosts.slice(0, 3).map((post) => (
            <div className="col-12 col-md-4" key={post.id}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
