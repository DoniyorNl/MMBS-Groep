import { Chatbot } from "@/components/features/chatbot/Chatbot";
import { CookieBanner } from "@/components/features/cookie/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BackToTop } from "@/components/ui/BackToTop";
import { routing } from "@/i18n/routing";
import { services } from "@/data/services";
import { SITE_CONFIG } from "@/lib/constants";
import { getServiceDetailPath } from "@/lib/services-routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isNl = locale === "nl";

  return {
    title: {
      default: isNl
        ? "MMBS Groep — Experts in Geveloplossingen Utrecht"
        : "MMBS Group — Facade Solutions Experts Utrecht",
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: isNl
      ? "Expert in metselwerk, gevelrenovatie, monumentale restauratie, isolatie en steigerbouw. 20+ jaar ervaring, 1500+ projecten, Utrecht."
      : "Expert in brickwork, facade renovation, monument restoration, insulation and scaffolding. 20+ years experience, 1500+ projects, Utrecht.",
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}`,
      languages: {
        nl: `${SITE_CONFIG.url}/nl`,
        en: `${SITE_CONFIG.url}/en`,
        "x-default": `${SITE_CONFIG.url}/nl`,
      },
    },
    openGraph: {
      type: "website",
      locale: isNl ? "nl_NL" : "en_GB",
      alternateLocale: isNl ? ["en_GB"] : ["nl_NL"],
      url: `${SITE_CONFIG.url}/${locale}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: isNl ? "MMBS Groep Bouw & Renovatie" : "MMBS Group construction & renovation",
        },
      ],
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "nl" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const tServices = await getTranslations({ locale, namespace: "services" });

  const isNl = locale === "nl";
  const orgDescription = isNl
    ? "Specialist in metselwerk, gevelrenovatie, monumentenrestauratie, isolatie en steigerbouw. Gevestigd in Utrecht, actief door heel Nederland."
    : "Specialist in brickwork, facade renovation, monument restoration, insulation and scaffolding. Based in Utrecht, active throughout the Netherlands.";

  const offerCatalogItems = services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: tServices(`items.${s.slug}.title`),
        description: tServices(`items.${s.slug}.short`),
        url: `${SITE_CONFIG.url}${getServiceDetailPath(locale, s)}`,
      },
    },
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["ConstructionCompany", "LocalBusiness"],
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    description: orgDescription,
    url: SITE_CONFIG.url,
    image: [`${SITE_CONFIG.url}/opengraph-image`],
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      postalCode: SITE_CONFIG.address.postalCode,
      addressLocality: SITE_CONFIG.address.city,
      addressCountry: SITE_CONFIG.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "Netherlands",
    },
    sameAs: [SITE_CONFIG.social.linkedin, SITE_CONFIG.social.instagram],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isNl ? "Diensten" : "Services",
      itemListElement: offerCatalogItems,
    },
  };

  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Accessibility: skip navigation */}
      <a
        href="#main-content"
        className="fixed -top-full left-4 z-[100] rounded-b-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-background)] transition-all focus:top-0"
      >
        {tc("skip_to_content")}
      </a>

      <Header locale={locale} />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer locale={locale} />

      <BackToTop />
      <CookieBanner locale={locale} />
      <Chatbot locale={locale} />
    </NextIntlClientProvider>
  );
}
