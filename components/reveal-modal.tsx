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
        className="backdrop-fade absolute inset-0 cursor-default bg-ink/55 backdrop-blur-[3px]"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="modal-pop relative w-full max-w-[400px] rounded-[var(--radius-lg)] border border-line bg-surface shadow-[0_30px_70px_-24px_rgba(35,35,35,0.45)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-background hover:text-ink"
        >
          <CloseIcon className="h-[18px] w-[18px]" />
        </button>

        {/* Upper zone — brand + offer */}
        <div className="flex flex-col items-center px-7 pb-7 pt-9 text-center">
          <StoreLogo store={coupon.store} size="md" />
          <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.12em] text-muted">
            {coupon.store.name} · {isCode ? "Promo code" : "Exclusive deal"}
          </p>
          <h2
            id={titleId}
            className="mt-2 text-[34px] font-extrabold leading-none tracking-[-0.03em] text-ink"
          >
            {coupon.discount}
          </h2>
          <p className="mt-2.5 max-w-[18rem] text-[14px] leading-relaxed text-muted">
            {coupon.title}
          </p>
          {coupon.verified ? (
            <span className="mt-3.5">
              <Tag variant="verified">Verified</Tag>
            </span>
          ) : null}
        </div>

        {/* Perforated voucher divider */}
        <div className="relative h-5">
          <span className="absolute -left-[11px] top-1/2 h-[22px] w-[22px] -translate-y-1/2 rounded-full border border-line bg-background" />
          <span className="absolute -right-[11px] top-1/2 h-[22px] w-[22px] -translate-y-1/2 rounded-full border border-line bg-background" />
          <span className="absolute left-5 right-5 top-1/2 -translate-y-1/2 border-t border-dashed border-line" />
        </div>

        {/* Lower zone — action */}
        <div className="px-7 pb-7 pt-5">
          {isCode ? (
            <>
              <div className="flex items-stretch overflow-hidden rounded-[var(--radius)] border border-ink/15 bg-background">
                <span className="flex flex-1 select-all items-center justify-center py-3.5 text-[19px] font-bold tracking-[0.14em] text-ink">
                  {coupon.code}
                </span>
                <button
                  type="button"
                  onClick={copy}
                  className="shrink-0 border-l border-ink/15 px-5 text-[13px] font-semibold text-ink transition-colors hover:bg-primary"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <Button
                className="mt-3"
                variant="primary"
                size="lg"
                fullWidth
                href={coupon.url}
                external
              >
                Continue to {coupon.store.name}
              </Button>
              <p className="mt-3.5 text-center text-[12.5px] leading-relaxed text-muted">
                Paste this code in the promo field at {coupon.store.name}{" "}
                checkout.
              </p>
            </>
          ) : (
            <>
              <p className="text-center text-[13.5px] leading-relaxed text-muted">
                {coupon.description}
              </p>
              <Button
                className="mt-4"
                variant="primary"
                size="lg"
                fullWidth
                href={coupon.url}
                external
              >
                Continue to {coupon.store.name}
              </Button>
            </>
          )}

          <div className="mt-5 flex items-center justify-center gap-2 text-[12px] text-muted">
            <span>{expiry}</span>
            <span aria-hidden="true" className="text-line">
              |
            </span>
            <span>Checked by Drop Coupon</span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
