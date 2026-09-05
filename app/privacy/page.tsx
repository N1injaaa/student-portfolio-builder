import Link from "next/link";
import { SITE_NAME, SITE_AUTHOR, CONTACT_EMAIL } from "@/lib/site-config";

export const metadata = {
  title: `Privacy Policy — ${SITE_NAME}`,
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <Link href="/" className="text-sm text-teal hover:underline">
          ← Back to {SITE_NAME}
        </Link>

        <h1 className="mt-6 font-display text-3xl font-semibold text-ink">Privacy Policy</h1>
        <p className="mt-2 text-sm text-ink-soft">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-ink-soft">
          <p>
            {SITE_NAME} is an independent, student-built project run by {SITE_AUTHOR} — not a
            company. This policy explains what information is collected when you use it and how
            it's handled. It isn't legal advice, and if you have concerns about a specific
            situation you should consult a professional — but it reflects, honestly, what
            actually happens with your data here.
          </p>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">What we collect</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-ink">Account info</strong> — when you sign in with
                Google, we receive your name, email address, and profile photo from Google.
              </li>
              <li>
                <strong className="text-ink">Resume &amp; portfolio content</strong> — everything
                you type into the editor (education, projects, skills, bio, etc.) is stored so it
                can be shown back to you and, if you choose to publish, on your public portfolio
                page.
              </li>
              <li>
                <strong className="text-ink">Usage events</strong> — basic events like portfolio
                page views and resume downloads, so you can see analytics about your own
                portfolio if you're on Pro.
              </li>
              <li>
                <strong className="text-ink">Payment info</strong> — if you purchase Pro, payment
                is handled entirely by Lemon Squeezy (see below) — we never see or store your
                card details.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">How it's used</h2>
            <p className="mt-2">
              Solely to run the product: authenticating you, saving and displaying your resume
              and portfolio, and unlocking Pro features once you've paid. We don't sell your data,
              and we don't run ads on {SITE_NAME}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Who we share it with</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>
                <strong className="text-ink">Supabase</strong> — hosts our database and handles
                authentication.
              </li>
              <li>
                <strong className="text-ink">Vercel</strong> — hosts the website itself.
              </li>
              <li>
                <strong className="text-ink">Lemon Squeezy</strong> — processes Pro payments as
                the merchant of record. They handle your payment details and receipt directly;
                we only receive confirmation that a purchase happened, tied to your email.
              </li>
              <li>
                <strong className="text-ink">Google</strong> — provides sign-in.
              </li>
            </ul>
            <p className="mt-2">
              None of these providers are permitted to use your data for their own purposes
              beyond providing their service to us.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Your portfolio is public if you publish it</h2>
            <p className="mt-2">
              If you turn on "Published" in Portfolio Settings, the content of your portfolio
              becomes visible to anyone with the link (that's the point — sharing it with
              admissions officers and recruiters). Until then, only you can see it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Cookies &amp; local storage</h2>
            <p className="mt-2">
              We use your browser's local storage to remember small preferences (like your
              chosen language and light/dark theme) and Supabase's authentication cookies to keep
              you signed in. We don't use third-party advertising or tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Your choices</h2>
            <p className="mt-2">
              You can edit or delete any content in your profile at any time from the editor. To
              delete your account and all associated data entirely, email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal hover:underline">
                {CONTACT_EMAIL}
              </a>{" "}
              and we'll remove it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Changes</h2>
            <p className="mt-2">
              If this policy changes in a meaningful way, we'll update the date at the top of
              this page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Contact</h2>
            <p className="mt-2">
              Questions about this policy or your data — reach out at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
