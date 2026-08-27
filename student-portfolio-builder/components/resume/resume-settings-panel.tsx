"use client";

import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label, Select } from "@/components/ui/input";
import { useProfileStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { ResumeTemplateId, ResumeSettings } from "@/types/profile";

const templates: { id: ResumeTemplateId; label: string; note: string }[] = [
  { id: "minimal", label: "Minimal", note: "Quiet type, single column" },
  { id: "modern", label: "Modern", note: "Bold accent header" },
  { id: "academic", label: "Academic", note: "Serif, transcript-style" },
  { id: "professional", label: "Professional", note: "Two-column, dense" },
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

  return (
    <div className="space-y-5">
      <Card>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Template
        </p>
        <div className="grid grid-cols-2 gap-2">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => updateResumeSettings({ templateId: t.id })}
              className={cn(
                "focus-ring rounded-md border px-3 py-2.5 text-left transition-colors",
                settings.templateId === t.id
                  ? "border-gold bg-gold-soft"
                  : "border-rule hover:bg-surface-raised"
              )}
            >
              <span className="flex items-center justify-between text-sm font-medium text-ink">
                {t.label}
                {settings.templateId === t.id && <Check className="h-3.5 w-3.5 text-gold" />}
              </span>
              <span className="text-xs text-ink-soft">{t.note}</span>
            </button>
          ))}
        </div>
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
