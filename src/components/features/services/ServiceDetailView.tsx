import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { services } from "@/data/services";
import { PRICING } from "@/data/calculator";
import { projects } from "@/data/projects";
import { SITE_CONFIG, type ServiceSlug } from "@/lib/constants";
import { buildServicePageJsonLd } from "@/lib/service-jsonld";
import { getServiceDetailPath, getServiceIndexPath } from "@/lib/services-routing";
import { hasMediaUrl } from "@/lib/media";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  ArrowRight,
  Blocks,
  Building2,
  CheckCircle2,
  ChevronLeft,
  Flame,
  Landmark,
  MapPin,
  Wrench,
} from "lucide-react";
import { ProjectVisualPlaceholder, ServiceVisualPlaceholder } from "@/components/ui/VisualPlaceholder";
import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types";
import { getTranslations } from "next-intl/server";

const SERVICE_ICONS: Record<string, React.ElementType> = {
  "brick-wall": Blocks,
  "building-2": Building2,
  landmark: Landmark,
  thermometer: Flame,
  construction: Wrench,
};

const SERVICE_FEATURES: Record<ServiceSlug, string[]> = {
  metselwerk: [
    "nl:Nieuwbouw en renovatieprojecten|en:New build and renovation projects",
    "nl:Historisch en decoratief metselwerk|en:Historic and decorative brickwork",
    "nl:Fundering en dragende constructies|en:Foundations and load-bearing structures",
    "nl:Buitengevel en binnenwerk|en:External facades and interior work",
    "nl:Gecertificeerde materialen|en:Certified materials",
  ],
  gevelrenovatie: [
    "nl:Gevelreiniging en -herstel|en:Facade cleaning and repair",
    "nl:Nieuw voegwerk en afdichting|en:New pointing and sealing",
    "nl:Beschermende coatings|en:Protective coatings",
    "nl:Herstel van betonschade|en:Concrete damage repair",
    "nl:Kleur- en materiaalkeuze advies|en:Colour and material advice",
  ],
  "monumentale-restauratie": [
    "nl:Historisch verantwoorde restauratie|en:Historically responsible restoration",
    "nl:Samenwerking met monumentencommissie|en:Collaboration with heritage commission",
    "nl:Originele materialen en technieken|en:Original materials and techniques",
    "nl:Documentatie en rapportage|en:Documentation and reporting",
    "nl:Noodmaatregelen bij acute schade|en:Emergency measures for acute damage",
  ],
  isolatie: [
    "nl:Spouwmuurisolatie|en:Cavity wall insulation",
    "nl:Buitengevelisolatie (ETICS)|en:External facade insulation (ETICS)",
    "nl:Dakisolatie|en:Roof insulation",
    "nl:Energielabel verbetering|en:Energy label improvement",
    "nl:Subsidieadvies|en:Subsidy advice",
  ],
  steigerbouw: [
    "nl:Gevelbouw- en renovatiesteigers|en:Facade and renovation scaffolding",
    "nl:Puntladers en consoles|en:Point loads and consoles",
    "nl:Huur inclusief montage en demontage|en:Rental including assembly and disassembly",
    "nl:Inspectie en onderhoud|en:Inspection and maintenance",
    "nl:Certificering conform NEN-EN 12811|en:Certification in accordance with NEN-EN 12811",
  ],
};

interface ServiceDetailViewProps {
  locale: string;
  service: Service;
}

export async function ServiceDetailView({ locale, service }: ServiceDetailViewProps) {
  const t = await getTranslations({ locale, namespace: "services" });
  const isNl = locale === "nl";
  const id = service.slug as ServiceSlug;
  const Icon = SERVICE_ICONS[service.icon] ?? Blocks;

  const pricing = PRICING[id];
  const rawFeatures = SERVICE_FEATURES[id] ?? [];
  const features = rawFeatures.map((f) => {
    const [nl, en] = f.split("|");
    return isNl ? nl.replace("nl:", "") : en.replace("en:", "");
  });

  const relatedProjects = projects
    .filter((p) =>
      p.type ===
      (id === "metselwerk"
        ? "nieuwbouw"
        : id === "gevelrenovatie"
          ? "renovatie"
          : id === "monumentale-restauratie"
            ? "restauratie"
            : id === "isolatie"
              ? "isolatie"
              : "renovatie"),
    )
    .slice(0, 3);

  const otherServices = services.filter((s) => s.slug !== service.slug);
  const jsonLd = buildServicePageJsonLd(locale, service);
  const indexPath = getServiceIndexPath(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] pt-24">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: isNl ? "Diensten" : "Services", href: indexPath },
              { label: t(`items.${id}.title`) },
            ]}
          />
        </div>
      </div>

      <section className="relative overflow-hidden bg-[var(--color-background)]">
        <div className="relative aspect-[21/9] w-full">
          {hasMediaUrl(service.image) ? (
            <Image
              src={service.image}
              alt={t(`items.${id}.title`)}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <ServiceVisualPlaceholder slug={id} className="absolute inset-0" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/60 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-32 relative z-10 pb-16">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent-muted)]">
              <Icon className="h-8 w-8 text-[var(--color-accent)]" />
            </div>
            <h1 className="font-display mb-4 text-5xl font-black tracking-tight sm:text-6xl">
              {t(`items.${id}.title`)}
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed text-[var(--color-text-secondary)]">
              {t(`items.${id}.description`)}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <ScrollReveal>
                <h2 className="font-display mb-6 text-3xl font-bold">
                  {isNl ? "Wat is inbegrepen?" : "What is included?"}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" />
                      <span className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {relatedProjects.length > 0 && (
                <ScrollReveal delay={0.1}>
                  <h2 className="font-display mb-6 text-3xl font-bold">
                    {isNl ? "Gerelateerde projecten" : "Related projects"}
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedProjects.map((project) => (
                      <Link
                        key={project.slug}
                        href={`/${locale}/projecten/${project.slug}`}
                        className="group block overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-lg"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          {hasMediaUrl(project.image) ? (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <ProjectVisualPlaceholder type={project.type} />
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-display mb-1 text-sm font-bold leading-tight transition-colors group-hover:text-[var(--color-accent)]">
                            {project.title}
                          </h3>
                          <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                            <MapPin className="h-3 w-3" />
                            {project.location}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>

            <div className="space-y-6">
              {pricing && (
                <ScrollReveal direction="left">
                  <div className="rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-surface)] p-6">
                    <h3 className="font-display mb-4 text-lg font-bold">
                      {isNl ? "Indicatieve prijs" : "Indicative price"}
                    </h3>
                    <div className="mb-2 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-[var(--color-accent)]">
                        €{pricing.base}
                      </span>
                      <span className="text-[var(--color-text-muted)]">/{pricing.unit}</span>
                    </div>
                    <p className="mb-6 text-xs text-[var(--color-text-muted)]">
                      {isNl
                        ? "* Indicatieve prijs. De werkelijke kosten kunnen afwijken."
                        : "* Indicative price. Actual costs may vary."}
                    </p>
                    <Link
                      href={`/${locale}/contact`}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 font-medium text-[var(--color-background)] shadow-lg shadow-[var(--color-accent-muted)] transition-colors hover:bg-[var(--color-accent-hover)]"
                    >
                      {isNl ? "Offerte aanvragen" : "Request a quote"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </ScrollReveal>
              )}

              <ScrollReveal direction="left" delay={0.1}>
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                  <h3 className="font-display mb-4 text-lg font-bold">
                    {isNl ? "Andere diensten" : "Other services"}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {otherServices.map((s) => {
                      const OtherIcon = SERVICE_ICONS[s.icon] ?? Blocks;
                      return (
                        <Link
                          key={s.slug}
                          href={getServiceDetailPath(locale, s)}
                          className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-[var(--color-surface-hover)]"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-muted)]">
                            <OtherIcon className="h-4 w-4 text-[var(--color-accent)]" />
                          </div>
                          <span className="text-sm font-medium transition-colors group-hover:text-[var(--color-accent)]">
                            {t(`items.${s.slug}.title`)}
                          </span>
                          <ArrowRight className="ml-auto h-3.5 w-3.5 text-[var(--color-text-muted)] opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.2}>
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center">
                  <p className="mb-1 text-sm font-semibold text-[var(--color-text-primary)]">
                    {isNl ? "Heeft u een vraag?" : "Have a question?"}
                  </p>
                  <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
                    {isNl ? "Bel ons direct op:" : "Call us directly at:"}
                  </p>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="block text-xl font-bold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
                  >
                    {SITE_CONFIG.phoneFormatted}
                  </a>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">{SITE_CONFIG.hours}</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[var(--color-border)] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={indexPath}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
          >
            <ChevronLeft className="h-4 w-4" />
            {isNl ? "Alle diensten" : "All services"}
          </Link>
        </div>
      </div>
    </>
  );
}
