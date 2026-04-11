import { getServiceSeoMeta } from "@/data/service-seo";
import { SITE_CONFIG, type ServiceSlug } from "@/lib/constants";
import { getServiceDetailAbsoluteUrl, getServiceIndexPath } from "@/lib/services-routing";
import type { Service } from "@/types";

const ORG_ID = `${SITE_CONFIG.url}/#organization`;

export function buildServicePageJsonLd(locale: string, service: Service) {
  const seo = getServiceSeoMeta(locale, service.slug as ServiceSlug);
  const pageUrl = getServiceDetailAbsoluteUrl(locale, service);
  const indexUrl = `${SITE_CONFIG.url}${getServiceIndexPath(locale)}`;
  const nl = locale === "nl";
  const indexName = nl ? "Diensten" : "Services";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: seo.serviceType,
        serviceType: seo.serviceType,
        description: seo.description,
        url: pageUrl,
        provider: { "@id": ORG_ID },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Netherlands",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: indexName,
            item: indexUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: seo.serviceType,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
