"use client";

import Link from "next/link";
import {
  Award,
  BookOpen,
  Briefcase,
  FileText,
  Globe2,
  Layers,
  Sparkles,
  Wand2,
} from "lucide-react";
import { AppNavbar } from "@/components/layout/app-navbar";
import { AuthGate } from "@/components/auth/auth-gate";
import { Card, ProgressBar } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/lib/store";
import { calculateCompletion } from "@/lib/utils";
import { toast } from "@/lib/toast-store";
import { UPGRADE_URL } from "@/lib/upgrade";

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Award;
  label: string;
  value: string | number;
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

function DashboardContent() {
  const profile = useProfileStore((s) => s.profile);
  const isPro = useProfileStore((s) => s.isPro);
  const loadDemoProfile = useProfileStore((s) => s.loadDemoProfile);

  const { percent, missing } = calculateCompletion(profile);
  const isEmpty =
    !profile.overview.fullName &&
    profile.education.length === 0 &&
    profile.projects.length === 0;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {profile.overview.fullName
              ? `Welcome back, ${profile.overview.fullName.split(" ")[0]}`
              : "Welcome"}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Here&rsquo;s where your resume and portfolio stand.
          </p>
        </div>
        {isEmpty && (
          <Button
            variant="outline"
            onClick={() => {
              loadDemoProfile();
              toast({
                title: "Demo profile loaded",
                description: "Explore the app with Alex Johnson's sample data.",
                variant: "success",
              });
            }}
          >
            <Wand2 className="h-4 w-4" />
            Load demo profile
          </Button>
        )}
      </div>

      {!isPro && (
        <Card className="mt-6 flex flex-wrap items-center justify-between gap-4 border-gold/40 bg-gold-soft">
          <div>
            <p className="font-display text-sm font-medium text-ink">
              Unlock every theme and drop the footer badge
            </p>
            <p className="mt-0.5 text-xs text-ink-soft">
              Pro gives you all 8 portfolio themes and removes the &ldquo;Built with&rdquo; footer.
            </p>
          </div>
          <a href={UPGRADE_URL} target="_blank" rel="noreferrer">
            <Button size="sm">Upgrade to Pro</Button>
          </a>
        </Card>
      )}

      {isEmpty ? (
        <Card className="mt-8 flex flex-col items-center gap-4 py-14 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft text-gold">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg font-medium text-ink">
              Your profile is empty
            </p>
            <p className="mt-1 max-w-sm text-sm text-ink-soft">
              Add your first education entry or project to start building
              your resume and portfolio.
            </p>
          </div>
          <Link href="/editor?section=overview">
            <Button>Complete my profile</Button>
          </Link>
        </Card>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Briefcase} label="Projects" value={profile.projects.length} />
            <StatCard icon={Award} label="Achievements" value={profile.achievements.length} />
            <StatCard icon={FileText} label="Certificates" value={profile.certificates.length} />
            <StatCard icon={Layers} label="Skills" value={profile.skills.length} />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <Card>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-medium text-ink">
                  Profile completion
                </h2>
                <span className="stat-figure text-lg font-semibold text-ink">
                  {percent}%
                </span>
              </div>
              <div className="mt-3">
                <ProgressBar percent={percent} />
              </div>

              {missing.length > 0 ? (
                <ul className="mt-5 space-y-2">
                  {missing.map((m) => (
                    <li key={m} className="leader text-sm">
                      <span className="text-ink-soft">{m}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-sm text-teal">
                  Your profile is complete — nice work.
                </p>
              )}

              <Link href="/editor?section=overview">
                <Button className="mt-6" size="sm">
                  Complete my profile
                </Button>
              </Link>
            </Card>

            <div className="space-y-4">
              <Card className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-teal/10 text-teal">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">Resume status</p>
                    <p className="text-xs text-ink-soft">
                      Template: {profile.resumeSettings.templateId}
                    </p>
                  </div>
                </div>
                <Link href="/resume" className="text-xs font-medium text-teal hover:underline">
                  Open →
                </Link>
              </Card>

              <Card className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-teal/10 text-teal">
                    <Globe2 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">Portfolio status</p>
                    <p className="text-xs text-ink-soft">
                      {profile.portfolioSettings.username
                        ? profile.portfolioSettings.isPublished
                          ? `Live at /portfolio/${profile.portfolioSettings.username}`
                          : "Draft — not published"
                        : "Username not set"}
                    </p>
                  </div>
                </div>
                <Link
                  href="/portfolio/settings"
                  className="text-xs font-medium text-teal hover:underline"
                >
                  Open →
                </Link>
              </Card>

              <Card className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gold-soft text-gold">
                  <BookOpen className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">Education entries</p>
                  <p className="text-xs text-ink-soft">
                    {profile.education.length} on record
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-paper">
      <AppNavbar />
      <AuthGate>
        <DashboardContent />
      </AuthGate>
    </div>
  );
}
