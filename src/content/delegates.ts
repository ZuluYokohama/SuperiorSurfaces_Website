// The page for house managers, chief pilots, executive assistants and family offices.
// Only `live` items render. `ownerPending` items wait for the owner's sign-off
// (docs/content-reconciliation.md #22-24) and must not appear until confirmed.

export type DelegateItem = { title: string; detail: string; status: 'live' | 'ownerPending' };

export const delegateItems: DelegateItem[] = [
  { title: 'One point of contact', detail: 'Requests, scheduling and questions all go to the same team, by text, call or email.', status: 'live' },
  { title: 'Written proposal before work', detail: 'Condition is assessed and the price confirmed in writing before anything begins.', status: 'live' },
  { title: 'Scheduled to your access windows', detail: 'Gate codes, hangar slots and household routines are respected; we confirm before arrival.', status: 'live' },
  { title: 'Licensed & insured', detail: 'OKC Onsite Detailing LLC is a licensed and insured, locally owned business.', status: 'live' },
  { title: 'Fully self-sufficient on site', detail: 'We bring water, power and equipment, so nothing is needed from the property.', status: 'live' },
  { title: 'Certificate of insurance on request', detail: 'Proof of coverage supplied for your records or your FBO.', status: 'ownerPending' },
  { title: 'Consolidated invoicing', detail: 'One monthly invoice across vehicles, aircraft and vessels.', status: 'ownerPending' },
  { title: 'Photo discretion', detail: 'Client assets are photographed only with permission; no plates, tail numbers or addresses.', status: 'ownerPending' },
];

export const liveDelegateItems = () => delegateItems.filter((i) => i.status === 'live');
