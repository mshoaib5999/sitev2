import React, { useEffect, useRef, useState } from 'react';
import { selectedProjects } from '../data/projects';

export const SelectedWork: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused || hovering) return;
    timerRef.current = window.setInterval(() => {
      setActive((a) => (a + 1) % selectedProjects.length);
    }, 3600);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [paused, hovering]);

  const current = selectedProjects[active];

  return (
    <section id="work" className="gutter" style={{ paddingTop: 'clamp(80px, 14vh, 150px)', paddingBottom: 'clamp(60px, 10vh, 110px)' }}>
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8" data-reveal>
        <h2 className="eyebrow m-0" style={{ color: 'var(--color-text)', fontSize: '13px' }}>
          Selected work <span style={{ color: 'var(--color-accent)' }}>(04)</span>
        </h2>
        <span className="flex items-center gap-6">
          <button
            onClick={() => setPaused(!paused)}
            className="eyebrow bg-transparent border-0 cursor-pointer p-0 hover:text-accent transition-colors"
            data-hover
          >
            ({paused ? 'Play motion' : 'Pause motion'})
          </button>
          <span className="eyebrow">2022 — 2026</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(340px,460px)] gap-10 items-start">
        {/* List */}
        <div onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
          {selectedProjects.map((p, i) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`work-row ${i === active ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              data-reveal
              data-hover
            >
              <span className="work-row__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="work-row__name fvs-row">{p.name}</span>
              <span className="work-row__year">{p.year}</span>
              <span className="work-row__meta">
                <span>{p.service}</span>
                <span style={{ color: 'var(--color-accent)' }}>{p.place}</span>
                <span className="work-row__cta">View project →</span>
              </span>
            </a>
          ))}
          <p className="eyebrow mt-8" data-reveal>
            (Hover a project — the picture follows. Click — the live site opens.)
          </p>
        </div>

        {/* Stage */}
        <div className="lg:sticky lg:top-28" data-reveal>
          <div className="work-stage">
            {selectedProjects.map((p, i) => (
              <img
                key={p.id}
                src={p.image}
                alt={`${p.name} — website by Muhammad Shoaib Asghar`}
                className={`work-stage__img ${i === active ? 'is-active' : ''}`}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}
            <div className="work-stage__bar">
              <span>{String(active + 1).padStart(2, '0')} / {current.place}</span>
              <a href={current.url} target="_blank" rel="noopener noreferrer" className="text-ink no-underline hover:text-accent transition-colors" data-hover>
                Visit live site ↗
              </a>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              {selectedProjects.map((p, i) => (
                <button
                  key={p.id}
                  aria-label={`Show ${p.name}`}
                  className={`work-dot ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                  data-hover
                />
              ))}
            </div>
            <span className="eyebrow">( {String(active + 1).padStart(2, '0')} — {current.name} )</span>
          </div>
          <p className="text-muted leading-relaxed mt-5 text-[15px]">{current.description}</p>
        </div>
      </div>
    </section>
  );
};
