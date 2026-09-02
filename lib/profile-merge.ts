import {
  emptyProfile,
  defaultResumeSettings,
  defaultPortfolioSettings,
  type Profile,
} from "@/types/profile";

/**
 * A freshly-created row in `profiles` starts with `data = {}`.
 * This fills in any missing top-level sections so the rest of the app
 * never has to defensively check for `undefined`.
 */
export function mergeWithDefaults(partial: Partial<Profile> | null | undefined): Profile {
  const p = partial ?? {};
  return {
    overview: { ...emptyProfile.overview, ...p.overview },
    education: p.education ?? [],
    achievements: p.achievements ?? [],
    projects: p.projects ?? [],
    skills: p.skills ?? [],
    languages: p.languages ?? [],
    certificates: p.certificates ?? [],
    activities: p.activities ?? [],
    resumeSettings: { ...defaultResumeSettings, ...p.resumeSettings },
    portfolioSettings: { ...defaultPortfolioSettings, ...p.portfolioSettings },
    resumeExportCount: p.resumeExportCount ?? 0,
    resumeVersions: p.resumeVersions ?? [],
    activeResumeVersionId: p.activeResumeVersionId ?? null,
  };
}
