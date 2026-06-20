import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "The cookies Drop Coupon uses, what they do, and how to control them.",
};

const EMAIL = "info@dropcoupon.com";
const UPDATED = "June 1, 2026";

export default function CookiesPage() {
  return (
    <div className="container-page">
      <section className="border-b border-line py-16 md:py-24">
        <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted">
          Legal
        </p>
        <h1 className="mt-5 max-w-3xl text-[40px] font-extrabold leading-[1.03] tracking-[-0.02em] text-ink md:text-[56px]">
          Cookie Policy
        </h1>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted md:text-[19px]">
          Cookies are small files that help the site work and help us understand
          what&rsquo;s useful. Here&rsquo;s every type we use.
        </p>
        <p className="mt-6 text-[13px] text-muted">Last updated {UPDATED}</p>
      </section>

      <section className="py-14 md:py-20">
        <div className="prose max-w-3xl">
          <h2>The cookies we use</h2>
          <h3>Essential</h3>
          <p>
            Required for the site to function — they handle navigation, security,
            and remembering basic preferences. The site can&rsquo;t work properly
            without them, so they can&rsquo;t be switched off here.
          </p>
          <h3>Analytics</h3>
          <p>
            Help us see which pages and offers people find useful, so we can
            improve them. We aggregate this data and keep it non-identifying
            wherever we can.
          </p>
          <h3>Affiliate</h3>
          <p>
            Set by a retailer&rsquo;s network when you click out to an offer, so
            the referral can be credited to us. These are governed by that
            retailer&rsquo;s own cookie and privacy policies.
          </p>

          <h2>Controlling cookies</h2>
          <p>
            Every major browser lets you view, block, or delete cookies in its
            settings. Blocking some may affect how parts of the site behave. To
            manage retailer cookies, check the policy on the site you visit after
            clicking an offer.
          </p>

          <h2>More information</h2>
          <p>
            Cookies sit alongside the data described in our{" "}
            <Link href="/privacy">Privacy Policy</Link>. If anything here is
            unclear, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
