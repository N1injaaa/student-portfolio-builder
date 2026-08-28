import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client — bypasses Row Level Security entirely.
 *
 * NEVER import this into a Client Component or anything that ships to
 * the browser: the service role key can read/write every row in every
 * table, ignoring the `profiles_update_own` policy (and the `is_pro`
 * column revoke) that protect normal users. It exists only for
 * server-only code that has no signed-in user session to authenticate
 * with — right now, that's the payment webhook.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  return createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
