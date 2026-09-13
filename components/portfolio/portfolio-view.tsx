import type { Profile } from "@/types/profile";
import { getPortfolioColors } from "@/lib/portfolio-theme";
import { PortfolioHero } from "@/components/portfolio/hero";
import { SITE_NAME } from "@/lib/site-config";
import { getFontFamily } from "@/lib/fonts";
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
  const fontFamily = getFontFamily(settings.font);

  return (
    <div
      style={
        {
          background: colors.background,
          minHeight: "100vh",
          color: colors.text,
          fontFamily,
          // Overriding these here (not just setting fontFamily above) matters
          // because headings and mono stats use classes like font-display /
          // font-mono, which set font-family directly via var(--font-display)
          // etc. — a plain fontFamily on this wrapper wouldn't reach them,
          // since inheritance only fills in where nothing more specific is
          // set. Overriding the variables themselves does reach them.
          "--font-display": fontFamily,
          "--font-body": fontFamily,
          "--font-mono": fontFamily,
        } as React.CSSProperties
      }
    >
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
