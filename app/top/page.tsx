import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { ListingLayout } from "@/components/listing-layout";
import type { SortOption } from "@/components/category-filter";
import {
  getCategories,
  getCouponsByCategory,
  getTopCoupons,
  sortCoupons,
  type CouponSort,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Top Codes",
  description:
    "Browse the top verified promo codes and deals this month, filterable by category.",
};

const SORTS: SortOption[] = ["top", "newest", "expiring"];

function monthYear(): string {
  return new Date().toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

export default async function TopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { category, sort } = await searchParams;
  const categories = getCategories();

  const activeCategory =
    category && categories.some((c) => c.slug === category) ? category : undefined;
  const activeSort: SortOption = SORTS.includes(sort as SortOption)
    ? (sort as SortOption)
    : "top";

  const base = activeCategory
    ? getCouponsByCategory(activeCategory)
    : getTopCoupons();
  const coupons = sortCoupons(base, activeSort as CouponSort);

  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumb
        items={[{ label: "Drop Coupon", href: "/" }, { label: "Top Codes" }]}
      />
      <div className="mt-5 max-w-2xl">
        <h1 className="text-[34px] font-extrabold text-ink md:text-[44px]">
          Top Codes — {monthYear()}
        </h1>
        <p className="mt-3 text-[15px] text-muted md:text-[16px]">
          Verified promo codes and deals, ranked and checked by our team. Filter
          by category to narrow the list.
        </p>
      </div>

      <div className="mt-8">
        <ListingLayout
          coupons={coupons}
          categories={categories}
          basePath="/top"
          activeCategory={activeCategory}
          activeSort={activeSort}
        />
      </div>
    </div>
  );
}
