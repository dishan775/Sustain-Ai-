import { motion } from 'framer-motion';
import { Zap, Sun, Battery, Building2, BatteryCharging, Wind } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import DashboardGlassCard from '../shared/DashboardGlassCard';
import ChartContainer from '../shared/ChartContainer';
import StatusBadge from '../shared/StatusBadge';
import AnimatedGauge from '../shared/AnimatedGauge';

const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const tooltipStyle = {
  contentStyle: { background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: '8px 12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
  labelStyle: { color: '#64748B', fontSize: 11, fontWeight: 600 },
  itemStyle: { color: '#0F172A', fontSize: 12, fontWeight: 600 },
};

const demandData = [
  { t: '12AM', demand: 0.62, capacity: 2.0 }, { t: '3AM', demand: 0.48, capacity: 2.0 },
  { t: '6AM', demand: 0.75, capacity: 2.0 }, { t: '9AM', demand: 1.15, capacity: 2.0 },
  { t: '12PM', demand: 1.28, capacity: 2.0 }, { t: '3PM', demand: 1.32, capacity: 2.0 },
  { t: '6PM', demand: 1.45, capacity: 2.0 }, { t: '9PM', demand: 1.12, capacity: 2.0 },
];

const solarGeneration = [
  { t: '6AM', gen: 0.02 }, { t: '7AM', gen: 0.12 }, { t: '8AM', gen: 0.35 },
  { t: '9AM', gen: 0.58 }, { t: '10AM', gen: 0.78 }, { t: '11AM', gen: 0.92 },
  { t: '12PM', gen: 1.05 }, { t: '1PM', gen: 1.1 }, { t: '2PM', gen: 0.95 },
  { t: '3PM', gen: 0.72 }, { t: '4PM', gen: 0.45 }, { t: '5PM', gen: 0.18 },
  { t: '6PM', gen: 0.04 },
];

const energyMix = [
  { name: 'Solar', value: 38, color: '#FBBF24' },
  { name: 'Wind', value: 12, color: '#67E8F9' },
  { name: 'Grid', value: 42, color: '#3B82F6' },
  { name: 'Battery', value: 8, color: '#22C55E' },
];

const evChargingData = [
  { t: '6AM', sessions: 180 }, { t: '8AM', sessions: 420 }, { t: '10AM', sessions: 680 },
  { t: '12PM', sessions: 820 }, { t: '2PM', sessions: 780 }, { t: '4PM', sessions: 920 },
  { t: '6PM', sessions: 1100 }, { t: '8PM', sessions: 1246 }, { t: '10PM', sessions: 890 },
];

const kpis = [
  { icon: Zap, label: 'Current Demand', value: '1.28 GW', color: '#3B82F6' },
  { icon: Sun, label: 'Solar Output', value: '1.05 GW', color: '#FBBF24' },
  { icon: Battery, label: 'Battery Level', value: '82%', color: '#22C55E' },
  { icon: Building2, label: 'Grid Load', value: '64%', color: '#F97316' },
  { icon: BatteryCharging, label: 'EV Charging', value: '1,246', color: '#22C55E' },
  { icon: Wind, label: 'Wind Output', value: '48 MW', color: '#67E8F9' },
];

const flowNodes = [
  { label: 'Solar', icon: Sun, color: '#FBBF24', output: '1.05 GW' },
  { label: 'Wind', icon: Wind, color: '#67E8F9', output: '48 MW' },
  { label: 'Grid', icon: Zap, color: '#3B82F6', output: '0.85 GW' },
  { label: 'Battery', icon: Battery, color: '#22C55E', output: '82%' },
  { label: 'Buildings', icon: Building2, color: '#F97316', output: '0.92 GW' },
  { label: 'EV Chargers', icon: BatteryCharging, color: '#22C55E', output: '0.28 GW' },
];

export default function EnergyPage() {
  return (
    <div className="space-y-6">
      <motion.div {...stagger(0)}>
        <h1 className="text-2xl font-bold text-dash-text tracking-tight">Energy Intelligence</h1>
        <p className="text-sm text-dash-textMuted mt-1">Urban energy monitoring, solar forecasting, and grid optimization.</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={kpi.label} {...stagger(i * 0.05)}>
              <DashboardGlassCard className="p-4" hover glow="blue">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
                    <Icon size={16} style={{ color: kpi.color }} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-dash-text font-data">{kpi.value}</p>
                    <p className="text-[10px] text-dash-textMuted">{kpi.label}</p>
                  </div>
                </div>
              </DashboardGlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Row 1: Demand + Solar */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <motion.div {...stagger(0.1)}>
          <DashboardGlassCard className="p-5">
            <ChartContainer title="Electricity Demand" subtitle="Current: 1.28 GW · Forecast: 1.45 GW"
              action={<StatusBadge variant="warning" label="Peak in 45 min" />}
            >
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={demandData} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                    <defs>
                      <linearGradient id="dmdG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} /><stop offset="100%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient>
                    </defs>
                    <XAxis dataKey="t" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 2.2]} />
                    <Tooltip {...tooltipStyle} />
                    <Area type="monotone" dataKey="capacity" stroke="rgba(255,255,255,0.1)" strokeWidth={1} fill="none" strokeDasharray="4 4" name="Capacity" />
                    <Area type="monotone" dataKey="demand" stroke="#3B82F6" strokeWidth={2} fill="url(#dmdG)" name="Demand" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </DashboardGlassCard>
        </motion.div>

        <motion.div {...stagger(0.15)}>
          <DashboardGlassCard className="p-5">
            <ChartContainer title="Solar Generation" subtitle="Today's output curve (GW)">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={solarGeneration} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                    <defs>
                      <linearGradient id="solG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FBBF24" stopOpacity={0.3} /><stop offset="100%" stopColor="#FBBF24" stopOpacity={0} /></linearGradient>
                    </defs>
                    <XAxis dataKey="t" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip {...tooltipStyle} />
                    <Area type="monotone" dataKey="gen" stroke="#FBBF24" strokeWidth={2} fill="url(#solG)" name="Generation" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </DashboardGlassCard>
        </motion.div>
      </div>

      {/* Row 2: Energy Mix + Grid Stability + EV Charging */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div {...stagger(0.2)}>
          <DashboardGlassCard className="p-5">
            <ChartContainer title="Energy Mix" subtitle="Source distribution">
              <div className="flex items-center gap-4 mt-2">
                <div className="w-36 h-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={energyMix} innerRadius={35} outerRadius={58} paddingAngle={3} dataKey="value" strokeWidth={0}>
                        {energyMix.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ ...tooltipStyle.contentStyle }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {energyMix.map(e => (
                    <div key={e.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
                      <span className="text-[11px] text-dash-textMuted">{e.name}</span>
                      <span className="text-[12px] font-semibold text-dash-text font-data ml-auto">{e.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </ChartContainer>
          </DashboardGlassCard>
        </motion.div>

        <motion.div {...stagger(0.25)}>
          <DashboardGlassCard className="p-5">
            <ChartContainer title="Grid Stability" subtitle="System health indicators">
              <div className="flex flex-col items-center gap-4 mt-4">
                <AnimatedGauge value={64} size={100} strokeWidth={8} color="#3B82F6" label="Load %" />
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] text-center">
                    <span className="text-[10px] text-dash-textMuted block">Frequency</span>
                    <span className="text-[14px] font-bold text-dash-text font-data">50.02 Hz</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] text-center">
                    <span className="text-[10px] text-dash-textMuted block">Voltage</span>
                    <span className="text-[14px] font-bold text-dash-text font-data">230.8 V</span>
                  </div>
                </div>
              </div>
            </ChartContainer>
          </DashboardGlassCard>
        </motion.div>

        <motion.div {...stagger(0.3)}>
          <DashboardGlassCard className="p-5">
            <ChartContainer title="EV Charging Demand" subtitle="Active sessions over time">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={evChargingData} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                    <defs>
                      <linearGradient id="evG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22C55E" stopOpacity={0.25} /><stop offset="100%" stopColor="#22C55E" stopOpacity={0} /></linearGradient>
                    </defs>
                    <XAxis dataKey="t" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip {...tooltipStyle} />
                    <Area type="monotone" dataKey="sessions" stroke="#22C55E" strokeWidth={2} fill="url(#evG)" name="Sessions" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </DashboardGlassCard>
        </motion.div>
      </div>

      {/* Energy Flow Diagram */}
      <motion.div {...stagger(0.35)}>
        <DashboardGlassCard className="p-5">
          <ChartContainer title="Energy Flow" subtitle="Source → Grid → Consumption">
            <div className="flex items-center justify-around flex-wrap gap-4 py-4">
              {flowNodes.map((node, i) => {
                const Icon = node.icon;
                return (
                  <motion.div
                    key={node.label}
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center" style={{ borderColor: `${node.color}40`, backgroundColor: `${node.color}10` }}>
                      <Icon size={22} style={{ color: node.color }} />
                    </div>
                    <span className="text-[11px] font-semibold text-dash-text">{node.label}</span>
                    <span className="text-[10px] text-dash-textMuted font-data">{node.output}</span>
                    {i < flowNodes.length - 1 && i !== 3 && (
                      <motion.div
                        className="absolute"
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </ChartContainer>
        </DashboardGlassCard>
      </motion.div>
    </div>
  );
}
