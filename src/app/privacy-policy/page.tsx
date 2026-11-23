import type { Metadata } from 'next';
import { Eyebrow } from '@/components/Blocks';
import { business } from '@/content/business';

export const metadata: Metadata = { title: 'Privacy Policy', alternates: { canonical: '/privacy-policy/' } };

// Plain-language policy describing what this site actually does. Owner to review before launch.
export default function Privacy() {
  return (
    <section className="pt-32 pb-24 md:pt-40">
      <article className="wrap max-w-3xl space-y-6 text-bone/80 [&_h2]:display [&_h2]:pt-6 [&_h2]:text-3xl [&_h2]:text-bone">
        <Eyebrow>Privacy</Eyebrow>
        <h1 className="display text-5xl text-bone">Privacy policy</h1>
        <p>{business.legalName} (“we”) operates this website. This policy explains what information we receive through it and how we use it.</p>
        <h2>Information you send us</h2>
        <p>When you request a quote, the details you enter (name, phone, email, vehicle, location and notes) are sent to us by email or through our form provider. We use them only to respond, quote and schedule your service. We don’t sell or rent personal information.</p>
        <h2>Third-party content</h2>
        <p>Our reviews section is provided by Elfsight, which loads content from its servers and may set its own cookies. Links to Instagram and Facebook take you to those services, which have their own policies.</p>
        <h2>Cookies</h2>
        <p>This site does not set its own advertising or tracking cookies. Your browser may store technical data needed to display pages.</p>
        <h2>Retention and your choices</h2>
        <p>We keep quote correspondence as long as needed to serve you and meet our business and legal obligations. To ask what we hold, or to have it corrected or deleted, email <a className="underline" href={`mailto:${business.email}`}>{business.email}</a> or call {business.phone}.</p>
        <h2>Changes</h2>
        <p>We may update this policy. The current version is always available on this page.</p>
      </article>
    </section>
  );
}
