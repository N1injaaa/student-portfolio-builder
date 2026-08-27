"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useIsAdmin(userId: string | undefined) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    let cancelled = false;
    const supabase = createClient();
    supabase.rpc("is_admin").then(({ data }) => {
      if (!cancelled) setIsAdmin(Boolean(data));
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return isAdmin;
}
