"use client";

import Link from "next/link";
import {
  Award,
  Briefcase,
  FileBadge,
  FileText,
  GraduationCap,
  Languages as LanguagesIcon,
  Layers,
  Globe2,
  User,
  Users,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export type EditorSection =
  | "overview"
  | "education"
  | "projects"
  | "achievements"
  | "skills"
  | "languages"
  | "certificates"
  | "activities";

const sections: { id: EditorSection; key: string; icon: typeof User }[] = [
  { id: "overview", key: "editor.section.overview", icon: User },
  { id: "education", key: "editor.section.education", icon: GraduationCap },
  { id: "projects", key: "editor.section.projects", icon: Briefcase },
  { id: "achievements", key: "editor.section.achievements", icon: Award },
  { id: "skills", key: "editor.section.skills", icon: Layers },
  { id: "languages", key: "editor.section.languages", icon: LanguagesIcon },
  { id: "certificates", key: "editor.section.certificates", icon: FileBadge },
  { id: "activities", key: "editor.section.activities", icon: Users },
];

interface EditorSidebarProps {
  active: EditorSection;
  onSelect: (section: EditorSection) => void;
}

export function EditorSidebar({ active, onSelect }: EditorSidebarProps) {
  const { t } = useLanguage();
  return (
    <aside className="lg:w-56 lg:shrink-0">
      <nav className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={cn(
              "focus-ring flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors lg:w-full",
              active === s.id
                ? "bg-surface-raised text-ink"
                : "text-ink-soft hover:bg-surface-raised/60 hover:text-ink"
            )}
          >
            <s.icon className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">{t(s.key)}</span>
          </button>
        ))}
        <div className="my-2 hidden border-t border-rule lg:block" />
        <Link
          href="/resume"
          className="focus-ring flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm font-medium text-ink-soft transition-colors hover:bg-surface-raised/60 hover:text-ink lg:w-full"
        >
          <FileText className="h-4 w-4 shrink-0" />
          {t("nav.resume")}
        </Link>
        <Link
          href="/portfolio/settings"
          className="focus-ring flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm font-medium text-ink-soft transition-colors hover:bg-surface-raised/60 hover:text-ink lg:w-full"
        >
          <Globe2 className="h-4 w-4 shrink-0" />
          {t("dashboard.portfolioSettings")}
        </Link>
      </nav>
    </aside>
  );
}
