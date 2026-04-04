"use client";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export function MobileMenu({ isOpen, onClose, locale }: MobileMenuProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 flex flex-col bg-[var(--color-background)]"
        >
          <div className="flex flex-col gap-2 px-6 pt-28 pb-10">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
              >
                <Link
                  href={`/${locale}${item.href}`}
                  className="block py-4 text-3xl font-bold tracking-tight text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {t(item.key)}
                </Link>
                <div className="h-px bg-[var(--color-border)]" />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="mt-8 flex flex-col gap-4"
            >
              <Button asChild size="lg" className="w-full">
                <Link href={`/${locale}/offerte`}>{t("offerte")}</Link>
              </Button>

              <div className="flex items-center justify-between">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-sm text-[var(--color-text-secondary)]"
                >
                  {SITE_CONFIG.phoneFormatted}
                </a>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
