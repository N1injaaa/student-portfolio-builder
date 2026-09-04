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
import { SITE_AUTHOR, SITE_NAME, copyrightLine } from "@/lib/site-config";

const templates = [
  { name: "Minimal", note: "Quiet type, generous margins" },
  { name: "Modern", note: "Bold header, accent rule" },
  { name: "Academic", note: "Serif, transcript-style" },
  { name: "Professional", note: "Two-column, dense" },
];

const steps = [
  {
    n: "01",
    title: "Fill in your record",
    body: "Add your education, projects, achievements, and skills once — in one structured profile.",
  },
  {
    n: "02",
    title: "Pick a resume template",
    body: "Choose Minimal, Modern, Academic, or Professional. Preview updates as you type.",
  },
  {
    n: "03",
    title: "Publish your portfolio",
    body: "Turn the same profile into a public site at your own /portfolio/username address.",
  },
  {
    n: "04",
    title: "Export and apply",
    body: "Download a print-ready PDF resume and share your portfolio link with admissions or recruiters.",
  },
];

const faqs = [
  {
    q: "Do I need to create an account?",
    a: "Yes — sign in with your Google account. It takes a few seconds, and it's what lets your portfolio have a public link that anyone can visit.",
  },
  {
    q: "Is my data private?",
    a: "Only you can see and edit your profile. Your portfolio becomes visible to others only once you publish it from Portfolio Settings.",
  },
  {
    q: "Can I use this for job applications, not just university?",
    a: "Yes. The Professional and Modern templates are built for recruiters, while Academic suits admissions committees.",
  },
  {
    q: "Will the PDF look the same as the preview?",
    a: "Yes — the export renders the exact template, spacing, and accent color you see in the live preview.",
  },
  {
    q: "Can I have a different portfolio theme than my resume?",
    a: "Yes. Resume templates and portfolio themes are configured separately, so you can mix and match.",
  },
];

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
  return (
    <section className="border-b border-rule bg-surface/40 py-6">
      <p className="mx-auto max-w-6xl px-4 text-center text-xs uppercase tracking-widest text-ink-soft sm:px-6">
        Trusted by students applying to UT Austin · UC Berkeley · Waterloo · NUS · Imperial College
      </p>
    </section>
  );
}

function WhySection() {
  const points = [
    {
      icon: GraduationCap,
      title: "Built for students",
      body: "Every field maps to what admissions and recruiters actually ask for — GPA, activities, and credentials included.",
    },
    {
      icon: Layers,
      title: "One profile, two outputs",
      body: "Fill in your information once. Generate a downloadable resume and a public portfolio from the same data.",
    },
    {
      icon: ShieldCheck,
      title: "Private until you publish",
      body: "Everything saves automatically as you type, visible only to you — until you choose to publish your portfolio.",
    },
  ];
  return (
    <section className="border-b border-rule py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Why {SITE_NAME}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {points.map((p) => (
            <div key={p.title} className="rounded-lg border border-rule p-6">
              <p.icon className="h-5 w-5 text-gold" />
              <h3 className="mt-4 font-display text-lg font-medium text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: PenLine, title: "Guided profile editor", body: "Structured sections for education, projects, achievements, skills, languages, certificates, and activities." },
    { icon: FileText, title: "Four resume templates", body: "Minimal, Modern, Academic, and Professional — with live, no-reload preview as you edit." },
    { icon: Globe2, title: "Public portfolio site", body: "A shareable page at /portfolio/yourname, with themes, layouts, and section visibility you control." },
    { icon: MousePointerClick, title: "Reorder anything", body: "Add, edit, delete, and reorder every entry — projects, skills, and education included." },
  ];
  return (
    <section id="features" className="border-b border-rule py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Everything you need to apply
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="bg-paper p-6">
              <f.icon className="h-5 w-5 text-teal" />
              <h3 className="mt-4 font-display text-lg font-medium text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplatesSection() {
  return (
    <section id="templates" className="border-b border-rule py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Resume templates
          </h2>
          <Link href="/resume" className="text-sm font-medium text-teal hover:underline">
            Preview all templates →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((t) => (
            <div key={t.name} className="group">
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
              <p className="mt-3 font-display text-sm font-medium text-ink">{t.name}</p>
              <p className="text-xs text-ink-soft">{t.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExampleSection() {
  return (
    <section className="border-b border-rule bg-surface/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Portfolio example
        </h2>
        <p className="mt-2 max-w-lg text-sm text-ink-soft">
          A finished public portfolio, built from the same profile data as the resume —
          this is what yours could look like once published.
        </p>
        <div className="ledger-card mt-8 max-w-2xl bg-surface p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft font-display text-lg font-semibold text-gold">
              AJ
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-ink">Alex Johnson</p>
              <p className="text-sm text-ink-soft">Computer Science Student · Sample profile</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink-soft">
            &ldquo;Building technology that solves real problems.&rdquo; — three projects, five
            achievements, and a full education timeline.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal hover:underline"
          >
            Try it with this sample data <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-rule py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          How it works
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n}>
              <p className="stat-figure text-sm text-gold">{s.n}</p>
              <h3 className="mt-2 font-display text-base font-medium text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="border-b border-rule py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-8 divide-y divide-rule border-y border-rule">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between text-sm font-medium text-ink">
                {f.q}
                <span className="ml-4 text-ink-soft transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold text-ink">
          Your application deserves more than a template résumé.
        </h2>
        <p className="mt-3 text-ink-soft">
          Start with your record. Finish with a resume and portfolio worth sending.
        </p>
        <Link
          href="/dashboard"
          className="focus-ring mt-8 inline-flex items-center gap-2 rounded-md bg-ink px-7 py-3.5 text-sm font-medium text-paper hover:opacity-90"
        >
          Create my portfolio
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-ink-soft sm:flex-row sm:px-6">
        <div className="flex items-center">
          <Logo size="sm" />
        </div>
        <p>Built for students applying to what&rsquo;s next.</p>
      </div>
      <div className="mx-auto mt-6 max-w-6xl border-t border-rule px-4 pt-6 text-center text-xs text-ink-soft sm:px-6">
        <p>
          Created by <span className="font-medium text-ink">{SITE_AUTHOR}</span>
        </p>
        <p className="mt-1">{copyrightLine()}</p>
      </div>
    </footer>
  );
}
