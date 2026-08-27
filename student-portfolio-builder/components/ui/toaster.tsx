"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useToastStore } from "@/lib/toast-store";
import { cn } from "@/lib/utils";

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((t) => {
        const Icon =
          t.variant === "success" ? CheckCircle2 : t.variant === "error" ? AlertCircle : Info;
        return (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto animate-rise-in ledger-card flex items-start gap-3 bg-surface-raised p-4 shadow-lg"
            )}
            role="status"
          >
            <Icon
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                t.variant === "success" && "text-teal",
                t.variant === "error" && "text-clay",
                (!t.variant || t.variant === "default") && "text-gold"
              )}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-ink">{t.title}</p>
              {t.description && (
                <p className="mt-0.5 text-xs text-ink-soft">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="text-ink-soft/60 hover:text-ink focus-ring rounded"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
