"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input, Label, Textarea, FieldError } from "@/components/ui/input";
import { useProfileStore } from "@/lib/store";
import { overviewSchema } from "@/lib/validation";
import type { Overview } from "@/types/profile";

export function OverviewForm() {
  const overview = useProfileStore((s) => s.profile.overview);
  const updateOverview = useProfileStore((s) => s.updateOverview);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    register,
    watch,
    reset,
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
          <h2 className="font-display text-lg font-medium text-ink">Overview</h2>
          <p className="mt-1 text-sm text-ink-soft">
            This information appears at the top of your resume and portfolio.
          </p>
        </div>
        {savedAt && (
          <span className="flex items-center gap-1 text-xs text-teal">
            <Check className="h-3.5 w-3.5" /> Saved
          </span>
        )}
      </div>

      <Card className="mt-4 bg-surface-raised">
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" {...register("fullName")} placeholder="Alex Johnson" />
              <FieldError message={errors.fullName?.message} />
            </div>
            <div>
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                {...register("headline")}
                placeholder="Computer Science Student"
              />
              <FieldError message={errors.headline?.message} />
            </div>
          </div>

          <div>
            <Label htmlFor="photoUrl">Profile photo URL</Label>
            <Input
              id="photoUrl"
              {...register("photoUrl")}
              placeholder="https://example.com/photo.jpg"
            />
            <p className="mt-1 text-xs text-ink-soft">
              Paste an image link. File uploads aren&rsquo;t needed — a URL keeps your data
              portable.
            </p>
          </div>

          <div>
            <Label htmlFor="bio">Short bio</Label>
            <Textarea
              id="bio"
              {...register("bio")}
              placeholder="Building technology that solves real problems."
            />
            <FieldError message={errors.bio?.message} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...register("location")} placeholder="Austin, Texas" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email")} placeholder="you@example.com" />
              <FieldError message={errors.email?.message} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("phone")} placeholder="+1 (555) 000-0000" />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" {...register("website")} placeholder="yourname.dev" />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" {...register("linkedin")} placeholder="linkedin.com/in/you" />
            </div>
            <div>
              <Label htmlFor="github">GitHub</Label>
              <Input id="github" {...register("github")} placeholder="github.com/you" />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
