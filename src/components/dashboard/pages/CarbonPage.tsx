import { motion } from 'framer-motion';
import { Leaf, Factory, Car, Building2, TrendingDown, Target, Flame, TreePine } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import DashboardGlassCard from '../shared/DashboardGlassCard';
import ChartContainer from '../shared/ChartContainer';
import AnimatedGauge from '../shared/AnimatedGauge';
import StatusBadge from '../shared/StatusBadge';

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

const emissionTimeline = [
  { month: 'Jan', emissions: 152 }, { month: 'Feb', emissions: 148 }, { month: 'Mar', emissions: 145 },
  { month: 'Apr', emissions: 140 }, { month: 'May', emissions: 138 }, { month: 'Jun', emissions: 134 },
  { month: 'Jul', emissions: 131 }, { month: 'Aug', emissions: 128 },
];

const emissionSources = [
  { name: 'Transport', value: 48, color: '#F97316' },
  { name: 'Buildings', value: 27, color: '#3B82F6' },
  { name: 'Industry', value: 15, color: '#FBBF24' },
  { name: 'Other', value: 10, color: '#64748B' },
];

const carbonIntensity = [
  { t: '12AM', intensity: 0.42 }, { t: '4AM', intensity: 0.38 }, { t: '8AM', intensity: 0.55 },
  { t: '12PM', intensity: 0.48 }, { t: '4PM', intensity: 0.62 }, { t: '8PM', intensity: 0.52 },
];

const wardEmissions = [
  { ward: 'Ward 3', emissions: 18.2 }, { ward: 'Ward 5', emissions: 22.4 },
  { ward: 'Ward 7', emissions: 28.1 }, { ward: 'Ward 9', emissions: 15.8 },
  { ward: 'Ward 12', emissions: 19.6 }, { ward: 'Ward 15', emissions: 24.5 },
];

const reductions = [
  { initiative: 'EV fleet transition', reduction: '4.2%', status: 'active', icon: Car },
  { initiative: 'Solar rooftop expansion', reduction: '3.8%', status: 'active', icon: TreePine },
  { initiative: 'Smart signal optimization', reduction: '2.1%', status: 'active', icon: TrendingDown },
  { initiative: 'Industrial efficiency audit', reduction: '1.9%', status: 'planned', icon: Factory },
  { initiative: 'Green building standards', reduction: '1.5%', status: 'planned', icon: Building2 },
];

const kpis = [
  { icon: Leaf, label: 'Total CO₂', value: '128.6 tCO₂', color: '#22C55E' },
  { icon: TrendingDown, label: 'Reduction', value: '18%', color: '#22C55E' },
  { icon: Target, label: 'Net-Zero', value: '34%', color: '#3B82F6' },
  { icon: Flame, label: 'Carbon Intensity', value: '0.48 tCO₂/MWh', color: '#F97316' },
  { icon: Factory, label: 'Industrial', value: '19.3 tCO₂', color: '#FBBF24' },
  { icon: Car, label: 'Transport', value: '61.7 tCO₂', color: '#F97316' },
];

export default function CarbonPage() {
  return (
    <div className="space-y-6">
      <motion.div {...stagger(0)}>
        <h1 className="text-2xl font-bold text-dash-text tracking-tight">Carbon Intelligence</h1>
        <p className="text-sm text-dash-textMuted mt-1">CO₂ tracking, emission analysis, and net-zero progress for Pune/PCMC.</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={kpi.label} {...stagger(i * 0.05)}>
              <DashboardGlassCard className="p-4" hover glow="green">
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

      {/* Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <motion.div {...stagger(0.1)}>
          <DashboardGlassCard className="p-5">
            <ChartContainer title="Emission Trend" subtitle="Monthly CO₂ (tCO₂) — declining">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={emissionTimeline} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                    <defs>
                      <linearGradient id="emG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22C55E" stopOpacity={0.25} /><stop offset="100%" stopColor="#22C55E" stopOpacity={0} /></linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} domain={[100, 160]} />
                    <Tooltip {...tooltipStyle} />
                    <Area type="monotone" dataKey="emissions" stroke="#22C55E" strokeWidth={2} fill="url(#emG)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </DashboardGlassCard>
        </motion.div>

        <motion.div {...stagger(0.15)}>
          <DashboardGlassCard className="p-5">
            <ChartContainer title="Emission Sources" subtitle="By sector breakdown">
              <div className="flex items-center gap-6">
                <div className="w-40 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={emissionSources} innerRadius={38} outerRadius={60} paddingAngle={3} dataKey="value" strokeWidth={0}>
                        {emissionSources.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ ...tooltipStyle.contentStyle }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 flex-1">
                  {emissionSources.map(e => (
                    <div key={e.name}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
                          <span className="text-[11px] text-dash-textMuted">{e.name}</span>
                        </div>
                        <span className="text-[12px] font-semibold text-dash-text font-data">{e.value}%</span>
                      </div>
                      <div className="w-full h-1 bg-black/[0.04] rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ backgroundColor: e.color }} initial={{ width: 0 }} animate={{ width: `${e.value}%` }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ChartContainer>
          </DashboardGlassCard>
        </motion.div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div {...stagger(0.2)}>
          <DashboardGlassCard className="p-5">
            <ChartContainer title="Net-Zero Progress" subtitle="Toward 2040 target">
              <div className="flex flex-col items-center gap-4 mt-4">
                <AnimatedGauge value={34} size={110} strokeWidth={8} color="#22C55E" label="Progress" />
                <div className="text-center">
                  <p className="text-[12px] text-dash-textMuted">Target: <span className="text-dash-text font-semibold">2040</span></p>
                  <StatusBadge variant="good" label="On Track" className="mt-2" />
                </div>
              </div>
            </ChartContainer>
          </DashboardGlassCard>
        </motion.div>

        <motion.div {...stagger(0.25)}>
          <DashboardGlassCard className="p-5">
            <ChartContainer title="Carbon Intensity" subtitle="tCO₂/MWh over 24 hours">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={carbonIntensity} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                    <defs>
                      <linearGradient id="ciG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F97316" stopOpacity={0.25} /><stop offset="100%" stopColor="#F97316" stopOpacity={0} /></linearGradient>
                    </defs>
                    <XAxis dataKey="t" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip {...tooltipStyle} />
                    <Area type="monotone" dataKey="intensity" stroke="#F97316" strokeWidth={2} fill="url(#ciG)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </DashboardGlassCard>
        </motion.div>

        <motion.div {...stagger(0.3)}>
          <DashboardGlassCard className="p-5">
            <ChartContainer title="Ward Emissions" subtitle="tCO₂ by ward">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={wardEmissions} margin={{ top: 5, right: 5, bottom: 0, left: -10 }} barCategoryGap="25%">
                    <XAxis dataKey="ward" tick={{ fill: '#64748B', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="emissions" fill="#22C55E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </DashboardGlassCard>
        </motion.div>
      </div>

      {/* Reduction Initiatives */}
      <motion.div {...stagger(0.35)}>
        <DashboardGlassCard className="p-5">
          <ChartContainer title="Carbon Reduction Initiatives" subtitle="Active and planned programs">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-1">
              {reductions.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={r.initiative}
                    className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] border border-black/[0.04]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-dash-text truncate">{r.initiative}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-bold text-emerald-400 font-data">{r.reduction}</span>
                        <StatusBadge variant={r.status === 'active' ? 'live' : 'neutral'} label={r.status} />
                      </div>
                    </div>
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
