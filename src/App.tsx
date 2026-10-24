import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, type Location } from 'react-router-dom';
import Lenis from 'lenis';
import { Intro } from './sections/Intro';
import { Header } from './sections/Header';
import { Footer } from './sections/Footer';
import { Cursor } from './sections/Cursor';
import { Home } from './pages/Home';
import { WorkPage } from './pages/WorkPage';
import { ProjectPage } from './pages/ProjectPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServicePage } from './pages/ServicePage';
import { ContactPage } from './pages/ContactPage';
import { useReveal } from './hooks/useReveal';
import { getProject } from './data/details';
import { getService } from './data/services';

const titles: Record<string, string> = {
  '/': 'Muhammad Shoaib Asghar — Senior WordPress Developer',
  '/work': 'Work — Muhammad Shoaib Asghar',
  '/about': 'About — Muhammad Shoaib Asghar',
  '/services': 'Services — Muhammad Shoaib Asghar',
  '/contact': 'Say hi — Muhammad Shoaib Asghar',
};

interface VeilInfo { title: string; meta: string; }

function routeInfo(pathname: string): VeilInfo {
  if (pathname === '/') return { title: 'HOME', meta: 'PORTFOLIO ©2026' };
  if (pathname === '/work') return { title: 'WORK', meta: '12 PROJECTS' };
  const wp = pathname.match(/^\/work\/(.+)$/);
  if (wp) return { title: (getProject(wp[1])?.name ?? 'Work').toUpperCase(), meta: 'CASE STUDY' };
  if (pathname === '/about') return { title: 'ABOUT', meta: 'SINCE 2022' };
  if (pathname === '/services') return { title: 'SERVICES', meta: '4 SERVICES' };
  const sp = pathname.match(/^\/services\/(.+)$/);
  if (sp) return { title: (getService(sp[1])?.title ?? 'Services').toUpperCase(), meta: 'SERVICE' };
  if (pathname === '/contact') return { title: 'SAY HI', meta: 'GET IN TOUCH' };
  return { title: 'HOME', meta: 'PORTFOLIO ©2026' };
}

type Phase = 'idle' | 'pre' | 'in' | 'hold' | 'out';

const Shell: React.FC = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState<Location>(location);
  const [phase, setPhase] = useState<Phase>(() => (location.pathname !== '/' ? 'hold' : 'idle'));
  const [info, setInfo] = useState<VeilInfo>(() => routeInfo(location.pathname));
  const [introDone, setIntroDone] = useState<boolean>(() => {
    if (location.pathname !== '/') return true;
    try {
      return sessionStorage.getItem('shoaib-intro') === '1';
    } catch {
      return false;
    }
  });
  const lenisRef = useRef<Lenis | null>(null);
  const timers = useRef<number[]>([]);
  const displayPath = useRef(location.pathname);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const handleIntroDone = useCallback(() => {
    try {
      sessionStorage.setItem('shoaib-intro', '1');
    } catch { /* private mode */ }
    setIntroDone(true);
  }, []);

  useReveal([introDone, displayLocation.pathname]);

  useEffect(() => {
    document.title = titles[displayLocation.pathname] || 'Muhammad Shoaib Asghar — WordPress Developer';
  }, [displayLocation]);

  // Lenis smooth scrolling — the reference site's buttery scroll feel.
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // In-page anchors (e.g. "See the work") should glide, not jump.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.4 });
      }
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // While the intro plays, park scroll at the top.
  useEffect(() => {
    if (!introDone && lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
  }, [introDone]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  // (NEXT) veil: the gold interstitial the reference shows on every page change.
  useEffect(() => {
    if (location.pathname === displayPath.current) {
      // First load straight onto a subpage: the veil starts covering, then lifts.
      if (phaseRef.current === 'hold') {
        later(() => setPhase('out'), 500);
        later(() => setPhase('idle'), 1120);
      }
      return;
    }
    clearTimers();
    setInfo(routeInfo(location.pathname));
    setPhase('pre');
    later(() => setPhase('in'), 40);
    later(() => {
      displayPath.current = location.pathname;
      setDisplayLocation(location);
      if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      setPhase('hold');
    }, 560);
    later(() => setPhase('out'), 1080);
    later(() => setPhase('idle'), 1700);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Freeze scroll while the veil is on screen.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (phase === 'idle') lenis.start();
    else lenis.stop();
  }, [phase]);

  const veilTitleSize =
    info.title.length <= 6
      ? 'clamp(72px, 14.5vw, 235px)'
      : `clamp(42px, ${Math.min(12, 132 / info.title.length)}vw, 200px)`;

  return (
    <div className="min-h-screen bg-bg text-ink font-sans antialiased">
      {!introDone && <Intro onDone={handleIntroDone} />}
      <Cursor />
      <Header />
      <main>
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />

      <div className={info.meta !== 'CASE STUDY' ? 'veil veil--portrait' : 'veil'} data-phase={phase} aria-hidden="true">
        {info.meta !== 'CASE STUDY' && (
          <img src="/portrait-golden-rimlight.jpg" alt="" aria-hidden="true" className="veil__portrait" />
        )}
        <div className="veil__top">
          <span>(Next)</span>
          <span>{info.meta}</span>
        </div>
        <div className="veil__bottom">
          <div className="veil__title fvs-display" style={{ fontSize: veilTitleSize }}>{info.title}</div>
          <div className="veil__rule" />
        </div>
      </div>
    </div>
  );
};

export const App: React.FC = () => (
  <BrowserRouter>
    <Shell />
  </BrowserRouter>
);

export default App;
