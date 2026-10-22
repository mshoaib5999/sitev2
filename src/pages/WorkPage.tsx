import React from 'react';
import { Link } from 'react-router-dom';
import { allProjects } from '../data/details';

export const WorkPage: React.FC = () => (
  <div className="gutter" style={{ paddingTop: 'var(--page-top)', paddingBottom: '40px' }}>
    <div className="flex flex-wrap items-end justify-between gap-6 mb-4">
      <h1 className="page-huge fvs-display" data-reveal>
        Work{' '}
        <sup className="font-mono normal-case" style={{ fontSize: '15px', color: 'var(--color-accent)', letterSpacing: '0.06em', verticalAlign: 'super' }}>
          ( {String(allProjects.length).padStart(2, '0')} )
        </sup>
      </h1>
      <p className="eyebrow pb-4" data-reveal>Selected + archive — from 400+ delivered</p>
    </div>

    <div
      className="hidden md:grid eyebrow"
      style={{ gridTemplateColumns: '48px minmax(0,1fr) minmax(0,0.5fr) minmax(0,0.5fr) 60px', gap: '20px', color: 'var(--color-faint)', fontSize: '11px', paddingBottom: '14px' }}
      aria-hidden="true"
    >
      <span>№</span><span>Project</span><span>What</span><span>Where / When</span><span />
    </div>

    <div>
      {allProjects.map((p, i) => (
        <div key={p.slug} data-reveal style={{ transitionDelay: `${Math.min(i, 5) * 60}ms` }}>
          <Link to={`/work/${p.slug}`} className="work-index-row" data-hover data-cursor="View">
            <span className="eyebrow pt-2">{String(i + 1).padStart(2, '0')}</span>
            <span className="work-index-row__name fvs-row">{p.name}</span>
            <span className="eyebrow hidden md:block">{p.service}</span>
            <span className="eyebrow hidden md:block">{p.place} — {p.yearLabel}</span>
            <span className="justify-self-end text-accent text-xl">→</span>
          </Link>
        </div>
      ))}
    </div>

    <p className="eyebrow mt-14" data-reveal>
      ( Plus several hundred more sites for agencies and clients worldwide —{' '}
      <Link to="/contact" className="text-accent no-underline" data-hover>ask me about yours</Link> )
    </p>
  </div>
);
