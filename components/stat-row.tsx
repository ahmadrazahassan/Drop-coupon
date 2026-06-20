import { Fragment } from "react";

export interface StatRowProps {
  items: string[];
  className?: string;
}

/** Thin row of plain-text stats separated by dividers — no icons, no cards. */
export function StatRow({ items, className = "" }: StatRowProps) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted ${className}`.trim()}
    >
      {items.map((item, i) => (
        <Fragment key={item}>
          {i > 0 ? (
            <span aria-hidden="true" className="text-line">
              ·
            </span>
          ) : null}
          <span>{item}</span>
        </Fragment>
      ))}
    </p>
  );
}
