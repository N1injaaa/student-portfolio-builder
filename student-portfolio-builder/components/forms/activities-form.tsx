"use client";

import { Users } from "lucide-react";
import { EntryListEditor } from "@/components/forms/entry-list-editor";
import { Input, Label, Textarea, FieldError } from "@/components/ui/input";
import { useProfileStore } from "@/lib/store";
import { activitySchema } from "@/lib/validation";
import { formatDateRange } from "@/lib/utils";
import type { Activity } from "@/types/profile";

export function ActivitiesForm() {
  const items = useProfileStore((s) => s.profile.activities);

  return (
    <EntryListEditor<Activity>
      arrayKey="activities"
      items={items}
      schema={activitySchema}
      icon={Users}
      itemLabel="Activity"
      emptyTitle="No activities yet"
      emptyDescription="Add clubs, volunteering, or extracurricular leadership."
      defaultValues={{
        id: "",
        organization: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      }}
      renderFields={({ register, errors }) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input id="organization" {...register("organization")} placeholder="Code for Austin" />
              <FieldError message={errors.organization?.message as string} />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input id="position" {...register("position")} placeholder="Volunteer Developer" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="startDate">Start date</Label>
              <Input id="startDate" {...register("startDate")} placeholder="2023" />
            </div>
            <div>
              <Label htmlFor="endDate">End date</Label>
              <Input id="endDate" {...register("endDate")} placeholder="Present" />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} placeholder="What you did there" />
          </div>
        </>
      )}
      renderSummary={(item) => (
        <div>
          <p className="font-medium text-ink">{item.organization}</p>
          <p className="text-sm text-ink-soft">{item.position}</p>
          <p className="mt-1 text-xs text-ink-soft">
            {formatDateRange(item.startDate, item.endDate)}
          </p>
        </div>
      )}
    />
  );
}
