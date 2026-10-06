'use client';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedGradientBg from './AnimatedGradientBg';
import { useOpenPsychiatristInquiry } from './PsychiatristInquiryProvider';

export default function CanxiolHero({
  // Shader controls
  gradientSpeed      = 0.5,
  gradientDirection  = 0,
  gradientDistortion = 0.15,
  gradientScale      = 1.5,
}) {
  const openInquiry = useOpenPsychiatristInquiry();

  return (
    <>
      <section id="hero" className="cx-hero-wrapper">
        {/* Animated WebGL / WebGPU gradient background */}
        <AnimatedGradientBg
          speed={gradientSpeed}
          direction={gradientDirection}
          distortion={gradientDistortion}
          scale={gradientScale}
        />

        {/* Soft ambient vignette */}
        <div className="cx-hero-vignette" />

        {/* Main Hero Section Grid */}
        <div className="cx-hero-main">
          <div className="container">
            <div className="row align-items-end g-4">
              
              {/* Left Column: Headline, Description, and CTAs */}
              <div className="col-12 col-lg-6 col-xl-6 cx-hero-left">
                <h1 className="cx-hero-h1">
                  <span className="cx-hl">Heal</span> The way<br />
                  You <span className="cx-hl">Feel</span>.
                </h1>

                <p className="cx-hero-p">
                  Prescription Only medicine. Use only as directed by Psychiatrist
                </p>

                <div className="cx-hero-btns">
                  <Link href="/canxiol" className="cx-btn-discover">
                    <span>DISCOVER CANXIOL</span>
                    <Image
                      src="/images/contact-us-arrow.png"
                      alt=""
                      width={14}
                      height={14}
                      className="cx-btn-discover-arrow"
                    />
                  </Link>
                  <Link href="#psychiatrists" className="cx-btn-hero-psychiatrists" onClick={openInquiry}>
                    <span>FOR PSYCHIATRISTS</span>
                    <Image
                      src="/images/for-psychiatrists-arrow.png"
                      alt=""
                      width={14}
                      height={14}
                      className="cx-hero-arrow-icon"
                    />
                  </Link>
                </div>
              </div>

              {/* Right Column: Product Bottle Visual */}
              <div className="col-12 col-lg-6 col-xl-6 cx-hero-img-col">
                <div className="cx-img-wrapper">
                  <Image
                    src="/images/canxiol_bottle_hand.png"
                    alt="Canxiol Cannabidiol Oral Solution 150mg/mL held in hand"
                    fill
                    priority
                    sizes="(max-width: 576px) 100vw, (max-width: 992px) 500px, 680px"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Teal Notification Banner - Bottom of Hero Section */}
        <div className="cx-teal-banner">
          <div className="container">
            <p>
              <span className="cx-teal-highlight">World’s first</span> Clinically Validated and Prescription CBD Product: Approved for Mild to Moderate Anxiety Disorders in Conjunction with CBT
            </p>
          </div>
        </div>
      </section>
    </>
  );
}