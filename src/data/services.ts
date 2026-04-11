import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "metselwerk",
    icon: "brick-wall",
    image: "",
    pricePerM2: 85,
  },
  {
    slug: "gevelrenovatie",
    icon: "building-2",
    image: "",
    pricePerM2: 65,
  },
  {
    slug: "monumentale-restauratie",
    icon: "landmark",
    image: "",
    pricePerM2: 150,
  },
  {
    slug: "isolatie",
    icon: "thermometer",
    image: "",
    pricePerM2: 45,
  },
  {
    slug: "steigerbouw",
    icon: "construction",
    image: "",
    pricePerM2: 25,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
