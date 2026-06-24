import type { Faq } from "@/lib/store-content";

export interface FaqAccordionProps {
  items: Faq[];
}

/**
 * Accessible, JS-free FAQ list built on native <details>/<summary>. A thin
 * plus/minus rule (CSS only) signals open state — no decorative iconography.
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-[var(--radius)] border border-line bg-surface">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold text-ink transition-colors hover:bg-background [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="relative h-3.5 w-3.5 shrink-0 text-muted"
            >
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
              <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-200 group-open:rotate-90 group-open:opacity-0" />
            </span>
          </summary>
          <p className="px-5 pb-5 text-[14px] leading-relaxed text-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
