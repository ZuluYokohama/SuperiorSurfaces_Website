'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Photo } from './Photo';
import type { Setting } from '@/content/settings';

/**
 * Five client settings, specialised by device:
 *  - phones: a swipeable row of portrait cards
 *  - tablets: a two-column grid of tiles
 *  - desktop: an editorial index, large names on the left, a sticky photograph that follows hover and focus
 */
export function SettingsIndex({ settings }: { settings: Setting[] }) {
  const [active, setActive] = useState(0);
  const st = settings[active];

  return (
    <>
      {/* Phone + tablet */}
      <ul className="snap-row md:mx-0 md:grid md:grid-flow-row md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 lg:hidden" aria-label="Settings">
        {settings.map((s, i) => (
          <li key={s.slug} className={i === settings.length - 1 ? 'md:col-span-2' : ''}>
            <Link href={`/settings/${s.slug}/`} className="relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl md:aspect-[4/3]">
              <Photo slug={s.hero} fill sizes="(min-width:768px) 50vw, 84vw" treatment="editorial" className="-z-20" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="p-5 md:p-6">
                <h3 className="display text-[length:var(--step-3)]">{s.house}</h3>
                <p className="mt-2 text-sm text-bone/75">{s.plain}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-mute md:hidden">Swipe to see all five settings.</p>

      {/* Desktop */}
      <div className="hidden gap-12 lg:grid lg:grid-cols-12">
        <ol className="lg:col-span-6" onMouseLeave={() => undefined}>
          {settings.map((s, i) => (
            <li key={s.slug} className="border-t border-[var(--line)] last:border-b">
              <Link
                href={`/settings/${s.slug}/`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-current={i === active ? 'true' : undefined}
                className="group block py-7"
              >
                <span className={`display block text-[clamp(2.6rem,4.6vw,4.5rem)] transition-colors duration-300 ${i === active ? 'text-bone' : 'text-bone/55 group-hover:text-bone/80'}`}>
                  {s.house}
                </span>
                <span className={`mt-2 block text-base transition-colors duration-300 ${i === active ? 'text-mute' : 'text-mute/80'}`}>{s.plain}</span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="lg:col-span-6">
          <div className="sticky top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-2">
              {settings.map((s, i) => (
                <div key={s.slug} className={`absolute inset-0 transition-opacity duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`} aria-hidden={i !== active}>
                  <Photo slug={s.hero} fill sizes="45vw" treatment="editorial" />
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-md text-bone/80" aria-live="polite">{st.lede}</p>
          </div>
        </div>
      </div>
    </>
  );
}
