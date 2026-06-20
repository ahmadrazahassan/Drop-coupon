import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { SearchBar } from "@/components/search-bar";
import { CouponCard } from "@/components/coupon-card";
import { searchAll } from "@/lib/data";

export const metadata: Metadata = {
  title: "Search",
  description: "Search verified promo codes, coupons, and stores.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query ? searchAll(query) : [];

  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumb items={[{ label: "Drop Coupon", href: "/" }, { label: "Search" }]} />

      <div className="mt-5 max-w-2xl">
        <h1 className="text-[30px] font-extrabold text-ink md:text-[40px]">
          {query ? `Results for “${query}”` : "Search"}
        </h1>
        <p className="mt-3 text-[15px] text-muted">
          {query
            ? `${results.length} ${results.length === 1 ? "offer" : "offers"} found.`
            : "Search stores, brands, or codes to find a deal."}
        </p>
        <div className="mt-6">
          <SearchBar size="lg" defaultValue={query} />
        </div>
      </div>

      <div className="mt-8">
        {query && results.length > 0 ? (
          <div className="flex flex-col gap-4">
            {results.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        ) : query ? (
          <div className="rounded-[var(--radius)] border border-line bg-surface p-10 text-center">
            <p className="text-[15px] text-muted">
              No offers matched “{query}”. Try a store name or a broader term.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
