import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { vacatures } from "@/data/vacatures";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  Briefcase,
  Clock,
  MapPin,
  Send,
  Users,
} from "lucide-react";
import Link from "next/link";

interface VacaturesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: VacaturesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === "nl";
  return {
    title: isNl ? "Vacatures" : "Vacancies",
    description: isNl
      ? "Werken bij MMBS Groep? Bekijk onze openstaande vacatures. Meer dan 100 vakmensen, goede arbeidsvoorwaarden en volop doorgroeimogelijkheden."
      : "Work at MMBS Group? View our open vacancies. More than 100 specialists, good employment conditions and plenty of growth opportunities.",
    alternates: { canonical: `${SITE_CONFIG.url}/${locale}/vacatures` },
  };
}

export default async function VacaturesPage({ params }: VacaturesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "vacatures" });
  const isNl = locale === "nl";

  const BENEFITS = [
    { icon: "💰", nl: "Marktconform salaris", en: "Market-competitive salary" },
    { icon: "📚", nl: "Opleidingsbudget", en: "Training budget" },
    { icon: "🚗", nl: "Leaseauto of reiskostenvergoeding", en: "Company car or travel allowance" },
    { icon: "🏥", nl: "Goede pensioenregeling", en: "Good pension scheme" },
    { icon: "📈", nl: "Doorgroeimogelijkheden", en: "Career growth opportunities" },
    { icon: "🤝", nl: "Fijne werkomgeving", en: "Great work environment" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-background)] pb-16 pt-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-text-secondary)]">
                  {vacatures.length} {isNl ? "openstaande posities" : "open positions"}
                </span>
              </div>
              <h1 className="font-display mb-4 text-5xl font-black tracking-tight sm:text-6xl">
                {t("title")}
              </h1>
              <p className="text-xl leading-relaxed text-[var(--color-text-secondary)]">
                {t("subtitle")}
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4">
              <Users className="h-6 w-6 text-[var(--color-accent)]" />
              <div>
                <p className="font-display text-2xl font-black">100+</p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {isNl ? "Collega's" : "Colleagues"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[var(--color-surface)] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {BENEFITS.map((b) => (
              <div
                key={b.nl}
                className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2 text-sm"
              >
                <span>{b.icon}</span>
                <span>{isNl ? b.nl : b.en}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vacatures */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display mb-8 text-3xl font-bold">{t("open_positions")}</h2>
          </ScrollReveal>

          <div className="space-y-4">
            {vacatures.map((vacature, i) => (
              <ScrollReveal key={vacature.id} delay={i * 0.06}>
                <article className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:shadow-lg">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge>{vacature.type === "fulltime" ? t("fulltime") : t("parttime")}</Badge>
                        <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                          <MapPin className="h-3 w-3" />
                          {vacature.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                          <Clock className="h-3 w-3" />
                          {new Date(vacature.published).toLocaleDateString(isNl ? "nl-NL" : "en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="font-display mb-2 text-2xl font-bold group-hover:text-[var(--color-accent)] transition-colors">
                        {vacature.title}
                      </h3>
                      <p className="mb-4 leading-relaxed text-[var(--color-text-secondary)]">
                        {vacature.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {vacature.requirements.slice(0, 3).map((req) => (
                          <span
                            key={req}
                            className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]"
                          >
                            {req}
                          </span>
                        ))}
                        {vacature.requirements.length > 3 && (
                          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-muted)]">
                            +{vacature.requirements.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                      <Link
                        href={`/${locale}/contact?vacature=${vacature.id}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-[var(--color-background)] shadow-md shadow-[var(--color-accent-muted)] transition-colors hover:bg-[var(--color-accent-hover)]"
                      >
                        {t("apply")}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {vacatures.length === 0 && (
            <ScrollReveal>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
                <Briefcase className="mx-auto mb-4 h-12 w-12 text-[var(--color-text-muted)]" />
                <p className="mb-2 text-lg font-semibold">{t("no_vacancies")}</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Open application */}
      <section className="py-16 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 gap-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-8 lg:grid-cols-2 lg:p-12">
              <div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent-muted)]">
                  <Send className="h-6 w-6 text-[var(--color-accent)]" />
                </div>
                <h2 className="font-display mb-3 text-3xl font-bold">{t("open_application")}</h2>
                <p className="text-[var(--color-text-secondary)]">{t("open_application_text")}</p>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <a
                  href={`mailto:hr@mmbs.nl?subject=${isNl ? "Open sollicitatie" : "Open application"}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-6 py-3 font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  hr@mmbs.nl
                  <ArrowRight className="h-4 w-4" />
                </a>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {isNl
                    ? "Of bel ons op werkdagen tussen 07:00 en 17:00."
                    : "Or call us on working days between 07:00 and 17:00."}
                </p>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                >
                  {SITE_CONFIG.phoneFormatted}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
