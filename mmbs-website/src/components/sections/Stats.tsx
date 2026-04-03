import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useTranslations } from "next-intl";

export function Stats() {
  const t = useTranslations("stats");

  const stats = [
    { value: 20, suffix: "+", labelKey: "years_label" },
    { value: 1500, suffix: "+", labelKey: "projects_label" },
    { value: 100, suffix: "+", labelKey: "professionals_label" },
    { value: 500, suffix: "+", labelKey: "clients_label" },
  ];

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.labelKey} delay={i * 0.1} className="text-center">
              <div className="font-display mb-1 text-4xl font-black tracking-tight text-[var(--color-accent)] sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                {t(stat.labelKey)}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
