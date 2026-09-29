const groups = [
  {
    title: 'Students',
    desc: 'Students may worry about exams, studies, or social acceptance.',
  },
  {
    title: 'Young adults',
    desc: 'Young adults may worry about relationships, careers, finances, or major life changes.',
  },
  {
    title: 'Working professionals',
    desc: 'Working professionals may experience worry about work, performance, or responsibilities.',
  },
  {
    title: 'Parents and caregivers',
    desc: 'Parents and caregivers may worry about the health and safety of loved ones.',
  },
  {
    title: 'Older adults',
    desc: 'Older adults may experience anxiety around health, independence, or life changes.',
  },
];

export default function AnxietyWhoSection() {
  return (
    <section className="cx-anx-who">
      <div className="container">
        <span className="cx-anx-eyebrow">Anxiety can affect anyone</span>

        <div className="cx-anx-section-head cx-anx-who-head">
          <h2 className="cx-anx-h2">Anxiety affects all<br />walks of life</h2>
          <p className="cx-anx-section-lead">
            Anxiety can affect anyone, at any age or stage of life. It can arise from different
            situations and may look different from person to person.
          </p>
        </div>

        <ol className="cx-anx-who-list">
          {groups.map((g, i) => (
            <li key={g.title} className="cx-anx-who-item">
              <span className="cx-anx-who-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="cx-anx-who-title">{g.title}</h3>
              <p className="cx-anx-who-desc">{g.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
