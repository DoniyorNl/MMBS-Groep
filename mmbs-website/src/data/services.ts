import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "metselwerk",
    icon: "brick-wall",
    image: "/images/services/metselwerk.webp",
    pricePerM2: 85,
  },
  {
    slug: "gevelrenovatie",
    icon: "building-2",
    image: "/images/services/gevelrenovatie.webp",
    pricePerM2: 65,
  },
  {
    slug: "monumentale-restauratie",
    icon: "landmark",
    image: "/images/services/monumentale-restauratie.webp",
    pricePerM2: 150,
  },
  {
    slug: "isolatie",
    icon: "thermometer",
    image: "/images/services/isolatie.webp",
    pricePerM2: 45,
  },
  {
    slug: "steigerbouw",
    icon: "construction",
    image: "/images/services/steigerbouw.webp",
    pricePerM2: 25,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
