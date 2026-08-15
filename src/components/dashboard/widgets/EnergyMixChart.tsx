import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import DashboardGlassCard from '../shared/DashboardGlassCard';
import ChartContainer from '../shared/ChartContainer';

const data = [
  { name: 'Solar', value: 38, color: '#FBBF24' },
  { name: 'Wind', value: 12, color: '#67E8F9' },
  { name: 'Grid', value: 42, color: '#3B82F6' },
  { name: 'Battery', value: 8, color: '#22C55E' },
];

export default function EnergyMixChart() {
  return (
    <DashboardGlassCard className="p-4 h-full">
      <ChartContainer title="Energy Mix" subtitle="Current source distribution">
        <div className="flex items-center gap-4">
          <div className="w-32 h-32 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={30}
                  outerRadius={52}
                  paddingAngle={3}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1200}
                  strokeWidth={0}
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'rgba(255,255,255,0.95)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                  }}
                  itemStyle={{ color: '#0F172A', fontSize: '11px', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2.5 flex-1">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] text-dash-textMuted">{item.name}</span>
                </div>
                <span className="text-[12px] font-semibold text-dash-text font-data">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </ChartContainer>
    </DashboardGlassCard>
  );
}
