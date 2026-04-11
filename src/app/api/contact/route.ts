import { ContactEmail } from "@/emails/ContactEmail";
import { getVacatureById } from "@/data/vacatures";
import { getContactInbox, getResendClient, getResendFrom } from "@/lib/email";
import { render } from "@react-email/components";
import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  vacature?: string;
}

const MAX_CV_BYTES = 4 * 1024 * 1024;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isPdfBuffer(buf: ArrayBuffer): boolean {
  if (buf.byteLength < 4) return false;
  const bytes = new Uint8Array(buf.slice(0, 4));
  return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
}

function sanitizeFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_") || "cv";
  return base.toLowerCase().endsWith(".pdf") ? base : `${base}.pdf`;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const name = String(formData.get("name") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim();
      const phone = String(formData.get("phone") ?? "").trim();
      const message = String(formData.get("message") ?? "").trim();
      const vacature = String(formData.get("vacature") ?? "").trim();
      const cv = formData.get("cv");

      if (!name || !email || !message) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      if (!isValidEmail(email)) {
        return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
      }

      let cvBuffer: Buffer | null = null;
      let cvFilename = "cv.pdf";

      if (vacature) {
        if (!cv || !(cv instanceof File)) {
          return NextResponse.json({ error: "CV required" }, { status: 400 });
        }
        if (cv.size === 0 || cv.size > MAX_CV_BYTES) {
          return NextResponse.json({ error: "Invalid CV file size" }, { status: 400 });
        }
        const mime = (cv.type || "").toLowerCase();
        const fname = cv.name || "";
        if (mime && mime !== "application/pdf") {
          return NextResponse.json({ error: "CV must be PDF" }, { status: 400 });
        }
        if (fname && !fname.toLowerCase().endsWith(".pdf")) {
          return NextResponse.json({ error: "CV must be PDF" }, { status: 400 });
        }
        const ab = await cv.arrayBuffer();
        if (!isPdfBuffer(ab)) {
          return NextResponse.json({ error: "CV must be a valid PDF" }, { status: 400 });
        }
        cvBuffer = Buffer.from(ab);
        cvFilename = sanitizeFilename(fname || `sollicitatie-${vacature}.pdf`);
      } else if (cv instanceof File && cv.size > 0) {
        return NextResponse.json({ error: "Unexpected attachment" }, { status: 400 });
      }

      const v = vacature ? getVacatureById(vacature) : undefined;
      const vacatureTitle = v?.title;
      const vacatureId = vacature || undefined;

      const resend = getResendClient();
      const to = getContactInbox();

      if (!resend) {
        console.warn("[contact] RESEND_API_KEY missing — logging only");
        console.info("[contact]", {
          name,
          email,
          phone: phone || null,
          message,
          vacatureId: vacatureId ?? null,
          vacatureTitle: vacatureTitle ?? null,
          cvAttached: Boolean(cvBuffer),
          cvFilename: cvBuffer ? cvFilename : null,
          receivedAt: new Date().toISOString(),
        });
        return NextResponse.json({ success: true, mode: "log" }, { status: 200 });
      }

      const html = await render(
        ContactEmail({
          name,
          email,
          phone: phone || undefined,
          message,
          vacatureId,
          vacatureTitle,
        }),
      );

      const subject = vacatureId
        ? `Sollicitatie: ${vacatureTitle ?? vacatureId} — ${name}`
        : `Contactformulier: ${name}`;

      const { error } = await resend.emails.send({
        from: getResendFrom(),
        to: [to],
        replyTo: email,
        subject,
        html,
        attachments: cvBuffer
          ? [
              {
                filename: cvFilename,
                content: cvBuffer,
              },
            ]
          : undefined,
      });

      if (error) {
        console.error("[contact] Resend error:", error);
        return NextResponse.json(
          { error: "Could not send email. Please try again later." },
          { status: 502 },
        );
      }

      return NextResponse.json({ success: true }, { status: 200 });
    }

    const body = (await request.json()) as ContactPayload;

    if (body.vacature?.trim()) {
      return NextResponse.json(
        { error: "Vacancy applications require a PDF CV. Please use the form with file upload." },
        { status: 400 },
      );
    }

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
