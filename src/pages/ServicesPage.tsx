import React from 'react';
import { Link } from 'react-router-dom';
import { PageHead, FaqList } from './shared';
import { services, processSteps } from '../data/services';

const generalFaqs = [
  { q: 'How much does a project cost?', a: 'Every project is scoped and quoted fixed before we start — no hourly surprises. A focused business website and a full WooCommerce store are very different numbers; tell me what you are making and I will give you a clear one.' },
  { q: 'What do you need from me to start?', a: 'A conversation. Content and brand assets help, but we can start from a rough idea — the scope step turns it into a plan before any building happens.' },
  { q: 'Do you work with agencies?', a: 'Yes — a good share of my 400+ sites were built white-label for agencies and studios who needed a developer they could hand designs to and trust.' },
];

export const ServicesPage: React.FC = () => (
  <div>
    <PageHead title="Services" intro="Four things I do a lot of. Most projects end up being a mix — what matters is that design, build and speed all come from the same hands." />

    <div className="gutter" style={{ marginTop: 'clamp(30px, 6vh, 60px)' }}>
      {services.map((s) => (
        <Link
          key={s.slug}
          to={`/services/${s.slug}`}
          className="block no-underline py-10"
          style={{ borderTop: '1px solid var(--color-hairline)', color: 'inherit' }}
          data-reveal
          data-hover
          data-cursor="Open"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_1.2fr_60px] gap-5 items-start">
            <span className="eyebrow pt-3" style={{ color: 'var(--color-accent)' }}>{s.num}</span>
            <h2 className="fvs-row m-0" style={{ fontSize: 'clamp(32px, 4.2vw, 64px)', lineHeight: 0.95 }}>{s.title}</h2>
            <p className="text-muted m-0 leading-relaxed pt-2" style={{ maxWidth: '52ch' }}>{s.intro}</p>
            <span className="text-accent text-2xl justify-self-end pt-2">→</span>
          </div>
        </Link>
      ))}
    </div>

    <div className="gutter mt-24">
      <h2 className="eyebrow m-0 mb-8" style={{ color: 'var(--color-accent)', fontSize: '13px' }} data-reveal>( The process )</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        {processSteps.map((p, i) => (
          <div key={p.title} className="pt-6" style={{ borderTop: '1px solid var(--color-hairline)' }} data-reveal>
            <div className="eyebrow mb-4" style={{ color: 'var(--color-accent)' }}>{String(i + 1).padStart(2, '0')}</div>
            <h3 className="fvs-row m-0" style={{ fontSize: 'clamp(21px, 1.9vw, 27px)', lineHeight: 1.05 }}>{p.title}</h3>
            <p className="text-muted mt-3 mb-0 leading-relaxed text-[15px]">{p.text}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
        <div className="p-7 bg-surface" style={{ borderRadius: 'var(--radius-image)' }} data-reveal>
          <div className="eyebrow eyebrow--accent mb-3">Fixed price project</div>
          <p className="m-0 text-muted leading-relaxed">A defined scope with a fixed price. Best for new sites, stores and rebuilds — you know the number before we begin.</p>
        </div>
        <div className="p-7 bg-surface" style={{ borderRadius: 'var(--radius-image)' }} data-reveal>
          <div className="eyebrow eyebrow--accent mb-3">Monthly block</div>
          <p className="m-0 text-muted leading-relaxed">A monthly block of time for updates, new pages, speed work and improvements — for sites that keep growing.</p>
        </div>
      </div>
    </div>

    <div className="gutter grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 mt-28">
      <h2 className="eyebrow m-0" style={{ color: 'var(--color-accent)', fontSize: '13px' }} data-reveal>( Questions )</h2>
      <FaqList items={generalFaqs} />
    </div>
  </div>
);
