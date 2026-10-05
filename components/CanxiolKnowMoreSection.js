'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useOpenPsychiatristInquiry } from './PsychiatristInquiryProvider';

export default function CanxiolKnowMoreSection() {
  const openInquiry = useOpenPsychiatristInquiry();

  return (
    <section id="know-more" className="cx-know-section">
      <div className="container">
        
        {/* Top Heading */}
        <div className="cx-know-header">
          <h2 className="cx-know-h2">
            Know more<br />
            about Canxiol.
          </h2>
        </div>

        {/* Dual Portal Cards Container */}
        <div className="cx-know-portals">
          <div className="row g-0 align-items-stretch">
            
            {/* Left Card: For Patients */}
            <div className="col-12 col-lg-6">
              <div className="cx-portal-card cx-portal-patient">
                <div className="cx-portal-content">
                  <span className="cx-portal-eyebrow">FOR PATIENTS</span>
                  <h3 className="cx-portal-title">Understand<br />Canxiol</h3>
                  <p className="cx-portal-desc">
                    Learn about Canxiol, who it is intended for, how it is taken.
                  </p>
                  <Link href="#patient-info" className="cx-btn-portal-outline">
                    <span>PATIENT INFORMATION</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.08337 9.91666L9.91671 4.08333M9.91671 4.08333H4.66671M9.91671 4.08333V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
                <div className="cx-portal-img-wrap">
                  <Image
                    src="/images/home pahe understand canxiol.png"
                    alt="Woman patient taking Canxiol solution"
                    fill
                    sizes="(max-width: 991px) 100vw, 50vw"
                    className="cx-portal-img"
                  />
                </div>
              </div>
            </div>

            {/* Right Card: For Psychiatrists */}
            <div className="col-12 col-lg-6">
              <div className="cx-portal-card cx-portal-doctor">
                <div className="cx-portal-content">
                  <span className="cx-portal-eyebrow">FOR PSYCHIATRISTS</span>
                  <h3 className="cx-portal-title">Go deeper into<br />the science of Canxiol</h3>
                  <p className="cx-portal-desc">
                    Access detailed scientific, clinical, and prescribing information.
                  </p>
                  <button
                    type="button"
                    className="cx-btn-portal-solid"
                    onClick={openInquiry}
                  >
                    <span>FOR PSYCHIATRISTS</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.08337 9.91666L9.91671 4.08333M9.91671 4.08333H4.66671M9.91671 4.08333V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="cx-portal-img-wrap">
                  <Image
                    src="/images/home page go diper into scince of canxiol.png"
                    alt="Psychiatrist doctor holding Canxiol bottle"
                    fill
                    sizes="(max-width: 991px) 100vw, 50vw"
                    className="cx-portal-img"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
