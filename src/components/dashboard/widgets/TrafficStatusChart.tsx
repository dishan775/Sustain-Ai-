import { motion } from 'framer-motion';
import DashboardGlassCard from '../shared/DashboardGlassCard';
import ChartContainer from '../shared/ChartContainer';

const data = [
  { label: 'Smooth', value: 48, color: '#22C55E' },
  { label: 'Moderate', value: 32, color: '#FBBF24' },
  { label: 'Heavy', value: 15, color: '#F97316' },
  { label: 'Jam', value: 5, color: '#EF4444' },
];

export default function TrafficStatusChart() {
  return (
    <DashboardGlassCard className="p-4 h-full">
      <ChartContainer title="Traffic Status" subtitle="Road condition distribution">
        <div className="space-y-3 mt-1">
          {data.map((item, i) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-dash-textMuted">{item.label}</span>
                <span className="text-[12px] font-semibold text-dash-text font-data">{item.value}%</span>
              </div>
              <div className="w-full h-1.5 bg-black/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          ))}

          {/* Stacked bar */}
          <div className="flex h-3 rounded-full overflow-hidden mt-3">
            {data.map((item, i) => (
              <motion.div
                key={item.label}
                className="h-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>
        </div>
      </ChartContainer>
    </DashboardGlassCard>
  );
}
