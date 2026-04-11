import { ServiceDetailView } from "@/components/features/services/ServiceDetailView";
import { getServiceByPathSlug } from "@/lib/services-routing";
import { buildServicePageMetadata } from "@/lib/service-metadata";
import { services } from "@/data/services";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slugEn }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "en") return {};
  const service = getServiceByPathSlug(slug, "en");
  if (!service) return {};
  return buildServicePageMetadata(locale, service);
}

export default async function ServiceDetailEnPage({ params }: Props) {
  const { locale, slug } = await params;
  if (locale !== "en") notFound();
  const service = getServiceByPathSlug(slug, "en");
  if (!service) notFound();
  setRequestLocale(locale);
  return <ServiceDetailView locale={locale} service={service} />;
}
