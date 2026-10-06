export default function TreatmentApproachSection() {
  return (
    <section className="cx-treat-approach">
      <div className="container">
        <span className="cx-anx-eyebrow">Clinical management</span>

        <div className="cx-anx-section-head cx-treat-approach-head">
          <h2 className="cx-anx-h2">A tailored clinical pathway<br className="cx-br-desktop" /> for recovery.</h2>
          <p className="cx-anx-section-lead">
            Modern psychiatric care approaches anxiety disorders through structured,
            individualized interventions adapted to symptom severity and individual patient needs.
          </p>
        </div>

        <div className="cx-treat-approach-card">
          <p className="cx-treat-approach-text">
            It may include psychological therapy, medication, or a combination of approaches.{' '}
            <strong>Cognitive behavioural therapy (CBT)</strong> is often given alongside
            pharmacotherapy for several anxiety disorders.
          </p>
          <div className="cx-treat-approach-foot">
            <span>Multi-modal therapeutic standard</span>
            <span>Psychotherapy + Pharmacotherapy</span>
          </div>
        </div>
      </div>
    </section>
  );
}
