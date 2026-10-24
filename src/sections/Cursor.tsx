import React, { useEffect, useRef, useState } from 'react';

export const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let x = -100, y = -100, rx = -100, ry = -100;
    let raf = 0;
    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      if (badgeRef.current) badgeRef.current.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest('[data-cursor]') as HTMLElement | null;
      setLabel(labelled ? labelled.getAttribute('data-cursor') : null);
      ringRef.current?.classList.toggle('is-hover', !!t.closest('a, button, [data-hover]'));
      if (ringRef.current) ringRef.current.style.opacity = labelled ? '0' : '1';
      if (dotRef.current) dotRef.current.style.opacity = labelled ? '0' : '1';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={badgeRef} className={`cursor-badge ${label ? 'is-on' : ''}`} aria-hidden="true">
        <div className="cursor-badge__inner">{label}</div>
      </div>
    </>
  );
};
