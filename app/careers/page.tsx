import type { Metadata } from "next";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Drop Coupon — a small, remote-first team building a trustworthy place to save on AI tools.",
};

const EMAIL = "info@dropcoupon.com";

const HOW_WE_WORK = [
  {
    n: "01",
    title: "Trust is the product",
    body: "We measure success by how reliable our listings are, not by how many we publish. Everyone here protects that standard.",
  },
  {
    n: "02",
    title: "Small team, real ownership",
    body: "Few people, little process. You'll own meaningful work end to end and see it ship to real users within days.",
  },
  {
    n: "03",
    title: "Remote and async",
    body: "Work from wherever you do your best thinking. We keep meetings light and decisions written down.",
  },
];

const BENEFITS = [
  "Fully remote, flexible hours",
  "Four-day focus weeks",
  "Hardware and software budget",
  "Paid time off that people actually take",
  "Annual team gathering",
  "A real say in what we build",
];

export default function CareersPage() {
  return (
    <div className="container-page">
      {/* Hero */}
      <section className="border-b border-line py-16 md:py-24">
        <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted">
          Careers
        </p>
        <h1 className="mt-5 max-w-3xl text-[40px] font-extrabold leading-[1.03] tracking-[-0.02em] text-ink md:text-[58px]">
          Build the most trusted place to save on AI.
        </h1>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted md:text-[19px]">
          We&rsquo;re a small, remote-first team making it easier for people to
          afford the AI tools they depend on. If careful, useful products are
          your thing, you&rsquo;ll fit in here.
        </p>
      </section>

      {/* How we work */}
      <section className="py-14 md:py-20">
        <h2 className="max-w-2xl text-[28px] font-bold tracking-[-0.01em] text-ink md:text-[34px]">
          How we work
        </h2>
        <div className="mt-10 grid gap-x-10 gap-y-12 md:mt-12 md:grid-cols-3">
          {HOW_WE_WORK.map((p) => (
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

      {/* Benefits */}
      <section className="border-t border-line py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <h2 className="text-[28px] font-bold tracking-[-0.01em] text-ink md:text-[34px]">
            What we offer
          </h2>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <li
                key={b}
                className="border-t border-line pt-4 text-[15px] text-ink"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Open roles */}
      <section className="border-t border-line py-14 md:py-20">
        <div className="max-w-3xl">
          <h2 className="text-[28px] font-bold tracking-[-0.01em] text-ink md:text-[34px]">
            Open roles
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            We don&rsquo;t have a position open right now, but we hire ahead of
            need and read every thoughtful note. If you&rsquo;re strong in
            product engineering, content, or partnerships, introduce yourself —
            tell us what you&rsquo;d want to build here and share something
            you&rsquo;re proud of.
          </p>
          <div className="mt-8">
            <Button
              href={`mailto:${EMAIL}?subject=Introduction`}
              external
              variant="primary"
              size="lg"
            >
              Introduce yourself
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
