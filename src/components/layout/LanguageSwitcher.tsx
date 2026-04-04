"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const LOCALES = ["nl", "en"] as const;
type Locale = (typeof LOCALES)[number];

function getLocaleFromUrl(): Locale {
  if (typeof window === "undefined") return "nl";
  const seg = window.location.pathname.split("/")[1];
  return seg === "en" ? "en" : "nl";
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const [active, setActive] = useState<Locale>("nl");

  // Sync with actual URL on mount and on popstate
  useEffect(() => {
    setActive(getLocaleFromUrl());
    const onPop = () => setActive(getLocaleFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const switchTo = (next: Locale) => {
    const current = getLocaleFromUrl(); // always read live URL
    if (next === current) return;

    const parts = window.location.pathname.split("/");
    parts[1] = next;
    window.location.assign(parts.join("/"));
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg border border-[var(--color-border)] p-1",
        className,
      )}
    >
      {LOCALES.map((loc) => (
        <button
          key={loc}
          onClick={() => switchTo(loc)}
          aria-label={`Switch to ${loc.toUpperCase()}`}
          aria-pressed={loc === active}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-widest transition-all duration-150",
            loc === active
              ? "bg-[var(--color-text-primary)] text-[var(--color-background)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
          )}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
