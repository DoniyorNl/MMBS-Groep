import { CTA } from "@/components/sections/CTA";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyUs } from "@/components/sections/WhyUs";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    title:
      locale === "nl"
        ? "MMBS Groep — Experts in Geveloplossingen Utrecht"
        : "MMBS Group — Facade Solutions Experts Utrecht",
    description:
      locale === "nl"
        ? "Expert in metselwerk, gevelrenovatie, monumentale restauratie, isolatie en steigerbouw. 20+ jaar ervaring, 1500+ projecten. Gevestigd in Utrecht."
        : "Expert in brickwork, facade renovation, monument restoration, insulation and scaffolding. 20+ years, 1500+ projects. Based in Utrecht.",
    openGraph: {
      title: `${SITE_CONFIG.name} — ${t("headline").replace("\n", " ")}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <Stats />
      <Services locale={locale} />
      <Projects locale={locale} />
      <WhyUs />
      <Testimonials />
      <CTA locale={locale} />
    </>
  );
}
