import type { Service } from "@/types";
import { services } from "@/data/services";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";

/** Index: /nl/diensten | /en/services */
export function getServiceIndexPath(locale: string): string {
  return locale === "nl" ? `/${locale}/diensten` : `/${locale}/services`;
}

/** Detail path with locale-appropriate segment and slug */
export function getServiceDetailPath(locale: string, service: Service): string {
  const segment = locale === "nl" ? "diensten" : "services";
  const pathSlug = locale === "nl" ? service.slugNl : service.slugEn;
  return `/${locale}/${segment}/${pathSlug}`;
}

export function getServiceDetailAbsoluteUrl(locale: string, service: Service): string {
  return `${SITE_CONFIG.url}${getServiceDetailPath(locale, service)}`;
}

/** Resolve service from URL path slug (per locale) */
export function getServiceByPathSlug(pathSlug: string, locale: string): Service | undefined {
  return services.find((s) => (locale === "nl" ? s.slugNl === pathSlug : s.slugEn === pathSlug));
}

/** Nav: localized href for “Services” (only this item differs by locale) */
export function getNavServicesHref(locale: string): string {
  return locale === "nl" ? "/diensten" : "/services";
}

/** Primary nav `href` (without locale prefix) */
export function getNavItemHref(key: string, locale: string): string {
  if (key === "diensten") return getNavServicesHref(locale);
  const item = NAV_ITEMS.find((i) => i.key === key);
  return item?.href ?? "/";
}
