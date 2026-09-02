"use client";

import { create } from "zustand";
import { newId } from "@/lib/utils";
import { buildDemoProfile } from "@/lib/demo-data";
import {
  emptyProfile,
  type Overview,
  type PortfolioSettings,
  type Profile,
  type ResumeSettings,
  type ResumeVersion,
} from "@/types/profile";

type ArrayKey =
  | "education"
  | "achievements"
  | "projects"
  | "skills"
  | "languages"
  | "certificates"
  | "activities";

interface ProfileState {
  profile: Profile;
  /** True once the profile has been loaded from Supabase for the signed-in user. */
  hasHydrated: boolean;
  /** The user_id this profile belongs to. Used to avoid saving stale data across accounts. */
  userId: string | null;
  /**
   * Whether this account has paid access. Deliberately kept OUTSIDE
   * `profile` (which the client freely rewrites and autosaves wholesale
   * on every edit) — it's only ever set by `loadProfile` from the
   * server-controlled `is_pro` column, never written back by the client.
   */
  isPro: boolean;
  /** Set when the initial profile fetch fails, so AuthGate can show a retry screen. */
  loadError: string | null;
  loadProfile: (userId: string, profile: Profile, isPro: boolean) => void;
  setLoadError: (message: string | null) => void;
  clearProfile: () => void;
  loadDemoProfile: () => void;
  updateOverview: (overview: Partial<Overview>) => void;
  updateResumeSettings: (settings: Partial<ResumeSettings>) => void;
  updatePortfolioSettings: (settings: Partial<PortfolioSettings>) => void;
  addItem: <T extends { id: string }>(key: ArrayKey, item: Omit<T, "id"> | T) => void;
  updateItem: <T extends { id: string }>(key: ArrayKey, id: string, item: Partial<T>) => void;
  removeItem: (key: ArrayKey, id: string) => void;
  reorderItems: (key: ArrayKey, fromIndex: number, toIndex: number) => void;
  /** Bumps the lifetime PDF export counter used by the free-tier download cap. */
  incrementResumeExportCount: () => void;
  /** Saves the current resumeSettings as a new named version (e.g. "Frontend internship"). */
  saveResumeVersion: (name: string) => void;
  /** Applies a saved version's settings as the live resumeSettings and marks it active. */
  switchToResumeVersion: (id: string) => void;
  /** Switches back to the original (unsaved) default settings, clearing the active version. */
  switchToDefaultResume: () => void;
  deleteResumeVersion: (id: string) => void;
}

export const useProfileStore = create<ProfileState>()((set) => ({
  profile: emptyProfile,
  hasHydrated: false,
  userId: null,
  isPro: false,
  loadError: null,
  loadProfile: (userId, profile, isPro) =>
    set({ userId, profile, isPro, hasHydrated: true, loadError: null }),
  setLoadError: (message) => set({ loadError: message }),
  clearProfile: () =>
    set({ userId: null, profile: emptyProfile, isPro: false, hasHydrated: false, loadError: null }),
  loadDemoProfile: () =>
    set((state) => {
      const demo = buildDemoProfile();
      return {
        profile: {
          ...demo,
          portfolioSettings: {
            ...demo.portfolioSettings,
            // Keep whatever username this account already has (or none) instead
            // of forcing "alex" on every account that loads the demo data —
            // usernames are unique across all users now that storage is shared.
            username: state.profile.portfolioSettings.username,
            isPublished: false,
          },
        },
      };
    }),
  updateOverview: (overview) =>
    set((state) => ({
      profile: {
        ...state.profile,
        overview: { ...state.profile.overview, ...overview },
      },
    })),
  updateResumeSettings: (settings) =>
    set((state) => ({
      profile: {
        ...state.profile,
        resumeSettings: { ...state.profile.resumeSettings, ...settings },
      },
    })),
  updatePortfolioSettings: (settings) =>
    set((state) => ({
      profile: {
        ...state.profile,
        portfolioSettings: { ...state.profile.portfolioSettings, ...settings },
      },
    })),
  addItem: (key, item) =>
    set((state) => {
      // Allow callers to pass a pre-generated id (used by the entry-list
      // editor to sync a draft into the live preview before it's formally
      // saved) — fall back to generating one when it's absent, as before.
      const providedId = (item as Partial<{ id: string }>).id;
      const id = providedId && providedId.length > 0 ? providedId : newId();
      return {
        profile: {
          ...state.profile,
          [key]: [...(state.profile[key] as { id: string }[]), { ...item, id }],
        },
      };
    }),
  updateItem: (key, id, item) =>
    set((state) => ({
      profile: {
        ...state.profile,
        [key]: (state.profile[key] as { id: string }[]).map((entry) =>
          entry.id === id ? { ...entry, ...item } : entry
        ),
      },
    })),
  removeItem: (key, id) =>
    set((state) => ({
      profile: {
        ...state.profile,
        [key]: (state.profile[key] as { id: string }[]).filter((entry) => entry.id !== id),
      },
    })),
  reorderItems: (key, fromIndex, toIndex) =>
    set((state) => {
      const list = [...(state.profile[key] as { id: string }[])];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { profile: { ...state.profile, [key]: list } };
    }),
  incrementResumeExportCount: () =>
    set((state) => ({
      profile: {
        ...state.profile,
        resumeExportCount: state.profile.resumeExportCount + 1,
      },
    })),
  saveResumeVersion: (name) =>
    set((state) => {
      const version: ResumeVersion = {
        id: newId(),
        name,
        settings: { ...state.profile.resumeSettings },
      };
      return {
        profile: {
          ...state.profile,
          resumeVersions: [...state.profile.resumeVersions, version],
          activeResumeVersionId: version.id,
        },
      };
    }),
  switchToResumeVersion: (id) =>
    set((state) => {
      const version = state.profile.resumeVersions.find((v) => v.id === id);
      if (!version) return state;
      return {
        profile: {
          ...state.profile,
          resumeSettings: { ...version.settings },
          activeResumeVersionId: id,
        },
      };
    }),
  switchToDefaultResume: () =>
    set((state) => ({
      profile: { ...state.profile, activeResumeVersionId: null },
    })),
  deleteResumeVersion: (id) =>
    set((state) => ({
      profile: {
        ...state.profile,
        resumeVersions: state.profile.resumeVersions.filter((v) => v.id !== id),
        activeResumeVersionId:
          state.profile.activeResumeVersionId === id ? null : state.profile.activeResumeVersionId,
      },
    })),
}));

export type { ArrayKey };
