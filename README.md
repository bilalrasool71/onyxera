# OnyxEra Tech

Marketing site for OnyxEra Tech — web and software development, SEO, digital
marketing, automation and cyber security.

**Live:** https://onyxeratech.com

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS v4 (`@theme`, no config file) |
| Icons | lucide-react |
| Language | TypeScript 5 |
| Output | Static export (`output: "export"`) |
| Hosting | Firebase Hosting, `cleanUrls` on |
| Analytics | Google Analytics 4 (`G-5ZLFDQZ95F`) |

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into out/
```

There is no `npm start` worth using — the site is a static export, so `out/` is the
artefact. Serve it with any static server to preview a production build.

### Deploying

```bash
npm run build && npx firebase deploy --only hosting
```

`firebase.json` publishes `out/`, enables `cleanUrls`, and carries three redirects
and two header rules.

---

## Layout

```
src/
  app/                     routes (App Router)
    layout.tsx             fonts, theme boot script, schema.org, GA4
    globals.css            the entire design system — read this first
    services/[slug]/       one template, five services
    work/[slug]/           one template, ten case studies
    sitemap.ts robots.ts   both need `export const dynamic = "force-static"`
  components/
    layout/                Navbar, Footer
    sections/              page-level blocks
    ui/                    primitives (Button, Accordion, Logo, …)
  lib/
    site.ts                company details — the single source of truth
    data/
      services/            one file per service + a barrel at services.ts
      legal/               one file per policy + a barrel at legal.ts
      case-studies.ts      ten real engagements
      agency.ts            stats, process, principles
public/images/work/        case-study covers and image sets
```

`src/lib/data/services.ts` and `legal.ts` are **barrels**. The data lives in the
folders beside them, one file per service and per policy, so several people can edit
different ones without conflicting. Import sites are unchanged.

---

## Design system

Everything lives in `src/app/globals.css` in three layers:

1. **Palette** — fixed brand values (`--color-navy-*`, `--color-blue-*`, `--color-canvas`)
2. **Semantic** — `--bg`, `--fg`, `--fg-muted`, `--accent`, `--line`, `--brand-surface`
   … declared three times: bare `:root` (dark), `[data-theme="light"]`, and the
   `prefers-color-scheme: light` media query
3. **Utilities** — `.card`, `.btn`, `.eyebrow`, `.card-brand` …

Theme is committed to `<html>` by an inline script before first paint, so there is no
flash. Precedence is stored choice → system → dark.

### Traps that have already cost time

Read these before editing styles. Each one shipped a real bug.

- **Never build a class name by interpolation.** Tailwind v4 scans source as static
  text. `` `h-[calc(2.5rem*${scale})]` `` emits no rule at all, and the element
  silently falls back to its intrinsic size — a logo rendered at 530px and was
  clipped by the header for exactly this reason. Use a map of literal strings.
- **`cn()` is a plain join, not `tailwind-merge`.** Conflicting classes resolve by
  *stylesheet* order, not argument order. Make branches mutually exclusive rather
  than relying on one overriding another.
- **Never name a colour token after a font-size step.** A `--color-base` token made
  Tailwind emit `.text-base{color:…}`, which replaced the built-in font-size utility
  and made ten elements invisible. The background token is `--color-canvas` for this
  reason.
- **Never use `dark:` variants.** Change the token, not the call site.
- **A colour must never be defined only inside a media or `[data-theme]` block** — it
  will not apply in the un-stamped default state.
- **`--fg-ghost` is decoration only** (1.39:1 against the background, by design). It
  is the fill for oversized watermark numerals. Readable text uses `--fg-faint`
  (8.5:1 dark / 4.8:1 light) or lighter.
- **White on the literal brand blue `#6A9BD1` is 2.55:1 — it fails AA.** Where white
  type sits on blue, use `--brand-surface` (4.91:1). `.card-brand` and `.band-accent`
  already do.

### Type

| Face | Role | Why |
|---|---|---|
| Schibsted Grotesk | Headings | Editorial authority, six weights, normal width |
| Montserrat | Body, UI | Brand secondary |
| Michroma | Eyebrows and labels only | Brand primary, but a logotype face: one weight and 1.63× wider than a normal sans, so it cannot carry headings without forcing a 38% size cut |

---

## Static export constraints

`output: "export"` means no server at runtime. In practice:

- `sitemap.ts` and `robots.ts` need `export const dynamic = "force-static"`.
- There are no route handlers. The contact form has **no backend yet** — it falls
  back to `mailto:`, which is not a real submission workflow. This is the outstanding
  launch blocker; wire Formspree, Web3Forms or a Firebase Function.
- Redirects live in `firebase.json`, not `next.config.ts`.
- Firebase header rules are **last-match-wins**: put the catch-all first and the
  specific hashed-asset rule after it, or `immutable` gets stripped.

---

## Content integrity

This site previously carried invented case studies, testimonials and metrics. They
have all been removed. The rule going forward:

> Publish nothing that cannot be traced to a client document or a verifiable source.

- The ten case studies in `case-studies.ts` are real engagements. Only three clients
  are named (Mobile Amusements, Southern Clinic, SnowAds) — the rest are described by
  industry because the source briefs did not name them. **Do not name them.**
- `quote`, `stack`, `year` and `duration` are optional on `CaseStudy` precisely so a
  missing testimonial never has to be invented to satisfy the type. One study carries
  a real client quote; the others render no quote card.
- Where a figure has no source, the field is left empty and the section self-hides.
  `seo.ts` has empty `metrics` and `deliverables` for this reason.
- Business details come from `src/lib/site.ts`. Australia is the **operating
  location**; the US and Singapore are **mailing addresses** and must never be
  described as offices.

Several legal clauses are flagged `needsReview: true` — they make commitments a
solicitor should confirm. The Terms have **no governing-law clause**, because the
source document supplied none.

---

## Known outstanding work

- Contact form backend (the real launch blocker)
- Hero artwork for SEO, Web Applications and Digital Marketing
- Image sets for the seven case studies that have none
- Google Search Console verification and sitemap submission
- Governing law for Terms and Returns & Refunds
- Confirmation that the client logos in the "Trusted by" band are OnyxEra's own
  clients and cleared for use
