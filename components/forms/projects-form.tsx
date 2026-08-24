"use client";

import { Briefcase } from "lucide-react";
import { EntryListEditor } from "@/components/forms/entry-list-editor";
import { Input, Label, Textarea, FieldError } from "@/components/ui/input";
import { Badge } from "@/components/ui/card";
import { useProfileStore } from "@/lib/store";
import { projectSchema } from "@/lib/validation";
import type { Project } from "@/types/profile";

export function ProjectsForm() {
  const items = useProfileStore((s) => s.profile.projects);

  return (
    <EntryListEditor<Project>
      arrayKey="projects"
      items={items}
      schema={projectSchema}
      icon={Briefcase}
      itemLabel="Project"
      emptyTitle="No projects yet"
      emptyDescription="Showcase what you've built — even a small side project counts."
      defaultValues={{
        id: "",
        name: "",
        description: "",
        technologies: "",
        githubUrl: "",
        liveUrl: "",
        imageUrl: "",
      }}
      renderFields={({ register, errors }) => (
        <>
          <div>
            <Label htmlFor="name">Project name</Label>
            <Input id="name" {...register("name")} placeholder="AI Study Planner" />
            <FieldError message={errors.name?.message as string} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="What it does and why you built it"
            />
          </div>
          <div>
            <Label htmlFor="technologies">Technologies</Label>
            <Input
              id="technologies"
              {...register("technologies")}
              placeholder="Next.js, TypeScript, Python"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input id="githubUrl" {...register("githubUrl")} placeholder="github.com/you/project" />
            </div>
            <div>
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input id="liveUrl" {...register("liveUrl")} placeholder="project.yourname.dev" />
            </div>
          </div>
          <div>
            <Label htmlFor="imageUrl">Project image URL</Label>
            <Input id="imageUrl" {...register("imageUrl")} placeholder="https://example.com/screenshot.png" />
          </div>
        </>
      )}
      renderSummary={(item) => (
        <div>
          <p className="font-medium text-ink">{item.name}</p>
          {item.description && (
            <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{item.description}</p>
          )}
          {item.technologies && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.technologies.split(",").map((t) => (
                <Badge key={t}>{t.trim()}</Badge>
              ))}
            </div>
          )}
        </div>
      )}
    />
  );
}
