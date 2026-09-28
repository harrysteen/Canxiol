import Image from 'next/image';
import { PSY_IMAGES } from './psyImages';

const partners = [
  { name: 'Leiutis', className: 'cx-psy-partner-leiutis', desc: 'Trademark and IP owner' },
  { name: 'Biophore', className: 'cx-psy-partner-biophore', desc: 'Synthetic cannabidiol API manufacturing', tag: 'USDMF #35992' },
  { name: 'Zenara', className: 'cx-psy-partner-zenara', desc: 'GMP certified Foundation manufacturing' },
];

const points = [
  'Canxiol contains fully synthetic Cannabidiol, not plant-derived and hence non-psychoactive, with no known potential for abuse, dependance. No withdrawal symptoms',
  'Canxiol is formulated with pharmaceutical grade synthetic cannabidiol using proprietary nanodispersion technology',
  'Manufactured by Biophore in accordance to GMP requirements and has a USDMF No- 35992',
  'Canxiol is manufactured by Zenara in their facilities with GMP certification from regulatory authorities including the USFDA, EU, MHRA, Turkey, Russia & WHO - GMP certified',
];

export default function PsyStandOutSection() {
  return (
    <section className="cx-psy-standout">
      <div className="container">
        <span className="cx-psy-teal-label">PHARMACEUTICAL DIFFERENTIATION</span>
        <h2 className="cx-psy-h2">How Canxiol stands out?</h2>

        <div className="row align-items-center g-4 cx-psy-standout-row">
          <div className="col-12 col-md-6 col-lg-3">
            <span className="cx-psy-teal-label cx-psy-partners-label">OUR COLLABORATIVE EFFECT OF</span>
            <div className="cx-psy-partners">
              {partners.map((p) => (
                <div key={p.name} className="cx-psy-partner">
                  <span className={`cx-psy-partner-name ${p.className}`}>
                    {p.name}
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.08337 9.91666L9.91671 4.08333M9.91671 4.08333H4.66671M9.91671 4.08333V9.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="cx-psy-partner-desc">{p.desc}</span>
                  {p.tag && <span className="cx-psy-partner-tag">{p.tag}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="cx-psy-standout-bottle">
              <Image
                src={PSY_IMAGES.standOutBottle}
                alt="Canxiol 28 mL bottle"
                fill
                sizes="(max-width: 767px) 100vw, 25vw"
              />
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <ol className="cx-psy-points">
              {points.map((text, i) => (
                <li key={i}>
                  <span className="cx-psy-point-num">{String(i + 1).padStart(2, '0')}</span>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
