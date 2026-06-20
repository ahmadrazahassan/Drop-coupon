"use client";

import { useRouter } from "next/navigation";
import type { Category } from "@/lib/types";

export type SortOption = "top" | "newest" | "expiring";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "top", label: "Top rated" },
  { value: "newest", label: "Newest" },
  { value: "expiring", label: "Expiring soon" },
];

export interface CategoryFilterProps {
  categories: Category[];
  /** Slug of the active category, or undefined for "All". */
  activeCategory?: string;
  activeSort?: SortOption;
  /** Base path the filter rebuilds query params against, e.g. "/top". */
  basePath: string;
  /**
   * "query" (default): category is a `?category=` param against basePath (used
   * on /top). "path": selecting a category navigates to /category/{slug}, and
   * "All categories" goes to /top — used on category pages.
   */
  mode?: "query" | "path";
}

export function CategoryFilter({
  categories,
  activeCategory,
  activeSort = "top",
  basePath,
  mode = "query",
}: CategoryFilterProps) {
  const router = useRouter();

  function withSort(path: string, sort?: SortOption): string {
    if (!sort || sort === "top") return path;
    return `${path}?sort=${sort}`;
  }

  function buildHref(category?: string, sort?: SortOption): string {
    if (mode === "path") {
      return category ? withSort(`/category/${category}`, sort) : withSort("/top", sort);
    }
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (sort && sort !== "top") params.set("sort", sort);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  function rowClass(isActive: boolean): string {
    return [
      "flex w-full items-center justify-between border-l-2 px-3 py-2.5 text-left text-[14px] transition-colors",
      isActive
        ? "border-l-primary bg-background font-medium text-ink"
        : "border-l-transparent text-muted hover:border-l-line hover:text-ink",
    ].join(" ");
  }

  const rows = [
    { slug: undefined as string | undefined, name: "All categories", count: undefined },
    ...categories.map((c) => ({ slug: c.slug, name: c.name, count: c.count })),
  ];

  return (
    <div className="rounded-[var(--radius)] border border-line bg-surface">
      <div className="border-b border-line px-4 py-3">
        <h2 className="text-[13px] font-medium uppercase tracking-[0.04em] text-muted">
          Categories
        </h2>
      </div>
      <ul className="p-2">
        {rows.map((row) => {
          const isActive = (row.slug ?? undefined) === (activeCategory ?? undefined);
          return (
            <li key={row.slug ?? "all"}>
              <a href={buildHref(row.slug, activeSort)} className={rowClass(isActive)}>
                <span>{row.name}</span>
                {typeof row.count === "number" ? (
                  <span className={isActive ? "text-primary" : "text-muted"}>
                    {row.count}
                  </span>
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-line px-4 py-4">
        <label
          htmlFor="sort-by"
          className="mb-2 block text-[13px] font-medium uppercase tracking-[0.04em] text-muted"
        >
          Sort by
        </label>
        <select
          id="sort-by"
          value={activeSort}
          onChange={(e) =>
            router.push(buildHref(activeCategory, e.target.value as SortOption))
          }
          className="h-10 w-full rounded-[var(--radius)] border border-line bg-surface px-3 text-[14px] text-ink focus:border-primary focus:outline-none"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
