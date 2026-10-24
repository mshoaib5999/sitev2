import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Scroll-linked word reveal — the same behaviour as the home (Hello)
 * statement: words start dim and turn full/bright one by one as the
 * block scrolls through the viewport. Typography comes entirely from
 * the className/style passed in, so existing font styling is untouched.
 */
export const RevealWords: React.FC<{
  text: string;
  className?: string;
  style?: React.CSSProperties;
  litColor?: string;
}> = ({ text, className, style, litColor }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const words = useMemo(() => text.split(' '), [text]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.92;
        const end = vh * 0.22;
        const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height)));
        setProgress(p);
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const lit = Math.round(progress * words.length);

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            opacity: i < lit ? 1 : 0.28,
            color: i < lit && litColor ? litColor : undefined,
            transition: 'opacity 0.35s ease, color 0.35s ease',
          }}
        >
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
};
