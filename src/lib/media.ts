import { SITE_CONFIG } from "@/lib/constants";

/**
 * True when a non-empty media URL is provided (remote or public path).
 * Empty string means: render icon placeholder instead of next/image.
 */
export function hasMediaUrl(src: string | undefined | null): boolean {
  return Boolean(src && src.trim().length > 0);
}

/** Open Graph image: use media if set, otherwise site default OG route. */
export function resolveOgImageUrl(src: string | undefined | null): string {
  if (hasMediaUrl(src)) {
    const s = src!.trim();
    if (s.startsWith("http")) return s;
    return `${SITE_CONFIG.url}${s.startsWith("/") ? "" : "/"}${s}`;
  }
  return `${SITE_CONFIG.url}/opengraph-image.png`;
}
