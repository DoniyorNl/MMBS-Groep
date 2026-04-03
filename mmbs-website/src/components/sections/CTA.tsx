import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SITE_CONFIG } from "@/lib/constants";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface CTAProps {
  locale: string;
}

export function CTA({ locale }: CTAProps) {
  const t = useTranslations("cta");

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-surface)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/5 via-transparent to-[var(--color-accent)]/5" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-full max-w-2xl -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-full max-w-2xl -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="font-display mb-4 text-4xl font-black tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mb-10 text-lg text-[var(--color-text-secondary)]">{t("subtitle")}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href={`/${locale}/contact`}>{t("button_primary")}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={`/${locale}/contact`}>{t("button_secondary")}</Link>
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              <Phone className="h-4 w-4" />
              {SITE_CONFIG.phoneFormatted}
            </a>
            <span className="hidden h-4 w-px bg-[var(--color-border)] sm:block" />
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              <Mail className="h-4 w-4" />
              {SITE_CONFIG.email}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
