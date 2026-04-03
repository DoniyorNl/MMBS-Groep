"use client";

import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations("errors");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display mb-4 text-3xl font-bold">{t("error_title")}</h1>
      <p className="mb-8 max-w-md text-[var(--color-text-secondary)]">
        {t("error_description")}
      </p>
      <Button onClick={reset}>{t("error_button")}</Button>
    </div>
  );
}
