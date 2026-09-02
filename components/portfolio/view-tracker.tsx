"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/track-event";

/**
 * Invisible — fires one "portfolio_viewed" analytics event when a public
 * portfolio page is opened. Lives in its own client component because the
 * page itself is a Server Component (it needs to fetch the profile before
 * the page even renders), and trackEvent needs the browser Supabase client.
 */
export function PortfolioViewTracker({ ownerId }: { ownerId: string }) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackEvent("portfolio_viewed", ownerId);
  }, [ownerId]);

  return null;
}
