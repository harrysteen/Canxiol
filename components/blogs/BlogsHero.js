'use client';
import AnimatedGradientBg from '../AnimatedGradientBg';

export default function BlogsHero({
  // Shader controls (same defaults as the home hero)
  gradientSpeed      = 0.5,
  gradientDirection  = 0,
  gradientDistortion = 0.15,
  gradientScale      = 1.5,
}) {
  return (
    <section id="blogs-hero" className="cx-blogs-hero">
      {/* Animated WebGL / WebGPU gradient background */}
      <AnimatedGradientBg
        speed={gradientSpeed}
        direction={gradientDirection}
        distortion={gradientDistortion}
        scale={gradientScale}
      />

      {/* Soft ambient vignette */}
      <div className="cx-hero-vignette" />

      <div className="container cx-blogs-hero-inner">
        <h1 className="cx-blogs-hero-h1">Blogs.</h1>
        <p className="cx-blogs-hero-p">Insights that inform. Perspectives that matter.</p>
      </div>
    </section>
  );
}
