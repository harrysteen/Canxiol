'use client';
import { useState } from 'react';
import Image from 'next/image';
import AnimatedGradientBg from '../AnimatedGradientBg';

export default function AnxietyHero({
  id       = 'what-is-anxiety',
  title    = 'What is anxiety?',
  subtitle = null,
  text     = 'Anxiety disorders are common mental health conditions characterized by excessive fear and anxiety, along with related behavioral disturbances. While occasional anxiety is a normal part of life, anxiety disorders are more persistent, harder to control, and can affect relationships, work, and overall well-being.',
  imageSrc = '/images/what is anxity.png',
  imageAlt = 'Calm young woman smiling with her eyes closed, breathing easy',
  // Desktop: run the photo out to the screen's right edge instead of the container's
  imageToEdge = false,
  // Shader controls (same defaults as the home hero)
  gradientSpeed      = 0.5,
  gradientDirection  = 0,
  gradientDistortion = 0.15,
  gradientScale      = 1.5,
}) {
  // The photo's real proportions; on phones the frame takes this shape so it hugs the image
  const [imgRatio, setImgRatio] = useState(null);

  return (
    <section id={id} className={`cx-anx-hero${imageToEdge ? ' cx-anx-hero-img-edge' : ''}`}>
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
            <h1 className="cx-anx-hero-h1">
              {/* A trailing "?" sits slightly lower so it reads with the word */}
              {title.endsWith('?')
                ? <>{title.slice(0, -1)}<span className="cx-anx-hero-qmark">?</span></>
                : title}
            </h1>
            {subtitle && <p className="cx-anx-hero-sub">{subtitle}</p>}
            <p className="cx-anx-hero-p">{text}</p>
          </div>

          {/* Right Column: Hero photo */}
          <div className="col-12 col-lg-6 cx-anx-hero-img-col">
            <div
              className="cx-anx-hero-img"
              style={imgRatio ? { '--cx-anx-img-ratio': imgRatio } : undefined}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                onLoad={(e) => {
                  const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
                  if (w && h) setImgRatio(`${w} / ${h}`);
                }}
                sizes="(max-width: 991px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
