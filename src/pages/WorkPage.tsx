import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { allProjects } from '../data/details';
import { KineticText, useKinetic } from '../sections/Kinetic';

import { posterFor as previewFor } from '../data/posters';
import { Industries } from '../sections/Industries';

export const WorkPage: React.FC = () => {
  const titleRef = useKinetic<HTMLHeadingElement>();
  const [hovered, setHovered] = useState<number | null>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: -600, y: -600 });
  const hoveredRef = useRef<number | null>(null);
  hoveredRef.current = hovered;

  // The poster must only live over the rows: clear the hover as soon as
  // scrolling moves the list out from under the pointer (the page-level
  // pointerleave alone left it stuck over the Industries section).
  useEffect(() => {
    const onScroll = () => {
      if (hoveredRef.current === null) return;
      const wrap = rowsRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      if (pointer.current.y < r.top || pointer.current.y > r.bottom) setHovered(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Floating preview that trails the cursor over the rows, like the
  // reference work page: poster (or project image) with a slight tilt.
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
      const ty = pointer.current.y - 120;
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

  return (
  <div
    className="gutter"
    style={{ paddingTop: 'var(--page-top)', paddingBottom: '40px' }}
    onPointerMove={(e) => { pointer.current = { x: e.clientX, y: e.clientY }; }}
    onPointerLeave={() => setHovered(null)}
  >
    <div className="flex flex-wrap items-end justify-between gap-6 mb-4">
      <h1 ref={titleRef} className="page-huge fvs-display" data-reveal>
        <KineticText text="Work" />{' '}
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

    <div ref={rowsRef} onMouseLeave={() => setHovered(null)}>
      {allProjects.map((p, i) => (
        <div key={p.slug} data-reveal style={{ transitionDelay: `${Math.min(i, 5) * 60}ms` }}>
          <Link
            to={`/work/${p.slug}`}
            className="work-index-row"
            data-hover
            data-cursor="View"
            onMouseEnter={() => setHovered(i)}
            onFocus={() => setHovered(i)}
          >
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

    <Industries />

    {/* Floating preview — follows the cursor over the rows (desktop) */}
    <div
      ref={floatRef}
      data-show={hovered !== null ? '1' : '0'}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 hidden lg:block overflow-hidden"
      style={{
        width: '300px', aspectRatio: '3 / 4', borderRadius: 'var(--radius-image)',
        zIndex: 60, opacity: 0, background: 'var(--color-surface)',
        boxShadow: '0 30px 60px rgba(0,0,0,0.45)',
      }}
    >
      {allProjects.map((p, i) => (
        <div key={p.slug} className="absolute inset-0 transition-opacity duration-300" style={{ opacity: i === hovered ? 1 : 0 }}>
          <img
            src={previewFor(p.slug, p.image)}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full"
            style={{ objectFit: 'cover' }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  </div>
  );
};
