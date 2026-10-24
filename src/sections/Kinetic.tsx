import React, { useEffect, useRef } from 'react';

export const K_BASE = { wdth: 86, wght: 780 };
export const K_SLIM = { wdth: 124, wght: 265 };

/**
 * Kinetic type, the reference site's signature: letters near the cursor
 * ease slim & wide; letters far away stay heavy. Attach the returned ref
 * to any element containing `.k-letter` spans (see KineticText).
 */
export function useKinetic<T extends HTMLElement>(opts?: { settle?: boolean; radius?: number }) {
  const ref = useRef<T>(null);
  const settle = opts?.settle ?? false;
  const radius = opts?.radius ?? 470;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const letters = Array.from(root.querySelectorAll<HTMLElement>('.k-letter'));
    if (!letters.length) return;

    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      letters.forEach((el) => {
        el.style.fontVariationSettings = `"wdth" ${K_BASE.wdth}, "wght" ${K_BASE.wght}`;
      });
      return;
    }

    const cur = letters.map(() => ({ ...(settle ? K_SLIM : K_BASE) }));
    // Track the pointer on the window, not just on the title element:
    // overlays (cursor badge, header, veil) must never swallow the signal.
    const pointer = { x: -9999, y: -9999, inside: false };
    const born = performance.now() + (settle ? 1150 : 0);
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.inside = true;
    };
    const onLeave = () => { pointer.inside = false; };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);

    const loop = (now: number) => {
      const rect = root.getBoundingClientRect();
      if (rect.bottom > -80 && rect.top < window.innerHeight + 80) {
        letters.forEach((el, i) => {
          const lr = el.getBoundingClientRect();
          const cx = lr.left + lr.width / 2;
          const cy = lr.top + lr.height / 2;
          let inf = 0;
          const settling = settle && now < born + i * 40;
          if (pointer.inside && !settling) {
            const d = Math.hypot(pointer.x - cx, pointer.y - cy);
            const t = Math.max(0, 1 - d / radius);
            inf = t * t * (3 - 2 * t);
          }
          const target = settling
            ? K_SLIM
            : {
                wdth: K_BASE.wdth + (K_SLIM.wdth - K_BASE.wdth) * inf,
                wght: K_BASE.wght + (K_SLIM.wght - K_BASE.wght) * inf,
              };
          cur[i].wdth += (target.wdth - cur[i].wdth) * 0.16;
          cur[i].wght += (target.wght - cur[i].wght) * 0.16;
          el.style.fontVariationSettings = `"wdth" ${cur[i].wdth.toFixed(1)}, "wght" ${cur[i].wght.toFixed(0)}`;
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
    };
  }, [settle, radius]);

  return ref;
}

/** Splits text into per-letter spans (words kept intact for wrapping). */
export const KineticText: React.FC<{ text: string; slim?: boolean }> = ({ text, slim }) => (
  <>
    {text.split(' ').map((word, wi, words) => (
      <React.Fragment key={wi}>
        <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((ch, i) => (
            <span
              key={i}
              className="k-letter"
              style={{
                display: 'inline-block',
                fontVariationSettings: `"wdth" ${slim ? K_SLIM.wdth : K_BASE.wdth}, "wght" ${slim ? K_SLIM.wght : K_BASE.wght}`,
              }}
            >
              {ch}
            </span>
          ))}
        </span>
        {wi < words.length - 1 ? ' ' : null}
      </React.Fragment>
    ))}
  </>
);
