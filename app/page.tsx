import { SearchBar } from "@/components/search-bar";
import { StatRow } from "@/components/stat-row";
import { SectionHeading } from "@/components/section-heading";
import { CouponCard } from "@/components/coupon-card";
import { CategoryTile } from "@/components/category-tile";
import { Button } from "@/components/button";
import { LogoMarquee } from "@/components/logo-marquee";
import { getCategories, getTopCoupons } from "@/lib/data";

const STEPS = [
  {
    n: "1",
    title: "Find a tool",
    body: "Search or browse by category to find the AI tool you want to use.",
  },
  {
    n: "2",
    title: "Reveal the code",
    body: "Open an offer to reveal a verified code or jump straight to the deal.",
  },
  {
    n: "3",
    title: "Copy & save",
    body: "Paste it at checkout and pay less for the software you rely on.",
  },
];

export default function HomePage() {
  const topCoupons = getTopCoupons(6);
  const categories = getCategories();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="container-page pt-20 md:pt-28">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-line bg-surface px-3.5 py-1.5 text-[12.5px] font-medium text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Verified daily · 85+ AI tools
            </span>

            <h1 className="mt-7 text-[44px] font-extrabold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[58px] md:text-[76px]">
              Verified promo codes
              <br className="hidden sm:block" /> for the{" "}
              <span className="inline-block rounded-[10px] bg-primary px-3 pb-1 leading-tight text-ink">
                AI tools
              </span>{" "}
              you use.
            </h1>

            <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-muted md:text-[20px]">
              Drop Coupon checks discounts and deals across AI builders, coding
              assistants, chat, and search — so you don&apos;t have to. Find a
              tool, reveal a code, and save in seconds.
            </p>

            <div className="mt-9 w-full max-w-xl">
              <SearchBar size="lg" />
            </div>

            <StatRow
              className="mt-6 justify-center"
              items={["85+ AI tools", "Updated daily", "Verified by our team"]}
            />
          </div>
        </div>

        {/* Full-bleed logo marquee */}
        <div className="mt-16 pb-16 md:mt-24 md:pb-20">
          <LogoMarquee />
        </div>
      </section>

      {/* Top codes */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          title="Top Codes This Month"
          description="Hand-checked offers from the most-used AI tools."
          action={{ label: "View all top codes", href: "/top" }}
          as="h2"
        />
        <div className="mt-6 flex flex-col gap-4">
          {topCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="container-page scroll-mt-24 pb-16 md:pb-20">
        <SectionHeading
          title="Browse by category"
          description="Jump straight to the deals that fit what you&rsquo;re building with."
          as="h2"
        />
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <CategoryTile key={category.slug} category={category} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="container-page scroll-mt-24 pb-16 md:pb-20"
      >
        <SectionHeading title="How it works" as="h2" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="rounded-[var(--radius)] border border-line bg-surface p-6"
            >
              <span className="text-[32px] font-extrabold text-primary">
                {step.n}
              </span>
              <h3 className="mt-3 text-[18px] font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-[14px] text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="container-page pb-16 md:pb-24">
        <div className="rounded-[var(--radius-lg)] bg-ink px-6 py-12 text-center md:px-12 md:py-16">
          <h2 className="mx-auto max-w-2xl text-[28px] font-bold text-white md:text-[34px]">
            Stop overpaying for AI.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-white/70">
            Browse every verified code in one place and save on your next
            subscription.
          </p>
          <div className="mt-7 flex justify-center">
            <Button href="/top" variant="primary" size="lg">
              Browse all top codes
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
