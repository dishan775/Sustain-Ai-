import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import DashboardGlassCard from '../shared/DashboardGlassCard';
import ChartContainer from '../shared/ChartContainer';

const data = [
  { time: '12AM', co2: 82 },
  { time: '2AM', co2: 68 },
  { time: '4AM', co2: 55 },
  { time: '6AM', co2: 72 },
  { time: '8AM', co2: 110 },
  { time: '10AM', co2: 128 },
  { time: '12PM', co2: 135 },
  { time: '2PM', co2: 122 },
  { time: '4PM', co2: 138 },
  { time: '6PM', co2: 145 },
  { time: '8PM', co2: 118 },
  { time: '10PM', co2: 95 },
];

export default function CarbonEmissionsChart() {
  return (
    <DashboardGlassCard className="p-4 h-full">
      <ChartContainer
        title="Carbon Emissions"
        subtitle="24-hour CO₂ trend (tCO₂)"
        action={
          <span className="text-lg font-bold text-dash-text font-data">128.6 <span className="text-[11px] text-dash-textMuted font-medium">tCO₂</span></span>
        }
      >
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                tick={{ fill: '#64748B', fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                interval={2}
              />
              <YAxis
                tick={{ fill: '#64748B', fontSize: 9 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                }}
                labelStyle={{ color: '#64748B', fontSize: '11px', marginBottom: '4px' }}
                itemStyle={{ color: '#0F172A', fontSize: '12px', fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="co2"
                stroke="#22C55E"
                strokeWidth={2}
                fill="url(#carbonGradient)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartContainer>
    </DashboardGlassCard>
  );
}
