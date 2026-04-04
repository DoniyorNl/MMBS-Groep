"use client";

import { Button } from "@/components/ui/Button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Locale-scoped error boundary — "use client" is required by Next.js.
 * Renders inside [locale]/layout.tsx, so Header/Footer are present.
 */
export default function LocaleError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to error tracking service in production
    console.error("[LocaleError]", error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-32">
      <div className="mx-auto max-w-lg text-center">
        {/* Decorative icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--color-error)]/20 bg-[var(--color-error)]/5">
            <AlertTriangle className="h-8 w-8 text-[var(--color-error)]" />
          </div>
        </div>

        <h1 className="font-display mb-4 text-3xl font-black tracking-tight sm:text-4xl">
          Er is iets misgegaan
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-[var(--color-text-secondary)]">
          Er is een onverwachte fout opgetreden. Probeer de pagina te vernieuwen.
        </p>

        {process.env.NODE_ENV === "development" && error.message && (
          <pre className="mb-6 overflow-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left text-xs text-[var(--color-error)]">
            {error.message}
          </pre>
        )}

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" onClick={reset}>
            <RefreshCw className="h-4 w-4" />
            Probeer opnieuw
          </Button>
          <Button variant="secondary" size="lg" onClick={() => (window.location.href = "/nl")}>
            Terug naar home
          </Button>
        </div>
      </div>
    </section>
  );
}
