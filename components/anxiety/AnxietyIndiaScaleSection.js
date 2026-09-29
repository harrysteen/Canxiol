const stats = [
  {
    value: '22.3 m',
    title: 'Total population (Anxiety)',
    desc: 'Indian adults live with mild-to-moderate anxiety (NMHS 2015–16 and WHO, 2025 estimate).',
  },
  {
    value: '10.6%',
    title: 'Mental morbidity',
    desc: 'Current mental morbidity across all conditions sits at 10.6% of the adult population (NMHS 2015–16, weighted estimate).',
  },
  {
    value: '16%',
    title: 'Patients seeking help',
    desc: 'Only 16% of people with anxiety in India receive any form of care.',
  },
  {
    value: '84%',
    title: 'Suffer silently',
    desc: 'The treatment gap of 84% is the widest recorded for any psychiatric condition in the national survey (NMHS, 2016).',
  },
  {
    value: '123.5%',
    title: 'Increasing prevalence',
    desc: 'Anxiety disorder prevalence in India rose 123.5% between 1990 and 2023, from 2,591.9 to 5,792.8 cases per lakh population (Global Burden of Disease Study 2023, The Lancet, May 2026).',
  },
  {
    value: '~2591 → ~5792',
    title: 'Growing incidence',
    desc: 'cases per lakh population',
    small: true,
  },
  {
    value: '1.35×',
    title: 'Higher in urban class',
    desc: 'Urban metro prevalence runs more than 1.35 times higher than the national average.',
  },
  {
    value: '28.1%',
    title: 'People - all walks of life',
    desc: '18–49 years is the age band carrying the heaviest burden — 28.1% of all anxiety cases.',
  },
];

export default function AnxietyIndiaScaleSection() {
  return (
    <section className="cx-anx-india">
      <div className="container">
        <span className="cx-anx-eyebrow">The scale of anxiety in India</span>

        <div className="cx-anx-section-head">
          <h2 className="cx-anx-h2">The scale of anxiety<br />in India</h2>
          <p className="cx-anx-section-lead">
            Selected figures from national and global health surveys place the scale in
            perspective.
          </p>
        </div>

        <div className="cx-anx-india-grid">
          {stats.map((s) => (
            <div key={s.title} className="cx-anx-india-card">
              <div className={`cx-anx-india-value ${s.small ? 'is-small' : ''}`}>{s.value}</div>
              <h3 className="cx-anx-stat-title">{s.title}</h3>
              <p className="cx-anx-stat-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
