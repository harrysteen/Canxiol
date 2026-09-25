'use client';
import Image from 'next/image';

export default function CanxiolPerspectiveSection() {
  const bottles = [
    {
      image: '/images/14ml-bottle.png',
      alt: 'Canxiol 14 mL bottle and packaging',
      label: '14 mL bottle',
      labelColor: '#EA6C04',
    },
    {
      image: '/images/28ml-bottle.png',
      alt: 'Canxiol 28 mL bottle and packaging',
      label: '28 mL bottle',
      labelColor: '#E5045C',
    },
  ];

  return (
    <section className="cx-perspective-section">
      <div className="container">
        {/* Heading */}
        <div className="cx-perspective-header text-center">
          <h2 className="cx-perspective-h2">
            A new perspective<br />
            on anxiety care.
          </h2>
        </div>

        {/* Two bottle images side by side */}
        <div className="row justify-content-center cx-bottles-row">
          {bottles.map((bottle, idx) => (
            <div key={idx} className="col-12 col-sm-6 text-center">
              <div className="cx-bottle-card">
                <div className="cx-bottle-img-wrap">
                  <Image
                    src={bottle.image}
                    alt={bottle.alt}
                    fill
                    sizes="(max-width: 576px) 100vw, 50vw"
                    className="cx-bottle-img"
                    priority={idx === 0}
                  />
                </div>
                <p className="cx-bottle-label" style={{ color: bottle.labelColor }}>
                  {bottle.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
