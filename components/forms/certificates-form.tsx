"use client";

import { FileBadge } from "lucide-react";
import { EntryListEditor } from "@/components/forms/entry-list-editor";
import { Input, Label, FieldError } from "@/components/ui/input";
import { useProfileStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n/context";
import { certificateSchema } from "@/lib/validation";
import type { Certificate } from "@/types/profile";

export function CertificatesForm() {
  const items = useProfileStore((s) => s.profile.certificates);
  const { t } = useLanguage();

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
            <Label htmlFor="name">{t("field.certificateName")}</Label>
            <Input id="name" {...register("name")} placeholder="Machine Learning Specialization" />
            <FieldError message={errors.name?.message as string} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="organization">{t("field.organization")}</Label>
              <Input id="organization" {...register("organization")} placeholder="DeepLearning.AI" />
            </div>
            <div>
              <Label htmlFor="date">{t("field.date")}</Label>
              <Input id="date" {...register("date")} placeholder="Aug 2025" />
            </div>
          </div>
          <div>
            <Label htmlFor="credentialUrl">{t("field.credentialUrl")}</Label>
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
