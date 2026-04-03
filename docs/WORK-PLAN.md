# MMBS Groep — AI Work Plan
> Bu fayl AI (men) tomonidan loyiha kuzatuvi uchun ishlatiladi.
> Har bir fazani tugatgandan keyin yangilanadi.

---

## Status Legend
- ✅ Done
- 🔄 In Progress
- ⏳ Pending
- ❌ Blocked

---

## FASE 0 — Setup & Configuration 🔄

### Maqsad
Loyiha skeleti, barcha config fayllar, dependencies

### Tasks
- [ ] `npx create-next-app@latest` run
- [ ] Barcha npm packages o'rnatish (tuzatilgan package.json bilan)
- [ ] `eslint.config.mjs` — flat config (ESLint 9)
- [ ] `.prettierrc` + `prettier-plugin-tailwindcss`
- [ ] `.env.example` fayl
- [ ] `.gitignore` tekshirish
- [ ] `next.config.ts` — security headers, image domains
- [ ] `tsconfig.json` — strict mode, path aliases
- [ ] `vercel.json` — security headers

### Qoidalar (Senior-Level)
- TypeScript strict: true — hech qachon `any` ishlatmaymiz
- Barcha env vars Zod bilan validate qilinadi
- Server Components default, Client Components faqat kerak bo'lganda

---

## FASE 1 — Design System ⏳

### Maqsad
Reusable UI primitives, design tokens, typography

### Tasks
- [ ] `src/app/globals.css` — CSS variables + Tailwind v4 `@theme` block
- [ ] `src/app/layout.tsx` — root layout, next/font setup (Syne + DM Sans)
- [ ] `src/lib/utils.ts` — `cn()` helper
- [ ] `src/lib/constants.ts` — site config, nav items, social links
- [ ] `src/components/ui/Button.tsx` — primary, secondary, ghost, outline variants
- [ ] `src/components/ui/Badge.tsx`
- [ ] `src/components/ui/Card.tsx`
- [ ] `src/components/ui/Input.tsx`
- [ ] `src/components/ui/Textarea.tsx`
- [ ] `src/components/ui/ScrollReveal.tsx` — Intersection Observer wrapper
- [ ] `src/components/ui/AnimatedCounter.tsx`
- [ ] `src/components/ui/ImageWithFallback.tsx`

### Design Tokens (globals.css @theme)
```
--background: #0A0A0A
--surface: #111111
--surface-hover: #1A1A1A
--border: #222222
--text-primary: #F5F5F0
--text-secondary: #888888
--accent: #C8A96E  (warm gold)
```

---

## FASE 2 — i18n Setup ⏳

### Maqsad
next-intl bilan NL/EN routing va translations

### Tasks
- [ ] `middleware.ts` — locale detection + routing (ROOT levelda!)
- [ ] `src/i18n/routing.ts` — defineRouting (nl default)
- [ ] `src/i18n/request.ts` — getRequestConfig
- [ ] `messages/nl.json` — Dutch (barcha textlar)
- [ ] `messages/en.json` — English (barcha textlar)
- [ ] `src/app/[locale]/layout.tsx` — locale provider

### i18n Namespaces
- nav, hero, stats, services, projects, whyus, testimonials, cta
- about, contact, vacatures, nieuws, footer, common, errors

---

## FASE 3 — Layout Components ⏳

### Maqsad
Header, Footer, Navigation

### Tasks
- [ ] `src/components/layout/Header.tsx`
  - Sticky + backdrop blur on scroll
  - Logo | Nav | CTA + LanguageSwitcher
  - useScrolled hook
- [ ] `src/components/layout/MobileMenu.tsx`
  - Fullscreen overlay, Framer Motion animation
- [ ] `src/components/layout/Footer.tsx`
  - 3 kolumn: logo+desc | nav | contact
  - Bottom bar: copyright + legal
- [ ] `src/components/layout/LanguageSwitcher.tsx`

---

## FASE 4 — Homepage ⏳

### Maqsad
Full homepage barcha sections

### Sections order
1. `Hero.tsx` — full viewport, headline + dual CTA
2. `Stats.tsx` — AnimatedCounter (20+ yil, 1500+ proy, 100+ prof)
3. `Services.tsx` — 5 xizmat cards
4. `Projects.tsx` — 3 featured + "Barcha" link
5. `WhyUs.tsx` — 4 USP value proposition
6. `Testimonials.tsx` — 3 mijoz fikri
7. `CTA.tsx` — "Offerte aanvragen" dark section

---

## FASE 5 — Inner Pages ⏳

### Pages
1. `/diensten` — services grid
2. `/diensten/[slug]` — single service
3. `/projecten` — masonry grid + filter
4. `/projecten/[slug]` — image gallery + details
5. `/contact` — form + map + info
6. `/over` — about page
7. `/vacatures` — open positions
8. `/nieuws` + `/nieuws/[slug]` — news

### Data Files
- `src/data/services.ts`
- `src/data/projects.ts`
- `src/data/testimonials.ts`
- `src/data/team.ts`
- `src/data/vacatures.ts`

---

## FASE 6 — Advanced Features ⏳

### AI Chatbot
- [ ] `src/app/api/chat/route.ts` — @ai-sdk/google + streaming
- [ ] `src/components/features/chatbot/ChatWidget.tsx`
- [ ] `src/components/features/chatbot/ChatWindow.tsx`
- [ ] `src/components/features/chatbot/ChatMessage.tsx`

### Quote Calculator
- [ ] `src/data/calculator.ts` — pricing logic
- [ ] `src/app/api/quote/route.ts` — submit + Resend email
- [ ] `src/components/features/calculator/QuoteCalculator.tsx`
- [ ] `src/components/features/calculator/ServiceSelector.tsx`
- [ ] `src/components/features/calculator/AreaInput.tsx`
- [ ] `src/components/features/calculator/QuoteSummary.tsx`

### Contact Form
- [ ] `src/app/api/contact/route.ts` — Resend email
- [ ] `src/components/features/contact/ContactForm.tsx`

### Email Templates
- [ ] `src/emails/ContactEmail.tsx`
- [ ] `src/emails/QuoteEmail.tsx`

---

## FASE 7 — SEO + Performance + Legal ⏳

### SEO
- [ ] metadata export — har bir sahifada
- [ ] generateMetadata — dynamic pages uchun
- [ ] JSON-LD LocalBusiness schema — root layout
- [ ] `src/app/sitemap.ts`
- [ ] `src/app/robots.ts`
- [ ] OG image (1200x630)

### Performance
- [ ] Barcha rasmlar next/image + WebP
- [ ] Dynamic imports — ChatWidget, Calculator
- [ ] Bundle analyzer run
- [ ] Lighthouse audit

### Legal (EU/NL — MAJBURIY)
- [ ] GDPR Cookie Consent banner
- [ ] `/privacybeleid` sahifasi (Privacy Policy)
- [ ] `/algemene-voorwaarden` (Terms & Conditions)

---

## FASE 8 — Deploy ⏳

### Tasks
- [ ] `vercel.json` security headers
- [ ] GitHub push
- [ ] Vercel project connect
- [ ] Environment variables set
- [ ] Custom domain (mmbs.nl) — optional
- [ ] Production build check
- [ ] Lighthouse final score

---

## API Keys Kerak (Foydalanuvchidan)
- [ ] `RESEND_API_KEY` — resend.com
- [ ] `GEMINI_API_KEY` — aistudio.google.com

---

## Definition of Done
- Lighthouse: Performance 95+, SEO 100, Accessibility 90+
- Mobile: 320px → 1920px
- NL + EN to'liq
- Build: error yo'q
- TypeScript: error yo'q
- ESLint: warning yo'q
- Live on Vercel
