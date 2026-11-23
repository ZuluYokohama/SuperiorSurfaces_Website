import type { Metadata } from 'next';
import { Eyebrow } from '@/components/Blocks';
import { Photo } from '@/components/Photo';
import { QuoteForm } from '@/components/QuoteForm';
import { Journey } from '@/components/Journey';
import { business } from '@/content/business';

export const metadata: Metadata = {
  title: 'Request a Quote',
  description: 'Request a complimentary quote for detailing, paint correction, ceramic coating, PPF or window tint in Oklahoma City. Call (405) 434-1517.',
  alternates: { canonical: '/contact-us/' },
};

export default function Contact() {
  return (
    <section className="pt-28 pb-24 md:pt-36">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>Complimentary quote</Eyebrow>
          <h1 className="display mt-5 text-[clamp(2.6rem,5vw,4.6rem)]">Tell us what you’re caring for.</h1>
          <p className="lede mt-6">A few details let us quote accurately: the vehicle, aircraft or vessel, its condition and where it lives. We come to you.</p>
          <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-2xl lg:block">
            <Photo slug="wheel-hand-detail" fill sizes="40vw" />
          </div>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div><dt className="eyebrow">Call or text</dt><dd className="mt-2 text-2xl font-semibold tabular-nums"><a href={business.phoneHref}>{business.phone}</a></dd><dd className="mt-1 text-sm"><a className="link-u inline-block py-2" href={business.smsHref}>Send a text</a></dd></div>
            <div><dt className="eyebrow">Email</dt><dd className="mt-2 break-all"><a className="link-u inline-block py-2" href={`mailto:${business.email}`}>{business.email}</a></dd></div>
            <div>
              <dt className="eyebrow">Hours</dt>
              <dd className="mt-2 space-y-1 text-sm text-bone/80">{business.hours.map((h) => <p key={h.days}>{h.days}: {h.time}</p>)}</dd>
            </div>
            <div><dt className="eyebrow">Studio</dt><dd className="mt-2 text-sm text-bone/80">{business.studio.street}<br />{business.studio.locality}, {business.studio.region} {business.studio.postalCode}</dd></div>
          </dl>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-ink-2 p-6 md:p-10 lg:col-span-7">
          <QuoteForm />
        </div>
      </div>
      <div className="wrap mt-20">
        <Eyebrow>What happens next</Eyebrow>
        <div className="mt-8"><Journey /></div>
      </div>
    </section>
  );
}
