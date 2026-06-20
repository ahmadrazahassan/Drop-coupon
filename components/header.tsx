"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SearchBar } from "./search-bar";
import { MenuIcon, CloseIcon, ChevronRightIcon } from "./icons";

/** Primary navigation, rendered as a segmented control on desktop. */
const SEGMENTS = [
  { label: "Top Codes", href: "/top" },
  { label: "Builders", href: "/category/ai-builders" },
  { label: "Coding", href: "/category/ai-coding" },
  { label: "Chat", href: "/category/ai-chat" },
  { label: "Search", href: "/category/ai-search" },
  { label: "Software", href: "/category/ai-software" },
];

/** Unique brand mark: a perforated coupon ticket with a cyan punch + tear line. */
function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Drop Coupon home"
      className="group inline-flex items-center gap-2.5"
    >
      <svg
        viewBox="0 0 40 32"
        aria-hidden="true"
        className="h-8 w-auto transition-transform duration-300 group-hover:-rotate-6"
      >
        {/* ticket body */}
        <rect x="2" y="4" width="36" height="24" rx="7" fill="var(--ink)" />
        {/* side notches that give the ticket its waist */}
        <circle cx="2" cy="16" r="4.5" fill="var(--surface)" />
        <circle cx="38" cy="16" r="4.5" fill="var(--surface)" />
        {/* perforated tear line */}
        <line
          x1="27"
          y1="9"
          x2="27"
          y2="23"
          stroke="var(--primary)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="0.5 3.2"
        />
        {/* punch hole */}
        <circle cx="13" cy="16" r="2.8" fill="var(--primary)" />
      </svg>
      <span className="text-[19px] font-extrabold leading-none tracking-[-0.02em] text-ink">
        Drop Coupon
      </span>
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/top" ? pathname === "/top" : pathname === href;

  return (
    <header className="relative z-40">
      {/* Slim announcement bar — scrolls away above the sticky nav. */}
      <div className="bg-ink text-white">
        <div className="container-page flex h-9 items-center justify-between text-[12px]">
          <span className="flex items-center gap-2 text-white/80">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Verified codes for 85+ AI tools, updated daily.
          </span>
          <Link
            href="/top"
            className="hidden items-center gap-1 font-medium text-primary hover:text-white sm:inline-flex"
          >
            Browse top codes
            <ChevronRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Sticky main nav with a subtle frosted surface. */}
      <div className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur-md">
        <div className="container-page flex h-16 items-center gap-4">
          <Logo />

          {/* Segmented nav — desktop only */}
          <nav className="ml-2 hidden lg:block" aria-label="Primary">
            <div className="flex items-center gap-1 rounded-[12px] border border-line bg-background p-1">
              {SEGMENTS.map((seg) => {
                const active = isActive(seg.href);
                return (
                  <Link
                    key={seg.href}
                    href={seg.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-[8px] px-3 py-1.5 text-[13px] font-medium transition-colors ${
                      active
                        ? "bg-ink text-white"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {seg.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Search — pushed to the right edge */}
          <div className="ml-auto hidden w-48 lg:block xl:w-64">
            <SearchBar size="md" />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] border border-line text-ink lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile panel */}
        {menuOpen ? (
          <div className="border-t border-line bg-surface lg:hidden">
            <div className="container-page flex flex-col gap-4 py-4">
              <SearchBar size="md" />
              <nav className="grid grid-cols-2 gap-2" aria-label="Mobile">
                {SEGMENTS.map((seg) => {
                  const active = isActive(seg.href);
                  return (
                    <Link
                      key={seg.href}
                      href={seg.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded-[var(--radius)] border px-3 py-2.5 text-[14px] font-medium transition-colors ${
                        active
                          ? "border-ink bg-ink text-white"
                          : "border-line text-ink hover:border-ink"
                      }`}
                    >
                      {seg.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
