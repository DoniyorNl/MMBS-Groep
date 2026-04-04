import type { Vacature } from "@/types";

export const vacatures: Vacature[] = [
  {
    id: "metselaar-senior",
    title: "Senior Metselaar",
    location: "Utrecht",
    type: "fulltime",
    description:
      "Wij zoeken een ervaren metselaar voor gevarieerde projecten in de regio Utrecht. Je werkt zelfstandig en in teamverband aan zowel nieuwbouw als restauratieprojecten.",
    requirements: [
      "Minimaal 5 jaar aantoonbare ervaring als metselaar",
      "Rijbewijs B",
      "Kennis van historisch metselwerk is een pré",
      "Bereid om door heel Nederland te werken",
      "VCA basis certificaat",
    ],
    published: "2026-03-15",
  },
  {
    id: "gevelrenovatie-specialist",
    title: "Gevelrenovatie Specialist",
    location: "Utrecht",
    type: "fulltime",
    description:
      "Als gevelrenovatie specialist ben je verantwoordelijk voor het uitvoeren van hoogwaardige gevelwerkzaamheden. Je hebt kennis van diverse renovatietechnieken en materialenkennis.",
    requirements: [
      "Opleiding in de bouw (MBO niveau 3 of 4)",
      "Ervaring met gevelrenovatie en coatingwerk",
      "Kennis van isolatiemethoden",
      "Teamspeler met oog voor kwaliteit",
      "Veiligheid staat bij jou voorop",
    ],
    published: "2026-03-20",
  },
  {
    id: "projectleider",
    title: "Projectleider Bouw",
    location: "Utrecht",
    type: "fulltime",
    description:
      "Voor onze groeiende projectenportefeuille zoeken wij een ervaren projectleider. Je bent verantwoordelijk voor de planning, aansturing en kwaliteitsbewaking van meerdere projecten tegelijk.",
    requirements: [
      "HBO werk- en denkniveau",
      "Minimaal 5 jaar ervaring als projectleider in de bouw",
      "Sterke communicatieve vaardigheden",
      "Ervaring met MS Project of vergelijkbaar",
      "Kennis van CROW-richtlijnen",
    ],
    published: "2026-04-01",
  },
  {
    id: "steigerbouwer",
    title: "Steigerbouwer",
    location: "Utrecht / Regio",
    type: "fulltime",
    description:
      "Wij zoeken enthousiaste steigerbouwers voor gevarieerde projecten. Je werkt aan diverse objecten van kleine woningbouw tot grote industriële complexen.",
    requirements: [
      "Certificaat steigerbouw (basis of all-round)",
      "Fysiek fit en hoogtevrees-vrij",
      "Rijbewijs B/BE",
      "Bereid tot reizen door Nederland",
      "VCA certificaat",
    ],
    published: "2026-03-28",
  },
];

export function getVacatureById(id: string): Vacature | undefined {
  return vacatures.find((v) => v.id === id);
}
