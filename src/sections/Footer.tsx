import React from 'react';
import { Link } from 'react-router-dom';
import { contact } from '../data/projects';
import { KineticText, useKinetic } from './Kinetic';
import { SocialLinks } from '../components/ui/social-links';

export const Footer: React.FC = () => {
  const bigRef = useKinetic<HTMLAnchorElement>({ radius: 560 });
  return (
    <footer id="contact" className="gutter" style={{ borderTop: '1px solid var(--color-hairline)', paddingTop: 'clamp(60px, 10vh, 110px)', paddingBottom: '36px' }}>
      <div className="eyebrow mb-6" data-reveal>Got something in mind?</div>
      <Link ref={bigRef} to="/contact" className="footer__big fvs-display" data-reveal data-hover data-cursor="Let’s go" aria-label="Go to the contact page">
        <KineticText text="Let’s talk" />
      </Link>
      <div className="mt-16 flex justify-center" data-reveal>
        <SocialLinks
          socials={[
            { name: 'Facebook', href: contact.facebook, icon: 'facebook' },
            { name: 'Instagram', href: contact.instagram, icon: 'instagram' },
            { name: 'LinkedIn', href: contact.linkedin, icon: 'linkedin' },
          ]}
        />
      </div>
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
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="eyebrow bg-transparent border-0 cursor-pointer p-0 hover:text-accent transition-colors" data-hover>Back to top ↑</button>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-4 mt-6">
        <span className="eyebrow">©2026 Muhammad Shoaib Asghar</span>
        <span className="eyebrow">WordPress · WooCommerce · Shopify · GHL · Speed</span>
      </div>
    </footer>
  );
};
