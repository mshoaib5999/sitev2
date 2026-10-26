import React, { useEffect, useRef, useState } from 'react';
import { BorderBeam } from '../components/ui/border-beam';
import { RevealWords } from './RevealWords';

/**
 * The giant statement with the same scroll word-reveal as the About
 * intro: words light up one by one while scrolling. The resting
 * two-tone design is preserved — the first sentence lights to full
 * brightness, the continuation lights only to its dimmed grey.
 */
const StatementReveal: React.FC = () => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const bright = 'Websites that win you clients, not just compliments.'.split(' ');
  const dim = 'Designed properly, built properly — made to load fast, rank well and turn visitors into enquiries.'.split(' ');
  const total = bright.length + dim.length;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.92;
        const end = vh * 0.22;
        setProgress(Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height))));
      }
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const lit = Math.round(progress * total);
  const wordStyle = (on: boolean): React.CSSProperties => ({ opacity: on ? 1 : 0.28, transition: 'opacity 0.35s ease' });

  return (
    <p
      ref={ref}
      className="m-0"
      style={{ fontSize: 'clamp(34px, 4.3vw, 66px)', lineHeight: 1.07, letterSpacing: '-0.015em', fontVariationSettings: '"wdth" 92, "wght" 580' }}
      data-reveal
      aria-label="Websites that win you clients, not just compliments. Designed properly, built properly — made to load fast, rank well and turn visitors into enquiries."
    >
      {bright.map((w, i) => (
        <span key={'b' + i} aria-hidden="true" style={wordStyle(i < lit)}>{w}{' '}</span>
      ))}
      {dim.map((w, i) => (
        <span key={'d' + i} aria-hidden="true" style={{ ...wordStyle(bright.length + i < lit), color: 'var(--color-faint)' }}>
          {w}{i < dim.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
};

/**
 * ( Hello ) — rebuilt after the reference layout the user supplied
 * (Jehan Zaib's About block): a giant two-tone statement and story
 * paragraphs on the left; on the right, the portrait card above a
 * 2x2 magic-border stats panel. Layout and styling follow the
 * reference; every word and number is Shoaib's own. This replaces
 * the previous sticky word-reveal statement on the home page.
 */

const stats = [
  { big: '400+', small: 'Projects delivered' },
  { big: '4+', small: 'Years of experience' },
  { big: '12+', small: 'Industries served' },
  { big: '5+', small: 'Countries — clients in' },
];

export const Statement: React.FC = () => (
  <section className="gutter" style={{ paddingTop: 'clamp(70px, 12vh, 130px)', paddingBottom: 'clamp(70px, 12vh, 130px)' }}>
    <h2 className="eyebrow m-0 mb-10" style={{ color: 'var(--color-accent)', fontSize: '13px' }} data-reveal>( Hello )</h2>

    <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-12 lg:gap-16 items-start">
      {/* Left — statement + story */}
      <div>
        <StatementReveal />

        <div className="mt-10" style={{ maxWidth: '56ch' }} data-reveal>
          <RevealWords
            style={{ fontSize: '16.5px', lineHeight: 1.7, color: 'var(--color-muted)' }}
            litColor="var(--color-text)"
            text="I'm Shoaib — a senior WordPress developer based in Okara, Pakistan. I learned the craft the slow way, project by project, and that pace — build fast, deliver faster, never ship careless work — is still how every site leaves my desk."
          />
          <RevealWords
            className="mt-5"
            style={{ fontSize: '16.5px', lineHeight: 1.7, color: 'var(--color-muted)' }}
            litColor="var(--color-text)"
            text="Today that adds up to 400+ websites for businesses and agencies in France, the USA, Canada, Dubai and beyond: WordPress and WooCommerce at the core, with Shopify, Wix, Webflow and GoHighLevel when a project calls for them — every build hand-finished, with clean code, green Core Web Vitals and on-page SEO baked in."
          />
          <RevealWords
            className="mt-5"
            style={{ fontSize: '16.5px', lineHeight: 1.7, color: 'var(--color-muted)' }}
            litColor="var(--color-text)"
            text="My standard hasn't changed with the scale: I don't hand off templates and disappear. If a page doesn't earn its place — in speed, in ranking, in enquiries — it isn't finished."
          />
          <RevealWords
            className="mt-6 mb-0"
            style={{ fontSize: '16.5px', lineHeight: 1.7, fontStyle: 'italic', color: 'var(--color-faint)' }}
            litColor="var(--color-muted)"
            text={'"A beautiful website is worthless if it doesn\'t win you work." — that is why clients come back for their second and third projects.'}
          />
        </div>
      </div>

      {/* Right — portrait + stats */}
      <div>
        <div className="portrait-card relative" data-reveal>
          <div className="portrait-card__frame">
            <img src="/shoaib-portrait.jpg" alt="Muhammad Shoaib Asghar" className="w-full block object-cover" style={{ aspectRatio: '3 / 4' }} />
            <div className="portrait-card__shade" />
          </div>
          <div className="absolute inset-0 pointer-events-none"><BorderBeam color="var(--color-accent)" thickness={1.5} speed={7} length={14} className="h-full w-full rounded-[24px]" /></div>
        </div>

        <div className="magic-panel relative mt-5" data-reveal>
          <div className="magic-panel__inner grid-cols-2">
            {stats.map((s) => (
              <div key={s.small} className="magic-cell">
                <div className="fvs-display leading-none" style={{ fontSize: 'clamp(34px, 3.4vw, 52px)' }}>{s.big}</div>
                <div className="eyebrow mt-3">{s.small}</div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none"><BorderBeam color="var(--color-accent)" thickness={1.5} speed={7} length={14} className="h-full w-full rounded-[24px]" /></div>
        </div>
      </div>
    </div>
  </section>
);
