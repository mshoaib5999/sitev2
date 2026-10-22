import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getService, nextService } from '../data/services';
import { allProjects } from '../data/details';
import { FaqList, NextBlock } from './shared';

const relatedSlugs: Record<string, string[]> = {
  websites: ['bastide-de-basson', 'phaselink'],
  woocommerce: ['goldstar-learning', 'lumora-nutrition'],
  'elementor-acf': ['creative-contracting', 'aion-dubai'],
  'speed-seo': ['rossai', 'sole-survivors'],
};

export const ServicePage: React.FC = () => {
  const { slug = '' } = useParams();
  const service = getService(slug);

  if (!service) {
    return (
      <div className="gutter" style={{ paddingTop: 'var(--page-top)', paddingBottom: '120px' }}>
        <h1 className="case-title fvs-display">Not found</h1>
        <p className="text-muted mt-6">That service is not here. <Link to="/services" className="text-accent">See all services →</Link></p>
      </div>
    );
  }

  const next = nextService(service.slug);
  const related = (relatedSlugs[service.slug] || []).map((s) => allProjects.find((p) => p.slug === s)).filter(Boolean);

  return (
    <article>
      <div className="gutter" style={{ paddingTop: 'var(--page-top)' }}>
        <Link to="/services" className="eyebrow no-underline hover:text-accent transition-colors" data-hover>← All services</Link>
        <h1 className="case-title fvs-display mt-8" data-reveal>{service.title}</h1>
        <p className="m-0 font-medium mt-8" style={{ fontSize: 'clamp(24px, 3vw, 44px)', lineHeight: 1.15, maxWidth: '22em' }} data-reveal>
          {service.tagline}
        </p>
        <p className="text-muted mt-7 mb-0" style={{ fontSize: '17.5px', lineHeight: 1.65, maxWidth: '58ch' }} data-reveal>
          {service.intro}
        </p>
      </div>

      <div className="gutter grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 mt-24">
        <h2 className="eyebrow m-0" style={{ color: 'var(--color-accent)', fontSize: '13px' }} data-reveal>( What’s included )</h2>
        <ul className="list-none m-0 p-0">
          {service.includes.map((inc, i) => (
            <li
              key={inc}
              className="flex items-baseline gap-5 py-5"
              style={{ borderTop: '1px solid var(--color-hairline)' }}
              data-reveal
            >
              <span className="eyebrow" style={{ color: 'var(--color-accent)' }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: 'clamp(18px, 1.8vw, 24px)', fontWeight: 550 }}>{inc}</span>
            </li>
          ))}
        </ul>
      </div>

      {related.length > 0 && (
        <div className="gutter mt-24">
          <h2 className="eyebrow m-0 mb-8" style={{ color: 'var(--color-accent)', fontSize: '13px' }} data-reveal>( Recent examples )</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {related.map((p) => p && (
              <Link key={p.slug} to={`/work/${p.slug}`} className="block no-underline group" data-reveal data-hover data-cursor="View">
                <div className="overflow-hidden bg-surface" style={{ aspectRatio: '16 / 10', borderRadius: 'var(--radius-image)' }}>
                  <img src={p.image} alt={`${p.name} — ${service.title} by Shoaib Asghar`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                </div>
                <div className="flex items-baseline justify-between mt-3">
                  <span className="fvs-row" style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}>{p.name}</span>
                  <span className="eyebrow">{p.yearLabel}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="gutter grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 mt-28">
        <h2 className="eyebrow m-0" style={{ color: 'var(--color-accent)', fontSize: '13px' }} data-reveal>( Questions )</h2>
        <FaqList items={service.faqs} />
      </div>

      <div className="gutter mt-24">
        <Link to="/contact" className="chip-link" data-reveal data-hover>Start a project →</Link>
      </div>

      <NextBlock label="Next service →" name={next.title} to={`/services/${next.slug}`} />
    </article>
  );
};
