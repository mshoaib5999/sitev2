import React, { useRef } from 'react';
import { selectedProjects } from '../data/projects';

interface Shot { src: string; type: string; name: string; projectNum: string; }

const shots: Shot[] = selectedProjects.flatMap((p, i) => [
  { src: p.image, type: 'Wide', name: p.name, projectNum: String(i + 1).padStart(2, '0') },
  { src: p.detailImage, type: 'Detail', name: p.name, projectNum: String(i + 1).padStart(2, '0') },
]);

export const UpClose: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ down: boolean; startX: number; scrollLeft: number }>({ down: false, startX: 0, scrollLeft: 0 });

  const onDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, scrollLeft: el.scrollLeft };
    el.classList.add('is-dragging');
  };
  const onMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.scrollLeft - (e.clientX - drag.current.startX);
  };
  const onUp = () => {
    drag.current.down = false;
    trackRef.current?.classList.remove('is-dragging');
  };

  return (
    <section className="gutter" style={{ paddingBottom: 'clamp(70px, 12vh, 130px)' }}>
      <div className="flex items-baseline justify-between mb-8" data-reveal>
        <h2 className="eyebrow m-0" style={{ color: 'var(--color-text)', fontSize: '13px' }}>(Up close)</h2>
        <span className="eyebrow">Drag or scroll</span>
      </div>
      <div
        ref={trackRef}
        className="upclose flex gap-5 pb-2 -mx-[var(--gutter)] px-[var(--gutter)]"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        data-reveal
        data-cursor="Look"
      >
        {shots.map((s, i) => (
          <figure key={i} className="flex-none m-0" style={{ width: 'min(320px, 72vw)' }}>
            <div className="overflow-hidden bg-surface" style={{ aspectRatio: '4 / 5', borderRadius: 'var(--radius-image)' }}>
              <img src={s.src} alt={`${s.name} — ${s.type}`} className="w-full h-full object-cover" loading="lazy" draggable={false} />
            </div>
            <figcaption className="flex items-baseline justify-between mt-3">
              <span className="eyebrow" style={{ color: 'var(--color-faint)' }}>{s.type}</span>
              <span className="eyebrow">({s.projectNum}) {s.name}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
