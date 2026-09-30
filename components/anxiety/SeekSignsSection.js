const signs = [
  'Excessive or persistent worry or fear',
  'Feeling restless, tense, or constantly “on edge”',
  'Difficulty controlling worry',
  'Difficulty concentrating',
  'Irritability or feeling easily overwhelmed',
  'Muscle tension',
  'Fatigue or low energy',
  'Sleep difficulties',
  'Physical symptoms such as a racing heartbeat, sweating, trembling, or stomach discomfort',
  'Avoiding situations because of fear or anxiety',
];

export default function SeekSignsSection() {
  return (
    <section className="cx-seek-signs">
      <div className="container">
        <span className="cx-anx-eyebrow">Recognizing symptoms</span>

        <div className="cx-anx-section-head cx-seek-signs-head">
          <h2 className="cx-anx-h2">Common signs may<br />include:</h2>
          <p className="cx-anx-section-lead">
            Recognizing how anxiety manifests across mental, emotional, and physical dimensions
            helps determine when support is needed.
          </p>
        </div>

        <div className="cx-seek-signs-card">
          <ol className="cx-seek-signs-list">
            {signs.map((sign, i) => (
              <li key={sign} className="cx-seek-signs-item">
                <span className="cx-seek-signs-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="cx-seek-signs-text">{sign}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
