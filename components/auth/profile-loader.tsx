"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useProfileStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";
import { mergeWithDefaults } from "@/lib/profile-merge";
import { trackEvent } from "@/lib/track-event";
import type { Profile } from "@/types/profile";

export function ProfileLoader({ userId, children }: { userId: string; children: ReactNode }) {
  const loadProfile = useProfileStore((s) => s.loadProfile);
  const setLoadError = useProfileStore((s) => s.setLoadError);
  const loadedForUser = useRef<string | null>(null);

  // Initial load: fetch this user's row once when they sign in.
  useEffect(() => {
    if (loadedForUser.current === userId) return;
    let cancelled = false;
    const supabase = createClient();

    async function load() {
      const { data, error } = await supabase
        .from("profiles")
        .select("data, is_pro")
        .eq("user_id", userId)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Failed to load profile from Supabase:", error.message);
        setLoadError(error.message);
        return;
      }

      if (!data) {
        // No row yet — normally the sign-up trigger creates one instantly, but
        // just in case, create it now instead of getting stuck.
        const { data: userData } = await supabase.auth.getUser();
        const { error: insertError } = await supabase.from("profiles").insert({
          user_id: userId,
          email: userData.user?.email ?? "",
        });
        if (cancelled) return;
        if (insertError) {
          console.error("Failed to create profile row:", insertError.message);
          setLoadError(insertError.message);
          return;
        }
      }

      loadedForUser.current = userId;
      loadProfile(
        userId,
        mergeWithDefaults((data?.data as Partial<Profile> | null) ?? null),
        Boolean(data?.is_pro)
      );
    }

    load().catch((err) => {
      if (cancelled) return;
      console.error("Unexpected error loading profile:", err);
      setLoadError(err instanceof Error ? err.message : "Unknown error");
    });

    return () => {
      cancelled = true;
    };
  }, [userId, loadProfile, setLoadError]);

  // Debounced autosave: push the profile back to Supabase shortly after each change.
  useEffect(() => {
    const supabase = createClient();
    let timer: ReturnType<typeof setTimeout> | null = null;

    const unsubscribe = useProfileStore.subscribe((state, prevState) => {
      if (state.userId !== userId) return;
      if (state.profile === prevState.profile) return;
      if (loadedForUser.current !== userId) return; // skip the write triggered by the initial load

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        supabase
          .from("profiles")
          .update({
            data: state.profile,
            username: state.profile.portfolioSettings.username || null,
            is_published: state.profile.portfolioSettings.isPublished,
            full_name: state.profile.overview.fullName || null,
          })
          .eq("user_id", userId)
          .then(({ error }) => {
            if (error) console.error("Failed to save profile to Supabase:", error.message);
          });

        const wasPublished = prevState.profile.portfolioSettings.isPublished;
        const isPublished = state.profile.portfolioSettings.isPublished;
        if (isPublished && !wasPublished) {
          trackEvent("portfolio_published", userId);
        }
      }, 700);
    });

    return () => {
      if (timer) clearTimeout(timer);
      unsubscribe();
    };
  }, [userId]);

  return <>{children}</>;
}