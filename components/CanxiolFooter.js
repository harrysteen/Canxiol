'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function CanxiolFooter() {
  return (
    <footer className="cx-footer">
      <div className="container">
        
        {/* Top Grid: Logo & Navigation Columns */}
        <div className="row g-4 g-lg-5 cx-footer-top">
          
          {/* Column 1: Brand & Tagline */}
          <div className="col-12 col-lg-4">
            <div className="cx-footer-brand">
              <Link href="/" aria-label="Canxiol Homepage">
                <Image
                  src="/images/logo.png"
                  alt="Canxiol By Leiutis"
                  width={210}
                  height={60}
                  className="cx-footer-logo-img"
                />
              </Link>
              <p className="cx-footer-tagline">
                Better science.<br />
                Healthier tomorrows.
              </p>
            </div>
          </div>

          {/* Column 2: CANXIOL */}
          <div className="col-6 col-md-4 col-lg-2">
            <h4 className="cx-footer-h4">CANXIOL</h4>
            <ul className="cx-footer-links">
              <li><Link href="#what-is-canxiol">What is Canxiol</Link></li>
              <li><Link href="#anxiety">Anxiety &amp; its effects</Link></li>
              <li><Link href="#how-it-works">How Canxiol works</Link></li>
              <li><Link href="#clinical-evidence">Clinical evidence</Link></li>
            </ul>
          </div>

          {/* Column 3: FOR HEALTHCARE PROFESSIONALS */}
          <div className="col-6 col-md-4 col-lg-3">
            <h4 className="cx-footer-h4">FOR HEALTHCARE PROFESSIONALS</h4>
            <ul className="cx-footer-links">
              <li><Link href="#clinical-evidence">Clinical evidence</Link></li>
              <li><Link href="#prescribing-information">Prescribing information</Link></li>
              <li><Link href="#resources">Resources</Link></li>
            </ul>
          </div>

          {/* Column 4: ABOUT LEIUTIS */}
          <div className="col-12 col-md-4 col-lg-3">
            <h4 className="cx-footer-h4">ABOUT LEIUTIS</h4>
            <ul className="cx-footer-links">
              <li><Link href="#about-us">About us</Link></li>
              <li><Link href="#science-innovation">Science &amp; innovation</Link></li>
              <li><a href="https://leiutis.com" target="_blank" rel="noopener noreferrer">Visit Leiutis</a></li>
            </ul>
          </div>

        </div>

        {/* Horizontal Divider Line */}
        <hr className="cx-footer-divider" />

        {/* Compliance & Legal Information Row */}
        <div className="row align-items-center g-3 cx-footer-compliance">
          <div className="col-12 col-lg-8">
            <p className="cx-footer-disclaimer">
              Canxiol is a prescription medicine. Please read the prescribing information and use only as directed by a qualified healthcare professional.
            </p>
          </div>
          <div className="col-12 col-lg-4 text-lg-end">
            <div className="cx-footer-legal-links">
              <Link href="#patient-leaflet">Patient Information Leaflet</Link>
              <span className="cx-footer-dot">·</span>
              <Link href="#prescribing-info">Prescribing Information</Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Studio Dezu Attribution */}
        <div className="row align-items-center g-2 cx-footer-bottom">
          <div className="col-12 col-md-6">
            <p className="cx-footer-copy">
              © Leiutis Pharmaceuticals LLP. All rights reserved.
            </p>
          </div>
          <div className="col-12 col-md-6 text-md-end">
            <p className="cx-footer-attribution">
              Made by{' '}
              <a
                href="https://studiodezu.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="cx-dezu-link"
              >
                Studio Dezu
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
