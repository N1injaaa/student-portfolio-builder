import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

// This must run on the Node.js runtime (not Edge) — signature
// verification needs the raw, untouched request body, and Node gives
// us that via req.text() before any framework body-parsing happens.
export const runtime = "nodejs";

// Events that mean "this person paid — turn Pro on."
const GRANT_EVENTS = new Set(["order_created", "subscription_created", "subscription_payment_success"]);
// Events that mean "give the money back / stop paying — turn Pro off."
const REVOKE_EVENTS = new Set(["order_refunded", "subscription_cancelled", "subscription_expired"]);

function isValidSignature(rawBody: string, signatureHeader: string | null, secret: string) {
  if (!signatureHeader) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(signatureHeader, "utf8");
  if (expectedBuffer.length !== receivedBuffer.length) return false;
  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function POST(req: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("LEMONSQUEEZY_WEBHOOK_SECRET is not set.");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  // Read the raw text (not req.json()) — signature verification needs
  // the exact bytes Lemon Squeezy hashed, and parsing-then-restringifying
  // JSON can produce a byte-for-byte different string.
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature");

  if (!isValidSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventName: string | undefined =
    req.headers.get("x-event-name") ?? payload?.meta?.event_name;
  const email: string | undefined = payload?.data?.attributes?.user_email;

  if (!email || !eventName) {
    // Acknowledge so Lemon Squeezy doesn't keep retrying, but there's
    // nothing to act on.
    return NextResponse.json({ received: true, matched: false });
  }

  // Supabase Auth stores emails lowercased, so match case-insensitively
  // by lowercasing both sides rather than using ILIKE (which treats
  // "_" and "%" in the email as wildcards and can misfire).
  const normalizedEmail = email.toLowerCase();

  // Temporary diagnostics: confirm (without leaking the secret) that the
  // service-role key actually reached this function, and log the full
  // Postgres error object — .message alone hides the error `code`,
  // which is what actually tells us whether this is a missing-grant
  // problem vs. something else.
  const keyPresent = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const keyLength = process.env.SUPABASE_SERVICE_ROLE_KEY?.length ?? 0;
  console.log(`[lemonsqueezy webhook] service key present: ${keyPresent}, length: ${keyLength}`);

  const supabase = createAdminClient();

  if (GRANT_EVENTS.has(eventName)) {
    const { error } = await supabase
      .from("profiles")
      .update({ is_pro: true })
      .eq("email", normalizedEmail);
    if (error) console.error("Failed to grant Pro access:", JSON.stringify(error));
  } else if (REVOKE_EVENTS.has(eventName)) {
    const { error } = await supabase
      .from("profiles")
      .update({ is_pro: false })
      .eq("email", normalizedEmail);
    if (error) console.error("Failed to revoke Pro access:", JSON.stringify(error));
  }

  return NextResponse.json({ received: true });
}