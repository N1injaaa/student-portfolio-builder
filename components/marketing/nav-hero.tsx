"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useLanguage } from "@/lib/i18n/context";

export function MarketingNav() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Logo size="base" />
        </div>
        <nav className="hidden items-center gap-6 text-sm text-ink-soft md:flex">
          <a href="#features" className="hover:text-ink">{t("landing.nav.features")}</a>
          <a href="#templates" className="hover:text-ink">{t("landing.nav.templates")}</a>
          <a href="#how-it-works" className="hover:text-ink">{t("landing.nav.howItWorks")}</a>
          <a href="#faq" className="hover:text-ink">{t("landing.nav.faq")}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="hidden text-sm font-medium text-ink-soft hover:text-ink sm:block"
          >
            {t("landing.nav.signIn")}
          </Link>
          <Link
            href="/dashboard"
            className="focus-ring rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper hover:opacity-90"
          >
            {t("landing.nav.createPortfolio")}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden border-b border-rule">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div className="animate-rise-in">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-rule bg-surface px-3 py-1 text-xs font-medium text-ink-soft">
            <Sparkles className="h-3 w-3 text-gold" />
            {t("landing.hero.badge")}
          </span>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
            {t("landing.hero.title")}
          </h1>
          <p className="mt-5 max-w-lg text-lg text-ink-soft">
            {t("landing.hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard"
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3 text-sm font-medium text-paper hover:opacity-90"
            >
              {t("landing.nav.createPortfolio")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#templates"
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-rule px-6 py-3 text-sm font-medium text-ink hover:bg-surface-raised"
            >
              {t("landing.hero.viewTemplates")}
            </a>
          </div>
          <p className="mt-6 text-xs text-ink-soft">
            {t("landing.hero.signInHint")}
          </p>
        </div>

        <TranscriptCard />
      </div>
    </section>
  );
}

function TranscriptCard() {
  const { t } = useLanguage();
  return (
    <div className="relative flex items-center justify-center animate-rise-in [animation-delay:150ms]">
      <div className="ledger-card relative w-full max-w-sm -rotate-1 bg-surface p-6 shadow-xl">
        <div
          className="absolute -right-4 -top-4 flex h-16 w-16 -rotate-6 items-center justify-center rounded-full border-2 border-gold bg-paper text-center text-[9px] font-semibold uppercase tracking-wide text-gold animate-stamp-in [animation-delay:600ms]"
          aria-hidden="true"
        >
          {t("hero.card.readyToSubmit")}
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
          {t("hero.card.applicantRecord")}
        </p>
        <p className="font-display text-xl font-semibold text-ink">Alex Johnson</p>
        <p className="text-sm text-ink-soft">{t("hero.card.role")}</p>

        <div className="my-5 border-t border-dashed border-rule" />

        <dl className="space-y-3 text-sm">
          <div className="leader">
            <dt className="text-ink-soft">{t("hero.card.profileCompletion")}</dt>
            <dd className="stat-figure font-medium text-ink">92%</dd>
          </div>
          <div className="leader">
            <dt className="text-ink-soft">{t("hero.card.projectsListed")}</dt>
            <dd className="stat-figure font-medium text-ink">03</dd>
          </div>
          <div className="leader">
            <dt className="text-ink-soft">{t("hero.card.achievements")}</dt>
            <dd className="stat-figure font-medium text-ink">03</dd>
          </div>
          <div className="leader">
            <dt className="text-ink-soft">{t("hero.card.resumeStatus")}</dt>
            <dd className="stat-figure font-medium text-teal">{t("hero.card.exported")}</dd>
          </div>
          <div className="leader">
            <dt className="text-ink-soft">{t("hero.card.portfolio")}</dt>
            <dd className="stat-figure font-medium text-teal">{t("hero.card.live")}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
