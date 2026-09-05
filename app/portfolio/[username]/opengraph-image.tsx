import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";
import { mergeWithDefaults } from "@/lib/profile-merge";
import { SITE_NAME } from "@/lib/site-config";
import type { Profile } from "@/types/profile";

// Runs on the regular Node runtime (not edge) so it can reuse the same
// cookie-aware Supabase server client as the rest of the app.
export const runtime = "nodejs";

export const alt = "Portfolio preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase
    .from("profiles")
    .select("data, is_published")
    .eq("username", username)
    .eq("is_published", true)
    .maybeSingle<{ data: Partial<Profile> | null; is_published: boolean }>();

  const profile = mergeWithDefaults(row?.data ?? null);
  const name = profile.overview.fullName || username;
  const headline = profile.overview.headline || "Student Portfolio";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#12172B",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 140,
            borderRadius: 28,
            background: "#1E2748",
            color: "#D6AF54",
            fontSize: 64,
            fontWeight: 700,
            marginBottom: 48,
          }}
        >
          {initials || "V"}
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#FBFAF7" }}>
          {name}
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#D6AF54", marginTop: 16 }}>
          {headline}
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 56,
            right: 80,
            fontSize: 24,
            color: "#8A93B8",
          }}
        >
          {SITE_NAME}
        </div>
      </div>
    ),
    { ...size }
  );
}
