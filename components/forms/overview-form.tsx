"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input, Label, Textarea, FieldError } from "@/components/ui/input";
import { PhotoUpload } from "@/components/forms/photo-upload";
import { useProfileStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n/context";
import { overviewSchema } from "@/lib/validation";
import type { Overview } from "@/types/profile";

export function OverviewForm() {
  const overview = useProfileStore((s) => s.profile.overview);
  const updateOverview = useProfileStore((s) => s.updateOverview);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { t } = useLanguage();

  const {
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Overview>({
    resolver: zodResolver(overviewSchema),
    defaultValues: overview,
    mode: "onChange",
  });

  useEffect(() => {
    reset(overview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscription = watch((values) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const parsed = overviewSchema.safeParse(values);
        if (parsed.success) {
          updateOverview(parsed.data);
          setSavedAt(Date.now());
        }
      }, 500);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-medium text-ink">{t("form.overview.title")}</h2>
          <p className="mt-1 text-sm text-ink-soft">
            {t("form.overview.subtitle")}
          </p>
        </div>
        {savedAt && (
          <span className="flex items-center gap-1 text-xs text-teal">
            <Check className="h-3.5 w-3.5" /> {t("form.overview.saved")}
          </span>
        )}
      </div>

      <Card className="mt-4 bg-surface-raised">
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="fullName">{t("field.fullName")}</Label>
              <Input id="fullName" {...register("fullName")} placeholder="Alex Johnson" />
              <FieldError message={errors.fullName?.message} />
            </div>
            <div>
              <Label htmlFor="headline">{t("field.headline")}</Label>
              <Input
                id="headline"
                {...register("headline")}
                placeholder="Computer Science Student"
              />
              <FieldError message={errors.headline?.message} />
            </div>
          </div>

          <div>
            <Label htmlFor="photoUrl">{t("field.photo")}</Label>
            <div className="mt-1.5">
              <PhotoUpload
                photoUrl={watch("photoUrl")}
                onUploaded={(url) => setValue("photoUrl", url, { shouldDirty: true, shouldValidate: true })}
              />
            </div>
            <p className="mt-2 mb-1.5 text-xs text-ink-soft">
              {t("field.photoOr")}
            </p>
            <Input
              id="photoUrl"
              {...register("photoUrl")}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div>
            <Label htmlFor="bio">{t("field.bio")}</Label>
            <Textarea
              id="bio"
              {...register("bio")}
              placeholder="Building technology that solves real problems."
            />
            <FieldError message={errors.bio?.message} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="location">{t("field.location")}</Label>
              <Input id="location" {...register("location")} placeholder="Austin, Texas" />
            </div>
            <div>
              <Label htmlFor="email">{t("field.email")}</Label>
              <Input id="email" {...register("email")} placeholder="you@example.com" />
              <FieldError message={errors.email?.message} />
            </div>
            <div>
              <Label htmlFor="phone">{t("field.phone")}</Label>
              <Input id="phone" {...register("phone")} placeholder="+1 (555) 000-0000" />
            </div>
            <div>
              <Label htmlFor="website">{t("field.website")}</Label>
              <Input id="website" {...register("website")} placeholder="yourname.dev" />
            </div>
            <div>
              <Label htmlFor="linkedin">{t("field.linkedin")}</Label>
              <Input id="linkedin" {...register("linkedin")} placeholder="linkedin.com/in/you" />
            </div>
            <div>
              <Label htmlFor="github">{t("field.github")}</Label>
              <Input id="github" {...register("github")} placeholder="github.com/you" />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
