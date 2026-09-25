'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function CanxiolInfoBar() {
  return (
    <>
      <section className="cx-sticky-infobar">
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
                Anxiety is treatable – Seek professional Psychiatric evaluation.
              </p>
            </div>

            {/* Item 3 */}
            <div className="cx-feat-col cx-feat-col-3">
              <h4 className="cx-feat-title">Prescribing Information Leaflet</h4>
              <Link href="#download-leaflet" className="cx-download-link">
                <span>Download Official Document</span>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1.75V9.75M7 9.75L3.75 6.5M7 9.75L10.25 6.5M2 12.25H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* Item 4 */}
            <div className="cx-feat-col cx-feat-col-4 cx-feat-logo-wrap">
              <Image
                src="/images/logo.png"
                alt="Canxiol By Leiutis"
                width={145}
                height={40}
                className="cx-feat-logo"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
