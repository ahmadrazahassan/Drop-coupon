import Image from "next/image";
import type { Store } from "@/lib/types";

type Size = "sm" | "md" | "lg";

const sizeClasses: Record<Size, string> = {
  sm: "h-14 w-14",
  md: "h-20 w-20",
  lg: "h-24 w-24 md:h-28 md:w-28",
};

const pixelSize: Record<Size, number> = { sm: 56, md: 80, lg: 112 };

export interface StoreLogoProps {
  store: Pick<Store, "name" | "logo">;
  size?: Size;
  className?: string;
}

/**
 * Placeholder-aware logo tile. Renders the store's SVG in a fixed
 * aspect-ratio rectangular container with object-contain, so dropping in a
 * real logo later needs no layout change.
 */
export function StoreLogo({ store, size = "md", className = "" }: StoreLogoProps) {
  const px = pixelSize[size];
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-[var(--radius)] border border-line bg-surface p-2 ${sizeClasses[size]} ${className}`.trim()}
    >
      <Image
        src={store.logo}
        alt={`${store.name} logo`}
        width={px}
        height={px}
        unoptimized
        className="h-full w-full object-contain"
      />
    </div>
  );
}
