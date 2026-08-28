import { cn } from "@/lib/utils";

const sizes = {
  sm: { v: "text-xl", rest: "text-base" },
  base: { v: "text-2xl", rest: "text-lg" },
  lg: { v: "text-4xl", rest: "text-3xl" },
} as const;

/**
 * The Vitafolio wordmark: a large gold "V" (the initial, doubling as the
 * standalone icon mark elsewhere — see app/icon.svg) immediately followed
 * by "itafolio" in the site's ink color, same baseline. One component so
 * the navbar, homepage, and anywhere else it appears always match.
 */
export function Logo({
  className,
  size = "base",
}: {
  className?: string;
  size?: keyof typeof sizes;
}) {
  const s = sizes[size];
  return (
    <span className={cn("font-display inline-flex items-baseline leading-none", className)}>
      <span className={cn(s.v, "font-bold text-gold")}>V</span>
      <span className={cn(s.rest, "font-semibold text-ink")}>itafolio</span>
    </span>
  );
}
