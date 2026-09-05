"use client";

import { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { ResumePreview } from "@/components/resume/resume-preview";
import { Button } from "@/components/ui/button";
import { exportNodeToPdf } from "@/lib/pdf-export";
import { trackEvent } from "@/lib/track-event";
import { toast } from "@/lib/toast-store";
import { slugify } from "@/lib/utils";
import type { Profile } from "@/types/profile";

export function DownloadResumeButton({
  profile,
  ownerId,
  isPro = false,
}: {
  profile: Profile;
  ownerId: string;
  isPro?: boolean;
}) {
  const hiddenResumeRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  async function handleDownload() {
    if (!hiddenResumeRef.current) return;
    setExporting(true);
    try {
      const filename = `${slugify(profile.overview.fullName || "resume")}-resume.pdf`;
      await exportNodeToPdf(hiddenResumeRef.current, filename);
      toast({ title: "Resume downloaded", description: filename, variant: "success" });
      trackEvent("resume_downloaded", ownerId);
    } catch {
      toast({ title: "Download failed", description: "Please try again.", variant: "error" });
    } finally {
      setExporting(false);
    }
  }

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-end gap-2 border-b border-rule bg-paper/95 px-4 py-2.5 backdrop-blur">
        <Button size="sm" onClick={handleDownload} disabled={exporting}>
          {exporting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Download className="h-3.5 w-3.5" />
          )}
          {exporting ? "Preparing…" : "Download Resume"}
        </Button>
      </div>

      <div className="pointer-events-none fixed -left-[9999px] top-0 opacity-0">
        <ResumePreview ref={hiddenResumeRef} profile={profile} isPro={isPro} />
      </div>
    </>
  );
}
