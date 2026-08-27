"use client";

import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * A track/knob toggle built with flexbox alignment instead of absolute
 * positioning + translate math. The knob is a fixed-size child inside a
 * padded flex container that simply switches justify-content between
 * flex-start and flex-end — so the knob can never end up outside the
 * track, regardless of font-size scaling, zoom, or box-sizing quirks.
 */
export function Switch({ checked, onChange, label, disabled, className }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "focus-ring inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-150",
        checked ? "bg-teal justify-end" : "bg-rule justify-start",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="block h-5 w-5 shrink-0 rounded-full bg-white shadow-sm transition-transform duration-150"
      />
    </button>
  );
}
