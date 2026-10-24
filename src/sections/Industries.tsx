import React from 'react';

/**
 * Industries grid for the Work page — the reference layout the user
 * supplied (icon tile + name + arrow in a hairline grid), redrawn in
 * this site's charcoal / cream / gold branding.
 */

const I = (paths: React.ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '25px', height: '25px' }}>
    {paths}
  </svg>
);

const industries: { name: string; icon: React.ReactNode }[] = [
  { name: 'Architecture', icon: I(<><path d="M12 4 L21 20 H3 Z" /><path d="M12 11 L16.2 20 H7.8 Z" /></>) },
  { name: 'Automotive', icon: I(<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="2.6" /><path d="M3.7 14.5 L9.6 13 M20.3 14.5 L14.4 13 M12 14.6 V20.3" /></>) },
  { name: 'Beauty', icon: I(<><path d="M11 4 L12.6 8.4 L17 10 L12.6 11.6 L11 16 L9.4 11.6 L5 10 L9.4 8.4 Z" /><path d="M18.5 15.5 L19.2 17.3 L21 18 L19.2 18.7 L18.5 20.5 L17.8 18.7 L16 18 L17.8 17.3 Z" /></>) },
  { name: 'Construction', icon: I(<><path d="M5 16.5 V13 a7 7 0 0 1 4-6.2 V16.5" /><path d="M19 16.5 V13 a7 7 0 0 0-4-6.2 V16.5" /><path d="M2.5 16.5 h19 v3 h-19 Z" /></>) },
  { name: 'Consulting', icon: I(<><rect x="3" y="8" width="18" height="11" rx="2" /><path d="M9 8 V6 a3 3 0 0 1 6 0 v2" /><path d="M3 13 h18" /></>) },
  { name: 'Creative agencies', icon: I(<><circle cx="12" cy="12" r="8.5" /><circle cx="9" cy="9.3" r="1.15" fill="currentColor" stroke="none" /><circle cx="15.2" cy="9.3" r="1.15" fill="currentColor" stroke="none" /><circle cx="8.6" cy="14.6" r="1.15" fill="currentColor" stroke="none" /></>) },
  { name: 'E-commerce', icon: I(<><path d="M5.5 8 h13 l-1 12.5 h-11 Z" /><path d="M9 10.5 V6.8 a3 3 0 0 1 6 0 v3.7" /></>) },
  { name: 'Education', icon: I(<><path d="M12 4.5 L22 9 L12 13.5 L2 9 Z" /><path d="M6.5 11.3 V16 c0 1.4 11 1.4 11 0 V11.3" /><path d="M22 9 v4.5" /></>) },
  { name: 'Fitness', icon: I(<><path d="M7 7.5 v9 M4 10 v4 M17 7.5 v9 M20 10 v4 M7 12 h10" /></>) },
  { name: 'Healthcare', icon: I(<><circle cx="12" cy="12" r="8.5" /><path d="M12 8.5 v7 M8.5 12 h7" /></>) },
  { name: 'Law firms', icon: I(<><path d="M12 3.5 V20 M7.5 20.5 h9" /><path d="M5.5 6.8 L2.5 13.5 H8.5 Z" /><path d="M2.8 13.5 a2.9 2.9 0 0 0 5.4 0" /><path d="M18.5 6.8 L15.5 13.5 H21.5 Z" /><path d="M15.8 13.5 a2.9 2.9 0 0 0 5.4 0" /><path d="M12 6 L5.5 6.8 M12 6 L18.5 6.8" /></>) },
  { name: 'Non-profits', icon: I(<><path d="M12 20 C7 16.5 3.5 13.4 3.5 9.6 A4.6 4.6 0 0 1 12 6.7 a4.6 4.6 0 0 1 8.5 2.9 c0 3.8-3.5 6.9-8.5 10.4 Z" /></>) },
  { name: 'Photography', icon: I(<><rect x="3" y="7.5" width="18" height="12" rx="2" /><circle cx="12" cy="13.5" r="3.4" /><path d="M8.5 7.5 L10 4.8 h4 L15.5 7.5" /></>) },
  { name: 'Real estate', icon: I(<><path d="M4.5 11 L12 4.5 L19.5 11" /><path d="M6.5 9.5 V19.5 h11 V9.5" /><path d="M10 19.5 v-5 h4 v5" /></>) },
  { name: 'Restaurants', icon: I(<><path d="M4 17 a8 8 0 0 1 16 0" /><path d="M2.5 20.5 h19" /><path d="M12 9 V7.4" /><circle cx="12" cy="5.8" r="1.1" /></>) },
  { name: 'Travel', icon: I(<><path d="M21 3 L10.8 13.2" /><path d="M21 3 L14.8 21 L10.8 13.2 L3 9.2 Z" /></>) },
];

export const Industries: React.FC = () => (
  <section className="gutter mt-28" aria-label="Industries">
    <div className="text-center" data-reveal>
      <div className="eyebrow eyebrow--accent mb-5">( Industries )</div>
      <h2 className="fvs-display m-0 leading-[1.02]" style={{ fontSize: 'clamp(34px, 4.6vw, 64px)' }}>
        Industries I design &amp; build for.
      </h2>
    </div>
    <div
      className="grid grid-cols-2 lg:grid-cols-4 mt-12 industry-grid"
      data-reveal
    >
      {industries.map((ind) => (
        <div key={ind.name} className="industry-cell" data-hover>
          <span className="industry-tile">{ind.icon}</span>
          <span className="fvs-row" style={{ fontSize: 'clamp(16px, 1.5vw, 20px)' }}>{ind.name}</span>
          <span className="industry-arrow" aria-hidden="true">↗</span>
        </div>
      ))}
    </div>
  </section>
);
