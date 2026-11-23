import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs, CtaBand, Eyebrow, ServiceCard } from '@/components/Blocks';
import { Photo } from '@/components/Photo';
import { areaBySlug, areas } from '@/content/areas';
import { services } from '@/content/services';
import { business } from '@/content/business';

export const dynamicParams = false;
export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }));
}
type Props = { params: Promise<{ area: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = areaBySlug((await params).area);
  if (!a) return {};
  return {
    title: `Mobile Detailing, Ceramic Coating & Tint in ${a.name}, OK`,
    description: `Mobile detailing, paint correction, ceramic coating, PPF and window tint in ${a.name}, OK, performed on site by OKC Onsite Detailing. Call ${business.phone}.`,
    alternates: { canonical: `/service-areas/${a.slug}/` },
  };
}

export default async function AreaPage({ params }: Props) {
  const a = areaBySlug((await params).area);
  if (!a) notFound();
  return (
    <>
      <section className="relative isolate overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
        <Photo slug={a.image} fill priority sizes="100vw" className="-z-20" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="wrap max-w-3xl">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Service areas', href: '/service-areas/' }, { name: a.name, href: `/service-areas/${a.slug}/` }]} />
          <Eyebrow className="mt-8">{a.name}, Oklahoma</Eyebrow>
          <h1 className="display mt-5 text-[clamp(2.6rem,5.6vw,5rem)]">Detailing &amp; protection in <em>{a.name}</em>.</h1>
          <p className="lede mt-6">{a.note}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact-us/" className="btn btn-signal">Request a quote</Link>
            <a href={business.phoneHref} className="btn btn-ghost">{business.phone}</a>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="wrap">
          <Eyebrow>Available in {a.name}</Eyebrow>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>
      <CtaBand title={`Book on site in ${a.name}.`} />
    </>
  );
}
