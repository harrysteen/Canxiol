import Link from 'next/link';
import PvSubmitReport from './PvSubmitReport';
import { PV_LINKS } from './pvLinks';

function DownloadIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1.75V11M7 11L3.5 7.5M7 11l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M4.08337 9.91666L9.91671 4.08333M9.91671 4.08333H4.66671M9.91671 4.08333V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PvPathwaysSection() {
  const languages = Object.entries(PV_LINKS.patientFormsByLanguage);

  return (
    <section id="pv-pathways" className="cx-pv-pathways">
      <div className="container">
        <div className="cx-pv-grid">
          {/* Patients */}
          <div id="patients" className="cx-pv-col cx-pv-col-patient">
            <h2 className="cx-pv-col-h2">Patients.</h2>
            <p className="cx-pv-col-sub">Report an adverse effect</p>
            <p className="cx-pv-col-intro">
              If you are taking Canxiol and experiencing unexpected symptoms or side effects, you
              can report them directly using the official consumer reporting forms provided
              through the Pharmacovigilance Programme of India.
            </p>

            <div className="cx-pv-panel cx-pv-panel-white">
              <div className="cx-pv-panel-head">
                <h3 className="cx-pv-panel-title">Patient ADR Reporting Forms</h3>
                <span className="cx-pv-badge">{languages.length} Languages</span>
              </div>
              <p className="cx-pv-panel-text">
                Select a language to download the official consumer adverse drug reaction
                reporting form.
              </p>
              <ul className="cx-pv-langs">
                {languages.map(([lang, href]) => (
                  <li key={lang}>
                    <a href={href} className="cx-pv-lang" download>
                      <span>{lang}</span>
                      <DownloadIcon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <PvSubmitReport
              idPrefix="pv-patient"
              namePlaceholder="Rajesh Mehra, MD"
              emailLabel="Email"
              emailPlaceholder="Sun******@gmail.com"
            />
          </div>

          {/* Psychiatrists */}
          <div id="psychiatrists-adr" className="cx-pv-col cx-pv-col-psy">
            <h2 className="cx-pv-col-h2">Psychiatrist.</h2>
            <p className="cx-pv-col-sub">Report an adverse effects</p>
            <p className="cx-pv-col-intro">
              For registered Psychiatrists, physicians, and clinical staff to access and submit the
              Adverse Drug Reaction (ADR) reporting documentation.
            </p>

            <div className="cx-pv-panel cx-pv-panel-mauve">
              <div className="cx-pv-panel-head">
                <h3 className="cx-pv-panel-title cx-pv-panel-title-lg">ADR Reporting Form</h3>
                <span className="cx-pv-version">IPC Version 1.4</span>
              </div>
              <p className="cx-pv-panel-text">
                Download the official Version 1.4 Adverse Drug Reaction reporting form from the
                Indian Pharmacopoeia Commission (IPC).
              </p>
              <div className="cx-pv-adr-actions">
                <a href={PV_LINKS.adrForm} className="cx-pv-btn cx-pv-btn-teal" download>
                  <span>Download ADR reporting form</span>
                  <ArrowUpRight />
                </a>
                <Link href={PV_LINKS.adrInfo} className="cx-pv-btn cx-pv-btn-link">
                  <span>View ADR reporting information</span>
                  <ArrowUpRight />
                </Link>
              </div>
            </div>

            <PvSubmitReport
              idPrefix="pv-psy"
              namePlaceholder="Dr. Rajesh Mehra, MD"
              emailLabel="Professional email"
              emailPlaceholder="clinician@hospital.org"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
