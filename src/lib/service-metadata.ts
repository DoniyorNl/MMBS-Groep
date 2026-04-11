import { getServiceSeoMeta } from "@/data/service-seo";
import { SITE_CONFIG, type ServiceSlug } from "@/lib/constants";
import { getServiceDetailAbsoluteUrl } from "@/lib/services-routing";
import { resolveOgImageUrl } from "@/lib/media";
import type { Service } from "@/types";
import type { Metadata } from "next";

export function buildServicePageMetadata(locale: string, service: Service): Metadata {
  const seo = getServiceSeoMeta(locale, service.slug as ServiceSlug);
  const canonical = getServiceDetailAbsoluteUrl(locale, service);
  const nlUrl = getServiceDetailAbsoluteUrl("nl", service);
  const enUrl = getServiceDetailAbsoluteUrl("en", service);

  const ogTitle = `${seo.title} | ${SITE_CONFIG.name}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical,
      languages: {
        nl: nlUrl,
        en: enUrl,
        "x-default": nlUrl,
      },
    },
    openGraph: {
      type: "website",
      title: ogTitle,
      description: seo.description,
      locale: locale === "nl" ? "nl_NL" : "en_GB",
      alternateLocale: locale === "nl" ? ["en_GB"] : ["nl_NL"],
      url: canonical,
      siteName: SITE_CONFIG.name,
      images: [{ url: resolveOgImageUrl(service.image) }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
