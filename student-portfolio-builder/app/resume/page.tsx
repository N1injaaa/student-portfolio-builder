"use client";

import { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { AppNavbar } from "@/components/layout/app-navbar";
import { AuthGate } from "@/components/auth/auth-gate";
import { Button } from "@/components/ui/button";
import { ResumeSettingsPanel } from "@/components/resume/resume-settings-panel";
import { ResumePreview } from "@/components/resume/resume-preview";
import { useProfileStore } from "@/lib/store";
import { exportNodeToPdf } from "@/lib/pdf-export";
import { trackEvent } from "@/lib/track-event";
import { toast } from "@/lib/toast-store";
import { slugify } from "@/lib/utils";

function ResumeBuilderContent() {
  const profile = useProfileStore((s) => s.profile);
  const userId = useProfileStore((s) => s.userId);
  const previewRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    if (!previewRef.current) return;
    setExporting(true);
    try {
      const filename = `${slugify(profile.overview.fullName || "resume")}-resume.pdf`;
      await exportNodeToPdf(previewRef.current, filename);
      toast({ title: "Resume exported", description: filename, variant: "success" });
      trackEvent("resume_downloaded", userId);
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
        <Button onClick={handleExport} disabled={exporting}>
          {exporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {exporting ? "Preparing PDF…" : "Export PDF"}
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">
        <ResumeSettingsPanel />

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
