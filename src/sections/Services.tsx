import React from 'react';

const tiles = [
  {
    num: '01',
    title: 'Websites',
    description: 'Custom WordPress sites and portfolios, built from scratch in PHP — no bloat, pixel-perfect from Figma, with motion baked in.',
  },
  {
    num: '02',
    title: 'WooCommerce',
    description: 'Stores built around your products — custom product pages, Stripe & PayPal checkout, subscriptions and flows that convert.',
  },
  {
    num: '03',
    title: 'Elementor & ACF',
    description: 'Elementor Pro and ACF Pro builds your team can actually edit — clean fields, custom post types, no locked-in mess.',
  },
  {
    num: '04',
    title: 'Speed & SEO',
    description: 'Core Web Vitals in the green — caching, clean databases, WebP images, schema and on-page SEO with Yoast & RankMath.',
  },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="gutter" style={{ paddingBottom: 'clamp(70px, 12vh, 130px)' }}>
      <div className="flex items-baseline justify-between mb-8" data-reveal>
        <h2 className="eyebrow m-0" style={{ color: 'var(--color-text)', fontSize: '13px' }}>What I do</h2>
        <a href="#contact" className="eyebrow no-underline hover:text-accent transition-colors" data-hover>Start a project →</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {tiles.map((t) => (
          <a key={t.num} href="#contact" className="tile" data-reveal data-hover>
            <div className="tile__fill" />
            <div className="tile__content">
              <div className="flex items-start justify-between">
                <span className="eyebrow" style={{ color: 'inherit' }}>{t.num}</span>
                <span className="tile__arrow text-2xl leading-none">→</span>
              </div>
              <div>
                <div className="fvs-row" style={{ fontSize: 'clamp(30px, 2.6vw, 42px)', lineHeight: 0.95 }}>{t.title}</div>
                <p className="tile__desc mt-4 mb-0 text-[15px] leading-relaxed">{t.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
