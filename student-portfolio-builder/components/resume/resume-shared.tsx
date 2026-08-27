import type { ReactNode } from "react";
import type { Profile, ResumeSettings } from "@/types/profile";
import { formatDateRange } from "@/lib/utils";

export interface TemplateProps {
  profile: Profile;
}

export function resumeFontFamily(font: ResumeSettings["font"]) {
  if (font === "serif") return "'Fraunces', Georgia, serif";
  if (font === "mono") return "'IBM Plex Mono', monospace";
  return "'IBM Plex Sans', Arial, sans-serif";
}

export function resumeFontSize(size: ResumeSettings["fontSize"]) {
  if (size === "sm") return "12.5px";
  if (size === "lg") return "15px";
  return "13.5px";
}

export function resumeSpacing(spacing: ResumeSettings["spacing"]) {
  if (spacing === "compact") return "14px";
  if (spacing === "roomy") return "30px";
  return "22px";
}

export function visibleSectionCount(settings: ResumeSettings, profile: Profile) {
  const s = settings.visibleSections;
  return [
    s.education && profile.education.length,
    s.projects && profile.projects.length,
    s.achievements && profile.achievements.length,
    s.skills && profile.skills.length,
    s.languages && profile.languages.length,
    s.certificates && profile.certificates.length,
    s.activities && profile.activities.length,
  ].filter((v) => Boolean(v)).length;
}

export function ResumeSection({
  title,
  children,
  accent,
  variant = "default",
}: {
  title: string;
  children: ReactNode;
  accent: string;
  variant?: "default" | "underline" | "quiet";
}) {
  return (
    <section style={{ marginBottom: "var(--resume-gap)" }}>
      <h2
        style={{
          fontSize: "0.72em",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: variant === "quiet" ? "#555" : accent,
          borderBottom: variant === "underline" ? `2px solid ${accent}` : "none",
          paddingBottom: variant === "underline" ? "4px" : 0,
          marginBottom: "10px",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ContactLine({ profile }: { profile: Profile }) {
  const items = [
    profile.overview.email,
    profile.overview.phone,
    profile.overview.location,
    profile.overview.website,
    profile.overview.linkedin,
    profile.overview.github,
  ].filter(Boolean);
  return (
    <p style={{ fontSize: "0.85em", color: "#555" }}>{items.join("   ·   ")}</p>
  );
}

export function EducationList({ profile, accent }: { profile: Profile; accent: string }) {
  return (
    <div className="space-y-2.5">
      {profile.education.map((e) => (
        <div key={e.id}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{e.school}</strong>
            <span style={{ color: "#666", fontSize: "0.85em" }}>
              {formatDateRange(e.startDate, e.endDate)}
            </span>
          </div>
          <p style={{ fontSize: "0.92em" }}>
            {e.degree}
            {e.gpa ? ` · GPA ${e.gpa}` : ""}
          </p>
          {e.description && (
            <p style={{ fontSize: "0.88em", color: "#555", marginTop: "2px" }}>
              {e.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export function ProjectsList({ profile, accent }: { profile: Profile; accent: string }) {
  return (
    <div className="space-y-3">
      {profile.projects.map((p) => (
        <div key={p.id}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            <strong>{p.name}</strong>
            <span style={{ fontSize: "0.8em", color: accent }}>
              {[p.liveUrl, p.githubUrl].filter(Boolean).join("  ·  ")}
            </span>
          </div>
          {p.description && (
            <p style={{ fontSize: "0.9em", color: "#444", marginTop: "2px" }}>{p.description}</p>
          )}
          {p.technologies && (
            <p style={{ fontSize: "0.8em", color: "#777", marginTop: "2px" }}>
              {p.technologies}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export function AchievementsList({ profile }: { profile: Profile }) {
  return (
    <div className="space-y-2">
      {profile.achievements.map((a) => (
        <div key={a.id}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{a.title}</strong>
            <span style={{ color: "#666", fontSize: "0.85em" }}>{a.date}</span>
          </div>
          <p style={{ fontSize: "0.88em", color: "#555" }}>
            {[a.organization, a.description].filter(Boolean).join(" — ")}
          </p>
        </div>
      ))}
    </div>
  );
}

export function CertificatesList({ profile }: { profile: Profile }) {
  return (
    <div className="space-y-1.5">
      {profile.certificates.map((c) => (
        <div key={c.id} style={{ display: "flex", justifyContent: "space-between" }}>
          <span>
            {c.name}
            {c.organization ? ` — ${c.organization}` : ""}
          </span>
          <span style={{ color: "#666", fontSize: "0.85em" }}>{c.date}</span>
        </div>
      ))}
    </div>
  );
}

export function ActivitiesList({ profile }: { profile: Profile }) {
  return (
    <div className="space-y-2">
      {profile.activities.map((a) => (
        <div key={a.id}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{a.organization}</strong>
            <span style={{ color: "#666", fontSize: "0.85em" }}>
              {formatDateRange(a.startDate, a.endDate)}
            </span>
          </div>
          <p style={{ fontSize: "0.88em", color: "#555" }}>
            {[a.position, a.description].filter(Boolean).join(" — ")}
          </p>
        </div>
      ))}
    </div>
  );
}

export function SkillsInline({ profile }: { profile: Profile }) {
  return (
    <p style={{ fontSize: "0.9em", lineHeight: 1.7 }}>
      {profile.skills.map((s) => s.name).join("  ·  ")}
    </p>
  );
}

export function LanguagesInline({ profile }: { profile: Profile }) {
  return (
    <p style={{ fontSize: "0.9em", lineHeight: 1.7 }}>
      {profile.languages.map((l) => `${l.language} (${l.level})`).join("  ·  ")}
    </p>
  );
}
