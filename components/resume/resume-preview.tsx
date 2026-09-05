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
import { SITE_NAME } from "@/lib/site-config";

interface ResumePreviewProps {
  profile: Profile;
  /** Hides the small "Made with..." footer line for paid accounts. Defaults
   * to false so any existing call site keeps showing it unless explicitly
   * told the owner is on Pro — same convention as PortfolioView's isPro. */
  isPro?: boolean;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ profile, isPro = false }, ref) => {
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

        {!isPro && (
          <p
            style={{
              textAlign: "center",
              padding: "10px 24px 16px",
              fontSize: "8px",
              color: "#9a9a9a",
              letterSpacing: "0.02em",
            }}
          >
            Made with {SITE_NAME}
          </p>
        )}
      </div>
    );
  }
);
ResumePreview.displayName = "ResumePreview";
