/** @type {import('next-sitemap').IConfig} */
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://mmbs-groep.vercel.app";

const SERVICES = [
  { slugNl: "metselwerk", slugEn: "brickwork" },
  { slugNl: "gevelrenovatie", slugEn: "facade-renovation" },
  { slugNl: "monumentale-restauratie", slugEn: "monument-restoration" },
  { slugNl: "isolatie", slugEn: "insulation" },
  { slugNl: "steigerbouw", slugEn: "scaffolding" },
];

function extractSlugs(relativeFile) {
  const filePath = path.join(__dirname, relativeFile);
  const content = fs.readFileSync(filePath, "utf8");
  const matches = [...content.matchAll(/^\s*slug:\s*"([^"]+)"/gm)];
  return matches.map((m) => m[1]);
}

function altRefs(nlUrl, enUrl) {
  return [
    { href: nlUrl, hreflang: "nl", hrefIsAbsolute: true },
    { href: enUrl, hreflang: "en", hrefIsAbsolute: true },
    { href: nlUrl, hreflang: "x-default", hrefIsAbsolute: true },
  ];
}

/** @param {string} segment path after locale, e.g. "/contact" or "" */
function pairLocalePaths(siteUrl, segment, priority, changefreq) {
  const nl = segment ? `${siteUrl}/nl${segment}` : `${siteUrl}/nl`;
  const en = segment ? `${siteUrl}/en${segment}` : `${siteUrl}/en`;
  const refs = altRefs(nl, en);
  return [
    { loc: nl, changefreq, priority, alternateRefs: refs },
    { loc: en, changefreq, priority, alternateRefs: refs },
  ];
}

function serviceIndexPair(siteUrl) {
  const nl = `${siteUrl}/nl/diensten`;
  const en = `${siteUrl}/en/services`;
  const refs = altRefs(nl, en);
  return [
    { loc: nl, changefreq: "monthly", priority: 0.9, alternateRefs: refs },
    { loc: en, changefreq: "monthly", priority: 0.9, alternateRefs: refs },
  ];
}

function serviceDetailPairs(siteUrl) {
  const out = [];
  for (const s of SERVICES) {
    const nl = `${siteUrl}/nl/diensten/${s.slugNl}`;
    const en = `${siteUrl}/en/services/${s.slugEn}`;
    const refs = altRefs(nl, en);
    out.push(
      { loc: nl, changefreq: "monthly", priority: 0.85, alternateRefs: refs },
      { loc: en, changefreq: "monthly", priority: 0.85, alternateRefs: refs },
    );
  }
  return out;
}

function buildAllPaths(siteUrl) {
  /** @type {import('next-sitemap').ISitemapField[]} */
  const fields = [];

  fields.push(...pairLocalePaths(siteUrl, "", 1.0, "weekly"));
  fields.push(...serviceIndexPair(siteUrl));
  fields.push(...serviceDetailPairs(siteUrl));

  const staticPaths = [
    ["/projecten", 0.8, "monthly"],
    ["/over", 0.7, "monthly"],
    ["/contact", 0.8, "monthly"],
    ["/offerte", 0.9, "monthly"],
    ["/vacatures", 0.7, "weekly"],
    ["/nieuws", 0.8, "weekly"],
    ["/privacybeleid", 0.3, "yearly"],
    ["/algemene-voorwaarden", 0.3, "yearly"],
  ];
  for (const [p, priority, changefreq] of staticPaths) {
    fields.push(...pairLocalePaths(siteUrl, p, priority, changefreq));
  }

  for (const slug of extractSlugs("src/data/projects.ts")) {
    fields.push(...pairLocalePaths(siteUrl, `/projecten/${slug}`, 0.6, "monthly"));
  }
  for (const slug of extractSlugs("src/data/nieuws.ts")) {
    fields.push(...pairLocalePaths(siteUrl, `/nieuws/${slug}`, 0.65, "monthly"));
  }

  return fields;
}

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  alternateRefs: [
    { href: `${SITE_URL}/en`, hreflang: "en" },
    { href: `${SITE_URL}/nl`, hreflang: "nl" },
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/api/" },
      { userAgent: "*", disallow: "/_next/" },
    ],
    additionalSitemaps: [`${SITE_URL}/sitemap.xml`],
  },
  /** Avtomatik topilgan barcha marshrutlarni e'tiborsiz qoldiramiz — faqat additionalPaths */
  transform: async () => null,
  additionalPaths: async (config) => {
    return buildAllPaths(config.siteUrl);
  },
};
