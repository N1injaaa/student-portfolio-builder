import { ExternalLink, Github } from "lucide-react";
import type { Profile } from "@/types/profile";
import type { PortfolioColors } from "@/lib/portfolio-theme";
import { formatDateRange } from "@/lib/utils";

function SectionShell({
  title,
  colors,
  children,
}: {
  title: string;
  colors: PortfolioColors;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "56px 24px",
        borderTop: `1px solid ${colors.border}`,
      }}
      className="animate-rise-in"
    >
      <h2
        className="font-display"
        style={{ fontSize: "1.6em", fontWeight: 600, color: colors.text, marginBottom: "28px" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export function PortfolioAbout({ profile, colors }: { profile: Profile; colors: PortfolioColors }) {
  if (!profile.overview.bio) return null;
  return (
    <SectionShell title="About" colors={colors}>
      <p style={{ fontSize: "1.05em", lineHeight: 1.75, color: colors.textMuted, maxWidth: "680px" }}>
        {profile.overview.bio}
      </p>
      {profile.overview.location && (
        <p style={{ marginTop: "12px", fontSize: "0.9em", color: colors.textMuted }}>
          📍 {profile.overview.location}
        </p>
      )}
    </SectionShell>
  );
}

export function PortfolioEducation({ profile, colors, accent }: { profile: Profile; colors: PortfolioColors; accent: string }) {
  if (profile.education.length === 0) return null;
  return (
    <SectionShell title="Education" colors={colors}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {profile.education.map((e) => (
          <div key={e.id}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
              <p style={{ fontWeight: 600, color: colors.text }}>{e.school}</p>
              <p style={{ fontSize: "0.85em", color: accent }}>
                {formatDateRange(e.startDate, e.endDate)}
              </p>
            </div>
            <p style={{ fontSize: "0.95em", color: colors.textMuted, marginTop: "2px" }}>
              {e.degree}
              {e.gpa ? ` · GPA ${e.gpa}` : ""}
            </p>
            {e.description && (
              <p style={{ fontSize: "0.9em", color: colors.textMuted, marginTop: "6px" }}>
                {e.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function PortfolioProjects({ profile, colors, accent }: { profile: Profile; colors: PortfolioColors; accent: string }) {
  if (profile.projects.length === 0) return null;
  return (
    <SectionShell title="Projects" colors={colors}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "18px" }}>
        {profile.projects.map((p) => (
          <div
            key={p.id}
            style={{
              border: `1px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "22px",
              background: colors.surface,
            }}
          >
            <p style={{ fontWeight: 600, color: colors.text }}>{p.name}</p>
            {p.description && (
              <p style={{ fontSize: "0.88em", color: colors.textMuted, marginTop: "6px", lineHeight: 1.6 }}>
                {p.description}
              </p>
            )}
            {p.technologies && (
              <p style={{ fontSize: "0.78em", color: accent, marginTop: "10px" }}>{p.technologies}</p>
            )}
            <div style={{ display: "flex", gap: "14px", marginTop: "14px" }}>
              {p.githubUrl && (
                <a href={ensureUrl(p.githubUrl)} target="_blank" rel="noreferrer" style={{ ...linkStyle, color: colors.textMuted }}>
                  <Github className="h-3.5 w-3.5" /> Code
                </a>
              )}
              {p.liveUrl && (
                <a href={ensureUrl(p.liveUrl)} target="_blank" rel="noreferrer" style={{ ...linkStyle, color: accent }}>
                  <ExternalLink className="h-3.5 w-3.5" /> Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function PortfolioAchievements({ profile, colors, accent }: { profile: Profile; colors: PortfolioColors; accent: string }) {
  if (profile.achievements.length === 0) return null;
  return (
    <SectionShell title="Achievements" colors={colors}>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {profile.achievements.map((a) => (
          <div key={a.id} className="leader">
            <div>
              <p style={{ fontWeight: 600, color: colors.text }}>{a.title}</p>
              <p style={{ fontSize: "0.88em", color: colors.textMuted }}>
                {[a.organization, a.description].filter(Boolean).join(" — ")}
              </p>
            </div>
            <span style={{ fontSize: "0.82em", color: accent, whiteSpace: "nowrap" }}>{a.date}</span>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function PortfolioSkills({ profile, colors, accent }: { profile: Profile; colors: PortfolioColors; accent: string }) {
  if (profile.skills.length === 0) return null;
  return (
    <SectionShell title="Skills" colors={colors}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {profile.skills.map((s) => (
          <span
            key={s.id}
            style={{
              fontSize: "0.85em",
              padding: "7px 14px",
              borderRadius: "999px",
              border: `1px solid ${colors.border}`,
              color: colors.text,
              background: colors.surface,
            }}
          >
            {s.name}
            <span style={{ color: accent, marginLeft: "6px" }}>· {s.level}</span>
          </span>
        ))}
      </div>
    </SectionShell>
  );
}

export function PortfolioCertificates({ profile, colors, accent }: { profile: Profile; colors: PortfolioColors; accent: string }) {
  if (profile.certificates.length === 0) return null;
  return (
    <SectionShell title="Certificates" colors={colors}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {profile.certificates.map((c) => (
          <div key={c.id} className="leader">
            <span style={{ color: colors.text }}>
              {c.name}
              {c.organization ? ` — ${c.organization}` : ""}
            </span>
            <span style={{ fontSize: "0.82em", color: accent, whiteSpace: "nowrap" }}>{c.date}</span>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function PortfolioContact({ profile, colors, accent }: { profile: Profile; colors: PortfolioColors; accent: string }) {
  return (
    <section
      style={{
        borderTop: `1px solid ${colors.border}`,
        padding: "72px 24px",
        textAlign: "center",
      }}
      className="animate-rise-in"
    >
      <h2 className="font-display" style={{ fontSize: "1.6em", fontWeight: 600, color: colors.text }}>
        Let&rsquo;s talk
      </h2>
      <p style={{ marginTop: "10px", color: colors.textMuted }}>
        Open to internships, collaborations, and interesting problems.
      </p>
      {profile.overview.email && (
        <a
          href={`mailto:${profile.overview.email}`}
          style={{
            display: "inline-flex",
            marginTop: "22px",
            padding: "12px 28px",
            borderRadius: "999px",
            background: accent,
            color: "#fff",
            fontSize: "0.9em",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          {profile.overview.email}
        </a>
      )}
    </section>
  );
}

export function PortfolioTimeline({ profile, colors, accent }: { profile: Profile; colors: PortfolioColors; accent: string }) {
  type Entry = { id: string; title: string; sub: string; date: string; sortKey: string; body?: string };
  const entries: Entry[] = [
    ...profile.education.map((e) => ({
      id: e.id,
      title: e.school,
      sub: e.degree,
      date: formatDateRange(e.startDate, e.endDate),
      sortKey: e.endDate || e.startDate || "",
      body: e.description,
    })),
    ...profile.activities.map((a) => ({
      id: a.id,
      title: a.organization,
      sub: a.position,
      date: formatDateRange(a.startDate, a.endDate),
      sortKey: a.endDate || a.startDate || "",
      body: a.description,
    })),
  ].sort((a, b) => b.sortKey.localeCompare(a.sortKey));

  if (entries.length === 0) return null;

  return (
    <SectionShell title="Timeline" colors={colors}>
      <div style={{ position: "relative", paddingLeft: "24px" }}>
        <div style={{ position: "absolute", left: "5px", top: "6px", bottom: "6px", width: "2px", background: colors.border }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {entries.map((e) => (
            <div key={e.id} style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "-24px",
                  top: "5px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "999px",
                  background: accent,
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
                <p style={{ fontWeight: 600, color: colors.text }}>{e.title}</p>
                <span style={{ fontSize: "0.82em", color: accent }}>{e.date}</span>
              </div>
              {e.sub && <p style={{ fontSize: "0.9em", color: colors.textMuted, marginTop: "2px" }}>{e.sub}</p>}
              {e.body && <p style={{ fontSize: "0.88em", color: colors.textMuted, marginTop: "6px" }}>{e.body}</p>}
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

const linkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  fontSize: "0.82em",
  fontWeight: 500,
  textDecoration: "none",
};

function ensureUrl(value: string) {
  if (value.startsWith("http")) return value;
  return `https://${value}`;
}
