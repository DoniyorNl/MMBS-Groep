import { QuoteEmail } from "@/emails/QuoteEmail";
import { getContactInbox, getResendClient, getResendFrom } from "@/lib/email";
import { render } from "@react-email/components";
import { NextResponse } from "next/server";

interface QuotePayload {
  service: string;
  surface: string;
  floors: string;
  condition: string;
  name: string;
  email: string;
  phone?: string;
  estimate?: { min: number; max: number; base: number };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuotePayload;

    if (!body.name?.trim() || !body.email?.trim() || !body.service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const resend = getResendClient();
    const to = getContactInbox();

    if (!resend) {
      console.warn("[quote] RESEND_API_KEY missing — logging only");
      console.info("[quote]", {
        service: body.service,
        surface: body.surface,
        floors: body.floors,
        condition: body.condition,
        name: body.name,
        email: body.email,
        phone: body.phone ?? null,
        estimate: body.estimate ?? null,
        receivedAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, mode: "log" }, { status: 200 });
    }

    const html = await render(
      QuoteEmail({
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone?.trim(),
        service: body.service,
        surface: body.surface ?? "",
        floors: body.floors ?? "",
        condition: body.condition ?? "",
        estimateMin: body.estimate?.min,
        estimateMax: body.estimate?.max,
      }),
    );

    const { error } = await resend.emails.send({
      from: getResendFrom(),
      to: [to],
      replyTo: body.email.trim(),
      subject: `Offerteaanvraag: ${body.name.trim()} (${body.service})`,
      html,
    });

    if (error) {
      console.error("[quote] Resend error:", error);
      return NextResponse.json(
        { error: "Could not send email. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
