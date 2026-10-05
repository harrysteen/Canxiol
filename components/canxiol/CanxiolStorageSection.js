import Image from 'next/image';

// Split into the two columns either side of the bottle (1 & 3 left, 2 & 4 right)
const tips = {
  left: [
    { num: '1', title: '≤30°C', text: 'Store at a temperature not exceeding 30°C.' },
    { num: '3', title: 'Keep upright', text: 'Store the bottle upright.' },
  ],
  right: [
    { num: '2', title: 'Protect from light', text: 'Keep the medicine protected from light.' },
    { num: '4', title: 'Keep closed', text: 'Keep the cap tightly closed.' },
  ],
};

function Tip({ num, title, text }) {
  return (
    <li className="cx-cxp-store-tip">
      <span className="cx-cxp-store-num" aria-hidden="true">{num}</span>
      <div>
        <h3 className="cx-cxp-store-title">{title}</h3>
        <p className="cx-cxp-store-text">{text}</p>
      </div>
    </li>
  );
}

export default function CanxiolStorageSection() {
  return (
    <section id="storage" className="cx-cxp-store">
      <div className="container">
        <h2 className="cx-cxp-store-h2">
          Looking after your Canxiol<sup>®</sup>.
        </h2>

        <div className="cx-cxp-store-grid">
          <ul className="cx-cxp-store-col">
            {tips.left.map((tip) => <Tip key={tip.num} {...tip} />)}
          </ul>

          <div className="cx-cxp-store-bottle">
            <Image
              src="/images/How Canxiol stands out.png"
              alt="Canxiol 28 mL bottle"
              fill
              sizes="(max-width: 767px) 50vw, 240px"
            />
          </div>

          <ul className="cx-cxp-store-col">
            {tips.right.map((tip) => <Tip key={tip.num} {...tip} />)}
          </ul>
        </div>

        {/* Shelf-life band */}
        <div className="cx-cxp-store-band">
          <p className="cx-cxp-store-band-title">60 days after opening</p>
          <div className="cx-cxp-store-band-body">
            <p className="cx-cxp-store-band-text">
              Use Canxiol within 60 days after opening the bottle. Discard any remaining
              medicine after this period.
            </p>
            <p className="cx-cxp-store-band-note">
              <svg width="12" height="13" viewBox="0 0 12 13" fill="none" aria-hidden="true">
                <path
                  d="M6 1 1.5 2.7v3.6c0 2.7 1.9 4.9 4.5 5.7 2.6-.8 4.5-3 4.5-5.7V2.7L6 1Z"
                  stroke="#FFFFFF"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />
                <path
                  d="m4 6.6 1.4 1.4L8 5.4"
                  stroke="#FFFFFF"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Keep out of reach of children.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
