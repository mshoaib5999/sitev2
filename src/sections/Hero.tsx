import React, { useEffect, useRef } from 'react';

const marqueeWords = ['Design', 'Build', 'Motion', 'WordPress', 'WooCommerce', 'Elementor', 'Speed'];

const BASE = { wdth: 86, wght: 780 };
const SLIM = { wdth: 124, wght: 265 };
const RADIUS = 470;

const KineticWord: React.FC<{ word: string; offset: number }> = ({ word, offset }) => (
  <>
    {word.split('').map((ch, i) => (
      <span
        key={i}
        className="k-letter"
        data-ki={offset + i}
        style={{ display: 'inline-block', fontVariationSettings: `"wdth" ${SLIM.wdth}, "wght" ${SLIM.wght}` }}
      >
        {ch}
      </span>
    ))}
  </>
);

export const Hero: React.FC = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);

  // Gentle parallax: the name lags the scroll slightly, like the reference.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = nameRef.current;
        if (el) {
          const y = Math.min(window.scrollY, window.innerHeight);
          el.style.transform = `translateY(${y * 0.16}px)`;
          el.style.opacity = String(1 - Math.min(0.55, (y / window.innerHeight) * 0.55));
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Kinetic type: letters near the cursor go slim & wide, easing back when it leaves —
  // the reference site's signature move.
  useEffect(() => {
    const h1 = nameRef.current;
    if (!h1) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      h1.querySelectorAll<HTMLElement>('.k-letter').forEach((el) => {
        el.style.fontVariationSettings = `"wdth" ${BASE.wdth}, "wght" ${BASE.wght}`;
      });
      return;
    }
    const letters = Array.from(h1.querySelectorAll<HTMLElement>('.k-letter'));
    const cur = letters.map(() => ({ ...SLIM }));
    const pointer = { x: -9999, y: -9999, inside: false };
    const born = performance.now() + 1150; // letters settle in as the intro lifts
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.inside = true;
    };
    const onLeave = () => { pointer.inside = false; };
    h1.addEventListener('pointermove', onMove);
    h1.addEventListener('pointerleave', onLeave);

    const loop = (now: number) => {
      const rect = h1.getBoundingClientRect();
      if (rect.bottom > -80 && rect.top < window.innerHeight + 80) {
        letters.forEach((el, i) => {
          const lr = el.getBoundingClientRect();
          const cx = lr.left + lr.width / 2;
          const cy = lr.top + lr.height / 2;
          let inf = 0;
          if (pointer.inside && now > born + i * 40) {
            const d = Math.hypot(pointer.x - cx, pointer.y - cy);
            const t = Math.max(0, 1 - d / RADIUS);
            inf = t * t * (3 - 2 * t); // smoothstep
          }
          const settling = now < born + i * 40;
          const target = settling
            ? SLIM
            : {
                wdth: BASE.wdth + (SLIM.wdth - BASE.wdth) * inf,
                wght: BASE.wght + (SLIM.wght - BASE.wght) * inf,
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
      h1.removeEventListener('pointermove', onMove);
      h1.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section id="top" className="gutter flex flex-col justify-between" style={{ minHeight: '100svh', paddingTop: '104px' }}>
      <div className="eyebrow flex items-start justify-between" data-reveal>
        <span>(Portfolio / ©2026)</span>
        <span className="hidden md:inline" style={{ color: 'var(--color-accent)' }}>Senior WordPress Developer</span>
        <span>Okara, Pakistan</span>
      </div>

      <h1 ref={nameRef} className="hero__name fvs-display" aria-label="Shoaib Asghar" style={{ willChange: 'transform, opacity' }}>
        <span className="hero__line"><span><KineticWord word="SHOAIB" offset={0} /></span></span>
        <span className="hero__line hero__line--second"><span><KineticWord word="ASGHAR" offset={6} /></span></span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-7 pb-10">
        <p className="m-0 max-w-[36ch] text-[clamp(18px,1.6vw,22px)] leading-[1.42]" data-reveal>
          I design and build WordPress websites and WooCommerce stores with a lot of movement
          in them. Businesses, agencies and brands worldwide, mostly.
        </p>
        <span className="eyebrow md:justify-self-center" data-reveal>↓ Scroll, gently</span>
        <div className="md:justify-self-end" data-reveal>
          <a
            href="#work"
            className="inline-block rounded-full border px-7 py-[18px] font-mono text-[12px] uppercase tracking-[0.06em] text-ink no-underline transition-colors hover:bg-accent hover:text-[#111010] hover:border-transparent"
            style={{ borderColor: 'var(--color-chip-border)' }}
            data-hover
            data-cursor="Look"
          >
            See the work →
          </a>
        </div>
      </div>
    </section>
  );
};

export const Marquee: React.FC = () => {
  const copy = (ariaHidden: boolean) => (
    <div className="marquee__copy fvs-italic" aria-hidden={ariaHidden || undefined}>
      {marqueeWords.map((w) => (
        <React.Fragment key={w}>
          <span>{w}</span>
          <span className="marquee__diamond" aria-hidden="true" />
        </React.Fragment>
      ))}
    </div>
  );
  return (
    <div className="marquee" aria-label={marqueeWords.join(', ')}>
      <div className="marquee__track">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
};
