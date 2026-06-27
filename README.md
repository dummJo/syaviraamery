# Dr. Syavira Amelia Risanty — Portfolio

Personal one-page site for **Dr. Syavira Amelia Risanty**, internal medicine physician (Jakarta, ID).
Signature element: an interactive **drag-to-reveal hero** that wipes between a *warm minimalist*
identity and a *clinical / HUD* mode.

🔗 **Live:** https://syaviraamery.vercel.app

---

## Stack

Intentionally **dependency-free**. No framework, no build step, no runtime CDN calls.

- Plain semantic **HTML** (`index.html`)
- **CSS** with self-hosted fonts and scroll-driven animations (`assets/css/styles.css`)
- A small **vanilla JS** module for the hero interaction + contact form (`assets/js/app.js`)
- Fonts (Cormorant Garamond · Manrope · JetBrains Mono) **self-hosted** as `woff2` — no Google Fonts request
- Hosted on **Vercel** (static), CI/CD from GitHub `main`

> Origin note: this page started as a bundled interactive artifact that loaded React + Babel from a
> CDN and transpiled in the browser. It was rewritten into this static, production-grade structure —
> no in-browser transpilation, no third-party runtime dependency, far smaller and faster.

## Structure

```
.
├── index.html              # markup + head (SEO, Open Graph, JSON-LD Physician schema)
├── favicon.svg             # brand mark (cross-in-circle)
├── robots.txt / sitemap.xml
├── vercel.json             # clean URLs, security headers, asset caching
└── assets/
    ├── css/styles.css      # @font-face, base, animations, hover/focus, responsive
    ├── js/app.js           # hero drag-reveal + contact form
    └── fonts/*.woff2       # self-hosted (unicode-range subsets)
```

## Local development

No tooling needed — it's static. Serve the folder over HTTP (not `file://`):

```bash
python3 -m http.server 8077
# → http://localhost:8077
```

## Deployment

Pushing to `main` auto-deploys via Vercel's GitHub integration.
Manual deploy:

```bash
npx vercel@latest deploy --prod --scope dummvinci
```

## Editing guide

- **Copy / sections** — edit `index.html` directly (sections: hero, about, expertise, stats,
  journey, services, contact, footer).
- **Contact form** — delivery target is set in `assets/js/app.js` (`FORM_ENDPOINT`,
  via [FormSubmit.co](https://formsubmit.co)). The first live submission sends a one-time
  activation email to that address; confirm it for delivery to begin.
- **WhatsApp** — replace the placeholder number `62800000000` in `index.html` (search `wa.me`).
- **Portraits** — the hero/about portraits are currently designed monogram placeholders. Drop real
  photos in and swap the placeholder `<div>`s for `<img>`s.

## TODO

- [ ] Real portrait photography (hero warm, hero clinical, about)
- [ ] Real WhatsApp number
- [ ] Confirm `hello@drsyavira.id` mailbox + complete FormSubmit activation
- [x] `og:image` (1200×630) for richer link previews → `assets/og.png`
- [ ] Real clinic address / map, credentials, and finalized copy

---

Created by **DummVinci™**.
