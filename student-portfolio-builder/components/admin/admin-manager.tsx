"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/lib/toast-store";

interface AdminRow {
  email: string;
  added_by: string | null;
  created_at: string;
}

export function AdminManager({
  admins,
  currentUserEmail,
}: {
  admins: AdminRow[];
  currentUserEmail: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    setSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("admins")
      .insert({ email: trimmed, added_by: currentUserEmail });
    setSubmitting(false);
    if (error) {
      toast({
        title: "Couldn't add admin",
        description: error.message,
        variant: "error",
      });
      return;
    }
    toast({ title: "Admin added", description: trimmed, variant: "success" });
    setEmail("");
    router.refresh();
  }

  async function handleRemove(targetEmail: string) {
    if (targetEmail === currentUserEmail) {
      toast({
        title: "Can't remove yourself",
        description: "Ask another admin to do this, so no one gets locked out.",
        variant: "error",
      });
      return;
    }
    const supabase = createClient();
    const { error } = await supabase.from("admins").delete().eq("email", targetEmail);
    if (error) {
      toast({ title: "Couldn't remove admin", description: error.message, variant: "error" });
      return;
    }
    toast({ title: "Admin removed", description: targetEmail });
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={handleAdd} className="flex gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="someone@gmail.com"
          required
        />
        <Button type="submit" size="sm" disabled={submitting}>
          {submitting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <UserPlus className="h-3.5 w-3.5" />
          )}
          Add
        </Button>
      </form>

      <div className="mt-4 space-y-2">
        {admins.map((a) => (
          <div
            key={a.email}
            className="flex items-center justify-between rounded-md border border-rule px-3 py-2 text-sm"
          >
            <div>
              <p className="text-ink">
                {a.email}
                {a.email === currentUserEmail && (
                  <span className="ml-2 text-xs text-ink-soft">(you)</span>
                )}
              </p>
              {a.added_by && (
                <p className="text-xs text-ink-soft">added by {a.added_by}</p>
              )}
            </div>
            <button
              onClick={() => handleRemove(a.email)}
              className="focus-ring rounded p-1.5 text-ink-soft hover:text-clay"
              aria-label={`Remove ${a.email}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
