"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CheckCircle2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormState = "idle" | "loading" | "success" | "error";

const INITIAL: ContactFormData = { name: "", email: "", phone: "", message: "" };

export function ContactForm() {
  const t = useTranslations("contact");
  const [form, setForm] = useState<ContactFormData>(INITIAL);
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setState("success");
      setForm(INITIAL);
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
        </div>
        <h3 className="font-display text-2xl font-bold">{t("success")}</h3>
        <button
          onClick={() => setState("idle")}
          className="text-sm text-[var(--color-text-secondary)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline transition-colors"
        >
          Nieuw bericht sturen
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8"
    >
      <h2 className="font-display mb-6 text-2xl font-bold">{t("form_title")}</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]">
              {t("name")} <span className="text-[var(--color-accent)]">*</span>
            </label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("name_placeholder")}
              required
              disabled={state === "loading"}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]">
              {t("email")} <span className="text-[var(--color-accent)]">*</span>
            </label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("email_placeholder")}
              required
              disabled={state === "loading"}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]">
            {t("phone")}
          </label>
          <Input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder={t("phone_placeholder")}
            disabled={state === "loading"}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]">
            {t("message")} <span className="text-[var(--color-accent)]">*</span>
          </label>
          <Textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={t("message_placeholder")}
            rows={5}
            required
            disabled={state === "loading"}
          />
        </div>

        {state === "error" && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            {t("error")}
          </p>
        )}

        <Button
          type="submit"
          loading={state === "loading"}
          className="w-full"
          size="lg"
        >
          {state === "loading" ? t("sending") : t("send")}
          {state !== "loading" && <Send className="h-4 w-4" />}
        </Button>
      </div>
    </form>
  );
}
