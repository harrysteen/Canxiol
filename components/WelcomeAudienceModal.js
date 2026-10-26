'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePortalRole } from './auth/portalMode';

// "Welcome to Leiutis" audience picker. Opens 7 seconds after a page load and can't be
// dismissed — the visitor must pick Patient, Pharmacist or Psychiatrist. Picking "Patient"
// is remembered for the rest of the browser session so it isn't asked on every page.
// (Logged-in pharmacists / psychiatrists never see it.)
const DELAY_MS = 7000;
const CHOSEN_KEY = 'cx-audience-chosen';

function alreadyChosen() {
  try {
    return sessionStorage.getItem(CHOSEN_KEY) === '1';
  } catch {
    return false;
  }
}

function rememberChoice() {
  try {
    sessionStorage.setItem(CHOSEN_KEY, '1');
  } catch {
    // Storage blocked — the popup may be asked again, which is fine
  }
}
// Pages where the popup never opens: coming-soon and the professional portals
// (/psychiatrist…, /pharmacist… — note the public /psychiatrists page still shows it)
const shouldSkip = (path) =>
  path === '/coming-soon' ||
  /^\/(psychiatrist|pharmacist)(\/|$)/.test(path);

const AUDIENCES = [
  {
    title: 'Patient / General Public',
    desc: 'Information for you and your loved ones.',
    remember: true,
    cta: 'Explore Anxiety',
    // Patients continue on the public home page
    href: '/',
    icon: (
      <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" />
    ),
  },
  {
    title: 'Pharmacist',
    desc: 'Access your professional portal.',
    cta: 'Enter Portal',
    // Portal home — sends visitors who aren't logged in to the pharmacist login
    href: '/pharmacist',
    icon: (
      <>
        <rect x="4.5" y="9" width="15" height="6" rx="3" transform="rotate(-45 12 12)" />
        <path d="m9.9 9.9 4.2 4.2" />
      </>
    ),
  },
  {
    title: 'Psychiatrist',
    desc: 'Access your professional portal.',
    cta: 'Enter Portal',
    href: '/psychiatrist',
    icon: (
      <>
        <path d="M6 4v5a4 4 0 0 0 8 0V4" />
        <path d="M10 13v2a4 4 0 0 0 8 0v-2" />
        <circle cx="18" cy="11" r="2" />
      </>
    ),
  },
];

export default function WelcomeAudienceModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);

  const portalRole = usePortalRole();
  // Logged-in professionals have already chosen — no popup for them
  const skip = shouldSkip(pathname) || Boolean(portalRole);

  // Start the 7-second timer once per page load
  useEffect(() => {
    if (skip || alreadyChosen()) return;
    const timer = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, [skip]);

  const choose = (audience) => {
    if (audience.remember) rememberChoice();
    setOpen(false);
  };

  // While open: the page behind doesn't scroll and focus moves into the dialog.
  // No close button, Esc or outside click — a choice is required.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="cx-welcome-overlay">
      <div
        ref={dialogRef}
        className="cx-welcome"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cx-welcome-title"
        tabIndex={-1}
      >
        <header className="cx-welcome-head">
          <span className="cx-welcome-logo">
            Leiutis<span className="cx-welcome-logo-dot">.</span>
          </span>
          <span className="cx-welcome-tagline">Care. Knowledge. Connection.</span>
        </header>

        <div className="cx-welcome-body">
          <span className="cx-welcome-eyebrow">A thoughtful approach to care</span>
          <h2 id="cx-welcome-title" className="cx-welcome-h2">Welcome to Leiutis</h2>
          <p className="cx-welcome-lead">Please select who you are to continue.</p>

          <div className="cx-welcome-grid">
            {AUDIENCES.map((a) => (
              <Link key={a.title} href={a.href} className="cx-welcome-card" onClick={() => choose(a)}>
                <span className="cx-welcome-icon" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {a.icon}
                  </svg>
                </span>
                <h3 className="cx-welcome-card-title">{a.title}</h3>
                <p className="cx-welcome-card-desc">{a.desc}</p>
                <span className="cx-welcome-card-foot">
                  <span>{a.cta}</span>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 11 11 3M11 3H4.5M11 3v6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <footer className="cx-welcome-foot">
          <span className="cx-welcome-foot-item">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="3" y="7" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
              <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Your privacy matters.
          </span>
          <span className="cx-welcome-foot-item">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m3 8.5 3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Patient access requires no login.
          </span>
        </footer>
      </div>
    </div>
  );
}
