"use client";

import { GraduationCap } from "lucide-react";
import { EntryListEditor } from "@/components/forms/entry-list-editor";
import { Input, Label, Textarea, FieldError } from "@/components/ui/input";
import { useProfileStore } from "@/lib/store";
import { educationSchema } from "@/lib/validation";
import { formatDateRange } from "@/lib/utils";
import type { Education } from "@/types/profile";

export function EducationForm() {
  const items = useProfileStore((s) => s.profile.education);

  return (
    <EntryListEditor<Education>
      arrayKey="education"
      items={items}
      schema={educationSchema}
      icon={GraduationCap}
      itemLabel="Education"
      emptyTitle="No education yet"
      emptyDescription="Add your school or university to start your timeline."
      defaultValues={{
        id: "",
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        gpa: "",
        description: "",
      }}
      renderFields={({ register, errors }) => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="school">School / University</Label>
              <Input id="school" {...register("school")} placeholder="University of Texas at Austin" />
              <FieldError message={errors.school?.message as string} />
            </div>
            <div>
              <Label htmlFor="degree">Degree / Grade</Label>
              <Input id="degree" {...register("degree")} placeholder="B.S. in Computer Science" />
              <FieldError message={errors.degree?.message as string} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="startDate">Start date</Label>
              <Input id="startDate" {...register("startDate")} placeholder="2022" />
            </div>
            <div>
              <Label htmlFor="endDate">End date</Label>
              <Input id="endDate" {...register("endDate")} placeholder="2026" />
            </div>
            <div>
              <Label htmlFor="gpa">GPA</Label>
              <Input id="gpa" {...register("gpa")} placeholder="3.85 / 4.0" />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} placeholder="Relevant coursework, honors, activities…" />
          </div>
        </>
      )}
      renderSummary={(item) => (
        <div>
          <p className="font-medium text-ink">{item.school}</p>
          <p className="text-sm text-ink-soft">{item.degree}</p>
          <p className="mt-1 text-xs text-ink-soft">
            {formatDateRange(item.startDate, item.endDate)}
            {item.gpa ? ` · GPA ${item.gpa}` : ""}
          </p>
        </div>
      )}
    />
  );
}
