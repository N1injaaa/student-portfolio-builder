"use client";

import { Check, Lock, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { scoreResume } from "@/lib/ats-score";
import { UPGRADE_URL } from "@/lib/upgrade";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types/profile";

function scoreColor(score: number) {
  if (score >= 80) return "text-teal";
  if (score >= 50) return "text-gold";
  return "text-clay";
}

export function AtsCheckPanel({ profile, isPro }: { profile: Profile; isPro: boolean }) {
  const { score, checks } = scoreResume(profile);

  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          ATS compatibility
        </p>
        <span className={cn("font-display text-lg font-semibold", scoreColor(score))}>
          {score}
          <span className="text-xs text-ink-soft">/100</span>
        </span>
      </div>
      <p className="mt-1 text-xs text-ink-soft">
        How likely an applicant-tracking system is to parse your resume cleanly and surface it to
        a recruiter.
      </p>

      <div className="mt-4 space-y-2">
        {checks.map((check, i) => {
          const locked = !isPro && i > 0;
          return (
            <div key={check.id} className="flex items-start gap-2 text-sm">
              {check.passed ? (
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />
              ) : (
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay" />
              )}
              <div className={cn("min-w-0", locked && "blur-sm select-none")}>
                <p className="text-ink">{check.label}</p>
                {!check.passed && <p className="text-xs text-ink-soft">{check.tip}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {!isPro && (
        <a
          href={UPGRADE_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex items-center gap-1.5 rounded-md border border-gold/40 bg-gold-soft px-3 py-2 text-xs font-medium text-ink hover:bg-gold-soft/80"
        >
          <Lock className="h-3 w-3" />
          Unlock the full breakdown with Pro
        </a>
      )}
    </Card>
  );
}
