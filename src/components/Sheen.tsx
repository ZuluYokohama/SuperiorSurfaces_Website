'use client';

import { useEffect, useRef } from 'react';

/**
 * The one orchestrated moment: a soft-box reflection band that glides across the hero
 * with the pointer, like studio light sliding over lacquer. Fine pointers only;
 * on touch, and for reduced motion, the band rests in place.
 */
export function Sheen() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || still) return;
    const host = el.parentElement!;
    let target = 0.38, current = 0.38, raf = 0;
    const tick = () => {
      current += (target - current) * 0.06;
      el.style.setProperty('--y', `${(current * 100).toFixed(2)}%`);
      el.style.setProperty('--tilt', `${((current - 0.5) * -8).toFixed(2)}deg`);
      if (Math.abs(target - current) > 0.0005) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      target = Math.min(0.85, Math.max(0.12, (e.clientY - r.top) / r.height));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    host.addEventListener('pointermove', move);
    return () => {
      host.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 mix-blend-soft-light"
      style={
        {
          '--y': '38%',
          '--tilt': '0deg',
          background:
            'linear-gradient(calc(180deg + var(--tilt)), transparent calc(var(--y) - 16%), rgb(255 255 255 / 0.10) calc(var(--y) - 6%), rgb(255 255 255 / 0.55) var(--y), rgb(255 255 255 / 0.10) calc(var(--y) + 6%), transparent calc(var(--y) + 16%))',
        } as React.CSSProperties
      }
    />
  );
}
