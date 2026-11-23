import Link from 'next/link';
import { Photo } from '@/components/Photo';
import { CtaBand, Eyebrow, ProofBar, ServiceCard } from '@/components/Blocks';
import { ConceptGraph } from '@/components/ConceptGraph';
import { CorrectionCompare } from '@/components/CorrectionCompare';
import { Reviews } from '@/components/Reviews';
import { Journey } from '@/components/Journey';
import { ASSETS } from '@/content/assets';
import { business } from '@/content/business';
import { serviceById } from '@/content/services';
import { nodes } from '@/content/lexicon';
import { areas } from '@/content/areas';

const disciplines = nodes.filter((n) => n.layer === 'discipline');
const largeFormat = ['s-aircraft', 's-marine', 's-rv'].map((id) => serviceById(id)!);
const automotive = ['s-correction', 's-ceramic', 's-ppf', 's-tint', 's-mobile'].map((id) => serviceById(id)!);
const portfolio = ['bentley-burl', 'malibu-flake', 'jet-wing-technician', 'lamborghini-satin', 'combine-cab', 'continental-classic', 'boat-bow-reflection', 'g-wagon-studio'];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pt-28 pb-10 md:pb-14">
        <Photo slug="jet-sunset" fill priority sizes="100vw" className="-z-20" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/55 to-transparent" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-ink/45 md:hidden" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[url(/art/gloss-field.svg)] bg-cover bg-center opacity-20 mix-blend-screen" />
        <div className="wrap">
          <div className="reveal max-w-3xl">
            <Eyebrow>Oklahoma City · Aviation · Marine · Automotive</Eyebrow>
            <h1 className="display mt-6 text-[clamp(2.7rem,7vw,6.2rem)]">
              The standard of care for Oklahoma’s <em>finest</em> machines.
            </h1>
            <p className="lede mt-6">
              Detailing, paint correction and long-term protection for automobiles, aircraft, boats and coaches, performed at your home, hangar or marina by a licensed, insured team with twelve years in the craft.
            </p>
            <div className="mt-8">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-bone/70">What are you caring for?</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {ASSETS.map((a) => (
                  <li key={a.id}>
                    <Link href={`/contact-us/?asset=${a.id}`} className="inline-block rounded-full border border-bone/30 bg-ink/40 px-4 py-2 text-sm backdrop-blur-sm transition hover:border-signal hover:bg-signal hover:text-white">{a.label}</Link>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-bone/70">
                Or speak to the team directly: <a className="link-u font-semibold text-bone" href={business.phoneHref}>call</a> or <a className="link-u font-semibold text-bone" href={business.smsHref}>text {business.phone}</a>
              </p>
            </div>
          </div>
          <ProofBar className="mt-14 max-w-4xl" />
        </div>
      </section>

      {/* Four disciplines */}
      <section className="paper py-24 md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Our method</Eyebrow>
            <h2 className="display mt-5 text-4xl md:text-6xl">Four disciplines. <em>One</em> standard.</h2>
            <p className="lede mt-6">
              Every surface we touch, from a Bentley’s burl-wood console to a jet’s leading edge, passes through the same four disciplines, in this order and never skipped.
            </p>
            <Link href="/care-atlas/" className="link-u mt-8 inline-block text-sm font-bold uppercase tracking-[0.14em]">Read the Care Atlas →</Link>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:col-span-7">
            {disciplines.map((d, i) => (
              <li key={d.id} className="bg-paper p-8">
                <span className="display text-5xl text-signal">0{i + 1}</span>
                <h3 className="display mt-6 text-3xl">{d.label}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">{d.gloss}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Large format */}
      <section className="py-24 md:py-32">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>We go big</Eyebrow>
              <h2 className="display mt-5 max-w-2xl text-4xl md:text-6xl">Aircraft, vessels &amp; <em>coaches</em>.</h2>
            </div>
            <p className="max-w-md text-bone/70">
              Specialist chemistry and methods for finishes that a car detailer should never improvise on, delivered at the hangar, the lake or the depot.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {largeFormat.map((s) => <ServiceCard key={s.slug} service={s} tall />)}
          </div>
        </div>
      </section>

      {/* Light tells the truth */}
      <section className="border-y border-[var(--line)] bg-ink-2 py-24 md:py-32">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <CorrectionCompare />
          <div>
            <Eyebrow>Paint correction</Eyebrow>
            <h2 className="display mt-5 text-4xl md:text-6xl">Light tells the <em>truth</em>.</h2>
            <p className="lede mt-6">
              Swirls are microscopic valleys in the clear coat. Under the sun they scatter one bright reflection into a hazy halo. Correction levels that surface by machine, removing as little as possible, until a light source reads as a single, crisp point again.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <figure className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Photo slug="reflection-black-suv" fill sizes="(min-width:1024px) 22vw, 45vw" />
              </figure>
              <figure className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ink">
                <img src="/art/beading.svg" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink p-4 text-xs text-bone/80">Coated: water beads and sheets away. <span className="text-mute">(Illustration)</span></figcaption>
              </figure>
            </div>
            <Link href="/paint-correction-oklahoma-city-ok/" className="btn btn-ghost mt-8">Paint correction</Link>
          </div>
        </div>
      </section>

      {/* Automotive */}
      <section className="py-24 md:py-32">
        <div className="wrap">
          <Eyebrow>Automotive</Eyebrow>
          <h2 className="display mt-5 max-w-3xl text-4xl md:text-6xl">Preserve the <em>new</em> look for years.</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {automotive.map((s) => <ServiceCard key={s.slug} service={s} />)}
            <Link href="/care-atlas/" className="group flex flex-col justify-between rounded-2xl border border-[var(--line)] p-8 transition hover:border-champagne">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-champagne">Not sure where to start?</p>
              <p className="display mt-6 text-3xl">Start from your Oklahoma reality: sun, red dirt, storms, lake water. Follow it to the right service.</p>
              <span className="mt-8 text-sm font-semibold">Open the Care Atlas <span aria-hidden className="inline-block transition group-hover:translate-x-1">→</span></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Atlas */}
      <section className="relative border-y border-[var(--line)] bg-ink-2 py-24 md:py-32">
        <div className="wrap">
          <div className="max-w-3xl">
            <Eyebrow>The Care Atlas</Eyebrow>
            <h2 className="display mt-5 text-4xl md:text-6xl">Local conditions, <em>global</em> discipline.</h2>
            <p className="lede mt-6">
              Choose an Oklahoma condition, a surface problem or a result you want. The atlas traces every honest path between them and leaves out the ones that don’t hold.
            </p>
          </div>
          <div className="mt-14"><ConceptGraph /></div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-24 md:py-32">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Recent work</Eyebrow>
              <h2 className="display mt-5 text-4xl md:text-6xl">From the <em>studio</em> &amp; the field.</h2>
            </div>
            <a href={business.social.instagram} target="_blank" rel="noopener" className="link-u text-sm font-semibold">More on Instagram →</a>
          </div>
          <div className="mt-12 grid grid-flow-dense auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[15rem] md:grid-cols-4">
            {portfolio.map((slug, i) => (
              <figure key={slug} className={`relative overflow-hidden rounded-xl ${i === 0 || i === 5 ? 'row-span-2' : ''} ${i === 3 || i === 7 ? 'md:col-span-2' : ''}`}>
                <Photo slug={slug} fill sizes="(min-width:768px) 25vw, 50vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-24 md:py-28">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>What happens next</Eyebrow>
              <h2 className="display mt-5 max-w-2xl text-4xl md:text-6xl">Certainty, from first message to <em>handover</em>.</h2>
            </div>
            <p className="max-w-md text-bone/70">No guesswork about who you’re dealing with, what it costs or when it’s done. The price is confirmed before any work begins.</p>
          </div>
          <div className="mt-12"><Journey /></div>
        </div>
      </section>

      {/* Trust */}
      <section className="paper py-24 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Credentials</Eyebrow>
            <h2 className="display mt-5 text-4xl md:text-5xl">Professionalism is <em>paramount</em>.</h2>
            <p className="mt-6 text-ink/70">
              Clear communication, meticulous attention and prompt responses at every stage, from the first enquiry to the final walk-round. Locally owned, licensed and insured.
            </p>
            <div className="mt-8 flex items-center gap-5 rounded-xl border border-[var(--line)] bg-ink p-5">
              <img src="/brand/undrdog.webp" alt="Undrdog Coatings" width={240} height={154} className="h-14 w-auto" loading="lazy" />
              <p className="text-sm text-bone">Official certified installer, <span className="text-mute">Undrdog Coatings</span></p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="eyebrow">Verified reviews</p>
              <a href={business.googleReviewsUrl} target="_blank" rel="noopener" className="btn btn-ghost !min-h-10 !text-ink">Read reviews on Google</a>
            </div>
            <Reviews />
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-20">
        <div className="wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="display text-3xl md:text-4xl">Serving Oklahoma City &amp; nearby communities.</p>
          <ul className="flex flex-wrap gap-2">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/service-areas/${a.slug}/`} className="inline-block rounded-full border border-[var(--line-strong)] px-4 py-2 text-sm transition hover:border-bone">{a.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
