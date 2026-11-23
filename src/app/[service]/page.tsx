import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Photo } from '@/components/Photo';
import { Breadcrumbs, CtaBand, Eyebrow, JsonLd, ServiceCard } from '@/components/Blocks';
import { CorrectionCompare } from '@/components/CorrectionCompare';
import { Journey } from '@/components/Journey';
import { HouseName } from '@/components/HouseName';
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

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-[4.5rem] sm:pt-28 md:pt-32">
        <div aria-hidden className="absolute inset-0 -z-10 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${asset(`/art/${signatureArt[s.id]}`)})` }} />
        <div className="wrap grid items-end gap-10 pb-16 lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-6">
            <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: s.name, href: `/${s.slug}/` }]} />
            <Eyebrow className="mt-8">{s.kicker}</Eyebrow>
            <HouseName as="h1" house={s.house} plain={s.title} className="mt-5" houseClassName="text-[length:var(--step-5)]" />
            <p className="lede mt-6">{s.lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/contact-us/?service=${s.slug}`} className="btn btn-signal">Request a quote</Link>
              <a href={business.phoneHref} className="btn btn-ghost">{business.phone}</a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] font-bold text-mute">
              <li>Fully mobile</li><li>Licensed &amp; insured</li><li>12+ years</li><li>1,500+ vehicles</li>
            </ul>
          </div>
          <div className="relative order-first -mx-5 aspect-[4/3] overflow-hidden sm:mx-0 sm:rounded-2xl md:aspect-[16/10] lg:order-none lg:col-span-6 lg:aspect-[5/6]">
            <Photo slug={s.hero} fill priority sizes="(min-width:1024px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Local → global map for this service */}
      <section className="border-y border-[var(--line)] bg-ink-2 py-20 md:py-28">
        <div className="wrap">
          <Eyebrow>Why it matters here</Eyebrow>
          <h2 className="display mt-5 max-w-3xl text-[length:var(--step-4)]">From Oklahoma conditions to the result you keep.</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
            <div className="bg-ink-2 p-7">
              <p className="font-medium text-mute">Local conditions</p>
              <ul className="mt-5 space-y-4">
                {story.conditions.map((c) => (
                  <li key={c.id}><p className="font-semibold">{c.label}</p><p className="mt-1 text-sm text-bone/60">{c.gloss}</p></li>
                ))}
              </ul>
            </div>
            <div className="bg-ink-2 p-7">
              <p className="font-medium text-mute">What we treat</p>
              <ul className="mt-5 space-y-4">
                {story.mechanisms.map((m) => (
                  <li key={m.id}><p className="font-semibold">{m.label}</p><p className="mt-1 text-sm text-bone/60">{m.gloss}</p></li>
                ))}
              </ul>
            </div>
            <div className="bg-ink-2 p-7">
              <p className="font-medium text-mute">The result</p>
              <ul className="mt-5 space-y-4">
                {story.expressions.map((e) => (
                  <li key={e.id}><p className="display text-2xl text-champagne">{e.label}</p><p className="mt-1 text-sm text-bone/60">{e.gloss}</p></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-mute">
            <span>Ideal for:</span>
            {s.forWhom.map((f) => <span key={f} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-bone/80">{f}</span>)}
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="paper py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>The method</Eyebrow>
            <h2 className="display mt-5 text-[length:var(--step-4)]">How the work is done.</h2>
            <p className="mt-5 text-ink/70">Disciplines in play: {story.disciplines.map((d) => `${d.label} (${d.plain?.toLowerCase()})`).join(' · ')}.</p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:col-span-8">
            {s.method.map((m, i) => (
              <li key={m.step} className="bg-paper p-7">
                <span className="text-sm font-medium text-ink/70 tabular-nums">0{i + 1}</span>
                <h3 className="display mt-3 text-2xl">{m.step}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/70">{m.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {s.id === 's-correction' && (
        <section className="py-20 md:py-28">
          <div className="wrap grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>Seeing the difference</Eyebrow>
              <h2 className="display mt-5 text-[length:var(--step-4)]">One light. Two surfaces.</h2>
              <p className="lede mt-6">Drag across the panel. The swirled side breaks one light into a halo of arcs; the corrected side gives it back as a single point. That’s the difference you see on a sunny afternoon.</p>
            </div>
            <CorrectionCompare />
          </div>
        </section>
      )}

      {s.id === 's-ceramic' && (
        <section className="relative overflow-hidden py-24 md:py-32">
          <img src={asset('/art/beading.webp')} alt="" aria-hidden className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70" loading="lazy" />
          <div className="wrap">
            <div className="max-w-xl rounded-2xl border border-[var(--line)] bg-ink/80 p-8 backdrop-blur-md md:p-10">
              <Eyebrow>Self-cleaning behaviour</Eyebrow>
              <h2 className="display mt-5 text-[length:var(--step-4)]">Never wax your car again.</h2>
              <p className="mt-5 text-bone/75">A cured coating is hydrophobic: water gathers into tight beads and rolls off, carrying dirt with it. Washing becomes a rinse-and-dry, and the gloss stays deep between visits.</p>
              <p className="mt-4 text-xs text-mute">Background: generated illustration of hydrophobic beading.</p>
            </div>
          </div>
        </section>
      )}

      {/* Packages */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <Eyebrow>Packages &amp; investment</Eyebrow>
          <h2 className="display mt-5 text-[length:var(--step-4)]">Choose your level of care.</h2>
          {s.packagesIntro && <p className="mt-4 max-w-2xl text-bone/70">{s.packagesIntro}</p>}
          <div className={`mt-10 ${s.packages.length > 1 ? 'snap-row md:mx-0 md:grid md:grid-flow-row md:overflow-visible md:px-0' : 'grid'} md:gap-5 ${s.packages.length >= 3 ? 'md:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2'}`}>
            {s.packages.map((p) => (
              <article key={p.name} className={`flex flex-col rounded-2xl border p-8 ${p.featured ? 'border-champagne/60 bg-ink-2' : 'border-[var(--line)]'}`}>
                <div className="flex items-start justify-between gap-4">
                  <h3>
                    <span className="display block text-3xl">{p.house}</span>
                    <span className="mt-1 block text-[0.8125rem] font-bold text-mute">{p.name}</span>
                  </h3>
                  {p.featured && <span className="shrink-0 rounded-full border border-champagne/60 px-3 py-1 text-[0.8125rem] font-medium text-champagne">Most chosen</span>}
                </div>
                {p.price && <p className="mt-4 text-2xl font-semibold tabular-nums text-champagne">{p.price}</p>}
                <p className="mt-4 text-sm leading-relaxed text-bone/70">{p.summary}</p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-[var(--line)] pt-6 text-sm">
                  {p.includes.map((i) => (
                    <li key={i} className="flex gap-3"><span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-bone/40" />{i}</li>
                  ))}
                </ul>
                {p.note && <p className="mt-6 text-xs text-mute">{p.note}</p>}
                <Link href={`/contact-us/?service=${s.slug}`} className={`btn mt-8 ${p.featured ? 'btn-signal' : 'btn-ghost'}`}>Request this package</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {s.materials && (
        <section className="border-y border-[var(--line)] bg-ink-2 py-20 md:py-24">
          <div className="wrap grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Specification</Eyebrow>
              <h2 className="display mt-5 text-4xl">{s.materials.title}</h2>
              <p className="mt-4 text-sm text-mute">Named precisely, so you know exactly what is on your finish.</p>
            </div>
            <div className="lg:col-span-7">
              <p className="text-bone/80">{s.materials.body}</p>
              {s.materials.points && (
                <dl className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)] text-[0.82rem]">
                  {s.materials.points.map((pt, i) => (
                    <div key={pt} className="flex gap-6 py-3">
                      <dt className="w-10 shrink-0 text-mute tabular-nums">{String(i + 1).padStart(2, '0')}</dt>
                      <dd className="text-bone/85">{pt}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <Eyebrow>Recent work</Eyebrow>
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
        <section className="paper py-20 md:py-28">
          <div className="wrap grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Questions</Eyebrow>
              <h2 className="display mt-5 text-4xl">Asked by Oklahoma City owners.</h2>
            </div>
            <div className="divide-y divide-[var(--line)] border-y border-[var(--line)] lg:col-span-8">
              {s.faq.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold">
                    {f.q}<span aria-hidden className="mt-1 text-ink/50 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed text-ink/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-[var(--line)] py-20 md:py-24">
        <div className="wrap">
          <Eyebrow>What happens next</Eyebrow>
          <div className="mt-8"><Journey /></div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="wrap">
          <Eyebrow>Often paired with</Eyebrow>
          <div className="mt-10 snap-row md:mx-0 md:grid md:grid-flow-row md:overflow-visible md:px-0 md:grid-cols-3 md:gap-5">
            {related.map((r) => <ServiceCard key={r.slug} service={r} />)}
          </div>
        </div>
      </section>

      <CtaBand title={`Arrange ${s.house}.`} preset={s.slug} />
      <JsonLd data={serviceLd(s)} />
      {faq && <JsonLd data={faq} />}
    </>
  );
}
