"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { calculateEstimate, type Condition } from "@/data/calculator";
import { services } from "@/data/services";
import { cn, formatPrice } from "@/lib/utils";
import type { ServiceSlug } from "@/lib/constants";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Step = 1 | 2 | 3;

interface FormState {
  service: ServiceSlug | "";
  surface: string;
  floors: string;
  condition: Condition;
  name: string;
  email: string;
  phone: string;
}

const SERVICE_LABELS: Record<ServiceSlug, { nl: string; en: string }> = {
  metselwerk: { nl: "Metselwerk", en: "Brickwork" },
  gevelrenovatie: { nl: "Gevelrenovatie", en: "Facade renovation" },
  "monumentale-restauratie": { nl: "Monumentale restauratie", en: "Monument restoration" },
  isolatie: { nl: "Isolatie", en: "Insulation" },
  steigerbouw: { nl: "Steigerbouw", en: "Scaffolding" },
};

const CONDITION_OPTIONS: Condition[] = ["good", "fair", "poor"];

const INITIAL: FormState = {
  service: "",
  surface: "",
  floors: "1",
  condition: "good",
  name: "",
  email: "",
  phone: "",
};

interface CalculatorProps {
  locale: string;
}

export function Calculator({ locale }: CalculatorProps) {
  const t = useTranslations("calculator");
  const tc = useTranslations("contact");
  const isNl = locale === "nl";
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const estimate =
    form.service && form.surface && Number(form.surface) > 0
      ? calculateEstimate(
          form.service as ServiceSlug,
          Number(form.surface),
          Number(form.floors) || 1,
          form.condition,
        )
      : null;

  const canProceed = {
    1: !!form.service,
    2: !!form.surface && Number(form.surface) > 0,
    3: !!form.name && !!form.email,
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, estimate }),
      });
      setSubmitted(true);
    } catch {
      // Silently handle; form still marks as submitted
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
        </div>
        <h3 className="font-display text-2xl font-bold">{t("success")}</h3>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      {/* Step indicators */}
      <div className="flex border-b border-[var(--color-border)]">
        {([1, 2, 3] as Step[]).map((s) => (
          <button
            key={s}
            onClick={() => s < step && setStep(s)}
            disabled={s > step}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 py-4 text-sm font-medium transition-colors",
              step === s
                ? "bg-[var(--color-accent-muted)] text-[var(--color-accent)]"
                : s < step
                  ? "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
                  : "text-[var(--color-text-muted)] cursor-not-allowed",
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                step === s
                  ? "bg-[var(--color-accent)] text-[var(--color-background)]"
                  : s < step
                    ? "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"
                    : "bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]",
              )}
            >
              {s}
            </span>
            <span className="hidden sm:inline">
              {s === 1 ? t("step1_title") : s === 2 ? t("step2_title") : t("step3_title")}
            </span>
          </button>
        ))}
      </div>

      <div className="p-6 sm:p-8">
        {/* Step 1: Service selection */}
        {step === 1 && (
          <div className="space-y-3">
            <h3 className="font-display mb-4 text-xl font-bold">{t("step1_title")}</h3>
            {services.map((s) => (
              <button
                key={s.slug}
                onClick={() => setForm((f) => ({ ...f, service: s.slug as ServiceSlug }))}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all duration-200",
                  form.service === s.slug
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-muted)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-surface-hover)]",
                )}
              >
                <span className="font-medium">
                  {isNl ? SERVICE_LABELS[s.slug as ServiceSlug].nl : SERVICE_LABELS[s.slug as ServiceSlug].en}
                </span>
                {form.service === s.slug && (
                  <CheckCircle2 className="h-5 w-5 text-[var(--color-accent)]" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Project details */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="font-display mb-4 text-xl font-bold">{t("step2_title")}</h3>

            <Input
              label={t("surface_label")}
              type="number"
              min="1"
              value={form.surface}
              onChange={(e) => setForm((f) => ({ ...f, surface: e.target.value }))}
              placeholder={t("surface_placeholder")}
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]">
                {t("floors_label")}
              </label>
              <select
                value={form.floors}
                onChange={(e) => setForm((f) => ({ ...f, floors: e.target.value }))}
                className="h-11 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-[var(--color-text-primary)]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]">
                {t("condition_label")}
              </label>
              <div className="flex gap-2">
                {CONDITION_OPTIONS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setForm((f) => ({ ...f, condition: c }))}
                    className={cn(
                      "flex-1 rounded-lg border py-2.5 text-sm font-medium transition-all duration-200",
                      form.condition === c
                        ? "border-[var(--color-accent)] bg-[var(--color-accent-muted)] text-[var(--color-accent)]"
                        : "border-[var(--color-border)] hover:border-[var(--color-accent)]/40",
                    )}
                  >
                    {c === "good" ? t("condition_good") : c === "fair" ? t("condition_fair") : t("condition_poor")}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimate preview */}
            {estimate && (
              <div className="rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-muted)] p-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[var(--color-accent)]">
                  {t("estimated_price")}
                </p>
                <p className="font-display text-3xl font-black text-[var(--color-accent)]">
                  {formatPrice(estimate.min)} – {formatPrice(estimate.max)}
                </p>
                <p className="mt-2 text-xs text-[var(--color-text-muted)]">{t("price_disclaimer")}</p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Contact details */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-display mb-4 text-xl font-bold">{t("step3_title")}</h3>

            {estimate && (
              <div className="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4">
                <p className="text-xs text-[var(--color-text-muted)]">{t("estimated_price")}</p>
                <p className="font-display text-2xl font-bold text-[var(--color-accent)]">
                  {formatPrice(estimate.min)} – {formatPrice(estimate.max)}
                </p>
              </div>
            )}

            <Input
              label={tc("name")}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder={tc("name_placeholder")}
              required
            />
            <Input
              label={tc("email")}
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder={tc("email_placeholder")}
              required
            />
            <Input
              label={tc("phone")}
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder={tc("phone_placeholder")}
            />
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              {t("back")}
            </button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <Button
              onClick={() => setStep((s) => (s + 1) as Step)}
              disabled={!canProceed[step]}
              size="md"
            >
              {t("next")}
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              loading={submitting}
              disabled={!canProceed[3]}
              size="md"
            >
              {t("submit")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
