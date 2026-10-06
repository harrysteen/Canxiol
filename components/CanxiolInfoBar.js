'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function CanxiolInfoBar() {
  const barRef = useRef(null);

  // Publish the bar's rendered height so the hero can leave room for it
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const root = document.documentElement;
    const update = () => {
      const pinned = getComputedStyle(bar).position === 'sticky';
      root.style.setProperty('--cx-infobar-h', pinned ? `${bar.offsetHeight}px` : '0px');
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
      root.style.removeProperty('--cx-infobar-h');
    };
  }, []);

  return (
    <>
      <section ref={barRef} className="cx-sticky-infobar">
        <div className="container">
          <div className="cx-infobar-grid">

            {/* Item 1 */}
            <div className="cx-feat-col cx-feat-col-1">
              <span className="cx-prescribe-tag">
                TO BE PRESCRIBED BY<br />PSYCHIATRISTS ONLY
              </span>
            </div>

            {/* Item 2 */}
            <div className="cx-feat-col cx-feat-col-2">
              <h4 className="cx-feat-title">Heal the way you feel</h4>
              <p className="cx-feat-desc">
                Anxiety is treatable – Seek Psychiatrist guidance.
              </p>
            </div>

            {/* Item 3 */}
            <div className="cx-feat-col cx-feat-col-3">
              <h4 className="cx-feat-title">Prescribing Information Leaflet</h4>
              <a
                href="/pdfs/canxiol-prescribing-information-leaflet.pdf"
                className="cx-download-link"
                target="_blank"
                rel="noopener noreferrer"
                download="Canxiol Prescribing Information Leaflet.pdf"
              >
                <span>Download <span className="cx-dl-official">Official </span>Document</span>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1.75V9.75M7 9.75L3.75 6.5M7 9.75L10.25 6.5M2 12.25H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* Item 4 */}
            <div className="cx-feat-col cx-feat-col-4 cx-feat-logo-wrap">
              <Image
                src="/images/logo.png"
                alt="Canxiol By Leiutis"
                width={180}
                height={90}
                className="cx-feat-logo"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
