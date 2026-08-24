import { forwardRef } from "react";
import type { Profile } from "@/types/profile";
import {
  resumeFontFamily,
  resumeFontSize,
  resumeSpacing,
} from "@/components/resume/resume-shared";
import { MinimalTemplate } from "@/components/resume/templates/minimal-template";
import { ModernTemplate } from "@/components/resume/templates/modern-template";
import { AcademicTemplate } from "@/components/resume/templates/academic-template";
import { ProfessionalTemplate } from "@/components/resume/templates/professional-template";

interface ResumePreviewProps {
  profile: Profile;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ profile }, ref) => {
    const settings = profile.resumeSettings;

    const style: React.CSSProperties & { "--resume-gap": string } = {
      fontFamily: resumeFontFamily(settings.font),
      fontSize: resumeFontSize(settings.fontSize),
      color: "#1a1a1a",
      lineHeight: 1.55,
      "--resume-gap": resumeSpacing(settings.spacing),
    };

    return (
      <div
        ref={ref}
        style={style}
        className="mx-auto w-full max-w-[794px] bg-white shadow-sm"
      >
        {settings.templateId === "minimal" && (
          <MinimalTemplate profile={profile} settings={settings} />
        )}
        {settings.templateId === "modern" && (
          <ModernTemplate profile={profile} settings={settings} />
        )}
        {settings.templateId === "academic" && (
          <AcademicTemplate profile={profile} settings={settings} />
        )}
        {settings.templateId === "professional" && (
          <ProfessionalTemplate profile={profile} settings={settings} />
        )}
      </div>
    );
  }
);
ResumePreview.displayName = "ResumePreview";
