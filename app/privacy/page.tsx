import { PrivacyContent } from "@/components/legal/privacy-content";
import { SITE_NAME } from "@/lib/site-config";

export const metadata = {
  title: `Privacy Policy — ${SITE_NAME}`,
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-paper">
      <PrivacyContent />
    </div>
  );
}
