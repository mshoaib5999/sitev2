import React, { useEffect, useRef, useState } from 'react';
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
 * Scroll-driven gallery, like the reference: the section pins while the
 * cards travel right → left as you scroll down, and reverse as you scroll up.
 */
export const UpClose: React.FC = () => {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) setTravel(Math.max(0, track.scrollWidth - window.innerWidth + 8));
    };
    measure();
    const t1 = setTimeout(measure, 600);
    const t2 = setTimeout(measure, 1800);
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    let lastX = 0;
    let skew = 0;
    const loop = () => {
      const outer = outerRef.current;
      const track = trackRef.current;
      if (outer && track) {
        const rect = outer.getBoundingClientRect();
        const total = outer.offsetHeight - window.innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        const x = -p * travel;
        const vel = x - lastX;
        lastX = x;
        const targetSkew = Math.max(-6, Math.min(6, -vel * 0.3));
        skew += (targetSkew - skew) * 0.1;
        track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0) skewX(${skew.toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [travel]);

  return (
    <section ref={outerRef} className="relative" style={{ height: `calc(100vh + ${travel}px)` }}>
      <div className="flex flex-col justify-center overflow-hidden" style={{ position: 'sticky', top: 0, height: '100vh' }} data-cursor="Look">
        <div className="gutter flex items-baseline justify-between mb-8 w-full">
          <h2 className="eyebrow m-0" style={{ color: 'var(--color-text)', fontSize: '13px' }}>(Up close)</h2>
          <span className="eyebrow">Keep scrolling</span>
        </div>
        <div ref={trackRef} className="flex gap-5 px-[var(--gutter)]" style={{ width: 'max-content', willChange: 'transform' }}>
          {shots.map((s, i) => (
            <Link key={s.slug} to={`/work/${s.slug}`} className="flex-none m-0 block no-underline" style={{ width: 'min(330px, 74vw)' }} data-hover>
              <div className="overflow-hidden bg-surface" style={{ aspectRatio: '4 / 5', borderRadius: 'var(--radius-image)' }}>
                <img src={s.src} alt={`${s.name} — ${s.type}`} className="w-full h-full object-cover" loading="lazy" draggable={false} />
              </div>
              <figcaption className="flex items-baseline justify-between mt-3">
                <span className="eyebrow">({s.projectNum}) {s.name}</span>
                <span className="eyebrow" style={{ color: 'var(--color-faint)' }}>{s.type}</span>
              </figcaption>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
