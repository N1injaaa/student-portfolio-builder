/**
 * MASTER SWITCH. While true, every account is treated as Pro: all
 * templates/themes unlock, PDF exports are unlimited, the ATS breakdown
 * and portfolio analytics are visible, watermarks are hidden, and every
 * "Upgrade" banner/lock disappears (they all key off `isPro`).
 *
 * The whole paywall (is_pro column, webhook route, locks, limits) is left
 * fully intact underneath — to bring payments back, set this to false and
 * point UPGRADE_URL at a working checkout. Nothing else needs to change.
 */
export const FREE_FOR_EVERYONE = true;

/**
 * Where the "Upgrade to Pro" buttons send people.
 *
 * Create a product + a checkout link in your Lemon Squeezy dashboard
 * (Store → Products → New Product → set a one-time price → Share →
 * copy the checkout URL) and paste it below. Pro access then turns on
 * automatically via the webhook at
 * app/api/webhooks/lemonsqueezy/route.ts — no manual step needed.
 */
export const UPGRADE_URL = "https://vitafolio.lemonsqueezy.com/checkout/buy/a07a8eeb-8f7b-4974-9880-0f30d085aaf1";
