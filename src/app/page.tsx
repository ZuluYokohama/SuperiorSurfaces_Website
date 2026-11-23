import Link from 'next/link';
import { Photo } from '@/components/Photo';
import { CtaBand } from '@/components/Blocks';
import { SectionHead } from '@/components/SectionHead';
import { Sheen } from '@/components/Sheen';
import { SettingsIndex } from '@/components/SettingsIndex';
import { CorrectionCompare } from '@/components/CorrectionCompare';
import { Reviews } from '@/components/Reviews';
import { Journey } from '@/components/Journey';
import { ByHand } from '@/components/ByHand';
import { business } from '@/content/business';
import { nodes } from '@/content/lexicon';
import { settings } from '@/content/settings';
import { practice } from '@/content/register';
import { ASSETS } from '@/content/assets';
import { asset } from '@/lib/asset';

const disciplines = nodes.filter((n) => n.layer === 'discipline');

export default function Home() {
  return (
    <>
      {/* Hero: the one bold moment is the reflection band (desktop pointer) */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pt-28 pb-10 md:pb-16 lg:items-center lg:pb-0">
        <Photo slug="jet-sunset" fill priority sizes="100vw" className="-z-30" />
        <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-t from-ink via-ink/55 to-ink/20 lg:bg-gradient-to-r lg:from-ink/95 lg:via-ink/50 lg:to-transparent" />
        <Sheen />
        <div className="wrap">
          <div className="max-w-[44rem]">
            <h1>
              <span className="display block text-[length:var(--step-5)]">The standard of care for Oklahoma’s finest machines.</span>
              <span className="t-lede mt-5 block font-normal">Aircraft, marine and automotive detailing in Oklahoma City, at your hangar, estate or lake.</span>
            </h1>
            <p className="t-small tone-2 mt-4">Twelve years in the craft. More than 1,500 vehicles. Licensed and insured.</p>
            <div className="mt-8">
              <p className="t-small font-medium">What are you caring for?</p>
              <ul className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
                {ASSETS.map((a) => (
                  <li key={a.id} className="shrink-0">
                    <Link href={`/contact-us/?asset=${a.id}`} className="inline-flex min-h-11 items-center rounded-full border border-bone/30 bg-ink/40 px-4 t-small backdrop-blur-sm transition hover:border-signal hover:bg-signal hover:text-white">{a.label}</Link>
                  </li>
                ))}
              </ul>
              <p className="t-small tone-2 mt-5 hidden lg:block">
                Or speak to the team directly: <a className="link-u font-semibold text-bone" href={business.phoneHref}>call</a> or <a className="link-u font-semibold text-bone" href={business.smsHref}>text {business.phone}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Settings: the client's world, not a label for the client */}
      <section aria-labelledby="settings-title" className="section">
        <div className="wrap">
          <SectionHead id="settings-title" title="Wherever your machines live" intro="Choose the setting closest to yours. Each shows the work we do there and what matters to the people who run it." />
          <div className="mt-10 lg:mt-16"><SettingsIndex settings={settings} /></div>
          <p className="t-small tone-2 mt-10">
            Arranging this for someone else? <Link href="/for-managers/" className="link-u font-semibold text-[var(--text-1)]">Read the brief for household and flight offices</Link>.
          </p>
        </div>
      </section>

      <ByHand />

      {/* Four disciplines */}
      <section className="paper section">
        <div className="wrap">
          <SectionHead
            title="Purify, refine, seal, keep"
            intro={<>Four disciplines, always in this order, whatever the surface: a Bentley’s burl-wood console, a wake boat’s metal-flake or a jet’s leading edge. <Link href="/care-atlas/" className="link-u font-semibold text-[var(--text-1)]">Read the Care Atlas</Link>.</>}
          />
          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((d, i) => (
              <li key={d.id} className="border-t border-[var(--line-strong)] pt-5">
                <p className="t-small tone-2 tabular-nums">Step {i + 1}</p>
                <h3 className="mt-2">
                  <span className="t-name block">{d.label}</span>
                  <span className="t-small tone-2 mt-1 block">{d.plain}</span>
                </h3>
                <p className="t-body mt-3">{d.gloss}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Light tells the truth */}
      <section className="border-b border-[var(--line)] bg-ink-2 section">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <CorrectionCompare />
          <div>
            <h2 className="t-h2">Light tells the truth</h2>
            <p className="t-lede tone-2 mt-6">
              Swirls are microscopic valleys in the clear coat. Under the sun they scatter one bright reflection into a hazy halo. Refinement levels that surface by machine, removing as little as possible, until a light source reads as a single, crisp point again.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <figure className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Photo slug="reflection-black-suv" fill sizes="(min-width:1024px) 22vw, 45vw" />
              </figure>
              <figure className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ink">
                <img src={asset('/art/beading.webp')} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink p-4 t-small text-[var(--color-bone)]">Still Water: water beads and sheets away. Illustration.</figcaption>
              </figure>
            </div>
            <Link href="/paint-correction-oklahoma-city-ok/" className="btn btn-ghost mt-8">See Refinement, our paint correction</Link>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section">
        <div className="wrap">
          <SectionHead title="What happens next" intro="No guesswork about who you’re dealing with, what it costs or when it’s done. The price is confirmed in writing before any work begins." />
          <div className="mt-12"><Journey /></div>
        </div>
      </section>

      {/* Credentials */}
      <section className="paper section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="t-h2">Credentials</h2>
            <p className="t-body tone-2 mt-6">
              Clear communication, meticulous attention and prompt responses at every stage, from introduction to handover. Locally owned, licensed and insured.
            </p>
            <div className="mt-8 flex items-center gap-5 rounded-xl border border-[var(--line)] bg-ink p-5">
              <img src={asset('/brand/undrdog.webp')} alt="Undrdog Coatings" width={240} height={154} className="h-14 w-auto" loading="lazy" />
              <p className="t-small text-[var(--color-bone)]">Certified installer, Undrdog Coatings</p>
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
