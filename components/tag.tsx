import type { ReactNode } from "react";

type TagVariant = "code" | "promo" | "verified" | "category";

const base =
  "inline-flex items-center rounded-[var(--radius-sm)] border px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.04em] leading-none";

const variants: Record<TagVariant, string> = {
  // Monochrome type tag, subtle tinted background.
  code: "border-line bg-background text-ink",
  promo: "border-line bg-background text-ink",
  // Trust state — the one place a status tag may use the primary accent.
  verified: "border-primary text-ink bg-transparent",
  category: "border-line text-muted bg-transparent",
};

export interface TagProps {
  variant: TagVariant;
  children: ReactNode;
  className?: string;
}

export function Tag({ variant, children, className = "" }: TagProps) {
  return (
    <span className={`${base} ${variants[variant]} ${className}`.trim()}>
      {variant === "verified" ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1 h-3 w-3 text-primary"
        >
          <path d="m5 12 5 5L20 7" />
        </svg>
      ) : null}
      {children}
    </span>
  );
}
