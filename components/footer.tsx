import Link from "next/link";
import { getCategories, getTrendingStores } from "@/lib/data";

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
];

function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[13px] font-medium uppercase tracking-[0.04em] text-white/60">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-[14px] text-white/85 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const stores = getTrendingStores(5).map((s) => ({
    label: s.name,
    href: `/store/${s.slug}`,
  }));
  const categories = getCategories()
    .slice(0, 5)
    .map((c) => ({ label: c.name, href: `/category/${c.slug}` }));

  return (
    <footer className="mt-20 bg-ink text-white md:mt-24">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="md:col-span-4">
            <span className="text-[20px] font-bold tracking-[-0.02em]">Drop Coupon</span>
            <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-white/70">
              Verified promo codes, discounts, and deals for the AI tools you
              use — checked and updated daily.
            </p>
            <form className="mt-6 flex max-w-sm gap-2">
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                placeholder="Your email"
                className="h-10 flex-1 rounded-[var(--radius)] border border-white/20 bg-transparent px-3 text-[14px] text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="h-10 rounded-[var(--radius)] bg-primary px-4 text-[14px] font-medium text-ink transition-colors hover:bg-primary-hover"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-4">
            <Column title="Popular Stores" links={stores} />
            <Column title="Categories" links={categories} />
            <Column title="Company" links={COMPANY_LINKS} />
            <Column title="Legal" links={LEGAL_LINKS} />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-[13px] text-white/55 md:flex-row">
          <p>© {new Date().getFullYear()} Drop Coupon. All rights reserved.</p>
          <p>
            Offers are samples for demonstration. Drop Coupon may earn a
            commission on purchases. Logos are trademarks of their owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
