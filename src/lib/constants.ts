export const SITE_CONFIG = {
  name: "MMBS Groep",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mmbs-groep.nl",
  description:
    "Expert in metselwerk, gevelrenovatie, monumentale restauratie, isolatie en steigerbouw. Gevestigd in Utrecht, actief door heel Nederland.",
  phone: "+31306865447",
  phoneFormatted: "+31 30 686 5447",
  email: "info@mmbs.nl",
  address: {
    street: "Strijkviertel 60",
    postalCode: "3454 PP",
    city: "Utrecht",
    country: "NL",
    full: "Strijkviertel 60, 3454 PP Utrecht, Nederland",
  },
  kvk: "12345678",
  social: {
    linkedin: "https://linkedin.com/company/mmbs-groep",
    instagram: "https://instagram.com/mmbsgroep",
  },
  hours: "Ma–Vr 07:00–17:00",
} as const;

export const NAV_ITEMS = [
  { key: "diensten", href: "/diensten" },
  { key: "projecten", href: "/projecten" },
  { key: "over", href: "/over" },
  { key: "nieuws", href: "/nieuws" },
  { key: "vacatures", href: "/vacatures" },
] as const;

export const SERVICE_SLUGS = [
  "metselwerk",
  "gevelrenovatie",
  "monumentale-restauratie",
  "isolatie",
  "steigerbouw",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
