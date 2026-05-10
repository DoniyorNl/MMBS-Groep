import Groq from "groq-sdk"
import { NextResponse } from "next/server"
import rules from "@/data/rules.json"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

const SYSTEM_CONTEXT = `
You are a helpful AI assistant for ${rules.company.name}, a construction and facade renovation company in the Netherlands.

Company info:
- Phone: ${rules.company.phone}
- Email: ${rules.company.email}
- Working hours: ${rules.company.working_hours}
- Locations: ${rules.company.locations.join(", ")}

Services:
${rules.services.map((s) => `- ${s.name}: ${s.description}`).join("\n")}

FAQ:
${rules.faq.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")}

Rules:
- Answer in the same language the user writes in (Dutch or English)
- For company/service questions: use ONLY the info above
- For general questions (coding, math, writing, etc.): answer helpfully as a general AI
- Keep answers concise and friendly
- Never invent prices or guarantees
- If unsure, refer to ${rules.company.phone} or ${rules.company.email}
`.trim()

export async function POST(request: Request) {
  try {
    const { messages = [] } = await request.json()

    if (!messages.length) {
      return NextResponse.json({ error: "No messages" }, { status: 400 })
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      console.error("[chat] GROQ_API_KEY missing")
      return NextResponse.json({ error: "API key missing" }, { status: 500 })
    }

    // ✅ Client request vaqtida yaratiladi — build da emas
    const client = new Groq({ apiKey })

    const chatMessages = messages.map((m: ChatMessage) => ({
      role: m.role,
      content: m.content,
    }))

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_CONTEXT },
        ...chatMessages,
      ],
      max_tokens: 512,
    })

    const reply = completion.choices[0]?.message?.content?.trim()
    return NextResponse.json({ reply: reply ?? "...", source: "groq" })

  } catch (err) {
    console.error("[chat] Groq error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}