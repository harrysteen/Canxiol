'use client';
import { useEffect, useRef, useState } from 'react';

// "View coverage" button for print stories: opens the newspaper clipping in a pop-up.
// Closes with the × button, the Esc key or a click on the dark backdrop.
export default function ClippingViewer({ src, outlet, title, className, children }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    const trigger = triggerRef.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={className}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        {children}
      </button>

      {open && (
        <div
          className="cx-clip-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${outlet} print coverage`}
          onClick={() => setOpen(false)}
        >
          <div className="cx-clip-box" onClick={(e) => e.stopPropagation()}>
            <button
              ref={closeRef}
              type="button"
              className="cx-clip-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            {/* Plain img: the clipping is shown at its natural size, scaled to fit the screen */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${outlet} newspaper clipping: ${title}`} className="cx-clip-img" />
          </div>
        </div>
      )}
    </>
  );
}
