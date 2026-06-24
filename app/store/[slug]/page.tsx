import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { StoreLogo } from "@/components/store-logo";
import { StatRow } from "@/components/stat-row";
import { CouponCard } from "@/components/coupon-card";
import { FaqAccordion } from "@/components/faq-accordion";
import {
  getCategory,
  getCouponsByStore,
  getRelatedStores,
  getStore,
  getStores,
} from "@/lib/data";
import { storeAbout, storeFaqs, storeHowTo } from "@/lib/store-content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getStores().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store) return { title: "Store not found" };

  const coupons = getCouponsByStore(slug);
  const bestCoupon = coupons.find((c) => c.verified) || coupons[0];
  const discountText = bestCoupon ? ` (${bestCoupon.discount} Off)` : "";
  const currentMonthYear = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return {
    title: `${store.name} Promo Code, Coupons & Discount${discountText} — ${currentMonthYear}`,
    description: `Save money at ${store.name} with verified promo codes, coupons, and discounts. Get up to ${bestCoupon ? bestCoupon.discount : "special savings"} off your subscription in ${currentMonthYear}.`,
    keywords: [
      `${store.name} promo code`,
      `${store.name} coupon`,
      `${store.name} discount`,
      `${store.name} coupon code`,
      `${store.name} 20%`,
      `${store.name} 50% discount`,
      `${store.name} discount coupon code`,
      `${store.name} subscription discount`,
      `verified ${store.name} code`,
      `active ${store.name} coupons`,
      `save on ${store.name}`,
      `best ${store.name} coupon`,
      `${store.name} deal`,
    ],
    alternates: {
      canonical: `/store/${slug}`,
    },
  };
}

export default async function StorePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store) notFound();

  const coupons = getCouponsByStore(slug);
  const codes = coupons.filter((c) => c.type === "code");
  const deals = coupons.filter((c) => c.type === "promo");
  const category = getCategory(store.categorySlug);
  const related = getRelatedStores(slug);

  const about = storeAbout(store, category, coupons);
  const howTo = storeHowTo(store, codes.length > 0);
  const faqs = storeFaqs(store, coupons, category);

  const currentMonthYear = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${store.name} Promo Codes and Coupons (${currentMonthYear})`,
    "description": `Active discount codes and deals for ${store.name}`,
    "numberOfItems": coupons.length,
    "itemListElement": coupons.map((c, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Offer",
        "name": c.title,
        "description": c.description,
        "priceCurrency": "USD",
        "category": category ? category.name : "AI Software",
        "seller": {
          "@type": "Organization",
          "name": store.name,
          "url": store.url,
        },
      },
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  };

  return (
    <div className="container-page py-10 md:py-14">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Breadcrumb
        items={[
          { label: "Drop Coupon", href: "/" },
          { label: "Stores", href: "/top" },
          { label: store.name },
        ]}
      />

      {/* Store header */}
      <div className="mt-6 flex flex-col gap-5 rounded-[var(--radius)] border border-line bg-surface p-6 md:flex-row md:items-center md:p-8">
        <StoreLogo store={store} size="lg" />
        <div className="min-w-0">
          <h1 className="text-[30px] font-extrabold text-ink md:text-[40px]">
            {store.name}
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] text-muted">
            {store.description}
          </p>
          <StatRow
            className="mt-3"
            items={[
              `${coupons.length} active ${coupons.length === 1 ? "offer" : "offers"}`,
              category ? category.name : "Store",
              "Updated today",
            ]}
          />
        </div>
      </div>

      {/* Codes */}
      {codes.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-[22px] font-bold text-ink">Codes</h2>
          <div className="mt-5 flex flex-col gap-4">
            {codes.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Deals */}
      {deals.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-[22px] font-bold text-ink">Deals</h2>
          <div className="mt-5 flex flex-col gap-4">
            {deals.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        </section>
      ) : null}

      {coupons.length === 0 ? (
        <div className="mt-10 rounded-[var(--radius)] border border-line bg-surface p-10 text-center">
          <p className="text-[15px] text-muted">
            No active codes for {store.name} right now. Check back soon.
          </p>
        </div>
      ) : null}

      {/* About + How to redeem */}
      <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <h2 className="text-[22px] font-bold text-ink">
            About {store.name} discounts
          </h2>
          <div className="prose mt-4">
            {about.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <p className="mt-5 text-[13px] text-muted">
            Visit{" "}
            <a
              href={store.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="font-medium text-ink underline underline-offset-2 hover:text-primary"
            >
              {store.name}
            </a>{" "}
            to see live pricing.
          </p>
        </section>

        <section className="rounded-[var(--radius)] border border-line bg-surface p-6">
          <h2 className="text-[18px] font-semibold text-ink">
            How to use a {store.name} {codes.length > 0 ? "promo code" : "deal"}
          </h2>
          <ol className="mt-4 space-y-4">
            {howTo.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-[12px] font-semibold text-ink">
                  {i + 1}
                </span>
                <span className="text-[14px] leading-relaxed text-muted">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* FAQ */}
      <section className="mt-14">
        <h2 className="text-[22px] font-bold text-ink">
          {store.name} promo codes — frequently asked questions
        </h2>
        <div className="mt-5">
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Related stores */}
      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-[22px] font-bold text-ink">
            More {category ? category.name : "AI tool"} deals
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/store/${s.slug}`}
                className="flex flex-col items-center gap-3 rounded-[var(--radius)] border border-line bg-surface p-4 text-center transition-all hover:border-ink hover:shadow-[0_2px_12px_rgba(35,35,35,0.06)]"
              >
                <StoreLogo store={s} size="sm" />
                <span className="text-[13px] font-medium text-ink">{s.name}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
