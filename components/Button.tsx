'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type ButtonProps = {
  href: string;
  label: string;
};

export default function Button({ href, label }: ButtonProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="group inline-flex items-center gap-3 rounded-full bg-fg px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-bg transition-colors hover:bg-fg/90"
      >
        <span>{label}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </motion.a>
    </Link>
  );
}
