# MMBS Groep — Loyiha Progressi
> Oxirgi yangilanish: 4 Aprel 2026

---

## Umumiy holat: **Phase 7/8 tugagan** ✅

```
████████████████████████████░░░░   ~75% complete
```

---

## ✅ Tugagan Fazalar

### Phase 0 — Setup & Configuration
- [x] Next.js 16.2.2 + TypeScript (strict mode)
- [x] Tailwind CSS v4 (CSS-first config)
- [x] Barcha npm packages o'rnatildi (`next-themes` qo'shildi)
- [x] `eslint.config.mjs` — ESLint 9 flat config
- [x] `.prettierrc` + `prettier-plugin-tailwindcss`
- [x] `.env.example` fayl yaratildi
- [x] `next.config.ts` — image optimization, next-intl plugin
- [x] `vercel.json` — security headers
- [x] `tsconfig.json` — strict mode, path aliases

### Phase 1 — Design System
- [x] `globals.css` — CSS variables, dark mode, system fonts (SF Pro Display)
- [x] `src/lib/utils.ts` — `cn()`, `formatPrice()`, `slugify()`
- [x] `src/lib/constants.ts` — SITE_CONFIG, NAV_ITEMS, SERVICE_SLUGS
- [x] `Button.tsx` — primary/secondary/ghost/outline, asChild prop fix
- [x] `Badge.tsx`, `Card.tsx`, `Input.tsx`, `Textarea.tsx`
- [x] `ScrollReveal.tsx` — Framer Motion intersection observer
- [x] `AnimatedCounter.tsx` — spring animation
- [x] `ImageWithFallback.tsx`
- [x] `BackToTop.tsx` — scroll-triggered, smooth animation *(yangi)*
- [x] `Breadcrumbs.tsx` — Schema.org BreadcrumbList markup *(yangi)*
- [x] `ThemeToggle.tsx` — 🌙/☀️ dark mode toggle *(yangi)*

### Phase 2 — i18n Setup
- [x] `middleware.ts` — next-intl locale routing
- [x] `src/i18n/routing.ts` — defineRouting (pathnames olib tashlandi)
- [x] `src/i18n/request.ts` — getRequestConfig
- [x] `messages/nl.json` — 400+ Dutch translation keys
- [x] `messages/en.json` — 400+ English translation keys
- [x] **BUG FIX:** `setRequestLocale(locale)` barcha layout + page larga qo'shildi
- [x] **BUG FIX:** `NextIntlClientProvider locale={locale}` prop qo'shildi

### Phase 3 — Layout Components
- [x] `Header.tsx` — sticky, dark mode toggle, offerte tugmasi har doim ko'rinadi
- [x] `MobileMenu.tsx` — fullscreen overlay, ThemeToggle, offerte link
- [x] `Footer.tsx` — 3 kolumn, social links, privacy/terms links
- [x] `LanguageSwitcher.tsx` — `window.location.assign` yondashuvi
- [x] `ThemeProvider.tsx` — next-themes wrapper *(yangi)*
- [x] `app/layout.tsx` — ThemeProvider qo'shildi
- [x] `app/[locale]/layout.tsx` — skip-to-content, BackToTop, CookieBanner

### Phase 4 — Homepage
- [x] `Hero.tsx` — full viewport, animated, dual CTA, letter-spacing fix
- [x] `Stats.tsx` — animated counters
- [x] `Services.tsx` — 5 service cards, translation keys
- [x] `Projects.tsx` — 3 featured projects, onError fix
- [x] `WhyUs.tsx` — 4 USP value propositions
- [x] `Testimonials.tsx` — 3 client testimonials
- [x] `CTA.tsx` — primary → /offerte, secondary → /contact

### Phase 5 — Ichki Sahifalar
- [x] `/diensten` — services grid, icons, badges
- [x] `/diensten/[slug]` — hero image, features, pricing, related projects, Breadcrumbs
- [x] `/projecten` — filter by type (client component), masonry grid
- [x] `/projecten/[slug]` — gallery, details sidebar, related projects, Breadcrumbs
- [x] `/contact` — ContactForm, info cards, Google Maps embed
- [x] `/offerte` — Calculator (3-step), sidebar, trust elements *(yangi)*
- [x] `/over` — story, timeline, team, certifications
- [x] `/vacatures` — open positions, benefits
- [x] `/nieuws` — featured + grid, category labels
- [x] `/nieuws/[slug]` — article, sidebar, Breadcrumbs
- [x] `/privacybeleid` — NL + EN, 8 bo'lim, GDPR muvofiq *(yangi)*
- [x] `/algemene-voorwaarden` — NL + EN, 9 modda *(yangi)*

### Phase 6 — Features
- [x] `src/app/api/contact/route.ts` — validation, logging
- [x] `src/app/api/quote/route.ts` — estimate calculation
- [x] `src/app/api/chat/route.ts` — rule-based chatbot
- [x] `ContactForm.tsx` — 3-step form, success/error states
- [x] `Calculator.tsx` — 3-step, real-time price estimate
- [x] `Chatbot.tsx` — floating widget, chat window
- [x] `CookieBanner.tsx` — GDPR, localStorage, Framer Motion *(yangi)*
- [ ] Email integratsiya (Resend) — KEYIN
- [ ] AI Chatbot (Gemini) — KEYIN

### Phase 7 — SEO + Performance + Legal
- [x] `generateMetadata` — barcha sahifalarda
- [x] JSON-LD LocalBusiness schema — locale layout
- [x] `app/sitemap.ts` — barcha locale + route + alternates *(yangi)*
- [x] `app/robots.ts` — /api/ bloklangan *(yangi)*
- [x] `app/opengraph-image.tsx` — Next.js ImageResponse, black/white *(yangi)*
- [x] `app/not-found.tsx` — root 404 (html/body yo'q) *(yangi)*
- [x] `app/[locale]/not-found.tsx` — locale 404, Header/Footer bilan *(yangi)*
- [x] `app/[locale]/error.tsx` — error boundary, dev stack *(yangi)*
- [x] Dark mode — CSS variables, next-themes *(yangi)*
- [x] Skip-to-content — accessibility (WCAG) *(yangi)*
- [ ] Lighthouse audit — deploy dan keyin
- [ ] Dynamic imports — code splitting

---

## ⏳ Qolgan Fazalar

### Phase 8 — Deploy (Ertangi kun)

#### Ustuvorlik 1 — Email (Resend)
- [ ] `RESEND_API_KEY` olish → resend.com
- [ ] `src/emails/ContactEmail.tsx` — react-email template
- [ ] `src/emails/QuoteEmail.tsx` — react-email template
- [ ] `/api/contact` → Resend bilan bog'lash
- [ ] `/api/quote` → Resend bilan bog'lash

#### Ustuvorlik 2 — Rasmlar
- [ ] Loyiha rasmlari `public/images/projects/` → WebP format
- [ ] Xizmat rasmlari `public/images/services/` → WebP format

#### Ustuvorlik 3 — AI Chatbot
- [ ] `GEMINI_API_KEY` olish → aistudio.google.com
- [ ] `@ai-sdk/google` o'rnatish
- [ ] `/api/chat` → real Gemini streaming

#### Ustuvorlik 4 — Production tekshirish
- [ ] `npm run build` — error yo'q
- [ ] `npm run type-check` — TypeScript clean
- [ ] Lighthouse: Performance 95+, SEO 100, Accessibility 90+
- [ ] Mobile 320px → 1920px test

#### Ustuvorlik 5 — Vercel Deploy
- [ ] GitHub push (main)
- [ ] Vercel project connect
- [ ] Environment variables: `RESEND_API_KEY`, `GEMINI_API_KEY`, `NEXT_PUBLIC_SITE_URL`
- [ ] Custom domain (mmbs.nl) — ixtiyoriy
- [ ] Production Lighthouse audit

---

## Siz Tayyorlashingiz Kerak
- [ ] `RESEND_API_KEY` — [resend.com](https://resend.com) (bepul, 3000 ta/oy)
- [ ] `GEMINI_API_KEY` — [aistudio.google.com](https://aistudio.google.com) (bepul)
- [ ] Loyiha rasmlari (real yoki AI generate)
- [ ] Haqiqiy kontent (jamoat, sertifikatlar, yangiliklar)

---

## Definition of Done
- [ ] Lighthouse: Performance **95+**, SEO **100**, Accessibility **90+**
- [ ] Mobile: 320px → 1920px responsive
- [ ] NL + EN to'liq tarjima ✅
- [ ] `npm run build` — error yo'q
- [ ] `npm run type-check` — error yo'q
- [ ] `npm run lint` — warning yo'q
- [ ] Vercel da **live**
