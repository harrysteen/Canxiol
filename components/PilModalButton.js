'use client';
import { useCallback, useState } from 'react';
import PilDownloadModal from './PilDownloadModal';

// A button that opens the Prescribing Information Leaflet pop-up (QR code + download).
// Used where a "Download PDF (PIL)" button should show the pop-up instead of the PDF.
export default function PilModalButton({ className, children }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)} aria-haspopup="dialog">
        {children}
      </button>
      <PilDownloadModal open={open} onClose={close} />
    </>
  );
}
