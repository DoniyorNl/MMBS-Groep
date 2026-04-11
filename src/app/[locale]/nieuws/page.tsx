import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { NewsVisualPlaceholder } from "@/components/ui/VisualPlaceholder";
import { newsArticles } from "@/data/nieuws";
import { hasMediaUrl } from "@/lib/media";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/types";

interface NieuwsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: NieuwsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === "nl";
  return {
    title: isNl ? "Nieuws & Updates" : "News & Updates",
    description: isNl
      ? "Lees het laatste nieuws van MMBS Groep. Projectupdates, brancheberichten en bedrijfsnieuws."
      : "Read the latest news from MMBS Group. Project updates, industry news and company announcements.",
    alternates: { canonical: `${SITE_CONFIG.url}/${locale}/nieuws` },
  };
}

export default async function NieuwsPage({ params }: NieuwsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nieuws" });
  const isNl = locale === "nl";

  const [featured, ...rest] = newsArticles;

  const categoryLabel = (cat: NewsArticle["category"]) => {
    const map = {
      company: t("categories.company"),
      project: t("categories.project"),
      industry: t("categories.industry"),
    };
    return map[cat];
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(isNl ? "nl-NL" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

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
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-text-secondary)]">
                {isNl ? "Laatste updates" : "Latest updates"}
              </span>
            </div>
            <h1 className="font-display mb-4 text-5xl font-black tracking-tight sm:text-6xl">
              {t("title")}
            </h1>
            <p className="text-xl leading-relaxed text-[var(--color-text-secondary)]">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Featured article */}
          {featured && (
            <ScrollReveal className="mb-12">
              <Link
                href={`/${locale}/nieuws/${featured.slug}`}
                className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-2xl hover:shadow-[var(--color-accent-muted)] lg:grid-cols-2"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-surface-hover)] lg:aspect-auto">
                  {hasMediaUrl(featured.image) ? (
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <NewsVisualPlaceholder category={featured.category} className="min-h-[200px] lg:min-h-full" />
                  )}
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-10">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <Badge>{categoryLabel(featured.category)}</Badge>
                    <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                      <Calendar className="h-3 w-3" />
                      {formatDate(featured.published)}
                    </span>
                  </div>
                  <h2 className="font-display mb-3 text-2xl font-bold leading-snug group-hover:text-[var(--color-accent)] transition-colors lg:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mb-6 leading-relaxed text-[var(--color-text-secondary)]">
                    {featured.excerpt}
                  </p>
                  <span className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">
                    {t("read_more")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          )}

          {/* Rest grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, i) => (
              <ScrollReveal key={article.slug} delay={i * 0.08}>
                <Link
                  href={`/${locale}/nieuws/${article.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-surface-hover)]">
                    {hasMediaUrl(article.image) ? (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <NewsVisualPlaceholder category={article.category} />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{categoryLabel(article.category)}</Badge>
                      <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.published)}
                      </span>
                    </div>
                    <h2 className="font-display mb-2 flex-1 text-lg font-bold leading-snug group-hover:text-[var(--color-accent)] transition-colors">
                      {article.title}
                    </h2>
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {article.excerpt}
                    </p>
                    <span className="flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)]">
                      {t("read_more")}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
