'use client';
import { useEffect, useState } from 'react';

export const ANXIETY_TABS = [
  { id: 'what-is-anxiety',   num: '01', label: 'What is Anxiety?' },
  { id: 'when-to-seek-help', num: '02', label: 'When to seek help' },
  { id: 'treatment',         num: '03', label: 'Treatment' },
];

export default function AnxietySubNav() {
  const [active, setActive] = useState(ANXIETY_TABS[0].id);

  // Scroll-spy: highlight the last section whose top has passed the sticky bars
  useEffect(() => {
    const onScroll = () => {
      const offset = 180;
      let current = ANXIETY_TABS[0].id;
      for (const tab of ANXIETY_TABS) {
        const el = document.getElementById(tab.id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = tab.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="cx-anx-subnav" aria-label="Anxiety and its effects">
      <div className="container cx-anx-subnav-inner">
        <span className="cx-anx-subnav-title">Anxiety and its effects</span>
        <ul className="cx-anx-subnav-tabs">
          {ANXIETY_TABS.map((tab) => (
            <li key={tab.id}>
              <a
                href={`#${tab.id}`}
                className={`cx-anx-subnav-tab ${active === tab.id ? 'active' : ''}`}
                aria-current={active === tab.id ? 'true' : undefined}
              >
                <span className="cx-anx-subnav-num">{tab.num}</span>
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
