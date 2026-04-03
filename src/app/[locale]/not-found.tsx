import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("errors");

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display mb-4 text-8xl font-black text-[var(--color-accent)] opacity-20">
        404
      </p>
      <h1 className="font-display mb-4 text-3xl font-bold">{t("not_found_title")}</h1>
      <p className="mb-8 max-w-md text-[var(--color-text-secondary)]">
        {t("not_found_description")}
      </p>
      <Button asChild>
        <Link href="/">{t("not_found_button")}</Link>
      </Button>
    </div>
  );
}
