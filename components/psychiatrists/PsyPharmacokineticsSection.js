import Image from 'next/image';
import PsyTableScroll from './PsyTableScroll';

const pkRows = [
  ['Cmax (ng/mL)', '229.338', '306.108'],
  ['Tmax (h)', '0.994', '2.738'],
  ['AUCinf (ng*hr/mL)', '535.840', '1626.432'],
  ['T1/2 (h)', '3.571', '6.938'],
];

const adme = [
  {
    label: 'DISTRIBUTION',
    title: 'Volume Profile',
    desc: 'The volume of distribution of Canxiol® in healthy volunteers in fed and fasting conditions is about 1846 L and 2884 L respectively.',
    icon: { src: '/images/DISTRIBUTION.png', width: 116, height: 71 },
  },
  {
    label: 'METABOLISM',
    title: 'Hepatic Pathways',
    desc: 'Cannabidiol is metabolized in the liver and the intestine by CYP2C19 and CYP3A4 enzymes, and 5′-diphosphoglucuronosyltransferase (UGT) UGT1A7, UGT1A9, and UGT2B7 isoforms. Converted to major metabolites 7-Hydroxy Cannabidiol and 7-carboxy Cannabidiol.',
    icon: { src: '/images/METABOLISM.png', width: 100, height: 100 },
  },
  {
    label: 'ELIMINATION',
    title: 'Clearance & Half-life',
    desc: 'The single-dose half-life of Canxiol® in fasted condition is about 3.5h and in fed condition is about 7h.',
    icon: { src: '/images/ELIMINATION.png', width: 104, height: 104 },
  },
  {
    label: 'EXCRETION',
    title: 'Renal Clearance',
    desc: 'Cannabidiol and its metabolites are mostly excreted via the kidneys.',
    icon: { src: '/images/EXCRETION.png', width: 120, height: 120 },
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
          <PsyTableScroll>
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
          </PsyTableScroll>
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
                <Image
                  src={a.icon.src}
                  alt=""
                  aria-hidden="true"
                  width={a.icon.width}
                  height={a.icon.height}
                  className="cx-psy-adme-icon"
                />
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
