# OpenByte design QA — current light photographic homepage

Verified November 3, 2026. At the user's request, the rejected Split Studio
post-hero redesign was disconnected and the preceding photographic/editorial
homepage sections were restored. The approved hero remains unchanged. The
standalone “Why this matters” block stays removed, and section intervals remain
at the previously tightened 120px desktop, 96px tablet, and 80px phone rhythm.

## Current verification

- `npm run typecheck` and the production `npm run build` pass.
- The static export contains `/`, `/classes/`, `/privacy/`, robots, and sitemap.
- Fresh Chromium rendering passes at 320, 375, 390, 414, 768, 1280, 1440, and
  1920px with no horizontal overflow or page errors.
- At 1280×800, the hero headline, supporting sentence, primary action, and image
  focal point all fit without scrolling.
- The current full-page captures are `artifacts/openbyte-home-1440.png` and
  `artifacts/openbyte-home-390.png`. Machine-readable viewport results are in
  `artifacts/final-qa.json`.
- The live Hack Club Bank tracker and leaderboard, device donation form, classes
  route, privacy route, real photography, and verified facts remain connected.

---

# Previous dark production baseline

Verified November 2, 2026. The latest dark-first brief governs the current
implementation. Earlier light-mode studies below are historical.

## Current design and implementation

One dark design system serves the homepage, `/classes/`, and `/privacy/`.
The reference research combines Linear's alignment and hierarchy, Resend's
single strong focal subject, and Cursor's emphasis on a working demonstration.
The live OpenByte site supplies the facts, people, lessons, links, and photos.
See `DESIGN.md`, `tokens.css`, and `design-references/dark/research.md`.

The homepage follows the requested order: split hero, supporters, mission,
three illustrated programs, documented progress, Arduino specification,
three real photos, founders, funding, and footer. Existing supporting copy,
community details, device/positions forms, and contact information remain
available through native disclosures. The device form uses its original
external Google Forms URL. The classes route contains completed lessons,
documented parts, class specifications, FAQ, and contact links.

The hero Blink editor is editable. Its supported delay values control a browser
LED simulation; the default alternates every 500ms. Typing, pause/run, reset,
and unsupported-sketch states work. The interface identifies it as a simulation.
GSAP supplies short section entrances, program staggering, and SVG line drawing.
Reduced motion disables typing, blinking, and spatial animation. Content stays
available without the animation library or JavaScript.

## Production verification

- Clean `npm run build`: Next.js compilation, TypeScript, and static export pass.
- Home and classes at 320, 375, 390, 414, 768, 1440, and 1920px: no horizontal
  overflow or page JavaScript errors. Privacy also checked at 390 and 1440px.
- Automated axe checks: zero violations on home, classes, privacy, and expanded
  supporting disclosures at desktop/mobile sizes. These checks are not a full
  manual WCAG certification.
- Mobile navigation, Escape/focus return, disclosure hash links, keyboard funding
  tabs, and stable total/leaderboard panel height pass.
- Default LED timing measured at 499–500ms. Edited 750/250ms delays, pause,
  reset, reduced motion, and complete code without JavaScript pass.
- HCB funding loaded its live total and ten leaderboard rows. Totals are fetched
  at runtime; they are not hardcoded. Forced API failure shows an unavailable
  value rather than a misleading zero. No donation or form was submitted.
- Existing donor-parser tests pass, 2/2.
- Final normal-motion screenshots of home and classes at 1440 and 390px were
  inspected, including mobile program spacing and the shared funding styling.
- Tailwind source scanning is explicitly scoped to app/components. A clean
  build was used after identifying a stale compiler cache; the exported CSS and
  rendered donation surface were verified after rebuilding.

Evidence is in `design-references/dark/`: `qa-results.json`,
`states-results.json`, `final-home-check.json`, `final-visual-results.json`,
and the final desktop/mobile PNGs. `screenshots.html` provides a self-contained
viewer for all four full-page captures.

## Final Lighthouse mobile audit

| Route | Performance | Accessibility | Best practices | SEO | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 97 | 100 | 100 | 100 | 0 |
| `/classes/` | 98 | 100 | 100 | 100 | 0 |

Home: FCP/LCP 1.5s, total blocking time 180ms. Classes: FCP/LCP 1.2s,
total blocking time 140ms. Reports: `lighthouse-summary.json`,
`lighthouse-home-mobile.json`, and `lighthouse-classes-mobile.json` in the dark
evidence directory. These are local static-export measurements; deployed CDN
caching, network conditions, and external API timing can differ.

## Delivery state and remaining assets

Built and verified locally, not deployed. Next.js static export is compatible
with Vercel, and the existing GitHub Pages workflow/custom domain remain.
OpenByte's typeset wordmark and the five supporter/press text identities are
explicit placeholders pending approved monochrome SVGs: Adeept, Ashburn Art
Classes, Robeks of Loudoun, Hack Club, and Bulldog Tribune. Real workshop photos
and custom code-native SVG illustrations are present.

Hallmark self-critique: philosophy 5, hierarchy 5, execution 4, specificity 5,
restraint 5, variety 4. The user's requested section order and dark design system
govern the composition.

---

# Historical QA — superseded light implementation, November 2, 2026

## Current implementation

The latest request selects Linear, in light mode, as the direct structural
reference. Its downloaded homepage, external CSS, light-theme variables,
Inter font, measured 64px/510 headline, navigation and feature-section rhythm
inform this implementation. Earlier Vercel and centered-photo compositions are
superseded. Reference provenance is in
`design-references/linear-light/reference-notes.md`.

The homepage uses a left-aligned hero, a wide actual Arduino lesson preview,
monochrome text supporters, a mission statement and three illustrated purpose
columns, then three wide product-style program sections, documented progress,
real community evidence, team, centered funding invitation and directory
footer. All surfaces are light; OpenByte blue remains the graphic accent.

## Verification

The production static export was built successfully with Next.js and its
TypeScript check. It was rendered in local Chromium using Playwright. T3's
shared browser/HTML preview is unavailable because required host libraries are
missing; local Chromium uses the existing extracted-library setup.

- Responsive widths 320, 375, 390, 414, 768, 1280, 1440, 1920px: no horizontal overflow,
  page JavaScript errors or illustration/caption overlap.
- Actual screenshots at 390, 768, and 1440px are in `design-references/linear-light/`.
  `desktop-hero.png` and `mobile-hero.png` provide focused hero views.
- axe WCAG A/AA scans report zero violations on the homepage, privacy route,
  and expanded supporting disclosures. These are automated checks, not a
  certification of every WCAG requirement.
- Mobile menu opens, closes on selection, and handles Escape with focus return.
- Direct application/device links open their native disclosures. Completed
  lesson links in the hero open and scroll to the corresponding real lesson.
- Content remains visible without JS, and native disclosures remain usable.
  Reduced motion stops LED animation and scroll translations.
- HCB live total loaded as $2,240.30 with 10 ranked contributions in the captured
  state. These are observations, never hardcoded totals or inferred identities.
- Both funding tabs work with pointer and arrow keys. Total and leaderboard
  have the same height at 320, 390, 768, and 1440px; focusable panel scrolling exposes
  every contribution and public donor record.
- Forced HCB API failure shows an unavailable dash, never a misleading zero.
- Existing public donor-parser tests pass 2/2.
- Comparison against the saved prior source found no missing paragraphs or
  external URLs. The attendance and kit-handoff reconciliation note remains.
- CRLF-aware Git whitespace checks pass for the changed source files.

Machine-readable evidence: `qa-results.json`, `states-results.json`,
`funding-stability.json`, and `content-preservation.json` in the same directory.

## Performance

The final Lighthouse mobile audit of the local static export reports:

- Performance: 99/100.
- Accessibility: 100/100.
- Best practices: 100/100.
- SEO: 100/100.
- First contentful paint and largest contentful paint: 1.7s.
- Cumulative layout shift: 0.
- Total blocking time: 80ms.

The self-hosted Inter source is subset from 344 KB to 101 KB. Optional display
prevents a late primary-font repaint on slow connections. Photo variants are
pre-generated for the static export. This is a local audit, not a deployed
production-domain measurement; CDN cache and external API timing can differ.

## Delivery limits

Built and verified locally; no deployment, payment, application, or message
submission was performed. OpenByte and sponsor wordmarks are text placeholders;
approved monochrome brand SVGs listed in DESIGN.md remain outstanding.

Hallmark self-critique: philosophy 4, hierarchy 4, execution 4, specificity 5,
restraint 5, variety 4. The user's explicit Linear structure, typography and
light-theme request governs the composition.
