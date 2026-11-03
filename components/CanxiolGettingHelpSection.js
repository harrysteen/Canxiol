'use client';
import Image from 'next/image';

// Same photos on the patient, pharmacist and psychiatrist home pages
const CARDS = [
  {
    image: '/images/Focus on your goals (2).jpg',
    alt: 'Confident young woman in a blazer standing with arms folded by an office window, smiling',
    title: 'Focus on your goals',
  },
  {
    image: '/images/Build stronger connections.jpg',
    alt: 'Group of friends laughing as they walk together along a tree-lined path',
    title: 'Build stronger connections',
  },
  {
    image: '/images/Happier moments that matter.jpg',
    alt: 'Parents playing with their two young children on the living-room floor',
    title: 'Happier moments that matter',
  },
];

export default function CanxiolGettingHelpSection() {
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
          {CARDS.map((card, idx) => (
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
