import type { ServiceSlug } from "@/lib/constants";

/**
 * SEO-focused titles, meta descriptions, and keywords per service (NL + EN).
 * Woven from construction / facade keyword research (brickwork, gevelrenovatie, etc.).
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
    /** schema.org serviceType (short label) */
    serviceTypeNl: string;
    serviceTypeEn: string;
  }
> = {
  metselwerk: {
    titleNl: "Metselwerk aannemer Utrecht & Nederland",
    titleEn: "Brickwork contractor Netherlands",
    descriptionNl:
      "Metselwerk aannemer voor nieuwbouw, renovatie en voegwerk herstel. Metselaar inhuren, bakstenen muur reparatie en gevelmetselwerk — van Utrecht door heel Nederland. Vraag een offerte aan.",
    descriptionEn:
      "Brickwork contractor for new builds, renovation, and brick pointing / repointing. Bricklaying company, external brickwork repair, and professional bricklayer services across the Netherlands. Request a quote.",
    keywordsNl: [
      "metselwerk aannemer",
      "metselwerk reparatie",
      "metselaar inhuren",
      "voegwerk herstel",
      "bakstenen muur reparatie",
      "metselwerk bedrijf",
      "gevelmetselwerk specialist",
      "metselwerk renovatie aannemer",
      "Utrecht",
    ],
    keywordsEn: [
      "brickwork contractor",
      "brickwork repair services",
      "bricklaying company",
      "brick pointing and repointing",
      "external brickwork repair",
      "brick wall construction",
      "brickwork restoration specialist",
      "Netherlands",
    ],
    serviceTypeNl: "Metselwerk",
    serviceTypeEn: "Brickwork & masonry",
  },
  gevelrenovatie: {
    titleNl: "Gevelrenovatie aannemer | Gevel renoveren & reinigen",
    titleEn: "Facade renovation contractor | Building facade restoration",
    descriptionNl:
      "Gevelrenovatie aannemer voor gevel herstellen, gevelreiniging en renovatie, gevelisolatie en commerciële gevelrenovatie. Historische gevel restauratie en gevelrenovatie bedrijf — Utrecht & Nederland.",
    descriptionEn:
      "Facade renovation contractor for building facade restoration, exterior facade repair, facade cleaning and renovation, commercial facade refurbishment, and historic building facade repair across the Netherlands.",
    keywordsNl: [
      "gevelrenovatie aannemer",
      "gevel renoveren kosten",
      "gevelreiniging en renovatie",
      "gevelrenovatie bedrijf",
      "gevel herstellen specialist",
      "gevelisolatie en renovatie",
      "commerciële gevelrenovatie",
      "historische gevel restauratie",
    ],
    keywordsEn: [
      "facade renovation contractor",
      "building facade restoration",
      "exterior facade repair company",
      "facade cleaning and renovation",
      "commercial facade refurbishment",
      "facade renovation specialists",
      "historic building facade repair",
      "facade insulation and renovation",
    ],
    serviceTypeNl: "Gevelrenovatie",
    serviceTypeEn: "Facade renovation",
  },
  "monumentale-restauratie": {
    titleNl: "Monumentenrestauratie & rijksmonument restauratie",
    titleEn: "Monument restoration & heritage building restoration",
    descriptionNl:
      "Monumentenrestauratie aannemer: rijksmonument restauratie, historisch gebouw restaureren, monumentenzorg en cultuurhistorisch herfstal. Steenrestauratie en erfgoed restauratiebedrijf in Nederland.",
    descriptionEn:
      "Monument restoration contractor for heritage building restoration, listed building restoration, historic monument repair, cultural heritage restoration, and rijksmonument projects in the Netherlands.",
    keywordsNl: [
      "monumentenrestauratie aannemer",
      "rijksmonument restauratie",
      "historisch gebouw restaureren",
      "monumentenzorg bedrijf",
      "cultuurhistorisch herstel",
      "monumentenpand renovatie",
      "steenrestauratie specialist",
      "erfgoed restauratiebedrijf",
    ],
    keywordsEn: [
      "monument restoration contractor",
      "heritage building restoration",
      "historic monument repair",
      "listed building restoration specialist",
      "cultural heritage restoration company",
      "stone monument restoration",
      "monument conservation services",
      "rijksmonument restoration",
    ],
    serviceTypeNl: "Monumentale restauratie",
    serviceTypeEn: "Monument & heritage restoration",
  },
  isolatie: {
    titleNl: "Isolatie aannemer | Gevelisolatie & spouwmuurisolatie",
    titleEn: "Building insulation contractor | Facade & cavity wall insulation",
    descriptionNl:
      "Isolatie aannemer voor gevelisolatie, spouwmuurisolatie, dakisolatie en buitengevelisolatie. Energiebesparende isolatie en na-isolatie bestaande bouw — advies over isolatie subsidie (ISDE/SEEH) mogelijk.",
    descriptionEn:
      "Building insulation contractor for external wall insulation, cavity wall insulation, roof insulation, and energy-efficient insulation solutions. Commercial building insulation and renovation insulation across the Netherlands.",
    keywordsNl: [
      "isolatie aannemer",
      "gevelisolatie bedrijf",
      "spouwmuurisolatie specialist",
      "dakisolatie kosten aanvragen",
      "buitengevelisolatie aannemer",
      "energiebesparende isolatie",
      "isolatie subsidie aanvragen",
      "na-isolatie bestaande bouw",
    ],
    keywordsEn: [
      "building insulation contractor",
      "external wall insulation company",
      "roof insulation services",
      "cavity wall insulation specialists",
      "facade insulation contractor",
      "energy efficient insulation solutions",
      "commercial building insulation",
      "insulation renovation contractor",
    ],
    serviceTypeNl: "Isolatie",
    serviceTypeEn: "Building insulation",
  },
  steigerbouw: {
    titleNl: "Steigerbouw & steigers huren | Steiger verhuur renovatie",
    titleEn: "Scaffolding hire & scaffolding contractor",
    descriptionNl:
      "Steigerbouw bedrijf: steigers huren aannemer, professionele steigerbouw, steigers plaatsen offerte en bouwsteiger aannemer voor renovatie en gevelwerk. NEN-EN 12811 conform door heel Nederland.",
    descriptionEn:
      "Scaffolding hire company and scaffolding contractor for renovation projects, scaffolding services for renovation, temporary scaffolding erection, façade scaffolding, and commercial scaffolding services across the Netherlands.",
    keywordsNl: [
      "steigers huren aannemer",
      "steigerbouw bedrijf",
      "steiger verhuur renovatie",
      "professionele steigerbouw",
      "steigers plaatsen offerte",
      "bouwsteiger aannemer",
      "gevelbekleding steiger",
      "commercieel steigerbouw",
    ],
    keywordsEn: [
      "scaffolding hire company",
      "scaffolding contractor",
      "scaffolding services for renovation",
      "professional scaffolding company",
      "temporary scaffolding erection",
      "scaffolding rental construction",
      "facade scaffolding contractor",
      "commercial scaffolding services",
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
