import { newsArticles } from "@/data/nieuws";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { SITE_CONFIG } from "@/lib/constants";
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

const serviceAlternates = {
  nl: `${BASE}/nl/diensten`,
  en: `${BASE}/en/services`,
  "x-default": `${BASE}/nl/diensten`,
};

function serviceIndexEntries(): MetadataRoute.Sitemap[number][] {
  return [
    {
      url: `${BASE}/nl/diensten`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: serviceAlternates },
    },
    {
      url: `${BASE}/en/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: serviceAlternates },
    },
  ];
}

function serviceDetailEntries(): MetadataRoute.Sitemap[number][] {
  const out: MetadataRoute.Sitemap[number][] = [];
  for (const s of services) {
    const langs = {
      nl: `${BASE}/nl/diensten/${s.slugNl}`,
      en: `${BASE}/en/services/${s.slugEn}`,
      "x-default": `${BASE}/nl/diensten/${s.slugNl}`,
    };
    out.push(
      {
        url: `${BASE}/nl/diensten/${s.slugNl}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: { languages: langs },
      },
      {
        url: `${BASE}/en/services/${s.slugEn}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: { languages: langs },
      },
    );
  }
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entry("", { priority: 1.0, changeFrequency: "weekly" }),

    ...serviceIndexEntries(),
    ...serviceDetailEntries(),

    ...entry("/projecten", { priority: 0.8, changeFrequency: "monthly" }),
    ...entry("/over", { priority: 0.7, changeFrequency: "monthly" }),
    ...entry("/contact", { priority: 0.8, changeFrequency: "monthly" }),
    ...entry("/offerte", { priority: 0.9, changeFrequency: "monthly" }),
    ...entry("/vacatures", { priority: 0.7, changeFrequency: "weekly" }),
    ...entry("/nieuws", { priority: 0.8, changeFrequency: "weekly" }),
    ...entry("/privacybeleid", { priority: 0.3, changeFrequency: "yearly" }),
    ...entry("/algemene-voorwaarden", { priority: 0.3, changeFrequency: "yearly" }),

    ...projects.flatMap((p) =>
      entry(`/projecten/${p.slug}`, { priority: 0.6, changeFrequency: "monthly" }),
    ),

    ...newsArticles.flatMap((a) =>
      entry(`/nieuws/${a.slug}`, { priority: 0.65, changeFrequency: "monthly" }),
    ),
  ];
}
