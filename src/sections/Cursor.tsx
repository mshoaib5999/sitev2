import React, { useEffect, useRef, useState } from 'react';

interface Puff { x: number; y: number; born: number; vx: number; vy: number; seed: number; deep: boolean }

/**
 * The cursor, combined per the user's references:
 *  - his own: a gold dot + a gold ring that trails with a spring, grows
 *    over anything clickable (with a soft gold fill) and squeezes on
 *    press; labelled gold badges (View / Skip / …) replace it over
 *    [data-cursor] elements and now glide with the same spring.
 *  - from the video he liked (yasirshams.com): a golden smoke that the
 *    pointer stirs up — soft puffs spawned continuously along the
 *    pointer's path, swelling, curling upward and dissipating, with a
 *    steady glow right at the pointer.
 */
export const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLCanvasElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let x = -100, y = -100;       // pointer
    let rx = -100, ry = -100;     // ring (springy)
    let bx = -100, by = -100;     // badge (springy, quicker)
    let angle = 0, stretch = 0;   // ring velocity stretch
    let raf = 0;

    // ——— Golden smoke ———
    const canvas = smokeRef.current;
    const ctx = canvas?.getContext('2d') ?? null;
    const puffs: Puff[] = [];
    let lastX = -100, lastY = -100;
    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = (sx: number, sy: number, speed: number, now: number) => {
      puffs.push({
        x: sx + (Math.random() - 0.5) * 14,
        y: sy + (Math.random() - 0.5) * 14,
        born: now,
        vx: (Math.random() - 0.5) * 0.16,
        vy: -0.13 - Math.random() * 0.17 - speed * 0.12,
        seed: Math.random() * Math.PI * 2,
        deep: Math.random() < 0.35,
      });
      if (puffs.length > 110) puffs.splice(0, puffs.length - 110);
    };

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX, ny = e.clientY;
      if (!reduced && ctx && lastX > -50) {
        // fill the path between the last point and this one, so fast
        // sweeps lay a continuous ribbon of smoke, not dotted blobs
        const dist = Math.hypot(nx - lastX, ny - lastY);
        const speed = Math.min(1, dist / 70);
        const steps = Math.min(6, Math.max(1, Math.floor(dist / 13)));
        const now = performance.now();
        for (let s = 1; s <= steps; s++) {
          spawn(lastX + ((nx - lastX) * s) / steps, lastY + ((ny - lastY) * s) / steps, speed, now);
        }
      }
      x = nx; y = ny; lastX = nx; lastY = ny;
    };

    const drawSmoke = (now: number) => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (reduced) return;
      ctx.globalCompositeOperation = 'lighter';
      if (x > -50) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, 150);
        g.addColorStop(0, 'rgba(255, 186, 40, 0.06)');
        g.addColorStop(1, 'rgba(255, 186, 40, 0)');
        ctx.fillStyle = g;
        ctx.fillRect(x - 150, y - 150, 300, 300);
      }
      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        const age = (now - p.born) / 1750;
        if (age >= 1) { puffs.splice(i, 1); continue; }
        const swell = 1 - Math.pow(1 - age, 2);
        const r = 44 + swell * 195;
        const px = p.x + p.vx * age * 170 + Math.sin(p.seed + age * 5.4) * 19 * age;
        const py = p.y + p.vy * age * 170 + Math.cos(p.seed * 1.7 + age * 4.1) * 8 * age;
        const a = 0.125 * (1 - age) * (1 - age);
        const core = p.deep ? '255, 150, 24' : '255, 196, 52';
        const g = ctx.createRadialGradient(px, py, 0, px, py, r);
        g.addColorStop(0, `rgba(${core}, ${a})`);
        g.addColorStop(0.55, `rgba(255, 156, 26, ${a * 0.45})`);
        g.addColorStop(1, 'rgba(255, 140, 10, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest('[data-cursor]') as HTMLElement | null;
      setLabel(labelled ? labelled.getAttribute('data-cursor') : null);
      ringRef.current?.classList.toggle('is-hover', !!t.closest('a, button, [data-hover]'));
      if (ringRef.current) ringRef.current.style.opacity = labelled ? '0' : '1';
      if (dotRef.current) dotRef.current.style.opacity = labelled ? '0' : '1';
    };
    const onDown = () => {
      ringRef.current?.classList.add('is-down');
      dotRef.current?.classList.add('is-down');
    };
    const onUp = () => {
      ringRef.current?.classList.remove('is-down');
      dotRef.current?.classList.remove('is-down');
    };

    const loop = () => {
      const dx = x - rx, dy = y - ry;
      rx += dx * 0.16;
      ry += dy * 0.16;
      bx += (x - bx) * 0.38;
      by += (y - by) * 0.38;
      // velocity stretch: the ring leans into fast movement, then settles
      const speed = Math.hypot(dx, dy);
      const targetStretch = Math.min(0.16, speed * 0.0035);
      stretch += (targetStretch - stretch) * 0.18;
      if (speed > 2) {
        const targetAngle = Math.atan2(dy, dx);
        let diff = targetAngle - angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        angle += diff * 0.2;
      }
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${rx}px, ${ry}px) translate(-50%, -50%) rotate(${angle}rad) scale(${1 + stretch}, ${1 - stretch * 0.55})`;
      }
      if (badgeRef.current) badgeRef.current.style.transform = `translate(${bx}px, ${by}px)`;
      drawSmoke(performance.now());
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
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
