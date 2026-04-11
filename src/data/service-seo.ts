import type { ServiceSlug } from "@/lib/constants";

/**
 * Per-service SEO for generateMetadata() — NL + EN titles, descriptions, keywords.
 * Canonical service keys: ServiceSlug (internal id). URLs use slugNl / slugEn.
 */
export const SERVICE_SEO: Record<
  ServiceSlug,
  {
    titleNl: string;
    titleEn: string;
    descriptionNl: string;
    descriptionEn: string;
    keywordsNl: string[];
    keywordsEn: string[];
    serviceTypeNl: string;
    serviceTypeEn: string;
  }
> = {
  metselwerk: {
    titleNl: "Metselwerk Aannemer | Professioneel Metselwerk",
    titleEn: "Brickwork Contractor | Professional Bricklaying Services",
    descriptionNl:
      "Specialist in metselwerk, voegwerk herstel en bakstenen reparatie. MMBS Groep – betrouwbare aannemer in Nederland. Vraag gratis offerte aan.",
    descriptionEn:
      "Expert brickwork repair, repointing and bricklaying services. MMBS Groep – trusted contractor in the Netherlands. Get a free quote today.",
    keywordsNl: [
      "metselwerk aannemer",
      "metselaar inhuren",
      "voegwerk herstel",
      "bakstenen muur reparatie",
      "metselwerk reparatie",
      "metselwerk bedrijf",
      "gevelmetselwerk specialist",
      "Utrecht",
      "Nederland",
    ],
    keywordsEn: [
      "brickwork contractor",
      "bricklaying company",
      "brick repointing",
      "brick pointing",
      "brickwork repair",
      "professional bricklayer",
      "Netherlands",
    ],
    serviceTypeNl: "Metselwerk",
    serviceTypeEn: "Brickwork",
  },
  gevelrenovatie: {
    titleNl: "Gevelrenovatie Aannemer | Gevel Renoveren",
    titleEn: "Facade Renovation Contractor | Building Facade Restoration",
    descriptionNl:
      "Specialist in gevelrenovatie en gevelreiniging. MMBS Groep – uw betrouwbare partner voor gevelrenovatie in Nederland. Vraag een offerte aan.",
    descriptionEn:
      "Professional facade renovation and restoration services. MMBS Groep specialises in exterior facade repair across the Netherlands. Request a quote.",
    keywordsNl: [
      "gevelrenovatie aannemer",
      "gevel renoveren kosten",
      "gevelreiniging en renovatie",
      "gevelrenovatie bedrijf",
      "gevel herstellen",
      "gevelisolatie en renovatie",
      "Utrecht",
    ],
    keywordsEn: [
      "facade renovation contractor",
      "building facade restoration",
      "exterior facade repair",
      "facade cleaning and renovation",
      "commercial facade refurbishment",
      "Netherlands",
    ],
    serviceTypeNl: "Gevelrenovatie",
    serviceTypeEn: "Facade renovation",
  },
  "monumentale-restauratie": {
    titleNl: "Monumentenrestauratie | Rijksmonument & Erfgoed",
    titleEn: "Monument Restoration | Heritage & Listed Buildings",
    descriptionNl:
      "Rijksmonument restauratie, historische gevels en monumentenzorg. MMBS Groep – specialist in cultureel erfgoed in Nederland. Neem contact op voor advies.",
    descriptionEn:
      "Heritage building restoration, listed monuments and stone conservation. MMBS Groep – trusted for rijksmonument and cultural heritage projects across the Netherlands.",
    keywordsNl: [
      "monumentenrestauratie aannemer",
      "rijksmonument restauratie",
      "historisch gebouw restaureren",
      "monumentenzorg",
      "erfgoed restauratie",
      "steenrestauratie",
    ],
    keywordsEn: [
      "monument restoration contractor",
      "heritage building restoration",
      "listed building restoration",
      "rijksmonument restoration",
      "cultural heritage restoration",
      "Netherlands",
    ],
    serviceTypeNl: "Monumentale restauratie",
    serviceTypeEn: "Monument restoration",
  },
  isolatie: {
    titleNl: "Isolatie Aannemer | Gevel- & Spouwmuurisolatie",
    titleEn: "Building Insulation Contractor | Cavity & Facade Insulation",
    descriptionNl:
      "Gevelisolatie, spouwmuurisolatie en dakisolatie voor woningen en utiliteit. MMBS Groep helpt u energie besparen. Gratis advies en offerte.",
    descriptionEn:
      "External wall insulation, cavity wall and roof insulation for homes and commercial buildings. MMBS Groep helps you save energy across the Netherlands. Free quote.",
    keywordsNl: [
      "isolatie aannemer",
      "gevelisolatie bedrijf",
      "spouwmuurisolatie",
      "dakisolatie",
      "buitengevelisolatie",
      "energiebesparende isolatie",
      "isolatie subsidie",
    ],
    keywordsEn: [
      "building insulation contractor",
      "cavity wall insulation",
      "external wall insulation",
      "facade insulation",
      "roof insulation",
      "energy efficient insulation",
      "Netherlands",
    ],
    serviceTypeNl: "Isolatie",
    serviceTypeEn: "Building insulation",
  },
  steigerbouw: {
    titleNl: "Steigerbouw & Steigers Huren | Renovatie & Bouw",
    titleEn: "Scaffolding Hire & Contractor | Renovation Projects",
    descriptionNl:
      "Professionele steigerbouw, steigers plaatsen en verhuur voor gevelwerk en renovatie. MMBS Groep – veilig en volgens norm. Vraag een offerte aan.",
    descriptionEn:
      "Professional scaffolding hire, erection and rental for façade work and renovation. MMBS Groep – safe, certified scaffolding across the Netherlands. Get a quote.",
    keywordsNl: [
      "steigerbouw bedrijf",
      "steigers huren aannemer",
      "steiger verhuur renovatie",
      "bouwsteiger aannemer",
      "professionele steigerbouw",
    ],
    keywordsEn: [
      "scaffolding hire company",
      "scaffolding contractor",
      "scaffolding services for renovation",
      "facade scaffolding",
      "construction scaffolding",
      "Netherlands",
    ],
    serviceTypeNl: "Steigerbouw",
    serviceTypeEn: "Scaffolding",
  },
};

export function getServiceSeoMeta(locale: string, serviceId: ServiceSlug) {
  const s = SERVICE_SEO[serviceId];
  const isNl = locale === "nl";
  return {
    title: isNl ? s.titleNl : s.titleEn,
    description: isNl ? s.descriptionNl : s.descriptionEn,
    keywords: isNl ? s.keywordsNl : s.keywordsEn,
    serviceType: isNl ? s.serviceTypeNl : s.serviceTypeEn,
  };
}
