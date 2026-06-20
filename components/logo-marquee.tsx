import Image from "next/image";
import Link from "next/link";
import type { Store } from "@/lib/types";
import { getStores } from "@/lib/data";

function Tile({ store }: { store: Store }) {
  return (
    <Link
      href={`/store/${store.slug}`}
      className="mr-4 flex shrink-0 items-center gap-3 rounded-[14px] border border-line bg-surface px-5 py-3 transition-all hover:border-ink hover:shadow-[0_2px_12px_rgba(35,35,35,0.06)]"
    >
      <Image
        src={store.logo}
        alt={`${store.name} logo`}
        width={26}
        height={26}
        unoptimized
        className="h-[26px] w-[26px] shrink-0 object-contain"
      />
      <span className="whitespace-nowrap text-[14px] font-medium text-ink">
        {store.name}
      </span>
    </Link>
  );
}

function Row({ stores, reverse }: { stores: Store[]; reverse?: boolean }) {
  // Duplicate the list so the -50% translate loops seamlessly.
  const items = [...stores, ...stores];
  return (
    <div className="marquee" aria-hidden="true">
      <div className={`marquee-track ${reverse ? "marquee-track--rev" : ""}`}>
        {items.map((store, i) => (
          <Tile key={`${store.slug}-${i}`} store={store} />
        ))}
      </div>
    </div>
  );
}

/** Full-bleed, auto-scrolling strip of real AI-tool logos. */
export function LogoMarquee() {
  const stores = getStores();
  const row1 = stores.slice(0, 22);
  const row2 = stores.slice(22, 44);
  return (
    <div className="flex flex-col gap-3">
      <Row stores={row1} />
      <Row stores={row2} reverse />
    </div>
  );
}
