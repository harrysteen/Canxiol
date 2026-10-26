'use client';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedGradientBg from './AnimatedGradientBg';

export default function CanxiolHero({
  // Shader controls
  gradientSpeed      = 0.5,
  gradientDirection  = 0,
  gradientDistortion = 0.15,
  gradientScale      = 1.5,
}) {
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
              <div className="col-12 col-lg-6 col-xl-6 cx-hero-left cx-hero-left--home">
                <h1 className="cx-hero-h1 cx-hero-h1--home">
                  <span className="cx-hl">Understanding</span> Anxiety.<br />
                  Exploring <span className="cx-hl">Support</span>
                </h1>

                <p className="cx-hero-p">
                  Understanding anxiety can be a first step toward finding the right information and appropriate support.
                </p>

                <div className="cx-hero-btns">
                  <Link href="/anxiety" className="cx-btn-discover">
                    <span>UNDERSTAND ANXIETY</span>
                    <Image
                      src="/images/contact-us-arrow.png"
                      alt=""
                      width={14}
                      height={14}
                      className="cx-btn-discover-arrow"
                    />
                  </Link>
                  <Link href="/anxiety/treatment" className="cx-btn-hero-psychiatrists">
                    <span>EXPLORE SUPPORT</span>
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

              {/* Right Column: consultation scene */}
              <div className="col-12 col-lg-6 col-xl-6 cx-hero-img-col">
                <div className="cx-img-wrapper cx-img-wrapper--home">
                  <Image
                    src="/images/when to seek help.png"
                    alt="A man talking with a psychiatrist who takes notes, both seated in armchairs"
                    fill
                    priority
                    sizes="(max-width: 576px) 100vw, (max-width: 992px) 600px, 760px"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>
    </>
  );
}