import React from 'react';

/**
 * How I work — rebuilt from the supplied "HowItWorks" pinned-notes
 * component (tilted note cards along a winding animated dashed path),
 * restyled to this site's branding (charcoal + gold, no colour themes)
 * and reworded around Shoaib's actual services. The original used the
 * `motion` package only to loop the dashed path; here that loop is a
 * CSS keyframe on stroke-dashoffset — same motion, no extra dependency.
 * Card numbers use the Caveat handwriting font, like the reference.
 */

const Pin: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: '34px', height: '34px', color: 'var(--color-accent)', margin: '6px auto 12px', display: 'block', filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.45))' }}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const steps = [
  {
    kicker: 'Goals before code',
    title: 'Discovery & Strategy',
    text: 'We start with your goals, not a template. Whether it\u2019s WordPress development, a WooCommerce or Shopify store, a redesign or a migration \u2014 we map the pages, features and timeline first, and you get honest advice on what will actually win you clients.',
    pos: 'md:top-0 md:left-[10%]',
    rotate: 'rotate-[7deg]',
  },
  {
    kicker: 'Pixel-perfect, always',
    title: 'Design & Build',
    text: 'Your Figma design becomes a hand-built site \u2014 a custom WordPress theme with Elementor Pro and ACF Pro, or a Shopify, Wix or GoHighLevel build. The design you approve is exactly what your visitors get, on every screen.',
    pos: 'md:top-[210px] md:right-[10%]',
    rotate: '-rotate-[7deg]',
  },
  {
    kicker: 'Speed is non-negotiable',
    title: 'Performance & Polish',
    text: 'Every build is tuned for PageSpeed and green Core Web Vitals, with on-page SEO and clean, secure code baked in \u2014 because a slow site quietly costs you the very clients you already won.',
    pos: 'md:top-[470px] md:left-[10%]',
    rotate: 'rotate-[7deg]',
  },
  {
    kicker: 'Launch is the start',
    title: 'Launch & Support',
    text: 'I handle the go-live and any migration, test everything twice, and stay on afterwards \u2014 updates, backups, tweaks and growth \u2014 so your site keeps working for you long after launch day.',
    pos: 'md:top-[690px] md:right-[9%]',
    rotate: '-rotate-[7deg]',
  },
];

export const HowIWork: React.FC = () => (
  <div className="gutter mt-28">
    <div className="text-center relative z-10">
      <h2 className="eyebrow m-0 mb-5" style={{ color: 'var(--color-accent)', fontSize: '13px' }} data-reveal>( Process )</h2>
      <div className="fvs-display uppercase m-0 leading-none" style={{ fontSize: 'clamp(46px, 6.5vw, 92px)' }} data-reveal>How I work</div>
      <p className="text-muted mt-6 mb-14 mx-auto" style={{ fontSize: '17px', lineHeight: 1.65, maxWidth: '54ch' }} data-reveal>
        A clear process, no surprises: you always know what happens next, what it costs and when it lands.
        Four steps from first call to a site that keeps working for you.
      </p>
    </div>

    <div className="relative" style={{ marginBottom: '100px' }}>
      {/* ruled-notebook lines, like the reference */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100% 32px', marginTop: '4px' }} />
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1/3 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--color-bg), transparent)' }} />
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/3 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--color-bg), transparent)' }} />

      <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col space-y-8 md:space-y-0 md:block md:h-[1150px]">
        {/* winding dashed path (desktop) */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 1200 1150" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="how-path-line"
            d="M 340 130 C 570 130, 650 300, 800 300 C 970 300, 550 430, 340 550 C 340 730, 630 870, 820 870"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {steps.map((s, i) => (
          <div
            key={s.title}
            className={`relative w-full md:w-[290px] md:absolute transition-transform duration-300 hover:z-30 hover:scale-105 ${s.pos} ${s.rotate}`}
            data-reveal
          >
            <div style={{ background: '#1a1919', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '25px', padding: '10px', boxShadow: '0 18px 36px -18px rgba(0,0,0,0.65)' }}>
              <Pin />
              <div style={{ background: 'rgba(255,198,26,0.055)', border: '1px solid rgba(255,198,26,0.22)', borderRadius: '15px', padding: '18px' }}>
                <span className="font-hand" style={{ color: 'var(--color-accent)', fontSize: '40px', lineHeight: 1, display: 'block', marginBottom: '14px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="font-mono uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.12em', color: 'var(--color-accent)', opacity: 0.9 }}>
                  {s.kicker}
                </div>
                <h3 className="m-0 mt-2" style={{ fontSize: '23px', fontWeight: 600, lineHeight: 1.1, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p className="text-muted mt-2.5 mb-0" style={{ fontSize: '14px', lineHeight: 1.55 }}>{s.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
