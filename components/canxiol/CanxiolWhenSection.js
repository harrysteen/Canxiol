'use client';
import { useState } from 'react';
import Image from 'next/image';

const areas = ['Sleep', 'Concentration', 'Relationships', 'Work related anxiety'];

const journey = [
  { label: 'Anxiety',           icon: '/images/Anxiety.png' },
  { label: 'Everyday Life',     icon: '/images/Everyday Life.png' },
  { label: 'Professional Care', icon: '/images/Professional Care.png' },
  { label: 'Treatment',         icon: '/images/Treatment.png' },
];

function ArrowRight() {
  return (
    <span className="cx-cxp-when-arrow" aria-hidden="true">
      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
        <path
          d="M1 5h10M7 1l4 4-4 4"
          stroke="#68635F"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function CanxiolWhenSection() {
  const [activeArea, setActiveArea] = useState(areas[0]);

  return (
    <section id="when-to-take" className="cx-cxp-when">
      <div className="container">
        <div className="cx-cxp-when-head">
          <h2 className="cx-cxp-when-h2">
            When should you<br />
            take Canxiol<sup>®</sup>?
          </h2>
          <p className="cx-cxp-when-intro">
            Anxiety can affect different parts of everyday life. Canxiol may be prescribed as
            part of an individual treatment plan and may be used alongside cognitive
            behavioural therapy where recommended.
          </p>
        </div>

        {/* Areas of life anxiety can affect; the active one carries the left marker */}
        <ul className="cx-cxp-when-areas">
          {areas.map((area) => (
            <li key={area}>
              <button
                type="button"
                className={`cx-cxp-when-area ${activeArea === area ? 'active' : ''}`}
                aria-pressed={activeArea === area}
                onClick={() => setActiveArea(area)}
              >
                {area}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Care journey: Anxiety → Everyday Life → Professional Care → Treatment */}
      <div className="cx-cxp-when-journey">
        <div className="container">
          <ol className="cx-cxp-when-steps">
            {journey.map((step, i) => (
              <li key={step.label} className="cx-cxp-when-step">
                <Image src={step.icon} alt="" width={22} height={22} className="cx-cxp-when-icon" />
                <span className="cx-cxp-when-label">{step.label}</span>
                {i < journey.length - 1 && <ArrowRight />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
