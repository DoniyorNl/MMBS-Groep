# SEO implementation lesson — MMBS Groep (NL & EN)

This document explains what was implemented to strengthen technical and on-page SEO for the construction / facade services site, using the keyword themes you provided (brickwork, gevelrenovatie, monument restoration, insulation, scaffolding) and best practices for a bilingual Next.js app.

## 1. URL structure and hreflang

### Canonical pattern

| Language | Services index | Example detail URL |
|----------|----------------|--------------------|
| Dutch (nl) | `/nl/diensten` | `/nl/diensten/metselwerk` |
| English (en) | `/en/services` | `/en/services/brickwork` |

- **Dutch** keeps the natural segment `diensten` and **existing Dutch-style slugs** (e.g. `metselwerk`, `gevelrenovatie`).
- **English** uses the segment `services` and **English slugs** (e.g. `brickwork`, `facade-renovation`, `monument-restoration`, `insulation`, `scaffolding`).

This matches the intent of ranking for English queries on `/en/...` and Dutch queries on `/nl/...`, with URLs that read naturally in each language.

### Redirects (301)

Implemented in `middleware.ts` so old or mistaken URLs consolidate cleanly:

- `/en/diensten` → `/en/services`
- `/en/diensten/{dutch-slug}` → `/en/services/{english-slug}`
- `/nl/services` → `/nl/diensten`
- `/nl/services/{english-slug}` → `/nl/diensten/{dutch-slug}`

The homepage language switcher only swaps the locale segment; these redirects fix the service path when the locale and path do not match.

### hreflang and alternates

- **Per-service pages** (`buildServicePageMetadata` in `src/lib/service-metadata.ts`): `alternates.canonical`, `alternates.languages.nl`, `alternates.languages.en`, and `alternates.languages["x-default"]` (default Dutch, as `defaultLocale` is `nl`).
- **Services listing**: metadata on `src/app/[locale]/diensten/page.tsx` and `src/app/[locale]/services/page.tsx` with the same cross-links.
- **Root locale layout** (`src/app/[locale]/layout.tsx`): `x-default` added for the home canonical.
- **Sitemap** (`src/app/sitemap.ts`): service index and each service detail appear as **pairs** of URLs (NL + EN) sharing the same `alternates.languages` block so search engines see the reciprocal hreflang set.

## 2. Keyword-rich metadata (not stuffed)

Central data lives in `src/data/service-seo.ts`:

- **Title** and **meta description** per service, per language, weaving in high-value phrases (e.g. *metselwerk aannemer*, *brickwork contractor*, *gevelrenovatie aannemer*, *rijksmonument*, *scaffolding hire*, etc.).
- **`keywords`**: arrays passed to Next.js metadata for documentation and tooling; primary ranking signals remain **title**, **description**, and **visible content**.

Layout still uses `title.template` so page titles render as:  
`{SEO title} | {SITE_CONFIG.name}`.

## 3. Structured data (JSON-LD)

- **LocalBusiness** in `src/app/[locale]/layout.tsx` now includes `"@id": "{SITE_URL}/#organization"` so other entities can reference one stable organization ID.
- **Service** + **BreadcrumbList** on each service detail page via `buildServicePageJsonLd` in `src/lib/service-jsonld.ts`, embedded in `ServiceDetailView`. The `Service` references `provider: { "@id": "{SITE_URL}/#organization" }` for alignment with LocalBusiness.

## 4. Site URL default

`SITE_CONFIG.url` in `src/lib/constants.ts` defaults to `https://mmbs-groep.vercel.app` when `NEXT_PUBLIC_SITE_URL` is unset. In production you should set `NEXT_PUBLIC_SITE_URL` to the final domain (including `https`) so canonicals, Open Graph URLs, and JSON-LD stay correct.

## 5. Internal linking and navigation

- `src/lib/services-routing.ts` exposes `getServiceIndexPath`, `getServiceDetailPath`, `getNavItemHref`, etc.
- Header, footer, mobile menu, and the home “Services” section use these helpers so **Dutch** users never get `/en/...` paths and **English** users get `/en/services/...` with English slugs.

## 6. What you should still do off-site (not in code)

These items were in your plan but are **outside** this repository:

1. **Google Business Profile** — complete profile, categories, service areas, photos, posts, and reviews (strong local signals).
2. **Content marketing** — e.g. articles on *gevelrenovatie kosten*, *repointing*, *rijksmonument subsidies*; they deserve dedicated routes under `/nieuws` or a `/kennisbank`-style section when you add them.
3. **Backlinks** — trade associations, municipalities, heritage (RCE), press, and case-study pages per major project.
4. **Local modifiers** — body copy and occasional headings can mention cities (e.g. Utrecht, Amsterdam) where you operate; avoid thin duplicate “doorway” pages.

## 7. Files touched (reference)

| Area | Files |
|------|--------|
| Routing & URLs | `src/lib/services-routing.ts`, `middleware.ts` |
| SEO copy & keywords | `src/data/service-seo.ts` |
| Metadata | `src/lib/service-metadata.ts` |
| JSON-LD | `src/lib/service-jsonld.ts` |
| Service data | `src/data/services.ts`, `src/types/index.ts` |
| UI | `src/components/features/services/ServiceDetailView.tsx`, `ServicesListing.tsx` |
| Routes | `src/app/[locale]/diensten/...`, `src/app/[locale]/services/...` |
| Sitemap | `src/app/sitemap.ts` |
| Layout schema | `src/app/[locale]/layout.tsx` |
| Nav / sections | `Header.tsx`, `Footer.tsx`, `MobileMenu.tsx`, `Services.tsx` |

## 8. Quick verification checklist

1. `npm run build` passes.
2. Open `/nl/diensten/metselwerk` and `/en/services/brickwork`; view source and confirm `<link rel="canonical">` and `hreflang` alternates.
3. Confirm JSON-LD with Google’s Rich Results Test (or Schema validator).
4. Submit sitemap in Google Search Console: `https://{your-domain}/sitemap.xml`.
5. After deploy, use “URL Inspection” on a few service URLs to request indexing.

This setup aligns technical SEO (clean URLs, redirects, hreflang, structured data) with the keyword themes you listed; ongoing rankings will still depend on content depth, backlinks, and local presence as in section 6.
