'use client';
import AnimatedGradientBg from '../AnimatedGradientBg';

export default function ContactHero({
  // Shader controls (same defaults as the home hero)
  gradientSpeed      = 0.5,
  gradientDirection  = 0,
  gradientDistortion = 0.15,
  gradientScale      = 1.5,
}) {
  return (
    <section id="contact-hero" className="cx-contact-hero">
      {/* Animated WebGL / WebGPU gradient background */}
      <AnimatedGradientBg
        speed={gradientSpeed}
        direction={gradientDirection}
        distortion={gradientDistortion}
        scale={gradientScale}
      />

      {/* Soft ambient vignette */}
      <div className="cx-hero-vignette" />

      <div className="container cx-contact-hero-inner">
        <h1 className="cx-contact-hero-h1">Contact &amp; Stay Informed.</h1>
        <p className="cx-contact-hero-p">
          Reach out to our team for general enquiries, healthcare partner communications, or
          product support. We are dedicated to providing clear, clinically grounded information.
        </p>
      </div>
    </section>
  );
}
