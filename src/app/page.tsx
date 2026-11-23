import Link from 'next/link';
import { Photo } from '@/components/Photo';
import { CtaBand, Eyebrow, ProofBar } from '@/components/Blocks';
import { CorrectionCompare } from '@/components/CorrectionCompare';
import { Reviews } from '@/components/Reviews';
import { Journey } from '@/components/Journey';
import { ByHand } from '@/components/ByHand';
import { business } from '@/content/business';
import { nodes } from '@/content/lexicon';
import { settings } from '@/content/settings';
import { practice } from '@/content/register';
import { ASSETS } from '@/content/assets';

const disciplines = nodes.filter((n) => n.layer === 'discipline');

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pt-28 pb-10 md:pb-14">
        <Photo slug="jet-sunset" fill priority sizes="100vw" className="-z-20" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/55 to-transparent" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-ink/45 md:hidden" />
        <div className="wrap">
          <div className="reveal max-w-3xl">
            <Eyebrow>{practice.house} · Oklahoma City</Eyebrow>
            <h1 className="display mt-6 text-[clamp(2.7rem,7vw,6.2rem)]">
              The standard of care for Oklahoma’s <em>finest</em> machines.
              <span className="mt-5 block font-sans text-[0.8rem] font-bold uppercase not-italic tracking-[0.16em] text-bone/70">Aircraft, marine &amp; automotive detailing in Oklahoma City</span>
            </h1>
            <p className="lede mt-6">
              We keep the finish of aircraft, boats, motorcoaches and fine automobiles: purified, refined, sealed and kept, at your hangar, estate or lake by a licensed, insured team with twelve years in the craft.
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

      {/* Settings: the client's world, not a label for the client */}
      <section aria-labelledby="settings-title" className="border-t border-[var(--line)]">
        <div className="wrap pt-24 pb-12 md:pt-32">
          <Eyebrow>Settings</Eyebrow>
          <h2 id="settings-title" className="display mt-5 max-w-3xl text-4xl md:text-6xl">Wherever your machines <em>live</em>.</h2>
        </div>
        <ul>
          {settings.map((st, i) => (
            <li key={st.slug}>
              <Link href={`/settings/${st.slug}/`} className="group relative isolate flex min-h-[62svh] items-end overflow-hidden border-t border-[var(--line)] md:min-h-[72svh]">
                <Photo slug={st.hero} fill sizes="100vw" treatment="editorial" className="-z-20" imgClassName="transition duration-[1.6s] ease-out group-hover:scale-[1.03]" />
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
                <div className="wrap grid gap-6 py-12 md:grid-cols-12 md:items-end md:py-16">
                  <div className="md:col-span-7">
                    <span className="text-xs font-bold tracking-[0.2em] text-signal">0{i + 1}</span>
                    <h3 className="mt-3">
                      <span className="display block text-5xl md:text-7xl">{st.house}</span>
                      <span className="mt-3 block text-[0.8rem] font-bold uppercase tracking-[0.16em] text-bone/70">{st.plain}</span>
                    </h3>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-bone/80">{st.lede}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Enter <span aria-hidden className="transition group-hover:translate-x-1">→</span></span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="wrap border-t border-[var(--line)] py-8">
          <Link href="/for-managers/" className="link-u text-sm font-semibold">Arranging this for someone else? For Household &amp; Flight Offices →</Link>
        </div>
      </section>

      <ByHand />

      {/* Four disciplines */}
      <section className="paper py-24 md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>{practice.house}</Eyebrow>
            <h2 className="display mt-5 text-4xl md:text-6xl">Purify. Refine. Seal. <em>Keep</em>.</h2>
            <p className="lede mt-6">
              Four disciplines, always in this order, whatever the surface: a Bentley’s burl-wood console, a wake boat’s metal-flake or a jet’s leading edge.
            </p>
            <Link href="/care-atlas/" className="link-u mt-8 inline-block text-sm font-bold uppercase tracking-[0.14em]">Read the Care Atlas →</Link>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:col-span-7">
            {disciplines.map((d, i) => (
              <li key={d.id} className="bg-paper p-8">
                <span className="display text-5xl text-signal">0{i + 1}</span>
                <h3 className="mt-6">
                  <span className="display block text-3xl">{d.label}</span>
                  <span className="mt-1 block text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink/55">{d.plain}</span>
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">{d.gloss}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Light tells the truth */}
      <section className="border-b border-[var(--line)] bg-ink-2 py-24 md:py-32">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <CorrectionCompare />
          <div>
            <Eyebrow>Refinement · Paint correction</Eyebrow>
            <h2 className="display mt-5 text-4xl md:text-6xl">Light tells the <em>truth</em>.</h2>
            <p className="lede mt-6">
              Swirls are microscopic valleys in the clear coat. Under the sun they scatter one bright reflection into a hazy halo. Refinement levels that surface by machine, removing as little as possible, until a light source reads as a single, crisp point again.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <figure className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Photo slug="reflection-black-suv" fill sizes="(min-width:1024px) 22vw, 45vw" />
              </figure>
              <figure className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ink">
                <img src="/art/beading.svg" alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink p-4 text-xs text-bone/80">Still Water: water beads and sheets away. <span className="text-mute">(Illustration)</span></figcaption>
              </figure>
            </div>
            <Link href="/paint-correction-oklahoma-city-ok/" className="btn btn-ghost mt-8">Refinement</Link>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-24 md:py-28">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>What happens next</Eyebrow>
              <h2 className="display mt-5 max-w-2xl text-4xl md:text-6xl">Certainty, from introduction to <em>handover</em>.</h2>
            </div>
            <p className="max-w-md text-bone/70">No guesswork about who you’re dealing with, what it costs or when it’s done. The price is confirmed in writing before any work begins.</p>
          </div>
          <div className="mt-12"><Journey /></div>
        </div>
      </section>

      {/* Credentials */}
      <section className="paper py-24 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Credentials</Eyebrow>
            <h2 className="display mt-5 text-4xl md:text-5xl">Professionalism is <em>paramount</em>.</h2>
            <p className="mt-6 text-ink/70">
              Clear communication, meticulous attention and prompt responses at every stage, from introduction to handover. Locally owned, licensed and insured.
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

      <CtaBand />
    </>
  );
}
