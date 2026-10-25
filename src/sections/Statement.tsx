import React from 'react';
import { BorderBeam } from '../components/ui/border-beam';

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
        <p
          className="m-0"
          style={{ fontSize: 'clamp(34px, 4.3vw, 66px)', lineHeight: 1.07, letterSpacing: '-0.015em', fontVariationSettings: '"wdth" 92, "wght" 580' }}
          data-reveal
        >
          Websites that win you clients, not just compliments.{' '}
          <span style={{ color: 'var(--color-faint)' }}>
            Designed properly, built properly — made to load fast, rank well and turn visitors into enquiries.
          </span>
        </p>

        <div className="mt-10" style={{ maxWidth: '56ch' }} data-reveal>
          <p className="text-muted" style={{ fontSize: '16.5px', lineHeight: 1.7 }}>
            I'm Shoaib — a senior WordPress developer based in Okara, Pakistan. I learned the craft the slow
            way, project by project, and that pace — build fast, deliver faster, never ship careless work —
            is still how every site leaves my desk.
          </p>
          <p className="text-muted mt-5" style={{ fontSize: '16.5px', lineHeight: 1.7 }}>
            Today that adds up to 400+ websites for businesses and agencies in France, the USA, Canada, Dubai
            and beyond: WordPress and WooCommerce at the core, with Shopify, Wix, Webflow and GoHighLevel when
            a project calls for them — every build hand-finished, with clean code, green Core Web Vitals and
            on-page SEO baked in.
          </p>
          <p className="text-muted mt-5" style={{ fontSize: '16.5px', lineHeight: 1.7 }}>
            My standard hasn't changed with the scale: I don't hand off templates and disappear. If a page
            doesn't earn its place — in speed, in ranking, in enquiries — it isn't finished.
          </p>
          <p className="mt-6 mb-0" style={{ fontSize: '16.5px', lineHeight: 1.7, fontStyle: 'italic', color: 'var(--color-faint)' }}>
            "A beautiful website is worthless if it doesn't win you work." — that is why clients come back
            for their second and third projects.
          </p>
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
