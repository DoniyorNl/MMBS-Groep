import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === "nl";
  return {
    title: isNl ? "Privacybeleid" : "Privacy Policy",
    description: isNl
      ? "Lees het privacybeleid van MMBS Groep. Wij gaan zorgvuldig om met uw persoonsgegevens."
      : "Read the privacy policy of MMBS Group. We handle your personal data with care.",
    robots: { index: true, follow: false },
    alternates: { canonical: `${SITE_CONFIG.url}/${locale}/privacybeleid` },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isNl = locale === "nl";

  const sections = isNl
    ? [
        {
          title: "1. Verantwoordelijke partij",
          content: `MMBS Groep (KvK: 12345678), gevestigd te ${SITE_CONFIG.address.full}, is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid.`,
        },
        {
          title: "2. Welke gegevens verwerken wij?",
          content:
            "Wij verwerken de volgende persoonsgegevens: naam, e-mailadres, telefoonnummer en de inhoud van uw bericht wanneer u contact met ons opneemt via het contactformulier of de offerteaanvraag.",
        },
        {
          title: "3. Doel van de verwerking",
          content:
            "Uw gegevens worden uitsluitend gebruikt voor het beantwoorden van uw vragen, het opstellen van offertes en het uitvoeren van onze dienstverlening. Wij verkopen uw gegevens nooit aan derden.",
        },
        {
          title: "4. Bewaartermijn",
          content:
            "Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk. Gegevens van klanten bewaren wij maximaal 7 jaar in verband met de wettelijke bewaarplicht.",
        },
        {
          title: "5. Cookies",
          content:
            "Onze website maakt gebruik van functionele cookies om de website goed te laten functioneren. Wij gebruiken geen tracking cookies van derden zonder uw toestemming.",
        },
        {
          title: "6. Uw rechten",
          content:
            "U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te laten verwijderen. Stuur hiervoor een e-mail naar " + SITE_CONFIG.email + ". Wij reageren binnen 30 dagen.",
        },
        {
          title: "7. Beveiliging",
          content:
            "Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen ongeoorloofde toegang of verlies.",
        },
        {
          title: "8. Wijzigingen",
          content:
            "Wij behouden het recht dit privacybeleid te wijzigen. De meest actuele versie is altijd te vinden op deze pagina.",
        },
      ]
    : [
        {
          title: "1. Data controller",
          content: `MMBS Group (CoC: 12345678), located at ${SITE_CONFIG.address.full}, is responsible for processing personal data as described in this privacy policy.`,
        },
        {
          title: "2. What data do we process?",
          content:
            "We process the following personal data: name, email address, phone number and the content of your message when you contact us via the contact form or quote request.",
        },
        {
          title: "3. Purpose of processing",
          content:
            "Your data is used exclusively to answer your questions, prepare quotes and provide our services. We never sell your data to third parties.",
        },
        {
          title: "4. Retention period",
          content:
            "We do not retain your personal data longer than necessary. Customer data is retained for a maximum of 7 years in accordance with legal obligations.",
        },
        {
          title: "5. Cookies",
          content:
            "Our website uses functional cookies to ensure proper functioning. We do not use third-party tracking cookies without your consent.",
        },
        {
          title: "6. Your rights",
          content:
            "You have the right to access, correct or delete your personal data. Send an email to " + SITE_CONFIG.email + ". We respond within 30 days.",
        },
        {
          title: "7. Security",
          content:
            "We take appropriate technical and organisational measures to protect your personal data against unauthorised access or loss.",
        },
        {
          title: "8. Changes",
          content:
            "We reserve the right to amend this privacy policy. The most current version can always be found on this page.",
        },
      ];

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-surface)] pb-12 pt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
            {isNl ? "Juridisch" : "Legal"}
          </p>
          <h1 className="font-display text-4xl font-black tracking-tight sm:text-5xl">
            {isNl ? "Privacybeleid" : "Privacy Policy"}
          </h1>
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            {isNl ? "Laatste update:" : "Last updated:"} 1 januari 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display mb-3 text-xl font-bold">{section.title}</h2>
                <p className="leading-relaxed text-[var(--color-text-secondary)]">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h2 className="font-display mb-2 text-lg font-bold">
              {isNl ? "Vragen over dit beleid?" : "Questions about this policy?"}
            </h2>
            <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
              {isNl
                ? "Neem gerust contact met ons op via onderstaande gegevens."
                : "Feel free to contact us using the details below."}
            </p>
            <div className="flex flex-col gap-1 text-sm">
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-[var(--color-accent)] hover:underline">
                {SITE_CONFIG.email}
              </a>
              <a href={`tel:${SITE_CONFIG.phone}`} className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]">
                {SITE_CONFIG.phoneFormatted}
              </a>
            </div>
          </div>

          <div className="mt-8 flex gap-4 text-sm">
            <Link href={`/${locale}/algemene-voorwaarden`} className="text-[var(--color-text-muted)] underline-offset-4 hover:underline">
              {isNl ? "Algemene voorwaarden" : "Terms & Conditions"}
            </Link>
            <Link href={`/${locale}/contact`} className="text-[var(--color-text-muted)] underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
