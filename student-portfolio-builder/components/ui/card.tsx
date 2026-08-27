import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("ledger-card p-5", className)} {...props} />;
}

export function Badge({
  className,
  variant = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "gold" | "teal" }) {
  const variants = {
    default: "bg-surface-raised text-ink-soft border-rule",
    gold: "bg-gold-soft text-gold border-transparent",
    teal: "bg-teal/10 text-teal border-transparent",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-raised">
      <div
        className="h-full rounded-full bg-gold transition-all duration-700 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  );
}
