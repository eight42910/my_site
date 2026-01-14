"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`hover-underline rounded-full px-3 py-2 text-xs uppercase tracking-[0.3em] transition-colors ${
        isActive
          ? "border-b border-fg pb-1 text-fg"
          : "text-muted hover:bg-fg/5 hover:text-fg"
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/30`}
    >
      {label}
    </Link>
  );
}
