'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { edges, layers, lineage, nodes, type ConceptNode } from '@/content/lexicon';

const COL_X = [0, 250, 500, 750, 1000];
const NODE_W = 200;
const NODE_H = 44;
const ROW = 64;
const TOP = 72;
const ROWS = 8;
const HEIGHT = TOP + ROWS * ROW;

function layout() {
  const pos = new Map<string, { x: number; y: number }>();
  layers.forEach((layer, ci) => {
    const col = nodes.filter((n) => n.layer === layer.id);
    const offset = ((ROWS - col.length) * ROW) / 2;
    col.forEach((n, ri) => pos.set(n.id, { x: COL_X[ci], y: TOP + offset + ri * ROW }));
  });
  return pos;
}

export function ConceptGraph({ initial = 'c-sun' }: { initial?: string }) {
  const [active, setActive] = useState<string>(initial);
  const pos = useMemo(layout, []);
  const lit = useMemo(() => lineage(active), [active]);
  const current = nodes.find((n) => n.id === active) as ConceptNode;

  const chip = (n: ConceptNode) => {
    const on = lit.nodes.has(n.id);
    const isActive = n.id === active;
    return (
      <button
        key={n.id}
        type="button"
        onClick={() => setActive(n.id)}
        aria-pressed={isActive}
        className={`rounded-full border px-3.5 py-2 text-left text-sm transition ${
          isActive ? 'border-signal bg-signal text-white' : on ? 'border-champagne/70 text-bone' : 'border-[var(--line)] text-mute/60'
        }`}
      >
        {n.label}
      </button>
    );
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_18rem]">
      {/* Desktop: full graph */}
      <div className="hidden overflow-x-auto md:block">
        <svg viewBox={`-4 0 1208 ${HEIGHT}`} className="w-full min-w-[56rem]" role="group" aria-label="Care Atlas concept graph">
          {layers.map((l, i) => (
            <g key={l.id} transform={`translate(${COL_X[i]} 0)`}>
              <text y="18" className="fill-signal text-[11px] font-bold uppercase tracking-[0.2em]">{l.scope}</text>
              <text y="42" className="fill-bone font-display text-[19px]">{l.title}</text>
            </g>
          ))}
          <g fill="none">
            {edges.map(([a, b]) => {
              const p = pos.get(a)!;
              const q = pos.get(b)!;
              const x1 = p.x + NODE_W, y1 = p.y + NODE_H / 2, x2 = q.x, y2 = q.y + NODE_H / 2;
              const mx = (x1 + x2) / 2;
              const on = lit.edges.has(`${a}>${b}`);
              return (
                <path
                  key={`${a}>${b}`}
                  d={`M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`}
                  stroke={on ? '#c9b38a' : '#ece6da'}
                  strokeOpacity={on ? 0.9 : 0.06}
                  strokeWidth={on ? 1.4 : 1}
                  style={{ transition: 'stroke-opacity .35s, stroke .35s' }}
                />
              );
            })}
          </g>
          {nodes.map((n) => {
            const p = pos.get(n.id)!;
            const on = lit.nodes.has(n.id);
            const isActive = n.id === active;
            return (
              <g
                key={n.id}
                transform={`translate(${p.x} ${p.y})`}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`${n.label}: ${n.gloss}`}
                onMouseEnter={() => setActive(n.id)}
                onFocus={() => setActive(n.id)}
                onClick={() => setActive(n.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActive(n.id)}
                className="cursor-pointer outline-none"
                style={{ opacity: on ? 1 : 0.32, transition: 'opacity .35s' }}
              >
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx={NODE_H / 2}
                  fill={isActive ? '#e43224' : '#131518'}
                  stroke={isActive ? '#e43224' : on ? '#c9b38a' : '#ece6da'}
                  strokeOpacity={on ? 0.8 : 0.2}
                />
                <text x={NODE_W / 2} y={NODE_H / 2 + 5} textAnchor="middle" className={`text-[13.5px] font-semibold ${isActive ? 'fill-white' : 'fill-bone'}`}>
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile: stacked layers */}
      <div className="space-y-6 md:hidden">
        {layers.map((l) => (
          <div key={l.id}>
            <p className="eyebrow mb-3">{l.scope} · {l.title}</p>
            <div className="flex flex-wrap gap-2">{nodes.filter((n) => n.layer === l.id).map(chip)}</div>
          </div>
        ))}
      </div>

      <aside aria-live="polite" className="self-start rounded-2xl border border-[var(--line)] bg-ink-2 p-6 lg:sticky lg:top-28">
        <p className="eyebrow">{layers.find((l) => l.id === current.layer)?.title}</p>
        <h3 className="display mt-4 text-3xl">{current.label}</h3>
        <p className="mt-3 text-sm leading-relaxed text-bone/75">{current.gloss}</p>
        <p className="mt-5 text-xs text-mute">
          Connected to {lit.nodes.size - 1} concepts across {new Set([...lit.nodes].map((id) => id[0])).size} layers.
        </p>
        {current.href && (
          <Link href={current.href} className="btn btn-ghost mt-6 w-full">Explore {current.label.toLowerCase()}</Link>
        )}
      </aside>
    </div>
  );
}
