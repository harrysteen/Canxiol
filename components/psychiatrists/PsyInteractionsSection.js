'use client';
import { useState } from 'react';

// TODO: items 2–9 need their approved wording — only item 1 was provided in the design.
const PENDING = 'Content to be added.';

const interactions = [
  {
    title: 'Strong CYP3A4 or CYP2C19 Inducers',
    body: 'Co-administration with a strong CYP3A4 (Carbamazepine, Efavirenz, Mitotane, Enzalutamide) and CYP2C19 inducer (rifampin) reported to decrease cannabidiol plasma concentrations. Consider an increase in Cannabidiol dosage (based on clinical response and tolerability), when co-administered with a strong CYP3A4 and/or CYP2C19 inducer.',
  },
  { title: 'CYP3A4 Inhibitors', body: PENDING },
  { title: 'UGT1A9, UGT2B7, CYP1A2, CYP2B6, CYP2C8 and CYP2C9 Substrates', body: PENDING },
  { title: 'Sensitive CYP2C19 Substrates', body: PENDING },
  { title: 'Sensitive P-gp Substrates Given Orally', body: PENDING },
  { title: 'Antiepileptic Drugs (Clobazam, Stiripentol, Valproate)', body: PENDING },
  { title: 'CNS Depressants and Alcohol', body: PENDING },
  { title: 'Tobacco Smoking', body: PENDING },
  { title: 'SSRIs, SNRIs and Others', body: PENDING },
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
                    <p>{item.body}</p>
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
