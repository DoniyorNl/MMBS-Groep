import { Chatbot } from "@/components/features/chatbot/Chatbot";
import { CookieBanner } from "@/components/features/cookie/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BackToTop } from "@/components/ui/BackToTop";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/constants";
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
      url: `${SITE_CONFIG.url}/${locale}`,
      siteName: SITE_CONFIG.name,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    description:
      "Specialist in geveloplossingen en bouwprojecten. Expert in metselwerk, gevelrenovatie, monumentale restauratie, isolatie en steigerbouw.",
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      postalCode: SITE_CONFIG.address.postalCode,
      addressLocality: SITE_CONFIG.address.city,
      addressCountry: SITE_CONFIG.address.country,
    },
    openingHours: "Mo-Fr 07:00-17:00",
    sameAs: [SITE_CONFIG.social.linkedin, SITE_CONFIG.social.instagram],
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
