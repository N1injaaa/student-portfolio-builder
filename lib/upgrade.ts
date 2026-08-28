/**
 * Where the "Upgrade to Pro" buttons send people.
 *
 * Create a product + a checkout link in your Lemon Squeezy dashboard
 * (Store → Products → New Product → set a one-time price → Share →
 * copy the checkout URL) and paste it below. Pro access then turns on
 * automatically via the webhook at
 * app/api/webhooks/lemonsqueezy/route.ts — no manual step needed.
 */
export const UPGRADE_URL = "https://your-store.lemonsqueezy.com/buy/REPLACE_ME";
