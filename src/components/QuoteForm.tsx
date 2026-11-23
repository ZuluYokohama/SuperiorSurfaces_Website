'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { business } from '@/content/business';
import { services } from '@/content/services';
import { areas } from '@/content/areas';
import { ASSETS } from '@/content/assets';

const LOCATIONS = ['Home or estate', 'Office', 'Hangar', 'Marina or lake house', 'Your studio'];
const CONTACT = ['Text', 'Call', 'Email'];

/**
 * Two-step quote request.
 * Step 1 captures only what is needed to respond (asset, interest, name, phone, contact preference).
 * Step 2 is optional context. Without NEXT_PUBLIC_FORM_ENDPOINT, submission composes a structured
 * email in the visitor’s mail app; with it, the form posts directly.
 */
export function QuoteForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle');
  const [preset, setPreset] = useState<{ service: string | null; asset: string | null }>({ service: null, asset: null });
  const formRef = useRef<HTMLFormElement>(null);
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setPreset({ service: q.get('service'), asset: q.get('asset') });
  }, []);

  function next() {
    const f = formRef.current!;
    const required = Array.from(f.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-step="1"][required]'));
    const bad = required.find((el) => !el.checkValidity());
    if (bad) {
      bad.reportValidity();
      return;
    }
    setStep(2);
    requestAnimationFrame(() => f.querySelector<HTMLElement>('[data-step="2"]')?.focus());
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 1) return next();
    const fd = new FormData(e.currentTarget);
    const assetLabel = ASSETS.find((a) => a.id === fd.get('asset'))?.label ?? fd.get('asset');
    const lines = [
      `Name: ${fd.get('name')}`,
      `Phone: ${fd.get('phone')}`,
      `Prefers: ${fd.get('contact')}`,
      `Email: ${fd.get('email') || '(not given)'}`,
      `Asset: ${assetLabel}`,
      `Make / model / year: ${fd.get('model') || '(not given)'}`,
      `Services: ${fd.getAll('services').join(', ') || 'Not sure yet, please advise'}`,
      `Where: ${fd.get('location')}, ${fd.get('area')}`,
      `Timing: ${fd.get('timing') || 'Flexible'}`,
      '',
      `${fd.get('notes') || ''}`,
    ];
    if (endpoint) {
      setState('sending');
      try {
        const res = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: fd });
        setState(res.ok ? 'sent' : 'error');
      } catch {
        setState('error');
      }
      return;
    }
    const subject = `Quote request: ${assetLabel}${fd.get('model') ? ` (${fd.get('model')})` : ''}`;
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    setState('mailto');
  }

  const field = 'mt-2 w-full rounded-lg border border-[var(--line-strong)] bg-transparent px-4 py-3 text-base outline-none transition focus:border-champagne';
  const label = 'block text-[0.9375rem] font-medium text-mute';
  const chip = 'inline-flex min-h-11 items-center rounded-full border border-[var(--line-strong)] px-4 py-2 text-sm transition peer-checked:border-signal peer-checked:bg-signal peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-champagne';

  if (state === 'sent') {
    return (
      <div className="rounded-2xl border border-[var(--line)] p-8" role="status">
        <p className="display text-4xl">Thank you. It’s with us.</p>
        <p className="mt-4 text-bone/75">A member of the team will reply within one business day by your preferred channel. If it’s urgent, call or text {business.phone}.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} key={`${preset.service}-${preset.asset}`} onSubmit={submit}>
      <div className="mb-8 flex items-center gap-4 text-[0.8125rem] font-bold">
        <span className={step === 1 ? 'text-bone' : 'text-mute'}>01 · Essentials</span>
        <span aria-hidden className="h-px flex-1 bg-[var(--line-strong)]">
          <span className="block h-px bg-bone transition-all duration-500" style={{ width: step === 1 ? '50%' : '100%' }} />
        </span>
        <span className={step === 2 ? 'text-bone' : 'text-mute'}>02 · Details (optional)</span>
      </div>

      {/* Step 1 */}
      <div className={step === 1 ? 'grid gap-6 sm:grid-cols-2' : 'hidden'}>
        <fieldset className="sm:col-span-2">
          <legend className={label}>What are we caring for?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {ASSETS.map((a, i) => (
              <label key={a.id} className="cursor-pointer">
                <input type="radio" name="asset" value={a.id} required={i === 0} data-step="1" defaultChecked={preset.asset === a.id} className="peer sr-only" />
                <span className={chip}>{a.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="sm:col-span-2">
          <legend className={label}>Interested in <span className="">(optional, we’ll advise)</span></legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {services.map((s) => (
              <label key={s.slug} className="cursor-pointer">
                <input type="checkbox" name="services" value={s.name} defaultChecked={preset.service === s.slug} className="peer sr-only" />
                <span className={chip}>{s.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className={label}>
          Name
          <input name="name" required data-step="1" autoComplete="name" className={field} />
        </label>
        <label className={label}>
          Mobile
          <input name="phone" required data-step="1" type="tel" autoComplete="tel" inputMode="tel" className={field} />
        </label>
        <fieldset className="sm:col-span-2">
          <legend className={label}>Best way to reach you</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {CONTACT.map((c, i) => (
              <label key={c} className="cursor-pointer">
                <input type="radio" name="contact" value={c} defaultChecked={i === 0} className="peer sr-only" />
                <span className={chip}>{c}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
          <button type="button" onClick={next} className="btn btn-signal">Continue</button>
          <a href={business.smsHref} className="btn btn-ghost">Or text {business.phone}</a>
        </div>
      </div>

      {/* Step 2 */}
      <div className={step === 2 ? 'grid gap-6 sm:grid-cols-2' : 'hidden'}>
        <label className={`${label} sm:col-span-2`}>
          Make, model &amp; year
          <input name="model" data-step="2" tabIndex={-1} className={field} placeholder="e.g. 2024 Bentley Continental GTC" />
        </label>
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
          Email
          <input name="email" type="email" autoComplete="email" className={field} />
        </label>
        <label className={label}>
          Preferred timing
          <input name="timing" className={field} placeholder="e.g. before the lake season" />
        </label>
        <label className={`${label} sm:col-span-2`}>
          Anything we should know
          <textarea name="notes" rows={3} className={field} placeholder="Condition, concerns, gate or hangar access…" />
        </label>
        <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
          <button className="btn btn-signal" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send request'}</button>
          <button type="button" onClick={() => setStep(1)} className="btn btn-ghost">Back</button>
        </div>
      </div>

      <p className="mt-6 text-xs text-mute" aria-live="polite">
        {state === 'mailto' && 'Your email app should now be open with the request filled in. Just press send. If nothing opened, call or text us directly.'}
        {state === 'error' && `Something went wrong sending the form. Please call or text ${business.phone}.`}
        {(state === 'idle' || state === 'sending') && (step === 1 ? 'Four quick answers. Details are optional.' : endpoint ? 'We reply within one business day.' : 'Sending opens your email app with everything filled in, ready to send.')}
      </p>
    </form>
  );
}
