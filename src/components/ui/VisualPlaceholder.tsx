import { cn } from "@/lib/utils";
import { getNewsVisual, getProjectVisual, getServiceVisual } from "@/lib/visuals";
import type { NewsArticle } from "@/types";
import type { Project } from "@/types";

interface BaseProps {
  className?: string;
  iconClassName?: string;
}

export function ProjectVisualPlaceholder({
  type,
  className,
  iconClassName,
}: BaseProps & { type: Project["type"] }) {
  const { Icon, gradient } = getProjectVisual(type);
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br",
        gradient,
        "bg-[var(--color-surface-hover)]",
        className,
      )}
      aria-hidden
    >
      <Icon
        className={cn(
          "h-[28%] w-[28%] min-h-12 min-w-12 max-h-28 max-w-28 text-[var(--color-text-muted)] opacity-80",
          iconClassName,
        )}
        strokeWidth={1.25}
      />
    </div>
  );
}

export function ServiceVisualPlaceholder({
  slug,
  className,
  iconClassName,
}: BaseProps & { slug: string }) {
  const { Icon, gradient } = getServiceVisual(slug);
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br",
        gradient,
        "bg-[var(--color-surface-hover)]",
        className,
      )}
      aria-hidden
    >
      <Icon
        className={cn(
          "h-[32%] w-[32%] min-h-14 min-w-14 max-h-32 max-w-32 text-[var(--color-text-muted)] opacity-80",
          iconClassName,
        )}
        strokeWidth={1.25}
      />
    </div>
  );
}

export function NewsVisualPlaceholder({
  category,
  className,
  iconClassName,
}: BaseProps & { category: NewsArticle["category"] }) {
  const { Icon, gradient } = getNewsVisual(category);
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br",
        gradient,
        "bg-[var(--color-surface-hover)]",
        className,
      )}
      aria-hidden
    >
      <Icon
        className={cn(
          "h-[28%] w-[28%] min-h-12 min-w-12 max-h-24 max-w-24 text-[var(--color-text-muted)] opacity-80",
          iconClassName,
        )}
        strokeWidth={1.25}
      />
    </div>
  );
}
