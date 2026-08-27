"use client";

import { useProfileStore } from "@/lib/store";

export function useHydratedProfile() {
  const hasHydrated = useProfileStore((s) => s.hasHydrated);
  const profile = useProfileStore((s) => s.profile);
  return { hasHydrated, profile };
}
