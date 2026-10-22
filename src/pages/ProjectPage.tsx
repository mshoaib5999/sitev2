import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProject, nextProject } from '../data/details';
import { NextBlock } from './shared';

export const ProjectPage: React.FC = () => {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  const heroImgRef = useRef<HTMLImageElement>(null);

  // Slight parallax on the hero image, like the reference case studies.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const img = heroImgRef.current;
        if (img) {
          const rect = img.parentElement?.getBoundingClientRect();
          if (rect && rect.bottom > 0 && rect.top < window.innerHeight) {
            const p = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            img.style.transform = `translateY(${(p - 0.5) * -46}px) scale(1.16)`;
          }
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [slug]);

  if (!project) {
    return (
      <div className="gutter" style={{ paddingTop: 'var(--page-top)', paddingBottom: '120px' }}>
        <h1 className="case-title fvs-display">Not found</h1>
        <p className="text-muted mt-6">That project is not here. <Link to="/work" className="text-accent">See all work →</Link></p>
      </div>
    );
  }

  const next = nextProject(project.slug);

  return (
    <article>
      <div className="gutter" style={{ paddingTop: 'var(--page-top)' }}>
        <Link to="/work" className="eyebrow no-underline hover:text-accent transition-colors" data-hover>← All work</Link>
        <h1 className="case-title fvs-display mt-8" data-reveal>{project.name}</h1>
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

      <div className="gutter mt-12">
        <div className="overflow-hidden bg-surface" style={{ aspectRatio: '16 / 9', borderRadius: 'var(--radius-image)' }} data-reveal>
          <img
            ref={heroImgRef}
            src={project.image}
            alt={`${project.name} — website by Muhammad Shoaib Asghar`}
            className="w-full h-full object-cover"
            style={{ transform: 'scale(1.16)', willChange: 'transform' }}
          />
        </div>
      </div>

      <div className="gutter grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 mt-20">
        <h2 className="eyebrow m-0" style={{ color: 'var(--color-accent)', fontSize: '13px' }} data-reveal>( Overview )</h2>
        <div data-reveal>
          <p className="m-0 font-medium" style={{ fontSize: 'clamp(21px, 2.2vw, 31px)', lineHeight: 1.32, maxWidth: '30em' }}>
            {project.description}
          </p>
          <p className="text-muted mt-7 mb-0" style={{ fontSize: '17px', lineHeight: 1.65, maxWidth: '58ch' }}>
            {project.overview}
          </p>
        </div>
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

      <NextBlock label="Next project →" name={next.name} to={`/work/${next.slug}`} />
    </article>
  );
};
