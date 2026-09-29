'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useOpenPsychiatristInquiry } from './PsychiatristInquiryProvider';

export default function CanxiolNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const openInquiry = useOpenPsychiatristInquiry();
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`cx-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="cx-nav-inner">
            {/* Brand Logo PNG */}
            <Link href="/" className="cx-logo" aria-label="Canxiol Homepage">
              <Image
                src="/images/logo.png"
                alt="Canxiol By Leiutis"
                width={200}
                height={58}
                priority
                className="cx-logo-img"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="cx-links">
              <li><Link href="/anxiety">Anxiety and its effects</Link></li>
              <li><Link href="#canxiol">Canxiol</Link></li>
              <li>
                <button
                  className="cx-link-btn"
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  onBlur={() => setTimeout(() => setResourcesOpen(false), 200)}
                >
                  Resources{' '}
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className={`cx-chevron ${resourcesOpen ? 'open' : ''}`}
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="#68635F"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {resourcesOpen && (
                  <div className="cx-dropdown">
                    <Link href="#patient-resources">Patient Resources</Link>
                    <Link href="#clinical-guidelines">Clinical Guidelines</Link>
                    <Link href="#faqs">FAQs</Link>
                    <Link href="#brochure">Download Brochure</Link>
                  </div>
                )}
              </li>
              <li><Link href="#pharmacovigilance">Pharmacovigilance</Link></li>
              <li><Link href="#about">About Leiutis</Link></li>
            </ul>

            {/* Desktop CTA Buttons */}
            <div className="cx-ctas">
              <Link href="#psychiatrists" className="cx-btn-psychiatrists" onClick={openInquiry}>
                <span>FOR PSYCHIATRISTS</span>
                <Image
                  src="/images/for-psychiatrists-arrow.png"
                  alt=""
                  width={15}
                  height={15}
                  className="cx-arrow-icon"
                />
              </Link>
              <Link href="#contact" className="cx-btn-contact">
                <span>CONTACT US</span>
                <Image
                  src="/images/contact-us-arrow.png"
                  alt=""
                  width={15}
                  height={15}
                  className="cx-btn-contact-arrow"
                />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="cx-burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`cx-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="container">
            <Link href="/anxiety" onClick={() => setMobileMenuOpen(false)}>Anxiety and its effects</Link>
            <Link href="#canxiol" onClick={() => setMobileMenuOpen(false)}>Canxiol</Link>
            <Link href="#patient-resources" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
            <Link href="#pharmacovigilance" onClick={() => setMobileMenuOpen(false)}>Pharmacovigilance</Link>
            <Link href="#about" onClick={() => setMobileMenuOpen(false)}>About Leiutis</Link>
            <div className="cx-drawer-ctas">
              <Link href="#psychiatrists" className="cx-btn-psychiatrists" style={{ width: '100%' }} onClick={(e) => { setMobileMenuOpen(false); openInquiry(e); }}>
                <span>FOR PSYCHIATRISTS</span>
                <Image
                  src="/images/for-psychiatrists-arrow.png"
                  alt=""
                  width={15}
                  height={15}
                  className="cx-arrow-icon"
                />
              </Link>
              <Link href="#contact" className="cx-btn-contact" style={{ width: '100%' }} onClick={() => setMobileMenuOpen(false)}>
                <span>CONTACT US</span>
                <Image
                  src="/images/contact-us-arrow.png"
                  alt=""
                  width={15}
                  height={15}
                  className="cx-btn-contact-arrow"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
