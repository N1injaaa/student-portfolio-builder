"use client";

import { createClient } from "@/lib/supabase/client";

export type TrackedEvent = "portfolio_published" | "resume_downloaded";

/**
 * Fire-and-forget analytics event. `portfolioOwnerId` identifies whose
 * portfolio the event is about (may differ from the signed-in visitor,
 * e.g. a stranger downloading someone else's public resume).
 */
export async function trackEvent(eventType: TrackedEvent, portfolioOwnerId?: string | null) {
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    await supabase.from("events").insert({
      event_type: eventType,
      user_id: data.user?.id ?? null,
      portfolio_owner_id: portfolioOwnerId ?? null,
    });
  } catch {
    // Analytics should never break the user-facing feature it's attached to.
  }
}
