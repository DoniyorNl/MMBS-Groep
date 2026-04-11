# Deployment — MMBS Groep veb-sayti

Bu hujjatda **men (AI) repoda qilgan ishlar** va **sizning qo‘lingizda qolgan qadamlar** ajratilgan.

---

## 1. Repoda allaqachon bor (kod tomonda)

| Nima | Tavsif |
|------|--------|
| `npm run build` | Production build |
| `npm run type-check` | TypeScript tekshiruvi |
| `npm run lint` | ESLint (`src/**/*`) |
| `.github/workflows/ci.yml` | Har `push`/`PR` da CI (typecheck + lint + build) |
| `vercel.json` | Xavfsizlik sarlavhalari (X-Frame-Options, nosniff, …) |
| API routes | Contact, Quote (Resend), Chat (Gemini + fallback) |
| `.env.example` | Kerakli o‘zgaruvchilar ro‘yxati (kalitsiz) |

---

## 2. Sizning vazifangiz — Vercel (majburiy)

### 2.1 Loyihani ulash

1. [vercel.com](https://vercel.com) ga kiring.
2. **Add New → Project** → GitHub repo `MMBS-Groep` ni tanlang.
3. **Framework Preset:** Next.js (avtomatik aniqlanadi).
4. **Deploy** — birinchi marta build bo‘ladi.

### 2.2 Environment variables (Production)

**Vercel → Project → Settings → Environment Variables**

Quyidagilarni **Production** (va kerak bo‘lsa Preview) uchun qo‘shing:

| Kalit | Qiymat | Izoh |
|-------|--------|------|
| `RESEND_API_KEY` | `re_...` | [resend.com](https://resend.com) → API Keys |
| `CONTACT_EMAIL` | sizning pochtangiz | Contact + Quote shu manzilga keladi |
| `RESEND_FROM_EMAIL` | `MMBS Groep <onboarding@resend.dev>` | Test uchun Resend sandbox. **Production:** o‘z domeningizni Resend’da verify qilgach: `MMBS Groep <noreply@sizning-domen.nl>` |
| `GEMINI_API_KEY` | `AIza...` | [Google AI Studio](https://aistudio.google.com/apikey) — chatbot |
| `NEXT_PUBLIC_SITE_URL` | `https://sizning-proyekt.vercel.app` yoki **haqiqiy domen** | Sitemap, canonical, OG URL uchun **muhim** |

**Muhim:**

- `NEXT_PUBLIC_SITE_URL` ni deploy qilingandan keyin **to‘g‘ri production URL** bilan yangilang (Vercel URL yoki custom domain).
- O‘zgaruvchilarni qo‘shgandan keyin **Redeploy** qiling (Deployments → … → Redeploy), aks holda eski build ishlatiladi.

### 2.3 Mahalliy `.env.local`

- Fayl **Git’ga kirmaydi** (`.gitignore`).
- Vercel alohida — siz **Vercel dashboard**da yuqoridagi kalitlarni qo‘shasiz.
- Mahalliy ish uchun `.env.example` ni nusxalab `.env.local` deb nomlang va to‘ldiring.

---

## 3. Sizning vazifangiz — Resend (production email)

1. [resend.com](https://resend.com) — akkaunt, domen qo‘shish (masalan `mmbs.nl`).
2. DNS’da Resend ko‘rsatgan **TXT / MX** yozuvlarini qo‘ying (Resend UI ko‘rsatadi).
3. Domen **Verified** bo‘lgach, `RESEND_FROM_EMAIL` ni shu domen bilan yangilang.
4. `CONTACT_EMAIL` — qaysi pochtaga ariza kelishini xohlasangiz (Gmail, korporativ pochta va h.k.).

**Test:** Contact form yoki `/offerte` dan yuboring — inboxda xat paydo bo‘lishi kerak.

---

## 4. Sizning vazifangiz — domen (ixtiyoriy)

1. Vercel → Project → **Domains** → domen qo‘shing.
2. Registrar (TransIP, Cloudflare, …) da Vercel ko‘rsatgan **A / CNAME** yozuvlarini qo‘ying.
3. SSL Vercel tomonidan beriladi (odatda avtomatik).

Keyin `NEXT_PUBLIC_SITE_URL` ni **https://domeningiz.nl** qilib yangilang va qayta deploy qiling.

---

## 5. Sizning vazifangiz — kontent va media

| Nima | Qayerda |
|------|---------|
| Haqiqiy loyiha rasmlari | `src/data/projects.ts`, `services.ts`, `nieuws.ts` — `image` va `images[]` maydonlariga `/public/images/...` yo‘llari |
| Fayllarni joylash | `public/images/projects/`, `public/images/services/`, … (WebP tavsiya) |
| Matnlar | `messages/nl.json`, `messages/en.json`, `src/data/*` |

Hozir rasmlar bo‘lmaganda sayt **Lucide ikonka + gradient** placeholder ishlatadi — bu normal.

---

## 6. Tekshirish ro‘yxati (deploydan keyin)

- [ ] Bosh sahifa ochiladi: `/` → `/nl`
- [ ] NL / EN almashadi, matnlar o‘zgaradi
- [ ] Contact form — xat keladi (`CONTACT_EMAIL`)
- [ ] Offerte form — xat keladi
- [ ] Chat — javob beradi (Gemini yoki rules)
- [ ] `https://.../sitemap.xml` ochiladi
- [ ] `https://.../robots.txt` ochiladi
- [ ] Cookie banner — Accept/Decline ishlaydi

---

## 7. Muammo bo‘lsa

| Muammo | Tekshirish |
|--------|------------|
| Email kelmaydi | Vercel env: `RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM_EMAIL`; Resend dashboardda “Logs” |
| Chat javob bermaydi | `GEMINI_API_KEY` Vercelda; billing / quota AI Studio |
| Noto‘g‘ri URL sitemapda | `NEXT_PUBLIC_SITE_URL` ni yangilang, redeploy |
| Build CI da yiqiladi | `npm run type-check`, `npm run lint`, `npm run build` ni mahalliy ishga tushiring |

---

**Qisqa:** men tomonda — kod, CI, hujjatlar. Siz tomonda — **Vercel + env + (ixtiyoriy) domen + Resend domeni + kontent**.
