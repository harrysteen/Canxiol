import Image from 'next/image';
import Link from 'next/link';
import { PSY_DOWNLOADS } from '../psychiatrists/psyLinks';

const steps = [
  {
    num: '01',
    title: 'Measure',
    text: 'Use the calibrated dropper supplied with the pack.',
    icon: '/images/Measure.png',
  },
  {
    num: '02',
    title: 'Add to Water',
    text: 'Add the measured dose to approximately 150 mL of water.',
    icon: '/images/Add to Water.png',
  },
  {
    num: '03',
    title: 'Stir',
    text: 'Stir rapidly for at least 10 seconds.',
    icon: '/images/Stir.png',
  },
  {
    num: '04',
    title: 'Take Immediately',
    text: 'Administer the prepared dose orally immediately after stirring.',
    icon: '/images/Take Immediately.png',
  },
];

export default function CanxiolHowToTakeSection() {
  return (
    <section id="how-to-take" className="cx-cxp-how">
      <div className="container">
        <span className="cx-cxp-how-eyebrow">Follow your prescription</span>
        <h2 className="cx-cxp-how-h2">
          How to take Canxiol<sup>®</sup>?
        </h2>
        <p className="cx-cxp-how-sub">Follow the dose prescribed by your psychiatrist.</p>

        <ol className="cx-cxp-how-steps">
          {steps.map((step) => (
            <li key={step.num} className="cx-cxp-how-card">
              <div className="cx-cxp-how-card-top">
                <span className="cx-cxp-how-num">Step {step.num}</span>
                <Image src={step.icon} alt="" width={20} height={20} className="cx-cxp-how-icon" />
              </div>
              <h3 className="cx-cxp-how-title">{step.title}</h3>
              <p className="cx-cxp-how-text">{step.text}</p>
            </li>
          ))}
        </ol>

        {/* Dosing caution with a link to the full instructions (patient information leaflet) */}
        <div className="cx-cxp-how-warning">
          <span className="cx-cxp-how-warning-icon" aria-hidden="true">
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none">
              <path
                d="M8 1.2 15 13.6H1L8 1.2Z"
                stroke="#FFFFFF"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <path d="M8 5.6v3.8" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="8" cy="11.4" r="0.8" fill="#FFFFFF" />
            </svg>
          </span>
          <p className="cx-cxp-how-warning-text">
            Do not use a household teaspoon or tablespoon to measure your dose.
          </p>
          <Link href={PSY_DOWNLOADS.pil} className="cx-btn-discover cx-cxp-how-btn">
            <span>VIEW FULL ADMINISTRATION INSTRUCTIONS</span>
            <Image
              src="/images/contact-us-arrow.png"
              alt=""
              width={12}
              height={12}
              className="cx-btn-discover-arrow"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
