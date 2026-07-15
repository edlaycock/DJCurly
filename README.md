# DJ Curly — djcurly.co.uk

One-page website for DJ Curly: soul, disco, boogie and funk on original vinyl, out of Hersham, Surrey.

## What's here

This is a plain static website — no build step, no dependencies, no server-side code.

```
index.html    The whole site (single page, includes SEO/AEO structured data)
styles.css    All styling, responsive down to mobile
script.js     Booking form handler (emails requests to hello@djcurly.co.uk)
robots.txt    Crawler rules + sitemap location
sitemap.xml   Sitemap for search engines
llms.txt      Plain-language site summary for AI assistants (AEO)
assets/       All photos, fonts and favicons
design/       Original Claude Design handoff bundle (reference only — not served)
```

## Going live

### Hostinger (current host)

In **Websites → djcurly.co.uk → Deployments → Settings**, use:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework preset | Other           |
| Branch           | main            |
| Root directory   | ./              |
| Build command    | `npm run build` |
| Package manager  | npm             |
| Output directory | `dist`          |
| Entry file       | *(leave empty)* |

The "build" simply copies the static files into `dist/`, which Hostinger serves.

### Any other host

Point any web server at the repository root (or copy the files into your web root). For example:

```bash
git clone https://github.com/edlaycock/DJCurly.git
# then serve index.html, styles.css, script.js and assets/ from your web root
```

Works on any host: Apache/nginx, cPanel, GitHub Pages, Netlify, Cloudflare Pages, etc.
The `design/` folder doesn't need to be deployed.

To preview locally:

```bash
cd DJCurly
python3 -m http.server 8000
# open http://localhost:8000
```

## Editing content

Everything editable lives in `index.html`:

- **Gigs** — the "Where to find Curly" list (`<ul class="gig-list">`)
- **Testimonials** — the three `<blockquote class="t-card">` blocks
- **Track ticker** — the pink marquee (edit both `.ticker-group` copies so the loop stays seamless)
- **Contact details** — phone, email and location in the "Book the night" section
- **Social links** — the Instagram/Facebook buttons are placeholders (`href="#"`); drop in the real profile URLs
- **Photos** — swap files in `assets/` (keep the same filenames, or update the `src` in `index.html`)

The booking form submits through [FormSubmit](https://formsubmit.co), which emails each request to **hello@djcurly.co.uk** — no server code needed. One-time setup: the first submission triggers an activation email to hello@djcurly.co.uk; click the confirmation link in it and all future submissions arrive normally. If FormSubmit is ever unreachable, the form falls back to opening the visitor's email app pre-addressed to hello@djcurly.co.uk.
