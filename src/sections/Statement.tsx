import React from 'react';

export const Statement: React.FC = () => {
  return (
    <section id="about" className="gutter" style={{ paddingTop: 'clamp(40px, 8vh, 90px)', paddingBottom: 'clamp(70px, 12vh, 130px)' }}>
      <div className="eyebrow eyebrow--accent mb-8" data-reveal>(Hello)</div>
      <p
        className="m-0 max-w-[26em] font-medium"
        style={{ fontSize: 'clamp(27px, 3.3vw, 52px)', lineHeight: 1.22, letterSpacing: '-0.01em' }}
        data-reveal
      >
        I’m Shoaib{' '}
        <img
          src="/shoaib_profile.jpg"
          alt="Muhammad Shoaib Asghar"
          className="inline-block object-cover align-[-0.12em] mx-1"
          style={{ width: '1.7em', height: '1.15em' }}
        />{' '}
        . I build WordPress websites and WooCommerce stores that{' '}
        <em className="fvs-italic" style={{ color: 'var(--color-accent)' }}>load fast</em>,{' '}
        <em className="fvs-italic" style={{ color: 'var(--color-accent)' }}>rank well</em> and
        feel good to use. Designed in Figma, built with clean code, made in Pakistan —
        for clients in France, California, Canada, Dubai and beyond.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8" style={{ borderTop: '1px solid var(--color-hairline)' }} data-reveal>
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
