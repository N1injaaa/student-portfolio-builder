"use client";

import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center overflow-hidden rounded-md border border-rule text-xs font-medium">
      <button
        onClick={() => setLang("en")}
        className={cn(
          "focus-ring px-2 py-1.5 transition-colors",
          lang === "en" ? "bg-surface-raised text-ink" : "text-ink-soft hover:text-ink"
        )}
        aria-label="English"
      >
        EN
      </button>
      <button
        onClick={() => setLang("ru")}
        className={cn(
          "focus-ring px-2 py-1.5 transition-colors",
          lang === "ru" ? "bg-surface-raised text-ink" : "text-ink-soft hover:text-ink"
        )}
        aria-label="Русский"
      >
        RU
      </button>
    </div>
  );
}
