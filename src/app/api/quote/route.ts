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

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
