import type { Profile, ResumeSettings } from "@/types/profile";
import {
  AchievementsList,
  ActivitiesList,
  CertificatesList,
  ContactLine,
  EducationList,
  LanguagesInline,
  ProjectsList,
  ResumeSection,
  SkillsInline,
} from "@/components/resume/resume-shared";

export function MinimalTemplate({
  profile,
  settings,
}: {
  profile: Profile;
  settings: ResumeSettings;
}) {
  const accent = settings.accentColor;
  const v = settings.visibleSections;

  return (
    <div style={{ padding: "48px" }}>
      <h1 style={{ fontSize: "1.9em", fontWeight: 600, letterSpacing: "-0.01em" }}>
        {profile.overview.fullName || "Your Name"}
      </h1>
      <p style={{ fontSize: "1em", color: accent, marginTop: "2px" }}>
        {profile.overview.headline}
      </p>
      <div style={{ marginTop: "8px" }}>
        <ContactLine profile={profile} />
      </div>
      {profile.overview.bio && (
        <p style={{ marginTop: "14px", fontSize: "0.92em", color: "#444", maxWidth: "560px" }}>
          {profile.overview.bio}
        </p>
      )}

      <div style={{ marginTop: "26px" }}>
        {v.education && profile.education.length > 0 && (
          <ResumeSection title="Education" accent={accent} variant="quiet">
            <EducationList profile={profile} accent={accent} />
          </ResumeSection>
        )}
        {v.projects && profile.projects.length > 0 && (
          <ResumeSection title="Projects" accent={accent} variant="quiet">
            <ProjectsList profile={profile} accent={accent} />
          </ResumeSection>
        )}
        {v.achievements && profile.achievements.length > 0 && (
          <ResumeSection title="Achievements" accent={accent} variant="quiet">
            <AchievementsList profile={profile} />
          </ResumeSection>
        )}
        {v.activities && profile.activities.length > 0 && (
          <ResumeSection title="Activities" accent={accent} variant="quiet">
            <ActivitiesList profile={profile} />
          </ResumeSection>
        )}
        {v.skills && profile.skills.length > 0 && (
          <ResumeSection title="Skills" accent={accent} variant="quiet">
            <SkillsInline profile={profile} />
          </ResumeSection>
        )}
        {v.languages && profile.languages.length > 0 && (
          <ResumeSection title="Languages" accent={accent} variant="quiet">
            <LanguagesInline profile={profile} />
          </ResumeSection>
        )}
        {v.certificates && profile.certificates.length > 0 && (
          <ResumeSection title="Certificates" accent={accent} variant="quiet">
            <CertificatesList profile={profile} />
          </ResumeSection>
        )}
      </div>
    </div>
  );
}
