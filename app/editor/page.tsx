"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { AppNavbar } from "@/components/layout/app-navbar";
import { AuthGate } from "@/components/auth/auth-gate";
import { Button } from "@/components/ui/button";
import { PortfolioView } from "@/components/portfolio/portfolio-view";
import { ResumePreview } from "@/components/resume/resume-preview";
import { EditorSidebar, type EditorSection } from "@/components/forms/editor-sidebar";
import { OverviewForm } from "@/components/forms/overview-form";
import { EducationForm } from "@/components/forms/education-form";
import { ProjectsForm } from "@/components/forms/projects-form";
import { AchievementsForm } from "@/components/forms/achievements-form";
import { SkillsForm } from "@/components/forms/skills-form";
import { LanguagesForm } from "@/components/forms/languages-form";
import { CertificatesForm } from "@/components/forms/certificates-form";
import { ActivitiesForm } from "@/components/forms/activities-form";
import { useProfileStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

const validSections: EditorSection[] = [
  "overview",
  "education",
  "projects",
  "achievements",
  "skills",
  "languages",
  "certificates",
  "activities",
];

type PreviewMode = "portfolio" | "resume";

function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requested = searchParams.get("section") as EditorSection | null;
  const [section, setSection] = useState<EditorSection>(
    requested && validSections.includes(requested) ? requested : "overview"
  );
  const [showPreview, setShowPreview] = useState(true);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("portfolio");
  const profile = useProfileStore((s) => s.profile);
  const isPro = useProfileStore((s) => s.isPro);
  const { t } = useLanguage();

  useEffect(() => {
    if (requested && validSections.includes(requested) && requested !== section) {
      setSection(requested);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requested]);

  function selectSection(next: EditorSection) {
    setSection(next);
    router.replace(`/editor?section=${next}`, { scroll: false });
  }

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {t("editor.title")}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            {t("editor.subtitle")}
          </p>
        </div>
        {/* Always rendered (not just on mobile) — this used to only show
            below the xl breakpoint, so on wide screens there was no way
            to bring the preview back once the inline hide button inside
            the panel was clicked. */}
        <Button variant="outline" size="sm" onClick={() => setShowPreview((v) => !v)}>
          {showPreview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {showPreview ? t("editor.hidePreview") : t("editor.showPreview")}
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-8 xl:flex-row">
        <div className="flex flex-1 flex-col gap-8 lg:flex-row">
          <EditorSidebar active={section} onSelect={selectSection} />
          <div className="min-w-0 flex-1">
            {section === "overview" && <OverviewForm />}
            {section === "education" && <EducationForm />}
            {section === "projects" && <ProjectsForm />}
            {section === "achievements" && <AchievementsForm />}
            {section === "skills" && <SkillsForm />}
            {section === "languages" && <LanguagesForm />}
            {section === "certificates" && <CertificatesForm />}
            {section === "activities" && <ActivitiesForm />}
          </div>
        </div>

        {showPreview && (
          <div className="min-w-0 xl:w-[420px] xl:shrink-0">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                {t("editor.livePreview")}
              </span>
              <button
                onClick={() => setShowPreview(false)}
                className="focus-ring rounded p-1 text-ink-soft hover:text-ink"
                aria-label={t("editor.hidePreview")}
              >
                <EyeOff className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mb-3 grid grid-cols-2 gap-1 rounded-md border border-rule bg-surface-raised p-1">
              <button
                onClick={() => setPreviewMode("portfolio")}
                className={cn(
                  "focus-ring rounded px-3 py-1.5 text-xs font-medium transition-colors",
                  previewMode === "portfolio"
                    ? "bg-surface text-ink shadow-sm"
                    : "text-ink-soft hover:text-ink"
                )}
              >
                {t("editor.previewPortfolio")}
              </button>
              <button
                onClick={() => setPreviewMode("resume")}
                className={cn(
                  "focus-ring rounded px-3 py-1.5 text-xs font-medium transition-colors",
                  previewMode === "resume"
                    ? "bg-surface text-ink shadow-sm"
                    : "text-ink-soft hover:text-ink"
                )}
              >
                {t("editor.previewResume")}
              </button>
            </div>

            <div className="sticky top-6 min-w-0 overflow-hidden rounded-lg border border-rule">
              <div className="border-b border-rule bg-surface-raised px-4 py-2 text-xs text-ink-soft">
                {t("editor.livePreviewHint")}
              </div>
              <div className="max-h-[calc(100vh-160px)] overflow-y-auto bg-[#f4f4f4]">
                <div
                  style={{
                    transform: "scale(0.72)",
                    transformOrigin: "top left",
                    width: "138.9%",
                  }}
                >
                  {previewMode === "portfolio" ? (
                    <PortfolioView profile={profile} isPro={isPro} />
                  ) : (
                    <div className="py-4">
                      <ResumePreview profile={profile} isPro={isPro} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-paper">
      <AppNavbar />
      <AuthGate>
        <Suspense
          fallback={
            <div className="mx-auto max-w-6xl px-4 py-16 text-sm text-ink-soft sm:px-6">
              Loading…
            </div>
          }
        >
          <EditorContent />
        </Suspense>
      </AuthGate>
    </div>
  );
}

