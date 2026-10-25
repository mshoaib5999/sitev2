import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { BorderBeam } from '../components/ui/border-beam';

export const Services: React.FC = () => {
  return (
    <section id="services" className="gutter" style={{ paddingBottom: 'clamp(70px, 12vh, 130px)' }}>
      <div className="flex items-baseline justify-between mb-8" data-reveal>
        <h2 className="eyebrow m-0" style={{ color: 'var(--color-text)', fontSize: '13px' }}>What I do</h2>
        <Link to="/services" className="eyebrow no-underline hover:text-accent transition-colors" data-hover>All services →</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {services.map((t, i) => (
          <BorderBeam key={t.slug} color="var(--color-accent)" thickness={1.5} speed={7} length={12} delay={-i * 0.85} className="rounded-[12px] h-full" data-reveal>
          <Link to={`/services/${t.slug}`} className="tile h-full" data-hover data-cursor="Open">
            <div className="tile__fill" />
            <div className="tile__content">
              <div className="flex items-start justify-between">
                <span className="eyebrow" style={{ color: 'inherit' }}>{t.num}</span>
                <span className="tile__arrow text-2xl leading-none">→</span>
              </div>
              <div>
                <div className="fvs-row" style={{ fontSize: 'clamp(29px, 2.5vw, 40px)', lineHeight: 0.95 }}>{t.title}</div>
                <p className="tile__desc mt-4 mb-0 text-[15px] leading-relaxed">{t.short}</p>
              </div>
            </div>
          </Link>
          </BorderBeam>
        ))}
      </div>
    </section>
  );
};
