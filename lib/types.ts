/**
 * Domain types for the promo/coupon platform.
 *
 * The data layer (lib/data.ts) is the only module that knows where data comes
 * from. Components consume the helper functions, never the raw arrays, so this
 * mock layer can later be replaced by a real API/DB without touching the UI.
 */

export type CouponType = "code" | "promo";

export interface Category {
  slug: string;
  name: string;
  description: string;
  /** Derived from coupon data at runtime — never hardcoded. */
  count?: number;
}

export interface Store {
  slug: string;
  name: string;
  /** Path to a placeholder SVG in /public/stores. Swap for a real logo later. */
  logo: string;
  description: string;
  url: string;
  categorySlug: string;
}

export interface Coupon {
  id: string;
  storeSlug: string;
  title: string;
  description: string;
  type: CouponType;
  /** Present only for `type: "code"` items. */
  code?: string;
  discount: string;
  verified: boolean;
  /** ISO-ish date string or the literal "ongoing". */
  expires: string | "ongoing";
  url: string;
  categorySlug: string;
}

/** A coupon joined with its parent store, ready for presentational use. */
export interface CouponWithStore extends Coupon {
  store: Store;
}
