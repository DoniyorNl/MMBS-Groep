import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getFeaturedProjects } from "@/data/projects";
import { ArrowRight, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface ProjectsProps {
  locale: string;
}

export function Projects({ locale }: ProjectsProps) {
  const t = useTranslations("projects");
  const featuredProjects = getFeaturedProjects();

  return (
    <section className="bg-[var(--color-surface)] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="mb-16 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display mb-4 text-4xl font-black tracking-tight sm:text-5xl">
              {t("title")}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">{t("subtitle")}</p>
          </div>
          <Link
            href={`/${locale}/projecten`}
            className="flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] whitespace-nowrap"
          >
            {t("all_projects")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.1}>
              <Link
                href={`/${locale}/projecten/${project.slug}`}
                className="group block overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent-muted)]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface-hover)]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => {}}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Badge overlay */}
                  <div className="absolute top-4 left-4">
                    <Badge>{project.type}</Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display mb-2 text-lg font-bold leading-tight group-hover:text-[var(--color-accent)] transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
                      <MapPin className="h-3.5 w-3.5" />
                      {project.location}
                    </span>
                    <span className="text-sm text-[var(--color-text-muted)]">{project.year}</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
