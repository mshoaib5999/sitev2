import React, { useEffect, useRef } from 'react';
import { KineticText, useKinetic } from './Kinetic';

const marqueeWords = ['Design', 'Build', 'Motion', 'WordPress', 'WooCommerce', 'Elementor', 'Speed'];

export const Hero: React.FC = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);

  // Gentle parallax: the name lags the scroll slightly, like the reference.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = nameRef.current;
        if (el) {
          const y = Math.min(window.scrollY, window.innerHeight);
          el.style.transform = `translateY(${y * 0.16}px)`;
          el.style.opacity = String(1 - Math.min(0.55, (y / window.innerHeight) * 0.55));
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const kineticRef = useKinetic<HTMLHeadingElement>({ settle: true });

  return (
    <section id="top" className="gutter flex flex-col justify-between" style={{ minHeight: '100svh', paddingTop: '104px' }}>
      <div className="eyebrow flex items-start justify-between" data-reveal>
        <span>(Portfolio / ©2026)</span>
        <span className="hidden md:inline" style={{ color: 'var(--color-accent)' }}>Senior WordPress Developer</span>
        <span>Trusted by businesses in 5+ countries</span>
      </div>

      <h1 ref={(el) => { (nameRef as any).current = el; (kineticRef as any).current = el; }} className="hero__name fvs-display" aria-label="Shoaib Asghar" style={{ willChange: 'transform, opacity' }}>
        <span className="hero__line"><span><KineticText text="SHOAIB" slim /></span></span>
        <span className="hero__line hero__line--second"><span><KineticText text="ASGHAR" slim /></span></span>
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
            className="inline-block rounded-full border px-7 py-[18px] font-mono text-[12px] uppercase tracking-[0.06em] text-ink no-underline transition-colors hover:bg-accent hover:text-[#111010] hover:border-transparent"
            style={{ borderColor: 'var(--color-chip-border)' }}
            data-hover
            data-cursor="Look"
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
