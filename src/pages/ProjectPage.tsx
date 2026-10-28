import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProject } from '../data/details';
import { KineticText, useKinetic } from '../sections/Kinetic';


/**
 * Full-page screenshot in a fixed frame: hovering scrolls it slowly from
 * top to bottom (the Elementor image-scroller behaviour), leaving scrolls
 * it back. Tap toggles it on touch devices. Used on every case study.
 */
const HoverScrollImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [offset, setOffset] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  const measure = () => {
    const f = frameRef.current;
    const im = imgRef.current;
    if (f && im) setOffset(Math.max(0, im.offsetHeight - f.offsetHeight));
  };
  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  const down = Math.max(4, offset / 105);
  const up = Math.max(2.5, offset / 170);

  return (
    <div
      ref={frameRef}
      className="relative overflow-hidden bg-surface"
      style={{ aspectRatio: '4 / 5', borderRadius: 'var(--radius-image)', border: '1px solid var(--color-hairline)' }}
      onMouseEnter={() => setScrolling(true)}
      onMouseLeave={() => setScrolling(false)}
      onClick={() => setScrolling((s) => !s)}
      data-cursor="Scroll"
      data-hover
      data-reveal
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={measure}
        className="block absolute left-0 top-0 w-full"
        style={{
          transform: `translateY(${scrolling ? -offset : 0}px)`,
          transitionProperty: 'transform',
          transitionDuration: `${scrolling ? down : up}s`,
          transitionTimingFunction: 'linear',
        }}
      />
      <div
        className="absolute left-4 bottom-4 pointer-events-none"
        style={{
          background: 'rgba(10,10,10,0.72)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: '999px',
          padding: '7px 13px',
          backdropFilter: 'blur(6px)',
          opacity: scrolling ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        <span className="eyebrow" style={{ color: 'var(--color-text)' }}>Full homepage — hover to scroll ↓</span>
      </div>
    </div>
  );
};

export const ProjectPage: React.FC = () => {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  const titleRef = useKinetic<HTMLHeadingElement>();

  if (!project) {
    return (
      <div className="gutter" style={{ paddingTop: 'var(--page-top)', paddingBottom: '120px' }}>
        <h1 className="case-title fvs-display">Not found</h1>
        <p className="text-muted mt-6">That project is not here. <Link to="/work" className="text-accent">See all work →</Link></p>
      </div>
    );
  }

  return (
    <article>
      <div className="gutter" style={{ paddingTop: 'var(--page-top)' }}>
        <Link to="/work" className="eyebrow no-underline hover:text-accent transition-colors" data-hover>← All work</Link>
        <h1 ref={titleRef} className="case-title fvs-display mt-8" data-reveal><KineticText text={project.name} /></h1>
        <div className="meta-grid" data-reveal>
          <div>
            <div className="eyebrow">Project</div>
            <div className="meta-value">{project.service}</div>
          </div>
          <div>
            <div className="eyebrow">Place</div>
            <div className="meta-value">{project.place}</div>
          </div>
          <div>
            <div className="eyebrow">Year</div>
            <div className="meta-value">{project.yearLabel}</div>
          </div>
          <div>
            <div className="eyebrow">Role</div>
            <div className="meta-value">Design & build — WordPress</div>
          </div>
        </div>
        <ul className="flex flex-wrap gap-2 list-none m-0 mt-7 p-0" data-reveal>
          <li>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="chip-link" data-hover data-cursor="Live">
              Visit live site ↗
            </a>
          </li>
          <li>
            <Link to="/contact" className="chip-link" data-hover>Start something like this</Link>
          </li>
        </ul>
      </div>

      {/* Overview (left) + full-page scroller (right) — the Bastide layout, on every case study. */}
      <div className="gutter grid grid-cols-1 lg:grid-cols-[6fr_5fr] gap-10 lg:gap-14 mt-12 items-start">
        <div>
          <h2 className="eyebrow m-0" style={{ color: 'var(--color-accent)', fontSize: '13px' }} data-reveal>( Overview )</h2>
          <p className="font-medium mt-7 mb-0" style={{ fontSize: 'clamp(21px, 2.2vw, 31px)', lineHeight: 1.32 }} data-reveal>
            {project.description}
          </p>
          <p className="text-muted mt-7 mb-0" style={{ fontSize: '17px', lineHeight: 1.65, maxWidth: '58ch' }} data-reveal>
            {project.overview}
          </p>
          {project.stats && (
            <div className="grid grid-cols-3 gap-6 mt-10" data-reveal>
              {project.stats.map((s) => (
                <div key={s.small} className="pt-5" style={{ borderTop: '1px solid var(--color-hairline)' }}>
                  <div className="fvs-display leading-none" style={{ fontSize: 'clamp(22px, 2vw, 32px)' }}>{s.big}</div>
                  <div className="eyebrow mt-2.5">{s.small}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {project.scrollImage ? (
          <HoverScrollImage src={project.scrollImage} alt={`${project.name} — full homepage`} />
        ) : (
          <div className="overflow-hidden bg-surface" style={{ aspectRatio: '4 / 5', borderRadius: 'var(--radius-image)', border: '1px solid var(--color-hairline)' }} data-reveal>
            <img src={project.image} alt={`${project.name} — website by Muhammad Shoaib Asghar`} className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <div className="gutter grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 mt-24">
        <h2 className="eyebrow m-0" style={{ color: 'var(--color-accent)', fontSize: '13px' }} data-reveal>( What was built )</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {project.features.map((f, i) => (
            <div key={f.title} className="pt-6" style={{ borderTop: '1px solid var(--color-hairline)' }} data-reveal>
              <div className="eyebrow mb-4" style={{ color: 'var(--color-accent)' }}>{String(i + 1).padStart(2, '0')}</div>
              <h3 className="fvs-row m-0" style={{ fontSize: 'clamp(21px, 1.9vw, 27px)', lineHeight: 1.05 }}>{f.title}</h3>
              <p className="text-muted mt-3 mb-0 leading-relaxed text-[15px]">{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      {project.detailImage && (
        <div className="gutter grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 mt-24 items-start">
          <h2 className="eyebrow m-0" style={{ color: 'var(--color-accent)', fontSize: '13px' }} data-reveal>( Up close )</h2>
          <figure className="m-0" data-reveal>
            <div className="overflow-hidden bg-surface" style={{ borderRadius: 'var(--radius-image)' }}>
              <img src={project.detailImage} alt={`${project.name} — ${project.detailCaption}`} className="w-full block" loading="lazy" />
            </div>
            <figcaption className="eyebrow mt-3">{project.detailCaption}</figcaption>
          </figure>
        </div>
      )}
    </article>
  );
};
