"use client";

import { Languages as LanguagesIcon } from "lucide-react";
import { EntryListEditor } from "@/components/forms/entry-list-editor";
import { Input, Label, Select, FieldError } from "@/components/ui/input";
import { Badge } from "@/components/ui/card";
import { useProfileStore } from "@/lib/store";
import { languageSchema } from "@/lib/validation";
import type { Language } from "@/types/profile";

const levels: Language["level"][] = ["Native", "Fluent", "Advanced", "Intermediate", "Basic"];

export function LanguagesForm() {
  const items = useProfileStore((s) => s.profile.languages);

  return (
    <EntryListEditor<Language>
      arrayKey="languages"
      items={items}
      schema={languageSchema}
      icon={LanguagesIcon}
      itemLabel="Language"
      emptyTitle="No languages yet"
      emptyDescription="Add the languages you speak and your fluency level."
      defaultValues={{ id: "", language: "", level: "Fluent" }}
      renderFields={({ register, errors }) => (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="language">Language</Label>
            <Input id="language" {...register("language")} placeholder="Spanish" />
            <FieldError message={errors.language?.message as string} />
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
        <div className="flex items-center gap-2">
          <p className="font-medium text-ink">{item.language}</p>
          <Badge variant="teal">{item.level}</Badge>
        </div>
      )}
    />
  );
}
