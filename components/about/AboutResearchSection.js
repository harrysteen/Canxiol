const areas = [
  { num: '01', name: 'Neuropsychiatry' },
  { num: '02', name: 'Rare & complex conditions' },
  { num: '03', name: 'Oncology' },
  { num: '04', name: 'Supportive care' },
];

export default function AboutResearchSection() {
  return (
    <section id="discover-leiutis" className="cx-about-research">
      <div className="container">
        <div className="cx-about-research-head">
          <h2 className="cx-about-h2">
            Our<br />
            research areas.
          </h2>
          <p className="cx-about-research-intro">
            We are a specialty therapeutics company focused on translating scientific insight
            into meaningful treatments for the patients and the clinicians who care for them.
          </p>
        </div>

        <h3 className="cx-about-research-label">Therapeutic Areas</h3>

        <ul className="cx-about-research-grid">
          {areas.map((area) => (
            <li key={area.num} className="cx-about-research-card">
              <span className="cx-about-research-num">{area.num}</span>
              <span className="cx-about-research-name">{area.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
