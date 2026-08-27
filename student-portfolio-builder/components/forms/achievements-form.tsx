"use client";

import { Award } from "lucide-react";
import { EntryListEditor } from "@/components/forms/entry-list-editor";
import { Input, Label, Textarea, FieldError } from "@/components/ui/input";
import { useProfileStore } from "@/lib/store";
import { achievementSchema } from "@/lib/validation";
import type { Achievement } from "@/types/profile";

export function AchievementsForm() {
  const items = useProfileStore((s) => s.profile.achievements);

  return (
    <EntryListEditor<Achievement>
      arrayKey="achievements"
      items={items}
      schema={achievementSchema}
      icon={Award}
      itemLabel="Achievement"
      emptyTitle="No achievements yet"
      emptyDescription="Add awards, competitions, or recognitions."
      defaultValues={{ id: "", title: "", organization: "", date: "", description: "" }}
      renderFields={({ register, errors }) => (
        <>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} placeholder="1st Place, HackTX Hackathon" />
            <FieldError message={errors.title?.message as string} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input id="organization" {...register("organization")} placeholder="HackTX" />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" {...register("date")} placeholder="Nov 2025" />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} placeholder="What you did and why it mattered" />
          </div>
        </>
      )}
      renderSummary={(item) => (
        <div>
          <p className="font-medium text-ink">{item.title}</p>
          <p className="text-sm text-ink-soft">
            {[item.organization, item.date].filter(Boolean).join(" · ")}
          </p>
        </div>
      )}
    />
  );
}
