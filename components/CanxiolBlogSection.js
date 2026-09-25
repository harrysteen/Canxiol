import React from 'react';
import Image from 'next/image';

export default function CanxiolBlogSection() {
  const blogPosts = [
    {
      id: 1,
      image: '/images/blog_img_1.jpg',
      title: 'Student anxiety can hide behind a life that looks fine.',
      author: 'Jana Smith',
      date: '18 September 2026',
      readTime: '4 min read',
      avatar: '/images/blog_avatar.jpg'
    },
    {
      id: 2,
      image: '/images/blog_img_2.jpg',
      title: 'The Anxiety remains unrecognised - Until It Gets Too Loud to Ignore',
      author: 'Jana Smith',
      date: '18 September 2026',
      readTime: '4 min read',
      avatar: '/images/blog_avatar.jpg'
    },
    {
      id: 3,
      image: '/images/blog_img_3.jpg',
      title: "Anxiety Isn't a Personality Flaw. It's a Medical Condition, Like Any Other",
      author: 'Jana Smith',
      date: '18 September 2026',
      readTime: '4 min read',
      avatar: '/images/blog_avatar.jpg'
    }
  ];

  return (
    <section className="cx-blog-section">
      <div className="container">
        <div className="cx-blog-header-row">
          <h2 className="cx-blog-section-title">Recent blog posts</h2>
          <a href="#more-blogs" className="cx-blog-view-more">
            <span>View more blogs</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.08337 9.91666L9.91671 4.08333M9.91671 4.08333H4.66671M9.91671 4.08333V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        
        <div className="row cx-blog-grid">
          {blogPosts.map((post) => (
            <div className="col-12 col-md-4" key={post.id}>
              <div className="cx-blog-card">
                <div className="cx-blog-img-wrap">
                  <Image 
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h4 className="cx-blog-title">{post.title}</h4>
                <div className="cx-blog-meta">
                  <Image 
                    src={post.avatar}
                    alt={post.author}
                    width={32}
                    height={32}
                    className="cx-blog-avatar"
                  />
                  <span className="cx-blog-meta-text">
                    {post.author}, {post.date} · {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
