import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { allProjects } from '../data/details';
import { posterBySlug } from '../data/posters';

interface Shot { src: string; type: string; name: string; projectNum: string; slug: string; }

// Every project's poster, one card each — clicking a card opens that
// project's case study. Projects without a poster use their own image.
const shots: Shot[] = allProjects.map((p, i) => ({
  src: posterBySlug[p.slug] ?? p.image,
  type: posterBySlug[p.slug] ? 'Poster' : 'Image',
  name: p.name,
  projectNum: String(i + 1).padStart(2, '0'),
  slug: p.slug,
}));

/**
 * Like the reference: a normal section (no pinning) whose card row travels
 * horizontally as the page scrolls past it — down scroll moves the row left,
 * up scroll reverses it — and the row can also be dragged. Section padding
 * matches the reference: clamp(60px, 10vh, 120px) 0.
 */
export const UpClose: React.FC = () => {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ down: false, startX: 0, startOffset: 0, moved: 0 });
  const dragOffset = useRef(0);
  const suppressClick = useRef(false);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const outer = outerRef.current;
      const track = trackRef.current;
      if (outer && track) {
        const rect = outer.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = vh + rect.height;
        const p = Math.min(1, Math.max(0, (vh - rect.top) / total));
        const travel = Math.max(0, track.scrollWidth - window.innerWidth);
        const x = Math.max(-travel, Math.min(0, -p * travel + dragOffset.current));
        track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragState.current = { down: true, startX: e.clientX, startOffset: dragOffset.current, moved: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragState.current;
    if (!d.down) return;
    const dx = e.clientX - d.startX;
    d.moved = Math.max(d.moved, Math.abs(dx));
    dragOffset.current = d.startOffset + dx;
  };
  const onPointerUp = () => {
    if (dragState.current.moved > 6) {
      suppressClick.current = true;
      setTimeout(() => { suppressClick.current = false; }, 50);
    }
    dragState.current.down = false;
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClick.current) {
      e.preventDefault();
      e.stopPropagation();
      suppressClick.current = false;
    }
  };

  return (
    <section ref={outerRef} className="relative overflow-hidden" style={{ padding: 'clamp(60px, 10vh, 120px) 0' }}>
      <div data-cursor="Look">
        <div className="gutter flex items-baseline justify-between mb-8 w-full">
          <h2 className="eyebrow m-0" style={{ color: 'var(--color-text)', fontSize: '13px' }}>(Up close)</h2>
          <span className="eyebrow">Drag or scroll</span>
        </div>
        <div
          ref={trackRef}
          className="flex gap-5"
          style={{ width: 'max-content', willChange: 'transform', touchAction: 'pan-y', cursor: 'grab' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
        >
          {shots.map((s) => (
            <Link key={s.slug} to={`/work/${s.slug}`} className="flex-none m-0 block no-underline" style={{ width: 'min(400px, 78vw)' }} data-hover>
              <div className="overflow-hidden bg-surface" style={{ aspectRatio: '4 / 5', borderRadius: 'var(--radius-image)' }}>
                <img src={s.src} alt={`${s.name} — ${s.type}`} className="w-full h-full object-cover" loading="lazy" draggable={false} />
              </div>
              <div className="flex items-baseline justify-between mt-3 px-1">
                <span className="eyebrow">({s.projectNum}) {s.name}</span>
                <span className="eyebrow" style={{ color: 'var(--color-faint)' }}>{s.type}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
