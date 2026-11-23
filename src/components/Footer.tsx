import Link from 'next/link';
import { business } from '@/content/business';
import { services } from '@/content/services';
import { areas } from '@/content/areas';
import { asset } from '@/lib/asset';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] bg-ink-2">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${asset('/art/contours.svg')})` }} />
      <div className="wrap relative grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <img src={asset('/brand/logo.png')} alt={business.name} width={386} height={137} className="h-11 w-auto" loading="lazy" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-mute">
            Finish Stewardship: detailing, correction and protection for automobiles, aircraft, boats and coaches across Oklahoma City, performed where they live.
          </p>
          <div className="mt-6 flex gap-5 text-sm font-semibold">
            <a className="link-u" href={business.social.instagram} rel="noopener" target="_blank">Instagram</a>
            <a className="link-u" href={business.social.facebook} rel="noopener" target="_blank">Facebook</a>
          </div>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4">Services</p>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link className="link-u" href={`/${s.slug}/`}>{s.house}</Link> <span className="text-mute">· {s.name}</span></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-4">Areas</p>
          <ul className="space-y-2 text-sm">
            <li><Link className="link-u" href="/service-areas/">Oklahoma City</Link></li>
            {areas.map((a) => (
              <li key={a.slug}><Link className="link-u" href={`/service-areas/${a.slug}/`}>{a.name}</Link></li>
            ))}
          </ul>
          <p className="eyebrow mt-8 mb-4">Offices</p>
          <Link className="link-u text-sm" href="/for-managers/">For Household &amp; Flight Offices</Link>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4">Contact</p>
          <address className="space-y-2 text-sm not-italic">
            <a className="block text-lg font-semibold tabular-nums" href={business.phoneHref}>{business.phone}</a>
            <a className="link-u block break-all" href={`mailto:${business.email}`}>{business.email}</a>
            <p className="pt-2 text-mute">
              {business.studio.street}<br />
              {business.studio.locality}, {business.studio.region} {business.studio.postalCode}
            </p>
          </address>
          <dl className="mt-5 space-y-1 text-sm text-mute">
            {business.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4"><dt>{h.days}</dt><dd className="tabular-nums">{h.time}</dd></div>
            ))}
          </dl>
        </div>
      </div>
      <div className="wrap relative flex flex-col gap-2 border-t border-[var(--line)] py-6 text-xs text-mute sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {business.legalName}. Licensed &amp; insured.</p>
        <Link className="link-u" href="/privacy-policy/">Privacy policy</Link>
      </div>
    </footer>
  );
}
