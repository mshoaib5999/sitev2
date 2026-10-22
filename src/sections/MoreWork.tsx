import React from 'react';
import { Link } from 'react-router-dom';
import { moreProjects, experience } from '../data/projects';

export const MoreWork: React.FC = () => {
  return (
    <section className="gutter" style={{ paddingBottom: 'clamp(70px, 12vh, 130px)' }}>
      <div className="flex items-baseline justify-between mb-4" data-reveal>
        <h2 className="eyebrow m-0" style={{ color: 'var(--color-text)', fontSize: '13px' }}>
          More work <span style={{ color: 'var(--color-accent)' }}>(08)</span>
        </h2>
        <span className="eyebrow">From 400+ delivered</span>
      </div>
      <div>
        {moreProjects.map((p) => (
          <Link key={p.name} to={`/work/${p.slug}`} className="index-row" data-reveal data-hover data-cursor="View">
            <span className="index-row__name fvs-row">{p.name}</span>
            <span className="eyebrow">{p.category}</span>
            <span className="eyebrow">{p.place}</span>
            <span className="justify-self-end text-accent">→</span>
          </Link>
        ))}
      </div>

      <div className="flex items-baseline justify-between mb-4 mt-24" data-reveal>
        <h2 className="eyebrow m-0" style={{ color: 'var(--color-text)', fontSize: '13px' }}>Career</h2>
        <span className="eyebrow">2022 — Present</span>
      </div>
      <div>
        {experience.map((e) => (
          <div key={e.role + e.company} className="index-row" data-reveal>
            <span className="index-row__name fvs-row">{e.role}</span>
            <span className="eyebrow">{e.company} — {e.place}</span>
            <span className="eyebrow">{e.period}</span>
            <span />
          </div>
        ))}
        <div className="index-row" data-reveal>
          <span className="index-row__name fvs-row">BS Computer Science</span>
          <span className="eyebrow">University of Central Punjab — Lahore</span>
          <span className="eyebrow">2018 — 2022</span>
          <span />
        </div>
      </div>
    </section>
  );
};
