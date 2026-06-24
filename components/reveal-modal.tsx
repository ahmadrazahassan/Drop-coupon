"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CouponWithStore } from "@/lib/types";
import { Button } from "./button";
import { StoreLogo } from "./store-logo";
import { Tag } from "./tag";
import { CloseIcon } from "./icons";

export interface RevealModalProps {
  coupon: CouponWithStore;
  open: boolean;
  onClose: () => void;
}

function formatExpiry(expires: string): string {
  if (expires === "ongoing") return "No expiry date";
  const date = new Date(expires);
  if (Number.isNaN(date.getTime())) return `Expires ${expires}`;
  return `Expires ${date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

export function RevealModal({ coupon, open, onClose }: RevealModalProps) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  // Esc to close + focus trap.
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open]);

  const copy = useCallback(async () => {
    if (!coupon.code) return;
    const text = coupon.code;

    const writeViaApi = async () => {
      if (!navigator.clipboard?.writeText) return false;
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        return false;
      }
    };

    // Fallback for contexts where the async Clipboard API is blocked by a
    // permissions policy (e.g. some embedded/preview environments).
    const writeViaExecCommand = () => {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(textarea);
        return ok;
      } catch {
        return false;
      }
    };

    const ok = (await writeViaApi()) || writeViaExecCommand();
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }, [coupon.code]);

  if (!mounted || !open) return null;

  const isCode = coupon.type === "code" && Boolean(coupon.code);
  const titleId = `reveal-title-${coupon.id}`;
  const expiry = formatExpiry(coupon.expires);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 cursor-default bg-ink/60"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="relative w-full max-w-[400px] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface shadow-[0_24px_60px_-20px_rgba(35,35,35,0.35)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius)] text-muted transition-colors hover:bg-background hover:text-ink"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* Header — brand + meta */}
        <div className="flex items-center gap-3 border-b border-line px-6 pb-5 pt-6">
          <StoreLogo store={coupon.store} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-ink">
              {coupon.store.name}
            </p>
            <p className="text-[12.5px] uppercase tracking-[0.04em] text-muted">
              {isCode ? "Promo code" : "Exclusive deal"}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <div className="flex items-center gap-2">
            <span className="text-[28px] font-extrabold tracking-[-0.02em] text-ink">
              {coupon.discount}
            </span>
            {coupon.verified ? <Tag variant="verified">Verified</Tag> : null}
          </div>
          <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
            {coupon.title}
          </p>

          {isCode ? (
            <div className="mt-6">
              <p className="text-[12.5px] font-medium uppercase tracking-[0.04em] text-muted">
                Your code
              </p>
              <div className="mt-2 flex items-stretch overflow-hidden rounded-[var(--radius)] border border-dashed border-ink">
                <span className="flex flex-1 select-all items-center px-4 py-3 text-[18px] font-bold tracking-[0.12em] text-ink">
                  {coupon.code}
                </span>
                <button
                  type="button"
                  onClick={copy}
                  className="shrink-0 border-l border-dashed border-ink bg-background px-5 text-[13px] font-semibold text-ink transition-colors hover:bg-primary hover:text-ink"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">
                Paste this code into the promo field at {coupon.store.name}{" "}
                checkout and confirm the discount before paying.
              </p>
              <div className="mt-5">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  href={coupon.url}
                  external
                >
                  Continue to {coupon.store.name}
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <p className="text-[13px] leading-relaxed text-muted">
                {coupon.description}
              </p>
              <div className="mt-5">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  href={coupon.url}
                  external
                >
                  Continue to {coupon.store.name}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer — trust + expiry */}
        <div className="flex items-center justify-between gap-3 border-t border-line bg-background px-6 py-3.5 text-[12.5px] text-muted">
          <span>{expiry}</span>
          <span>Checked by Drop Coupon</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
