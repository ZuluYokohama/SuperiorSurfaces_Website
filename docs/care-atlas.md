# The Care Atlas: local-to-global concept mapping

## Why

Premium clients buy judgment, not adjectives. The old site leaned on superlatives (“#1”, “second to none”, “unparalleled”). The Atlas replaces them with a structured chain of reasoning that a Nichols Hills homeowner, a jet owner and a fleet manager can each follow:

```
Condition (local)  →  Mechanism  →  Discipline (global)  →  Service  →  Expression (outcome)
Triple-digit summers  →  Oxidation & UV fade  →  Protect  →  Ceramic coating  →  Depth of gloss
```

- **Local**: what is specifically true of Oklahoma: red-dirt dust and wind, triple-digit summers, storm grit and turnpike miles, lake water (Hefner, Arcadia, Thunderbird, Eufaula, Grand Lake), winter brine, the ramp and hangar.
- **Mechanism**: what that physically does to paint, gelcoat, glass and leather. This is the precise middle vocabulary that signals competence.
- **Global discipline**: the four-stage grammar used by detailers worldwide: **Decontaminate → Correct → Protect → Preserve**.
- **Expression**: the result in the owner’s language: optical clarity, depth of gloss, self-cleaning behaviour, factory finish intact, thermal comfort and privacy, a clean cabin, preserved value, time returned.

## Honesty rule

`addresses` in `src/content/lexicon.ts` lists the mechanisms each service genuinely treats. A path is only valid if the service addresses that mechanism, so window tint never claims to stop hail damage, and PPF never claims to cool the cabin. Tests in `tests/content.test.ts` enforce this.

## Copy rules (for every future page, post or caption)

1. Open on the local condition, named plainly.
2. Explain the mechanism in one precise sentence.
3. Describe the work as one of the four disciplines.
4. Close on an expression from the outcome layer, not a superlative.
5. Keep prices and inclusions exactly as the business states them.
6. Banned: “#1”, “best”, “unparalleled”, “second to none”, “top-notch”, exclamation marks.

## Extending

Add a node to `nodes`, connect it in `edges`, update `addresses` if a service gains a capability, and run `pnpm test`. The interactive graph, service pages and lexicon page update automatically.
