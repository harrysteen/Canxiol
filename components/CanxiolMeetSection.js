'use client';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedGradientBg from './AnimatedGradientBg';

export default function CanxiolMeetSection({
  gradientSpeed      = 0.5,
  gradientDirection  = 0,
  gradientDistortion = 0.15,
  gradientScale      = 1.5,
}) {
  const steps = [
    'Cannabidiol (Synthetic)',
    'Proprietary nanodispersion',
    'Fine dispersed formulation in water',
    'Milky white Oral solution',
  ];

  // Description broken into the same lines as the design (one block per line on desktop)
  const descLines = [
    'A prescription cannabidiol oral solution research for the',
    'management of mild to moderate anxiety disorders.',
    'Canxiol brings together pharmaceutical grade cannabidiol',
    'formulated with proprietary nanodispersion technology in',
    'an oral solution designed for measured administration.',
  ];

  const features = [
    {
      num: '01',
      title: 'Pharmaceutical Grade Cannabidiol',
      desc: 'Inhouse Synthetic Cannabidiol (API-Manufactured at a USFDA approved facility)',
    },
    {
      num: '02',
      title: 'Formulation with proprietary nanodispersion technology',
      desc: 'Easy to use and titrate with no pill burden',
    },
    {
      num: '03',
      title: 'Manufactured in GMP certified plant',
      desc: 'Certified by USFDA, EU, MHRA, Turkey, Russia & WHO – GMP certified',
    },
  ];

  return (
    <section id="meet" className="cx-meet-section">
      {/* Animated WebGL / WebGPU gradient background */}
      <AnimatedGradientBg
        speed={gradientSpeed}
        direction={gradientDirection}
        distortion={gradientDistortion}
        scale={gradientScale}
      />

      {/* Soft ambient vignette overlay */}
      <div className="cx-hero-vignette" />

      <div className="container cx-meet-content">
        
        {/* Top Showcase Row */}
        <div className="row align-items-center g-4 g-lg-5 cx-meet-top-row">
          
          {/* Left Column: Heading, Description & CTA */}
          {/* Three equal columns keep the image centred on the page */}
          <div className="col-12 col-lg-4">
            <div className="cx-meet-left">
              <h2 className="cx-meet-h2">
                Meet<br />
                Canxiol
              </h2>

              <p className="cx-meet-desc">
                {descLines.map((line) => (
                  <span key={line} className="cx-meet-desc-line">{line} </span>
                ))}
              </p>

              <Link href="#what-is-canxiol" className="cx-btn-meet">
                <span>WHAT IS CANXIOL?</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.08337 9.91666L9.91671 4.08333M9.91671 4.08333H4.66671M9.91671 4.08333V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Center Column: Product Showcase Image */}
          <div className="col-12 col-lg-4 text-center">
            <div className="cx-meet-img-wrap">
              <div className="cx-meet-img-box">
                <Image
                  src="/images/home page meet conxial.png"
                  alt="Canxiol medicine bottle held in hand with dropper dispensing solution"
                  fill
                  sizes="(max-width: 991px) 100vw, 40vw"
                  className="cx-meet-img"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Column: Process Flow Steps */}
          <div className="col-12 col-lg-4 cx-meet-flow-col">
            <div className="cx-meet-flow">
              {steps.map((step, idx) => (
                <div key={idx} className="cx-meet-flow-item">
                  <span className="cx-meet-flow-text">{step}</span>
                  <div className="cx-meet-flow-arrow">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 2.91666V11.0833M7 11.0833L11.0833 7M7 11.0833L2.91666 7" stroke="#00A99D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              ))}
              <div className="cx-meet-flow-brand">
                <div className="cx-brand-title">
                  <span>CANXIOL</span>
                  <sup>®</sup>
                </div>
                <span className="cx-brand-sub">Oral solution</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider Line */}
        <hr className="cx-meet-divider" />

        {/* Bottom 3-Column Features */}
        <div className="row g-4 g-lg-5 cx-meet-bottom-row">
          {features.map((item, idx) => (
            <div key={idx} className="col-12 col-md-4">
              <div className="cx-meet-feature-card">
                <span className="cx-meet-feature-num">{item.num}</span>
                <h3 className="cx-meet-feature-title">{item.title}</h3>
                <p className="cx-meet-feature-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
