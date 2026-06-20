"use client";

import { useState } from "react";
import type { Category, CouponWithStore } from "@/lib/types";
import { CategoryFilter, type SortOption } from "./category-filter";
import { CouponCard } from "./coupon-card";

export interface ListingLayoutProps {
  coupons: CouponWithStore[];
  categories: Category[];
  basePath: string;
  activeCategory?: string;
  activeSort?: SortOption;
  mode?: "query" | "path";
}

export function ListingLayout({
  coupons,
  categories,
  basePath,
  activeCategory,
  activeSort,
  mode = "query",
}: ListingLayoutProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filter = (
    <CategoryFilter
      categories={categories}
      basePath={basePath}
      activeCategory={activeCategory}
      activeSort={activeSort}
      mode={mode}
    />
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Sidebar — sticky on desktop */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">{filter}</div>
      </aside>

      {/* Mobile filters bar */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          aria-expanded={filtersOpen}
          className="flex h-11 w-full items-center justify-between rounded-[var(--radius)] border border-line bg-surface px-4 text-[14px] font-medium text-ink"
        >
          <span>Filters</span>
          <span className="text-muted">{filtersOpen ? "Hide" : "Show"}</span>
        </button>
        {filtersOpen ? <div className="mt-3">{filter}</div> : null}
      </div>

      {/* Main column */}
      <div>
        {coupons.length > 0 ? (
          <div className="flex flex-col gap-4">
            {coupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius)] border border-line bg-surface p-10 text-center">
            <p className="text-[15px] text-muted">
              No codes match these filters right now. Try another category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
