import Link from "next/link";
import { SearchX } from "lucide-react";
import { PortfolioView } from "@/components/portfolio/portfolio-view";
import { DownloadResumeButton } from "@/components/portfolio/download-resume-button";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { mergeWithDefaults } from "@/lib/profile-merge";
import type { Profile } from "@/types/profile";

export const dynamic = "force-dynamic";

interface PublicProfileRow {
  user_id: string;
  data: Partial<Profile> | null;
  is_published: boolean;
}

export default async function PublicPortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: row } = await supabase
    .from("profiles")
    .select("user_id, data, is_published")
    .eq("username", username)
    .eq("is_published", true)
    .maybeSingle<PublicProfileRow>();

  if (!row) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-gold">
          <SearchX className="h-5 w-5" />
        </span>
        <h1 className="font-display text-xl font-semibold text-ink">
          This portfolio isn&rsquo;t available
        </h1>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          There&rsquo;s no published portfolio at /portfolio/{username}. If this is your page,
          publish it from Portfolio Settings.
        </p>
        <Link href="/dashboard" className="mt-6">
          <Button variant="outline" size="sm">
            Go to dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const profile = mergeWithDefaults(row.data);

  return (
    <div className="relative">
      <DownloadResumeButton profile={profile} ownerId={row.user_id} />
      <PortfolioView profile={profile} />
    </div>
  );
}
