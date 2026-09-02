"use client";

import { useEffect, useState } from "react";
import { Eye, Lock, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useProfileStore } from "@/lib/store";
import { UPGRADE_URL } from "@/lib/upgrade";

interface Stats {
  view_count: number;
  download_count: number;
}

export function PortfolioAnalyticsCard() {
  const isPro = useProfileStore((s) => s.isPro);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!isPro) return;
    let cancelled = false;
    const supabase = createClient();
    supabase.rpc("get_my_portfolio_stats").then(({ data, error }) => {
      if (cancelled || error || !data) return;
      const row = Array.isArray(data) ? data[0] : data;
      if (row) setStats(row as Stats);
    });
    return () => {
      cancelled = true;
    };
  }, [isPro]);

  return (
    <Card>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
        Portfolio analytics
      </p>

      {isPro ? (
        <div className="flex gap-6">
          <div>
            <span className="flex items-center gap-1.5 font-display text-2xl font-semibold text-ink">
              <Eye className="h-4 w-4 text-ink-soft" />
              {stats ? stats.view_count : "—"}
            </span>
            <p className="text-xs text-ink-soft">Page views</p>
          </div>
          <div>
            <span className="flex items-center gap-1.5 font-display text-2xl font-semibold text-ink">
              <Download className="h-4 w-4 text-ink-soft" />
              {stats ? stats.download_count : "—"}
            </span>
            <p className="text-xs text-ink-soft">Resume downloads</p>
          </div>
        </div>
      ) : (
        <div>
          <p className="flex items-center gap-1.5 text-xs text-ink-soft">
            <Lock className="h-3 w-3" />
            See how many people viewed your portfolio and downloaded your resume.
          </p>
          <a
            href={UPGRADE_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-xs font-medium text-gold underline underline-offset-2"
          >
            Upgrade to see your stats
          </a>
        </div>
      )}
    </Card>
  );
}
