import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { Easing } from 'framer-motion';

const ease: Easing = [0.16, 1, 0.3, 1];

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string | ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`${align === 'center' ? 'text-center' : 'text-left'} max-w-3xl ${align === 'center' ? 'mx-auto' : ''} mb-16 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >

      <motion.h2
        className="text-[clamp(28px,4vw,44px)] font-medium tracking-[-0.03em] text-sustain-ink leading-tight"
        variants={childVariants}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-5 text-lg font-normal text-sustain-muted leading-relaxed"
          variants={childVariants}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
