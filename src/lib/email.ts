import { Resend } from "resend";

export function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

/** Verified sender in Resend (default: Resend test domain). */
export function getResendFrom(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() || "MMBS Groep <onboarding@resend.dev>"
  );
}

/** Inbox for contact & quote notifications. */
export function getContactInbox(): string {
  return process.env.CONTACT_EMAIL?.trim() || "info@mmbs.nl";
}
