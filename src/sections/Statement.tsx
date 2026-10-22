import React, { useEffect, useRef, useState } from 'react';

interface Token { t: string; accent?: boolean; italic?: boolean; }

const tokens: Token[] = [
  { t: 'I’m' }, { t: 'Shoaib' }, { t: '@IMG@' }, { t: '.' },
  { t: 'I' }, { t: 'build' }, { t: 'WordPress' }, { t: 'websites' }, { t: 'and' },
  { t: 'WooCommerce' }, { t: 'stores' }, { t: 'that' },
  { t: 'load fast,', accent: true, italic: true }, { t: 'rank well', accent: true, italic: true },
  { t: 'and' }, { t: 'feel' }, { t: 'good' }, { t: 'to' }, { t: 'use.' },
  { t: 'Designed' }, { t: 'in' }, { t: 'Figma,' }, { t: 'built' }, { t: 'with' },
  { t: 'clean' }, { t: 'code,' }, { t: 'made' }, { t: 'in' },
  { t: 'Pakistan', accent: true }, { t: '—' },
  { t: 'for' }, { t: 'clients' }, { t: 'in' }, { t: 'France,' }, { t: 'California,' },
  { t: 'Canada,' }, { t: 'Dubai' }, { t: 'and' }, { t: 'beyond.' },
];

export const Statement: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = wrapRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
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
    <section id="about" className="gutter" style={{ paddingBottom: 'clamp(70px, 12vh, 130px)' }}>
      <div ref={wrapRef} style={{ height: '165vh', position: 'relative' }}>
        <div
          className="flex flex-col justify-center"
          style={{ position: 'sticky', top: 0, minHeight: '100vh', paddingTop: '80px' }}
        >
          <div className="eyebrow eyebrow--accent mb-7">(Hello)</div>
          <p
            className="m-0 font-medium"
            style={{
              fontSize: 'clamp(28px, 4.6vw, 74px)',
              lineHeight: 1.04,
              letterSpacing: '-0.015em',
              maxWidth: '1200px',
              fontVariationSettings: '"wdth" 92, "wght" 580',
            }}
          >
            {tokens.map((tok, i) => {
              const lit = i < litCount;
              if (tok.t === '@IMG@') {
                return (
                  <img
                    key={i}
                    src="/shoaib_profile.jpg"
                    alt="Muhammad Shoaib Asghar"
                    className="inline-block object-cover align-[-0.1em] mx-1"
                    style={{ width: '1.6em', height: '1.05em', borderRadius: '4px', opacity: lit ? 1 : 0.2, transition: 'opacity 0.3s' }}
                  />
                );
              }
              return (
                <span
                  key={i}
                  className={tok.italic ? 'fvs-italic' : undefined}
                  style={{
                    color: tok.accent ? 'var(--color-accent)' : 'var(--color-text)',
                    opacity: lit ? 1 : 0.14,
                    transition: 'opacity 0.3s',
                  }}
                >
                  {tok.t}{' '}
                </span>
              );
            })}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8" style={{ borderTop: '1px solid var(--color-hairline)' }} data-reveal>
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
