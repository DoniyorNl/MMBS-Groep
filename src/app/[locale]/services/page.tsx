import { ServicesListing } from "@/components/features/services/ServicesListing";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "nl") {
    return {
      alternates: {
        canonical: `${SITE_CONFIG.url}/nl/diensten`,
        languages: {
          nl: `${SITE_CONFIG.url}/nl/diensten`,
          en: `${SITE_CONFIG.url}/en/services`,
          "x-default": `${SITE_CONFIG.url}/nl/diensten`,
        },
      },
    };
  }
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description:
      "Brickwork, facade renovation, monument restoration, insulation and scaffolding — building facade restoration and professional scaffolding services from Utrecht across the Netherlands. Request a quote.",
    keywords: [
      "brickwork contractor",
      "facade renovation contractor",
      "monument restoration",
      "building insulation contractor",
      "scaffolding hire company",
      "Utrecht",
      "Netherlands",
    ],
    alternates: {
      canonical: `${SITE_CONFIG.url}/en/services`,
      languages: {
        nl: `${SITE_CONFIG.url}/nl/diensten`,
        en: `${SITE_CONFIG.url}/en/services`,
        "x-default": `${SITE_CONFIG.url}/nl/diensten`,
      },
    },
    openGraph: {
      title: `${t("title")} | ${SITE_CONFIG.name}`,
      description:
        "From brickwork to facade renovation — complete facade solutions. Expert insulation and scaffolding.",
      url: `${SITE_CONFIG.url}/en/services`,
      siteName: SITE_CONFIG.name,
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  if (locale === "nl") {
    redirect("/nl/diensten");
  }
  setRequestLocale(locale);
  return <ServicesListing locale={locale} />;
}
