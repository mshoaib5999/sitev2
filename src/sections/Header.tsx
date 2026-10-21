import React, { useState } from 'react';
import { contact } from '../data/projects';

const links = [
  { label: 'Work', href: '#work', num: '02' },
  { label: 'About', href: '#about', num: '03' },
  { label: 'Services', href: '#services', num: '04' },
];

const menuItems = [
  { label: 'Home', href: '#top', num: '01' },
  { label: 'Work', href: '#work', num: '02' },
  { label: 'About', href: '#about', num: '03' },
  { label: 'Services', href: '#services', num: '04' },
  { label: 'Contact', href: '#contact', num: '05' },
];

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[70]">
        <div
          className="gutter flex items-center justify-between py-5"
          style={{ background: 'linear-gradient(rgba(17,16,16,0.92), rgba(17,16,16,0.75) 70%, transparent)', backdropFilter: 'blur(6px)' }}
        >
          <a href="#top" className="fvs-row uppercase text-[19px] leading-none tracking-tight text-ink no-underline" data-hover>
            Shoaib<span style={{ color: 'var(--color-accent)' }}>©</span>Asghar
          </a>
          <span className="eyebrow hidden lg:block">Okara, Pakistan <span style={{ color: 'var(--color-accent)' }}>/</span> Working worldwide</span>
          <nav className="flex items-center gap-7">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="hidden md:inline text-[15px] text-ink no-underline hover:text-accent transition-colors" data-hover>
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="hidden sm:inline-block rounded-full border px-5 py-2.5 text-[14px] text-ink no-underline transition-colors hover:bg-accent hover:text-[#111010]"
              style={{ borderColor: 'var(--color-chip-border)' }}
              data-hover
            >
              Start a project
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex flex-col justify-center gap-[7px] w-10 h-10 bg-transparent border-0 cursor-pointer"
              data-hover
            >
              <span className="block h-[2px] w-8 bg-ink transition-transform duration-300" style={{ transform: open ? 'translateY(4.5px) rotate(45deg)' : 'none' }} />
              <span className="block h-[2px] w-8 bg-ink transition-transform duration-300" style={{ transform: open ? 'translateY(-4.5px) rotate(-45deg)' : 'none' }} />
            </button>
          </nav>
        </div>
      </header>

      <div className={`menu-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="flex flex-col">
          {menuItems.map((item) => (
            <a key={item.num} href={item.href} className="menu-item fvs-display" onClick={() => setOpen(false)} data-hover>
              {item.label}
              <span className="menu-item__num">{item.num}</span>
            </a>
          ))}
        </nav>
        <div className="flex flex-wrap justify-between gap-4 border-t pt-6" style={{ borderColor: 'var(--color-hairline)' }}>
          <a href={`mailto:${contact.email}`} className="text-ink no-underline hover:text-accent transition-colors" data-hover>
            {contact.email}
          </a>
          <span className="eyebrow">Okara, Pakistan / Working worldwide</span>
        </div>
      </div>
    </>
  );
};
