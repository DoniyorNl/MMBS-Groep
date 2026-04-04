import { ContactForm } from "@/components/features/contact/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === "nl";
  return {
    title: isNl ? "Contact" : "Contact",
    description: isNl
      ? "Neem contact op met MMBS Groep. Wij beantwoorden uw vraag binnen 24 uur. Bel ons op +31 30 686 5447 of stuur een e-mail."
      : "Contact MMBS Group. We answer your question within 24 hours. Call us at +31 30 686 5447 or send an email.",
    alternates: { canonical: `${SITE_CONFIG.url}/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const isNl = locale === "nl";

  const infoItems = [
    {
      icon: Phone,
      label: t("phone_label"),
      value: SITE_CONFIG.phoneFormatted,
      href: `tel:${SITE_CONFIG.phone}`,
    },
    {
      icon: Mail,
      label: t("email_label"),
      value: SITE_CONFIG.email,
      href: `mailto:${SITE_CONFIG.email}`,
    },
    {
      icon: MapPin,
      label: t("address_title"),
      value: SITE_CONFIG.address.full,
      href: `https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address.full)}`,
    },
    {
      icon: Clock,
      label: t("hours_title"),
      value: t("hours"),
      href: null,
    },
  ];

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
        <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[var(--color-accent)] opacity-[0.04] blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-text-secondary)]">
                {isNl ? "Binnen 24 uur reactie" : "Response within 24 hours"}
              </span>
            </div>
            <h1 className="font-display mb-4 text-5xl font-black tracking-tight sm:text-6xl">
              {t("title")}
            </h1>
            <p className="text-xl leading-relaxed text-[var(--color-text-secondary)]">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Form */}
            <ScrollReveal>
              <ContactForm />
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal delay={0.1} direction="left">
              <div className="space-y-6">
                {/* Contact info cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {infoItems.map(({ icon: Icon, label, value, href }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
                    >
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-muted)]">
                        <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                      </div>
                      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)]"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-[var(--color-text-primary)]">{value}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Map embed placeholder */}
                <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-hover)]">
                  <iframe
                    title="MMBS Groep locatie"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE_CONFIG.address.full)}&output=embed&z=15`}
                    width="100%"
                    height="320"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="border-0 grayscale"
                  />
                </div>

                {/* Quick call */}
                <div className="rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent-muted)] p-6 text-center">
                  <p className="mb-2 text-sm text-[var(--color-text-secondary)]">
                    {isNl ? "Liever direct bellen?" : "Prefer to call directly?"}
                  </p>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="font-display text-2xl font-black text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
                  >
                    {SITE_CONFIG.phoneFormatted}
                  </a>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">{SITE_CONFIG.hours}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
