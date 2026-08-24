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
