import React, { useEffect, useRef, useState } from 'react';

export const Intro: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const start = performance.now();
    const DURATION = 1300;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out so it lands softly on 100
      setCount(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        setTimeout(() => setLeaving(true), 250);
        setTimeout(onDone, 1100);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className={`intro ${leaving ? 'is-done' : ''}`} aria-hidden="true">
      <div className="eyebrow flex justify-between">
        <span>(Portfolio / ©2026)</span>
        <span className="hidden sm:inline">Senior WordPress Developer</span>
        <span>Okara, Pakistan</span>
      </div>
      <div className="text-center">
        <div className="fvs-display uppercase leading-[0.9] tracking-tight" style={{ fontSize: 'clamp(38px, 7.5vw, 110px)' }}>
          Shoaib<span style={{ color: 'var(--color-accent)' }}>©</span>Asghar
        </div>
        <div className="eyebrow eyebrow--accent mt-4">WordPress — WooCommerce — Speed</div>
      </div>
      <div className="flex items-end justify-between">
        <span className="eyebrow">Loading the good stuff</span>
        <span className="fvs-display leading-none" style={{ fontSize: 'clamp(56px, 10vw, 150px)' }}>
          {String(count).padStart(3, '0')}
        </span>
      </div>
    </div>
  );
};
