"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "mmbs-cookie-consent";

type ConsentState = "accepted" | "declined" | null;

export function CookieBanner({ locale }: { locale: string }) {
  const t = useTranslations("cookie");
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState;
    if (!stored) {
      // Small delay so it doesn't flash immediately on load
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
    setConsent(stored);
  }, []);

  const handleConsent = (value: "accepted" | "declined") => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    setVisible(false);
  };

  if (consent !== null) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          className={cn(
            "fixed bottom-6 left-4 right-4 z-[60] mx-auto max-w-2xl",
            "rounded-2xl border border-[var(--color-border)]",
            "bg-[var(--color-background)]/95 backdrop-blur-md",
            "p-5 shadow-2xl shadow-black/10",
            "sm:left-6 sm:right-auto sm:max-w-md",
          )}
        >
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <p className="mb-1 text-sm font-semibold text-[var(--color-text-primary)]">
                {t("title")}
              </p>
              <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {t("description")}{" "}
                <Link
                  href={`/${locale}/privacybeleid`}
                  className="underline underline-offset-2 hover:text-[var(--color-text-primary)]"
                >
                  {t("learn_more")}
                </Link>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleConsent("accepted")}
              className={cn(
                "flex-1 rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-150",
                "bg-[var(--color-text-primary)] text-[var(--color-background)]",
                "hover:opacity-90 active:scale-[0.98]",
              )}
            >
              {t("accept")}
            </button>
            <button
              onClick={() => handleConsent("declined")}
              className={cn(
                "flex-1 rounded-lg border border-[var(--color-border)] px-4 py-2 text-xs font-semibold transition-all duration-150",
                "text-[var(--color-text-secondary)]",
                "hover:border-[var(--color-text-primary)]/20 hover:text-[var(--color-text-primary)]",
              )}
            >
              {t("decline")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
