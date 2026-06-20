import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Drop Coupon curates and verifies promo codes, discounts, and deals for the AI tools people actually use.",
};

const STATS = [
  { value: "85+", label: "AI tools tracked" },
  { value: "5", label: "Categories" },
  { value: "Daily", label: "Updated" },
  { value: "Free", label: "Always, to use" },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Trust over volume",
    body: "We would rather list fewer offers than a single one that doesn't work. An offer is marked Verified only when there's real evidence behind it.",
  },
  {
    n: "02",
    title: "Real links, real prices",
    body: "Every offer points to the tool's own website, and our links never change the price you pay. What you see is what you get at checkout.",
  },
  {
    n: "03",
    title: "Built to stay current",
    body: "AI pricing changes constantly. We keep listings fresh, retire dead codes, and clearly separate confirmed offers from unverified ones.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-page">
      {/* Hero */}
      <section className="border-b border-line py-16 md:py-24">
        <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted">
          About Drop Coupon
        </p>
        <h1 className="mt-5 max-w-4xl text-[40px] font-extrabold leading-[1.03] tracking-[-0.02em] text-ink md:text-[58px]">
          Saving on AI tools should be simple, honest, and fast.
        </h1>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted md:text-[19px]">
          Drop Coupon curates and verifies promo codes and deals for the AI
          tools people actually use — so you never overpay for the software that
          runs your work.
        </p>
      </section>

      {/* Stats */}
      <section className="py-14 md:py-20">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-surface p-6 md:p-8">
              <div className="text-[36px] font-extrabold tracking-[-0.02em] text-ink md:text-[44px]">
                {s.value}
              </div>
              <div className="mt-1 text-[14px] text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-line py-14 md:py-20">
        <h2 className="max-w-2xl text-[28px] font-bold tracking-[-0.01em] text-ink md:text-[34px]">
          What we stand for
        </h2>
        <div className="mt-10 grid gap-x-10 gap-y-12 md:mt-12 md:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div key={p.n}>
              <div className="text-[14px] font-semibold text-primary">{p.n}</div>
              <h3 className="mt-3 text-[19px] font-semibold text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How offers work */}
      <section className="border-t border-line py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-8">
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
              Codes
            </p>
            <h3 className="mt-2 text-[22px] font-bold text-ink">
              Reveal, copy, done
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Open a code to reveal it, copy it in one click, and continue to the
              store to apply it at checkout. We surface confirmed codes first.
            </p>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-8">
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
              Deals
            </p>
            <h3 className="mt-2 text-[22px] font-bold text-ink">
              Straight to the saving
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              No code needed — deals link directly to a sale, free tier, or
              student program on the tool's own site. Nothing to paste.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-line py-14 md:py-20">
        <div className="max-w-3xl">
          <h2 className="text-[24px] font-bold leading-tight tracking-[-0.01em] text-ink md:text-[30px]">
            Drop Coupon is free to use, and stays that way through affiliate
            partnerships that never affect your price.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Read more about how we make money in our{" "}
            <Link
              href="/affiliate-disclosure"
              className="text-ink underline underline-offset-2 hover:text-primary"
            >
              affiliate disclosure
            </Link>
            .
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/top" variant="primary" size="lg">
            Browse top codes
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Get in touch
          </Button>
        </div>
      </section>
    </div>
  );
}
