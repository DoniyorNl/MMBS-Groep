import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Handshake,
  Leaf,
  Shield,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

interface OverPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: OverPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === "nl";
  return {
    title: isNl ? "Over Ons" : "About Us",
    description: isNl
      ? "Meer dan 20 jaar expert in geveloplossingen. Ontdek het verhaal, het team en de missie van MMBS Groep."
      : "More than 20 years of expertise in facade solutions. Discover the story, team and mission of MMBS Group.",
    alternates: { canonical: `${SITE_CONFIG.url}/${locale}/over` },
  };
}

const TIMELINE = [
  { year: "2003", nl: "MMBS Groep opgericht in Utrecht met een team van 5 specialisten.", en: "MMBS Group founded in Utrecht with a team of 5 specialists." },
  { year: "2007", nl: "Uitbreiding naar renovatie en restauratieprojecten door heel Nederland.", en: "Expansion into renovation and restoration projects throughout the Netherlands." },
  { year: "2012", nl: "Eerste grote monumentale restauratieproject — Domtoren regio.", en: "First major heritage restoration project — Domtoren region." },
  { year: "2016", nl: "Lancering van de isolatiedivisie; 500+ projecten gerealiseerd.", en: "Launch of the insulation division; 500+ projects completed." },
  { year: "2020", nl: "100 medewerkers in dienst. Groei naar €12 miljoen jaaromzet.", en: "100 employees. Growth to €12 million annual revenue." },
  { year: "2026", nl: "Marktleider in geveloplossingen in de regio Utrecht en omstreken.", en: "Market leader in facade solutions in the Utrecht region." },
];

const CERTIFICATIONS = [
  "ISO 9001:2015",
  "VCA**",
  "BRL 9320",
  "KOMO",
  "CROW",
  "SKG-IKOB",
];

const WHY_ITEMS = [
  {
    icon: Award,
    nl: { title: "Gecertificeerd vakmanschap", desc: "Al onze medewerkers zijn gecertificeerd en volgen continue bijscholing." },
    en: { title: "Certified craftsmanship", desc: "All our employees are certified and receive continuous further training." },
  },
  {
    icon: Clock,
    nl: { title: "Op tijd, altijd", desc: "Wij plannen scherp en leveren consequent op of vóór de afgesproken datum." },
    en: { title: "On time, always", desc: "We plan precisely and consistently deliver on or before the agreed date." },
  },
  {
    icon: Leaf,
    nl: { title: "Duurzame aanpak", desc: "We kiezen bewust voor duurzame materialen en milieuvriendelijke methoden." },
    en: { title: "Sustainable approach", desc: "We consciously choose sustainable materials and environmentally friendly methods." },
  },
  {
    icon: Shield,
    nl: { title: "Volledig verzekerd", desc: "Al onze projecten zijn volledig verzekerd en voldoen aan alle veiligheidsnormen." },
    en: { title: "Fully insured", desc: "All our projects are fully insured and comply with all safety standards." },
  },
  {
    icon: Handshake,
    nl: { title: "Persoonlijke aanpak", desc: "Elke opdrachtgever krijgt een vaste contactpersoon en directe communicatie." },
    en: { title: "Personal approach", desc: "Every client gets a dedicated contact person and direct communication." },
  },
  {
    icon: Star,
    nl: { title: "Kwaliteitsgarantie", desc: "Op al onze werkzaamheden bieden wij een uitgebreide kwaliteitsgarantie." },
    en: { title: "Quality guarantee", desc: "We offer an extensive quality guarantee on all our work." },
  },
];

export default async function OverPage({ params }: OverPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const isNl = locale === "nl";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-background)] pb-24 pt-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="pointer-events-none absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-[var(--color-accent)] opacity-[0.04] blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-text-secondary)]">
                  {isNl ? "Opgericht in 2003" : "Founded in 2003"}
                </span>
              </div>
              <h1 className="font-display mb-6 text-5xl font-black tracking-tight sm:text-6xl">
                {t("title")}
              </h1>
              <p className="text-xl leading-relaxed text-[var(--color-text-secondary)]">
                {t("subtitle")}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "20+", label: isNl ? "Jaar ervaring" : "Years experience" },
                { value: "1500+", label: isNl ? "Projecten" : "Projects" },
                { value: "100+", label: isNl ? "Medewerkers" : "Employees" },
                { value: "500+", label: isNl ? "Opdrachtgevers" : "Clients" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center"
                >
                  <p className="font-display text-4xl font-black text-[var(--color-accent)]">{value}</p>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story + Mission */}
      <section className="py-24 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <ScrollReveal>
              <h2 className="font-display mb-6 text-3xl font-bold">{t("story_title")}</h2>
              <p className="leading-relaxed text-[var(--color-text-secondary)]">{t("story")}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display mb-6 text-3xl font-bold">{t("mission_title")}</h2>
              <p className="leading-relaxed text-[var(--color-text-secondary)]">{t("mission")}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-display mb-16 text-center text-4xl font-black">
              {isNl ? "Onze geschiedenis" : "Our history"}
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[28px] top-0 h-full w-px bg-[var(--color-border)] sm:left-1/2 sm:-translate-x-1/2" />

            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 0.07}>
                  <div className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                    {/* Content */}
                    <div className={`ml-16 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8"}`}>
                      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                        <span className="font-display text-2xl font-black text-[var(--color-accent)]">{item.year}</span>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                          {isNl ? item.nl : item.en}
                        </p>
                      </div>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-[20px] top-5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-background)] sm:left-1/2 sm:-translate-x-1/2" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-24 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-16 text-center">
            <h2 className="font-display mb-4 text-4xl font-black">
              {isNl ? "Waarom kiezen voor MMBS Groep?" : "Why choose MMBS Group?"}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_ITEMS.map((item, i) => {
              const Icon = item.icon;
              const content = isNl ? item.nl : item.en;
              return (
                <ScrollReveal key={i} delay={i * 0.07}>
                  <div className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent-muted)]">
                      <Icon className="h-6 w-6 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <h3 className="font-display mb-2 text-lg font-bold">{content.title}</h3>
                      <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{content.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-12 text-center">
            <h2 className="font-display mb-4 text-4xl font-black">{t("certifications_title")}</h2>
            <p className="text-[var(--color-text-secondary)]">
              {isNl
                ? "Wij voldoen aan de hoogste normen en beschikken over alle relevante certificeringen."
                : "We meet the highest standards and hold all relevant certifications."}
            </p>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <ScrollReveal key={cert} delay={i * 0.05}>
                <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3">
                  <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)]" />
                  <span className="font-mono text-sm font-semibold">{cert}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-12 text-center">
            <h2 className="font-display mb-4 text-4xl font-black">{t("team_title")}</h2>
            <p className="text-lg text-[var(--color-text-secondary)]">{t("team_subtitle")}</p>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { name: "Jan van der Berg", role: isNl ? "Directeur" : "Director" },
              { name: "Marco de Vries", role: isNl ? "Projectleider" : "Project Manager" },
              { name: "Sandra Kuiper", role: isNl ? "Hoofd Kwaliteit" : "Head of Quality" },
              { name: "Ahmed Bouazza", role: isNl ? "Sr. Metselaar" : "Sr. Bricklayer" },
            ].map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.07}>
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent-muted)]">
                    <Users className="h-7 w-7 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="font-display mb-1 text-base font-bold">{member.name}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{member.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center sm:p-16">
              <h2 className="font-display mb-4 text-3xl font-black sm:text-4xl">
                {isNl ? "Samenwerken met MMBS Groep?" : "Work with MMBS Group?"}
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg text-[var(--color-text-secondary)]">
                {isNl
                  ? "Neem contact op voor een vrijblijvend kennismakingsgesprek of vraag direct een offerte aan."
                  : "Contact us for a no-obligation introductory meeting or request a quote directly."}
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex h-12 items-center gap-2 rounded-lg bg-[var(--color-accent)] px-8 font-medium text-[var(--color-background)] shadow-lg shadow-[var(--color-accent-muted)] transition-colors hover:bg-[var(--color-accent-hover)]"
                >
                  {isNl ? "Neem contact op" : "Get in touch"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="inline-flex h-12 items-center gap-2 rounded-lg border border-[var(--color-border)] px-8 font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  {SITE_CONFIG.phoneFormatted}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
