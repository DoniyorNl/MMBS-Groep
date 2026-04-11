import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { SITE_CONFIG } from "@/lib/constants";
import { generateText } from "ai";
import { NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatPayload {
  messages: ChatMessage[];
  locale?: string;
}

const SYSTEM_CONTEXT = `
Je bent de virtuele assistent van ${SITE_CONFIG.name}, een gespecialiseerd bouw- en gevelrenovatiebedrijf gevestigd in Utrecht, Nederland.

Diensten: metselwerk, gevelrenovatie, monumentale restauratie, isolatie (spouwmuur, buitengevel, dak), steigerbouw.
Contactgegevens: ${SITE_CONFIG.phone} | ${SITE_CONFIG.email} | ${SITE_CONFIG.address.full}
Openingstijden: ${SITE_CONFIG.hours}

Beantwoord vragen kort en vriendelijk. Verwijs voor offerte naar contact of tel:${SITE_CONFIG.phone}.
Als je een vraag niet kunt beantwoorden, zeg dat eerlijk en stel voor contact op te nemen.
Antwoord in hetzelfde taalniveau als de gebruiker (Nederlands of Engels op basis van de vraag).
`.trim();

function buildRuleBasedReply(message: string, locale: string): string | null {
  const lower = message.toLowerCase();
  const isNl = locale !== "en";

  const keywords: Array<{ match: string[]; nl: string; en: string }> = [
    {
      match: ["prijs", "kosten", "offerte", "price", "cost", "quote"],
      nl: `Voor een nauwkeurige offerte kunt u ons bereiken via ${SITE_CONFIG.phoneFormatted} of stuur een e-mail naar ${SITE_CONFIG.email}. U kunt ook onze offertepagina gebruiken.`,
      en: `For an accurate quote, please contact us at ${SITE_CONFIG.phoneFormatted} or email ${SITE_CONFIG.email}. You can also use our quote page.`,
    },
    {
      match: ["openingstijden", "uren", "open", "hours"],
      nl: `Wij zijn bereikbaar op maandag t/m vrijdag van 07:00 tot 17:00 uur. U kunt ons bellen op ${SITE_CONFIG.phoneFormatted}.`,
      en: `We are available Monday to Friday from 07:00 to 17:00. You can call us at ${SITE_CONFIG.phoneFormatted}.`,
    },
    {
      match: ["adres", "locatie", "address", "location", "waar", "where"],
      nl: `Ons kantoor is gevestigd op ${SITE_CONFIG.address.full}.`,
      en: `Our office is located at ${SITE_CONFIG.address.full}.`,
    },
    {
      match: ["metselwerk", "brickwork"],
      nl: "Ons metselwerkteam verzorgt zowel nieuwbouw als renovatieprojecten. Wij werken met hoogwaardige materialen en gecertificeerde vakmensen.",
      en: "Our brickwork team handles both new build and renovation projects using high-quality materials and certified specialists.",
    },
    {
      match: ["gevelrenovatie", "facade renovation", "gevel"],
      nl: "Wij renoveren gevels van alle typen gebouwen — van woonhuizen tot monumentale panden. Dit omvat reiniging, herstel en beschermende coatings.",
      en: "We renovate facades of all building types — from homes to listed buildings. This includes cleaning, repair and protective coatings.",
    },
    {
      match: ["isolatie", "insulation", "energiebesparing", "energy"],
      nl: "Onze isolatiedivisie biedt spouwmuurisolatie, buitengevelisolatie en dakisolatie. Gemiddeld 35-45% energiebesparing. Vraag naar subsidies!",
      en: "Our insulation division offers cavity wall, external facade and roof insulation. Average 35-45% energy savings. Ask about subsidies!",
    },
    {
      match: ["monument", "restauratie", "restoration", "historisch"],
      nl: "Wij zijn specialist in monumentale restauratie. Wij werken nauw samen met monumentencommissies en gebruiken historisch verantwoorde materialen.",
      en: "We specialise in heritage restoration, working closely with heritage commissions using historically appropriate materials.",
    },
    {
      match: ["steiger", "scaffold"],
      nl: "Wij plaatsen en beheren steigers voor alle projecttypes. Gecertificeerd conform NEN-EN 12811, van kleine renovaties tot grote complexen.",
      en: "We install and manage scaffolding for all project types. Certified to NEN-EN 12811, from small renovations to large complexes.",
    },
    {
      match: ["contact", "bellen", "call", "telefoon", "phone", "email"],
      nl: `U kunt ons bereiken via:\n📞 ${SITE_CONFIG.phoneFormatted}\n📧 ${SITE_CONFIG.email}\n📍 ${SITE_CONFIG.address.full}\n🕐 ${SITE_CONFIG.hours}`,
      en: `You can reach us via:\n📞 ${SITE_CONFIG.phoneFormatted}\n📧 ${SITE_CONFIG.email}\n📍 ${SITE_CONFIG.address.full}\n🕐 ${SITE_CONFIG.hours}`,
    },
  ];

  for (const { match, nl, en } of keywords) {
    if (match.some((kw) => lower.includes(kw))) {
      return isNl ? nl : en;
    }
  }

  return null;
}

function fallbackReply(locale: string): string {
  const isNl = locale !== "en";
  return isNl
    ? `Bedankt voor uw vraag! Voor een persoonlijk antwoord kunt u ons bereiken op ${SITE_CONFIG.phoneFormatted} of ${SITE_CONFIG.email}. Wij staan u graag te woord!`
    : `Thank you for your question! For a personal answer, please contact us at ${SITE_CONFIG.phoneFormatted} or ${SITE_CONFIG.email}. We are happy to help!`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatPayload;
    const { messages = [], locale = "nl" } = body;

    if (!messages.length) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];

    if (lastMessage.role !== "user") {
      return NextResponse.json({ error: "Last message must be from user" }, { status: 400 });
    }

    const apiKey =
      process.env.GEMINI_API_KEY?.trim() ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim();

    if (apiKey) {
      try {
        const google = createGoogleGenerativeAI({ apiKey });
        const { text } = await generateText({
          model: google("gemini-2.0-flash"),
          system: SYSTEM_CONTEXT,
          prompt: lastMessage.content,
          maxOutputTokens: 512,
        });
        const trimmed = text?.trim();
        if (trimmed) {
          return NextResponse.json({ reply: trimmed, source: "gemini" }, { status: 200 });
        }
      } catch (err) {
        console.error("[chat] Gemini error:", err);
      }
    }

    const rulesReply = buildRuleBasedReply(lastMessage.content, locale);
    const reply = rulesReply ?? fallbackReply(locale);

    return NextResponse.json({ reply, source: "rules" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
