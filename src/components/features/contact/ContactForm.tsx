"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { getVacatureById } from "@/data/vacatures";
import { CheckCircle2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormState = "idle" | "loading" | "success" | "error";

const INITIAL: ContactFormData = { name: "", email: "", phone: "", message: "" };

const MAX_CV_BYTES = 4 * 1024 * 1024;

function ContactFormFields() {
  const t = useTranslations("contact");
  const searchParams = useSearchParams();
  const vacatureId = searchParams.get("vacature")?.trim() ?? "";
  const isVacatureApplication = Boolean(vacatureId);
  const vacature = isVacatureApplication ? getVacatureById(vacatureId) : undefined;

  const [form, setForm] = useState<ContactFormData>(INITIAL);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [state, setState] = useState<FormState>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateAndSetCv = (file: File | null) => {
    setCvError(null);
    if (!file) {
      setCvFile(null);
      return;
    }
    if (file.size > MAX_CV_BYTES) {
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setCvError(t("cv_too_large"));
      return;
    }
    const lower = file.name.toLowerCase();
    const okMime = !file.type || file.type === "application/pdf";
    if (!lower.endsWith(".pdf") || !okMime) {
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setCvError(t("cv_invalid"));
      return;
    }
    setCvFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCvError(null);

    if (isVacatureApplication) {
      if (!cvFile) {
        setCvError(t("cv_required"));
        return;
      }
    }

    setState("loading");

    try {
      if (isVacatureApplication && cvFile) {
        const fd = new FormData();
        fd.set("name", form.name);
        fd.set("email", form.email);
        fd.set("phone", form.phone);
        fd.set("message", form.message);
        fd.set("vacature", vacatureId);
        fd.set("cv", cvFile);

        const res = await fetch("/api/contact", {
          method: "POST",
          body: fd,
        });

        if (!res.ok) throw new Error();
      } else {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (!res.ok) throw new Error();
      }

      setState("success");
      setForm(INITIAL);
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
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
          type="button"
          onClick={() => setState("idle")}
          className="text-sm text-[var(--color-text-secondary)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline transition-colors"
        >
          {t("send_another")}
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

      {isVacatureApplication && (
        <p className="mb-6 rounded-xl border border-[var(--color-accent)]/25 bg-[var(--color-accent-muted)] px-4 py-3 text-sm text-[var(--color-text-primary)]">
          <span className="font-medium text-[var(--color-accent)]">{t("applying_for")}:</span>{" "}
          {vacature?.title ?? vacatureId}
        </p>
      )}

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

        {isVacatureApplication && (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]">
              {t("cv_label")} <span className="text-[var(--color-accent)]">*</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              disabled={state === "loading"}
              onChange={(e) => validateAndSetCv(e.target.files?.[0] ?? null)}
              className="block w-full cursor-pointer rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[var(--color-accent-muted)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[var(--color-accent)]"
            />
            <p className="mt-1.5 text-xs text-[var(--color-text-muted)]">{t("cv_hint")}</p>
            {cvError && <p className="mt-2 text-sm text-red-400">{cvError}</p>}
          </div>
        )}

        {state === "error" && (
          <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            {t("error")}
          </p>
        )}

        <Button
          type="submit"
          loading={state === "loading"}
          disabled={state === "loading" || (isVacatureApplication && !cvFile)}
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

function ContactFormFallback() {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 rounded bg-[var(--color-border)]" />
        <div className="h-11 rounded-lg bg-[var(--color-border)]" />
        <div className="h-11 rounded-lg bg-[var(--color-border)]" />
        <div className="h-28 rounded-lg bg-[var(--color-border)]" />
      </div>
    </div>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<ContactFormFallback />}>
      <ContactFormFields />
    </Suspense>
  );
}
