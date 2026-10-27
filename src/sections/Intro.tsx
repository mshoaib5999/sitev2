import React, { useEffect, useRef, useState } from 'react';

/**
 * First-visit intro, modelled 1:1 on the reference: a near-black screen,
 * the wordmark landing letter by letter in the centre (the second name's
 * first letter bounces into a gold square, tilted, then settles upright),
 * role + city in small mono at bottom-left, a padded 000–100 counter at
 * bottom-right, and a thin gold progress line along the bottom edge that
 * fills with the counter. Clicking skips (the cursor badge reads "Skip").
 */
export const Intro: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);
  const timers = useRef<number[]>([]);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    timers.current.push(window.setTimeout(onDone, 850));
  };

  useEffect(() => {
    const start = performance.now();
    const DURATION = 1900;
    let raf = 0;
    const tick = (now: number) => {
      if (doneRef.current) return;
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out so it lands softly on 100
      setCount(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timers.current.push(window.setTimeout(finish, 250));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      timers.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDone]);

  const first = 'SHOAIB'.split('');
  const rest = 'sghar'.split('');

  return (
    <div className={`intro ${leaving ? 'is-done' : ''}`} aria-hidden="true" data-cursor="Skip" onClick={finish}>
      <div />
      <div className="flex items-center justify-center" style={{ paddingBottom: '7vh' }}>
        <div className="whitespace-nowrap leading-none" style={{ fontSize: 'clamp(42px, 8.6vw, 124px)' }}>
          <span className="fvs-display uppercase tracking-tight">
            {first.map((ch, i) => (
              <span key={i} className="intro-ltr" style={{ animationDelay: `${i * 55}ms` }}>{ch}</span>
            ))}
          </span>
          <span className="intro-box fvs-display uppercase">{'A'}</span>
          <span className="fvs-italic" style={{ fontWeight: 380 }}>
            {rest.map((ch, i) => (
              <span key={i} className="intro-ltr" style={{ animationDelay: `${620 + i * 45}ms` }}>{ch}</span>
            ))}
          </span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="eyebrow" style={{ lineHeight: 1.9 }}>
          Senior WordPress Developer
        </span>
        <span className="fvs-display leading-none" style={{ fontSize: 'clamp(56px, 10vw, 150px)' }}>
          {String(count).padStart(3, '0')}
        </span>
      </div>
      <div
        className="absolute left-0 bottom-0"
        style={{ height: '3px', width: `${count}%`, background: 'var(--color-accent)' }}
      />
    </div>
  );
};
