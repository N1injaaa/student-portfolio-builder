import type { Profile } from "@/types/profile";
import { getPortfolioColors } from "@/lib/portfolio-theme";
import { PortfolioHero } from "@/components/portfolio/hero";
import { SITE_NAME } from "@/lib/site-config";
import {
  PortfolioAbout,
  PortfolioAchievements,
  PortfolioCertificates,
  PortfolioContact,
  PortfolioEducation,
  PortfolioProjects,
  PortfolioSkills,
  PortfolioTimeline,
} from "@/components/portfolio/sections";

export function PortfolioView({
  profile,
  isPro = false,
}: {
  profile: Profile;
  /** Hides the "Built with..." footer for paid accounts. Defaults to
   * false so every existing call site (editor live-preview, etc.) keeps
   * showing the free-tier footer unless it's explicitly told the owner
   * is on Pro. */
  isPro?: boolean;
}) {
  const settings = profile.portfolioSettings;
  const colors = getPortfolioColors(settings.theme);
  const accent = settings.accentColor;
  const v = settings.visibleSections;

  return (
    <div style={{ background: colors.background, minHeight: "100vh", color: colors.text }}>
      <PortfolioHero
        profile={profile}
        colors={colors}
        accent={accent}
        photoStyle={settings.photoStyle}
        split={settings.layout === "split"}
      />

      {v.about && <PortfolioAbout profile={profile} colors={colors} />}

      {settings.layout === "timeline" ? (
        <PortfolioTimeline profile={profile} colors={colors} accent={accent} />
      ) : (
        v.education && <PortfolioEducation profile={profile} colors={colors} accent={accent} />
      )}

      {v.projects && <PortfolioProjects profile={profile} colors={colors} accent={accent} />}
      {v.achievements && <PortfolioAchievements profile={profile} colors={colors} accent={accent} />}
      {v.skills && <PortfolioSkills profile={profile} colors={colors} accent={accent} />}
      {v.certificates && <PortfolioCertificates profile={profile} colors={colors} accent={accent} />}
      {v.contact && <PortfolioContact profile={profile} colors={colors} accent={accent} />}

      {!isPro && (
        <footer style={{ textAlign: "center", padding: "32px 24px", fontSize: "0.8em", color: colors.textMuted }}>
          Built with {SITE_NAME}
        </footer>
      )}
    </div>
  );
}
