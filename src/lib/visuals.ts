import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Building2,
  Flame,
  Landmark,
  Newspaper,
  Ruler,
  Wrench,
} from "lucide-react";

import type { NewsArticle } from "@/types";

/** Project type → icon + subtle gradient (light/dark friendly via CSS vars) */
export function getProjectVisual(type: string): { Icon: LucideIcon; gradient: string } {
  const map: Record<string, { Icon: LucideIcon; gradient: string }> = {
    restauratie: {
      Icon: Landmark,
      gradient: "from-neutral-500/15 via-neutral-400/10 to-transparent",
    },
    nieuwbouw: {
      Icon: Building2,
      gradient: "from-neutral-600/15 via-neutral-500/10 to-transparent",
    },
    renovatie: {
      Icon: Building2,
      gradient: "from-neutral-500/15 via-neutral-400/10 to-transparent",
    },
    isolatie: {
      Icon: Flame,
      gradient: "from-neutral-500/15 via-neutral-400/10 to-transparent",
    },
  };
  return (
    map[type] ?? {
      Icon: Building2,
      gradient: "from-neutral-500/15 via-neutral-400/10 to-transparent",
    }
  );
}

const SERVICE_SLUG_TO_ICON: Record<string, LucideIcon> = {
  metselwerk: Blocks,
  gevelrenovatie: Building2,
  "monumentale-restauratie": Landmark,
  isolatie: Flame,
  steigerbouw: Wrench,
};

export function getServiceVisual(slug: string): { Icon: LucideIcon; gradient: string } {
  return {
    Icon: SERVICE_SLUG_TO_ICON[slug] ?? Blocks,
    gradient: "from-neutral-500/12 via-neutral-400/8 to-transparent",
  };
}

const NEWS_CATEGORY_ICON: Record<NewsArticle["category"], LucideIcon> = {
  company: Newspaper,
  project: Building2,
  industry: Ruler,
};

export function getNewsVisual(category: NewsArticle["category"]): { Icon: LucideIcon; gradient: string } {
  return {
    Icon: NEWS_CATEGORY_ICON[category] ?? Newspaper,
    gradient: "from-neutral-500/12 via-neutral-400/8 to-transparent",
  };
}
