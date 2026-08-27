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

const sections: { id: EditorSection; label: string; icon: typeof User }[] = [
  { id: "overview", label: "Overview", icon: User },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "languages", label: "Languages", icon: LanguagesIcon },
  { id: "certificates", label: "Certificates", icon: FileBadge },
  { id: "activities", label: "Activities", icon: Users },
];

interface EditorSidebarProps {
  active: EditorSection;
  onSelect: (section: EditorSection) => void;
}

export function EditorSidebar({ active, onSelect }: EditorSidebarProps) {
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
            <span className="whitespace-nowrap">{s.label}</span>
          </button>
        ))}
        <div className="my-2 hidden border-t border-rule lg:block" />
        <Link
          href="/resume"
          className="focus-ring flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm font-medium text-ink-soft transition-colors hover:bg-surface-raised/60 hover:text-ink lg:w-full"
        >
          <FileText className="h-4 w-4 shrink-0" />
          Resume
        </Link>
        <Link
          href="/portfolio/settings"
          className="focus-ring flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm font-medium text-ink-soft transition-colors hover:bg-surface-raised/60 hover:text-ink lg:w-full"
        >
          <Globe2 className="h-4 w-4 shrink-0" />
          Portfolio Settings
        </Link>
      </nav>
    </aside>
  );
}
