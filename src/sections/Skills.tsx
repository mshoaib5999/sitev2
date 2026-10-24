import React from 'react';

/**
 * Skills — scrolling pill rows (marquee) in the site's own styling,
 * after the reference layout the user supplied: eyebrow + big title +
 * statement on the left, rows of icon pills drifting sideways (rows
 * alternate direction, pause on hover, edges fade out).
 * Every technology listed is one Shoaib actually works with.
 */

type Glyph = 'code' | 'gauge' | 'search' | 'swap' | 'pencil' | 'server' | 'plug' | 'gear' | 'target' | 'sliders';

const glyphs: Record<Glyph, React.ReactNode> = {
  code: (<><path d="M8 6 L2.5 12 L8 18" /><path d="M16 6 L21.5 12 L16 18" /></>),
  gauge: (<><path d="M4 15 a8 8 0 1 1 16 0" /><path d="M12 15 L15.5 9.5" /><path d="M3 19 h18" /></>),
  search: (<><circle cx="11" cy="11" r="6.5" /><path d="M16 16 L21 21" /></>),
  swap: (<><path d="M7 4 L3.5 7.5 L7 11" /><path d="M3.5 7.5 H17" /><path d="M17 13 L20.5 16.5 L17 20" /><path d="M20.5 16.5 H7" /></>),
  pencil: (<><path d="M12 20 h8.5" /><path d="M16.8 3.9 a2 2 0 0 1 2.9 2.9 L7.5 19 L3.5 20.5 L5 16.5 Z" /></>),
  server: (<><rect x="3.5" y="3.5" width="17" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="17" height="7" rx="1.5" /><path d="M7 7 h.01 M7 17 h.01" strokeWidth="2.6" /></>),
  plug: (<><path d="M9 2.8 V8 M15 2.8 V8" /><path d="M6 8 h12 v3.5 a6 6 0 0 1-12 0 Z" /><path d="M12 17.5 V21" /></>),
  gear: (<><circle cx="12" cy="12" r="3.2" /><path d="M12 2.8 v3 M12 18.2 v3 M2.8 12 h3 M18.2 12 h3 M5.2 5.2 l2.1 2.1 M16.7 16.7 l2.1 2.1 M18.8 5.2 l-2.1 2.1 M7.3 16.7 l-2.1 2.1" /></>),
  target: (<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" /></>),
  sliders: (<><path d="M4 7 h9 M17.5 7 H20 M4 12 h2.5 M10.5 12 H20 M4 17 h10.5 M18.5 17 H20" /><circle cx="15" cy="7" r="2" /><circle cx="8.5" cy="12" r="2" /><circle cx="16.5" cy="17" r="2" /></>),
};

interface Skill { label: string; icon?: string; tile?: string; glyph?: Glyph }

const row1: Skill[] = [
  { label: 'HTML', icon: '/skills/html5.svg' },
  { label: 'CSS', icon: '/skills/css3.svg' },
  { label: 'JavaScript', icon: '/skills/javascript.svg' },
  { label: 'React', icon: '/skills/react.svg' },
  { label: 'Next.js', icon: '/skills/nextjs.svg' },
  { label: 'Tailwind CSS', icon: '/skills/tailwindcss.svg' },
  { label: 'jQuery', icon: '/skills/jquery.svg' },
  { label: 'Git', icon: '/skills/git.svg' },
  { label: 'GitHub', icon: '/skills/github.svg' },
  { label: 'Figma', icon: '/skills/figma.svg' },
];

const row2: Skill[] = [
  { label: 'WordPress', icon: '/skills/wordpress.svg' },
  { label: 'WooCommerce', icon: '/skills/woocommerce.svg' },
  { label: 'Elementor Pro', tile: 'E' },
  { label: 'ACF Pro', tile: 'ACF' },
  { label: 'PHP', icon: '/skills/php.svg' },
  { label: 'MySQL', icon: '/skills/mysql.svg' },
  { label: 'Shopify', tile: 'S' },
  { label: 'Webflow', icon: '/skills/webflow.svg' },
  { label: 'Wix', tile: 'WIX' },
  { label: 'GoHighLevel', tile: 'GHL' },
];

const row3: Skill[] = [
  { label: 'Custom Theme Development', glyph: 'code' },
  { label: 'Figma to WordPress', icon: '/skills/figma.svg' },
  { label: 'Landing Pages', glyph: 'target' },
  { label: 'Website Migration', glyph: 'swap' },
  { label: 'PageSpeed & Performance', glyph: 'gauge' },
  { label: 'On-page SEO', glyph: 'search' },
  { label: 'Website Optimization', glyph: 'sliders' },
  { label: 'Website Redesign', glyph: 'pencil' },
  { label: 'Server Handling', glyph: 'server' },
  { label: 'API Integration', glyph: 'plug' },
  { label: 'Website Maintenance', glyph: 'gear' },
];

const Pill: React.FC<{ s: Skill }> = ({ s }) => (
  <span className="skill-pill">
    <span className="skill-tile">
      {s.icon ? (
        <img src={s.icon} alt="" loading="lazy" draggable={false} />
      ) : s.glyph ? (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{glyphs[s.glyph]}</svg>
      ) : (
        <span>{s.tile}</span>
      )}
    </span>
    <span className="skill-label">{s.label}</span>
  </span>
);

const Row: React.FC<{ items: Skill[]; duration: number; reverse?: boolean }> = ({ items, duration, reverse }) => (
  <div className="skills-row skills-viewport">
    <div
      className={`skills-track ${reverse ? 'is-reverse' : ''}`}
      style={{ ['--skills-dur' as string]: `${duration}s` }}
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="skills-group" aria-hidden={copy === 1}>
          {items.map((s) => (
            <Pill key={s.label} s={s} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const Skills: React.FC = () => (
  <section className="mt-28" aria-label="Skills and tools">
    <div className="gutter grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 items-start">
      <div data-reveal>
        <div className="eyebrow eyebrow--accent mb-5">( Tools &amp; expertise )</div>
        <h2 className="fvs-display uppercase m-0 leading-none" style={{ fontSize: 'clamp(52px, 7.5vw, 104px)' }}>Skills</h2>
        <p className="text-muted mt-6 mb-0" style={{ fontSize: '17px', lineHeight: 1.65, maxWidth: '36ch' }}>
          Every tool here earns its place on real client work — deep WordPress craft, modern front-end, and the
          platforms in between. If it is on this list, I can build with it, fix it, or make it faster.
        </p>
      </div>
      <div className="flex flex-col gap-3 min-w-0">
        <Row items={row1} duration={44} />
        <Row items={row2} duration={50} reverse />
        <Row items={row3} duration={56} />
      </div>
    </div>
  </section>
);
