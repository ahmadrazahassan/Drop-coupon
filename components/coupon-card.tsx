"use client";

import { useState } from "react";
import type { CouponWithStore } from "@/lib/types";
import { Button } from "./button";
import { StoreLogo } from "./store-logo";
import { Tag } from "./tag";
import { RevealModal } from "./reveal-modal";

export interface CouponCardProps {
  coupon: CouponWithStore;
}

function formatExpiry(expires: string): string {
  if (expires === "ongoing") return "Expires: Ongoing";
  const date = new Date(expires);
  if (Number.isNaN(date.getTime())) return `Expires: ${expires}`;
  return `Expires: ${date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const [open, setOpen] = useState(false);
  const isCode = coupon.type === "code";

  return (
    <article className="group rounded-[var(--radius)] border border-line bg-surface p-6 transition-all hover:border-ink hover:shadow-[0_2px_12px_rgba(35,35,35,0.06)]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Left — brand block */}
        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-center">
          <StoreLogo store={coupon.store} size="md" />
          <Tag variant={isCode ? "code" : "promo"}>{isCode ? "Code" : "Promo"}</Tag>
        </div>

        {/* Middle — content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[18px] font-bold tracking-[-0.01em] text-ink">
              {coupon.discount}
            </span>
            {coupon.verified ? <Tag variant="verified">Verified</Tag> : null}
          </div>
          <h3 className="mt-1 text-[15px] font-semibold text-ink">
            {coupon.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-[13.5px] text-muted">
            {coupon.description}
          </p>
        </div>

        {/* Right — action */}
        <div className="flex shrink-0 flex-col gap-1.5 sm:w-44 sm:items-stretch">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setOpen(true)}
          >
            {isCode ? "Reveal the Code" : "Get the Deal"}
          </Button>
          <p className="text-center text-[13px] text-muted sm:text-right">
            {formatExpiry(coupon.expires)}
          </p>
        </div>
      </div>

      <RevealModal coupon={coupon} open={open} onClose={() => setOpen(false)} />
    </article>
  );
}
