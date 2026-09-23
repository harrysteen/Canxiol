'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function CanxiolInfoBar() {
  return (
    <>
      <section className="cx-sticky-infobar">
        <div className="container">
          <div className="row align-items-center g-0">
            
            {/* Item 1 */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="cx-feat-col">
                <span className="cx-prescribe-tag">
                  TO BE PRESCRIBED BY<br />PSYCHIATRISTS ONLY
                </span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="cx-feat-col">
                <h4 className="cx-feat-title">Heal the way you feel</h4>
                <p className="cx-feat-desc">
                  Anxiety is treatable – Seek professional Psychiatric evaluation.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="cx-feat-col">
                <h4 className="cx-feat-title">Prescribing Information Leaflet</h4>
                <Link href="#download-leaflet" className="cx-download-link">
                  <span>Download Official Document</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1.5V8.5M6 8.5L3 5.5M6 8.5L9 5.5M1.5 10.5H10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Item 4 */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="cx-feat-col cx-feat-logo-wrap">
                <Image
                  src="/images/logo.png"
                  alt="Canxiol By Leiutis"
                  width={140}
                  height={38}
                  className="cx-feat-logo"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
