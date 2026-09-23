'use client';
import Image from 'next/image';
import AnimatedGradientBg from './AnimatedGradientBg';

export default function CanxiolGettingHelpSection({
  gradientSpeed      = 0.5,
  gradientDirection  = 0,
  gradientDistortion = 0.15,
  gradientScale      = 1.5,
}) {
  const cards = [
    {
      image: '/images/lifestyle-goals.jpg',
      alt: 'Woman working calmly on laptop focusing on her goals',
      title: 'Focus on your goals',
    },
    {
      image: '/images/lifestyle-connections.jpg',
      alt: 'Mother and daughter cooking together with smiles in kitchen',
      title: 'Stronger connections',
    },
    {
      image: '/images/lifestyle-moments.jpg',
      alt: 'Couple walking together happily outdoors in sunlight',
      title: 'More moments that matter',
    },
  ];

  return (
    <section id="getting-help" className="cx-getting-help-section">
      {/* Animated WebGL / WebGPU gradient background */}
      <AnimatedGradientBg
        speed={gradientSpeed}
        direction={gradientDirection}
        distortion={gradientDistortion}
        scale={gradientScale}
      />

      {/* Soft ambient vignette overlay */}
      <div className="cx-hero-vignette" />

      <div className="container cx-help-content">

        {/* Header Row: Heading on left, Description on right */}
        <div className="row align-items-center cx-help-header-row g-4">
          <div className="col-12 col-lg-6">
            <h2 className="cx-help-h2">
              Getting Help is Easier<br />
              than you think
            </h2>
          </div>

          <div className="col-12 col-lg-6">
            <p className="cx-help-desc">
              People with anxiety are multitasking housewives, busy partners, ageing
              parents, demanding friends working professionals. With the right support, a
              more balanced everyday life is possible.
            </p>
          </div>
        </div>

        {/* 3-Column Lifestyle Grid */}
        <div className="row g-4 g-lg-5 cx-help-cards-row">
          {cards.map((card, idx) => (
            <div key={idx} className="col-12 col-md-4">
              <div className="cx-help-card">
                <div className="cx-help-img-box">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="cx-help-card-img"
                  />
                </div>
                <h3 className="cx-help-card-title">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
