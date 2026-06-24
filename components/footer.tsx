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

/** White-on-dark variant of the brand coupon-ticket mark for the footer. */
function FooterMark() {
  return (
    <svg viewBox="0 0 40 32" aria-hidden="true" className="h-8 w-auto">
      <rect x="2" y="4" width="36" height="24" rx="7" fill="#ffffff" />
      <circle cx="2" cy="16" r="4.5" fill="var(--ink)" />
      <circle cx="38" cy="16" r="4.5" fill="var(--ink)" />
      <line
        x1="27"
        y1="9"
        x2="27"
        y2="23"
        stroke="var(--primary)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="0.5 3.2"
      />
      <circle cx="13" cy="16" r="2.8" fill="var(--primary)" />
    </svg>
  );
}

/** Torn ticket-stub edge that echoes the brand mark — pure SVG, no gradient. */
function PerforatedEdge() {
  return (
    <svg
      className="absolute inset-x-0 top-0 h-3 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="footer-perforation"
          width="30"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="15" cy="0" r="7" fill="var(--background)" />
        </pattern>
      </defs>
      <rect width="100%" height="12" fill="url(#footer-perforation)" />
    </svg>
  );
}

function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-[14px] text-white/65 transition-colors hover:text-white"
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
  const year = new Date().getFullYear();
  const stores = getTrendingStores(5).map((s) => ({
    label: s.name,
    href: `/store/${s.slug}`,
  }));
  const categories = getCategories()
    .slice(0, 5)
    .map((c) => ({ label: c.name, href: `/category/${c.slug}` }));

  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-white">
      <PerforatedEdge />

      <div className="container-page pt-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <FooterMark />
              <span className="text-[19px] font-extrabold tracking-[-0.02em]">
                Drop Coupon
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-white/60">
              Verified promo codes, discounts, and deals for the AI tools you
              use — checked and updated daily.
            </p>

            <form className="mt-7 max-w-sm">
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <div className="flex items-center rounded-full border border-white/15 bg-white/[0.04] p-1 transition-colors focus-within:border-primary">
                <input
                  id="newsletter"
                  type="email"
                  placeholder="Enter your email"
                  className="h-9 flex-1 bg-transparent px-4 text-[14px] text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-9 shrink-0 rounded-full bg-primary px-5 text-[13px] font-semibold text-ink transition-colors hover:bg-primary-hover"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-2.5 px-1 text-[12px] text-white/45">
                The best AI deals in your inbox. No spam, unsubscribe anytime.
              </p>
            </form>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7">
            <Column title="Popular Stores" links={stores} />
            <Column title="Categories" links={categories} />
            <Column title="Company" links={COMPANY_LINKS} />
            <Column title="Legal" links={LEGAL_LINKS} />
          </div>
        </div>

        {/* Oversized ghost wordmark — the signature edge-bleed touch. */}
        <div
          aria-hidden="true"
          className="pointer-events-none mt-14 select-none"
        >
          <span className="block whitespace-nowrap text-[15vw] font-extrabold leading-[0.74] tracking-[-0.045em] text-white/[0.04]">
            Drop&nbsp;Coupon
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-[12.5px] text-white/50 md:flex-row">
          <p>© {year} Drop Coupon. All rights reserved.</p>
          <p className="max-w-xl text-center md:text-right">
            Offers verified at time of publishing; check the merchant for final
            terms. Drop Coupon may earn a commission. Logos are trademarks of
            their owners.
          </p>
          <span className="flex shrink-0 items-center gap-2 text-white/60">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Offers verified daily
          </span>
        </div>
      </div>
    </footer>
  );
}
