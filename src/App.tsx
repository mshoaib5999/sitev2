import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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

const titles: Record<string, string> = {
  '/': 'Muhammad Shoaib Asghar — Senior WordPress Developer',
  '/work': 'Work — Muhammad Shoaib Asghar',
  '/about': 'About — Muhammad Shoaib Asghar',
  '/services': 'Services — Muhammad Shoaib Asghar',
  '/contact': 'Say hi — Muhammad Shoaib Asghar',
};

const ScrollManager: React.FC<{ lenisRef: React.RefObject<Lenis | null> }> = ({ lenisRef }) => {
  const { pathname } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    document.title = titles[pathname] || 'Muhammad Shoaib Asghar — WordPress Developer';
    if (first.current) {
      first.current = false;
      return;
    }
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenisRef]);

  return null;
};

const Shell: React.FC = () => {
  const location = useLocation();
  const [introDone, setIntroDone] = useState<boolean>(() => {
    if (location.pathname !== '/') return true;
    try {
      return sessionStorage.getItem('shoaib-intro') === '1';
    } catch {
      return false;
    }
  });
  const lenisRef = useRef<Lenis | null>(null);

  const handleIntroDone = useCallback(() => {
    try {
      sessionStorage.setItem('shoaib-intro', '1');
    } catch { /* private mode */ }
    setIntroDone(true);
  }, []);

  useReveal([introDone, location.pathname]);

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

  return (
    <div className="min-h-screen bg-bg text-ink font-sans antialiased">
      {!introDone && <Intro onDone={handleIntroDone} />}
      <Cursor />
      <ScrollManager lenisRef={lenisRef} />
      <Header />
      <main>
        <Routes>
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
    </div>
  );
};

export const App: React.FC = () => (
  <BrowserRouter>
    <Shell />
  </BrowserRouter>
);

export default App;
