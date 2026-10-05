import Image from 'next/image';

function ContentBlock({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="cx-article-h2">{block.text}</h2>;
    case 'ul':
      return (
        <ul className="cx-article-ul">
          {block.items.map((item, i) => (
            typeof item === 'string'
              ? <li key={i}>{item}</li>
              : <li key={i}><strong>{item.strong}</strong>{item.text}</li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <div className="cx-article-callout">
          {(block.groups || [block.lines]).map((lines, i) => (
            <div className="cx-article-callout-group" key={i}>
              {lines.map((line) => <p key={line}>{line}</p>)}
            </div>
          ))}
        </div>
      );
    default:
      return (
        <p className={`cx-article-p${block.gap ? ' cx-article-p-gap' : ''}`}>
          {block.strong && <strong>{block.strong}</strong>}
          {block.text}
        </p>
      );
  }
}

export default function BlogArticle({ post }) {
  return (
    <article className="cx-article">
      <header className="container cx-article-header">
        <h1 className="cx-article-h1">{post.articleTitle || post.title}</h1>
        {post.excerpt && <p className="cx-article-excerpt">{post.excerpt}</p>}

        <div className="cx-article-byline">
          <div className="cx-article-author">
            <Image
              src={post.avatar}
              alt={post.author}
              width={56}
              height={56}
              className="cx-article-avatar"
            />
            <div>
              <span className="cx-article-written-by">Written by</span>
              <span className="cx-article-author-name">{post.author},</span>
              {post.authorCredentials && (
                <span className="cx-article-author-cred">{post.authorCredentials}</span>
              )}
            </div>
          </div>
          <span className="cx-article-date">{post.date} · {post.readTime}</span>
        </div>

        <div className="cx-article-cover">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1399px) 100vw, 1320px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </header>

      <div className="container">
        <div className={`cx-article-body${post.spacedParagraphs ? ' cx-article-body-spaced' : ''}`}>
          {post.content.map((block, i) => <ContentBlock key={i} block={block} />)}
        </div>
      </div>
    </article>
  );
}
