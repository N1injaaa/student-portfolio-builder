"use client";

import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useProfileStore } from "@/lib/store";
import { useLanguage } from "@/lib/i18n/context";
import { toast } from "@/lib/toast-store";

const MAX_SIZE_BYTES = 3 * 1024 * 1024; // 3MB — plenty for a profile photo, keeps uploads fast.

interface PhotoUploadProps {
  photoUrl: string;
  /** Called with the new public URL once the upload finishes, so the
   * caller can push it into its own form state (e.g. react-hook-form's
   * setValue) and let the existing autosave flow pick it up. */
  onUploaded: (url: string) => void;
}

export function PhotoUpload({ photoUrl, onUploaded }: PhotoUploadProps) {
  const userId = useProfileStore((s) => s.userId);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file || !userId) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Please choose an image file", variant: "error" });
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      toast({ title: "Image is too large", description: "Max 3MB.", variant: "error" });
      return;
    }

    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "jpg";
      // Fixed filename per user (not a random one) so re-uploading replaces
      // the old photo instead of accumulating orphaned files in storage.
      const path = `${userId}/photo.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, cacheControl: "3600" });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      // Cache-bust so the new photo shows immediately instead of a
      // browser-cached copy of the previous upload at the same path.
      const bustedUrl = `${data.publicUrl}?v=${Date.now()}`;

      onUploaded(bustedUrl);
      toast({ title: "Photo uploaded", variant: "success" });
    } catch (err) {
      console.error("Photo upload failed:", err);
      toast({ title: "Upload failed", description: "Please try again.", variant: "error" });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl}
          alt=""
          className="h-12 w-12 shrink-0 rounded-full border border-rule object-cover"
        />
      ) : (
        <div className="h-12 w-12 shrink-0 rounded-full border border-dashed border-rule" />
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="focus-ring inline-flex items-center gap-1.5 rounded-md border border-rule px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-surface-raised disabled:opacity-60"
      >
        {uploading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Upload className="h-3.5 w-3.5" />
        )}
        {uploading ? t("field.uploading") : t("field.uploadPhoto")}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
