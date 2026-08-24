"use client";

import type { ReactNode } from "react";
import { BookMarked, Loader2, AlertTriangle } from "lucide-react";
import { useSupabaseUser } from "@/hooks/use-supabase-user";
import { GoogleSignInButton } from "@/components/auth/sign-in-button";
import { ProfileLoader } from "@/components/auth/profile-loader";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/lib/store";

export function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading } = useSupabaseUser();
  const hasHydrated = useProfileStore((s) => s.hasHydrated);
  const storeUserId = useProfileStore((s) => s.userId);
  const loadError = useProfileStore((s) => s.loadError);
  const setLoadError = useProfileStore((s) => s.setLoadError);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-ink-soft" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-gold">
          <BookMarked className="h-5 w-5" />
        </span>
        <h1 className="font-display text-xl font-semibold text-ink">Sign in to continue</h1>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          Your resume and portfolio data is saved to your account, so you can pick up where you
          left off from any device.
        </p>
        <div className="mt-6">
          <GoogleSignInButton />
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-clay/10 text-clay">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <h1 className="font-display text-xl font-semibold text-ink">Couldn&rsquo;t load your profile</h1>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">{loadError}</p>
        <Button className="mt-6" size="sm" onClick={() => setLoadError(null)}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <ProfileLoader userId={user.id}>
      {hasHydrated && storeUserId === user.id ? (
        children
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-ink-soft" />
        </div>
      )}
    </ProfileLoader>
  );
}
