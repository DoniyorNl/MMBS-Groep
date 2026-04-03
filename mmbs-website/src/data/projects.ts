import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "historisch-stadhuis-restauratie-utrecht",
    title: "Restauratie Historisch Stadhuis Utrecht",
    location: "Utrecht",
    year: 2024,
    type: "restauratie",
    image: "/images/projects/project-1.webp",
    images: [
      "/images/projects/project-1.webp",
      "/images/projects/project-1b.webp",
    ],
    description:
      "Volledige restauratie van het gevel van het historische stadhuis in het centrum van Utrecht. Het project omvatte meticuleus herstel van het originele metselwerk, inclusief het vervangen van beschadigde bakstenen en het opnieuw voegen van de gehele gevel.",
    client: "Gemeente Utrecht",
    surface: 1200,
    featured: true,
  },
  {
    slug: "gevelrenovatie-woningcorporatie-amsterdam",
    title: "Gevelrenovatie Wooncomplex Amsterdam",
    location: "Amsterdam",
    year: 2024,
    type: "renovatie",
    image: "/images/projects/project-2.webp",
    images: ["/images/projects/project-2.webp"],
    description:
      "Renovatie van 48 woningen in een wooncomplex in Amsterdam-Noord. De werkzaamheden omvatten volledige gevelrenovatie inclusief isolatie, nieuwe voegwerk en coating.",
    client: "Woningcorporatie WoonDaad",
    surface: 3200,
    featured: true,
  },
  {
    slug: "nieuwbouw-bedrijfspand-utrecht",
    title: "Nieuwbouw Bedrijfspand Leidsche Rijn",
    location: "Utrecht",
    year: 2023,
    type: "nieuwbouw",
    image: "/images/projects/project-3.webp",
    images: ["/images/projects/project-3.webp"],
    description:
      "Complete metselwerkwerkzaamheden voor een nieuw bedrijfspand van 2400 m² in Leidsche Rijn, Utrecht. Van fundering tot de afwerking van de buitengevel.",
    client: "Ontwikkelaar VastgoedPro",
    surface: 2400,
    featured: true,
  },
  {
    slug: "isolatie-portiekwoning-rotterdam",
    title: "Buitengevelisolatie Portiekwoningen Rotterdam",
    location: "Rotterdam",
    year: 2023,
    type: "isolatie",
    image: "/images/projects/project-4.webp",
    images: ["/images/projects/project-4.webp"],
    description:
      "Buitengevelisolatie van een portiekwoningencomplex met 32 woningen in Rotterdam-West. Energiebesparing van gemiddeld 35% per woning.",
    client: "Woonstad Rotterdam",
    surface: 1800,
    featured: false,
  },
  {
    slug: "monument-restauratie-domtoren",
    title: "Restauratie Monumentale Kerk Amersfoort",
    location: "Amersfoort",
    year: 2023,
    type: "restauratie",
    image: "/images/projects/project-5.webp",
    images: ["/images/projects/project-5.webp"],
    description:
      "Gespecialiseerde restauratie van een monumentale kerk uit de 15e eeuw. Herstel van origineel gotisch metselwerk met historisch verantwoorde materialen.",
    client: "Stichting Kerkbehoud Amersfoort",
    surface: 850,
    featured: false,
  },
  {
    slug: "steigerbouw-kantoorpand-den-haag",
    title: "Steigerbouw Renovatie Kantoorpand Den Haag",
    location: "Den Haag",
    year: 2024,
    type: "renovatie",
    image: "/images/projects/project-6.webp",
    images: ["/images/projects/project-6.webp"],
    description:
      "Plaatsing en beheer van steigers voor de renovatie van een 8-verdiepingen tellend kantoorpand in het centrum van Den Haag.",
    client: "Vastgoed Den Haag BV",
    surface: 4000,
    featured: false,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByType(type: Project["type"]): Project[] {
  return projects.filter((p) => p.type === type);
}
