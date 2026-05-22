# SEVENKEY — Official Website

Landing page for **Sevenkey**, Colombian DJ & producer — Afro House · House · Indie Dance.

Featured new single (*Heaven*), latest singles carousel, "This Is Sevenkey" Spotify playlist,
live video sets, bio, collaborators, tour venues, a demo-submission CTA for **Momentvm Music**,
and social links.

## Stack

Static site — plain **HTML + CSS + vanilla JS**. No build step, no dependencies.

| File | Purpose |
|------|---------|
| `index.html` | Page markup |
| `css/styles.css` | Styling — liquid-glass surfaces, animations, responsive layout |
| `js/main.js` | Singles marquee, scroll reveals, pointer/tilt effects, nav |
| `assets/image/` | Photos, logos |

## Run locally

Just open `index.html` in a browser, or serve the folder with any static server, e.g.:

```bash
# Python
python -m http.server 8080
# Node
npx serve .
```

## Deploy (Netlify)

Connected to Netlify via Git. Every push to `main` auto-publishes.
Publish directory: repository root (see `netlify.toml`).
