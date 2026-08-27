import type { Profile, ResumeSettings } from "@/types/profile";
import { formatDateRange } from "@/lib/utils";
import {
  AchievementsList,
  ActivitiesList,
  CertificatesList,
  EducationList,
  ProjectsList,
} from "@/components/resume/resume-shared";

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "22px" }}>
      <h3
        style={{
          fontSize: "0.72em",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#fff",
          opacity: 0.75,
          marginBottom: "8px",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

export function ProfessionalTemplate({
  profile,
  settings,
}: {
  profile: Profile;
  settings: ResumeSettings;
}) {
  const accent = settings.accentColor;
  const v = settings.visibleSections;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "100%" }}>
      <div style={{ background: "#1b2130", color: "#fff", padding: "32px 22px" }}>
        <h1 style={{ fontSize: "1.3em", fontWeight: 700, lineHeight: 1.25 }}>
          {profile.overview.fullName || "Your Name"}
        </h1>
        <p style={{ fontSize: "0.85em", color: accent, marginTop: "4px" }}>
          {profile.overview.headline}
        </p>

        <div style={{ marginTop: "20px", fontSize: "0.78em", lineHeight: 1.9, opacity: 0.9 }}>
          {profile.overview.email && <div>{profile.overview.email}</div>}
          {profile.overview.phone && <div>{profile.overview.phone}</div>}
          {profile.overview.location && <div>{profile.overview.location}</div>}
          {profile.overview.website && <div>{profile.overview.website}</div>}
          {profile.overview.linkedin && <div>{profile.overview.linkedin}</div>}
          {profile.overview.github && <div>{profile.overview.github}</div>}
        </div>

        {v.skills && profile.skills.length > 0 && (
          <SidebarSection title="Skills">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {profile.skills.map((s) => (
                <span
                  key={s.id}
                  style={{
                    fontSize: "0.72em",
                    background: "rgba(255,255,255,0.1)",
                    padding: "3px 8px",
                    borderRadius: "999px",
                  }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </SidebarSection>
        )}

        {v.languages && profile.languages.length > 0 && (
          <SidebarSection title="Languages">
            <div style={{ fontSize: "0.8em", lineHeight: 1.8, opacity: 0.9 }}>
              {profile.languages.map((l) => (
                <div key={l.id}>
                  {l.language} <span style={{ opacity: 0.6 }}>— {l.level}</span>
                </div>
              ))}
            </div>
          </SidebarSection>
        )}

        {v.certificates && profile.certificates.length > 0 && (
          <SidebarSection title="Certificates">
            <div style={{ fontSize: "0.78em", lineHeight: 1.7, opacity: 0.9 }}>
              {profile.certificates.map((c) => (
                <div key={c.id} style={{ marginBottom: "6px" }}>
                  <div>{c.name}</div>
                  <div style={{ opacity: 0.65 }}>{c.date}</div>
                </div>
              ))}
            </div>
          </SidebarSection>
        )}
      </div>

      <div style={{ padding: "32px 30px" }}>
        {profile.overview.bio && (
          <p style={{ fontSize: "0.9em", color: "#444", marginBottom: "var(--resume-gap)" }}>
            {profile.overview.bio}
          </p>
        )}

        {v.education && profile.education.length > 0 && (
          <section style={{ marginBottom: "var(--resume-gap)" }}>
            <h2
              style={{
                fontSize: "0.75em",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: accent,
                marginBottom: "10px",
              }}
            >
              Education
            </h2>
            <EducationList profile={profile} accent={accent} />
          </section>
        )}

        {v.projects && profile.projects.length > 0 && (
          <section style={{ marginBottom: "var(--resume-gap)" }}>
            <h2
              style={{
                fontSize: "0.75em",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: accent,
                marginBottom: "10px",
              }}
            >
              Projects
            </h2>
            <ProjectsList profile={profile} accent={accent} />
          </section>
        )}

        {v.achievements && profile.achievements.length > 0 && (
          <section style={{ marginBottom: "var(--resume-gap)" }}>
            <h2
              style={{
                fontSize: "0.75em",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: accent,
                marginBottom: "10px",
              }}
            >
              Achievements
            </h2>
            <AchievementsList profile={profile} />
          </section>
        )}

        {v.activities && profile.activities.length > 0 && (
          <section style={{ marginBottom: "var(--resume-gap)" }}>
            <h2
              style={{
                fontSize: "0.75em",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: accent,
                marginBottom: "10px",
              }}
            >
              Activities
            </h2>
            <ActivitiesList profile={profile} />
          </section>
        )}
      </div>
    </div>
  );
}

// re-export helper used above for date formatting parity with other templates
export { formatDateRange };
