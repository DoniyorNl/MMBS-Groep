import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  locale: string;
  className?: string;
}

export function Breadcrumbs({ items, locale, className }: BreadcrumbsProps) {
  const all: BreadcrumbItem[] = [{ label: "Home", href: `/${locale}` }, ...items];

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1 text-xs text-[var(--color-text-muted)]", className)}
    >
      <ol className="flex flex-wrap items-center gap-1" itemScope itemType="https://schema.org/BreadcrumbList">
        {all.map((item, i) => {
          const isLast = i === all.length - 1;
          return (
            <li
              key={i}
              className="flex items-center gap-1"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {i === 0 ? (
                <Link
                  href={item.href!}
                  itemProp="item"
                  className="flex items-center gap-1 transition-colors hover:text-[var(--color-text-primary)]"
                  aria-label="Home"
                >
                  <Home className="h-3 w-3" />
                  <meta itemProp="name" content={item.label} />
                </Link>
              ) : isLast ? (
                <span
                  itemProp="name"
                  aria-current="page"
                  className="max-w-[200px] truncate font-medium text-[var(--color-text-secondary)]"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href!}
                  itemProp="item"
                  className="transition-colors hover:text-[var(--color-text-primary)]"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              {!isLast && (
                <ChevronRight className="h-3 w-3 text-[var(--color-border)]" aria-hidden="true" />
              )}
              <meta itemProp="position" content={String(i + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
