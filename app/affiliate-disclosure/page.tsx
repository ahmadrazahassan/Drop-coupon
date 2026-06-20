import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "How Drop Coupon earns money and stays free to use.",
};

const EMAIL = "info@dropcoupon.com";
const UPDATED = "June 1, 2026";

export default function AffiliateDisclosurePage() {
  return (
    <div className="container-page">
      <section className="border-b border-line py-16 md:py-24">
        <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted">
          Legal
        </p>
        <h1 className="mt-5 max-w-3xl text-[40px] font-extrabold leading-[1.03] tracking-[-0.02em] text-ink md:text-[56px]">
          Affiliate Disclosure
        </h1>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted md:text-[19px]">
          Drop Coupon is free, and we&rsquo;d rather be upfront about how that
          works than bury it. Here&rsquo;s the full picture.
        </p>
        <p className="mt-6 text-[13px] text-muted">Last updated {UPDATED}</p>
      </section>

      <section className="py-14 md:py-20">
        <div className="prose max-w-3xl">
          <h2>How we earn</h2>
          <p>
            Some links on Drop Coupon are affiliate links. If you click one and go
            on to subscribe or buy, the retailer may pay us a small commission.
            That payment comes out of their margin — it never adds anything to
            your price, and you&rsquo;re free to use any offer without going
            through our link.
          </p>

          <h2>What it doesn&rsquo;t change</h2>
          <ul>
            <li>
              Commissions never decide whether an offer is marked Verified.
            </li>
            <li>
              Commissions never change how offers are ranked or sorted.
            </li>
            <li>
              We list offers that earn us nothing whenever they&rsquo;re the best
              option for you.
            </li>
          </ul>

          <h2>Trademarks</h2>
          <p>
            Product names and logos on this site belong to their respective
            owners and are shown only to identify those products. Featuring a
            brand doesn&rsquo;t imply it endorses or is affiliated with Drop
            Coupon.
          </p>

          <h2>Questions</h2>
          <p>
            Want to know whether a specific link is affiliated? Just ask at{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. You can also read our{" "}
            <Link href="/privacy">Privacy Policy</Link> and{" "}
            <Link href="/terms">Terms of Service</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
