"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
}

const variants: Record<string, string> = {
  primary:
    "bg-ink text-paper hover:opacity-90 dark:bg-gold dark:text-ink border border-transparent",
  secondary:
    "bg-gold-soft text-ink hover:bg-gold/30 border border-transparent",
  outline: "border border-rule text-ink hover:bg-surface-raised bg-transparent",
  ghost: "text-ink hover:bg-surface-raised border border-transparent",
  danger: "bg-clay text-paper hover:opacity-90 border border-transparent",
};

const sizes: Record<string, string> = {
  sm: "text-sm px-3 py-1.5 rounded-md",
  md: "text-sm px-4 py-2.5 rounded-md",
  lg: "text-base px-6 py-3 rounded-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 focus-ring disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
