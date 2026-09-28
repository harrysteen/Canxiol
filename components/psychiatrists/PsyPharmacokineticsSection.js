const pkRows = [
  ['Cmax (ng/mL)', '229.338', '306.108'],
  ['Tmax (h)', '0.994', '2.738'],
  ['AUCinf (ng*hr/mL)', '535.840', '1626.432'],
  ['T1/2 (h)', '3.571', '6.938'],
];

const iconProps = {
  width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', xmlns: 'http://www.w3.org/2000/svg',
};

const adme = [
  {
    label: 'DISTRIBUTION',
    title: 'Volume Profile',
    desc: 'The volume of distribution of Canxiol® in healthy volunteers in fed and fasting conditions is about 1846 L and 2884 L respectively.',
    icon: (
      <svg {...iconProps}><rect x="3" y="5" width="6" height="14" rx="1" /><rect x="15" y="5" width="6" height="14" rx="1" /><path d="M9 12h6M12 9v6" /></svg>
    ),
  },
  {
    label: 'METABOLISM',
    title: 'Hepatic Pathways',
    desc: 'Cannabidiol is metabolized in the liver and the intestine by CYP2C19 and CYP3A4 enzymes, and 5′-diphosphoglucuronosyltransferase (UGT) UGT1A7, UGT1A9, and UGT2B7 isoforms. Converted to major metabolites 7-Hydroxy Cannabidiol and 7-carboxy Cannabidiol.',
    icon: (
      <svg {...iconProps}><circle cx="12" cy="12" r="2.5" /><circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M6.5 6.5l3.7 3.7M17.5 6.5l-3.7 3.7M6.5 17.5l3.7-3.7M17.5 17.5l-3.7-3.7" /></svg>
    ),
  },
  {
    label: 'ELIMINATION',
    title: 'Clearance & Half-life',
    desc: 'The single-dose half-life of Canxiol® in fasted condition is about 3.5h and in fed condition is about 7h.',
    icon: (
      <svg {...iconProps}><rect x="4" y="3" width="13" height="18" rx="1.5" /><path d="M8 3v2h5V3M7.5 10h6M7.5 14h4" /><circle cx="17.5" cy="17.5" r="3" /><path d="M17.5 16v1.5l1 1" /></svg>
    ),
  },
  {
    label: 'EXCRETION',
    title: 'Renal Clearance',
    desc: 'Cannabidiol and its metabolites are mostly excreted via the kidneys.',
    icon: (
      <svg {...iconProps}><path d="M9 4C6 4 4 7 4 11s2 7 5 7c1.5 0 2-1.5 2-3v-2c0-1.5-2-2-2-4s1-3 1-3-0-2-1-2z" /><path d="M15 4c3 0 5 3 5 7s-2 7-5 7c-1.5 0-2-1.5-2-3v-2c0-1.5 2-2 2-4s-1-3-1-3 0-2 1-2z" /></svg>
    ),
  },
];

export default function PsyPharmacokineticsSection() {
  return (
    <section className="cx-psy-pk">
      <div className="container">
        <span className="cx-psy-teal-label">ADME PARAMETERS</span>
        <h2 className="cx-psy-h2 cx-psy-h2-tight">Pharmacokinetics</h2>
        <h3 className="cx-psy-pk-sub">Absorption</h3>
        <p className="cx-psy-section-lead">
          The single dose pharmacokinetics of Cannabidiol following oral administration of Canxiol®
          to healthy volunteers under fasting and fed conditions is provided in the table below.
        </p>

        <div className="cx-psy-table-card">
          <h3 className="cx-psy-table-caption">Single Dose Pharmacokinetics of CANXIOL® (under fasting and fed conditions)</h3>
          <div className="cx-psy-table-scroll">
            <table className="cx-psy-table cx-psy-table-pk">
              <thead>
                <tr>
                  <th>PARAMETER</th>
                  <th>CANXIOL®, 300 MG (FASTING)</th>
                  <th>CANXIOL®, 300 MG (FED)</th>
                </tr>
              </thead>
              <tbody>
                {pkRows.map(([param, fasting, fed], i) => (
                  <tr key={param}>
                    <td>{param}</td>
                    <td>{fasting}</td>
                    {/* Cmax and AUC rise notably with food — emphasised as in the design */}
                    <td className={i === 0 || i === 2 ? 'cx-psy-table-emph' : undefined}>{fed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="cx-psy-table-note cx-psy-table-note-strong">
            Meal Effect: Coadministration of Canxiol® with a high-fat/high-calorie meal increased Cmax
            by about 1.3 folds, AUC by about 3 folds compared with the fasted state in healthy volunteers.
          </p>
        </div>

        <div className="cx-psy-adme">
          {adme.map((a) => (
            <div key={a.label} className="cx-psy-adme-card">
              <div className="cx-psy-adme-head">
                <span className="cx-psy-teal-label cx-psy-adme-label">{a.label}</span>
                <span className="cx-psy-adme-icon">{a.icon}</span>
              </div>
              <h4 className="cx-psy-adme-title">{a.title}</h4>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
