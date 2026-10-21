import React from 'react';

const marqueeWords = ['Design', 'Build', 'Motion', 'WordPress', 'WooCommerce', 'Elementor', 'Speed'];

export const Hero: React.FC = () => {
  return (
    <section id="top" className="gutter flex flex-col justify-between" style={{ minHeight: '100svh', paddingTop: '104px' }}>
      <div className="eyebrow flex items-start justify-between" data-reveal>
        <span>(Portfolio / ©2026)</span>
        <span className="hidden md:inline" style={{ color: 'var(--color-accent)' }}>Senior WordPress Developer</span>
        <span>Okara, Pakistan</span>
      </div>

      <h1 className="hero__name fvs-display" aria-label="Shoaib Asghar">
        <span className="hero__line"><span>Shoaib</span></span>
        <span className="hero__line hero__line--second"><span>Asghar</span></span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-7 pb-10">
        <p className="m-0 max-w-[36ch] text-[clamp(18px,1.6vw,22px)] leading-[1.42]" data-reveal>
          I design and build WordPress websites and WooCommerce stores with a lot of movement
          in them. Businesses, agencies and brands worldwide, mostly.
        </p>
        <span className="eyebrow md:justify-self-center" data-reveal>↓ Scroll, gently</span>
        <div className="md:justify-self-end" data-reveal>
          <a
            href="#work"
            className="inline-block rounded-full bg-ink px-7 py-3.5 text-[15px] font-medium text-[#111010] no-underline transition-colors hover:bg-accent"
            data-hover
          >
            See the work →
          </a>
        </div>
      </div>
    </section>
  );
};

export const Marquee: React.FC = () => {
  const copy = (ariaHidden: boolean) => (
    <div className="marquee__copy fvs-italic" aria-hidden={ariaHidden || undefined}>
      {marqueeWords.map((w) => (
        <React.Fragment key={w}>
          <span>{w}</span>
          <span className="marquee__diamond" aria-hidden="true" />
        </React.Fragment>
      ))}
    </div>
  );
  return (
    <div className="marquee" aria-label={marqueeWords.join(', ')}>
      <div className="marquee__track">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
};
