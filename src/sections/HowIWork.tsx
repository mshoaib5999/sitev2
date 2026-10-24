import React from 'react';

/**
 * How I work — a process journey in the layout the user supplied
 * (alternating step cards along a winding centre line, each card with
 * STEP number, a small caps label, a big title, copy, and a faint
 * oversized icon in the corner), restyled to this site's branding
 * and written to win clients.
 */

const G = (paths: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
    {paths}
  </svg>
);

const steps = [
  {
    label: 'Goals before code',
    title: 'Discovery & Strategy',
    text: 'Every project starts with your business goals, not a template. We map who the site is for, what it must achieve and how success will be measured — before a single pixel is placed. You get honest advice on what will actually move the needle, even when the answer is “you don’t need that”.',
    icon: G(<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.6" /><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" /></>),
  },
  {
    label: 'Pixel-perfect, always',
    title: 'Design & Build',
    text: 'The design you approve is the site you get — built pixel-perfect in clean, hand-written code, not dragged together from bloated builders. No lost details and no “close enough”: what you signed off is exactly what your visitors see.',
    icon: G(<><path d="M8 6 L2.5 12 L8 18" /><path d="M16 6 L21.5 12 L16 18" /><path d="M13.5 4.5 L10.5 19.5" /></>),
  },
  {
    label: 'Speed is non-negotiable',
    title: 'Performance & Polish',
    text: 'Fast is a feature your customers can feel. Every build is tuned until Core Web Vitals are green and pages snap open on real phones, on real connections — because a slow site quietly costs you the very clients you already won.',
    icon: G(<><path d="M4 15 a8 8 0 1 1 16 0" /><path d="M12 15 L15.5 9.5" /><path d="M3 19 h18" /></>),
  },
  {
    label: 'Launch is the start',
    title: 'Launch & Support',
    text: 'Going live is the beginning, not the handover-and-goodbye. I launch, monitor and stay available — fixes, tweaks and growth included — so your site keeps winning work long after launch day. Most of my clients come back for their next project; that is the standard I work to.',
    icon: G(<><circle cx="12" cy="12" r="8.5" /><path d="M12 16.5 V8" /><path d="M7.8 11.8 L12 7.6 L16.2 11.8" /></>),
  },
];

export const HowIWork: React.FC = () => (
  <div className="gutter mt-28">
    <div className="text-center">
      <h2 className="eyebrow m-0 mb-5" style={{ color: 'var(--color-accent)', fontSize: '13px' }} data-reveal>( Process )</h2>
      <div className="fvs-display uppercase m-0 leading-none" style={{ fontSize: 'clamp(46px, 6.5vw, 92px)' }} data-reveal>How I work</div>
      <p className="text-muted mt-6 mb-14 mx-auto" style={{ fontSize: '17px', lineHeight: 1.65, maxWidth: '54ch' }} data-reveal>
        A clear process, no surprises: you always know what happens next, what it costs and when it lands.
        Four steps from first call to a site that keeps working for you.
      </p>
    </div>

    <div className="process-journey">
      {/* Winding centre line (desktop) */}
      <svg className="process-line" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
        <path d="M50,0 C85,140 15,300 50,470 C85,640 15,800 50,1000" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>

      {steps.map((s, i) => (
        <div key={s.title} className={`process-row ${i % 2 === 1 ? 'is-right' : ''}`}>
          <span className="process-dot" aria-hidden="true" />
          <article className="process-card" data-reveal data-hover>
            <div className="process-card__icon" aria-hidden="true">{s.icon}</div>
            <div className="relative">
              <div className="font-mono uppercase" style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'var(--color-faint)' }}>
                Step {String(i + 1).padStart(2, '0')}
              </div>
              <div className="font-mono uppercase mt-1.5" style={{ fontSize: '11px', letterSpacing: '0.09em', color: 'var(--color-accent)', opacity: 0.85 }}>
                {s.label}
              </div>
              <h3 className="fvs-row m-0 mt-3" style={{ fontSize: 'clamp(25px, 2.2vw, 34px)', lineHeight: 1.05 }}>{s.title}</h3>
              <p className="text-muted mt-3.5 mb-0" style={{ fontSize: '15.5px', lineHeight: 1.65 }}>{s.text}</p>
            </div>
          </article>
        </div>
      ))}
    </div>
  </div>
);
