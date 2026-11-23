import Link from 'next/link';
import { business } from '@/content/business';

const Icon = ({ d }: { d: string }) => (
  <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

/**
 * Thumb-reach contact bar for touch devices: phones and tablets (hidden from lg up,
 * where the header carries the same actions).
 */
export function ActionBar() {
  const cell = 'flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[0.8125rem] font-medium';
  return (
    <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 flex border-t border-[var(--line)] bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <a href={business.phoneHref} className={cell}>
        <Icon d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />Call
      </a>
      <a href={business.smsHref} className={`${cell} border-x border-[var(--line)]`}>
        <Icon d="M4 5h16v11H9l-5 4z" />Text
      </a>
      <Link href="/contact-us/" className={`${cell} bg-signal text-white`}>
        <Icon d="M5 12h14M13 6l6 6-6 6" />Get a quote
      </Link>
    </nav>
  );
}
