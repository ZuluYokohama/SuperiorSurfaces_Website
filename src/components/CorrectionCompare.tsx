'use client';

import { useState } from 'react';
import { asset } from '@/lib/asset';

/** Generated before/after: the same point light on marred and on corrected clear coat. */
export function CorrectionCompare() {
  const [v, setV] = useState(52);
  return (
    <figure className="relative">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--line)]">
        <img src={asset('/art/panel-corrected.svg')} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }}>
          <img src={asset('/art/panel-marred.svg')} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div aria-hidden className="absolute inset-y-0 w-px bg-bone/70" style={{ left: `${v}%` }}>
          <span className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-bone/60 bg-ink/70 t-small backdrop-blur">⟷</span>
        </div>
        <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1 t-small font-semibold backdrop-blur">Marred</span>
        <span className="absolute right-4 bottom-4 rounded-full bg-ink/70 px-3 py-1 t-small font-semibold backdrop-blur">Corrected</span>
        <input
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          aria-label="Compare marred and corrected paint"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-3 t-small text-mute">
        Illustration, generated: one light source on swirled clear coat (left) and on corrected clear coat (right). Swirls scatter light into a hazy halo; a levelled surface returns a single crisp point.
      </figcaption>
    </figure>
  );
}
