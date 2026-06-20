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
        className="absolute inset-0 cursor-default bg-ink/55"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="relative w-full max-w-md rounded-[var(--radius-lg)] border border-line bg-surface p-6 shadow-xl md:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius)] text-muted hover:text-ink"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <StoreLogo store={coupon.store} size="md" />
          <p className="mt-4 text-[13px] font-medium uppercase tracking-[0.04em] text-muted">
            {coupon.store.name}
          </p>
          <h2 id={titleId} className="mt-1 text-[22px] font-bold text-ink">
            {coupon.discount}
          </h2>
          <p className="mt-2 text-[14px] text-muted">{coupon.title}</p>
          {coupon.verified ? (
            <span className="mt-3">
              <Tag variant="verified">Verified</Tag>
            </span>
          ) : null}
        </div>

        {isCode ? (
          <div className="mt-6">
            <div className="flex items-center justify-center rounded-[var(--radius)] border border-dashed border-ink bg-background px-4 py-3">
              <span className="select-all text-[18px] font-bold tracking-[0.08em] text-ink">
                {coupon.code}
              </span>
            </div>
            <div className="mt-4 grid gap-3">
              <Button variant="primary" size="lg" fullWidth onClick={copy}>
                {copied ? "Copied" : "Copy code"}
              </Button>
              <Button
                variant="outline"
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
        )}
      </div>
    </div>,
    document.body,
  );
}
