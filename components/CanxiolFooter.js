'use client';
import Link from 'next/link';
import { usePortalRole } from './auth/portalMode';
import { ROLES } from './auth/roles';
import ProFooter from './pro/ProFooter';

export default function CanxiolFooter() {
  // A logged-in pharmacist or psychiatrist keeps the classic footer on every page
  const portalRole = usePortalRole();
  if (ROLES[portalRole]) return <ProFooter homeHref={ROLES[portalRole].base} />;

  return (
    <footer className="cx-footer">
      <div className="container">
        
        {/* Top Grid: Tagline & Navigation Columns */}
        <div className="row g-4 g-lg-5 cx-footer-top">

          {/* Column 1: Tagline */}
          <div className="col-12 col-lg-8">
            <Link href="/" className="cx-footer-tagline-link" aria-label="Canxiol Homepage">
              <p className="cx-footer-tagline">
                <strong>Heal</strong> The way<br />
                You <strong>Feel</strong>
              </p>
            </Link>
          </div>

          {/* Column 2: FOR PATIENTS */}
          <div className="col-6 col-md-6 col-lg-2">
            <h4 className="cx-footer-h4">FOR PATIENTS</h4>
            <ul className="cx-footer-links">
              <li><Link href="/anxiety">Anxiety and its effects</Link></li>
              <li><Link href="/pharmacovigilance">Pharmacovigilance</Link></li>
              <li><Link href="/contact">Contact us</Link></li>
            </ul>
          </div>

          {/* Column 3: RESOURCES */}
          <div className="col-6 col-md-6 col-lg-2">
            <h4 className="cx-footer-h4">RESOURCES</h4>
            <ul className="cx-footer-links">
              <li><Link href="/blogs">Blogs</Link></li>
              <li><Link href="/media">Media</Link></li>
            </ul>
          </div>

        </div>

        {/* Horizontal Divider Line */}
        <hr className="cx-footer-divider" />

        {/* Bottom: Copyright & credit on the left, legal links on the right */}
        <div className="row align-items-center g-2 cx-footer-bottom">
          <div className="col-12 col-md-6">
            <p className="cx-footer-copy">
              © Leiutis Pharmaceuticals LLP. All rights reserved.
              <span className="cx-footer-dot"> · </span>
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
          <div className="col-12 col-md-6 text-md-end">
            <div className="cx-footer-legal-links">
              <Link href="/psychiatrists#prescribing-information">Patient Information Leaflet</Link>
              <span className="cx-footer-dot">·</span>
              <Link href="/psychiatrists#prescribing-information">Prescribing Information</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
