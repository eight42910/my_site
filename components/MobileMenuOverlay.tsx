"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useScrollLock from "../hooks/useScrollLock";
import useFocusTrap from "../hooks/useFocusTrap";

type MobileMenuOverlayProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement>;
};

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/product", label: "PRODUCT" },
  { href: "/works", label: "WORK" },
  { href: "/blog", label: "BLOG" },
  { href: "/about", label: "ABOUT" }
];

export default function MobileMenuOverlay({ open, onClose, returnFocusRef }: MobileMenuOverlayProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [mounted, setMounted] = useState(false);

  useScrollLock(open);
  useFocusTrap(panelRef, open, returnFocusRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setAnimate(false);
    const raf = requestAnimationFrame(() => setAnimate(true));
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] h-[100dvh]" id="mobile-menu">
      <div
        className={`menu-scrim fixed inset-0 h-[100dvh] transition-opacity duration-200 ${
          animate ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
        onClick={onClose}
      />
      <div className="fixed inset-0 h-[100dvh]">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          tabIndex={-1}
          className={`relative flex h-full flex-col px-6 py-6 transition-opacity transition-transform duration-200 sm:px-10 ${
            animate ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold tracking-tight">EITO.</div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="h-11 w-11 rounded-full border border-border text-sm uppercase tracking-[0.2em] text-fg transition-colors hover:border-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/20"
            >
              ×
            </button>
          </div>

          <nav className="mt-16 flex flex-1 flex-col justify-center gap-5 text-[22px]">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-h-11 items-center uppercase tracking-[0.2em] transition-colors ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="text-xs text-muted">
            <div>For: Visionaries, Startups, & Minimalists.</div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
