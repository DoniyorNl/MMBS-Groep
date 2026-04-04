import { Calculator } from "@/components/features/calculator/Calculator";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, Mail, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface OffertePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: OffertePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === "nl";
  return {
    title: isNl ? "Offerte Aanvragen" : "Request a Quote",
    description: isNl
      ? "Bereken direct een indicatieve prijs voor uw project. Metselwerk, gevelrenovatie, isolatie en meer. Binnen 24 uur een reactie."
      : "Calculate an indicative price for your project instantly. Brickwork, facade renovation, insulation and more. Response within 24 hours.",
    alternates: { canonical: `${SITE_CONFIG.url}/${locale}/offerte` },
  };
}

export default async function OffertePage({ params }: OffertePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const isNl = locale === "nl";

  const trustItems = [
    {
      icon: Clock,
      title: isNl ? "Reactie binnen 24 uur" : "Response within 24 hours",
      desc: isNl
        ? "Wij nemen snel contact met u op na uw aanvraag."
        : "We contact you quickly after your request.",
    },
    {
      icon: ShieldCheck,
      title: isNl ? "Vrijblijvend advies" : "No-obligation advice",
      desc: isNl
        ? "Onze offertes zijn altijd gratis en zonder verplichtingen."
        : "Our quotes are always free and without obligation.",
    },
    {
      icon: Phone,
      title: isNl ? "Persoonlijk contact" : "Personal contact",
      desc: isNl
        ? "U krijgt altijd een vaste contactpersoon toegewezen."
        : "You will always be assigned a dedicated contact person.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-background)] pb-12 pt-32">
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
                {isNl ? "Gratis & vrijblijvend" : "Free & no obligation"}
              </span>
            </div>
            <h1 className="font-display mb-4 text-5xl font-black tracking-tight sm:text-6xl">
              {isNl ? "Offerte aanvragen" : "Request a quote"}
            </h1>
            <p className="text-xl leading-relaxed text-[var(--color-text-secondary)]">
              {isNl
                ? "Vul de calculator in en ontvang binnen 24 uur een op maat gemaakt voorstel van onze experts."
                : "Fill in the calculator and receive a tailored proposal from our experts within 24 hours."}
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Calculator — takes 3 cols */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <Calculator locale={locale} />
              </ScrollReveal>
            </div>

            {/* Sidebar — takes 2 cols */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={0.1} direction="left">
                <div className="space-y-6">
                  {/* Trust items */}
                  <div className="space-y-4">
                    {trustItems.map(({ icon: Icon, title, desc }) => (
                      <div
                        key={title}
                        className="flex gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-muted)]">
                          <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                        </div>
                        <div>
                          <p className="mb-1 text-sm font-semibold text-[var(--color-text-primary)]">
                            {title}
                          </p>
                          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                            {desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Direct contact */}
                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                    <p className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">
                      {isNl ? "Liever direct contact?" : "Prefer direct contact?"}
                    </p>
                    <div className="space-y-3">
                      <a
                        href={`tel:${SITE_CONFIG.phone}`}
                        className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                      >
                        <Phone className="h-4 w-4 shrink-0" />
                        <span>{SITE_CONFIG.phoneFormatted}</span>
                      </a>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                      >
                        <Mail className="h-4 w-4 shrink-0" />
                        <span>{SITE_CONFIG.email}</span>
                      </a>
                    </div>
                    <p className="mt-3 text-xs text-[var(--color-text-muted)]">{SITE_CONFIG.hours}</p>
                  </div>

                  {/* Contact page link */}
                  <p className="text-center text-sm text-[var(--color-text-muted)]">
                    {isNl ? "Heeft u een andere vraag?" : "Have a different question?"}{" "}
                    <Link
                      href={`/${locale}/contact`}
                      className="font-medium text-[var(--color-text-primary)] underline-offset-4 hover:underline"
                    >
                      {t("title")}
                    </Link>
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
