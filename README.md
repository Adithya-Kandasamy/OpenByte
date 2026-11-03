# OpenByte

The OpenByte nonprofit website, built with Next.js and exported as a static site for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the site.

## Checks

```bash
npm run typecheck
npm run build
```

The build writes the deployable static site to `out/`. The GitHub Actions workflow deploys that folder to GitHub Pages and preserves `openbyte-np.org` through `public/CNAME`.

## Design and production preview

The shared dark design system is documented in `DESIGN.md`; reference research
and production screenshots are in `design-references/dark/`.

Routes: `/`, `/classes/`, `/privacy/`. Fonts are self-hosted Geist Sans/Mono.
Tailwind 4 exposes the shared tokens. GSAP is loaded on demand for entrances,
program staggering, and SVG line drawing; reduced motion keeps a static page.
The editable Blink sketch visualizes supported pin-13 HIGH/LOW delays locally.

For a production preview after building:

```bash
python3 -m http.server 4174 --bind 127.0.0.1 --directory out
```

Vercel can use its Next.js preset with `npm run build`; `output: "export"` is
already configured. The existing GitHub Pages deployment is also preserved.
This checkout has not been deployed by the redesign task.

The device donation and volunteer applications keep their original Google Forms
URLs. Payments open HCB's secure checkout. Donation totals come from the public
HCB API; donor names follow HCB recognition settings. No totals are hardcoded.
Approved SVG wordmarks are still needed for OpenByte and the five supporter/
press names listed in `DESIGN.md`.
