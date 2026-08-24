"use client";

import { FileBadge } from "lucide-react";
import { EntryListEditor } from "@/components/forms/entry-list-editor";
import { Input, Label, FieldError } from "@/components/ui/input";
import { useProfileStore } from "@/lib/store";
import { certificateSchema } from "@/lib/validation";
import type { Certificate } from "@/types/profile";

export function CertificatesForm() {
  const items = useProfileStore((s) => s.profile.certificates);

  return (
    <EntryListEditor<Certificate>
      arrayKey="certificates"
      items={items}
      schema={certificateSchema}
      icon={FileBadge}
      itemLabel="Certificate"
      emptyTitle="No certificates yet"
      emptyDescription="Add certifications, online courses, or credentials."
      defaultValues={{ id: "", name: "", organization: "", date: "", credentialUrl: "" }}
      renderFields={({ register, errors }) => (
        <>
          <div>
            <Label htmlFor="name">Certificate name</Label>
            <Input id="name" {...register("name")} placeholder="Machine Learning Specialization" />
            <FieldError message={errors.name?.message as string} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input id="organization" {...register("organization")} placeholder="DeepLearning.AI" />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" {...register("date")} placeholder="Aug 2025" />
            </div>
          </div>
          <div>
            <Label htmlFor="credentialUrl">Credential URL</Label>
            <Input id="credentialUrl" {...register("credentialUrl")} placeholder="coursera.org/verify/…" />
          </div>
        </>
      )}
      renderSummary={(item) => (
        <div>
          <p className="font-medium text-ink">{item.name}</p>
          <p className="text-sm text-ink-soft">
            {[item.organization, item.date].filter(Boolean).join(" · ")}
          </p>
        </div>
      )}
    />
  );
}
