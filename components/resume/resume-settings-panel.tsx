"use client";

import { useState } from "react";
import { Check, Lock, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { useProfileStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { UPGRADE_URL } from "@/lib/upgrade";
import { FONT_OPTIONS } from "@/lib/fonts";
import type { ResumeTemplateId, ResumeSettings } from "@/types/profile";

const FREE_VERSION_LIMIT = 1;

const templates: { id: ResumeTemplateId; noteKey: string; pro?: boolean }[] = [
  { id: "minimal", noteKey: "resumeSettings.templateNote.minimal" },
  { id: "modern", noteKey: "resumeSettings.templateNote.modern", pro: true },
  { id: "academic", noteKey: "resumeSettings.templateNote.academic", pro: true },
  { id: "professional", noteKey: "resumeSettings.templateNote.professional", pro: true },
];

const templateDisplayNames: Record<ResumeTemplateId, string> = {
  minimal: "Minimal",
  modern: "Modern",
  academic: "Academic",
  professional: "Professional",
};

const accentPresets = ["#a57c1b", "#275c4f", "#1b2130", "#a5472f", "#3b5bab"];

const sectionKeys: (keyof ResumeSettings["visibleSections"])[] = [
  "education",
  "projects",
  "achievements",
  "skills",
  "languages",
  "certificates",
  "activities",
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
  const { t } = useLanguage();

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
          {t("resumeSettings.versionsTitle")}
        </p>
        <p className="mb-3 text-xs text-ink-soft">
          {t("resumeSettings.versionsHint")}
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
            {t("resumeSettings.default")}
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
                aria-label={`${t("resumeSettings.deleteVersion")} ${v.name}`}
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
              placeholder={t("resumeSettings.namePlaceholder")}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && confirmSaveVersion()}
              className="h-8 text-xs"
            />
            <Button size="sm" onClick={confirmSaveVersion}>
              {t("common.save")}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsNaming(false)}>
              {t("common.cancel")}
            </Button>
          </div>
        ) : (
          <button
            onClick={startSaveVersion}
            className="focus-ring mt-3 flex items-center gap-1 text-xs font-medium text-gold hover:underline"
          >
            <Plus className="h-3 w-3" />
            {t("resumeSettings.saveAsNew")}
          </button>
        )}
        {!isPro && versions.length >= FREE_VERSION_LIMIT && (
          <p className="mt-2 text-xs text-ink-soft">
            {t("resumeSettings.freeLimitPrefix")}{" "}
            <a
              href={UPGRADE_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-gold underline underline-offset-2"
            >
              {t("resumeSettings.upgrade")}
            </a>{" "}
            {t("resumeSettings.freeLimitSuffix")}
          </p>
        )}
      </Card>

      <Card>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          {t("resumeSettings.templateTitle")}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {templates.map((tpl) => {
            const locked = tpl.pro && !isPro;
            return (
              <button
                key={tpl.id}
                onClick={() =>
                  locked
                    ? window.open(UPGRADE_URL, "_blank")
                    : updateResumeSettings({ templateId: tpl.id })
                }
                className={cn(
                  "focus-ring relative rounded-md border px-3 py-2.5 text-left transition-colors",
                  settings.templateId === tpl.id
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
                  {templateDisplayNames[tpl.id]}
                  {settings.templateId === tpl.id && <Check className="h-3.5 w-3.5 text-gold" />}
                </span>
                <span className="text-xs text-ink-soft">{t(tpl.noteKey)}</span>
              </button>
            );
          })}
        </div>
        {!isPro && (
          <p className="mt-3 text-xs text-ink-soft">
            {t("resumeSettings.moreTemplatesPrefix")}{" "}
            <a
              href={UPGRADE_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-gold underline underline-offset-2"
            >
              {t("resumeSettings.pro")}
            </a>
            .
          </p>
        )}
      </Card>

      <Card>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          {t("resumeSettings.font")}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {FONT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => updateResumeSettings({ font: opt.id })}
              className={cn(
                "focus-ring rounded-md border px-3 py-2.5 text-left transition-colors",
                settings.font === opt.id
                  ? "border-gold bg-gold-soft"
                  : "border-rule hover:bg-surface-raised"
              )}
              style={{ fontFamily: opt.family }}
            >
              <span className="flex items-center justify-between text-base text-ink">
                {opt.label}
                {settings.font === opt.id && <Check className="h-3.5 w-3.5 shrink-0 text-gold" />}
              </span>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          {t("resumeSettings.typographyTitle")}
        </p>
        <div className="space-y-3">
          <div>
            <Label htmlFor="fontSize">{t("resumeSettings.fontSize")}</Label>
            <Select
              id="fontSize"
              value={settings.fontSize}
              onChange={(e) =>
                updateResumeSettings({ fontSize: e.target.value as ResumeSettings["fontSize"] })
              }
            >
              <option value="sm">{t("resumeSettings.small")}</option>
              <option value="md">{t("resumeSettings.medium")}</option>
              <option value="lg">{t("resumeSettings.large")}</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="spacing">{t("resumeSettings.spacing")}</Label>
            <Select
              id="spacing"
              value={settings.spacing}
              onChange={(e) =>
                updateResumeSettings({
                  spacing: e.target.value as ResumeSettings["spacing"],
                })
              }
            >
              <option value="compact">{t("resumeSettings.compact")}</option>
              <option value="comfortable">{t("resumeSettings.comfortable")}</option>
              <option value="roomy">{t("resumeSettings.roomy")}</option>
            </Select>
          </div>
        </div>
      </Card>

      <Card>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          {t("resumeSettings.accentColorTitle")}
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
              aria-label={`${t("resumeSettings.useAccentColor")} ${c}`}
            />
          ))}
          <input
            type="color"
            value={settings.accentColor}
            onChange={(e) => updateResumeSettings({ accentColor: e.target.value })}
            className="h-7 w-9 cursor-pointer rounded border border-rule bg-transparent"
            aria-label={t("a11y.customAccentColor")}
          />
        </div>
      </Card>

      <Card>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          {t("resumeSettings.sectionsTitle")}
        </p>
        <div className="space-y-2">
          {sectionKeys.map((key) => (
            <label key={key} className="flex items-center justify-between text-sm text-ink">
              {t(`editor.section.${key}`)}
              <input
                type="checkbox"
                checked={settings.visibleSections[key]}
                onChange={(e) =>
                  updateResumeSettings({
                    visibleSections: {
                      ...settings.visibleSections,
                      [key]: e.target.checked,
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
