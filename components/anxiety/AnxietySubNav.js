'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Each tab is its own page under /anxiety
export const ANXIETY_TABS = [
  { href: '/anxiety',                   num: '01', label: 'What is Anxiety?' },
  { href: '/anxiety/when-to-seek-help', num: '02', label: 'When to seek help' },
  { href: '/anxiety/treatment',         num: '03', label: 'Treatment' },
];

export default function AnxietySubNav() {
  const pathname = usePathname();

  return (
    <nav className="cx-anx-subnav" aria-label="Anxiety and its effects">
      <div className="container cx-anx-subnav-inner">
        <span className="cx-anx-subnav-title">Anxiety and its effects</span>
        <ul className="cx-anx-subnav-tabs">
          {ANXIETY_TABS.map((tab) => {
            const active = pathname === tab.href;
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  className={`cx-anx-subnav-tab ${active ? 'active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="cx-anx-subnav-num">{tab.num}</span>
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
