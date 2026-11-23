import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs, CtaBand, ServiceCard } from '@/components/Blocks';
import { SectionHead } from '@/components/SectionHead';
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
          <HouseName as="h1" house={st.house} plain={st.plain} className="mt-8" houseClassName="text-[length:var(--step-5)]" />
          <p className="t-lede tone-2 mt-6">{st.lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/contact-us/?asset=${st.asset}`} className="btn btn-signal">Begin an introduction</Link>
            <a href={business.smsHref} className="btn btn-ghost">Text {business.phone}</a>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-[var(--line)] bg-ink-2 section">
        <img src={asset(`/art/${st.art.replace('.svg', '.webp')}`)} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-35" loading="lazy" />
        <div className="wrap relative">
          <h2 className="t-h2">What matters here</h2>
          <ul className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {st.matters.map((m) => (
              <li key={m.title} className="border-t border-[var(--line-strong)] pt-5">
                <h3 className="t-name">{m.title}</h3>
                <p className="t-body tone-2 mt-3">{m.detail}</p>
              </li>
            ))}
          </ul>
          <p className="t-small tone-2 mt-10">Background: generated illustration.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead title="Recent work" intro="Shown as photographed, without retouching." />
          <div className="mt-10 snap-row md:mx-0 md:grid md:grid-flow-row md:overflow-visible md:px-0 md:grid-flow-dense md:auto-rows-[17rem] md:grid-cols-3 md:gap-3">
            {st.gallery.map((slug, i) => (
              <figure key={slug} className={`relative aspect-[4/5] overflow-hidden rounded-xl md:aspect-auto ${i === 0 ? 'md:row-span-2' : ''}`}>
                <Photo slug={slug} fill sizes="(min-width:768px) 33vw, 50vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] section">
        <div className="wrap">
          <h2 className="t-h2">The services</h2>
          <div className="mt-10 snap-row md:mx-0 md:grid md:grid-flow-row md:overflow-visible md:px-0 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {svc.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      <section className="paper section-tight">
        <div className="wrap">
          <h2 className="t-h2">What happens next</h2>
          <div className="mt-10"><Journey /></div>
          <p className="t-small tone-2 mt-6">
            Arranging this on someone’s behalf? <Link className="underline" href="/for-managers/">For Household &amp; Flight Offices</Link>
          </p>
        </div>
      </section>

      <CtaBand title={`${st.house}, arranged`} />
    </>
  );
}
