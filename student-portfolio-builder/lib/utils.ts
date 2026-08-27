import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import type { Profile } from "@/types/profile";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function newId(): string {
  return uuidv4();
}

export function formatDateRange(start: string, end: string): string {
  if (!start && !end) return "";
  if (start && !end) return `${start} — Present`;
  if (!start && end) return end;
  return `${start} — ${end}`;
}

interface CompletionResult {
  percent: number;
  missing: string[];
}

export function calculateCompletion(profile: Profile): CompletionResult {
  const checks: { label: string; done: boolean; href: string }[] = [
    {
      label: "Add your name and bio",
      done: Boolean(profile.overview.fullName && profile.overview.bio),
      href: "/editor?section=overview",
    },
    {
      label: "Add contact details",
      done: Boolean(profile.overview.email),
      href: "/editor?section=overview",
    },
    {
      label: "Add education",
      done: profile.education.length > 0,
      href: "/editor?section=education",
    },
    {
      label: "Add a project",
      done: profile.projects.length > 0,
      href: "/editor?section=projects",
    },
    {
      label: "Add an achievement",
      done: profile.achievements.length > 0,
      href: "/editor?section=achievements",
    },
    {
      label: "Add your skills",
      done: profile.skills.length > 0,
      href: "/editor?section=skills",
    },
    {
      label: "Add a language",
      done: profile.languages.length > 0,
      href: "/editor?section=languages",
    },
    {
      label: "Choose a portfolio username",
      done: Boolean(profile.portfolioSettings.username),
      href: "/editor?section=portfolio",
    },
  ];

  const done = checks.filter((c) => c.done).length;
  const percent = Math.round((done / checks.length) * 100);
  const missing = checks.filter((c) => !c.done).map((c) => c.label);

  return { percent, missing };
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
