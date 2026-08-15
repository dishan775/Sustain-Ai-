import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DashboardGlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'green' | 'blue' | 'amber' | 'none';
  onClick?: () => void;
}

const glowMap = {
  green: 'hover:shadow-[0_0_30px_-8px_rgba(34,197,94,0.2)]',
  blue: 'hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.2)]',
  amber: 'hover:shadow-[0_0_30px_-8px_rgba(251,191,36,0.2)]',
  none: '',
};

export default function DashboardGlassCard({
  children,
  className = '',
  hover = false,
  glow = 'none',
  onClick,
}: DashboardGlassCardProps) {
  return (
    <motion.div
      className={`
        bg-white/70 backdrop-blur-[16px]
        border border-black/[0.06]
        rounded-dashboard-lg
        transition-all duration-300
        ${hover ? `cursor-pointer ${glowMap[glow]} hover:bg-white/90 hover:border-black/[0.1]` : ''}
        ${className}
      `}
      whileHover={hover ? { y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
    >
      {children}
    </motion.div>
  );
}
