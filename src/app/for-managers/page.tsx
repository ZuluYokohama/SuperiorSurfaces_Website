import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow } from '@/components/Blocks';
import { HouseName } from '@/components/HouseName';
import { PrintButton } from '@/components/PrintButton';
import { business } from '@/content/business';
import { liveDelegateItems } from '@/content/delegates';
import { services } from '@/content/services';
import { settings } from '@/content/settings';

export const metadata: Metadata = {
  title: 'For Household & Flight Offices: Vendor Brief',
  description: 'A one-page vendor brief for house managers, chief pilots, executive assistants and family offices arranging detailing in Oklahoma City.',
  alternates: { canonical: '/for-managers/' },
};

export default function ForManagers() {
  const items = liveDelegateItems();
  return (
    <section className="pt-32 pb-24 md:pt-40 print:pt-0 print:pb-0">
      <div className="wrap max-w-5xl print:w-full print:max-w-none">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <Eyebrow>Vendor brief</Eyebrow>
            <HouseName as="h1" house="For Household & Flight Offices" plain="House managers, chief pilots, executive assistants & family offices" className="mt-6" houseClassName="text-[clamp(2.4rem,5vw,4.4rem)] print:text-4xl" />
          </div>
          <PrintButton />
        </div>
        <p className="lede mt-8 print:mt-3 print:text-sm">
          If you arrange care for someone else’s vehicles, aircraft or vessels, this page is the brief: who we are, how we work and how to reach us. It prints to a single page.
        </p>

        <dl className="mt-12 print:mt-5 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 print:border-black/20">
          {items.map((it) => (
            <div key={it.title} className="bg-ink-2 p-6 print:bg-white print:p-3">
              <dt className="font-semibold">{it.title}</dt>
              <dd className="mt-2 t-small leading-relaxed tone-2 print:text-black/70">{it.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-10 md:grid-cols-3 print:mt-5 print:grid-cols-3 print:gap-6 print:text-[0.8rem]">
          <div>
            <p className="eyebrow">Contact</p>
            <p className="mt-3 text-xl font-semibold tabular-nums">{business.phone}</p>
            <p className="t-small">Call or text · <a className="link-u break-all" href={`mailto:${business.email}`}>{business.email}</a></p>
            <dl className="mt-4 space-y-1 t-small text-mute">
              {business.hours.map((h) => <div key={h.days} className="flex justify-between gap-4"><dt>{h.days}</dt><dd>{h.time}</dd></div>)}
            </dl>
          </div>
          <div>
            <p className="eyebrow">Services</p>
            <ul className="mt-3 space-y-1 t-small">
              {services.map((s) => <li key={s.slug}>{s.house} <span className="text-mute">· {s.name}</span></li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Where we work</p>
            <ul className="mt-3 space-y-1 t-small">
              {settings.map((s) => <li key={s.slug}>{s.house} <span className="text-mute">· {s.plain}</span></li>)}
            </ul>
            <p className="mt-3 t-small text-mute">Oklahoma City, Edmond, Nichols Hills, Arcadia, Yukon and surrounding areas. Fully mobile.</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3 print:hidden">
          <Link href="/contact-us/" className="btn btn-signal">Begin an introduction</Link>
          <a href={business.smsHref} className="btn btn-ghost">Text {business.phone}</a>
        </div>
        <p className="mt-6 hidden t-small print:block">{business.legalName} · {business.url}</p>
      </div>
    </section>
  );
}
