'use client';
import { useEffect, useRef } from 'react';

// Teal one-line message band directly under the home hero (a normal section, not pinned).
// Publishes its height as --cx-infobar-h so the hero leaves room for it: on first load the
// band sits at the bottom of the screen, then scrolls away with the page.
export default function CanxiolNoticeBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty('--cx-infobar-h', `${bar.offsetHeight}px`);
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
