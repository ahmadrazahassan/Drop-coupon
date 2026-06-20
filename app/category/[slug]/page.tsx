import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { ListingLayout } from "@/components/listing-layout";
import type { SortOption } from "@/components/category-filter";
import {
  getCategories,
  getCategory,
  getCouponsByCategory,
  sortCoupons,
  type CouponSort,
} from "@/lib/data";

type Params = { slug: string };

const SORTS: SortOption[] = ["top", "newest", "expiring"];

export function generateStaticParams(): Params[] {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category not found" };
  return {
    title: `${category.name} promo codes & deals`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { slug } = await params;
  const { sort } = await searchParams;
  const category = getCategory(slug);
  if (!category) notFound();

  const activeSort: SortOption = SORTS.includes(sort as SortOption)
    ? (sort as SortOption)
    : "top";
  const coupons = sortCoupons(getCouponsByCategory(slug), activeSort as CouponSort);
  const categories = getCategories();

  return (
    <div className="container-page py-10 md:py-14">
      <Breadcrumb
        items={[
          { label: "Drop Coupon", href: "/" },
          { label: "Categories", href: "/#categories" },
          { label: category.name },
        ]}
      />
      <div className="mt-5 max-w-2xl">
        <h1 className="text-[34px] font-extrabold text-ink md:text-[44px]">
          {category.name}
        </h1>
        <p className="mt-3 text-[15px] text-muted md:text-[16px]">
          {category.description}
        </p>
      </div>

      <div className="mt-8">
        <ListingLayout
          coupons={coupons}
          categories={categories}
          basePath={`/category/${slug}`}
          activeCategory={slug}
          activeSort={activeSort}
          mode="path"
        />
      </div>
    </div>
  );
}
