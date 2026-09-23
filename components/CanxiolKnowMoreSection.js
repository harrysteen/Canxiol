'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function CanxiolKnowMoreSection() {
  const configs = [
    {
      num: 'CONFIGURATION 01',
      title: '14 mL bottle',
      image: '/images/canxiol-14ml-config.jpg',
      alt: 'Canxiol Cannabidiol Oral Solution 14 mL bottle and packaging box',
    },
    {
      num: 'CONFIGURATION 02',
      title: '28 mL bottle',
      image: '/images/canxiol-28ml-config.jpg',
      alt: 'Canxiol Cannabidiol Oral Solution 28 mL bottle and packaging box',
    },
  ];

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
                  <h3 className="cx-portal-title">Understand<br />Canxiol.</h3>
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
                    src="/images/patient-info-woman.jpg"
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
                  <h3 className="cx-portal-title">Go deeper into<br />The science of Canxiol</h3>
                  <p className="cx-portal-desc">
                    Access detailed scientific, clinical and prescribing information.
                  </p>
                  <Link href="#psychiatrists-info" className="cx-btn-portal-solid">
                    <span>FOR PSYCHIATRISTS</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.08337 9.91666L9.91671 4.08333M9.91671 4.08333H4.66671M9.91671 4.08333V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
                <div className="cx-portal-img-wrap">
                  <Image
                    src="/images/psychiatrist-doctor.jpg"
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

        {/* Middle Heading: A new perspective on anxiety care */}
        <div className="cx-perspective-header text-center">
          <h2 className="cx-perspective-h2">
            A new perspective<br />
            on anxiety care.
          </h2>
        </div>

        {/* Product Configuration Showcase */}
        <div className="row justify-content-center g-4 g-lg-5 cx-config-row">
          {configs.map((cfg, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-md-5 col-lg-4 text-center">
              <div className="cx-config-card">
                <div className="cx-config-img-box">
                  <Image
                    src={cfg.image}
                    alt={cfg.alt}
                    fill
                    sizes="(max-width: 576px) 100vw, 350px"
                    className="cx-config-img"
                  />
                </div>
                <span className="cx-config-num">{cfg.num}</span>
                <h3 className="cx-config-title">{cfg.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
