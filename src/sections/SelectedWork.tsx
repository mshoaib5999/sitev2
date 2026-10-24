import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { selectedProjects } from '../data/projects';

/**
 * The project's poster (desktop + mobile mockup). Static on purpose:
 * no scrolling website, no iframe — just the poster, instantly visible.
 */
const PosterImg: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="absolute inset-0 overflow-hidden">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="absolute inset-0 h-full w-full"
      style={{ objectFit: 'cover' }}
      draggable={false}
    />
  </div>
);

type Zone = 'list' | 'stage' | null;

export const SelectedWork: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [zone, setZone] = useState<Zone>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: -600, y: -600 });
  const navigate = useNavigate();

  // Auto-cycle while the visitor isn't interacting.
  useEffect(() => {
    if (paused || zone !== null) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % selectedProjects.length);
    }, 3600);
    return () => window.clearInterval(id);
  }, [paused, zone]);

  // Floating preview that trails the cursor over the list, with a slight tilt.
  useEffect(() => {
    const el = floatRef.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf = 0;
    let x = -600, y = -600, rot = 0, vis = 0;
    const loop = () => {
      const target = el.dataset.show === '1' ? 1 : 0;
      vis += (target - vis) * 0.12;
      const tx = pointer.current.x + 34;
      const ty = pointer.current.y - 190;
      const vx = (tx - x) * 0.16;
      x += vx;
      y += (ty - y) * 0.16;
      rot += (Math.max(-8, Math.min(8, vx * 0.55)) - rot) * 0.1;
      el.style.opacity = vis.toFixed(3);
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${(0.92 + vis * 0.08).toFixed(3)})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerMove = (e: React.PointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY };
  };

  const current = selectedProjects[active];
  const stageShowsImage = zone !== 'list'; // idle or docked in the stage box

  const stageLayers = (alwaysOn: boolean) =>
    selectedProjects.map((p, i) => (
      <div
        key={p.id}
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: i === active && (alwaysOn || stageShowsImage) ? 1 : 0 }}
        aria-hidden={i !== active}
      >
        <PosterImg src={p.poster} alt={`${p.name} — project poster`} />
      </div>
    ));


  const bigNumber = (size: string) => (
    <span
      aria-hidden="true"
      className="fvs-display"
      style={{
        position: 'absolute', inset: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size, lineHeight: 1, color: 'rgba(237,234,228,0.13)', pointerEvents: 'none',
      }}
    >
      {String(active + 1).padStart(2, '0')}
    </span>
  );

  return (
    <section
      id="work"
      className="gutter relative"
      style={{ paddingTop: 'clamp(80px, 14vh, 150px)', paddingBottom: 'clamp(60px, 10vh, 110px)' }}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setZone(null)}
    >
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

      {/* Mobile / tablet stage — shows the current project's poster */}
      <div className="lg:hidden mb-10" data-reveal>
        <div className="work-stage" style={{ aspectRatio: '1111 / 1400' }} data-cursor="View" onClick={() => navigate(`/work/${current.id}`)}>
          {stageLayers(true)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(340px,440px)] gap-10 items-start">
        {/* List */}
        <div data-zone="list" onPointerEnter={() => setZone('list')}>
          {selectedProjects.map((p, i) => (
            <div key={p.id} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <Link
                to={`/work/${p.id}`}
                className={`work-row ${i === active ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-hover
                data-cursor="View"
              >
                <span className="work-row__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="work-row__name fvs-row">{p.name}</span>
                <span className="work-row__year">{p.year}</span>
                <span className="work-row__meta">
                  <span>{p.service}</span>
                  <span style={{ color: 'var(--color-accent)' }}>{p.place}</span>
                  <span className="work-row__cta">View project →</span>
                </span>
              </Link>
            </div>
          ))}
          <p className="eyebrow mt-8" data-reveal>
            (Move over a project — its poster follows you. Click — the case study opens.)
          </p>
        </div>

        {/* Desktop stage — an outlined box; the screenshot docks here */}
        <div className="hidden lg:block lg:sticky lg:top-28" data-reveal>
          <div
            data-zone="stage"
            onPointerEnter={() => setZone('stage')}
            className="work-stage"
            style={{ background: 'rgba(237,234,228,0.02)', border: '1px solid var(--color-hairline)', cursor: 'pointer' }}
            data-cursor="View"
            onClick={() => navigate(`/work/${current.id}`)}
            role="link"
            aria-label={`Open the ${current.name} case study`}
          >
            {bigNumber('clamp(120px, 11vw, 180px)')}
            {stageLayers(false)}
          </div>
            <div className="flex items-center gap-5 mt-5">
            <span className="eyebrow" style={{ color: 'var(--color-text)' }}>
              ( {String(active + 1).padStart(2, '0')} / {String(selectedProjects.length).padStart(2, '0')} )
            </span>
            <div className="flex flex-1 gap-2" role="tablist" aria-label="Choose project">
              {selectedProjects.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show ${p.name}`}
                  className="group flex-1 bg-transparent border-0 p-0 py-2 cursor-pointer"
                  onClick={() => setActive(i)}
                  data-hover
                >
                  <span
                    className="block h-[3px] w-full transition-colors duration-300"
                    style={{ background: i <= active ? 'var(--color-accent)' : 'rgba(237,234,228,0.18)' }}
                  />
                </button>
              ))}
            </div>
            <span className="eyebrow hidden sm:block">{current.name}</span>
          </div>
        </div>
      </div>

      {/* Floating preview — follows the cursor over the list (desktop) */}
      <div
        ref={floatRef}
        data-show={zone === 'list' ? '1' : '0'}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 hidden lg:block overflow-hidden"
        style={{
          width: '320px', aspectRatio: '4 / 5', borderRadius: 'var(--radius-image)',
          zIndex: 60, opacity: 0, background: 'var(--color-surface)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.45)',
        }}
      >
        {selectedProjects.map((p, i) => (
          <div key={p.id} className="absolute inset-0 transition-opacity duration-300" style={{ opacity: i === active ? 1 : 0 }}>
            <PosterImg src={p.poster} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
};
