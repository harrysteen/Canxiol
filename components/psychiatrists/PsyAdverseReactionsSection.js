import PsyTableScroll from './PsyTableScroll';

// Rows: [label, canxiol, placebo]. Category rows have no leading bullet.
const groups = [
  { category: ['Gastrointestinal disorders', '17 (19.1)', '6 (6.7)'], items: [
    ['Abdominal distension', '2 (2.2)', '0'],
    ['Abdominal pain', '2 (2.2)', '0'],
    ['Abdominal pain upper', '3 (3.4)', '0'],
    ['Constipation', '1 (1.1)', '1 (1.1)'],
    ['Diarrhoea', '3 (3.4)', '0'],
    ['Eructation', '0', '1 (1.1)'],
    ['Frequent bowel movements', '2 (2.2)', '0'],
    ['Nausea', '5 (5.6)', '3 (3.4)'],
    ['Vomiting', '0', '1 (1.1)'],
  ] },
  { category: ['General disorders and administration site conditions', '4 (4.5)', '3 (3.4)'], items: [
    ['Fatigue', '1 (1.1)', '0'],
    ['Pain', '2 (2.2)', '0'],
    ['Pyrexia', '1 (1.1)', '3 (3.4)'],
  ] },
  { category: ['Infections and infestations', '1 (1.1)', '0'], items: [
    ['Nasopharyngitis', '1 (1.1)', '0'],
  ] },
  { category: ['Nervous system disorders', '7 (7.9)', '5 (5.6)'], items: [
    ['Dizziness', '2 (2.2)', '2 (2.2)'],
    ['Dysgeusia', '1 (1.1)', '0'],
    ['Headache', '4 (4.5)', '4 (4.5)'],
  ] },
  { category: ['Psychiatric disorder', '1 (1.1)', '0'], items: [
    ['Libido increased', '1 (1.1)', '0'],
  ] },
  { category: ['Respiratory, thoracic and mediastinal disorders', '0', '1 (1.1)'], items: [
    ['Cough', '0', '1 (1.1)'],
  ] },
];

export default function PsyAdverseReactionsSection() {
  return (
    <section className="cx-psy-ae">
      <div className="container">
        <span className="cx-psy-teal-label">SAFETY PROFILE</span>
        <h2 className="cx-psy-h2">Adverse Reactions reported in phase 3 clinical trial</h2>
        <p className="cx-psy-section-lead">
          In Phase III randomized clinical trial, the most common adverse reactions that occurred in
          Canxiol® treated patients with mild to moderate anxiety disorders were fatigue, abdominal
          pain, abdominal distension, dizziness, diarrhoea, nausea.
        </p>
        <p className="cx-psy-section-lead">
          Below table lists the adverse reactions that were reported in the randomized controlled trial.
        </p>

        <div className="cx-psy-table-card">
          <h3 className="cx-psy-table-caption">Adverse Reactions in patients treated with Canxiol® in clinical trial</h3>
          <PsyTableScroll>
            <table className="cx-psy-table">
              <thead>
                <tr>
                  <th>ADVERSE REACTIONS</th>
                  <th>CANXIOL® (N=89) N (%)</th>
                  <th>PLACEBO (N=89) N (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Patients with at least one AE</td>
                  <td>28 (15.7)</td>
                  <td>13 (7.3)</td>
                </tr>
                {groups.map(({ category, items }) => (
                  <GroupRows key={category[0]} category={category} items={items} />
                ))}
              </tbody>
            </table>
          </PsyTableScroll>
          <p className="cx-psy-table-note">n: Number of patients, %: Percentage of patients</p>
        </div>

        <div className="cx-psy-note-box">
          These mild adverse reactions are resolved during continued treatment with Canxiol®, without
          need for dose adjustment.
        </div>
      </div>
    </section>
  );
}

function GroupRows({ category, items }) {
  return (
    <>
      <tr className="cx-psy-table-category">
        {category.map((cell, i) => <td key={i}>{cell}</td>)}
      </tr>
      {items.map((row) => (
        <tr key={row[0]} className="cx-psy-table-sub">
          <td>• {row[0]}</td>
          <td>{row[1]}</td>
          <td>{row[2]}</td>
        </tr>
      ))}
    </>
  );
}
