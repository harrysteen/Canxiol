import { PV_LINKS, PV_RECIPIENT_EMAIL, PV_PHONE, PVPI_TOLL_FREE } from './pvLinks';

const tel = (n) => `tel:${n.replace(/[^\d+]/g, '')}`;

function ArrowUpRight() {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M4.08337 9.91666L9.91671 4.08333M9.91671 4.08333H4.66671M9.91671 4.08333V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PvContactSection() {
  return (
    <section id="pv-contacts" className="cx-pv-contacts">
      <div className="container">
        {/* Regulatory authority band */}
        <div className="cx-pv-authority">
          <span className="cx-pv-authority-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 7.5 10 3l7.5 4.5M3.5 7.5h13M4.5 9v6M8 9v6M12 9v6M15.5 9v6M3 16.5h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="cx-pv-authority-body">
            <span className="cx-pv-eyebrow">Regulatory Authority Distinction</span>
            <h2 className="cx-pv-authority-title">Pharmacovigilance Programme of India (PvPI)</h2>
            <p className="cx-pv-authority-text">
              The Pharmacovigilance Programme of India (PvPI), initiated by the Indian Pharmacopoeia
              Commission (IPC) under the Ministry of Health &amp; Family Welfare, monitors adverse drug
              reactions to ensure patient safety across India. Leiutis operates in full coordination
              with IPC/PvPI reporting directives.
            </p>
          </div>
          <a
            href={PV_LINKS.ipcAdrForms}
            target="_blank"
            rel="noopener noreferrer"
            className="cx-pv-btn cx-pv-btn-dark cx-pv-authority-btn"
          >
            <span>IPC ADR reporting forms</span>
            <ArrowUpRight />
          </a>
        </div>

        {/* Reporting contacts */}
        <span className="cx-pv-eyebrow cx-pv-eyebrow-spaced">Pharmacovigilance &amp; Safety Monitoring</span>
        <h2 className="cx-pv-report-h2">Reporting a adverse effect</h2>
        <p className="cx-pv-report-lead">
          Healthcare professionals and patients are encouraged to report any suspected adverse reactions.
        </p>

        <div className="cx-pv-contact-grid">
          <div className="cx-pv-contact-card">
            <span className="cx-pv-contact-icon" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3.5" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.3" />
                <path d="m2.5 4.5 5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
            </span>
            <h3 className="cx-pv-contact-title">Leiutis Medical &amp; Pharmacovigilance Center</h3>
            <p className="cx-pv-contact-text">Please write to us for any adverse effects</p>
            <dl className="cx-pv-contact-list">
              <div>
                <dt>Email:</dt>
                <dd><a href={`mailto:${PV_RECIPIENT_EMAIL}`}>{PV_RECIPIENT_EMAIL}</a></dd>
              </div>
              <div>
                <dt>Direct Phone:</dt>
                <dd><a href={tel(PV_PHONE)}>{PV_PHONE}</a></dd>
              </div>
            </dl>
          </div>

          <div className="cx-pv-contact-card">
            <span className="cx-pv-contact-icon" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5 2.5 3.5v4c0 3.2 2.3 5.9 5.5 7 3.2-1.1 5.5-3.8 5.5-7v-4L8 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="m5.5 8 1.8 1.8L10.8 6.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3 className="cx-pv-contact-title">India’s Pharmacovigilance Programme (PvPI)</h3>
            <p className="cx-pv-contact-text">
              Adverse events can also be reported to the national pharmacovigilance centre under the
              Indian Pharmacopoeia Commission (IPC):
            </p>
            <dl className="cx-pv-contact-list">
              <div>
                <dt>National Toll-Free:</dt>
                <dd><a href={tel(PVPI_TOLL_FREE)}>{PVPI_TOLL_FREE}</a></dd>
              </div>
              <div>
                <dt>Portal:</dt>
                <dd>
                  <a href={PV_LINKS.ipcPortal} target="_blank" rel="noopener noreferrer">
                    www.ipc.gov.in (PvPI Portal)
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
