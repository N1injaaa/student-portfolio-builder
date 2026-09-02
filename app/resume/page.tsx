"use client";

import { useRef, useState } from "react";
import { Download, Loader2, Lock } from "lucide-react";
import { AppNavbar } from "@/components/layout/app-navbar";
import { AuthGate } from "@/components/auth/auth-gate";
import { Button } from "@/components/ui/button";
import { ResumeSettingsPanel } from "@/components/resume/resume-settings-panel";
import { ResumePreview } from "@/components/resume/resume-preview";
import { AtsCheckPanel } from "@/components/resume/ats-check-panel";
import { useProfileStore } from "@/lib/store";
import { exportNodeToPdf } from "@/lib/pdf-export";
import { trackEvent } from "@/lib/track-event";
import { toast } from "@/lib/toast-store";
import { slugify } from "@/lib/utils";
import { UPGRADE_URL } from "@/lib/upgrade";

const FREE_EXPORT_LIMIT = 3;

function ResumeBuilderContent() {
  const profile = useProfileStore((s) => s.profile);
  const userId = useProfileStore((s) => s.userId);
  const isPro = useProfileStore((s) => s.isPro);
  const incrementResumeExportCount = useProfileStore((s) => s.incrementResumeExportCount);
  const previewRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const exportsLeft = Math.max(0, FREE_EXPORT_LIMIT - profile.resumeExportCount);
  const limitReached = !isPro && exportsLeft <= 0;

  async function handleExport() {
    if (!previewRef.current) return;
    if (limitReached) {
      window.open(UPGRADE_URL, "_blank");
      return;
    }
    setExporting(true);
    try {
      const filename = `${slugify(profile.overview.fullName || "resume")}-resume.pdf`;
      await exportNodeToPdf(previewRef.current, filename);
      toast({ title: "Resume exported", description: filename, variant: "success" });
      trackEvent("resume_downloaded", userId);
      if (!isPro) incrementResumeExportCount();
    } catch (err) {
      toast({
        title: "Export failed",
        description: "Please try again.",
        variant: "error",
      });
    } finally {
      setExporting(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Resume builder
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Choose a template, tune the details, and export a print-ready PDF.
          </p>
        </div>
        <div className="text-right">
          <Button onClick={handleExport} disabled={exporting}>
            {exporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : limitReached ? (
              <Lock className="h-4 w-4" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {exporting ? "Preparing PDF…" : limitReached ? "Upgrade to export" : "Export PDF"}
          </Button>
          {!isPro && (
            <p className="mt-1 text-xs text-ink-soft">
              {limitReached
                ? "Free export limit reached"
                : `${exportsLeft} free export${exportsLeft === 1 ? "" : "s"} left`}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">
        <div className="space-y-5">
          <AtsCheckPanel profile={profile} isPro={isPro} />
          <ResumeSettingsPanel />
        </div>

        <div className="min-w-0 overflow-x-auto rounded-lg bg-surface-raised p-4 sm:p-8">
          <ResumePreview ref={previewRef} profile={profile} />
        </div>
      </div>
    </main>
  );
}

export default function ResumeBuilderPage() {
  return (
    <div className="min-h-screen bg-paper">
      <AppNavbar />
      <AuthGate>
        <ResumeBuilderContent />
      </AuthGate>
    </div>
  );
}
