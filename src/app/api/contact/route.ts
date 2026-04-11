import { ContactEmail } from "@/emails/ContactEmail";
import { getContactInbox, getResendClient, getResendFrom } from "@/lib/email";
import { render } from "@react-email/components";
import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const resend = getResendClient();
    const to = getContactInbox();

    if (!resend) {
      console.warn("[contact] RESEND_API_KEY missing — logging only");
      console.info("[contact]", {
        name: body.name,
        email: body.email,
        phone: body.phone ?? null,
        message: body.message,
        receivedAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, mode: "log" }, { status: 200 });
    }

    const html = await render(
      ContactEmail({
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone?.trim(),
        message: body.message.trim(),
      }),
    );

    const { error } = await resend.emails.send({
      from: getResendFrom(),
      to: [to],
      replyTo: body.email.trim(),
      subject: `Contactformulier: ${body.name.trim()}`,
      html,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
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
