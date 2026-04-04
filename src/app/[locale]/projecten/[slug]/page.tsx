import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getProjectBySlug, projects } from "@/data/projects";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  Building2,
  Calendar,
  ChevronLeft,
  Layers,
  MapPin,
  Ruler,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description.slice(0, 160),
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}/projecten/${slug}`,
    },
    openGraph: {
      title: `${project.title} | ${SITE_CONFIG.name}`,
      description: project.description.slice(0, 160),
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "projects" });
  const isNl = locale === "nl";

  const relatedProjects = projects
    .filter((p) => p.slug !== slug && p.type === project.type)
    .slice(0, 3);

  const typeLabel: Record<string, string> = {
    restauratie: isNl ? "Restauratie" : "Restoration",
    nieuwbouw: isNl ? "Nieuwbouw" : "New build",
    renovatie: isNl ? "Renovatie" : "Renovation",
    isolatie: isNl ? "Isolatie" : "Insulation",
  };

  return (
    <>
      {/* Breadcrumbs */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] pt-24">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: isNl ? "Projecten" : "Projects", href: `/${locale}/projecten` },
              { label: project.title },
            ]}
          />
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative">
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-[var(--color-surface-hover)]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <Badge className="mb-4">{typeLabel[project.type]}</Badge>
                <h1 className="font-display mb-6 text-4xl font-black tracking-tight sm:text-5xl">
                  {project.title}
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-[var(--color-text-secondary)]">
                  {project.description}
                </p>
              </ScrollReveal>

              {/* Gallery */}
              {project.images.length > 1 && (
                <ScrollReveal delay={0.1}>
                  <h2 className="font-display mb-4 text-2xl font-bold">
                    {isNl ? "Projectfoto's" : "Project photos"}
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--color-surface-hover)]"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} — foto ${i + 1}`}
                          fill
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project details */}
              <ScrollReveal direction="left">
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                  <h3 className="font-display mb-5 text-lg font-bold">
                    {isNl ? "Projectdetails" : "Project details"}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                          {t("location")}
                        </p>
                        <p className="text-sm font-medium">{project.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                          {t("year")}
                        </p>
                        <p className="text-sm font-medium">{project.year}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Layers className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                          {t("type")}
                        </p>
                        <p className="text-sm font-medium capitalize">{typeLabel[project.type]}</p>
                      </div>
                    </div>
                    {project.surface && (
                      <div className="flex items-start gap-3">
                        <Ruler className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                        <div>
                          <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                            {isNl ? "Oppervlakte" : "Surface area"}
                          </p>
                          <p className="text-sm font-medium">
                            {project.surface.toLocaleString("nl-NL")} m²
                          </p>
                        </div>
                      </div>
                    )}
                    {project.client && (
                      <div className="flex items-start gap-3">
                        <User className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                        <div>
                          <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                            {isNl ? "Opdrachtgever" : "Client"}
                          </p>
                          <p className="text-sm font-medium">{project.client}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              {/* CTA */}
              <ScrollReveal direction="left" delay={0.1}>
                <div className="rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-surface)] p-6 text-center">
                  <Building2 className="mx-auto mb-3 h-8 w-8 text-[var(--color-accent)]" />
                  <h3 className="font-display mb-2 text-lg font-bold">
                    {isNl ? "Vergelijkbaar project?" : "Similar project?"}
                  </h3>
                  <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
                    {isNl
                      ? "Vraag vrijblijvend een offerte aan voor uw project."
                      : "Request a no-obligation quote for your project."}
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
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="font-display mb-8 text-3xl font-bold">
                {isNl ? "Gerelateerde projecten" : "Related projects"}
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 0.08}>
                  <Link
                    href={`/${locale}/projecten/${p.slug}`}
                    className="group block overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={p.image} alt={p.title} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display mb-1 text-base font-bold leading-snug group-hover:text-[var(--color-accent)] transition-colors">
                        {p.title}
                      </h3>
                      <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                        <MapPin className="h-3 w-3" />
                        {p.location} · {p.year}
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="border-t border-[var(--color-border)] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/projecten`}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
          >
            <ChevronLeft className="h-4 w-4" />
            {isNl ? "Alle projecten" : "All projects"}
          </Link>
        </div>
      </div>
    </>
  );
}
