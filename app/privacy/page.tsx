import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Drop Coupon collects, how we use it, and the control you have over your data.",
};

const EMAIL = "info@dropcoupon.com";
const UPDATED = "June 1, 2026";

export default function PrivacyPage() {
  return (
    <div className="container-page">
      <section className="border-b border-line py-16 md:py-24">
        <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted">
          Legal
        </p>
        <h1 className="mt-5 max-w-3xl text-[40px] font-extrabold leading-[1.03] tracking-[-0.02em] text-ink md:text-[56px]">
          Privacy Policy
        </h1>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted md:text-[19px]">
          We keep this short and plain because privacy shouldn&rsquo;t require a
          lawyer to read. Here is exactly what we collect and why.
        </p>
        <p className="mt-6 text-[13px] text-muted">Last updated {UPDATED}</p>
      </section>

      <section className="py-14 md:py-20">
        <div className="prose max-w-3xl">
          <h2>The short version</h2>
          <p>
            Drop Coupon is a directory of promo codes and deals. You can browse
            the entire site without an account, and we don&rsquo;t sell your
            personal information. We collect the minimum needed to run the site
            and improve it.
          </p>

          <h2>What we collect</h2>
          <h3>Information you give us</h3>
          <p>
            When you email us or use the contact form, we receive your name,
            email address, and whatever you write. We use it only to reply and to
            keep a record of the conversation.
          </p>
          <h3>Information collected automatically</h3>
          <p>
            Like most websites, we log basic technical data — pages visited,
            referring links, approximate location from your IP address, device
            type, and browser. This is aggregated to understand what&rsquo;s
            useful and to keep the service reliable and secure.
          </p>
          <h3>Cookies</h3>
          <p>
            We use a small number of cookies for essential functionality and
            privacy-respecting analytics. Full detail is in our{" "}
            <Link href="/cookies">Cookie Policy</Link>.
          </p>

          <h2>How we use it</h2>
          <ul>
            <li>To operate, secure, and improve the website.</li>
            <li>To reply to your messages and code submissions.</li>
            <li>To measure which offers and pages are genuinely helpful.</li>
            <li>To detect and prevent abuse, fraud, and technical faults.</li>
          </ul>

          <h2>Who we share it with</h2>
          <p>
            We share data only with the providers that help us run the site — our
            hosting platform and analytics provider — under agreements that limit
            them to processing it on our behalf. When you click an outbound offer
            link, the retailer&rsquo;s affiliate network may record the referral
            so the visit can be attributed. We never sell your data, and we never
            share your messages for marketing.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Contact messages are kept while they&rsquo;re useful for support and
            then deleted. Aggregated analytics may be retained longer because it
            no longer identifies you.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask us to access, correct, or delete any information
            you&rsquo;ve sent us, and you can control cookies through your browser
            settings at any time. Email{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we&rsquo;ll handle it
            within 30 days.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we change how we handle data, we&rsquo;ll update this page and the
            date above. Significant changes will be highlighted on the site.
          </p>
        </div>
      </section>
    </div>
  );
}
