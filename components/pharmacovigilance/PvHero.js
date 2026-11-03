'use client';
import AnimatedGradientBg from '../AnimatedGradientBg';
import { usePortalRole } from '../auth/portalMode';

export default function PvHero({
  // Shader controls (same defaults as the home hero)
  gradientSpeed      = 0.5,
  gradientDirection  = 0,
  gradientDistortion = 0.15,
  gradientScale      = 1.5,
}) {
  // Logged-in pharmacists and psychiatrists see both pathways (see PvPathwaysForRole),
  // so the heading names both. Public visitors get null.
  const isProfessional = Boolean(usePortalRole());

  return (
    <section id="pv-hero" className="cx-pv-hero">
      {/* Animated WebGL / WebGPU gradient background */}
      <AnimatedGradientBg
        speed={gradientSpeed}
        direction={gradientDirection}
        distortion={gradientDistortion}
        scale={gradientScale}
      />

      {/* Soft ambient vignette */}
      <div className="cx-hero-vignette" />

      <div className="container cx-pv-hero-inner">
        <h1 className="cx-pv-hero-h1">
          {isProfessional ? 'Are you a Psychiatrist or Patient?' : 'Are you a Patient?'}
        </h1>
        <p className="cx-pv-hero-p">
          Canxiol is committed to the ongoing safety surveillance of our prescription medicines.
          If you or someone in your care has experienced a suspected adverse reaction, please
          choose the pathway below to access the appropriate reporting documents and procedures.
        </p>
      </div>
    </section>
  );
}
