// Small grouped bar chart: Baseline vs Visit 9 for each treatment arm.
// groups: [{ label, baseline, visit9 }], max: top of the y-axis, step: tick interval
export default function PsyBarChart({ title, groups, max, step }) {
  const ticks = [];
  for (let v = 0; v <= max; v += step) ticks.push(v);

  return (
    <figure className="cx-psy-chart">
      <figcaption className="cx-psy-chart-title">{title}</figcaption>
      <div className="cx-psy-chart-body">
        <div className="cx-psy-chart-axis">
          {ticks.map((t) => (
            <span key={t} style={{ bottom: `${(t / max) * 100}%` }}>{t}</span>
          ))}
        </div>
        <div className="cx-psy-chart-plot">
          {ticks.map((t) => (
            <i key={t} className="cx-psy-chart-grid" style={{ bottom: `${(t / max) * 100}%` }} />
          ))}
          {groups.map((g) => (
            <div key={g.label} className="cx-psy-chart-group">
              <div className="cx-psy-chart-bars">
                <div className="cx-psy-bar cx-psy-bar-base" style={{ height: `${(g.baseline / max) * 100}%` }}>
                  <span>{g.baseline}</span>
                </div>
                <div className="cx-psy-bar cx-psy-bar-visit" style={{ height: `${(g.visit9 / max) * 100}%` }}>
                  <span>{g.visit9}</span>
                </div>
              </div>
              <span className="cx-psy-chart-label">{g.label}</span>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

export function PsyChartLegend() {
  return (
    <div className="cx-psy-chart-legend">
      <span><i className="cx-psy-bar-base" /> Baseline</span>
      <span><i className="cx-psy-bar-visit" /> Visit 9</span>
    </div>
  );
}
