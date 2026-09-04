"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileEdit, FileText, Globe2, LogOut, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Logo } from "@/components/layout/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useSupabaseUser } from "@/hooks/use-supabase-user";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { useLanguage } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

const baseLinks = [
  { href: "/dashboard", key: "nav.dashboard", icon: LayoutDashboard },
  { href: "/editor", key: "nav.editor", icon: FileEdit },
  { href: "/resume", key: "nav.resume", icon: FileText },
  { href: "/portfolio/settings", key: "nav.portfolio", icon: Globe2 },
];

export function AppNavbar() {
  const pathname = usePathname();
  const { user } = useSupabaseUser();
  const isAdmin = useIsAdmin(user?.id);
  const { t } = useLanguage();
  const links = isAdmin
    ? [...baseLinks, { href: "/admin", key: "nav.admin", icon: ShieldCheck }]
    : baseLinks;

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/dashboard" className="flex items-center focus-ring rounded">
          <Logo size="base" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "focus-ring flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-surface-raised text-ink"
                    : "text-ink-soft hover:text-ink"
                )}
              >
                <link.icon className="h-3.5 w-3.5" />
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {user?.email && (
            <span className="hidden max-w-[160px] truncate text-xs text-ink-soft sm:block">
              {user.email}
            </span>
          )}
          <LanguageSwitcher />
          <ThemeToggle />
          {user && (
            <form action="/auth/sign-out" method="post">
              <button
                type="submit"
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-md border border-rule text-ink-soft transition-colors hover:text-ink"
                aria-label={t("nav.signOut")}
                title={t("nav.signOut")}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-rule px-4 py-2 md:hidden">
        {links.map((link) => {
          const active = pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "focus-ring flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium",
                active ? "bg-surface-raised text-ink" : "text-ink-soft"
              )}
            >
              <link.icon className="h-3.5 w-3.5" />
              {t(link.key)}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
