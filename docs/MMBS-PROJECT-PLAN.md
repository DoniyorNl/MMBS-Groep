# MMBS Groep — Website Rebuild

## Senior-Level Project Plan | 0 → Production Ready

> **Stack:** Next.js 15 · TypeScript · Tailwind CSS v4 · Framer Motion · i18next · Vercel  
> **Maqsad:** Minimalist dark-mode, ultra-performant, multi-language business website  
> **Deploy:** Vercel (free tier) — production-ready

---

## 📋 Table of Contents

1. [Tech Stack & Versions](#1-tech-stack--versions)
2. [File Structure](#2-file-structure)
3. [package.json](#3-packagejson)
4. [Design System](#4-design-system)
5. [Pages Architecture](#5-pages-architecture)
6. [Features Roadmap](#6-features-roadmap)
7. [Development Phases](#7-development-phases)
8. [Performance Strategy](#8-performance-strategy)
9. [SEO Strategy](#9-seo-strategy)
10. [Deployment](#10-deployment)

---

## 1. Tech Stack & Versions

### Core

| Package      | Version  | Reason                                   |
| ------------ | -------- | ---------------------------------------- |
| `next`       | `15.3.0` | App Router, Server Components, Turbopack |
| `react`      | `19.0.0` | Latest stable                            |
| `react-dom`  | `19.0.0` | Latest stable                            |
| `typescript` | `5.7.3`  | Strict typing                            |

### Styling

| Package                   | Version  | Reason                                         |
| ------------------------- | -------- | ---------------------------------------------- |
| `tailwindcss`             | `4.1.3`  | CSS-first config (v4 — NO tailwind.config.ts!) |
| `@tailwindcss/typography` | `0.5.16` | Rich text styling                              |
| `clsx`                    | `2.1.1`  | Conditional classNames                         |
| `tailwind-merge`          | `2.5.4`  | Merge tw classes safely                        |

### Animation

| Package  | Version   | Reason                      |
| -------- | --------- | --------------------------- |
| `motion` | `11.15.0` | Framer Motion v11 (renamed) |

### Internationalization (i18n)

| Package     | Version  | Reason                        |
| ----------- | -------- | ----------------------------- |
| `next-intl` | `3.26.3` | Best Next.js 15 i18n solution |

### Forms & Validation

| Package               | Version  | Reason                       |
| --------------------- | -------- | ---------------------------- |
| `react-hook-form`     | `7.54.2` | Performant forms             |
| `zod`                 | `3.24.1` | Schema validation            |
| `@hookform/resolvers` | `3.9.1`  | zod + react-hook-form bridge |

### Email

| Package       | Version | Reason                     |
| ------------- | ------- | -------------------------- |
| `resend`      | `4.0.0` | Best DX, free tier 3000/mo |
| `react-email` | `3.0.4` | Beautiful email templates  |

### AI Chatbot

| Package          | Version  | Reason                                 |
| ---------------- | -------- | -------------------------------------- |
| `@ai-sdk/google` | `1.2.18` | Vercel AI SDK — Google Gemini provider |
| `ai`             | `4.1.54` | Vercel AI SDK — streaming core         |

### Icons & Assets

| Package        | Version   | Reason              |
| -------------- | --------- | ------------------- |
| `lucide-react` | `0.469.0` | Minimal clean icons |

### Fonts (Google Fonts via next/font)

- **Display:** `Syne` — geometric, architectural feel
- **Body:** `DM Sans` — clean, modern, readable

### Dev Tools

| Package                       | Version   | Reason               |
| ----------------------------- | --------- | -------------------- |
| `eslint`                      | `9.18.0`  | Linting              |
| `eslint-config-next`          | `15.3.0`  | Next.js ESLint rules |
| `prettier`                    | `3.4.2`   | Code formatting      |
| `prettier-plugin-tailwindcss` | `0.6.11`  | Auto sort tw classes |
| `@types/node`                 | `22.10.5` | Node types           |
| `@types/react`                | `19.0.7`  | React types          |
| `@types/react-dom`            | `19.0.3`  | ReactDOM types       |

---

## 2. File Structure

```
mmbs-website/
├── .env.local                    # Environment variables (gitignored)
├── .env.example                  # Template for env vars
├── eslint.config.mjs             # ESLint 9 flat config (NOT .eslintrc.json)
├── .prettierrc
├── .gitignore
├── middleware.ts                  # next-intl locale routing (REQUIRED)
├── next.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
│
├── messages/                     # i18n translations
│   ├── nl.json                   # Dutch (default)
│   ├── en.json                   # English
│   └── de.json                   # German (optional)
│
├── public/
│   ├── favicon.ico
│   ├── og-image.jpg              # Open Graph image
│   ├── robots.txt
│   ├── sitemap.xml               # Auto-generated
│   └── images/
│       ├── projects/             # Project photos (AI generated)
│       ├── team/                 # Team photos
│       └── services/             # Service photos
│
└── src/
    ├── app/
    │   ├── [locale]/             # next-intl locale routing
    │   │   ├── layout.tsx        # Root layout with providers
    │   │   ├── page.tsx          # Homepage
    │   │   ├── over/
    │   │   │   └── page.tsx      # About page
    │   │   ├── diensten/
    │   │   │   ├── page.tsx      # Services overview
    │   │   │   └── [slug]/
    │   │   │       └── page.tsx  # Single service page
    │   │   ├── projecten/
    │   │   │   ├── page.tsx      # Projects grid
    │   │   │   └── [slug]/
    │   │   │       └── page.tsx  # Single project page
    │   │   ├── contact/
    │   │   │   └── page.tsx      # Contact + Calculator
    │   │   ├── vacatures/
    │   │   │   └── page.tsx      # Vacancies
    │   │   └── nieuws/
    │   │       ├── page.tsx      # News list
    │   │       └── [slug]/
    │   │           └── page.tsx  # Single news article
    │   │
    │   └── api/
    │       ├── chat/
    │       │   └── route.ts      # AI Chatbot endpoint (Gemini)
    │       ├── contact/
    │       │   └── route.ts      # Contact form → Resend email
    │       └── quote/
    │           └── route.ts      # Quote calculator submission
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx        # Sticky nav + mobile menu
    │   │   ├── Footer.tsx        # Footer
    │   │   ├── MobileMenu.tsx    # Fullscreen mobile nav
    │   │   └── LanguageSwitcher.tsx
    │   │
    │   ├── sections/             # Page sections (homepage)
    │   │   ├── Hero.tsx          # Full-viewport hero
    │   │   ├── Stats.tsx         # 20+ jaar, 100+ professionals
    │   │   ├── Services.tsx      # Services grid
    │   │   ├── Projects.tsx      # Projects showcase
    │   │   ├── WhyUs.tsx         # Value proposition
    │   │   ├── Testimonials.tsx  # Client reviews
    │   │   └── CTA.tsx           # Call to action
    │   │
    │   ├── features/
    │   │   ├── chatbot/
    │   │   │   ├── ChatWidget.tsx      # Floating chat button
    │   │   │   ├── ChatWindow.tsx      # Chat UI
    │   │   │   └── ChatMessage.tsx     # Single message
    │   │   ├── calculator/
    │   │   │   ├── QuoteCalculator.tsx # Main calculator
    │   │   │   ├── ServiceSelector.tsx # Step 1
    │   │   │   ├── AreaInput.tsx       # Step 2
    │   │   │   └── QuoteSummary.tsx    # Step 3 + submit
    │   │   └── contact/
    │   │       └── ContactForm.tsx
    │   │
    │   └── ui/                   # Reusable UI primitives
    │       ├── Button.tsx
    │       ├── Badge.tsx
    │       ├── Card.tsx
    │       ├── Input.tsx
    │       ├── Textarea.tsx
    │       ├── AnimatedCounter.tsx
    │       ├── ScrollReveal.tsx  # Intersection Observer wrapper
    │       └── ImageWithFallback.tsx
    │
    ├── lib/
    │   ├── gemini.ts             # Gemini AI client
    │   ├── resend.ts             # Resend email client
    │   ├── utils.ts              # cn() helper + misc utils
    │   └── constants.ts          # Site config, nav items, etc.
    │
    ├── data/
    │   ├── services.ts           # Services data
    │   ├── projects.ts           # Projects data
    │   ├── testimonials.ts       # Client testimonials
    │   └── calculator.ts         # Pricing logic for calculator
    │
    ├── hooks/
    │   ├── useScrollProgress.ts
    │   ├── useIntersectionObserver.ts
    │   └── useMediaQuery.ts
    │
    ├── types/
    │   ├── index.ts              # Global types
    │   ├── service.ts
    │   └── project.ts
    │
    └── i18n/
        ├── routing.ts            # next-intl routing config
        └── request.ts            # next-intl server config
│
├── app/
│   ├── error.tsx                 # Global error boundary
│   ├── not-found.tsx             # 404 page
│   └── [locale]/
│       └── loading.tsx           # Suspense skeleton
```

---

## 3. package.json

```json
{
  "name": "mmbs-website",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "15.3.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "tailwindcss": "4.1.3",
    "@tailwindcss/typography": "0.5.16",
    "clsx": "2.1.1",
    "tailwind-merge": "2.5.4",
    "motion": "11.15.0",
    "next-intl": "3.26.3",
    "react-hook-form": "7.54.2",
    "zod": "3.24.1",
    "@hookform/resolvers": "3.9.1",
    "resend": "4.0.0",
    "@react-email/components": "0.0.31",
    "@ai-sdk/google": "1.2.18",
    "ai": "4.1.54",
    "lucide-react": "0.469.0"
  },
  "devDependencies": {
    "typescript": "5.7.3",
    "eslint": "9.18.0",
    "eslint-config-next": "15.3.0",
    "prettier": "3.4.2",
    "prettier-plugin-tailwindcss": "0.6.11",
    "@next/bundle-analyzer": "15.3.0",
    "@types/node": "22.10.5",
    "@types/react": "19.0.7",
    "@types/react-dom": "19.0.3"
  }
}
```

---

## 4. Design System

### Color Palette (Dark Mode First)

```css
/* globals.css */
:root {
  --background: #0a0a0a; /* Near black */
  --surface: #111111; /* Card background */
  --surface-hover: #1a1a1a;
  --border: #222222;
  --text-primary: #f5f5f0; /* Warm white */
  --text-secondary: #888888;
  --text-muted: #555555;
  --accent: #c8a96e; /* Warm gold — construction feel */
  --accent-hover: #d4b97e;
  --accent-muted: rgba(200, 169, 110, 0.1);
  --error: #ff4444;
  --success: #44bb77;
}
```

### Typography Scale

```
Display:  Syne — 900 weight — tracking tight
Heading:  Syne — 700 weight
Body:     DM Sans — 400/500 weight
Mono:     JetBrains Mono — code/numbers
```

### Spacing System

Tailwind default spacing — consistent 4px base unit.

### Animation Principles

- **Entrance:** fade-up, 0.4s ease-out, staggered 0.1s delay
- **Hover:** subtle scale(1.02), 0.2s
- **Page transition:** opacity 0→1, 0.3s
- **Counter:** number scroll animation on viewport enter
- **NO** excessive parallax, NO jarring transitions

---

## 5. Pages Architecture

### 🏠 Homepage `/`

```
Hero          → Full viewport, headline + CTA + reel video background
Stats         → 20+ yil, 1500+ proyekt, 100+ mutaxassis (animated counters)
Services      → 5 xizmat, hover card, icon + short description
Projects      → 3 featured, "Barcha proyektlar" link
WhyUs         → 4 USP (vakmanschaft, snelheid, duurzaamheid, kwaliteit)
Testimonials  → 3 client quotes carousel
CTA           → "Offerte aanvragen" dark section
```

### 🏗 Services `/diensten`

- Grid of 5 service cards
- Each card: image, title, short description, arrow link

### 🏗 Single Service `/diensten/[slug]`

- Hero image
- Full description
- Related projects
- CTA block

### 📁 Projects `/projecten`

- Masonry/grid layout
- Filter by type (Restauratie, Nieuwbouw, etc.)
- Each card: image, title, location, type badge

### 📁 Single Project `/projecten/[slug]`

- Image gallery
- Project details (type, location, year, client)
- Description
- Related projects

### 📞 Contact `/contact`

- Contact form (react-hook-form + zod)
- **Quote Calculator** (multi-step)
- Map embed (Google Maps iframe)
- Contact info

### 💼 Vacatures `/vacatures`

- Open positions list
- Application form

### 📰 Nieuws `/nieuws`

- News cards grid
- Single article page

---

## 6. Features Roadmap

### Phase 1 — Core (MVP)

- [ ] Project setup + design system
- [ ] middleware.ts (next-intl — REQUIRED)
- [ ] Header/Footer/Navigation
- [ ] Homepage all sections
- [ ] Services pages
- [ ] Projects pages
- [ ] Contact form + Resend email
- [ ] NL/EN multi-language (next-intl)
- [ ] Mobile responsive
- [ ] Dark mode (default)
- [ ] SEO meta tags
- [ ] Sitemap + robots.txt
- [ ] error.tsx + not-found.tsx + loading.tsx
- [ ] GDPR Cookie Consent banner (EU/NL — legal requirement)
- [ ] Privacy Policy page

### Phase 2 — Advanced Features

- [ ] AI Chatbot (Gemini + Vercel AI SDK streaming)
- [ ] Quote Calculator (multi-step)
- [ ] Email templates (react-email)
- [ ] Vacature application form

### Phase 3 — Polish

- [ ] Page transitions (Motion)
- [ ] Scroll animations (ScrollReveal)
- [ ] Animated counters
- [ ] Image optimization audit
- [ ] Lighthouse 95+ score
- [ ] Performance audit
- [ ] Accessibility audit (WCAG AA)
- [ ] German language (optional)

---

## 7. Development Phases

### 🔧 Phase 0 — Setup (Day 1)

```bash
# 1. Create project
npx create-next-app@latest mmbs-website \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

# 2. Install all dependencies
npm install motion next-intl react-hook-form zod \
  @hookform/resolvers resend react-email \
  @google/generative-ai ai lucide-react \
  clsx tailwind-merge @tailwindcss/typography

npm install -D prettier prettier-plugin-tailwindcss

# 3. Setup environment
cp .env.example .env.local
```

**.env.example:**

```env
# Resend
RESEND_API_KEY=

# Gemini
GROQ_API_KEY=

# Site
NEXT_PUBLIC_SITE_URL=https://mmbs-website.vercel.app
NEXT_PUBLIC_SITE_NAME=MMBS Groep

# Email
CONTACT_EMAIL=info@mmbs.nl
```

---

### 🎨 Phase 1 — Design System (Day 1-2)

**Checklist:**

- [ ] `globals.css` — CSS variables, base styles + `@theme` block (Tailwind v4 config)
- [ ] `next/font` setup (Syne + DM Sans)
- [ ] `lib/utils.ts` — `cn()` helper
- [ ] `components/ui/Button.tsx` — variants: primary, secondary, ghost
- [ ] `components/ui/Card.tsx`
- [ ] `components/ui/Badge.tsx`
- [ ] `components/ui/Input.tsx` + `Textarea.tsx`
- [ ] `components/ui/ScrollReveal.tsx`
- [ ] `components/ui/AnimatedCounter.tsx`

---

### 🌍 Phase 2 — i18n Setup (Day 2)

**next-intl config:**

```typescript
// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
});
```

**Translation structure (messages/nl.json):**

```json
{
  "nav": {
    "diensten": "Diensten",
    "projecten": "Projecten",
    "over": "Over",
    "contact": "Contact",
    "vacatures": "Vacatures"
  },
  "hero": {
    "headline": "Experts in metselwerk,\ngevelrenovatie & steigerbouw.",
    "subline": "Voor bedrijven, woningcorporaties en aannemers.",
    "cta_primary": "Vraag een offerte",
    "cta_secondary": "Bekijk projecten"
  }
  // ... all other texts
}
```

---

### 🏗 Phase 3 — Layout Components (Day 2-3)

**Header features:**

- Sticky with backdrop blur on scroll
- Logo left, nav center, CTA + language switcher right
- Mobile: hamburger → fullscreen overlay menu
- Active link indicator

**Footer features:**

- 3 column: logo+description, navigation, contact info
- Bottom bar: copyright + legal links
- Social media icons (LinkedIn, Instagram)

---

### 📄 Phase 4 — Pages (Day 3-7)

Order of development:

1. **Homepage** — highest priority, most complex
2. **Services** overview + single pages
3. **Projects** grid + single pages
4. **Contact** page
5. **About** page
6. **Vacatures** page
7. **Nieuws** page

---

### 🤖 Phase 5 — AI Chatbot (Day 7-8)

**Architecture:**

```
User types → ChatWidget.tsx
           → POST /api/chat
           → Gemini API (streaming)
           → Response streamed back
           → ChatWindow shows typing indicator
```

**System prompt for MMBS bot:**

```typescript
const SYSTEM_PROMPT = `
Je bent een vriendelijke assistent voor MMBS Groep, 
een expert in metselwerk, gevelrenovatie, isolatie en steigerbouw 
gevestigd in Utrecht, Nederland.

Beantwoord vragen over:
- Onze diensten (metselwerk, gevelrenovatie, monumentale restauratie, isolatie, steigerbouw)
- Prijsindicaties (geef altijd aan dat een offerte op maat nodig is)
- Projectinformatie
- Contact en locatie

Spreek ook Engels als de gebruiker Engels spreekt.
Wees kort, professioneel en behulpzaam.
`;
```

**API Route (`/api/chat/route.ts`):**

```typescript
import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: SYSTEM_PROMPT,
    messages,
    maxTokens: 500,
  });

  return result.toDataStreamResponse();
}
```

---

### 🧮 Phase 6 — Quote Calculator (Day 8-9)

**Multi-step form:**

```
Step 1: Xizmat tanlash
  → Metselwerk | Gevelrenovatie | Monumentale restauratie | Isolatie | Steigerbouw

Step 2: Maydon kiritish
  → Maydon (m²): [input]
  → Qavat soni: [1-10]
  → Holat: [Goed | Matig | Slecht]

Step 3: Ma'lumotlar
  → Ism, Email, Telefon, Xabar
  → Taxminiy narx ko'rsatiladi
  → Submit → email yuboriladi (Resend)
```

**Pricing logic (`/data/calculator.ts`):**

```typescript
export const PRICING = {
  metselwerk: { base: 85, unit: "m2" }, // €85/m²
  gevelrenovatie: { base: 65, unit: "m2" }, // €65/m²
  monumentale: { base: 150, unit: "m2" }, // €150/m²
  isolatie: { base: 45, unit: "m2" }, // €45/m²
  steigerbouw: { base: 25, unit: "m2" }, // €25/m²
} as const;
// Note: These are indicative prices only — actual quote needed
```

---

### 🚀 Phase 7 — Performance & SEO (Day 9-10)

**Performance checklist:**

- [ ] All images: `next/image` with `sizes` prop
- [ ] Images: WebP format, proper aspect ratios
- [ ] Fonts: `next/font` (no external requests)
- [ ] Components: dynamic import heavy components
- [ ] Videos: `loading="lazy"`, poster image
- [ ] Bundle: check with `@next/bundle-analyzer`
- [ ] No unused CSS

**SEO checklist:**

- [ ] `metadata` export on every page
- [ ] `generateMetadata` for dynamic pages
- [ ] Open Graph image (1200x630)
- [ ] Structured data (JSON-LD) — LocalBusiness schema
- [ ] `sitemap.ts` — auto-generated
- [ ] `robots.ts`
- [ ] Canonical URLs
- [ ] Alt text on ALL images

**JSON-LD Schema:**

```typescript
// In root layout
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MMBS Groep",
  description: "Specialist in geveloplossingen en bouwprojecten",
  url: "https://mmbs.nl",
  telephone: "+31306865447",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Strijkviertel 60",
    postalCode: "3454 PP",
    addressLocality: "Utrecht",
    addressCountry: "NL",
  },
};
```

---

## 8. Performance Strategy

### Target: Lighthouse 95+ (all categories)

| Metric  | Target     | Strategy                                |
| ------- | ---------- | --------------------------------------- |
| LCP     | < 2.0s     | Hero image preload, next/image priority |
| FID/INP | < 100ms    | Minimal JS, no blocking scripts         |
| CLS     | < 0.05     | Image dimensions, font swap             |
| TTFB    | < 0.6s     | Vercel Edge, Server Components          |
| Bundle  | < 150kb JS | Dynamic imports, tree-shaking           |

### Server vs Client Components

```
Server Components (default):   pages, layout, data fetching
Client Components ('use client'): interactive UI (chatbot, calculator, forms, animations)
```

### Image Strategy

```typescript
// Every image uses this pattern
<Image
  src="/images/projects/project-1.webp"
  alt="Descriptive alt text"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={blurDataUrl}
/>
```

---

## 9. SEO Strategy

### URL Structure

```
/              → nl homepage
/en            → en homepage
/diensten      → services (nl)
/en/services   → services (en)
/projecten/[slug]
/en/projects/[slug]
```

### Meta Tags per page

```typescript
// app/[locale]/page.tsx
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return {
    title: locale === 'nl'
      ? 'MMBS Groep — Experts in Geveloplossingen Utrecht'
      : 'MMBS Group — Facade Solutions Experts Utrecht',
    description: '...',
    openGraph: { ... },
    twitter: { card: 'summary_large_image' },
    alternates: {
      canonical: `https://mmbs.nl/${locale}`,
      languages: { 'nl': '/nl', 'en': '/en' }
    }
  }
}
```

---

## 10. Deployment

### Vercel (Free Tier — recommended)

```bash
# 1. GitHub push
git add .
git commit -m "feat: initial project setup"
git push origin main

# 2. Vercel connect
# vercel.com → New Project → Import from GitHub → Deploy

# 3. Environment variables
# Vercel Dashboard → Settings → Environment Variables
# Add all vars from .env.example
```

**vercel.json:**

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

### Free Services Used

| Service          | Free Tier                          |
| ---------------- | ---------------------------------- |
| **Vercel**       | Unlimited deploys, 100GB bandwidth |
| **Resend**       | 3,000 emails/month                 |
| **Gemini API**   | 1M tokens/day (Flash model)        |
| **Google Fonts** | Free via next/font                 |

---

## 🎯 Definition of Done

Sayt production-ready hisoblanadi quyidagilar tayyor bo'lganda:

- [ ] Lighthouse score: **Performance 95+, SEO 100, Accessibility 90+**
- [ ] Mobile responsive: 320px → 1920px
- [ ] NL + EN to'liq tarjima
- [ ] Contact form ishlaydi (email yetib boradi)
- [ ] AI Chatbot ishlaydi
- [ ] Quote Calculator ishlaydi
- [ ] Barcha sahifalar SEO meta tags to'liq
- [ ] Build error yo'q (`npm run build` clean)
- [ ] TypeScript error yo'q (`npm run type-check` clean)
- [ ] ESLint warning yo'q
- [ ] Vercel'da live

---

## 🛠 Commands Reference

```bash
npm run dev          # Development server (Turbopack)
npm run build        # Production build
npm run start        # Run production build locally
npm run lint         # ESLint check
npm run format       # Prettier format
npm run type-check   # TypeScript check
```

---

_Plan tayyor — boshlash vaqti!_ 🚀
