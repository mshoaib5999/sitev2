import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const PageHead: React.FC<{ title: React.ReactNode; intro?: string }> = ({ title, intro }) => (
  <div className="gutter" style={{ paddingTop: 'var(--page-top)' }}>
    <h1 className="page-huge fvs-display" data-reveal>{title}</h1>
    {intro && (
      <p className="text-muted mt-6 mb-0" style={{ fontSize: 'clamp(19px, 1.8vw, 25px)', lineHeight: 1.42, maxWidth: '42ch' }} data-reveal>
        {intro}
      </p>
    )}
  </div>
);

export const FaqList: React.FC<{ items: { q: string; a: string }[] }> = ({ items }) => {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {items.map((f, i) => (
        <div key={f.q} className="faq-item" data-reveal>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} data-hover aria-expanded={open === i}>
            <span>{f.q}</span>
            <span style={{ color: 'var(--color-accent)', fontFamily: "'Geist Mono', monospace", fontSize: '18px' }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <p className="faq-a">{f.a}</p>}
        </div>
      ))}
    </div>
  );
};

export const NextBlock: React.FC<{ label: string; name: string; to: string }> = ({ label, name, to }) => (
  <div className="gutter">
    <Link to={to} className="next-block" data-reveal data-hover data-cursor="Next">
      <span className="eyebrow eyebrow--accent">{label}</span>
      <span className="next-block__name fvs-display">{name} →</span>
    </Link>
  </div>
);
