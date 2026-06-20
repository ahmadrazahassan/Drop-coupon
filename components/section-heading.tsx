import Link from "next/link";
import type { ReactNode } from "react";

export interface SectionHeadingProps {
  title: string;
  description?: ReactNode;
  /** Optional trailing text link, e.g. "View all". */
  action?: { label: string; href: string };
  as?: "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  title,
  description,
  action,
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-3 ${className}`.trim()}>
      <div className="max-w-2xl">
        <Tag className="text-[28px] font-bold text-ink md:text-[34px]">{title}</Tag>
        {description ? (
          <p className="mt-2 text-[15px] text-muted">{description}</p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="text-[14px] font-medium text-ink underline-offset-4 hover:text-primary hover:underline"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
