import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import DashboardGlassCard from '../shared/DashboardGlassCard';

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  color?: string;
  delay?: number;
  gauge?: number; // 0-100 for circular gauge
}

export default function KPICard({
  icon: Icon,
  label,
  value,
  trend,
  trendDirection = 'neutral',
  color = '#22C55E',
  delay = 0,
  gauge,
}: KPICardProps) {
  const trendColors = {
    up: 'text-emerald-400',
    down: 'text-red-400',
    neutral: 'text-dash-textMuted',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <DashboardGlassCard className="p-4 h-full" hover glow="green">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${color}15` }}
              >
                <Icon size={16} style={{ color }} strokeWidth={1.8} />
              </div>
              <span className="text-[11px] font-medium text-dash-textMuted uppercase tracking-wider truncate">
                {label}
              </span>
            </div>
            <p className="text-2xl font-bold text-dash-text font-data tracking-tight">{value}</p>
            {trend && (
              <p className={`text-[11px] font-medium mt-1 ${trendColors[trendDirection]}`}>
                {trend}
              </p>
            )}
          </div>
          {gauge !== undefined && (
            <div className="relative flex-shrink-0">
              <svg width={48} height={48} viewBox="0 0 48 48">
                <circle
                  cx={24} cy={24} r={19}
                  fill="none"
                  stroke="rgba(0,0,0,0.04)"
                  strokeWidth={4}
                />
                <motion.circle
                  cx={24} cy={24} r={19}
                  fill="none"
                  stroke={color}
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 19}
                  initial={{ strokeDashoffset: 2 * Math.PI * 19 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 19 * (1 - gauge / 100) }}
                  transition={{ duration: 1.5, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="-rotate-90 origin-center"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '24px 24px' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-dash-text">{gauge}</span>
              </div>
            </div>
          )}
        </div>
      </DashboardGlassCard>
    </motion.div>
  );
}
