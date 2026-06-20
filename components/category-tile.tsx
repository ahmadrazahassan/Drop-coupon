import Link from "next/link";
import type { Category } from "@/lib/types";

export interface CategoryTileProps {
  category: Category;
}

export function CategoryTile({ category }: CategoryTileProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex flex-col justify-between rounded-[var(--radius)] border border-line bg-surface p-6 transition-colors hover:border-ink"
    >
      <span className="text-[18px] font-semibold text-ink">{category.name}</span>
      <span className="mt-6 text-[13px] text-muted">
        {category.count ?? 0} {category.count === 1 ? "offer" : "offers"}
      </span>
    </Link>
  );
}
