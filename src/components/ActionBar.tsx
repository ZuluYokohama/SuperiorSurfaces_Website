import Link from 'next/link';
import { business } from '@/content/business';

/** Persistent phone action bar: the fastest route to a human, one thumb away. */
export function ActionBar() {
  const cell = 'flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[0.66rem] font-bold uppercase tracking-[0.14em]';
  return (
    <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 flex border-t border-[var(--line)] bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      <a href={business.phoneHref} className={cell}><span aria-hidden className="text-base">☏</span>Call</a>
      <a href={business.smsHref} className={`${cell} border-x border-[var(--line)]`}><span aria-hidden className="text-base">✉</span>Text</a>
      <Link href="/contact-us/" className={`${cell} bg-signal text-white`}><span aria-hidden className="text-base">→</span>Quote</Link>
    </nav>
  );
}
