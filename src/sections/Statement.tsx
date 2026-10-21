import React, { useEffect, useRef, useState } from 'react';

interface Token { t: string; accent?: boolean; }

const tokens: Token[] = [
  { t: 'I’m' }, { t: 'Shoaib' }, { t: '@IMG@' }, { t: '.' },
  { t: 'I' }, { t: 'build' }, { t: 'WordPress' }, { t: 'websites' }, { t: 'and' },
  { t: 'WooCommerce' }, { t: 'stores' }, { t: 'that' },
  { t: 'load fast,', accent: true }, { t: 'rank well', accent: true },
  { t: 'and' }, { t: 'feel' }, { t: 'good' }, { t: 'to' }, { t: 'use.' },
  { t: 'Designed' }, { t: 'in' }, { t: 'Figma,' }, { t: 'built' }, { t: 'with' },
  { t: 'clean' }, { t: 'code,' }, { t: 'made' }, { t: 'in' },
  { t: 'Pakistan', accent: true }, { t: '—' },
  { t: 'for' }, { t: 'clients' }, { t: 'in' }, { t: 'France,' }, { t: 'California,' },
  { t: 'Canada,' }, { t: 'Dubai' }, { t: 'and' }, { t: 'beyond.' },
];

export const Statement: React.FC = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = textRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height + window.innerHeight * 0.45;
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.88 - rect.top) / total));
        setProgress(p);
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const litCount = Math.round(progress * tokens.length);

  return (
    <section id="about" className="gutter" style={{ paddingTop: 'clamp(40px, 8vh, 90px)', paddingBottom: 'clamp(70px, 12vh, 130px)' }}>
      <div className="eyebrow eyebrow--accent mb-8" data-reveal>(Hello)</div>
      <p
        ref={textRef}
        className="m-0 max-w-[26em] font-medium"
        style={{ fontSize: 'clamp(27px, 3.3vw, 52px)', lineHeight: 1.22, letterSpacing: '-0.01em' }}
      >
        {tokens.map((tok, i) => {
          const lit = i < litCount;
          if (tok.t === '@IMG@') {
            return (
              <img
                key={i}
                src="/shoaib_profile.jpg"
                alt="Muhammad Shoaib Asghar"
                className="inline-block object-cover align-[-0.12em] mx-1"
                style={{ width: '1.7em', height: '1.15em', opacity: lit ? 1 : 0.25, transition: 'opacity 0.35s' }}
              />
            );
          }
          return (
            <span
              key={i}
              className={tok.accent ? 'fvs-italic' : undefined}
              style={{
                color: tok.accent ? 'var(--color-accent)' : 'var(--color-text)',
                opacity: lit ? 1 : 0.16,
                transition: 'opacity 0.35s',
              }}
            >
              {tok.t}{' '}
            </span>
          );
        })}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8" style={{ borderTop: '1px solid var(--color-hairline)' }} data-reveal>
        {[
          { big: '400+', small: 'Websites delivered' },
          { big: '3.5+', small: 'Years of experience' },
          { big: '12+', small: 'Industries — real estate to AI' },
        ].map((s) => (
          <div key={s.small}>
            <div className="fvs-display leading-none" style={{ fontSize: 'clamp(44px, 5.5vw, 84px)' }}>{s.big}</div>
            <div className="eyebrow mt-3">{s.small}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
