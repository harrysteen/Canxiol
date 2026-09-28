'use client';
import { createContext, useCallback, useContext, useState } from 'react';
import PsychiatristInquiryModal from './PsychiatristInquiryModal';

const PsychiatristInquiryContext = createContext(() => {});

// Returns a function that opens the "For Psychiatrist?" inquiry popup
export function useOpenPsychiatristInquiry() {
  return useContext(PsychiatristInquiryContext);
}

export default function PsychiatristInquiryProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openInquiry = useCallback((e) => {
    e?.preventDefault?.();
    setOpen(true);
  }, []);
  const closeInquiry = useCallback(() => setOpen(false), []);

  return (
    <PsychiatristInquiryContext.Provider value={openInquiry}>
      {children}
      <PsychiatristInquiryModal open={open} onClose={closeInquiry} />
    </PsychiatristInquiryContext.Provider>
  );
}
