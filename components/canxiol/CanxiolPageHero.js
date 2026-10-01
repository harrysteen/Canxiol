'use client';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedGradientBg from '../AnimatedGradientBg';

export default function CanxiolPageHero({
  // Shader controls (same defaults as the home hero)
  gradientSpeed      = 0.5,
  gradientDirection  = 0,
  gradientDistortion = 0.15,
  gradientScale      = 1.5,
}) {
  return (
    <section id="canxiol-hero" className="cx-cxp-hero">
      {/* Animated WebGL / WebGPU gradient background */}
      <AnimatedGradientBg
        speed={gradientSpeed}
        direction={gradientDirection}
        distortion={gradientDistortion}
        scale={gradientScale}
      />

      {/* Soft ambient vignette */}
      <div className="cx-hero-vignette" />

      {/* Bottle on an open palm — the hand runs off the right edge of the viewport */}
      <div className="cx-cxp-hero-img">
        <Image
          src="/images/Canxiol page hero img.png"
          alt="Canxiol 28 mL bottle resting on an open palm"
          fill
          priority
          sizes="(max-width: 991px) 100vw, 55vw"
        />
      </div>

      <div className="container cx-cxp-hero-inner">
        <div className="row cx-cxp-hero-row">
          {/* Left Column: Headline, disclaimer and CTA */}
          <div className="col-12 col-lg-6 cx-cxp-hero-text">
            <h1 className="cx-hero-h1">
              <span className="cx-hl">Heal</span> The way<br />
              You <span className="cx-hl">Feel</span>
            </h1>

            <p className="cx-cxp-hero-p">
              Prescription Only medicine. Use only as directed by Psychiatrist
            </p>

            <Link href="#discover-more" className="cx-btn-discover cx-cxp-hero-btn">
              <span>DISCOVER MORE</span>
              <Image
                src="/images/contact-us-arrow.png"
                alt=""
                width={14}
                height={14}
                className="cx-btn-discover-arrow cx-cxp-arrow-down"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
