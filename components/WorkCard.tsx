'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

export type WorkCardProps = {
  title: string;
  category: string;
  year: string;
  slug: string;
  coverImage: string;
  outcome: string;
  tags: string[];
  className?: string;
  enableMotion?: boolean;
};

export default function WorkCard({
  title,
  category,
  year,
  slug,
  coverImage,
  outcome,
  tags,
  className = '',
  enableMotion = false,
}: WorkCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(cardRef, {
    margin: '-30% 0px -30% 0px',
    amount: 0.4,
  });

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [12, -12]);

  const motionEnabled = enableMotion && !prefersReducedMotion;
  const cardOpacity = motionEnabled ? (isInView ? 1 : 0.94) : 1;
  const imageScale = motionEnabled ? (isInView ? 1.02 : 1) : 1;
  const imageY = motionEnabled ? parallaxY : 0;

  return (
    <Link
      ref={cardRef}
      href={`/works/${slug}`}
      className={`group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${className}`}
    >
      <motion.div
        className="relative"
        animate={{ opacity: cardOpacity }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div className="relative overflow-hidden bg-muted/5">
          <motion.div
            ref={imageRef}
            className="relative aspect-[4/3] w-full"
            style={{ y: imageY }}
            animate={{ scale: imageScale }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={motionEnabled ? { scale: 1.05 } : undefined}
          >
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
        <div className="mt-5 border-t border-border pt-4">
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-muted">
            <span>{category}</span>
            <span className="rounded-full border border-border px-3 py-1 text-[10px] text-muted">
              {year}
            </span>
          </div>
          <p className="mt-3 text-sm leading-[1.7] text-muted">{outcome}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-muted">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-muted2 px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5 text-xs uppercase tracking-[0.3em] text-muted hover:text-fg">
            View case study →
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
