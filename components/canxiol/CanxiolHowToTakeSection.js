import Image from 'next/image';
import Link from 'next/link';
import { PSY_DOWNLOADS } from '../psychiatrists/psyLinks';

// Administration steps (text as supplied by Leiutis). `wide`: the long step gets a double column.
const steps = [
  {
    num: '01',
    text: 'Remove the child-resistant cap on the bottle by pushing the cap down whilst turning the cap anticlockwise.',
  },
  {
    num: '02',
    text: 'Insert the tip of the dropper fully into the bottle. With the dropper in place, withdraw the required dose of CANXIOL®. Use a dry dropper each time you take CANXIOL®.',
  },
  {
    num: '03',
    text: 'When you have measured the appropriate dose of CANXIOL®, carefully remove the dropper from the bottle.',
  },
  {
    num: '04',
    text: 'Take about 150 mL of drinking water into a glass.',
  },
  {
    num: '05',
    wide: true,
    text: 'Place the tip of the dropper into water and add CANXIOL® into the water. Mix well. Do not touch the tip of the dropper into water. In instance, if the tip of the dropper touches the water, squeeze the dropper & wipe the dropper with a clean absorbent tissue paper/ cloth and place the dropper back into the bottle. Screw dropper back on the bottle tightly by turning the dropper to the right (clockwise) and store at labelled storage conditions. Store at a temperature not exceeding 30ºC.',
  },
  {
    num: '06',
    text: 'Stir rapidly for at least 10 seconds using a spoon or stirrer. Upon stirring it forms a nano-dispersible solution of Cannabidiol for oral administration.',
  },
  {
    num: '07',
    text: 'Take the medication immediately after addition of CANXIOL® to water.',
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
            <li key={step.num} className={`cx-cxp-how-card ${step.wide ? 'is-wide' : ''}`.trim()}>
              <span className="cx-cxp-how-num">Step {step.num}</span>
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
          {/* PDF opens in a new tab so the visitor keeps their place on this page */}
          <Link
            href={PSY_DOWNLOADS.pil}
            className="cx-btn-discover cx-cxp-how-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
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
