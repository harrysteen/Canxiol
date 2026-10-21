import AnimatedGradientBg from '../AnimatedGradientBg';

const stats = [
  {
    num: '359',
    unit: 'm',
    title: 'Global population (Anxiety)',
    desc: 'people affected in 2021',
    source: '(WHO, 2025)',
  },
  {
    num: '4.4',
    unit: '%',
    title: 'Large prevalence',
    desc: 'of the global population lives with an anxiety disorder at any given time.',
    source: '(WHO, 2025)',
  },
  {
    num: '27.6',
    unit: '%',
    title: 'Seeking treatment',
    desc: 'receive any treatment, even though effective therapies exist.',
    source: '(WHO, 2025)',
  },
  {
    num: 'US$925',
    unit: 'billion',
    title: 'Global burden',
    desc: 'Depression and anxiety cost the global economy an estimated US$925 billion a year in lost productivity.',
    source: '(WHO, 2014)',
  },
];

// Also used on the home page with its own heading and lead (see app/page.js)
export default function AnxietyGlobalSection({
  eyebrow = 'Global burden of anxiety',
  heading = <>A global<br />perspective.</>,
  lead = <>Anxiety is the most common mental health condition worldwide.<br />
            Yet for most, it remains unrecognized and untreated.</>,
  className = '',
  animatedBg = false,
}) {
  return (
    <section className={`cx-anx-global ${animatedBg ? 'cx-anx-global--animated' : ''} ${className}`.trim()}>
      {/* Same moving lilac gradient as the hero */}
      {animatedBg && <AnimatedGradientBg speed={0.5} direction={0} distortion={0.15} scale={1.5} />}

      <div className="container">
        {eyebrow && <span className="cx-anx-eyebrow">{eyebrow}</span>}

        <div className="cx-anx-section-head">
          <h2 className="cx-anx-h2">{heading}</h2>
          <p className="cx-anx-section-lead">{lead}</p>
        </div>

        <div className="cx-anx-global-grid">
          {stats.map((s) => (
            <div key={s.title} className="cx-anx-global-card">
              <div className="cx-anx-global-value">
                <span className="cx-anx-global-num">{s.num}</span>
                <span className={`cx-anx-global-unit ${s.unit === 'm' ? 'is-large' : ''}`}>
                  {s.unit}
                </span>
              </div>
              <h3 className="cx-anx-stat-title">{s.title}</h3>
              <p className="cx-anx-stat-desc">{s.desc}</p>
              <p className="cx-anx-global-source">{s.source}</p>
            </div>
          ))}
        </div>

        <p className="cx-anx-global-note">
          Women are consistently more likely than men to be diagnosed with an anxiety disorder.
          (WHO, 2025)
        </p>
      </div>
    </section>
  );
}
