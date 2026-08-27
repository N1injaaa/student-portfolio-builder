"use client";

import { Layers } from "lucide-react";
import { EntryListEditor } from "@/components/forms/entry-list-editor";
import { Input, Label, Select, FieldError } from "@/components/ui/input";
import { Badge } from "@/components/ui/card";
import { useProfileStore } from "@/lib/store";
import { skillSchema } from "@/lib/validation";
import type { Skill } from "@/types/profile";

const levels: Skill["level"][] = ["Beginner", "Intermediate", "Advanced", "Expert"];

export function SkillsForm() {
  const items = useProfileStore((s) => s.profile.skills);

  return (
    <EntryListEditor<Skill>
      arrayKey="skills"
      items={items}
      schema={skillSchema}
      icon={Layers}
      itemLabel="Skill"
      emptyTitle="No skills yet"
      emptyDescription="List the languages, tools, and frameworks you know."
      defaultValues={{ id: "", name: "", category: "", level: "Intermediate" }}
      renderFields={({ register, errors }) => (
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="name">Skill name</Label>
            <Input id="name" {...register("name")} placeholder="Python" />
            <FieldError message={errors.name?.message as string} />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input id="category" {...register("category")} placeholder="Languages" />
          </div>
          <div>
            <Label htmlFor="level">Level</Label>
            <Select id="level" {...register("level")}>
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </Select>
          </div>
        </div>
      )}
      renderSummary={(item) => (
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-ink">{item.name}</p>
          {item.category && <Badge>{item.category}</Badge>}
          <Badge variant="gold">{item.level}</Badge>
        </div>
      )}
    />
  );
}
