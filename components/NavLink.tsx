'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

type NavLinkProps = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`relative rounded-full px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors ${
        isActive ? 'text-fg' : 'text-muted hover:text-fg'
      }`}
    >
      {label}
      {isActive && (
        <motion.span
          layoutId="navDot"
          className="absolute inset-x-0 -bottom-1 mx-auto h-[3px] w-[3px] rounded-full bg-accent-tech"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
}
