'use client';

export default function CanxiolStatsSection() {
  return (
    <section className="cx-stats-section">
      <div className="container">
        <div className="row align-items-center g-0">
          
          {/* Stat 1: 22.3M */}
          <div className="col-12 col-md-4">
            <div className="cx-stat-item cx-stat-item-1">
              <div className="cx-stat-value">
                <span className="cx-stat-num">22.3</span>
                <span className="cx-stat-unit">M</span>
              </div>
              <p className="cx-stat-label">
                Indian adults with mild to moderate anxiety
              </p>
            </div>
          </div>

          {/* Stat 2: 84% */}
          <div className="col-12 col-md-4">
            <div className="cx-stat-item cx-stat-item-2">
              <div className="cx-stat-value">
                <span className="cx-stat-num">84</span>
                <span className="cx-stat-unit">%</span>
              </div>
              <p className="cx-stat-label">
                of <strong>22.3M</strong> patients do not seek required treatment
              </p>
            </div>
          </div>

          {/* Stat 3: 123.5% */}
          <div className="col-12 col-md-4">
            <div className="cx-stat-item cx-stat-item-3">
              <div className="cx-stat-value">
                <span className="cx-stat-num">123.5</span>
                <span className="cx-stat-unit">%</span>
              </div>
              <p className="cx-stat-label">
                Increase in anxiety prevalence between 1990 and 2023 in India
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
