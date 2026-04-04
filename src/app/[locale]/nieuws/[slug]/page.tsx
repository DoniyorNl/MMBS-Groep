import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getArticleBySlug, getRecentArticles, newsArticles } from "@/data/nieuws";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { NewsArticle } from "@/types";

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `${SITE_CONFIG.url}/${locale}/nieuws/${slug}` },
    openGraph: {
      title: `${article.title} | ${SITE_CONFIG.name}`,
      description: article.excerpt,
      images: [{ url: article.image }],
      type: "article",
      publishedTime: article.published,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: "nieuws" });
  const isNl = locale === "nl";
  const recentArticles = getRecentArticles(3).filter((a) => a.slug !== slug);

  const categoryLabel: Record<NewsArticle["category"], string> = {
    company: t("categories.company"),
    project: t("categories.project"),
    industry: t("categories.industry"),
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(isNl ? "nl-NL" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const paragraphs = article.content
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] pt-24">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: isNl ? "Nieuws" : "News", href: `/${locale}/nieuws` },
              { label: article.title },
            ]}
          />
        </div>
      </div>

      {/* Hero image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-[var(--color-surface-hover)]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Article */}
            <article className="lg:col-span-2">
              <ScrollReveal>
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <Badge>{categoryLabel[article.category]}</Badge>
                  <span className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
                    <Calendar className="h-3.5 w-3.5" />
                    {t("published")} {formatDate(article.published)}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
                    <User className="h-3.5 w-3.5" />
                    {article.author}
                  </span>
                </div>

                <h1 className="font-display mb-8 text-4xl font-black tracking-tight sm:text-5xl">
                  {article.title}
                </h1>

                <p className="mb-8 text-xl leading-relaxed text-[var(--color-text-secondary)] border-l-2 border-[var(--color-accent)] pl-5">
                  {article.excerpt}
                </p>

                {/* Render content blocks */}
                <div className="prose prose-invert max-w-none space-y-6">
                  {paragraphs.map((block, i) => {
                    if (block.startsWith("## ")) {
                      return (
                        <h2 key={i} className="font-display mt-10 mb-4 text-2xl font-bold">
                          {block.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (block.startsWith("- ")) {
                      const items = block.split("\n").filter((l) => l.startsWith("- "));
                      return (
                        <ul key={i} className="space-y-2">
                          {items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                              {item.replace("- ", "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={i} className="leading-relaxed text-[var(--color-text-secondary)]">
                        {block}
                      </p>
                    );
                  })}
                </div>
              </ScrollReveal>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <ScrollReveal direction="left">
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                  <h3 className="font-display mb-4 text-lg font-bold">
                    {isNl ? "Recent nieuws" : "Recent news"}
                  </h3>
                  <div className="space-y-4">
                    {recentArticles.slice(0, 3).map((a) => (
                      <Link
                        key={a.slug}
                        href={`/${locale}/nieuws/${a.slug}`}
                        className="group flex gap-3"
                      >
                        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-[var(--color-surface-hover)]">
                          <Image
                            src={a.image}
                            alt={a.title}
                            fill
                            sizes="80px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div>
                          <h4 className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-[var(--color-accent)] transition-colors">
                            {a.title}
                          </h4>
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {formatDate(a.published)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.1}>
                <div className="rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent-muted)] p-6">
                  <h3 className="font-display mb-2 text-lg font-bold">
                    {isNl ? "Interesse gewekt?" : "Interested?"}
                  </h3>
                  <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
                    {isNl
                      ? "Vraag een vrijblijvende offerte aan voor uw project."
                      : "Request a no-obligation quote for your project."}
                  </p>
                  <Link
                    href={`/${locale}/contact`}
                    className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                  >
                    {isNl ? "Neem contact op" : "Get in touch"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="border-t border-[var(--color-border)] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/nieuws`}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
          >
            <ChevronLeft className="h-4 w-4" />
            {t("back")}
          </Link>
        </div>
      </div>
    </>
  );
}
