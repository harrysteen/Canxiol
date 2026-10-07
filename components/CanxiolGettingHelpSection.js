'use client';
import Image from 'next/image';

export default function CanxiolGettingHelpSection() {
  const cards = [
    {
      image: '/images/lifestyle-goals.png',
      alt: 'Young woman studying calmly at her desk with a laptop and notebook',
      title: 'Focus on your goals',
    },
    {
      image: '/images/lifestyle-connections.png',
      alt: 'Family walking together along a leafy neighbourhood street',
      title: 'Build stronger relationships',
    },
    {
      image: '/images/lifestyle-moments.png',
      alt: 'Family enjoying a board game together at home',
      title: 'Happier moments that matter',
    },
  ];

  return (
    <section id="getting-help" className="cx-getting-help-section">
      <div className="container cx-help-content">

        {/* Header Row: Heading on left, Description on right */}
        <div className="row align-items-center cx-help-header-row g-4">
          <div className="col-12 col-lg-6">
            <h2 className="cx-help-h2">
              Getting Help is Easier<br />
              than you think.
            </h2>
          </div>

          <div className="col-12 col-lg-6">
            <p className="cx-help-desc">
              Anxiety affects people from all walks of life &ndash; working professionals,
              caregivers, students &amp; busy partners. With the medical advice, a balanced
              everyday life is possible.
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
