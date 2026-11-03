# OpenByte — homepage hero, fresh start

The November 3 reset supersedes the earlier homepage design below. This pass
builds the homepage hero, navigation, and first workshop section. Existing supporting routes keep
their current design until a direction is selected for the rest of the site.

## Current hero direction

A photographic opening inspired by the composition of Stellar and Radiating
Hope, with the restrained interface and typography studied on Cursor and Linear.
An edge-aligned navigation sits on a light canvas above a large, rounded
photograph. The image carries the visual interest; the heading explains the
student-led mission. A small photograph of the actual team supplies human proof.
The navigation uses the full logo supplied by the user, cropped and optimized
for desktop and mobile without altering its artwork or tagline.

## Hero tokens

- Paper: #FAFAF8; ink: #171B1D; muted ink: #596164; rule: #DDDFDC.
- Image surface: #073139; image ink: #FFFFFF; secondary image ink: #DBE7E8.
- OpenByte accent: #10B8F8. Focus on light: #087CAA; focus on image: #7DDCFF.
- Geist Sans for display, copy, and navigation. Display weight 500, tracking
  -0.055em, line-height 1.02. Desktop display 80–88px; mobile 40–48px.
- Body 17px/1.6; navigation 14px; small labels 12–13px. No fabricated figures,
  dates, or decorative technical captions.
- Spacing: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96px. Desktop outer gutter
  24px; mobile outer gutter 12px. The photo supplies the section boundary.
- Radii: image 20px; controls 8px; team thumbnail 6px.
- Motion: one GSAP image settle and a small text translation on entry, 650–1100ms,
  without hiding the heading. No continual panning. Reduced motion renders the
  finished still composition immediately.

## Hero assets and links

The Arduino macro photograph is by Harrison Broadbent, used under the Unsplash
License. It is illustrative hardware photography, not an OpenByte event image.
The founders thumbnail is an existing OpenByte photograph. Sources and derivative
sizes are recorded in `public/media/hero/CREDITS.md`.
Phones receive a dedicated AVIF portrait crop with a WebP fallback; the matching
hero source is preloaded. Geist Mono remains available to the supporting routes
but is not preloaded on pages that do not use it.

The headline reuses the live site's exact heading. Programs link to the local
program shortcuts, classes to `/classes/`, donations to the existing HCB checkout,
and the device link to the existing Google Form. The founders link opens the
existing Bulldog Tribune feature, which introduces the three co-founders.
Hero copy uses concrete descriptions of the work; no additional mission slogans.

## First section — Inside an OpenByte workshop

The hero's macro hardware image is followed by an actual student presentation.
An asymmetric, unframed layout gives roughly three-fifths of the width to the
photograph, with a large heading, two factual sentences, and one class link beside
it. The photo preserves the students and projected website in the same frame.
The caption describes what is visible without adding a date or attendance claim.

The section uses the homepage's paper, ink, muted ink, and hairline tokens.
Desktop spacing is 128px above and 120px below, with a 40–96px column gap.
The heading is 40–64px, weight 500, line-height 1.04, tracking -0.055em.
Below 900px, text precedes the full-width photo; phones use 80px section spacing.
Responsive WebP images load lazily with reserved 4:3 geometry.

A single 300ms GSAP fade/12px translation runs when the section enters view,
with a 70ms separation between text and photograph. Content stays visible before
JavaScript and remains fully static when reduced motion is requested.
The supplied logo is now 144px wide on desktop and 92–108px on phones.

## Post-hero rhythm update

The standalone “Why this matters” statement has been removed. It repeated ideas
already made concrete by the hero and programs, and its inline image treatment
created an oversized pause after the program shortcuts. Supporter facts remain
in the dedicated community-partners section.

The supporting homepage now uses a tighter shared section interval: 120px on
wide screens, 96px on tablets, and 80px on phones. Large dark and photographic
bands use the same interval rather than introducing a second, larger gap. The
direction follows Radiating Hope's strongest qualities—authentic photography,
editorial scale, and decisive section changes—while retaining Cursor and
Linear's restraint and OpenByte's factual content.

## Restored post-hero narrative

The pre-redesign photographic/editorial sections are active again: interactive
program explorer, documented progress band, Arduino class feature, lesson log,
real workshop photo rail, team story, supporter ledger, device donation paths,
live Hack Club Bank funding surface, FAQ, contact, positions, and directory
footer. The later Split Studio replacement remains recoverable in source but is
not rendered.

The standalone “Why this matters” block remains removed. Section intervals stay
at the tightened 120px desktop, 96px tablet, and 80px phone rhythm requested in
the prior correction. The approved photographic hero and smaller supplied logo
remain unchanged.

---

# Earlier design reference — supporting routes

The November 2 production brief supersedes earlier light-mode studies. This is
one shared design system for `/`, `/classes/`, and `/privacy/`.

## Audience and purpose
Parents need to understand the programs and contact the student team. Sponsors
need documented activity, transparent funding, and a practical way to contribute.
The tone is precise, technical, quiet, and welcoming.

## Structure
Modern-minimal, custom OpenByte theme informed by measured Linear, Resend, and
Cursor references. See `design-references/dark/research.md` for sources and findings. Compact product navigation (N1b), split
hero with a functioning Blink editor, supporter wordmarks, a large mission
paragraph, three illustrated program columns, documented progress, Arduino
specification, a small photographic strip, team, funding, and compact directory
footer (Ft1). Supporting forms and existing details remain native disclosures.
The classes page uses a lesson document and equipment list within the same grid.

## Color tokens
All active visual colors are centralized in `tokens.css`.
- Canvas: #08090A; editor/surface: #0F1113; secondary surface: #14171A.
- Text: #F7F8F8; body: #B4B8BF; muted: #8A8F98.
- Hairline: rgba(255,255,255,.08); strong rule: rgba(255,255,255,.18).
- Accent/link/focus: #10B8F8. Used for the LED, links, and donation progress.
- Primary control: light fill with dark text; secondary: transparent with rule.
- No gradients, drop shadows, decorative background grids, or colored surfaces.

## Type and spacing
Self-hosted Geist Sans variable and Geist Mono. Font display optional keeps the
initial paint stable. Display weight 500, tracking -.05em, line-height 1.0.
Desktop hero 72px (up to 84px); mobile 46px. Section titles 48px/1.06,
mobile 36px. Mission 40px/1.25. Body 16–18px/1.65. Mono captions 11–12px.
4px spacing scale: 4,8,12,16,24,32,40,48,64,80,96,128. Desktop section spacing
128px; mobile 80px. Content width 1360px including gutters. Mobile gutters24px.
Controls are at least44px tall, radius6px; panels6px; photos2px. No pill buttons.

## Motion and interaction
GSAP: 300ms fade/12px translate on intersection, 70ms program stagger, and
600ms custom SVG wire/trace drawing. The hero editor enters over300ms; hero
headlines stay visible to preserve the first paint. GSAP is loaded on demand. 160ms hover underline and control
color changes. The editor types on first load; editing stops that sequence.
A single timer interprets the supported Blink sketch's HIGH/LOW delay values;
500ms on and500ms off by default. Run/pause and reset controls are keyboard usable.
This is a browser visualization, not a compiler or hardware connection.
Reduced motion disables typing, blinking, translation, and smooth scrolling.
The code and content remain readable without JavaScript.

## Content provenance
Source: https://openbyte-np.org, retrieved November2,2026.
Only documented counts: 2 online Arduino lessons (October11 and18,2026),
3 Adeept ESP32 smart-car kits, 1 introductory responsible-AI/web workshop in July.
Attendance and kit handoff totals remain under reconciliation. Grades6–9;
fall2026 fee $100 with take-home starter kit; future availability and locations
unannounced. Class parts list names only the documented LED, resistor, and
microcontroller; it is not represented as a complete kit inventory.
Names: Adithya Kandasamy, Abdullah Ahamed, Bodha Achi; Stone Bridge High School.
HCB totals are fetched at runtime, never hardcoded. Goal $5,000 from live site.
Leaderboard preserves anonymous gifts and HCB public-recognition consent.

## Preservation and accessibility
Keep static export/deployment, privacy policy, real photos, external links,
Google device/positions forms, HCB checkout, funding total and leaderboard.
Semantic sections, descriptive labels, visible focus, 44px controls, contrast
AA, native details, no horizontal overflow at320/375/390/414/768/1440.

## Assets pending
OpenByte typeset wordmark is a placeholder. All five supporter/press names use
explicitly identified text wordmarks pending approved monochrome SVGs: Adeept,
Ashburn Art Classes, Robeks of Loudoun, Hack Club, Bulldog Tribune. Real photos
are local with matching crops and grayscale treatment. Illustrations are custom SVG.

## Portable exports
`tokens.css` contains the complete shared CSS token system. `app/tailwind.css`
exposes its color/font/radius/spacing roles through Tailwind4 `@theme inline`.
These are the portable CSS and Tailwind exports of this system.
