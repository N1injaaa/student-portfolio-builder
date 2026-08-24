"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppNavbar } from "@/components/layout/app-navbar";
import { AuthGate } from "@/components/auth/auth-gate";
import { EditorSidebar, type EditorSection } from "@/components/forms/editor-sidebar";
import { OverviewForm } from "@/components/forms/overview-form";
import { EducationForm } from "@/components/forms/education-form";
import { ProjectsForm } from "@/components/forms/projects-form";
import { AchievementsForm } from "@/components/forms/achievements-form";
import { SkillsForm } from "@/components/forms/skills-form";
import { LanguagesForm } from "@/components/forms/languages-form";
import { CertificatesForm } from "@/components/forms/certificates-form";
import { ActivitiesForm } from "@/components/forms/activities-form";

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

function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requested = searchParams.get("section") as EditorSection | null;
  const [section, setSection] = useState<EditorSection>(
    requested && validSections.includes(requested) ? requested : "overview"
  );

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
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
        Profile editor
      </h1>
      <p className="mt-1 text-sm text-ink-soft">
        Build the record your resume and portfolio pull from.
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
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
