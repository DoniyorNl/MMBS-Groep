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
    title: isNl ? "Algemene Voorwaarden" : "Terms & Conditions",
    description: isNl
      ? "De algemene voorwaarden van MMBS Groep. Lees de voorwaarden die van toepassing zijn op onze dienstverlening."
      : "The terms and conditions of MMBS Group. Read the terms applicable to our services.",
    robots: { index: true, follow: false },
    alternates: { canonical: `${SITE_CONFIG.url}/${locale}/algemene-voorwaarden` },
  };
}

export default async function AlgemeneVoorwaardenPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isNl = locale === "nl";

  const sections = isNl
    ? [
        {
          title: "Artikel 1 — Definities",
          content:
            'In deze algemene voorwaarden wordt verstaan onder: "Opdrachtnemer": MMBS Groep; "Opdrachtgever": de partij die een opdracht aan MMBS Groep verstrekt; "Diensten": alle door MMBS Groep uit te voeren werkzaamheden.',
        },
        {
          title: "Artikel 2 — Toepasselijkheid",
          content:
            "Deze voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten tussen MMBS Groep en opdrachtgevers. Afwijkingen zijn alleen geldig indien schriftelijk overeengekomen.",
        },
        {
          title: "Artikel 3 — Offertes en overeenkomsten",
          content:
            "Offertes zijn 30 dagen geldig. Een overeenkomst komt tot stand door schriftelijke bevestiging van MMBS Groep of door aanvang van de werkzaamheden.",
        },
        {
          title: "Artikel 4 — Uitvoering van werkzaamheden",
          content:
            "MMBS Groep voert werkzaamheden uit naar beste inzicht en vermogen. Wij hanteren de geldende kwaliteitsnormen en veiligheidsvereisten.",
        },
        {
          title: "Artikel 5 — Prijzen en betalingen",
          content:
            "Alle prijzen zijn exclusief BTW tenzij anders aangegeven. Facturen dienen binnen 14 dagen na factuurdatum te worden voldaan. Bij overschrijding is MMBS Groep gerechtigd de wettelijke rente in rekening te brengen.",
        },
        {
          title: "Artikel 6 — Garantie",
          content:
            "Op uitgevoerde werkzaamheden verlenen wij een garantie van 12 maanden na oplevering, tenzij anders overeengekomen. De garantie dekt gebreken die het gevolg zijn van ondeugdelijke uitvoering.",
        },
        {
          title: "Artikel 7 — Aansprakelijkheid",
          content:
            "De aansprakelijkheid van MMBS Groep is beperkt tot het bedrag dat in het betreffende geval wordt uitbetaald door de beroepsaansprakelijkheidsverzekering. MMBS Groep is niet aansprakelijk voor indirecte schade.",
        },
        {
          title: "Artikel 8 — Overmacht",
          content:
            "Bij overmacht is MMBS Groep gerechtigd de uitvoering op te schorten of de overeenkomst te ontbinden, zonder gehouden te zijn tot enige schadevergoeding.",
        },
        {
          title: "Artikel 9 — Toepasselijk recht",
          content:
            "Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement Utrecht.",
        },
      ]
    : [
        {
          title: "Article 1 — Definitions",
          content:
            'In these terms: "Contractor" means MMBS Group; "Client" means the party placing an order with MMBS Group; "Services" means all work to be carried out by MMBS Group.',
        },
        {
          title: "Article 2 — Applicability",
          content:
            "These terms apply to all offers, quotes and agreements between MMBS Group and clients. Deviations are only valid if agreed in writing.",
        },
        {
          title: "Article 3 — Quotes and agreements",
          content:
            "Quotes are valid for 30 days. An agreement is concluded upon written confirmation by MMBS Group or upon commencement of work.",
        },
        {
          title: "Article 4 — Execution of work",
          content:
            "MMBS Group carries out work to the best of its knowledge and ability. We apply current quality standards and safety requirements.",
        },
        {
          title: "Article 5 — Prices and payments",
          content:
            "All prices are exclusive of VAT unless stated otherwise. Invoices must be paid within 14 days of invoice date. In case of late payment, MMBS Group is entitled to charge statutory interest.",
        },
        {
          title: "Article 6 — Warranty",
          content:
            "We provide a 12-month warranty on completed work after delivery, unless otherwise agreed. The warranty covers defects resulting from defective execution.",
        },
        {
          title: "Article 7 — Liability",
          content:
            "MMBS Group's liability is limited to the amount paid out in the relevant case by the professional liability insurance. MMBS Group is not liable for indirect damages.",
        },
        {
          title: "Article 8 — Force majeure",
          content:
            "In case of force majeure, MMBS Group is entitled to suspend performance or dissolve the agreement without being obliged to pay any compensation.",
        },
        {
          title: "Article 9 — Applicable law",
          content:
            "Dutch law applies to all agreements. Disputes shall be submitted to the competent court in the district of Utrecht.",
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
            {isNl ? "Algemene Voorwaarden" : "Terms & Conditions"}
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
              {isNl ? "Vragen over deze voorwaarden?" : "Questions about these terms?"}
            </h2>
            <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
              {isNl
                ? "Neem contact met ons op."
                : "Contact us."}
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
            <Link href={`/${locale}/privacybeleid`} className="text-[var(--color-text-muted)] underline-offset-4 hover:underline">
              {isNl ? "Privacybeleid" : "Privacy Policy"}
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
