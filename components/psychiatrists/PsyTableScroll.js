'use client';
import { useEffect, useRef, useState } from 'react';

// Horizontal scroller for wide tables. When the table is wider than the screen it shows
// a "Swipe to see more" hint, a scroll line along the top that tracks the position,
// and a fade on the right edge — all hidden once the table fits or the user reaches the end.
export default function PsyTableScroll({ children }) {
  const scrollRef = useRef(null);
  const [state, setState] = useState({ overflow: false, atEnd: false, thumb: 100, left: 0 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const thumb = (el.clientWidth / el.scrollWidth) * 100;
      setState({
        overflow: max > 1,
        atEnd: el.scrollLeft >= max - 1,
        thumb,
        left: max > 0 ? (el.scrollLeft / max) * (100 - thumb) : 0,
      });
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);

  const { overflow, atEnd, thumb, left } = state;

  return (
    <div className={`cx-psy-table-scroller ${overflow ? 'is-overflowing' : ''} ${atEnd ? 'is-at-end' : ''}`}>
      {overflow && (
        <div className="cx-psy-table-hint" aria-hidden="true">
          <span>Swipe to see more</span>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      {overflow && (
        <div className="cx-psy-table-track" aria-hidden="true">
          <span style={{ width: `${thumb}%`, left: `${left}%` }} />
        </div>
      )}
      <div ref={scrollRef} className="cx-psy-table-scroll" tabIndex={overflow ? 0 : undefined}>
        {children}
      </div>
    </div>
  );
}
