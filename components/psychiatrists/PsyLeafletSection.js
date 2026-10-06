import { PSY_DOWNLOADS } from './psyLinks';

export default function PsyLeafletSection() {
  return (
    <section id="prescribing-information" className="cx-psy-pil">
      <div className="container">
        <div className="cx-psy-pil-card">
          <div className="cx-psy-pil-info">
            <span className="cx-psy-teal-label">PRESCRIBING EDUCATION RESOURCE</span>
            <h2 className="cx-psy-pil-title">Prescribing Information Leaflet (PIL)</h2>
            <p className="cx-psy-pil-sub">Download the document</p>
          </div>
          <a href={PSY_DOWNLOADS.pil} className="cx-psy-btn-dark" target="_blank" rel="noopener noreferrer">
            <span>DOWNLOAD PDF (PIL)</span>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1.75V9.75M7 9.75L3.75 6.5M7 9.75L10.25 6.5M2 12.25H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Full-width row under the title and button, as in the design */}
          <div className="cx-psy-pil-langs">
            <span className="cx-psy-pil-langs-label">Available languages:</span>
            {Object.entries(PSY_DOWNLOADS.pilByLanguage).map(([lang, href]) => (
              <a key={lang} href={href} className="cx-psy-pil-lang" target="_blank" rel="noopener noreferrer">{lang}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
