import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs, CtaBand, Eyebrow, ServiceCard } from '@/components/Blocks';
import { HouseName } from '@/components/HouseName';
import { Journey } from '@/components/Journey';
import { Photo } from '@/components/Photo';
import { settingBySlug, settings } from '@/content/settings';
import { serviceById } from '@/content/services';
import { business } from '@/content/business';
import { asset } from '@/lib/asset';

export const dynamicParams = false;
export function generateStaticParams() {
  return settings.map((s) => ({ setting: s.slug }));
}
type Props = { params: Promise<{ setting: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const st = settingBySlug((await params).setting);
  if (!st) return {};
  return {
    title: { absolute: `${st.seo.title} | OKC Onsite Detailing` },
    description: st.seo.description,
    alternates: { canonical: `/settings/${st.slug}/` },
    openGraph: { images: [{ url: asset(`/img/${st.hero}-960.webp`) }] },
  };
}

export default async function SettingPage({ params }: Props) {
  const st = settingBySlug((await params).setting);
  if (!st) notFound();
  const svc = st.services.map((id) => serviceById(id)!);
  return (
    <>
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden pt-32 pb-16 md:pb-24">
        <Photo slug={st.hero} fill priority sizes="100vw" treatment="editorial" className="-z-20" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <div className="wrap max-w-4xl">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: st.house, href: `/settings/${st.slug}/` }]} />
          <HouseName as="h1" house={st.house} plain={st.plain} className="mt-8" houseClassName="text-[clamp(3.2rem,8vw,7rem)]" />
          <p className="lede mt-6">{st.lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/contact-us/?asset=${st.asset}`} className="btn btn-signal">Begin an introduction</Link>
            <a href={business.smsHref} className="btn btn-ghost">Text {business.phone}</a>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-[var(--line)] bg-ink-2 py-20 md:py-28">
        <img src={asset(`/art/${st.art}`)} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-50" loading="lazy" />
        <div className="wrap relative">
          <Eyebrow>What matters here</Eyebrow>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
            {st.matters.map((m) => (
              <li key={m.title} className="bg-ink-2/90 p-8 backdrop-blur-sm">
                <h2 className="display text-2xl md:text-3xl">{m.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-bone/70">{m.detail}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-mute">Background: generated illustration.</p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="wrap">
          <Eyebrow>Recent work, as photographed</Eyebrow>
          <div className="mt-10 grid grid-flow-dense auto-rows-[12rem] grid-cols-2 gap-3 md:auto-rows-[17rem] md:grid-cols-3">
            {st.gallery.map((slug, i) => (
              <figure key={slug} className={`relative overflow-hidden rounded-xl ${i === 0 ? 'row-span-2' : ''}`}>
                <Photo slug={slug} fill sizes="(min-width:768px) 33vw, 50vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-20 md:py-28">
        <div className="wrap">
          <Eyebrow>The services</Eyebrow>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {svc.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      <section className="paper py-20 md:py-24">
        <div className="wrap">
          <Eyebrow>What happens next</Eyebrow>
          <div className="mt-8"><Journey tone="paper" /></div>
          <p className="mt-8 text-sm text-ink/70">
            Arranging this on someone’s behalf? <Link className="underline" href="/for-managers/">For Household &amp; Flight Offices →</Link>
          </p>
        </div>
      </section>

      <CtaBand title={`${st.house}, arranged.`} />
    </>
  );
}
