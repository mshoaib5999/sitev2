import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { selectedProjects } from '../data/projects';

/**
 * A tall website screenshot inside a shorter frame, slowly panning
 * top → bottom → top, like a page being scrolled for you.
 */
const PanImage: React.FC<{ src: string; alt: string; active: boolean; eager?: boolean }> = ({ src, alt, active, eager }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now() + Math.random() * 600;
    const loop = (now: number) => {
      const wrap = wrapRef.current;
      const img = imgRef.current;
      if (wrap && img && img.naturalHeight > 0) {
        const overflow = img.offsetHeight - wrap.offsetHeight;
        if (overflow > 4) {
          img.style.objectFit = 'fill';
          const cycle = 13000;
          const p = ((now - start) % cycle) / cycle;
          const tri = p < 0.5 ? p * 2 : 2 - p * 2;
          const eased = tri * tri * (3 - 2 * tri);
          img.style.transform = `translate3d(0, ${(-overflow * eased).toFixed(1)}px, 0)`;
        } else {
          img.style.objectFit = 'cover';
          img.style.transform = 'none';
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, src]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        className="absolute left-0 top-0 w-full"
        style={{ height: 'auto', minHeight: '100%', willChange: 'transform' }}
        draggable={false}
      />
    </div>
  );
};

/**
 * The project's REAL website, live in a frame, auto-scrolling
 * top → bottom → top. Scaled down from desktop width (1100px).
 */
const LivePreview: React.FC<{ url: string; pageHeight: number; title: string }> = ({ url, pageHeight, title }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now() + 400;
    const loop = (now: number) => {
      const f = frameRef.current;
      const inn = innerRef.current;
      if (f && inn) {
        const s = f.clientWidth / 1100;
        const visibleH = f.clientHeight / s;
        const overflow = Math.max(0, pageHeight - visibleH);
        const cycle = 17000;
        const p = ((now - start) % cycle) / cycle;
        const tri = p < 0.5 ? p * 2 : 2 - p * 2;
        const eased = tri * tri * (3 - 2 * tri);
        inn.style.transform = `scale(${s}) translateY(${(-overflow * eased).toFixed(1)}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pageHeight]);

  return (
    <div ref={frameRef} className="absolute inset-0 overflow-hidden" style={{ background: '#f7f5f0', pointerEvents: 'none' }} aria-hidden="true">
      <div
        ref={innerRef}
        style={{ width: 1100, height: pageHeight, transformOrigin: '0 0', opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease' }}
      >
        <iframe
          title={`${title} — live website preview`}
          src={url}
          width={1100}
          height={pageHeight}
          loading="lazy"
          tabIndex={-1}
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin"
          style={{ border: 0, display: 'block', pointerEvents: 'none', background: '#f7f5f0' }}
        />
      </div>
    </div>
  );
};

type Zone = 'list' | 'stage' | null;

export const SelectedWork: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [zone, setZone] = useState<Zone>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: -600, y: -600 });
  const navigate = useNavigate();

  // Live website frames only load once the section is actually on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) setInView(true); },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

  const stageLayers = (alwaysOn: boolean, live: boolean) =>
    selectedProjects.map((p, i) => (
      <div
        key={p.id}
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: i === active && (alwaysOn || stageShowsImage) ? 1 : 0 }}
        aria-hidden={i !== active}
      >
        <PanImage src={p.pan} alt={`${p.name} — website preview`} active={i === active && (alwaysOn || stageShowsImage)} eager={i === 0} />
        {p.embed && live && i === active && (
          <LivePreview url={p.url} pageHeight={p.liveHeight} title={p.name} />
        )}
      </div>
    ));

  const stageBar = (
    <div className="work-stage__bar" style={{ zIndex: 3 }}>
      <span>{String(active + 1).padStart(2, '0')} / {current.place}</span>
      <a href={current.url} target="_blank" rel="noopener noreferrer" className="text-ink no-underline hover:text-accent transition-colors" data-hover onClick={(e) => e.stopPropagation()}>
        Visit live site ↗
      </a>
    </div>
  );

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
      ref={sectionRef}
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

      {/* Mobile / tablet stage — always shows the panning screenshot */}
      <div className="lg:hidden mb-10" data-reveal>
        <div className="work-stage" style={{ aspectRatio: '16 / 10' }} data-cursor="View" onClick={() => navigate(`/work/${current.id}`)}>
          {stageLayers(true, inView)}
          {stageBar}
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
            (Move over a project — its website follows you, scrolling. Click — the case study opens.)
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
            {stageLayers(false, zone === 'stage')}
            {stageBar}
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
          <p className="text-muted leading-relaxed mt-5 text-[15px]">{current.description}</p>
        </div>
      </div>

      {/* Floating preview — follows the cursor over the list (desktop) */}
      <div
        ref={floatRef}
        data-show={zone === 'list' ? '1' : '0'}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 hidden lg:block overflow-hidden"
        style={{
          width: '300px', aspectRatio: '3 / 4', borderRadius: 'var(--radius-image)',
          zIndex: 60, opacity: 0, background: 'var(--color-surface)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.45)',
        }}
      >
        {selectedProjects.map((p, i) => (
          <div key={p.id} className="absolute inset-0 transition-opacity duration-300" style={{ opacity: i === active ? 1 : 0 }}>
            <PanImage src={p.pan} alt="" active={zone === 'list' && i === active} />
            {p.embed && zone === 'list' && i === active && (
              <LivePreview url={p.url} pageHeight={p.liveHeight} title={p.name} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
