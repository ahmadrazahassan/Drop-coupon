import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { StoreLogo } from "@/components/store-logo";
import { StatRow } from "@/components/stat-row";
import { CouponCard } from "@/components/coupon-card";
import { getCategory, getCouponsByStore, getStore, getStores } from "@/lib/data";

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
  return {
    title: `${store.name} promo codes & coupons`,
    description: store.description,
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

  return (
    <div className="container-page py-10 md:py-14">
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
    </div>
  );
}
