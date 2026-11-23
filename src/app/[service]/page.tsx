import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Photo } from '@/components/Photo';
import { Breadcrumbs, CtaBand, JsonLd, ServiceCard } from '@/components/Blocks';
import { CorrectionCompare } from '@/components/CorrectionCompare';
import { Journey } from '@/components/Journey';
import { HouseName } from '@/components/HouseName';
import { SectionHead } from '@/components/SectionHead';
import { services, serviceBySlug } from '@/content/services';
import { serviceStory } from '@/content/lexicon';
import { business } from '@/content/business';
import { faqLd, serviceLd } from '@/content/schema';
import { asset } from '@/lib/asset';

export const dynamicParams = false;

const signatureArt: Record<string, string> = {
  's-tint': 'cool-glass.webp',
  's-ppf': 'second-skin.webp',
  's-marine': 'waterline.webp',
  's-aircraft': 'flight-line.webp',
  's-rv': 'large-format.webp',
  's-mobile': 'gloss-field.webp',
  's-ceramic': 'beading.webp',
  's-correction': 'gloss-field.webp',
};
export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

type Props = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = serviceBySlug((await params).service);
  if (!s) return {};
  return {
    title: { absolute: s.seo.title },
    description: s.seo.description,
    alternates: { canonical: `/${s.slug}/` },
    openGraph: { title: s.seo.title, description: s.seo.description, images: [{ url: asset(`/img/${s.hero}-960.webp`) }] },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = serviceBySlug((await params).service);
  if (!s) notFound();
  const story = serviceStory(s.id);
  const related = services.filter((o) => o.slug !== s.slug && o.family === s.family).concat(services.filter((o) => o.family !== s.family)).slice(0, 3);
  const faq = faqLd(s);

  const storyCols = [
    { title: 'Oklahoma conditions', items: story.conditions },
    { title: 'What they do to a surface', items: story.mechanisms },
    { title: 'What you keep', items: story.expressions },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-[4.5rem] sm:pt-28 md:pt-32">
        <img src={asset(`/art/${signatureArt[s.id]}`)} alt="" aria-hidden fetchPriority="low" decoding="async" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" />
        <div className="wrap grid items-end gap-10 pb-16 lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-6">
            <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: s.name, href: `/${s.slug}/` }]} />
            <HouseName as="h1" house={s.house} plain={s.title} className="mt-6" houseClassName="text-[length:var(--step-5)]" />
            <p className="t-lede tone-2 mt-6">{s.lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/contact-us/?service=${s.slug}`} className="btn btn-signal">Request a quote</Link>
              <a href={business.phoneHref} className="btn btn-ghost">{business.phone}</a>
            </div>
            <p className="t-small tone-2 mt-8">Fully mobile, licensed and insured, with twelve years and more than 1,500 vehicles behind us.</p>
          </div>
          <div className="relative order-first -mx-5 aspect-[4/3] overflow-hidden sm:mx-0 sm:rounded-2xl md:aspect-[16/10] lg:order-none lg:col-span-6 lg:aspect-[5/6]">
            <Photo slug={s.hero} fill priority sizes="(min-width:1024px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Local conditions → mechanisms → outcomes, as a three-column comparison */}
      <section className="border-y border-[var(--line)] bg-ink-2 section">
        <div className="wrap">
          <SectionHead title="Why it matters in Oklahoma" intro={<>Ideal for {s.forWhom.map((f) => f.toLowerCase()).join('; ')}.</>} />
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[var(--line)]">
            {storyCols.map((col, ci) => (
              <div key={col.title} className={ci === 0 ? 'md:pr-8' : ci === 1 ? 'md:px-8' : 'md:pl-8'}>
                <h3 className="t-h3 border-b border-[var(--line)] pb-3">{col.title}</h3>
                <dl className="mt-5 space-y-5">
                  {col.items.map((it) => (
                    <div key={it.id}>
                      <dt className={ci === 2 ? 't-name text-champagne' : 'font-semibold'}>{it.label}</dt>
                      <dd className="t-small tone-2 mt-1">{it.gloss}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method: a real sequence, so it is numbered */}
      <section className="paper section">
        <div className="wrap">
          <SectionHead
            title="How the work is done"
            intro={<>Disciplines in play: {story.disciplines.map((d) => `${d.label} (${d.plain?.toLowerCase()})`).join(', ')}.</>}
          />
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {s.method.map((m, i) => (
              <li key={m.step} className="border-t border-[var(--line-strong)] pt-5">
                <p className="t-small tone-2 tabular-nums">Step {i + 1}</p>
                <h3 className="t-name mt-2">{m.step}</h3>
                <p className="t-body tone-2 mt-3">{m.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {s.id === 's-correction' && (
        <section className="section">
          <div className="wrap grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="t-h2">One light, two surfaces</h2>
              <p className="t-lede tone-2 mt-6">Drag across the panel. The swirled side breaks one light into a halo of arcs; the corrected side gives it back as a single point. That’s the difference you see on a sunny afternoon.</p>
            </div>
            <CorrectionCompare />
          </div>
        </section>
      )}

      {s.id === 's-ceramic' && (
        <section className="relative overflow-hidden section">
          <img src={asset('/art/beading.webp')} alt="" aria-hidden className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70" loading="lazy" />
          <div className="wrap">
            <div className="max-w-xl rounded-2xl border border-[var(--line)] bg-ink/85 p-8 backdrop-blur-md md:p-10">
              <h2 className="t-h2">Never wax your car again</h2>
              <p className="t-body tone-2 mt-5">A cured coating is hydrophobic: water gathers into tight beads and rolls off, carrying dirt with it. Washing becomes a rinse-and-dry, and the gloss stays deep between visits.</p>
              <p className="t-small tone-2 mt-4">Background: generated illustration of hydrophobic beading.</p>
            </div>
          </div>
        </section>
      )}

      {/* Packages */}
      <section className="section">
        <div className="wrap">
          <SectionHead title="Packages and prices" intro={s.packagesIntro} />
          <div className={`mt-12 ${s.packages.length > 1 ? 'snap-row md:mx-0 md:grid md:grid-flow-row md:overflow-visible md:px-0' : 'grid max-w-2xl'} md:gap-5 >= 3 'md:grid-cols-2 xl:grid-cols-3' 'md:grid-cols-2'}`}>
            {s.packages.map((p) => (
              <article key={p.name} className={`flex flex-col rounded-2xl border p-7 md:p-8 ${p.featured ? 'border-champagne/60 bg-ink-2' : 'border-[var(--line)]'}`}>
                <div className="flex items-start justify-between gap-4">
                  <h3>
                    <span className="t-name block">{p.house}</span>
                    <span className="t-small tone-2 mt-1 block">{p.name}</span>
                  </h3>
                  {p.featured && <span className="t-small shrink-0 rounded-full border border-champagne/60 px-3 py-0.5 text-champagne">Most chosen</span>}
                </div>
                {p.price && <p className="mt-5 text-[length:var(--step-2)] font-semibold tabular-nums text-champagne">{p.price}</p>}
                <p className="t-body tone-2 mt-4">{p.summary}</p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-[var(--line)] pt-6">
                  {p.includes.map((i) => (
                    <li key={i} className="flex gap-3"><span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-current opacity-40" />{i}</li>
                  ))}
                </ul>
                {p.note && <p className="t-small tone-2 mt-6">{p.note}</p>}
                <Link href={`/contact-us/?service=${s.slug}`} className={`btn mt-8 ${p.featured ? 'btn-signal' : 'btn-ghost'}`}>Request this package</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {s.materials && (
        <section className="border-y border-[var(--line)] bg-ink-2 section-tight">
          <div className="wrap grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="t-h2">{s.materials.title}</h2>
              <p className="t-small tone-2 mt-4">Named precisely, so you know exactly what is on your finish.</p>
            </div>
            <div className="lg:col-span-7">
              <p className="t-body">{s.materials.body}</p>
              {s.materials.points && (
                <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                  {s.materials.points.map((pt) => (
                    <li key={pt} className="border-t border-[var(--line)] py-3">{pt}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="section">
        <div className="wrap">
          <h2 className="t-h2">Recent work</h2>
          <div className="mt-10 snap-row md:mx-0 md:grid md:grid-flow-row md:overflow-visible md:px-0 md:auto-rows-[16rem] md:grid-cols-3 md:gap-3">
            {s.gallery.map((slug, i) => (
              <figure key={slug} className={`relative aspect-[4/5] overflow-hidden rounded-xl md:aspect-auto ${i === 0 ? 'md:row-span-2' : ''}`}>
                <Photo slug={slug} fill sizes="(min-width:768px) 33vw, 50vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {s.faq && (
        <section className="paper section">
          <div className="wrap grid gap-10 lg:grid-cols-12">
            <h2 className="t-h2 lg:col-span-4">Questions owners ask</h2>
            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)] lg:col-span-8">
              {s.faq.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="t-h3 flex cursor-pointer list-none items-start justify-between gap-6">
                    {f.q}<span aria-hidden className="tone-2 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="t-body tone-2 mt-4">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-[var(--line)] section-tight">
        <div className="wrap">
          <h2 className="t-h2">What happens next</h2>
          <div className="mt-10"><Journey /></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="t-h2">Often paired with</h2>
          <div className="mt-10 snap-row md:mx-0 md:grid md:grid-flow-row md:overflow-visible md:px-0 md:grid-cols-3 md:gap-5">
            {related.map((r) => <ServiceCard key={r.slug} service={r} />)}
          </div>
        </div>
      </section>

      <CtaBand title={`Arrange ${s.house}`} preset={s.slug} />
      <JsonLd data={serviceLd(s)} />
      {faq && <JsonLd data={faq} />}
    </>
  );
}
