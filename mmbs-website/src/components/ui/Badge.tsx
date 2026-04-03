import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-accent-muted)] text-[var(--color-accent)]",
        outline:
          "border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-transparent",
        surface: "bg-[var(--color-surface)] text-[var(--color-text-secondary)]",
        success: "bg-green-500/10 text-green-400",
        error: "bg-red-500/10 text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
