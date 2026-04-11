import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { services } from "@/data/services";
import { ArrowRight, Blocks, Building2, Flame, Landmark, Wrench } from "lucide-react";
import { getServiceDetailPath, getServiceIndexPath } from "@/lib/services-routing";
import { useTranslations } from "next-intl";
import Link from "next/link";

const SERVICE_ICONS: Record<string, React.ElementType> = {
  "brick-wall": Blocks,
  "building-2": Building2,
  landmark: Landmark,
  thermometer: Flame,
  construction: Wrench,
};

interface ServicesProps {
  locale: string;
}

export function Services({ locale }: ServicesProps) {
  const t = useTranslations("services");

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="mb-16 max-w-2xl">
          <h2 className="font-display mb-4 text-4xl font-black tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)]">{t("subtitle")}</p>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon] ?? Blocks;
            return (
              <ScrollReveal key={service.slug} delay={i * 0.08}>
                <Link
                  href={getServiceDetailPath(locale, service)}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-surface-hover)] hover:shadow-xl hover:shadow-[var(--color-accent-muted)]"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent-muted)]">
                    <Icon className="h-6 w-6 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="font-display mb-2 text-xl font-bold">
                    {t(`items.${service.slug}.title`)}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {t(`items.${service.slug}.short`)}
                  </p>
                  <span className="flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] transition-gap duration-200 group-hover:gap-2">
                    {t("read_more")}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}

          {/* CTA Card */}
          <ScrollReveal delay={services.length * 0.08}>
            <Link
              href={getServiceIndexPath(locale)}
              className="group flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-border)] p-6 text-center transition-all duration-300 hover:border-[var(--color-accent)]/40"
            >
              <p className="mb-2 text-lg font-semibold text-[var(--color-text-secondary)]">
                {t("all_services")}
              </p>
              <ArrowRight className="h-5 w-5 text-[var(--color-accent)] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
