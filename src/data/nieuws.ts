import type { NewsArticle } from "@/types";

export const newsArticles: NewsArticle[] = [
  {
    slug: "mmbs-wint-aanbesteding-renovatie-utrecht",
    title: "MMBS Groep wint aanbesteding renovatie historisch centrum Utrecht",
    excerpt:
      "MMBS Groep heeft de aanbesteding gewonnen voor de grootschalige renovatie van het historische centrum van Utrecht, ter waarde van €4,2 miljoen.",
    content: `
MMBS Groep heeft de aanbesteding gewonnen voor de renovatie van het historische centrum van Utrecht. Het project, ter waarde van €4,2 miljoen, omvat de volledige gevelrenovatie van 23 panden in de binnenstad.

## Over het project

Het project start in september 2026 en heeft een doorlooptijd van 18 maanden. De werkzaamheden omvatten:

- Restauratie van historisch metselwerk
- Gevelreiniging en -herstel van 23 panden
- Steigerbouw voor alle objecten
- Hervoegen van gevelstenen
- Aanbrengen van beschermende coatings

## Historisch verantwoord

Bijzonder aan dit project is de historische context. Alle materialen worden zorgvuldig geselecteerd om aan de eisen van de monumentencommissie te voldoen. MMBS Groep heeft ruime ervaring met dit type projecten, getuige eerdere restauraties zoals het Historisch Stadhuis Utrecht en de Monumentale Kerk in Amersfoort.

## Werkgelegenheid

Het project creëert werkgelegenheid voor circa 35 medewerkers van MMBS Groep. Directeur Jan van der Berg: "Wij zijn trots op dit vertrouwen van de Gemeente Utrecht. Dit project past perfect bij onze expertise in monumentale restauratie."
    `.trim(),
    image: "/images/news/nieuws-1.webp",
    published: "2026-04-01",
    category: "company",
    author: "Redactie MMBS",
  },
  {
    slug: "duurzaam-bouwen-energiebesparing-2026",
    title: "Buitengevelisolatie: hoe wij in 2026 energiebesparing maximaliseren",
    excerpt:
      "Met de nieuwste isolatietechnieken helpt MMBS Groep woningeigenaren tot 45% energiebesparing te realiseren. Lees meer over onze aanpak.",
    content: `
Energiebesparing staat hoog op de agenda voor woningeigenaren en woningcorporaties. MMBS Groep loopt voorop in het toepassen van de nieuwste buitengevelisolatie technieken.

## Waarom buitengevelisolatie?

Buitengevelisolatie is een van de meest effectieve manieren om uw woning energiezuiniger te maken. Voordelen:

- Gemiddeld 35-45% energiebesparing
- Verbetering van het wooncomfort
- Geen overlast voor bewoners tijdens uitvoering
- Verhoogt de waarde van uw woning
- Aanzienlijke verlaging van uw CO₂-uitstoot

## Onze werkwijze

Bij MMBS Groep werken we altijd met gecertificeerde materialen en getraind personeel. Ons team analyseert eerst de huidige situatie van uw gevel en stelt vervolgens een maatwerk isolatieplan op.

## Subsidies beschikbaar

In 2026 zijn er aantrekkelijke subsidies beschikbaar voor buitengevelisolatie. Vraag bij ons naar de mogelijkheden voor uw situatie.
    `.trim(),
    image: "/images/news/nieuws-2.webp",
    published: "2026-03-18",
    category: "industry",
    author: "Technisch Team MMBS",
  },
  {
    slug: "oplevering-kantoorpand-leidsche-rijn",
    title: "Succesvolle oplevering nieuwbouw kantoorpand Leidsche Rijn",
    excerpt:
      "MMBS Groep heeft het metselwerkproject voor het nieuwe kantoorpand in Leidsche Rijn met succes afgerond — twee weken voor de geplande opleverdatum.",
    content: `
Met trots kondigt MMBS Groep de succesvolle oplevering aan van het metselwerkproject voor het nieuwe kantoorpand in Leidsche Rijn, Utrecht. Het project werd twee weken voor de geplande opleverdatum afgerond.

## Projectdetails

Het kantoorpand van 2.400 m² is een modern gebouw met een combinatie van traditioneel metselwerk en hedendaagse architectuur. De werkzaamheden omvatten:

- Volledig metselwerk van fundering tot dak (2.400 m²)
- Plaatsing van decoratieve gevelelementen
- Steigerbouw voor de gehele projectduur
- Kwaliteitscontrole op alle uitvoerde werkzaamheden

## Klant aan het woord

Projectontwikkelaar VastgoedPro is zeer tevreden: "MMBS Groep heeft ons project niet alleen op tijd opgeleverd, maar ook de kwaliteit was uitstekend. We werken graag weer samen."

## Team

Een team van 18 MMBS-medewerkers heeft 6 maanden lang aan dit project gewerkt. Projectleider Marco de Vries: "De samenwerking met alle partijen verliep uitstekend. Een mooi project om terug op te kijken."
    `.trim(),
    image: "/images/news/nieuws-3.webp",
    published: "2026-03-05",
    category: "project",
    author: "Marco de Vries",
  },
  {
    slug: "mmbs-groep-breidt-team-uit",
    title: "MMBS Groep breidt team uit met 20 nieuwe vakmensen",
    excerpt:
      "Door de groeiende orderportefeuille breidt MMBS Groep het team uit met 20 nieuwe gecertificeerde vakmensen. Wij zijn op zoek naar talent!",
    content: `
De groeiende vraag naar kwalitatieve geveloplossingen zorgt ervoor dat MMBS Groep haar team verder uitbreidt. In het eerste kwartaal van 2026 zijn al 12 nieuwe medewerkers in dienst getreden, en er worden nog 8 vacatures ingevuld.

## Waarom groeien wij?

De orderportefeuille van MMBS Groep groeide in 2025 met 34% ten opzichte van het voorgaande jaar. De vraag naar buitengevelisolatie, gevelrenovatie en monumentale restauratie neemt sterk toe, mede door overheidssubsidies en verscherpte energienormen.

## Opleidingen en doorgroeimogelijkheden

MMBS Groep investeert sterk in de opleiding van medewerkers. Alle nieuwe medewerkers krijgen een uitgebreid onboardingprogramma en worden begeleid door een ervaren collega. Doorgroeimogelijkheden zijn er volop — van vakman naar projectleider.

## Open sollicitaties

Wij zijn altijd op zoek naar gemotiveerde vakmensen. Bekijk onze vacaturepagina voor de actuele openstaande posities, of stuur een open sollicitatie naar hr@mmbs.nl.
    `.trim(),
    image: "/images/news/nieuws-4.webp",
    published: "2026-02-20",
    category: "company",
    author: "HR Afdeling MMBS",
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: NewsArticle["category"]): NewsArticle[] {
  return newsArticles.filter((a) => a.category === category);
}

export function getRecentArticles(count = 3): NewsArticle[] {
  return [...newsArticles]
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
    .slice(0, count);
}
