"use client";

import Link from "next/link";
import { Check, ExternalLink } from "lucide-react";
import { AppNavbar } from "@/components/layout/app-navbar";
import { AuthGate } from "@/components/auth/auth-gate";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { PortfolioView } from "@/components/portfolio/portfolio-view";
import { useProfileStore } from "@/lib/store";
import { cn, slugify } from "@/lib/utils";
import type {
  PhotoStyle,
  PortfolioLayout,
  PortfolioSettings,
  PortfolioTheme,
} from "@/types/profile";

const themes: { id: PortfolioTheme; label: string; swatch: string }[] = [
  { id: "paper", label: "Paper", swatch: "#FBFAF7" },
  { id: "ink", label: "Ink", swatch: "#12172B" },
  { id: "orchard", label: "Orchard", swatch: "#F6F2E7" },
  { id: "slate", label: "Slate", swatch: "#F1F3F6" },
  { id: "meadow", label: "Meadow", swatch: "#F3F7F1" },
  { id: "sandstone", label: "Sandstone", swatch: "#FAF3EA" },
  { id: "midnight", label: "Midnight", swatch: "#0B1220" },
  { id: "blossom", label: "Blossom", swatch: "#FDF3F6" },
];

const layouts: { id: PortfolioLayout; label: string; note: string }[] = [
  { id: "classic", label: "Classic", note: "Centered hero, stacked sections" },
  { id: "split", label: "Split", note: "Photo beside intro" },
  { id: "timeline", label: "Timeline", note: "Education & activities merged" },
];

const photoStyles: { id: PhotoStyle; label: string }[] = [
  { id: "circle", label: "Circle" },
  { id: "rounded", label: "Rounded" },
  { id: "square", label: "Square" },
];

const accentPresets = ["#a57c1b", "#275c4f", "#1b2130", "#a5472f", "#3b5bab"];

const sectionLabels: { key: keyof PortfolioSettings["visibleSections"]; label: string }[] = [
  { key: "about", label: "About" },
  { key: "education", label: "Education" },
  { key: "projects", label: "Projects" },
  { key: "achievements", label: "Achievements" },
  { key: "skills", label: "Skills" },
  { key: "certificates", label: "Certificates" },
  { key: "contact", label: "Contact" },
];

function PortfolioSettingsContent() {
  const profile = useProfileStore((s) => s.profile);
  const updatePortfolioSettings = useProfileStore((s) => s.updatePortfolioSettings);
  const settings = profile.portfolioSettings;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Portfolio builder
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Configure your public site and preview it before publishing.
          </p>
        </div>
        {settings.username && (
          <Link href={`/portfolio/${settings.username}`} target="_blank">
            <Button variant="outline">
              <ExternalLink className="h-4 w-4" />
              View live
            </Button>
          </Link>
        )}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">
        <div className="space-y-5">
          <Card>
            <Label htmlFor="username">Portfolio username</Label>
            <div className="flex items-center gap-1 text-sm text-ink-soft">
              <span className="shrink-0 text-xs">/portfolio/</span>
              <Input
                id="username"
                value={settings.username}
                onChange={(e) =>
                  updatePortfolioSettings({ username: slugify(e.target.value) })
                }
                placeholder="yourname"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-ink">Published</span>
              <button
                onClick={() =>
                  updatePortfolioSettings({ isPublished: !settings.isPublished })
                }
                className={cn(
                  "focus-ring relative h-6 w-11 shrink-0 rounded-full p-0 transition-colors",
                  settings.isPublished ? "bg-teal" : "bg-rule"
                )}
                aria-label="Toggle publish status"
              >
                <span
                  className={cn(
                    "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                    settings.isPublished ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          </Card>

          <Card>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Theme
            </p>
            <div className="grid grid-cols-4 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updatePortfolioSettings({ theme: t.id })}
                  className={cn(
                    "focus-ring rounded-md border p-2 text-center transition-colors",
                    settings.theme === t.id ? "border-gold" : "border-rule hover:bg-surface-raised"
                  )}
                >
                  <span
                    className="mx-auto block h-8 w-full rounded border border-rule"
                    style={{ background: t.swatch }}
                  />
                  <span className="mt-1.5 flex items-center justify-center gap-1 text-xs font-medium text-ink">
                    {t.label}
                    {settings.theme === t.id && <Check className="h-3 w-3 text-gold" />}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Layout
            </p>
            <div className="space-y-2">
              {layouts.map((l) => (
                <button
                  key={l.id}
                  onClick={() => updatePortfolioSettings({ layout: l.id })}
                  className={cn(
                    "focus-ring block w-full rounded-md border px-3 py-2 text-left transition-colors",
                    settings.layout === l.id
                      ? "border-gold bg-gold-soft"
                      : "border-rule hover:bg-surface-raised"
                  )}
                >
                  <span className="flex items-center justify-between text-sm font-medium text-ink">
                    {l.label}
                    {settings.layout === l.id && <Check className="h-3.5 w-3.5 text-gold" />}
                  </span>
                  <span className="text-xs text-ink-soft">{l.note}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Photo style
            </p>
            <div className="grid grid-cols-3 gap-2">
              {photoStyles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => updatePortfolioSettings({ photoStyle: p.id })}
                  className={cn(
                    "focus-ring rounded-md border px-2 py-2 text-xs font-medium transition-colors",
                    settings.photoStyle === p.id
                      ? "border-gold bg-gold-soft text-ink"
                      : "border-rule text-ink-soft hover:bg-surface-raised"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Accent color
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {accentPresets.map((c) => (
                <button
                  key={c}
                  onClick={() => updatePortfolioSettings({ accentColor: c })}
                  className={cn(
                    "h-7 w-7 rounded-full border-2 focus-ring",
                    settings.accentColor === c ? "border-ink" : "border-transparent"
                  )}
                  style={{ background: c }}
                  aria-label={`Use accent color ${c}`}
                />
              ))}
              <input
                type="color"
                value={settings.accentColor}
                onChange={(e) => updatePortfolioSettings({ accentColor: e.target.value })}
                className="h-7 w-9 cursor-pointer rounded border border-rule bg-transparent"
                aria-label="Custom accent color"
              />
            </div>
          </Card>

          <Card>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Sections to display
            </p>
            <div className="space-y-2">
              {sectionLabels.map((s) => (
                <label key={s.key} className="flex items-center justify-between text-sm text-ink">
                  {s.label}
                  <input
                    type="checkbox"
                    checked={settings.visibleSections[s.key]}
                    onChange={(e) =>
                      updatePortfolioSettings({
                        visibleSections: {
                          ...settings.visibleSections,
                          [s.key]: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 accent-[rgb(var(--gold))]"
                  />
                </label>
              ))}
            </div>
          </Card>
        </div>

        <div className="min-w-0 overflow-hidden rounded-lg border border-rule">
          <div className="border-b border-rule bg-surface-raised px-4 py-2 text-xs text-ink-soft">
            Preview — /portfolio/{settings.username || "yourname"}
          </div>
          <div className="max-h-[720px] overflow-y-auto">
            <PortfolioView profile={profile} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PortfolioSettingsPage() {
  return (
    <div className="min-h-screen bg-paper">
      <AppNavbar />
      <AuthGate>
        <PortfolioSettingsContent />
      </AuthGate>
    </div>
  );
}