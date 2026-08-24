import type { Profile, ResumeSettings } from "@/types/profile";
import { formatDateRange } from "@/lib/utils";
import {
  AchievementsList,
  ActivitiesList,
  CertificatesList,
  ContactLine,
  LanguagesInline,
  ProjectsList,
  ResumeSection,
  SkillsInline,
} from "@/components/resume/resume-shared";

export function AcademicTemplate({
  profile,
  settings,
}: {
  profile: Profile;
  settings: ResumeSettings;
}) {
  const accent = settings.accentColor;
  const v = settings.visibleSections;

  return (
    <div style={{ padding: "48px", fontFamily: "'Fraunces', Georgia, serif" }}>
      <div style={{ textAlign: "center", borderBottom: `2px solid ${accent}`, paddingBottom: "16px" }}>
        <h1 style={{ fontSize: "1.9em", fontWeight: 600 }}>
          {profile.overview.fullName || "Your Name"}
        </h1>
        <p style={{ fontSize: "1em", color: "#555", marginTop: "2px" }}>
          {profile.overview.headline}
        </p>
        <div style={{ marginTop: "8px", display: "flex", justifyContent: "center" }}>
          <ContactLine profile={profile} />
        </div>
      </div>

      {profile.overview.bio && (
        <p
          style={{
            marginTop: "18px",
            fontSize: "0.92em",
            color: "#444",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          &ldquo;{profile.overview.bio}&rdquo;
        </p>
      )}

      <div style={{ marginTop: "26px" }}>
        {v.education && profile.education.length > 0 && (
          <ResumeSection title="Education" accent={accent} variant="underline">
            <div className="space-y-3">
              {profile.education.map((e) => (
                <div key={e.id}>
                  <div className="leader" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                    <span style={{ fontWeight: 600 }}>{e.school}</span>
                    <span style={{ fontSize: "0.85em", color: "#666" }}>
                      {formatDateRange(e.startDate, e.endDate)}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.9em", fontFamily: "'IBM Plex Sans', sans-serif" }}>
                    {e.degree}
                    {e.gpa ? ` — GPA ${e.gpa}` : ""}
                  </p>
                  {e.description && (
                    <p
                      style={{
                        fontSize: "0.86em",
                        color: "#555",
                        fontFamily: "'IBM Plex Sans', sans-serif",
                      }}
                    >
                      {e.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {v.achievements && profile.achievements.length > 0 && (
          <ResumeSection title="Honors &amp; Achievements" accent={accent} variant="underline">
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              <AchievementsList profile={profile} />
            </div>
          </ResumeSection>
        )}

        {v.projects && profile.projects.length > 0 && (
          <ResumeSection title="Projects &amp; Research" accent={accent} variant="underline">
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              <ProjectsList profile={profile} accent={accent} />
            </div>
          </ResumeSection>
        )}

        {v.activities && profile.activities.length > 0 && (
          <ResumeSection title="Activities" accent={accent} variant="underline">
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              <ActivitiesList profile={profile} />
            </div>
          </ResumeSection>
        )}

        {v.certificates && profile.certificates.length > 0 && (
          <ResumeSection title="Certificates" accent={accent} variant="underline">
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
              <CertificatesList profile={profile} />
            </div>
          </ResumeSection>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          {v.skills && profile.skills.length > 0 && (
            <ResumeSection title="Skills" accent={accent} variant="underline">
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                <SkillsInline profile={profile} />
              </div>
            </ResumeSection>
          )}
          {v.languages && profile.languages.length > 0 && (
            <ResumeSection title="Languages" accent={accent} variant="underline">
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                <LanguagesInline profile={profile} />
              </div>
            </ResumeSection>
          )}
        </div>
      </div>
    </div>
  );
}
