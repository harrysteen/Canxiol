'use client';
import { useEffect, useRef } from 'react';

// Teal one-line message pinned to the bottom of the viewport (home page).
// Publishes its height as --cx-infobar-h, like CanxiolInfoBar, so the hero leaves room for it.
export default function CanxiolNoticeBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const root = document.documentElement;
    const update = () => {
      const pinned = getComputedStyle(bar).position === 'sticky';
      root.style.setProperty('--cx-infobar-h', pinned ? `${bar.offsetHeight}px` : '0px');
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
      root.style.removeProperty('--cx-infobar-h');
    };
  }, []);

  return (
    <section ref={barRef} className="cx-notice-bar">
      <div className="container">
        <p>
          <strong>Avoidance is common</strong>, and repeated avoidance gradually restricts a{' '}
          <strong>normal way of life</strong>
        </p>
      </div>
    </section>
  );
}
