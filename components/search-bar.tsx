"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { SearchIcon } from "./icons";

type Size = "md" | "lg";

export interface SearchBarProps {
  size?: Size;
  defaultValue?: string;
  className?: string;
  /** Visible label is hidden by default; provide for accessibility context. */
  label?: string;
}

export function SearchBar({
  size = "md",
  defaultValue = "",
  className = "",
  label = "Search stores, brands, or codes",
}: SearchBarProps) {
  const router = useRouter();
  const id = useId();
  const [value, setValue] = useState(defaultValue);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  const height = size === "lg" ? "text-[16px]" : "h-11 text-[14px]";

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={`relative w-full ${className}`.trim()}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
        <SearchIcon className="h-5 w-5" />
      </span>
      <input
        id={id}
        type="search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search stores, brands, or codes"
        autoComplete="off"
        className={`w-full rounded-[var(--radius)] border border-line bg-surface pl-10 pr-4 text-ink placeholder:text-muted focus:border-primary focus:outline-none ${height}`}
        style={size === "lg" ? { height: "52px" } : undefined}
      />
    </form>
  );
}
