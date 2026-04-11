# MMBS Groep — loyiha yakuni (2026-04-11)

Bu hujjat loyiha yopilishiga qadar amalga oshirilgan asosiy texnik ishlarni bir joyda saqlaydi. Batafsil SEO tavsiflari: [`../lesson-seo.md`](../lesson-seo.md).

## 1. Vacature / contact forma

- `?vacature={id}` bo‘lsa PDF **CV** majburiy (`ContactForm.tsx`, multipart).
- `/api/contact` — Resend bilan PDF ilova; JSON bilan `vacature` yuborish rad etiladi.
- `ContactEmail` — sollicitatie uchun vacature qatori.
- Tarjimalar: `contact.cv_*`, `send_another`.

## 2. Xizmatlar URL va SEO

- **NL:** `/nl/diensten`, `/nl/diensten/{slugNl}`
- **EN:** `/en/services`, `/en/services/{slugEn}`
- `src/lib/services-routing.ts`, `src/data/services.ts` (`slugNl` / `slugEn`).
- `middleware.ts` — noto‘g‘ri til+segment kombinatsiyalarini 301 bilan tuzatadi.
- `src/data/service-seo.ts` — sahifa title/description/keywords (NL+EN).
- `src/lib/service-metadata.ts` — `generateMetadata` uchun canonical, hreflang, OG, Twitter.
- `ServiceDetailView` — Service + BreadcrumbList JSON-LD.

## 3. next-sitemap

- `next-sitemap.config.js` — `siteUrl: https://mmbs-groep.vercel.app`, `postbuild: next-sitemap`.
- `public/sitemap.xml`, `public/robots.txt` builddan keyin.
- `src/app/sitemap.ts` va `src/app/robots.ts` olib tashlangan (static `public/` ustun).

## 4. Global metadata

- `src/app/layout.tsx` — `metadataBase`, title template, keywords, OG/Twitter, `alternates` + `x-default`.
- OG rasm: `/opengraph-image` (mavjud `opengraph-image.tsx`).
- `src/lib/media.ts` — fallback OG URL `/opengraph-image`.

## 5. Locale layout — JSON-LD

- `ConstructionCompany` + `LocalBusiness`, `@id` `#organization`.
- Manzil `SITE_CONFIG` (Utrecht), `openingHoursSpecification`, `areaServed: Netherlands`.
- `hasOfferCatalog` — 5 xizmat, locale bo‘yicha haqiqiy URL va `next-intl` nomlari.

## 6. next.config.ts

- **Headers:** `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` (barcha `/:path*`).
- **Redirects:** yo‘q — asosiy domen `https://mmbs-groep.vercel.app` (maxsus `.nl` domeni sotib olinganda `NEXT_PUBLIC_SITE_URL` va Vercel DNS ni yangilash mumkin).

## 7. Tekshiruvlar (yakuniy)

Loyiha yopilishidan oldin odatda quyidagilar ishga tushiriladi:

```bash
npm run lint
npm run type-check
npm run build
```

(`build` ichida `postbuild` orqali `next-sitemap` ham ishlaydi.)

## 8. Keyingi qadamlar (tashqarida)

- Google Search Console, Google Business Profile.
- Production `NEXT_PUBLIC_SITE_URL=https://mmbs-groep.vercel.app` (keyingi `.nl` domeni ulanganda shu o‘zgaruvchini yangilang).
- Ixtiyoriy: `public/logo.png` va JSON-LD `logo` maydoni.

---

*Oxirgi yangilanish: 2026-04-11.*
