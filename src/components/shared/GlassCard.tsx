import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className = '', hover = false, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={`
        bg-white/[0.55] backdrop-blur-[20px] border border-white/70
        rounded-organic
        shadow-[0_20px_60px_-15px_rgba(34,197,94,0.10)]
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
      whileHover={hover ? { y: -4, boxShadow: '0 24px 60px -15px rgba(34,197,94,0.18)' } : undefined}
      whileTap={hover ? { scale: 0.97 } : undefined}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
    >
      {children}
    </motion.div>
  );
}
