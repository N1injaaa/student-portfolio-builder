"use client";

import { useState } from "react";
import { Check, Lock, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { useProfileStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { UPGRADE_URL } from "@/lib/upgrade";
import type { ResumeTemplateId, ResumeSettings } from "@/types/profile";

const FREE_VERSION_LIMIT = 1;

const templates: { id: ResumeTemplateId; label: string; note: string; pro?: boolean }[] = [
  { id: "minimal", label: "Minimal", note: "Quiet type, single column" },
  { id: "modern", label: "Modern", note: "Bold accent header", pro: true },
  { id: "academic", label: "Academic", note: "Serif, transcript-style", pro: true },
  { id: "professional", label: "Professional", note: "Two-column, dense", pro: true },
];

const accentPresets = ["#a57c1b", "#275c4f", "#1b2130", "#a5472f", "#3b5bab"];

const sectionLabels: { key: keyof ResumeSettings["visibleSections"]; label: string }[] = [
  { key: "education", label: "Education" },
  { key: "projects", label: "Projects" },
  { key: "achievements", label: "Achievements" },
  { key: "skills", label: "Skills" },
  { key: "languages", label: "Languages" },
  { key: "certificates", label: "Certificates" },
  { key: "activities", label: "Activities" },
];

export function ResumeSettingsPanel() {
  const settings = useProfileStore((s) => s.profile.resumeSettings);
  const updateResumeSettings = useProfileStore((s) => s.updateResumeSettings);
  const isPro = useProfileStore((s) => s.isPro);
  const versions = useProfileStore((s) => s.profile.resumeVersions);
  const activeVersionId = useProfileStore((s) => s.profile.activeResumeVersionId);
  const saveResumeVersion = useProfileStore((s) => s.saveResumeVersion);
  const switchToResumeVersion = useProfileStore((s) => s.switchToResumeVersion);
  const switchToDefaultResume = useProfileStore((s) => s.switchToDefaultResume);
  const deleteResumeVersion = useProfileStore((s) => s.deleteResumeVersion);

  const [isNaming, setIsNaming] = useState(false);
  const [newName, setNewName] = useState("");

  function startSaveVersion() {
    if (!isPro && versions.length >= FREE_VERSION_LIMIT) {
      window.open(UPGRADE_URL, "_blank");
      return;
    }
    setIsNaming(true);
    setNewName("");
  }

  function confirmSaveVersion() {
    const name = newName.trim();
    if (!name) return;
    saveResumeVersion(name);
    setIsNaming(false);
    setNewName("");
  }

  return (
    <div className="space-y-5">
      <Card>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Resume versions
        </p>
        <p className="mb-3 text-xs text-ink-soft">
          Save the current template &amp; sections as a named version — handy for tailoring one
          resume per application.
        </p>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={switchToDefaultResume}
            className={cn(
              "focus-ring rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              activeVersionId === null
                ? "border-gold bg-gold-soft text-ink"
                : "border-rule text-ink-soft hover:bg-surface-raised"
            )}
          >
            Default
          </button>
          {versions.map((v) => (
            <span
              key={v.id}
              className={cn(
                "focus-ring flex items-center gap-1 rounded-full border pl-3 pr-1.5 py-1 text-xs font-medium transition-colors",
                activeVersionId === v.id
                  ? "border-gold bg-gold-soft text-ink"
                  : "border-rule text-ink-soft hover:bg-surface-raised"
              )}
            >
              <button onClick={() => switchToResumeVersion(v.id)}>{v.name}</button>
              <button
                onClick={() => deleteResumeVersion(v.id)}
                className="rounded-full p-0.5 hover:text-clay"
                aria-label={`Delete version ${v.name}`}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>

        {isNaming ? (
          <div className="mt-3 flex items-center gap-2">
            <Input
              autoFocus
              placeholder="e.g. Frontend internship"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && confirmSaveVersion()}
              className="h-8 text-xs"
            />
            <Button size="sm" onClick={confirmSaveVersion}>
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsNaming(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <button
            onClick={startSaveVersion}
            className="focus-ring mt-3 flex items-center gap-1 text-xs font-medium text-gold hover:underline"
          >
            <Plus className="h-3 w-3" />
            Save as new version
          </button>
        )}
        {!isPro && versions.length >= FREE_VERSION_LIMIT && (
          <p className="mt-2 text-xs text-ink-soft">
            🔒 Free accounts keep 1 saved version.{" "}
            <a
              href={UPGRADE_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-gold underline underline-offset-2"
            >
              Upgrade
            </a>{" "}
            for more.
          </p>
        )}
      </Card>

      <Card>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Template
        </p>
        <div className="grid grid-cols-2 gap-2">
          {templates.map((t) => {
            const locked = t.pro && !isPro;
            return (
              <button
                key={t.id}
                onClick={() =>
                  locked
                    ? window.open(UPGRADE_URL, "_blank")
                    : updateResumeSettings({ templateId: t.id })
                }
                className={cn(
                  "focus-ring relative rounded-md border px-3 py-2.5 text-left transition-colors",
                  settings.templateId === t.id
                    ? "border-gold bg-gold-soft"
                    : "border-rule hover:bg-surface-raised"
                )}
              >
                {locked && (
                  <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink/80 text-white">
                    <Lock className="h-2.5 w-2.5" />
                  </span>
                )}
                <span className={cn("flex items-center justify-between text-sm font-medium text-ink", locked && "pr-4")}>
                  {t.label}
                  {settings.templateId === t.id && <Check className="h-3.5 w-3.5 text-gold" />}
                </span>
                <span className="text-xs text-ink-soft">{t.note}</span>
              </button>
            );
          })}
        </div>
        {!isPro && (
          <p className="mt-3 text-xs text-ink-soft">
            🔒 3 more templates are available on{" "}
            <a
              href={UPGRADE_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-gold underline underline-offset-2"
            >
              Pro
            </a>
            .
          </p>
        )}
      </Card>

      <Card>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Typography &amp; spacing
        </p>
        <div className="space-y-3">
          <div>
            <Label htmlFor="font">Font</Label>
            <Select
              id="font"
              value={settings.font}
              onChange={(e) =>
                updateResumeSettings({ font: e.target.value as ResumeSettings["font"] })
              }
            >
              <option value="sans">Sans</option>
              <option value="serif">Serif</option>
              <option value="mono">Mono</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="fontSize">Font size</Label>
            <Select
              id="fontSize"
              value={settings.fontSize}
              onChange={(e) =>
                updateResumeSettings({ fontSize: e.target.value as ResumeSettings["fontSize"] })
              }
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="spacing">Spacing</Label>
            <Select
              id="spacing"
              value={settings.spacing}
              onChange={(e) =>
                updateResumeSettings({
                  spacing: e.target.value as ResumeSettings["spacing"],
                })
              }
            >
              <option value="compact">Compact</option>
              <option value="comfortable">Comfortable</option>
              <option value="roomy">Roomy</option>
            </Select>
          </div>
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
              onClick={() => updateResumeSettings({ accentColor: c })}
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
            onChange={(e) => updateResumeSettings({ accentColor: e.target.value })}
            className="h-7 w-9 cursor-pointer rounded border border-rule bg-transparent"
            aria-label="Custom accent color"
          />
        </div>
      </Card>

      <Card>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Show / hide sections
        </p>
        <div className="space-y-2">
          {sectionLabels.map((s) => (
            <label key={s.key} className="flex items-center justify-between text-sm text-ink">
              {s.label}
              <input
                type="checkbox"
                checked={settings.visibleSections[s.key]}
                onChange={(e) =>
                  updateResumeSettings({
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
  );
}
