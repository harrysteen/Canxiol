'use client';
import Image from 'next/image';
import AnimatedGradientBg from '../AnimatedGradientBg';

export default function AnxietyHero({
  // Shader controls (same defaults as the home hero)
  gradientSpeed      = 0.5,
  gradientDirection  = 0,
  gradientDistortion = 0.15,
  gradientScale      = 1.5,
}) {
  return (
    <section id="what-is-anxiety" className="cx-anx-hero">
      {/* Animated WebGL / WebGPU gradient background */}
      <AnimatedGradientBg
        speed={gradientSpeed}
        direction={gradientDirection}
        distortion={gradientDistortion}
        scale={gradientScale}
      />

      {/* Soft ambient vignette */}
      <div className="cx-hero-vignette" />

      <div className="container cx-anx-hero-inner">
        <div className="row cx-anx-hero-row">
          {/* Left Column: Headline and intro */}
          <div className="col-12 col-lg-6 cx-anx-hero-text">
            <h1 className="cx-anx-hero-h1">What is anxiety?</h1>
            <p className="cx-anx-hero-p">
              Anxiety disorders are common mental health conditions characterized by excessive
              fear and anxiety, along with related behavioral disturbances. While occasional
              anxiety is a normal part of life, anxiety disorders are more persistent, harder to
              control, and can affect relationships, work, and overall well-being.
            </p>
          </div>

          {/* Right Column: Woman holding flowers */}
          <div className="col-12 col-lg-6 cx-anx-hero-img-col">
            <div className="cx-anx-hero-img">
              <Image
                src="/images/what is anxity.png"
                alt="Calm, smiling woman holding a bouquet of flowers"
                fill
                priority
                sizes="(max-width: 991px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
