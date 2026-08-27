import Link from "next/link";
import { Award, Download, ShieldAlert, Users } from "lucide-react";
import { AppNavbar } from "@/components/layout/app-navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminManager } from "@/components/admin/admin-manager";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: number;
}) {
  return (
    <Card className="flex items-center gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gold-soft text-gold">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div>
        <p className="stat-figure text-xl font-semibold text-ink">{value}</p>
        <p className="text-xs text-ink-soft">{label}</p>
      </div>
    </Card>
  );
}

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-paper">
        <AppNavbar />
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
          <h1 className="font-display text-xl font-semibold text-ink">Sign in required</h1>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">
            Sign in first, then come back to /admin.
          </p>
          <Link href="/dashboard" className="mt-6">
            <Button variant="outline" size="sm">
              Go to dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-paper">
        <AppNavbar />
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-gold">
            <ShieldAlert className="h-5 w-5" />
          </span>
          <h1 className="font-display text-xl font-semibold text-ink">Access denied</h1>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">
            This account ({user.email}) doesn&rsquo;t have admin access.
          </p>
          <Link href="/dashboard" className="mt-6">
            <Button variant="outline" size="sm">
              Back to dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const [
    { count: registeredCount },
    { count: publishedCount },
    { count: downloadCount },
    { data: recentProfiles },
    { data: admins },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("event_type", "resume_downloaded"),
    supabase
      .from("profiles")
      .select("email, full_name, username, is_published, created_at")
      .order("created_at", { ascending: false })
      .limit(20),
    supabase.from("admins").select("email, added_by, created_at").order("created_at"),
  ]);

  return (
    <div className="min-h-screen bg-paper">
      <AppNavbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Admin panel
        </h1>
        <p className="mt-1 text-sm text-ink-soft">Usage across everyone who has signed up.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard icon={Users} label="Registered" value={registeredCount ?? 0} />
          <StatCard icon={Award} label="Portfolios published" value={publishedCount ?? 0} />
          <StatCard icon={Download} label="Resumes downloaded" value={downloadCount ?? 0} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <h2 className="font-display text-lg font-medium text-ink">Recent sign-ups</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-rule text-xs uppercase tracking-wide text-ink-soft">
                    <th className="pb-2 pr-4 font-medium">Name</th>
                    <th className="pb-2 pr-4 font-medium">Email</th>
                    <th className="pb-2 pr-4 font-medium">Portfolio</th>
                    <th className="pb-2 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {(recentProfiles ?? []).map((p) => (
                    <tr key={p.email} className="border-b border-rule/60">
                      <td className="py-2 pr-4 text-ink">{p.full_name || "—"}</td>
                      <td className="py-2 pr-4 text-ink-soft">{p.email}</td>
                      <td className="py-2 pr-4 text-ink-soft">
                        {p.username ? (
                          <span className={p.is_published ? "text-teal" : "text-ink-soft"}>
                            /{p.username} {p.is_published ? "(live)" : "(draft)"}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="py-2 text-ink-soft">
                        {new Date(p.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {(recentProfiles ?? []).length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-ink-soft">
                        No one has signed up yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <h2 className="font-display text-lg font-medium text-ink">Admins</h2>
            <p className="mt-1 text-xs text-ink-soft">
              Anyone here can view this panel and add or remove other admins.
            </p>
            <div className="mt-4">
              <AdminManager admins={admins ?? []} currentUserEmail={user.email ?? ""} />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
