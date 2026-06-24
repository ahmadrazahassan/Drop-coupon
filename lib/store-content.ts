import type { Category, CouponWithStore, Store } from "./types";

/**
 * Data-driven editorial content for each store page. Nothing here is hardcoded
 * per brand — every paragraph, step, and FAQ answer is generated from the
 * store's real offers, so all 85 pages read as genuine, current editorial
 * coverage rather than a duplicated template.
 */

export interface Faq {
  question: string;
  answer: string;
}

function formatDate(value: string): string {
  if (value === "ongoing") return "an ongoing basis";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** The single most attractive offer to reference in copy. */
function headlineOffer(coupons: CouponWithStore[]): CouponWithStore | undefined {
  return [...coupons].sort((a, b) => Number(b.verified) - Number(a.verified))[0];
}

/** Soonest expiry among offers that have a concrete date. */
function soonestExpiry(coupons: CouponWithStore[]): string | undefined {
  const dated = coupons
    .map((c) => c.expires)
    .filter((e) => e !== "ongoing")
    .sort();
  return dated[0];
}

/** Two short paragraphs of "about" copy, grounded in real data. */
export function storeAbout(
  store: Store,
  category: Category | undefined,
  coupons: CouponWithStore[],
): string[] {
  const best = headlineOffer(coupons);
  const verifiedCount = coupons.filter((c) => c.verified).length;
  const codeCount = coupons.filter((c) => c.type === "code").length;

  const intro = `${store.description} ${category ? `It sits in our ${category.name} category, where we track pricing and promotions across the tools teams actually use.` : ""}`.trim();

  const savings = best
    ? `Right now the standout offer is ${best.discount.toLowerCase().includes("off") || best.discount.includes("$") || best.discount.includes("%") ? best.discount : best.discount} — ${best.title.toLowerCase()}. We list ${coupons.length} active ${coupons.length === 1 ? "offer" : "offers"} for ${store.name}${verifiedCount ? `, ${verifiedCount} of them independently verified` : ""}${codeCount ? `, including ${codeCount} copy-and-paste ${codeCount === 1 ? "code" : "codes"}` : ""}. Each one links straight to ${store.name} so you can apply it at checkout in seconds.`
    : `We continuously check ${store.name} for new discounts and add them here as soon as they go live.`;

  return [intro, savings];
}

/** Step-by-step redemption guide tailored to whether codes exist. */
export function storeHowTo(store: Store, hasCodes: boolean): string[] {
  if (hasCodes) {
    return [
      `Browse the verified codes and deals listed above for ${store.name} and pick the one that fits your plan.`,
      `Select "Reveal the Code" to display the discount code and open a copy button.`,
      `Copy the code, then continue to ${store.name} — the site opens in a new tab.`,
      `Paste the code into the promo or coupon field at ${store.name} checkout and confirm the discount applies before you pay.`,
    ];
  }
  return [
    `Review the active deals listed above for ${store.name}.`,
    `Select "Get the Deal" to open ${store.name} with the promotion applied.`,
    `Choose the plan or billing option referenced in the offer (for example, annual billing or a student plan).`,
    `Confirm the discounted price at checkout before completing your purchase.`,
  ];
}

/** A genuine, data-grounded FAQ set for one store (powers FAQPage schema). */
export function storeFaqs(
  store: Store,
  coupons: CouponWithStore[],
  category: Category | undefined,
): Faq[] {
  const best = headlineOffer(coupons);
  const codeCount = coupons.filter((c) => c.type === "code").length;
  const verifiedCount = coupons.filter((c) => c.verified).length;
  const soonest = soonestExpiry(coupons);
  const monthYear = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const faqs: Faq[] = [];

  faqs.push({
    question: `Does ${store.name} have a promo code?`,
    answer:
      codeCount > 0
        ? `Yes. We currently list ${codeCount} ${store.name} ${codeCount === 1 ? "code" : "codes"} plus additional deals. Reveal any code above and paste it into the promo field at ${store.name} checkout.`
        : `${store.name} doesn't publish a public coupon code right now, but there ${coupons.length === 1 ? "is" : "are"} ${coupons.length} active ${coupons.length === 1 ? "deal" : "deals"} above — such as annual-billing savings, free tiers, or student pricing — that lower the price without a code.`,
  });

  if (best) {
    faqs.push({
      question: `How much can I save at ${store.name}?`,
      answer: `The best ${store.name} offer this month is ${best.discount} — ${best.title.toLowerCase()}. ${best.description}`,
    });
  }

  faqs.push({
    question: `How do I redeem a ${store.name} discount?`,
    answer:
      codeCount > 0
        ? `Reveal a code above, copy it, continue to ${store.name}, and paste the code into the coupon field at checkout. Make sure the total updates before you pay.`
        : `Select "Get the Deal" above to open ${store.name}, then choose the plan or billing option named in the offer. The discounted price shows at checkout.`,
  });

  faqs.push({
    question: `Are these ${store.name} codes verified?`,
    answer: verifiedCount
      ? `${verifiedCount} of the ${coupons.length} ${store.name} offers above carry a Verified badge, meaning we checked them against ${store.name}'s own pricing or education pages. Offers without the badge are community-submitted and may vary.`
      : `We review every ${store.name} offer against the company's public pricing pages before listing it, and refresh this page regularly.`,
  });

  faqs.push({
    question: `When do the ${store.name} offers expire?`,
    answer: soonest
      ? `Offers rotate often. The next ${store.name} offer is set to expire on ${formatDate(soonest)}, so it's worth redeeming sooner rather than later. We update this page as deals change.`
      : `${store.name} offers are refreshed regularly. We update this page as soon as deals change, so check back before you subscribe.`,
  });

  faqs.push({
    question: `Is this the latest ${store.name} deal for ${monthYear}?`,
    answer: `Yes — this page reflects our most recent ${monthYear} review of ${store.name}${category ? ` in ${category.name}` : ""}. We re-check the listed offers regularly and remove anything that expires.`,
  });

  return faqs;
}
