"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useToastStore } from "@/lib/toast-store";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);
  const { t } = useLanguage();

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => {
        const Icon =
          toast.variant === "success" ? CheckCircle2 : toast.variant === "error" ? AlertCircle : Info;
        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto animate-rise-in ledger-card flex items-start gap-3 bg-surface-raised p-4 shadow-lg"
            )}
            role="status"
          >
            <Icon
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0",
                toast.variant === "success" && "text-teal",
                toast.variant === "error" && "text-clay",
                (!toast.variant || toast.variant === "default") && "text-gold"
              )}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-ink">{toast.title}</p>
              {toast.description && (
                <p className="mt-0.5 text-xs text-ink-soft">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-ink-soft/60 hover:text-ink focus-ring rounded"
              aria-label={t("a11y.dismissNotification")}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
