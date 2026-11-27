'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { PSY_DOWNLOADS } from './psychiatrists/psyLinks';

// "Download Official Document" pop-up: scan a QR code to open the Prescribing Information
// Leaflet on a phone, or download it directly. Closes with ×, Esc or a click outside.
// The QR (public/images/pil-qr.svg) points to https://canxiol.com/leaflet — a page
// where the visitor picks one of the leaflet languages (app/leaflet/page.js).
export default function PilDownloadModal({ open, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const languages = Object.entries(PSY_DOWNLOADS.pilByLanguage);

  return (
    <div className="cx-pil-overlay" onClick={onClose}>
      <div
        className="cx-pil-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cx-pil-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="cx-pil-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <header className="cx-pil-head">
          <Image src="/images/canxiol-logo-trim.png" alt="Canxiol" width={587} height={130} className="cx-pil-logo" />
          <span className="cx-pil-tagline">Care. Knowledge. Connection.</span>
        </header>

        <div className="cx-pil-body">
          {/* Left: QR code (hidden on phones) */}
          <div className="cx-pil-col cx-pil-col-qr">
            <p className="cx-pil-lead">
              Scan the QR code with your mobile phone to open the{' '}
              <strong>Prescribing Information Leaflet</strong> in your language
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pil-qr.svg"
              alt="QR code linking to the Canxiol Prescribing Information Leaflet PDF"
              className="cx-pil-qr"
            />
          </div>

          {/* Right: languages + download */}
          <div className="cx-pil-col">
            <h2 id="cx-pil-title" className="cx-pil-lead">
              <strong>Available languages:</strong>
              <br />
              Prescribing Information Leaflet (PIL)
            </h2>
            <ul className="cx-pil-langs">
              {languages.map(([lang, href]) => (
                <li key={lang}>
                  <a
                    href={encodeURI(href)}
                    className="cx-pil-lang"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Open the ${lang} leaflet (PDF)`}
                  >
                    {lang}
                  </a>
                </li>
              ))}
            </ul>
            {/* Phones only (the QR column is hidden there): open the leaflet to read it */}
            <a
              href={PSY_DOWNLOADS.pil}
              className="cx-pil-view"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View PIL</span>
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
                <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={PSY_DOWNLOADS.pil}
              className="cx-pil-download"
              target="_blank"
              rel="noopener noreferrer"
              download="Canxiol Prescribing Information Leaflet.pdf"
            >
              <span>Download PDF (PIL)</span>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1.75V9.75M7 9.75L3.75 6.5M7 9.75L10.25 6.5M2 12.25H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <footer className="cx-pil-foot">
          <span className="cx-pil-foot-item">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="3" y="7" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
              <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Your privacy matters.
          </span>
          <span className="cx-pil-foot-item">
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
