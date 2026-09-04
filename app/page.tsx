"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Globe2,
  GraduationCap,
  Layers,
  MousePointerClick,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { MarketingNav, Hero } from "@/components/marketing/nav-hero";
import { useLanguage } from "@/lib/i18n/context";
import { SITE_AUTHOR, SITE_NAME, copyrightLine } from "@/lib/site-config";

const templateNames = ["Minimal", "Modern", "Academic", "Professional"];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper">
      <MarketingNav />
      <Hero />
      <LogosStrip />
      <WhySection />
      <FeaturesSection />
      <TemplatesSection />
      <ExampleSection />
      <HowItWorks />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function LogosStrip() {
  const { t } = useLanguage();
  return (
    <section className="border-b border-rule bg-surface/40 py-6">
      <p className="mx-auto max-w-6xl px-4 text-center text-xs uppercase tracking-widest text-ink-soft sm:px-6">
        {t("landing.trustedBy")}
      </p>
    </section>
  );
}

function WhySection() {
  const { t } = useLanguage();
  const points = [
    { icon: GraduationCap, key: "landing.why.point0" },
    { icon: Layers, key: "landing.why.point1" },
    { icon: ShieldCheck, key: "landing.why.point2" },
  ];
  return (
    <section className="border-b border-rule py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {t("landing.why.title")} {SITE_NAME}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {points.map((p) => (
            <div key={p.key} className="rounded-lg border border-rule p-6">
              <p.icon className="h-5 w-5 text-gold" />
              <h3 className="mt-4 font-display text-lg font-medium text-ink">
                {t(`${p.key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(`${p.key}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { t } = useLanguage();
  const features = [
    { icon: PenLine, key: "landing.features.0" },
    { icon: FileText, key: "landing.features.1" },
    { icon: Globe2, key: "landing.features.2" },
    { icon: MousePointerClick, key: "landing.features.3" },
  ];
  return (
    <section id="features" className="border-b border-rule py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {t("landing.features.title")}
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.key} className="bg-paper p-6">
              <f.icon className="h-5 w-5 text-teal" />
              <h3 className="mt-4 font-display text-lg font-medium text-ink">{t(`${f.key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(`${f.key}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplatesSection() {
  const { t } = useLanguage();
  return (
    <section id="templates" className="border-b border-rule py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {t("landing.templates.title")}
          </h2>
          <Link href="/resume" className="text-sm font-medium text-teal hover:underline">
            {t("landing.templates.previewAll")}
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {templateNames.map((name, idx) => (
            <div key={name} className="group">
              <div className="ledger-card aspect-[3/4] overflow-hidden p-4 transition-transform group-hover:-translate-y-1">
                <div className="h-2 w-2/3 rounded-full bg-ink/80" />
                <div className="mt-2 h-1.5 w-1/3 rounded-full bg-gold" />
                <div className="mt-4 space-y-1.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full bg-rule"
                      style={{ width: `${90 - i * 8}%` }}
                    />
                  ))}
                </div>
                <div className="mt-4 h-1.5 w-1/2 rounded-full bg-ink/60" />
                <div className="mt-3 space-y-1.5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full bg-rule"
                      style={{ width: `${80 - i * 10}%` }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 font-display text-sm font-medium text-ink">{name}</p>
              <p className="text-xs text-ink-soft">{t(`landing.templates.note${idx}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExampleSection() {
  const { t } = useLanguage();
  return (
    <section className="border-b border-rule bg-surface/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {t("landing.example.title")}
        </h2>
        <p className="mt-2 max-w-lg text-sm text-ink-soft">
          {t("landing.example.description")}
        </p>
        <div className="ledger-card mt-8 max-w-2xl bg-surface p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft font-display text-lg font-semibold text-gold">
              AJ
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-ink">Alex Johnson</p>
              <p className="text-sm text-ink-soft">{t("landing.example.role")}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink-soft">{t("landing.example.quote")}</p>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal hover:underline"
          >
            {t("landing.example.tryButton")} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { t } = useLanguage();
  const stepNumbers = ["01", "02", "03", "04"];
  return (
    <section id="how-it-works" className="border-b border-rule py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {t("landing.how.title")}
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stepNumbers.map((n, idx) => (
            <div key={n}>
              <p className="stat-figure text-sm text-gold">{n}</p>
              <h3 className="mt-2 font-display text-base font-medium text-ink">
                {t(`landing.how.${idx}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(`landing.how.${idx}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { t } = useLanguage();
  const faqIndexes = [0, 1, 2, 3, 4];
  return (
    <section id="faq" className="border-b border-rule py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {t("landing.faq.title")}
        </h2>
        <div className="mt-8 divide-y divide-rule border-y border-rule">
          {faqIndexes.map((idx) => (
            <details key={idx} className="group py-4">
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between text-sm font-medium text-ink">
                {t(`landing.faq.${idx}.q`)}
                <span className="ml-4 text-ink-soft transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t(`landing.faq.${idx}.a`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { t } = useLanguage();
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold text-ink">
          {t("landing.finalCta.title")}
        </h2>
        <p className="mt-3 text-ink-soft">
          {t("landing.finalCta.subtitle")}
        </p>
        <Link
          href="/dashboard"
          className="focus-ring mt-8 inline-flex items-center gap-2 rounded-md bg-ink px-7 py-3.5 text-sm font-medium text-paper hover:opacity-90"
        >
          {t("landing.nav.createPortfolio")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-ink-soft sm:flex-row sm:px-6">
        <div className="flex items-center">
          <Logo size="sm" />
        </div>
        <p>{t("landing.footer.tagline")}</p>
      </div>
      <div className="mx-auto mt-6 max-w-6xl border-t border-rule px-4 pt-6 text-center text-xs text-ink-soft sm:px-6">
        <p>
          {t("landing.footer.createdBy")} <span className="font-medium text-ink">{SITE_AUTHOR}</span>
        </p>
        <p className="mt-1">{copyrightLine()}</p>
      </div>
    </footer>
  );
}
