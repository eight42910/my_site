'use client';

import { motion, Variants } from 'framer-motion';
import Button from './Button';
import Container from './Container';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <section className="hero-surface relative min-h-[90vh] flex items-center">
      <Container size="hero" className="py-24 sm:py-32 lg:py-36">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.p variants={itemVariants} className="upper-label mb-8 block">
            AI × Human Intelligence
          </motion.p>

          <div className="relative">
            <h1 className="text-5xl font-black leading-[0.85] tracking-tightest sm:text-7xl lg:text-8xl">
              <span className="sr-only">LESS IS REVOLUTION.</span>
              <motion.div className="overflow-hidden" aria-hidden>
                <motion.div variants={itemVariants} className="text-fg">
                  LESS IS
                </motion.div>
              </motion.div>
              <motion.div className="overflow-hidden" aria-hidden>
                <motion.div variants={itemVariants} className="text-muted2">
                  REVOLUTION.
                </motion.div>
              </motion.div>
            </h1>
          </div>

          <motion.p
            variants={itemVariants}
            className="mt-10 max-w-2xl text-lg leading-[1.8] text-muted sm:text-xl"
          >
            AI × Human Intelligence. 業務の代替ではなく、進化を。
            <br className="hidden sm:block" />
            情報密度を削ぎ落とし、速度と品質が共存するプロダクト体験を設計する。
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center"
          >
            <Button href="/works" label="See our work" />
            <p className="text-xs uppercase tracking-[0.15em] text-muted2">
              For Visionaries & Minimalists
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
