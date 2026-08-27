import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-gold">
        <AlertTriangle className="h-5 w-5" />
      </span>
      <h1 className="font-display text-xl font-semibold text-ink">Sign-in failed</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-soft">
        Something went wrong while signing you in with Google. Please try again.
      </p>
      <Link href="/dashboard" className="mt-6">
        <Button variant="outline" size="sm">
          Back to dashboard
        </Button>
      </Link>
    </div>
  );
}
