import { TermsContent } from "@/components/legal/terms-content";
import { SITE_NAME } from "@/lib/site-config";

export const metadata = {
  title: `Terms of Service — ${SITE_NAME}`,
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-paper">
      <TermsContent />
    </div>
  );
}
