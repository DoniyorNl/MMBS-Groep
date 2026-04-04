import { Button } from "@/components/ui/Button";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

/**
 * Locale-scoped 404 — renders inside [locale]/layout.tsx
 * so Header and Footer are automatically included.
 */
export default async function LocaleNotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "errors" });
  const isNl = locale === "nl";

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-32">
      <div className="mx-auto max-w-lg text-center">
        {/* Decorative number */}
        <div className="relative mb-8 inline-block">
          <span
            className="select-none text-[10rem] font-black leading-none text-[var(--color-text-primary)] opacity-[0.04]"
            aria-hidden="true"
          >
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
              <Search className="h-8 w-8 text-[var(--color-text-muted)]" />
            </div>
          </div>
        </div>

        <h1 className="font-display mb-4 text-3xl font-black tracking-tight sm:text-4xl">
          {t("not_found_title")}
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-[var(--color-text-secondary)]">
          {t("not_found_description")}
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href={`/${locale}`}>
              <ArrowLeft className="h-4 w-4" />
              {t("not_found_button")}
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href={`/${locale}/contact`}>
              {isNl ? "Neem contact op" : "Contact us"}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
