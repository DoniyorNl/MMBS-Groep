# MMBS Groep — korporativ veb-sayt

Next.js 16, React 19, Tailwind CSS v4, **next-intl** (NL / EN), dark mode, SEO (sitemap, robots, OG image), GDPR cookie banner, contact / offerte formlari (Resend), chatbot (Gemini).

## Tezkor boshlash

```bash
npm install
cp .env.example .env.local   # kalitlarni .env.local ga qo‘ying (Git’ga kirmaydi)
npm run dev
```

Brauzer: [http://localhost:3000](http://localhost:3000) — `/nl` ga yo‘naltiriladi.

## Skriptlar

| Skript | Vazifasi |
|--------|----------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Builddan keyin server |
| `npm run type-check` | TypeScript |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Deployment va sizning qadamlaringiz

**To‘liq qo‘llanma:** [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md)

Qisqacha: Vercelga ulang, **Environment Variables** ni qo‘shing (`RESEND_API_KEY`, `CONTACT_EMAIL`, `GEMINI_API_KEY`, `NEXT_PUBLIC_SITE_URL`), redeploy qiling.

## Struktura (qisqa)

- `src/app/[locale]/` — barcha sahifalar (locale prefix)
- `messages/` — `nl.json` / `en.json` tarjimalar
- `src/data/` — xizmatlar, loyihalar, yangiliklar
- `src/app/api/` — contact, quote, chat

## License

Private — MMBS Groep.
