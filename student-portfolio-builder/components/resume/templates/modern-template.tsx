import type { Profile, ResumeSettings } from "@/types/profile";
import {
  AchievementsList,
  ActivitiesList,
  CertificatesList,
  EducationList,
  LanguagesInline,
  ProjectsList,
  ResumeSection,
  SkillsInline,
} from "@/components/resume/resume-shared";

export function ModernTemplate({
  profile,
  settings,
}: {
  profile: Profile;
  settings: ResumeSettings;
}) {
  const accent = settings.accentColor;
  const v = settings.visibleSections;
  const contact = [
    profile.overview.email,
    profile.overview.phone,
    profile.overview.location,
    profile.overview.website,
    profile.overview.linkedin,
    profile.overview.github,
  ].filter(Boolean);

  return (
    <div>
      <div
        style={{
          background: accent,
          color: "#fff",
          padding: "40px 48px",
        }}
      >
        <h1 style={{ fontSize: "2em", fontWeight: 700, letterSpacing: "-0.01em" }}>
          {profile.overview.fullName || "Your Name"}
        </h1>
        <p style={{ fontSize: "1.05em", opacity: 0.92, marginTop: "2px" }}>
          {profile.overview.headline}
        </p>
        <p style={{ fontSize: "0.82em", opacity: 0.85, marginTop: "10px" }}>
          {contact.join("   ·   ")}
        </p>
      </div>

      <div style={{ padding: "32px 48px" }}>
        {profile.overview.bio && (
          <p style={{ fontSize: "0.92em", color: "#444", marginBottom: "var(--resume-gap)" }}>
            {profile.overview.bio}
          </p>
        )}

        {v.projects && profile.projects.length > 0 && (
          <ResumeSection title="Projects" accent={accent} variant="underline">
            <ProjectsList profile={profile} accent={accent} />
          </ResumeSection>
        )}
        {v.education && profile.education.length > 0 && (
          <ResumeSection title="Education" accent={accent} variant="underline">
            <EducationList profile={profile} accent={accent} />
          </ResumeSection>
        )}
        {v.achievements && profile.achievements.length > 0 && (
          <ResumeSection title="Achievements" accent={accent} variant="underline">
            <AchievementsList profile={profile} />
          </ResumeSection>
        )}
        {v.activities && profile.activities.length > 0 && (
          <ResumeSection title="Activities" accent={accent} variant="underline">
            <ActivitiesList profile={profile} />
          </ResumeSection>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          {v.skills && profile.skills.length > 0 && (
            <ResumeSection title="Skills" accent={accent} variant="underline">
              <SkillsInline profile={profile} />
            </ResumeSection>
          )}
          {v.languages && profile.languages.length > 0 && (
            <ResumeSection title="Languages" accent={accent} variant="underline">
              <LanguagesInline profile={profile} />
            </ResumeSection>
          )}
        </div>

        {v.certificates && profile.certificates.length > 0 && (
          <ResumeSection title="Certificates" accent={accent} variant="underline">
            <CertificatesList profile={profile} />
          </ResumeSection>
        )}
      </div>
    </div>
  );
}
