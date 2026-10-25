import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { contact } from '../data/projects';

function useOkaraTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Karachi',
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 20000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

const links = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
];

const menuItems = [
  { label: 'Home', to: '/', num: '01' },
  { label: 'Work', to: '/work', num: '02' },
  { label: 'About', to: '/about', num: '03' },
  { label: 'Services', to: '/services', num: '04' },
  { label: 'Contact', to: '/contact', num: '05' },
];

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const time = useOkaraTime();
  const progressRef = React.useRef<HTMLDivElement>(null);

  // Gold scroll-progress bar at the very top: fills left -> right with
  // page scroll (in his branding, after the reference he supplied).
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[70]">
        <div aria-hidden="true" className="absolute left-0 top-0 h-[3px] w-full" style={{ background: 'rgba(255,255,255,0.06)', zIndex: 80 }}>
          <div
            ref={progressRef}
            className="h-full w-full"
            style={{
              transform: 'scaleX(0)',
              transformOrigin: 'left center',
              background: 'linear-gradient(90deg, var(--color-accent), #ffe08a)',
              boxShadow: '0 0 10px rgba(255,198,26,0.45)',
            }}
          />
        </div>
        <div
          className="gutter flex items-center justify-between py-5"
          style={{ background: 'linear-gradient(rgba(17,16,16,0.92), rgba(17,16,16,0.75) 70%, transparent)', backdropFilter: 'blur(6px)' }}
        >
          <Link to="/" className="leading-none tracking-tight text-ink no-underline" data-hover aria-label="Shoaib Asghar — home">
            <span className="fvs-row uppercase text-[19px]">Shoaib</span>
            <span className="fvs-italic text-[19px]" style={{ color: 'var(--color-text)' }}>
              <span style={{ color: 'var(--color-accent)' }}>A</span>sghar
            </span>
          </Link>
          <span className="eyebrow hidden lg:block">WordPress Platform Architect <span style={{ color: 'var(--color-accent)' }}>/</span> {time} PKT</span>
          <nav className="flex items-center gap-7">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  `hidden md:inline font-mono text-[12px] uppercase tracking-[0.06em] no-underline transition-colors hover:text-accent ${isActive ? 'text-accent' : 'text-ink'}`
                }
                data-hover
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="hidden sm:inline-block rounded-full bg-accent px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.06em] font-medium text-[#111010] no-underline transition-transform hover:scale-[1.04]"
              data-hover
            >
              Start a project
            </Link>
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
            <Link key={item.num} to={item.to} className="menu-item fvs-display" onClick={() => setOpen(false)} data-hover>
              {item.label}
              <span className="menu-item__num">{item.num}</span>
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap justify-between gap-4 border-t pt-6" style={{ borderColor: 'var(--color-hairline)' }}>
          <a href={`mailto:${contact.email}`} className="text-ink no-underline hover:text-accent transition-colors" data-hover>
            {contact.email}
          </a>
          <span className="eyebrow">WordPress Platform Architect / {time} PKT</span>
        </div>
      </div>
    </>
  );
};
