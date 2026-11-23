'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { business } from '@/content/business';
import { services } from '@/content/services';
import { areas } from '@/content/areas';

const ASSETS = ['Automobile', 'Exotic / collector car', 'Truck or SUV', 'Aircraft', 'Boat', 'RV or motorcoach', 'Fleet or equipment'];
const LOCATIONS = ['Home or estate', 'Office', 'Hangar', 'Marina or lake house', 'Your studio'];

/**
 * Quote request. With no form backend configured, submission composes a structured
 * email in the visitor’s mail app; the phone line is always offered alongside.
 * Set NEXT_PUBLIC_FORM_ENDPOINT (e.g. Formspree) to post directly instead.
 */
export function QuoteForm() {
  const [preset, setPreset] = useState<string | null>(null);
  useEffect(() => setPreset(new URLSearchParams(window.location.search).get('service')), []);
  const [state, setState] = useState<'idle' | 'sent' | 'mailto' | 'error'>('idle');
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const wanted = fd.getAll('services').join(', ') || 'Not sure yet, please advise';
    const lines = [
      `Name: ${fd.get('name')}`,
      `Phone: ${fd.get('phone')}`,
      `Email: ${fd.get('email')}`,
      `Asset: ${fd.get('asset')}`,
      `Make / model / year: ${fd.get('model')}`,
      `Services: ${wanted}`,
      `Where: ${fd.get('location')}, ${fd.get('area')}`,
      `Timing: ${fd.get('timing') || 'Flexible'}`,
      '',
      `${fd.get('notes') || ''}`,
    ];
    if (endpoint) {
      try {
        const res = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: fd });
        setState(res.ok ? 'sent' : 'error');
      } catch {
        setState('error');
      }
      return;
    }
    const subject = `Quote request: ${fd.get('asset')} (${fd.get('model')})`;
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    setState('mailto');
  }

  const field = 'mt-2 w-full rounded-lg border border-[var(--line-strong)] bg-transparent px-4 py-3 text-base outline-none transition focus:border-champagne';
  const label = 'block text-[0.72rem] font-bold uppercase tracking-[0.16em] text-mute';

  if (state === 'sent') {
    return (
      <div className="rounded-2xl border border-[var(--line)] p-8">
        <p className="display text-3xl">Thank you.</p>
        <p className="mt-3 text-bone/75">Your request is with us. We’ll respond within one business day, or call {business.phone} for anything urgent.</p>
      </div>
    );
  }

  return (
    <form key={preset ?? 'none'} onSubmit={submit} className="grid gap-6 sm:grid-cols-2">
      <label className={`${label} sm:col-span-2`}>
        What are we caring for?
        <select name="asset" required className={field} defaultValue="">
          <option value="" disabled>Choose one</option>
          {ASSETS.map((a) => <option key={a} className="bg-ink">{a}</option>)}
        </select>
      </label>
      <label className={`${label} sm:col-span-2`}>
        Make, model &amp; year
        <input name="model" required className={field} placeholder="e.g. 2024 Bentley Continental GTC" />
      </label>
      <fieldset className="sm:col-span-2">
        <legend className={label}>Services of interest</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {services.map((s) => (
            <label key={s.slug} className="cursor-pointer">
              <input type="checkbox" name="services" value={s.name} defaultChecked={preset === s.slug} className="peer sr-only" />
              <span className="inline-block rounded-full border border-[var(--line-strong)] px-4 py-2 text-sm transition peer-checked:border-signal peer-checked:bg-signal peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-champagne">
                {s.name}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className={label}>
        Where it will be
        <select name="location" className={field} defaultValue={LOCATIONS[0]}>
          {LOCATIONS.map((l) => <option key={l} className="bg-ink">{l}</option>)}
        </select>
      </label>
      <label className={label}>
        Area
        <select name="area" className={field} defaultValue="Oklahoma City">
          {['Oklahoma City', ...areas.map((a) => a.name), 'Elsewhere in Oklahoma'].map((a) => <option key={a} className="bg-ink">{a}</option>)}
        </select>
      </label>
      <label className={label}>
        Name
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className={label}>
        Phone
        <input name="phone" required type="tel" autoComplete="tel" className={field} />
      </label>
      <label className={label}>
        Email
        <input name="email" type="email" autoComplete="email" className={field} />
      </label>
      <label className={label}>
        Preferred timing
        <input name="timing" className={field} placeholder="e.g. before 14 June, weekday mornings" />
      </label>
      <label className={`${label} sm:col-span-2`}>
        Anything we should know
        <textarea name="notes" rows={4} className={field} placeholder="Condition, concerns, gate or hangar access…" />
      </label>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button className="btn btn-signal">Send request</button>
        <a href={business.phoneHref} className="btn btn-ghost">Or call {business.phone}</a>
      </div>
      <p className="text-xs text-mute sm:col-span-2" aria-live="polite">
        {state === 'mailto' && 'Your email app should now be open with the request filled in. Just press send. If nothing opened, call or email us directly.'}
        {state === 'error' && `Something went wrong sending the form. Please call ${business.phone} or email ${business.email}.`}
        {state === 'idle' && (endpoint ? 'We reply within one business day.' : 'Sending opens your email app with everything filled in, ready to send.')}
      </p>
    </form>
  );
}
