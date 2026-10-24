import React, { useEffect, useRef, useState } from 'react';

interface Puff { x: number; y: number; born: number; vx: number; vy: number; seed: number }

export const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLCanvasElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let x = -100, y = -100, rx = -100, ry = -100;
    let raf = 0;
    // ——— Golden smoke (from the reference the user liked): soft puffs are
    // spawned along the pointer's path, swell, curl and dissipate. ———
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = smokeRef.current;
    const ctx = canvas?.getContext('2d') ?? null;
    const puffs: Puff[] = [];
    let lastSpawnX = -100, lastSpawnY = -100, lastSpawnT = 0;
    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (reduced || !ctx) return;
      const now = performance.now();
      const dist = Math.hypot(x - lastSpawnX, y - lastSpawnY);
      if ((dist > 16 && now - lastSpawnT > 24) || now - lastSpawnT > 90) {
        const speed = Math.min(1, dist / 60);
        puffs.push({
          x, y, born: now,
          vx: (x - lastSpawnX) * 0.012 + (Math.random() - 0.5) * 0.14,
          vy: -0.12 - Math.random() * 0.16 - speed * 0.1,
          seed: Math.random() * Math.PI * 2,
        });
        if (puffs.length > 90) puffs.splice(0, puffs.length - 90);
        lastSpawnX = x; lastSpawnY = y; lastSpawnT = now;
      }
    };
    const drawSmoke = (now: number) => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (reduced) return;
      ctx.globalCompositeOperation = 'lighter';
      // steady glow at the pointer — brightest right at the cursor
      if (x > -50) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, 130);
        g.addColorStop(0, 'rgba(255, 186, 40, 0.055)');
        g.addColorStop(1, 'rgba(255, 186, 40, 0)');
        ctx.fillStyle = g;
        ctx.fillRect(x - 130, y - 130, 260, 260);
      }
      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        const age = (now - p.born) / 1600;
        if (age >= 1) { puffs.splice(i, 1); continue; }
        const ease = 1 - Math.pow(1 - age, 2);
        const r = 46 + ease * 185;
        const px = p.x + p.vx * age * 160 + Math.sin(p.seed + age * 5.2) * 17 * age;
        const py = p.y + p.vy * age * 160;
        const a = 0.13 * (1 - age) * (1 - age);
        const g = ctx.createRadialGradient(px, py, 0, px, py, r);
        g.addColorStop(0, `rgba(255, 192, 46, ${a})`);
        g.addColorStop(0.55, `rgba(255, 156, 26, ${a * 0.45})`);
        g.addColorStop(1, 'rgba(255, 140, 10, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      drawSmoke(performance.now());
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
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas ref={smokeRef} className="cursor-smoke" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={badgeRef} className={`cursor-badge ${label ? 'is-on' : ''}`} aria-hidden="true">
        <div className="cursor-badge__inner">{label}</div>
      </div>
    </>
  );
};
