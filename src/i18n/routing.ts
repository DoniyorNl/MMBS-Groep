import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  pathnames: {
    "/": "/",
    "/over": {
      nl: "/over",
      en: "/about",
    },
    "/diensten": {
      nl: "/diensten",
      en: "/services",
    },
    "/diensten/[slug]": {
      nl: "/diensten/[slug]",
      en: "/services/[slug]",
    },
    "/projecten": {
      nl: "/projecten",
      en: "/projects",
    },
    "/projecten/[slug]": {
      nl: "/projecten/[slug]",
      en: "/projects/[slug]",
    },
    "/contact": "/contact",
    "/vacatures": {
      nl: "/vacatures",
      en: "/vacancies",
    },
    "/nieuws": {
      nl: "/nieuws",
      en: "/news",
    },
    "/nieuws/[slug]": {
      nl: "/nieuws/[slug]",
      en: "/news/[slug]",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
