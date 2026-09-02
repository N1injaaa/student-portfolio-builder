import type { Profile } from "@/types/profile";

export interface AtsCheck {
  id: string;
  label: string;
  passed: boolean;
  tip: string;
}

export interface AtsResult {
  score: number; // 0-100
  checks: AtsCheck[];
}

const HAS_NUMBER = /\d/;

/**
 * Lightweight, fully local heuristic scoring — no external AI call.
 * Each check is a simple structural signal that real ATS parsers and
 * human reviewers both tend to care about: complete contact info,
 * quantified impact, non-empty sections, reasonable summary length.
 */
export function scoreResume(profile: Profile): AtsResult {
  const { overview, education, projects, achievements, skills } = profile;

  const hasEmail = overview.email.trim().length > 0;
  const hasPhone = overview.phone.trim().length > 0;
  const hasLinkedin = overview.linkedin.trim().length > 0;

  const bioLength = overview.bio.trim().length;
  const bioLengthOk = bioLength >= 60 && bioLength <= 400;

  const descriptions = [
    ...education.map((e) => e.description),
    ...projects.map((p) => p.description),
    ...achievements.map((a) => a.description),
  ].filter((d) => d && d.trim().length > 0);

  const quantifiedCount = descriptions.filter((d) => HAS_NUMBER.test(d)).length;
  const quantifiedRatioOk = descriptions.length > 0 && quantifiedCount / descriptions.length >= 0.3;

  const hasProjects = projects.length > 0;
  const hasSkills = skills.length >= 3;
  const hasEducation = education.length > 0;

  const descriptionsPresent =
    descriptions.length >= Math.max(1, education.length + projects.length - 1);

  const checks: AtsCheck[] = [
    {
      id: "contact",
      label: "Complete contact info",
      passed: hasEmail && hasPhone,
      tip: "Add both an email and a phone number so recruiters and ATS parsers can reach you.",
    },
    {
      id: "linkedin",
      label: "LinkedIn profile linked",
      passed: hasLinkedin,
      tip: "Add your LinkedIn URL — most recruiters check it before replying.",
    },
    {
      id: "summary",
      label: "Summary is a good length",
      passed: bioLengthOk,
      tip:
        bioLength === 0
          ? "Write a 2-3 sentence summary — resumes with no summary get skipped more often."
          : bioLength < 60
          ? "Your summary is quite short — aim for 2-3 full sentences."
          : "Your summary runs long — tighten it to 2-3 sentences.",
    },
    {
      id: "quantified",
      label: "Impact is quantified",
      passed: quantifiedRatioOk,
      tip: 'Add numbers where you can — "led a team of 4" or "improved load time by 30%" reads far stronger than a plain description.',
    },
    {
      id: "descriptions",
      label: "Entries have descriptions",
      passed: descriptionsPresent,
      tip: "Add a short description to each education/project/achievement entry — bare titles don't give ATS keyword matchers much to work with.",
    },
    {
      id: "projects",
      label: "At least one project listed",
      passed: hasProjects,
      tip: "Add at least one project — it's often the first thing recruiters actually read.",
    },
    {
      id: "skills",
      label: "Skills section has enough entries",
      passed: hasSkills,
      tip: "List at least 3-5 relevant skills so keyword-matching ATS software surfaces your resume.",
    },
    {
      id: "education",
      label: "Education listed",
      passed: hasEducation,
      tip: "Add your education — almost every ATS template expects this section to be present.",
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);

  return { score, checks };
}
