'use client';
import { useState } from 'react';
import Link from 'next/link';

function ArrowUpRight() {
  return (
    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M4.08337 9.91666L9.91671 4.08333M9.91671 4.08333H4.66671M9.91671 4.08333V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="11" height="9" viewBox="0 0 12 10" fill="none" aria-hidden="true">
      <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CardHead({ title, tag, tagClass = '' }) {
  return (
    <div className="cx-contact-card-head">
      <h2 className="cx-contact-card-title">{title}</h2>
      <span className={`cx-contact-card-tag ${tagClass}`}>{tag}</span>
    </div>
  );
}

// Controlled form card. There's no backend yet, so a submit just confirms and clears the fields.
function FormCard({ id, title, tag, intro, fields, submitLabel, thanks }) {
  const empty = Object.fromEntries(fields.map((f) => [f.name, f.defaultValue || '']));
  const [values, setValues] = useState(empty);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setSent(false);
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send `values` to the backend / email service once available
    setValues(empty);
    setSent(true);
  };

  return (
    <div id={id} className="cx-contact-card">
      <CardHead title={title} tag={tag} />
      <p className="cx-contact-card-intro">{intro}</p>

      <form className="cx-contact-form" onSubmit={handleSubmit}>
        {fields.map((f) => (
          <label key={f.name} className={`cx-contact-field ${f.half ? 'is-half' : ''}`}>
            <span className="cx-contact-label">{f.label}</span>
            {f.textarea ? (
              <textarea
                name={f.name}
                rows={4}
                required={f.required}
                placeholder={f.placeholder}
                value={values[f.name]}
                onChange={handleChange}
              />
            ) : (
              <input
                name={f.name}
                type={f.type || 'text'}
                required={f.required}
                placeholder={f.placeholder}
                value={values[f.name]}
                onChange={handleChange}
              />
            )}
          </label>
        ))}

        <div className="cx-contact-form-foot">
          <button type="submit" className="cx-contact-btn cx-contact-btn-solid">
            <span>{submitLabel}</span>
            <ArrowUpRight />
          </button>
          {sent && <p className="cx-contact-sent" role="status">{thanks}</p>}
        </div>
      </form>
    </div>
  );
}

export default function ContactChannelsSection() {
  return (
    <section id="contact-channels" className="cx-contact-channels">
      <div className="container">
        <div className="cx-contact-grid">
          {/* 1. General enquiries */}
          <FormCard
            id="contact-form"
            title="Contact & Stay Informed"
            tag="Direct Channel"
            intro="Connect directly with our team for general queries, institutional partnerships, and product information."
            submitLabel="Send message"
            thanks="Thank you — our team will be in touch shortly."
            fields={[
              { name: 'name', label: 'Name', placeholder: 'Dr. / Mr. / Ms.', required: true, half: true },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'name@institution.com', required: true, half: true },
              { name: 'city', label: 'City', placeholder: 'e.g. Mumbai, Bengaluru', half: true },
              { name: 'country', label: 'Country', defaultValue: 'India', half: true },
              { name: 'message', label: 'Message', placeholder: 'How can our clinical and support team assist you?', required: true, textarea: true },
            ]}
          />

          {/* 2. Product feedback */}
          <FormCard
            id="product-feedback"
            title="Product Feedback"
            tag="Clinical & User Experience"
            intro="Share your experience and clinical or patient feedback on Canxiol® formulations."
            submitLabel="Submit feedback"
            thanks="Thank you — your feedback has been received."
            fields={[
              { name: 'name', label: 'Name', placeholder: 'Your full name', required: true },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'your.email@domain.com', required: true },
              { name: 'feedback', label: 'Product Feedback', placeholder: 'Observations regarding dosing ease, titration, or general experience...', required: true, textarea: true },
            ]}
          />

          {/* 3. Pharmacovigilance */}
          <div id="report-adverse-effects" className="cx-contact-card cx-contact-card-safety">
            <CardHead title="Report Adverse Effects" tag="Safety Protocol" tagClass="is-safety" />
            <p className="cx-contact-card-intro cx-contact-card-intro-strong">
              Dedicated monitoring and pharmacovigilance channel for healthcare professionals and
              patients to report unexpected reactions or adverse events.
            </p>

            <div className="cx-contact-notice">
              <span className="cx-contact-notice-title">Direct Gateway Notice:</span>
              <p>
                In adherence to strict drug safety standards, all adverse event reports are
                forwarded immediately to our certified medical safety officers.
              </p>
            </div>

            <div className="cx-contact-card-foot">
              <Link href="/pharmacovigilance" className="cx-contact-btn cx-contact-btn-teal">
                <span>Report adverse effects</span>
                <ArrowRight />
              </Link>
              <p className="cx-contact-fineprint">
                Strictly dedicated pharmacovigilance pathway. No marketing inquiries processed here.
              </p>
            </div>
          </div>

          {/* 4. Clinical trials */}
          <div id="clinical-trials" className="cx-contact-card">
            <CardHead title="Enrol in Ongoing Clinical Trials" tag="Research & Trials" />
            <p className="cx-contact-card-intro cx-contact-card-intro-strong">
              Register your interest or enquire about clinical evaluation protocols and ongoing
              study updates conducted under strict regulatory oversight.
            </p>

            <ul className="cx-contact-checks">
              <li>Evaluated in RCT-PHASE III study in adults with mild to moderate anxiety.</li>
              <li>Synthetic Cannabidiol (API) manufactured at a USFDA approved facility.</li>
              <li>Prescription Cannabidiol in conjunction with cognitive behavioural therapy.</li>
            </ul>

            <div className="cx-contact-card-foot">
              <Link href="#contact-form" className="cx-contact-btn cx-contact-btn-outline">
                <span>Enquire about clinical trials</span>
                <ArrowRight />
              </Link>
              <p className="cx-contact-fineprint">Institutional and clinician investigator access only.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
