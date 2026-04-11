"use client";

import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProjectVisualPlaceholder } from "@/components/ui/VisualPlaceholder";
import { projects } from "@/data/projects";
import { hasMediaUrl } from "@/lib/media";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { ArrowRight, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

type FilterType = "all" | Project["type"];

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "all", label: "filter_all" },
  { key: "restauratie", label: "filter_restauratie" },
  { key: "nieuwbouw", label: "filter_nieuwbouw" },
  { key: "renovatie", label: "filter_renovatie" },
  { key: "isolatie", label: "filter_isolatie" },
];

export default function ProjectenPage() {
  const t = useTranslations("projects");
  const params = useParams<{ locale: string }>();
  const locale = params.locale;
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.type === activeFilter);

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
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-text-secondary)]">
                {locale === "nl" ? "Onze realisaties" : "Our realizations"}
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

      {/* Filters */}
      <div className="sticky top-20 z-30 border-b border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={cn(
                  "shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                  activeFilter === key
                    ? "bg-[var(--color-accent)] text-[var(--color-background)] shadow-lg shadow-[var(--color-accent-muted)]"
                    : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-text-primary)]",
                )}
              >
                {t(label)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.06}>
                <Link
                  href={`/${locale}/projecten/${project.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-2xl hover:shadow-[var(--color-accent-muted)]"
                >
                  {/* Image or placeholder */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface-hover)]">
                    {hasMediaUrl(project.image) ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <ProjectVisualPlaceholder type={project.type} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge>{project.type}</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="flex items-center gap-1 text-xs text-white/80">
                        <MapPin className="h-3 w-3" />
                        {project.location} · {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="font-display mb-2 text-lg font-bold leading-snug group-hover:text-[var(--color-accent)] transition-colors">
                      {project.title}
                    </h2>
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      {project.surface && (
                        <span className="text-xs text-[var(--color-text-muted)]">
                          {project.surface.toLocaleString("nl-NL")} m²
                        </span>
                      )}
                      <span className="ml-auto flex items-center gap-1 text-sm font-medium text-[var(--color-accent)]">
                        {t("view_project")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-[var(--color-text-muted)]">
                {locale === "nl" ? "Geen projecten gevonden." : "No projects found."}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
