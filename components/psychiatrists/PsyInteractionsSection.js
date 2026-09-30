'use client';
import { useState } from 'react';

// Each body is a list of blocks: a string renders as a paragraph,
// { sub: '…' } renders as a small subheading (used in cards 6 and 9).
const interactions = [
  {
    title: 'Strong CYP3A4 or CYP2C19 Inducers',
    body: [
      'Co-administration with a strong CYP3A4 (Carbamazepine, Efavirenz, Mitotane, Enzalutamide) and CYP2C19 inducer (rifampin) reported to decrease cannabidiol plasma concentrations. Consider an increase in Cannabidiol dosage (based on clinical response and tolerability), when co-administered with a strong CYP3A4 and/or CYP2C19 inducer.',
    ],
  },
  {
    title: 'CYP3A4 Inhibitors',
    body: [
      'Co-administration with CYP3A4 inhibitors (Ketoconazole, Itraconazole, Ritonavir, Clarithromycin, Erythromycin base) reported to increase the levels of Cannabidiol. Consider decrease in Cannabidiol dosage (based on clinical response and tolerability), when co-administered with these drugs.',
    ],
  },
  {
    title: 'UGT1A9, UGT2B7, CYP1A2, CYP2B6, CYP2C8 and CYP2C9 Substrates',
    body: [
      'Cannabidiol is a weak inhibitor of CYP1A2. Increase in exposure of sensitive CYP1A2 substrates (e.g., caffeine, theophylline, or tizanidine) is reported when co-administered with cannabidiol.',
      "Drug-drug interactions with CYP2B6 substrates (e.g., bupropion), uridine 5'-diphospho-glucuronosyltransferase 1A9 (UGT1A9) substrates (e.g., diflunisal, propofol, fenofibrate), and UGT2B7 substrates (e.g., gemfibrozil, lamotrigine, morphine, lorazepam, naltrexone), CYP2C8 and CYP2C9 (e.g., phenytoin) substrates are reported when co-administered with Cannabidiol.",
      'Consider adjusting Cannabidiol dosage when co-administered with these drugs, as clinically appropriate.',
    ],
  },
  {
    title: 'Sensitive CYP2C19 Substrates',
    body: [
      'In vivo data reported that co-administration of Cannabidiol increases plasma concentrations of drugs (e.g., diazepam, Omeprazole) that are metabolized by CYP2C19.',
      'Consider a reduction in dosage of sensitive CYP2C19 substrates, as clinically appropriate, when co-administered with Cannabidiol.',
    ],
  },
  {
    title: 'Sensitive P-gp Substrates Given Orally',
    body: [
      'Co-administration of Cannabidiol with orally administered everolimus, a P-gp and CYP3A4 substrate, reported an approximately 2.5-fold increase in mean Cmax and AUC of everolimus.',
      'Increase in exposure of other orally administered P-gp substrates (e.g., sirolimus, tacrolimus, digoxin) is reported on co-administration with Cannabidiol.',
      'When initiating Cannabidiol in patients taking everolimus, monitor therapeutic drug levels of everolimus and adjust the dosage accordingly.',
      'Therapeutic drug monitoring and dose reduction of other P-gp substrates should be considered when given orally and concurrently with Cannabidiol.',
    ],
  },
  {
    title: 'Antiepileptic Drugs (Clobazam, Stiripentol, Valproate)',
    body: [
      { sub: 'Clobazam' },
      'CYP3A4 metabolizes Clobazam (CLB) to N-ClB, which in turn is metabolized to inactive metabolites by CYP2C19, and Cannabidiol inhibits CYP2C19. The inhibition of CYP2C19 by Cannabidiol is regarded as the basis of the rise in N-CLB concentration. Consider a reduction in dosage of clobazam if adverse reactions known to occur with clobazam are experienced when coadministered with Cannabidiol.',
      { sub: 'Stiripentol' },
      'Concomitant use of Cannabidiol and stiripentol causes an elevation in exposure to stiripentol. The clinical relevance of this effect is unknown, but patients should be monitored for stiripentol-related adverse drug reactions.',
      { sub: 'Valproate' },
      'Valproate is a UGT1A9/2B7 substrate, which Cannabidiol inhibits. Concomitant use of Cannabidiol and valproate increases the incidence of liver enzyme elevations. If such elevations occur, discontinuation or reduction of Cannabidiol and/or concomitant valproate should be considered.',
      'Use of Antiepileptic drugs increases the incidence of liver enzyme elevations, dose reduction of Cannabidiol and/or concomitant antiepileptic drug should be considered.',
    ],
  },
  {
    title: 'CNS Depressants and Alcohol',
    body: [
      'Concomitant use of Cannabidiol with other CNS depressants and alcohol may increase the risk of sedation and somnolence. Prescribers should monitor patients closely and adjust the doses as needed.',
    ],
  },
  {
    title: 'Tobacco Smoking',
    body: [
      'Tobacco smoke is a moderate inducer of CYP1A2. Cannabidiol can inhibit the CYP1A2 enzyme. While prescribing Cannabidiol alongside nicotine substances (tobacco smoke) that induce CYP1A2, the doses may need to be carefully adjusted.',
    ],
  },
  {
    title: 'SSRIs, SNRIs and Others',
    body: [
      { sub: 'CYP1A2 substrates' },
      'Cannabidiol is a weak inhibitor of CYP1A2. Fluvoxamine and Duloxetine are extensively metabolized by CYP1A2 enzyme. Concomitant use of Cannabidiol may alter the plasma concentrations of Fluvoxamine and Duloxetine. Prescribers should adjust the doses as needed.',
      { sub: 'CYP3A4 substrates' },
      'Cannabidiol is metabolized by CYP3A4 enzyme. Citalopram, Escitalopram, Sertraline, Buspirone and Buprenorphine are also metabolized by CYP3A4. Concomitant use may alter the metabolism of Cannabidiol. Prescribers should adjust the doses as needed.',
      { sub: 'CYP2C19 substrates' },
      'Cannabidiol is a moderate inhibitor of CYP2C19. Concomitant use of Cannabidiol increases plasma concentrations of CYP2C19 substrates (e.g., Citalopram, Escitalopram and Sertraline) and may increase the risk of adverse reactions. Prescribers should monitor patients closely and adjust the doses as needed.',
      { sub: 'CYP2D6 substrates' },
      'Cannabidiol is an inhibitor of CYP2D6. Concomitant use of Cannabidiol may increase plasma concentrations of CYP2D6 substrates (e.g., Fluoxetine, Paroxetine, Sertraline, Duloxetine, Venlafaxine) may increase the risk of adverse reactions. Prescribers should monitor patients closely and adjust the doses as needed.',
      { sub: 'CYP3A4 and CYP2C19 inhibitors' },
      'Fluvoxamine is a moderate inhibitor of CYP3A4, and a strong inhibitor of CYP2C19, resulting in the inhibition of Cannabidiol metabolism. Concomitant use may demonstrate an increase in Cannabidiol plasma concentration. Prescribers should adjust the doses as needed.',
    ],
  },
];

export default function PsyInteractionsSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="cx-psy-ddi">
      <div className="container">
        <span className="cx-psy-teal-label">CLINICAL PHARMACOLOGY</span>
        <h2 className="cx-psy-h2 cx-psy-h2-tight">Drug-drug Interactions</h2>
        <p className="cx-psy-section-lead">
          Comprehensive metabolic and pharmacokinetic interaction guidance for prescribers.
        </p>

        <div className="cx-psy-accordion">
          {interactions.map((item, i) => {
            const open = openIndex === i;
            const panelId = `cx-psy-ddi-panel-${i}`;
            return (
              <div key={item.title} className={`cx-psy-acc-item${open ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="cx-psy-acc-head"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                >
                  <span>{i + 1}. {item.title}</span>
                  <svg className="cx-psy-acc-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {open && (
                  <div id={panelId} className="cx-psy-acc-body">
                    {item.body.map((block, j) =>
                      typeof block === 'string'
                        ? <p key={j}>{block}</p>
                        : <h4 key={j} className="cx-psy-acc-sub">{block.sub}</h4>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
