import React from 'react';
import { contact } from '../data/projects';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="gutter" style={{ borderTop: '1px solid var(--color-hairline)', paddingTop: 'clamp(60px, 10vh, 110px)', paddingBottom: '36px' }}>
      <div className="eyebrow mb-6" data-reveal>Got something in mind?</div>
      <a href={`mailto:${contact.email}`} className="footer__big fvs-display" data-reveal data-hover aria-label={`Email Shoaib — let's talk`}>
        Let’s talk
      </a>
      <div
        className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 mt-14 pt-6"
        style={{ borderTop: '1px solid var(--color-hairline)' }}
        data-reveal
      >
        <a href={`mailto:${contact.email}`} className="text-ink no-underline hover:text-accent transition-colors" data-hover>
          {contact.email}
        </a>
        <div className="flex gap-7">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="eyebrow no-underline hover:text-accent transition-colors" data-hover>LinkedIn ↗</a>
          <a href={contact.phoneHref} className="eyebrow no-underline hover:text-accent transition-colors" data-hover>{contact.phone}</a>
          <a href="#top" className="eyebrow no-underline hover:text-accent transition-colors" data-hover>Back to top ↑</a>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-4 mt-6">
        <span className="eyebrow">©2026 Muhammad Shoaib Asghar</span>
        <span className="eyebrow">Okara, Pakistan <span style={{ color: 'var(--color-accent)' }}>/</span> WordPress · WooCommerce · Speed</span>
      </div>
    </footer>
  );
};
