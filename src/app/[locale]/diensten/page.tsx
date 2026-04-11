import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ServiceVisualPlaceholder } from "@/components/ui/VisualPlaceholder";
import { services } from "@/data/services";
import { hasMediaUrl } from "@/lib/media";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Blocks, Building2, Flame, Landmark, Wrench } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface DienstenPageProps {
  params: Promise<{ locale: string }>;
}

const SERVICE_ICONS: Record<string, React.ElementType> = {
  "brick-wall": Blocks,
  "building-2": Building2,
  landmark: Landmark,
  thermometer: Flame,
  construction: Wrench,
};

export async function generateMetadata({ params }: DienstenPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === "nl";
  return {
    title: isNl ? "Onze Diensten" : "Our Services",
    description: isNl
      ? "Van metselwerk tot gevelrenovatie — complete geveloplossingen voor elk bouwproject. Bekijk alle diensten van MMBS Groep."
      : "From brickwork to facade renovation — complete facade solutions for every construction project. View all MMBS Group services.",
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/diensten`,
    },
  };
}

export default async function DienstenPage({ params }: DienstenPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <>
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-[var(--color-background)] pb-16 pt-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-text-secondary)]">
                {locale === "nl" ? "Wat wij doen" : "What we do"}
              </span>
            </div>
            <h1 className="font-display mb-6 text-5xl font-black tracking-tight sm:text-6xl">
              {t("title")}
            </h1>
            <p className="text-xl leading-relaxed text-[var(--color-text-secondary)]">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {services.map((service, i) => {
              const Icon = SERVICE_ICONS[service.icon] ?? Blocks;
              return (
                <ScrollReveal key={service.slug} delay={i * 0.08}>
                  <Link
                    href={`/${locale}/diensten/${service.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:shadow-2xl hover:shadow-[var(--color-accent-muted)]"
                  >
                    {/* Image or icon placeholder */}
                    <div className="relative aspect-[16/7] overflow-hidden bg-[var(--color-surface-hover)]">
                      {hasMediaUrl(service.image) ? (
                        <Image
                          src={service.image}
                          alt={t(`items.${service.slug}.title`)}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <ServiceVisualPlaceholder slug={service.slug} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent-muted)]">
                        <Icon className="h-6 w-6 text-[var(--color-accent)]" />
                      </div>
                      <h2 className="font-display mb-3 text-2xl font-bold">
                        {t(`items.${service.slug}.title`)}
                      </h2>
                      <p className="mb-6 flex-1 leading-relaxed text-[var(--color-text-secondary)]">
                        {t(`items.${service.slug}.description`)}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">
                          {locale === "nl" ? "Vanaf" : "From"} €{service.pricePerM2}/m²
                        </Badge>
                        <span className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-all duration-200 group-hover:gap-3">
                          {t("read_more")}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-8 text-center sm:p-16">
            <h2 className="font-display mb-4 text-3xl font-black sm:text-4xl">
              {locale === "nl" ? "Niet zeker welke dienst u nodig heeft?" : "Not sure which service you need?"}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-[var(--color-text-secondary)]">
              {locale === "nl"
                ? "Neem contact op en wij adviseren u gratis over de beste oplossing voor uw project."
                : "Get in touch and we will advise you for free on the best solution for your project."}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex h-13 items-center gap-2 rounded-lg bg-[var(--color-accent)] px-8 text-lg font-medium text-[var(--color-background)] shadow-lg shadow-[var(--color-accent-muted)] transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              {locale === "nl" ? "Gratis adviesgesprek" : "Free consultation"}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
