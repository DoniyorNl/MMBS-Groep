import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "metselwerk",
    slugNl: "metselwerk",
    slugEn: "brickwork",
    icon: "brick-wall",
    image: "",
    pricePerM2: 85,
  },
  {
    slug: "gevelrenovatie",
    slugNl: "gevelrenovatie",
    slugEn: "facade-renovation",
    icon: "building-2",
    image: "",
    pricePerM2: 65,
  },
  {
    slug: "monumentale-restauratie",
    slugNl: "monumentale-restauratie",
    slugEn: "monument-restoration",
    icon: "landmark",
    image: "",
    pricePerM2: 150,
  },
  {
    slug: "isolatie",
    slugNl: "isolatie",
    slugEn: "insulation",
    icon: "thermometer",
    image: "",
    pricePerM2: 45,
  },
  {
    slug: "steigerbouw",
    slugNl: "steigerbouw",
    slugEn: "scaffolding",
    icon: "construction",
    image: "",
    pricePerM2: 25,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
