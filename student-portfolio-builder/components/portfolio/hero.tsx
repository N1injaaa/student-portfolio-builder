import { Github, Linkedin, Mail } from "lucide-react";
import type { Profile, PhotoStyle } from "@/types/profile";
import type { PortfolioColors } from "@/lib/portfolio-theme";

const photoRadius: Record<PhotoStyle, string> = {
  circle: "9999px",
  rounded: "24px",
  square: "4px",
};

export function PortfolioHero({
  profile,
  colors,
  accent,
  photoStyle,
  split = false,
}: {
  profile: Profile;
  colors: PortfolioColors;
  accent: string;
  photoStyle: PhotoStyle;
  split?: boolean;
}) {
  const initials = profile.overview.fullName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section
      style={{
        padding: split ? "96px 24px" : "88px 24px 64px",
        display: "flex",
        flexDirection: split ? "row" : "column",
        alignItems: "center",
        justifyContent: split ? "space-between" : "center",
        gap: "32px",
        maxWidth: "1000px",
        margin: "0 auto",
        flexWrap: "wrap",
      }}
      className="animate-rise-in"
    >
      <div style={{ textAlign: split ? "left" : "center", maxWidth: "620px" }}>
        <p
          style={{
            fontSize: "0.8em",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: accent,
            fontWeight: 600,
            marginBottom: "10px",
          }}
        >
          {profile.overview.headline}
        </p>
        <h1
          className="font-display"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 600, color: colors.text, lineHeight: 1.08 }}
        >
          {profile.overview.fullName || "Your Name"}
        </h1>
        {profile.overview.bio && (
          <p
            style={{
              marginTop: "18px",
              fontSize: "1.1em",
              color: colors.textMuted,
              fontStyle: "italic",
            }}
          >
            &ldquo;{profile.overview.bio}&rdquo;
          </p>
        )}
        <div
          style={{
            marginTop: "28px",
            display: "flex",
            gap: "12px",
            justifyContent: split ? "flex-start" : "center",
            flexWrap: "wrap",
          }}
        >
          {profile.overview.github && (
            <a
              href={ensureUrl(profile.overview.github)}
              target="_blank"
              rel="noreferrer"
              style={pillStyle(colors, accent)}
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
          )}
          {profile.overview.linkedin && (
            <a
              href={ensureUrl(profile.overview.linkedin)}
              target="_blank"
              rel="noreferrer"
              style={pillStyle(colors, accent)}
            >
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </a>
          )}
          {profile.overview.email && (
            <a href={`mailto:${profile.overview.email}`} style={pillStyle(colors, accent, true)}>
              <Mail className="h-3.5 w-3.5" /> Contact
            </a>
          )}
        </div>
      </div>

      <div
        style={{
          width: "160px",
          height: "160px",
          borderRadius: photoRadius[photoStyle],
          overflow: "hidden",
          border: `2px solid ${accent}`,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.surface,
        }}
      >
        {profile.overview.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.overview.photoUrl}
            alt={profile.overview.fullName}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span
            className="font-display"
            style={{ fontSize: "2.2em", fontWeight: 600, color: accent }}
          >
            {initials || "?"}
          </span>
        )}
      </div>
    </section>
  );
}

function pillStyle(colors: PortfolioColors, accent: string, filled = false): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "9px 16px",
    borderRadius: "999px",
    fontSize: "0.85em",
    fontWeight: 500,
    border: `1px solid ${filled ? accent : colors.border}`,
    background: filled ? accent : "transparent",
    color: filled ? "#fff" : colors.text,
    textDecoration: "none",
  };
}

function ensureUrl(value: string) {
  if (value.startsWith("http")) return value;
  return `https://${value}`;
}
