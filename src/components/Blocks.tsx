import Link from 'next/link';
import { business } from '@/content/business';
import type { Service } from '@/content/services';
import { Photo } from './Photo';
import { asset } from '@/lib/asset';

export function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function ProofBar({ className = '' }: { className?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-4 ${className}`}>
      {business.proof.map((p) => (
        <div key={p.label} className="bg-ink/80 px-5 py-5 backdrop-blur-sm">
          <dt className="sr-only">{p.label}</dt>
          <dd>
            <span className="display block text-3xl text-champagne md:text-4xl">{p.value}</span>
            <span className="mt-1 block text-[0.8125rem] font-bold text-mute">{p.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function fromPrice(s: Service) {
  const priced = s.packages.find((p) => p.price);
  return priced ? `From ${priced.price!.split('–')[0].trim()}` : 'Quoted on inspection';
}

export function ServiceCard({ service, tall }: { service: Service; tall?: boolean }) {
  return (
    <Link href={`/${service.slug}/`} className="group relative block overflow-hidden rounded-2xl border border-[var(--line)] bg-ink-2">
      <div className={`relative ${tall ? 'aspect-[4/5]' : 'aspect-[4/3]'} overflow-hidden`}>
        <Photo slug={service.hero} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" imgClassName="transition duration-[1.2s] ease-out group-hover:scale-[1.04]" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-[0.8125rem] font-bold text-champagne">{service.kicker}</p>
        <h3 className="mt-2">
          <span className="display block text-3xl">{service.house}</span>
          <span className="mt-1 block text-xs font-semibold text-bone/60">{service.name}</span>
        </h3>
        <p className="mt-2 flex items-center justify-between text-sm text-bone/70">
          <span>{fromPrice(service)}</span>
        </p>
      </div>
    </Link>
  );
}

export function CtaBand({ title = 'Tell us what you’re caring for.', preset }: { title?: string; preset?: string }) {
  return (
    <section className="relative overflow-hidden border-y border-[var(--line)]">
      <img src={asset('/art/gloss-field.webp')} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="wrap relative flex flex-col items-start gap-8 py-20 md:flex-row md:items-end md:justify-between md:py-28">
        <div>
          <Eyebrow>Complimentary quote</Eyebrow>
          <h2 className="display mt-5 max-w-2xl text-[length:var(--step-4)]">{title}</h2>
          <p className="mt-4 text-bone/70">Quotes within one business day. Mon–Fri 8–6, Sat 8–3.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={preset ? `/contact-us/?service=${preset}` : '/contact-us/'} className="btn btn-signal">Request a quote</Link>
          <a href={business.phoneHref} className="btn btn-ghost">{business.phone}</a>
        </div>
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-mute">
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((it, i) => (
          <li key={it.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i === items.length - 1 ? <span aria-current="page" className="text-bone/80">{it.name}</span> : <Link className="link-u inline-block py-2.5 lg:py-0" href={it.href}>{it.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
