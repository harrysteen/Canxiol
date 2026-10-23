'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePortalAccount, portalLogOut } from './auth/portalMode';
import { ROLES } from './auth/roles';

// variant "classic": the earlier Canxiol-logo navbar with the Canxiol and About Leiutis links
// (used in the professional portals). homeHref: where the logo goes.
// A logged-in pharmacist or psychiatrist gets the classic navbar on every page, with a
// "Signed in as…" strip and the logo back to their own portal home.
export default function CanxiolNavbar({ variant = 'default', homeHref: homeHrefProp = '/' }) {
  const router = useRouter();
  const account = usePortalAccount();
  const proRole = account ? ROLES[account.role] : null;
  const isPsychiatrist = proRole?.id === 'psychiatrist';
  const [loggingOut, setLoggingOut] = useState(false);

  const logOut = async () => {
    const loginPath = `${proRole?.base || ''}/login`;
    setLoggingOut(true);
    try {
      await portalLogOut();
    } finally {
      setLoggingOut(false);
      router.push(loginPath);
    }
  };
  const classic = variant === 'classic' || Boolean(proRole);
  const homeHref = proRole ? proRole.base : homeHrefProp;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
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
      <header className={`cx-nav ${classic ? 'cx-nav--classic' : ''} ${scrolled ? 'scrolled' : ''}`}>
        {/* Logged-in professional: who's signed in, on every page */}
        {proRole && (
          <div className="cx-nav-account">
            <div className="container cx-nav-account-inner">
              <span className="cx-nav-account-who">
                Signed in as <strong>{account.name || 'your account'}</strong> · {proRole.label}
              </span>
              <button type="button" className="cx-nav-account-logout" onClick={logOut} disabled={loggingOut}>
                {loggingOut ? 'Logging out…' : 'Log out'}
              </button>
            </div>
          </div>
        )}
        <div className="container">
          <div className="cx-nav-inner">
            {classic ? (
              <Link href={homeHref} className="cx-logo" aria-label="Canxiol Homepage">
                <Image
                  src="/images/logo.png"
                  alt="Canxiol By Leiutis"
                  width={200}
                  height={58}
                  priority
                  className="cx-logo-img"
                />
              </Link>
            ) : (
            /* Brand: "Heal The way You Feel" over the Leiutis mark */
            <Link href={homeHref} className="cx-logo cx-logo-lockup" aria-label="Canxiol Homepage">
              <span className="cx-logo-tagline">
                <strong>Heal</strong> The way You <strong>Feel</strong>
              </span>
              <span className="cx-logo-brand">
                <Image
                  src="/images/leiutis logo for about leiuties page.png"
                  alt=""
                  width={36}
                  height={27}
                  priority
                  className="cx-logo-mark"
                />
                Leiutis
              </span>
            </Link>
            )}

            {/* Desktop Navigation Links */}
            <ul className="cx-links">
              <li><Link href="/anxiety">Anxiety and its effects</Link></li>
              {classic && <li><Link href="/canxiol">Canxiol</Link></li>}
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
                    <Link href="/blogs">Blogs</Link>
                    <Link href="/media">Media</Link>
                  </div>
                )}
              </li>
              <li><Link href="/pharmacovigilance">Pharmacovigilance</Link></li>
              {classic && <li><Link href="/about-leiutis">About Leiutis</Link></li>}
            </ul>

            {/* Desktop CTA Buttons */}
            <div className="cx-ctas">
              {isPsychiatrist && (
                <Link href="/psychiatrists" className="cx-btn-psychiatrists">
                  <span>FOR PSYCHIATRISTS</span>
                  <Image
                    src="/images/for-psychiatrists-arrow.png"
                    alt=""
                    width={15}
                    height={15}
                    className="cx-arrow-icon"
                  />
                </Link>
              )}
              <Link href="/contact" className="cx-btn-contact">
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
            {classic && <Link href="/canxiol" onClick={() => setMobileMenuOpen(false)}>Canxiol</Link>}
            {/* Resources expands in place to show its sub-links */}
            <button
              type="button"
              className="cx-drawer-toggle"
              aria-expanded={mobileResourcesOpen}
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
            >
              <span>Resources</span>
              <svg
                width="12"
                height="7"
                viewBox="0 0 10 6"
                fill="none"
                className={`cx-chevron ${mobileResourcesOpen ? 'open' : ''}`}
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {mobileResourcesOpen && (
              <div className="cx-drawer-sub">
                <Link href="/blogs" onClick={() => setMobileMenuOpen(false)}>Blogs</Link>
                <Link href="/media" onClick={() => setMobileMenuOpen(false)}>Media</Link>
              </div>
            )}
            <Link href="/pharmacovigilance" onClick={() => setMobileMenuOpen(false)}>Pharmacovigilance</Link>
            {classic && <Link href="/about-leiutis" onClick={() => setMobileMenuOpen(false)}>About Leiutis</Link>}
            <div className="cx-drawer-ctas">
              {isPsychiatrist && (
                <Link href="/psychiatrists" className="cx-btn-psychiatrists" style={{ width: '100%' }} onClick={() => setMobileMenuOpen(false)}>
                  <span>FOR PSYCHIATRISTS</span>
                  <Image
                    src="/images/for-psychiatrists-arrow.png"
                    alt=""
                    width={15}
                    height={15}
                    className="cx-arrow-icon"
                  />
                </Link>
              )}
              <Link href="/contact" className="cx-btn-contact" style={{ width: '100%' }} onClick={() => setMobileMenuOpen(false)}>
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
