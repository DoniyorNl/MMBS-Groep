import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Award, Clock, Leaf, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS = [Award, Clock, Leaf, Shield];
const KEYS = ["vakmanschap", "snelheid", "duurzaamheid", "kwaliteit"] as const;

export function WhyUs() {
  const t = useTranslations("whyus");

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-16 max-w-2xl">
          <h2 className="font-display mb-4 text-4xl font-black tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)]">{t("subtitle")}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {KEYS.map((key, i) => {
            const Icon = ICONS[i];
            return (
              <ScrollReveal key={key} delay={i * 0.1}>
                <div className="flex flex-col gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-accent)]/20 bg-[var(--color-accent-muted)]">
                    <Icon className="h-6 w-6 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="font-display text-xl font-bold">{t(`items.${key}.title`)}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
