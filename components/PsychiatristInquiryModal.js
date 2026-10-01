'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const EMPTY_FORM = { name: '', email: '', city: '', country: 'India', message: '' };

export default function PsychiatristInquiryModal({ open, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const router = useRouter();
  const firstFieldRef = useRef(null);

  // Lock page scroll, focus the first field and close on Escape while open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstFieldRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // Reset the form after the modal has closed
  useEffect(() => {
    if (!open) setForm(EMPTY_FORM);
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send `form` to the backend / email service once available
    onClose();
    router.push('/psychiatrists');
  };

  return (
    <div className="cx-inq-overlay" onMouseDown={onClose}>
      <div
        className="cx-inq-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cx-inq-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className="cx-inq-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="row g-0 align-items-center">
          {/* Left: Intro */}
          <div className="col-12 col-lg-6">
            <div className="cx-inq-intro">
              <h2 id="cx-inq-title" className="cx-inq-h2">
                For{' '}<br />Psychiatrist?
              </h2>
              <p className="cx-inq-lead">
                Enter the information on this portal (Name, Mail ID, City, Country) and leave the
                message to get required scientific information or visit of Scientific
                representative(For India only).
              </p>
              <div className="cx-inq-facts">
                <div>
                  <span className="cx-inq-fact-title">PRESCRIPTION MODALITY</span>
                  <p className="cx-inq-fact-desc">
                    Prescription-only medicine for anxiety disorders under Psychiatrist supervision
                  </p>
                </div>
                <div>
                  <span className="cx-inq-fact-title">PRODUCT COMPLIANCE</span>
                  <p className="cx-inq-fact-desc">
                    Non-narcotic formulation manufactured in GMP certified plant.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form card */}
          <div className="col-12 col-lg-6">
            <div className="cx-inq-card">
              <form onSubmit={handleSubmit}>
                <h3 className="cx-inq-card-title">Scientific Inquiry</h3>
                <p className="cx-inq-card-sub">Fill in the following details to receive requested information.</p>

                <div className="cx-inq-grid">
                  <label className="cx-inq-field">
                    <span className="cx-inq-label">FULL NAME *</span>
                    <input
                      ref={firstFieldRef}
                      name="name"
                      type="text"
                      required
                      placeholder="Dr. Full Name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="cx-inq-field">
                    <span className="cx-inq-label">EMAIL ID *</span>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="doctor@hospital.org"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="cx-inq-field">
                    <span className="cx-inq-label">CITY *</span>
                    <input
                      name="city"
                      type="text"
                      required
                      placeholder="e.g. Mumbai, New Delhi"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="cx-inq-field">
                    <span className="cx-inq-label">COUNTRY *</span>
                    <input
                      name="country"
                      type="text"
                      required
                      value={form.country}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="cx-inq-field cx-inq-field-full">
                    <span className="cx-inq-label">MESSAGE / REQUEST TYPE</span>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Specify requests: Clinical dossier, Phase III poster reprint, or arrange a visit..."
                      value={form.message}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <button type="submit" className="cx-inq-submit">
                  <span>REQUEST SCIENTIFIC INFORMATION</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.08337 9.91666L9.91671 4.08333M9.91671 4.08333H4.66671M9.91671 4.08333V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
