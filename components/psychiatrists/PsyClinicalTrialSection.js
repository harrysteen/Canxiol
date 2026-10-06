import PsyBarChart, { PsyChartLegend } from './PsyBarChart';
import { PSY_DOWNLOADS } from './psyLinks';

const stats = [
  { value: '178', label: 'PARTICIPANTS' },
  { value: '1:1', label: 'RANDOMISATION' },
  { value: '10', label: 'SITES' },
  { value: 'Jan–Dec 2023', label: 'TRIAL DURATION' },
];

const chart = (baseC, visitC, baseP, visitP) => [
  { label: 'Cannabidiol', baseline: baseC, visit9: visitC },
  { label: 'Placebo', baseline: baseP, visit9: visitP },
];

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 1.75V9.75M7 9.75L3.75 6.5M7 9.75L10.25 6.5M2 12.25H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function PsyClinicalTrialSection() {
  return (
    <section id="clinical-evidence" className="cx-psy-trial">
      <div className="container">
        {/* Intro + key numbers */}
        <span className="cx-psy-teal-label">CLINICAL SCIENTIFIC STUDY</span>
        <h2 className="cx-psy-h2">Clinical Trial Data.</h2>
        <div className="cx-psy-trial-intro">
          <p className="cx-psy-trial-design">
            Phase III, prospective, double-blind, placebo-controlled, parallel-group, multicentre
            randomised controlled trial.
          </p>
          <p className="cx-psy-trial-meta">
            178 participants randomised 1:1 (Canxiol &amp; Placebo) across 10 sites in all four
            regions of India, January to December 2023, for regulatory approval in India
          </p>
        </div>

        <div className="cx-psy-trial-stats">
          {stats.map((s) => (
            <div key={s.label} className="cx-psy-trial-stat">
              <span className="cx-psy-trial-stat-value">{s.value}</span>
              <span className="cx-psy-trial-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Evidence summary card */}
        <div className="cx-psy-evidence">
          <div className="cx-psy-evidence-head">
            <h2 className="cx-psy-h2">Clinical Trial Data.</h2>
            <span className="cx-psy-evidence-badge">CANXIOL® EVIDENCE SUMMARY</span>
          </div>
          <p className="cx-psy-evidence-lead">
            A prospective, randomized, double-blind, multicenter comparative study to Evaluate the
            Efficacy, Safety and Pharmacokinetics of Cannabidiol oral solution versus matching
            Placebo for treatment of mild to moderate anxiety disorders
          </p>

          <div className="cx-psy-evidence-grid">
            {/* Column 1 */}
            <div className="cx-psy-evidence-col">
              <div className="cx-psy-ev-banner">PHASE III · RCT · DOUBLE-BLIND · PARALLEL-GROUP</div>
              <div className="cx-psy-ev-mini-row">
                <div className="cx-psy-ev-box cx-psy-ev-mini">
                  <strong>10</strong>
                  <span>sites, 4 regions of India</span>
                </div>
                <div className="cx-psy-ev-box cx-psy-ev-mini">
                  <strong>178 randomized</strong>
                  <span>89 CBD : 89 Placebo</span>
                </div>
              </div>
              <div className="cx-psy-ev-box">
                <h3 className="cx-psy-ev-title">Significant response, all clinical endpoints</h3>
                <p>
                  Anxiety, clinician global impression, depressive symptoms, and sleep quality each
                  improved by roughly half to two-thirds from baseline with cannabidiol.
                </p>
              </div>
              <div className="cx-psy-ev-box">
                <h3 className="cx-psy-ev-title">Well-tolerated</h3>
                <p>
                  41 of 178 participants reported at least one adverse event; none were serious, and
                  none led to treatment discontinuation.
                </p>
              </div>
              <div className="cx-psy-ev-box">
                <h3 className="cx-psy-ev-title">Endpoints</h3>
                <dl className="cx-psy-ev-endpoints">
                  <div><dt>Primary:</dt><dd>GAD-7, HAM-A</dd></div>
                  <div><dt>Secondary:</dt><dd>CGI-I, CGI-S, PHQ-9, PSQI</dd></div>
                  <div className="cx-psy-ev-endpoints-last"><dt>Assessed:</dt><dd>Baseline and Visit 9 (end of treatment)</dd></div>
                </dl>
              </div>
            </div>

            {/* Column 2 */}
            <div className="cx-psy-evidence-col">
              <div className="cx-psy-ev-box">
                <span className="cx-psy-ev-label">DOSING REGIMEN</span>
                <p>
                  150 mg BID in week 1, titrated to 225 mg BID in week 2 and 300 mg BID in week 3,
                  continued for 8 weeks (Visit 9), then tapered to 150 mg QD for 1 week. The dose is
                  added to about 150 mL of water, mixed, and consumed 30 minutes after food.
                </p>
              </div>
              <div className="cx-psy-ev-box">
                <span className="cx-psy-ev-label">SECONDARY ENDPOINTS – CLINICIAN-RATED SCALES</span>
                <div className="cx-psy-chart-pair">
                  <PsyBarChart title="CGI-I" max={4} step={0.5} groups={chart(4, 1.6, 3.9, 3.9)} />
                  <PsyBarChart title="CGI-S" max={4} step={0.5} groups={chart(3.9, 2, 3.9, 3.9)} />
                </div>
                <PsyChartLegend />
              </div>
            </div>

            {/* Column 3 */}
            <div className="cx-psy-evidence-col">
              <div className="cx-psy-ev-highlight">
                <h3>Both co-primary endpoints met</h3>
                <p>GAD-7 − 7.02 pts • HAM-A − 11.9 pts vs. placebo, both p &lt; 0.0001</p>
              </div>
              <div className="cx-psy-ev-box">
                <span className="cx-psy-ev-label">PRIMARY ENDPOINTS – ANXIETY SCORES IMPROVED SIGNIFICANTLY</span>
                <div className="cx-psy-chart-pair">
                  <PsyBarChart title="GAD-7" max={14} step={2} groups={chart(11.8, 4.8, 11.2, 11.8)} />
                  <PsyBarChart title="HAM-A" max={20} step={2} groups={chart(18.9, 7.34, 18.2, 18.9)} />
                </div>
                <PsyChartLegend />
              </div>
              <div className="cx-psy-ev-box">
                <span className="cx-psy-ev-label">SECONDARY ENDPOINTS – MOOD &amp; SLEEP IMPROVED ALONGSIDE ANXIETY</span>
                <div className="cx-psy-chart-pair">
                  <PsyBarChart title="PHQ-9" max={14} step={2} groups={chart(11.7, 4.53, 10.9, 11.1)} />
                  <PsyBarChart title="PSQI" max={10} step={2} groups={chart(9.8, 3.6, 8.7, 9.3)} />
                </div>
                <PsyChartLegend />
              </div>
            </div>
          </div>

          <p className="cx-psy-evidence-cite">
            Gundugurti PR, Banda N, Yadlapalli SS, Narala A, Thatikonda R, Kocherlakota C,
            Kothapalli KSD. <em>Asian J Psychiatry</em> 2024;97:104073;{' '}
            <a href="https://doi.org/10.1016/j.ajp.2024.104073" target="_blank" rel="noopener noreferrer">
              https://doi.org/10.1016/j.ajp.2024.104073
            </a>.
          </p>
        </div>

        <div className="cx-psy-trial-download">
          <a href={PSY_DOWNLOADS.clinicalPoster} className="cx-psy-btn-dark" target="_blank" rel="noopener noreferrer">
            <span>DOWNLOAD CLINICAL POSTER (PDF)</span>
            <DownloadIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
