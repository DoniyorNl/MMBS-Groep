import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { testimonials } from "@/data/testimonials";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="bg-[var(--color-surface)] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-16 text-center">
          <h2 className="font-display mb-4 text-4xl font-black tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)]">{t("subtitle")}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={testimonial.id} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-6">
                <Quote className="mb-4 h-8 w-8 text-[var(--color-accent)] opacity-60" />
                <p className="mb-6 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <span key={j} className="text-[var(--color-accent)]">
                      ★
                    </span>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent-muted)] text-sm font-bold text-[var(--color-accent)]">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.author}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {testimonial.role} — {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
