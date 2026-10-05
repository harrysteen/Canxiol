import Image from 'next/image';
import { mediaCoverage } from './mediaCoverage';

const ArrowIcon = () => (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4.08337 9.91666L9.91671 4.08333M9.91671 4.08333H4.66671M9.91671 4.08333V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function MediaCard({ item }) {
  const label = item.type === 'Print' ? 'View coverage' : 'Read article';

  return (
    <div className="cx-media-card">
      <div className="cx-media-img-wrap">
        {item.image && (
          <Image
            src={item.image}
            alt={`${item.outlet}: ${item.title}`}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>
      <div className="cx-media-body">
        <div className="cx-media-meta">
          <span className="cx-media-outlet">{item.outlet}</span>
          <span className="cx-media-date">{item.date} · {item.type}</span>
        </div>
        <h3 className="cx-media-title">{item.title}</h3>
        {item.url ? (
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="cx-media-link">
            {label} <ArrowIcon />
          </a>
        ) : (
          <span className="cx-media-link">{label} <ArrowIcon /></span>
        )}
      </div>
    </div>
  );
}

export default function MediaCoverageSection() {
  return (
    <section className="cx-media">
      <div className="container">
        <div className="cx-media-intro">
          <div>
            <h1 className="cx-media-h1">Leiutis in the media.</h1>
            <p className="cx-media-sub">The latest from Leiutis Pharmaceuticals.</p>
          </div>
          <div className="cx-media-intro-right">
            <p className="cx-media-lead">
              Explore news, media coverage, articles and updates about Leiutis Pharmaceuticals,
              its scientific work and developments around its products.
            </p>
            <a href="#coverage" className="cx-media-cta">
              Explore latest coverage <ArrowIcon />
            </a>
          </div>
        </div>

        <div id="coverage" className="cx-media-grid">
          {mediaCoverage.map((item) => (
            <MediaCard key={item.outlet} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
