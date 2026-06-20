import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Drop Coupon.",
};

const EMAIL = "info@dropcoupon.com";
const UPDATED = "June 1, 2026";

export default function TermsPage() {
  return (
    <div className="container-page">
      <section className="border-b border-line py-16 md:py-24">
        <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted">
          Legal
        </p>
        <h1 className="mt-5 max-w-3xl text-[40px] font-extrabold leading-[1.03] tracking-[-0.02em] text-ink md:text-[56px]">
          Terms of Service
        </h1>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted md:text-[19px]">
          These terms set out the deal between you and Drop Coupon when you use
          the site. Using it means you agree to them.
        </p>
        <p className="mt-6 text-[13px] text-muted">Last updated {UPDATED}</p>
      </section>

      <section className="py-14 md:py-20">
        <div className="prose max-w-3xl">
          <h2>Using Drop Coupon</h2>
          <p>
            Drop Coupon is a free directory of promo codes, discounts, and deals
            for third-party products. You may browse and use it for personal,
            non-commercial purposes. Please don&rsquo;t disrupt the service,
            attempt to break or overload it, scrape it at scale, or pass yourself
            off as us.
          </p>

          <h2>About the offers</h2>
          <p>
            Codes and deals are gathered from our team and our community, and they
            change quickly. We work hard to keep them accurate and to flag the
            ones we&rsquo;ve confirmed, but we can&rsquo;t promise any particular
            code will work, still be available, or apply to your order. The final
            price, eligibility, and conditions are always set by the retailer at
            checkout — not by us.
          </p>

          <h2>Links to other sites</h2>
          <p>
            Our offers lead to websites we don&rsquo;t own or control. Once you
            leave Drop Coupon, the destination&rsquo;s own terms and privacy
            practices apply, and your purchase is strictly between you and that
            retailer.
          </p>

          <h2>Brands and trademarks</h2>
          <p>
            The Drop Coupon name, design, and the writing on this site belong to
            us. Product names and logos shown here are the trademarks of their
            respective owners and are used only to identify those products. Their
            presence doesn&rsquo;t imply any partnership or endorsement unless we
            say so.
          </p>

          <h2>No warranty</h2>
          <p>
            The site is provided &ldquo;as is.&rdquo; We don&rsquo;t guarantee it
            will always be available, error-free, or that every listing is
            current.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent the law allows, Drop Coupon isn&rsquo;t liable
            for losses arising from your use of the site or from any third-party
            offer, including missed savings or a code that didn&rsquo;t work.
          </p>

          <h2>Changes and contact</h2>
          <p>
            We may update these terms as the service evolves; continuing to use
            the site means you accept the current version. Questions? Email{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. See also our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
