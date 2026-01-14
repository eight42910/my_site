"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import NavLink from "./NavLink";
import MobileMenuOverlay from "./MobileMenuOverlay";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setScrollProgress(0);
      return;
    }

    let ticking = false;

    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

      setIsScrolled(scrollTop > 8);
      setScrollProgress(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const root = document.documentElement;
    const page = document.getElementById("page-content");

    if (open) {
      root.classList.add("menu-open");
      page?.setAttribute("aria-hidden", "true");
      page?.setAttribute("inert", "");
      headerRef.current?.setAttribute("aria-hidden", "true");
      headerRef.current?.setAttribute("inert", "");
    } else {
      root.classList.remove("menu-open");
      page?.removeAttribute("aria-hidden");
      page?.removeAttribute("inert");
      headerRef.current?.removeAttribute("aria-hidden");
      headerRef.current?.removeAttribute("inert");
    }
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-[100] w-full border-b transition-all duration-200 ease-out motion-reduce:transition-none ${
        isScrolled
          ? "border-black/10 bg-white/80 backdrop-blur-md"
          : "border-transparent bg-white"
      } relative`}
    >
      <Container
        className={`flex items-center justify-between transition-[height] duration-200 ease-out motion-reduce:transition-none ${
          isScrolled ? "h-14" : "h-16"
        }`}
      >
        <Link href="/" className="text-lg font-semibold tracking-tight">
          EITO.
        </Link>
        <nav className="hidden items-center gap-3 md:flex">
          <NavLink href="/" label="HOME" />
          <NavLink href="/product" label="PRODUCT" />
          <NavLink href="/works" label="WORK" />
          <NavLink href="/blog" label="BLOG" />
          <NavLink href="/about" label="ABOUT" />
        </nav>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-sm uppercase tracking-[0.2em] transition-colors hover:border-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/30 md:hidden"
        >
          ≡
        </button>
      </Container>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-black/10 motion-reduce:hidden"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />
      <MobileMenuOverlay open={open} onClose={() => setOpen(false)} returnFocusRef={triggerRef} />
    </header>
  );
}
