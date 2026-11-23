'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { business } from '@/content/business';
import { services, families } from '@/content/services';
import { settings } from '@/content/settings';

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid || open ? 'border-b border-[var(--line)] bg-ink/95 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-bone focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <div className="wrap flex h-18 items-center justify-between gap-6 py-3">
        <Link href="/" className="shrink-0" aria-label={`${business.name}, home`} onClick={() => setOpen(false)}>
          <img src="/brand/logo.png" alt={business.name} width={386} height={137} className="h-9 w-auto md:h-10" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 text-[0.8rem] font-semibold tracking-[0.08em] lg:flex">
          <div className="group relative">
            <button className="flex items-center gap-1.5 py-3 uppercase" aria-haspopup="true">
              Services <span aria-hidden className="text-mute transition group-hover:rotate-180">▾</span>
            </button>
            <div className="invisible absolute left-1/2 top-full w-[40rem] -translate-x-1/2 translate-y-2 rounded-xl border border-[var(--line)] bg-ink-2/95 p-6 opacity-0 shadow-2xl backdrop-blur-md transition duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-3 gap-6">
                {families.map((fam) => (
                  <div key={fam}>
                    <p className="mb-3 text-[0.66rem] uppercase tracking-[0.2em] text-mute">{fam}</p>
                    <ul className="space-y-2 text-sm font-medium normal-case tracking-normal">
                      {services.filter((s) => s.family === fam).map((s) => (
                        <li key={s.slug}>
                          <Link className="group/l block" href={`/${s.slug}/`}>
                            <span className="link-u">{s.house}</span>
                            <span className="block text-xs text-mute">{s.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="group relative">
            <button className="flex items-center gap-1.5 py-3 uppercase" aria-haspopup="true">
              Settings <span aria-hidden className="text-mute transition group-hover:rotate-180">▾</span>
            </button>
            <div className="invisible absolute left-1/2 top-full w-[22rem] -translate-x-1/2 translate-y-2 rounded-xl border border-[var(--line)] bg-ink-2/95 p-6 opacity-0 shadow-2xl backdrop-blur-md transition duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <ul className="space-y-3 text-sm font-medium normal-case tracking-normal">
                {settings.map((st) => (
                  <li key={st.slug}>
                    <Link className="block" href={`/settings/${st.slug}/`}>
                      <span className="link-u">{st.house}</span>
                      <span className="block text-xs text-mute">{st.plain}</span>
                    </Link>
                  </li>
                ))}
                <li className="border-t border-[var(--line)] pt-3">
                  <Link className="block" href="/for-managers/">
                    <span className="link-u">For Household &amp; Flight Offices</span>
                    <span className="block text-xs text-mute">House managers, chief pilots, family offices</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Link className="link-u uppercase" href="/care-atlas/">Care Atlas</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a href={business.phoneHref} className="hidden text-sm font-semibold tabular-nums md:block">{business.phone}</a>
          <Link href="/contact-us/" className="btn btn-signal hidden !min-h-10 !px-5 sm:inline-flex">Request</Link>
          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-strong)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span className={`absolute left-0 h-px w-5 bg-bone transition ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-px w-5 bg-bone transition ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-[var(--line)] bg-ink lg:hidden">
          <div className="wrap space-y-8 py-8">
            {families.map((fam) => (
              <div key={fam}>
                <p className="eyebrow mb-3">{fam}</p>
                <ul className="space-y-1">
                  {services.filter((s) => s.family === fam).map((s) => (
                    <li key={s.slug}>
                      <Link onClick={() => setOpen(false)} className="block py-1.5" href={`/${s.slug}/`}>
                        <span className="display block text-3xl">{s.house}</span>
                        <span className="block text-xs uppercase tracking-[0.14em] text-mute">{s.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="eyebrow mb-3">Settings</p>
              <ul className="space-y-2 text-lg">
                {settings.map((st) => (
                  <li key={st.slug}><Link onClick={() => setOpen(false)} href={`/settings/${st.slug}/`}>{st.house}</Link></li>
                ))}
                <li><Link onClick={() => setOpen(false)} href="/for-managers/">For Household &amp; Flight Offices</Link></li>
              </ul>
            </div>
            <div className="grid gap-3 border-t border-[var(--line)] pt-6 text-lg">
              <Link onClick={() => setOpen(false)} href="/care-atlas/">Care Atlas</Link>
              <Link onClick={() => setOpen(false)} href="/service-areas/">Service areas</Link>
              <a href={business.phoneHref}>{business.phone}</a>
            </div>
            <Link onClick={() => setOpen(false)} href="/contact-us/" className="btn btn-signal w-full">Request a quote</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
