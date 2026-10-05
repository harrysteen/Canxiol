import Image from 'next/image';
import Link from 'next/link';
import { postHref } from './blogPosts';

export default function BlogCard({ post, showMeta = true }) {
  const href = postHref(post);

  const card = (
    <div className="cx-blog-card">
      <div className="cx-blog-img-wrap">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 767px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <h4 className="cx-blog-title">{post.title}</h4>
      {showMeta && (
        <div className="cx-blog-meta">
          <Image
            src={post.avatar}
            alt={post.author}
            width={40}
            height={40}
            className="cx-blog-avatar"
          />
          <span className="cx-blog-meta-text">
            {post.author}{post.authorCredentials && `, ${post.authorCredentials}`} · {post.date} · {post.readTime}
          </span>
        </div>
      )}
    </div>
  );

  // Posts without an article page yet render as a plain card
  return href ? <Link href={href} className="cx-blog-card-link">{card}</Link> : card;
}
