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
    'Cannabidiol',
    'Proprietary nanodispersion',
    'Fine dispersed formulation in water',
    'Milky white Oral solution',
  ];

  const features = [
    {
      num: '01',
      title: 'Pharmaceutical Grade Cannabidiol',
      desc: 'Inhouse Synthetic Cannabidiol (API- Manufactured at a USFDA approved facility.',
    },
    {
      num: '02',
      title: 'Formulation with proprietary nanodispersion technology',
      desc: 'Easy to titrate with no pill burden',
    },
    {
      num: '03',
      title: 'Clinically Tested',
      desc: 'Evaluated in RCT-PHASE III study in adults with mild to moderate anxiety',
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
          <div className="col-12 col-lg-4">
            <div className="cx-meet-left">
              <h2 className="cx-meet-h2">
                Meet<br />
                Canxiol.
              </h2>

              <p className="cx-meet-desc">
                A prescription cannabidiol oral solution developed for the management of mild to moderate anxiety disorders. Canxiol brings together pharmaceutical grade cannabidiol with proprietary nanodispersion tech in an oral solution designed for measured administration.
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
          <div className="col-12 col-lg-5 text-center">
            <div className="cx-meet-img-wrap">
              <div className="cx-meet-img-box">
                <Image
                  src="/images/canxiol_bottle_hand.png"
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
          <div className="col-12 col-lg-3">
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
                <span>CANXIOL</span>
                <sup>®</sup>
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
