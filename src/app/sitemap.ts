import { newsArticles } from "@/data/nieuws";
import { projects } from "@/data/projects";
import { SERVICE_SLUGS, SITE_CONFIG } from "@/lib/constants";
import type { MetadataRoute } from "next";

const LOCALES = ["nl", "en"] as const;
const BASE = SITE_CONFIG.url;

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

function entry(
  path: string,
  opts?: { priority?: number; changeFrequency?: ChangeFreq },
): MetadataRoute.Sitemap[number][] {
  return LOCALES.map((locale) => ({
    url: `${BASE}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency: opts?.changeFrequency ?? "monthly",
    priority: opts?.priority ?? 0.6,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE}/${l}${path}`])),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Home ──────────────────────────────────────────────
    ...entry("", { priority: 1.0, changeFrequency: "weekly" }),

    // ── Static pages ──────────────────────────────────────
    ...entry("/diensten", { priority: 0.9, changeFrequency: "monthly" }),
    ...entry("/projecten", { priority: 0.8, changeFrequency: "monthly" }),
    ...entry("/over", { priority: 0.7, changeFrequency: "monthly" }),
    ...entry("/contact", { priority: 0.8, changeFrequency: "monthly" }),
    ...entry("/offerte", { priority: 0.9, changeFrequency: "monthly" }),
    ...entry("/vacatures", { priority: 0.7, changeFrequency: "weekly" }),
    ...entry("/nieuws", { priority: 0.8, changeFrequency: "weekly" }),
    ...entry("/privacybeleid", { priority: 0.3, changeFrequency: "yearly" }),
    ...entry("/algemene-voorwaarden", { priority: 0.3, changeFrequency: "yearly" }),

    // ── Service detail pages ───────────────────────────────
    ...SERVICE_SLUGS.flatMap((slug) =>
      entry(`/diensten/${slug}`, { priority: 0.85, changeFrequency: "monthly" }),
    ),

    // ── Project detail pages ───────────────────────────────
    ...projects.flatMap((p) =>
      entry(`/projecten/${p.slug}`, { priority: 0.6, changeFrequency: "monthly" }),
    ),

    // ── News article pages ─────────────────────────────────
    ...newsArticles.flatMap((a) =>
      entry(`/nieuws/${a.slug}`, { priority: 0.65, changeFrequency: "monthly" }),
    ),
  ];
}
