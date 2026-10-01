'use client';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedGradientBg from '../AnimatedGradientBg';

export default function AboutHero({
  // Shader controls (same defaults as the home hero)
  gradientSpeed      = 0.5,
  gradientDirection  = 0,
  gradientDistortion = 0.15,
  gradientScale      = 1.5,
}) {
  return (
    <section id="about-hero" className="cx-about-hero">
      {/* Animated WebGL / WebGPU gradient background */}
      <AnimatedGradientBg
        speed={gradientSpeed}
        direction={gradientDirection}
        distortion={gradientDistortion}
        scale={gradientScale}
      />

      {/* Soft ambient vignette */}
      <div className="cx-hero-vignette" />

      <div className="container cx-about-hero-inner">
        <div className="row cx-about-hero-row">
          {/* Left Column: Headline, intro and CTAs */}
          <div className="col-12 col-lg-6 cx-about-hero-text">
            <h1 className="cx-about-hero-h1">
              Where science<br />
              becomes care
            </h1>

            <p className="cx-about-hero-p">
              A scientific advance is born in the hands of scientists. When it reaches a
              patient and changes a life, something remarkable happens.
            </p>

            <p className="cx-about-hero-tag">We call that moment a SMILE</p>

            <div className="cx-hero-btns">
              <Link href="#discover-leiutis" className="cx-btn-discover">
                <span>DISCOVER LEIUTIS</span>
                <Image
                  src="/images/contact-us-arrow.png"
                  alt=""
                  width={14}
                  height={14}
                  className="cx-btn-discover-arrow"
                />
              </Link>
              <Link href="#discover-smile" className="cx-btn-hero-psychiatrists">
                <span>DISCOVER SMILE</span>
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

          {/* Right Column: Leiutis brand mark */}
          <div className="col-12 col-lg-6 cx-about-hero-img-col">
            <div className="cx-about-hero-img">
              <Image
                src="/images/leiutis logo for about leiuties page.png"
                alt="Leiutis brand mark"
                fill
                priority
                sizes="(max-width: 991px) 80vw, 45vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
