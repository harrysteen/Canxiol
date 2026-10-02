'use client';
import { useRef, useState } from 'react';
import { PV_RECIPIENT_EMAIL } from './pvLinks';

const MAX_BYTES = 25 * 1024 * 1024;
const ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
const EMPTY = { name: '', email: '', phone: '', notes: '' };

// "Submit completed report" card: file drop zone + contact fields.
// There's no backend yet, so submitting only confirms and clears the form.
export default function PvSubmitReport({ idPrefix, namePlaceholder, emailLabel, emailPlaceholder }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [dragging, setDragging] = useState(false);
  const [values, setValues] = useState(EMPTY);
  const [sent, setSent] = useState(false);

  const pickFile = (f) => {
    setSent(false);
    if (!f) return;
    if (f.size > MAX_BYTES) {
      setFile(null);
      setFileError('This file is larger than 25MB. Please attach a smaller file.');
      return;
    }
    setFileError('');
    setFile(f);
  };

  const handleChange = (e) => {
    setSent(false);
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setFileError('Please attach your completed ADR form.');
      return;
    }
    // TODO: upload `file` and send `values` to the safety inbox once a backend is available
    setFile(null);
    setValues(EMPTY);
    if (inputRef.current) inputRef.current.value = '';
    setSent(true);
  };

  return (
    <form className="cx-pv-submit" onSubmit={handleSubmit}>
      <h3 className="cx-pv-submit-title">Submit completed report</h3>
      <p className="cx-pv-submit-sub">
        Send the completed ADR form directly to the Leiutis Pharmacovigilance safety team.
      </p>

      <div className="cx-pv-secure">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="3" y="7" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
          <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <p>
          <strong>Secure Transmission:</strong> Submissions are encrypted via HTTPS and handled under
          strict confidentiality in compliance with medical data privacy regulations.
        </p>
      </div>

      <span className="cx-pv-label">Upload completed ADR form (PDF, DOCX, Scan)</span>
      <label
        htmlFor={`${idPrefix}-file`}
        className={`cx-pv-drop ${dragging ? 'is-dragging' : ''} ${file ? 'has-file' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          pickFile(e.dataTransfer.files?.[0]);
        }}
      >
        <svg width="22" height="20" viewBox="0 0 24 22" fill="none" aria-hidden="true">
          <path d="M7 16H6a5 5 0 0 1-.6-9.96A6.5 6.5 0 0 1 18 7a4.5 4.5 0 0 1 0 9h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 11v9M8.5 14.5 12 11l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="cx-pv-drop-title">
          {file ? file.name : 'Click to attach file or drag & drop'}
        </span>
        <span className="cx-pv-drop-sub">
          {file ? 'Click to choose a different file' : 'Max file size 25MB · Encrypted upload'}
        </span>
        <input
          ref={inputRef}
          id={`${idPrefix}-file`}
          type="file"
          accept={ACCEPT}
          className="cx-pv-file-input"
          onChange={(e) => pickFile(e.target.files?.[0])}
        />
      </label>
      {fileError && <p className="cx-pv-error" role="alert">{fileError}</p>}

      <div className="cx-pv-fields">
        <label className="cx-pv-field">
          <span className="cx-pv-label">Full name &amp; title</span>
          <input name="name" required placeholder={namePlaceholder} value={values.name} onChange={handleChange} />
        </label>
        <label className="cx-pv-field">
          <span className="cx-pv-label">{emailLabel}</span>
          <input name="email" type="email" required placeholder={emailPlaceholder} value={values.email} onChange={handleChange} />
        </label>
        <label className="cx-pv-field is-full">
          <span className="cx-pv-label">Contact / phone number</span>
          <input name="phone" type="tel" placeholder="+91 98000 00000" value={values.phone} onChange={handleChange} />
        </label>
        <label className="cx-pv-field is-full">
          <span className="cx-pv-label">Additional information or observations</span>
          <textarea
            name="notes"
            rows={3}
            placeholder="Clinical context, co-prescriptions, dose titration timeline..."
            value={values.notes}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="cx-pv-submit-foot">
        <p className="cx-pv-recipient">
          Recipient: [ <a href={`mailto:${PV_RECIPIENT_EMAIL}`}>{PV_RECIPIENT_EMAIL}</a> ]
        </p>
        <button type="submit" className="cx-pv-btn cx-pv-btn-dark">
          <span>Submit report</span>
          <svg width="9" height="10" viewBox="0 0 9 10" fill="none" aria-hidden="true">
            <path d="M1 1l7 4-7 4V1Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      {sent && (
        <p className="cx-pv-sent" role="status">
          Thank you — your report has been received by the safety team.
        </p>
      )}
    </form>
  );
}
