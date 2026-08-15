import { motion } from 'framer-motion';
import { Car, Timer, Route, Gauge, TrafficCone, BatteryCharging } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import DashboardGlassCard from '../shared/DashboardGlassCard';
import ChartContainer from '../shared/ChartContainer';
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

const vehicleDensity = [
  { t: '6AM', cars: 8200, buses: 420, bikes: 3100 }, { t: '8AM', cars: 18500, buses: 880, bikes: 7200 },
  { t: '10AM', cars: 15200, buses: 750, bikes: 5800 }, { t: '12PM', cars: 13400, buses: 680, bikes: 4900 },
  { t: '2PM', cars: 14100, buses: 710, bikes: 5200 }, { t: '4PM', cars: 16800, buses: 820, bikes: 6400 },
  { t: '6PM', cars: 21000, buses: 950, bikes: 8500 }, { t: '8PM', cars: 12800, buses: 580, bikes: 4200 },
  { t: '10PM', cars: 7400, buses: 320, bikes: 2100 },
];

const speedData = [
  { corridor: 'Nashik Phata', avg: 22, peak: 12 }, { corridor: 'Hinjewadi', avg: 28, peak: 15 },
  { corridor: 'Wakad', avg: 18, peak: 8 }, { corridor: 'Aundh', avg: 32, peak: 20 },
  { corridor: 'Kharadi', avg: 35, peak: 25 }, { corridor: 'Shivajinagar', avg: 20, peak: 10 },
];

const travelTime = [
  { t: '6AM', actual: 18, predicted: 17 }, { t: '8AM', actual: 38, predicted: 35 },
  { t: '10AM', actual: 28, predicted: 27 }, { t: '12PM', actual: 24, predicted: 24 },
  { t: '2PM', actual: 26, predicted: 25 }, { t: '4PM', actual: 32, predicted: 30 },
  { t: '6PM', actual: 42, predicted: 40 }, { t: '8PM', actual: 22, predicted: 22 },
];

const congestionZones = [
  { name: 'Wakad Junction', level: 'severe', vehicles: 3420, wait: '8.5 min' },
  { name: 'Nashik Phata', level: 'heavy', vehicles: 2850, wait: '5.2 min' },
  { name: 'Hinjewadi Phase 2', level: 'heavy', vehicles: 2640, wait: '4.8 min' },
  { name: 'Thergaon Circle', level: 'moderate', vehicles: 1920, wait: '3.1 min' },
  { name: 'Aundh–Baner Rd', level: 'moderate', vehicles: 1680, wait: '2.7 min' },
  { name: 'Kharadi Bypass', level: 'low', vehicles: 980, wait: '1.2 min' },
];

const levelColors: Record<string, string> = { severe: '#EF4444', heavy: '#F97316', moderate: '#FBBF24', low: '#22C55E' };
const levelBadge: Record<string, 'critical' | 'warning' | 'info' | 'good'> = { severe: 'critical', heavy: 'warning', moderate: 'info', low: 'good' };

const kpis = [
  { icon: Car, label: 'Active Vehicles', value: '45,234', color: '#F97316' },
  { icon: Gauge, label: 'Avg Speed', value: '26 km/h', color: '#3B82F6' },
  { icon: TrafficCone, label: 'Congestion Zones', value: '6', color: '#FBBF24' },
  { icon: Timer, label: 'Avg Travel Time', value: '28 min', color: '#22C55E' },
  { icon: Route, label: 'Routes Optimized', value: '142', color: '#67E8F9' },
  { icon: BatteryCharging, label: 'EV on Road', value: '2,180', color: '#22C55E' },
];

export default function MobilityPage() {
  return (
    <div className="space-y-6">
      <motion.div {...stagger(0)}>
        <h1 className="text-2xl font-bold text-dash-text tracking-tight">Mobility Intelligence</h1>
        <p className="text-sm text-dash-textMuted mt-1">Real-time transportation monitoring, prediction, and optimization for Pune/PCMC.</p>
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

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <motion.div {...stagger(0.1)}>
          <DashboardGlassCard className="p-5">
            <ChartContainer title="Vehicle Density" subtitle="By type across 24 hours">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={vehicleDensity} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                    <defs>
                      <linearGradient id="carsG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} /><stop offset="100%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient>
                      <linearGradient id="bikesG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22C55E" stopOpacity={0.25} /><stop offset="100%" stopColor="#22C55E" stopOpacity={0} /></linearGradient>
                    </defs>
                    <XAxis dataKey="t" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip {...tooltipStyle} />
                    <Area type="monotone" dataKey="cars" stroke="#3B82F6" strokeWidth={2} fill="url(#carsG)" name="Cars" />
                    <Area type="monotone" dataKey="bikes" stroke="#22C55E" strokeWidth={2} fill="url(#bikesG)" name="Bikes" />
                    <Area type="monotone" dataKey="buses" stroke="#FBBF24" strokeWidth={1.5} fill="none" name="Buses" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </DashboardGlassCard>
        </motion.div>

        <motion.div {...stagger(0.15)}>
          <DashboardGlassCard className="p-5">
            <ChartContainer title="Travel Time Prediction" subtitle="Actual vs AI Predicted (minutes)">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={travelTime} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                    <XAxis dataKey="t" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip {...tooltipStyle} />
                    <Line type="monotone" dataKey="actual" stroke="#F97316" strokeWidth={2} dot={false} name="Actual" />
                    <Line type="monotone" dataKey="predicted" stroke="#22C55E" strokeWidth={2} strokeDasharray="6 3" dot={false} name="AI Predicted" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </DashboardGlassCard>
        </motion.div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4">
        <motion.div {...stagger(0.2)}>
          <DashboardGlassCard className="p-5">
            <ChartContainer title="Corridor Speeds" subtitle="Average vs Peak-hour (km/h)">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={speedData} layout="vertical" margin={{ top: 5, right: 20, bottom: 0, left: 20 }} barCategoryGap="20%">
                    <XAxis type="number" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="corridor" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
                    <Tooltip {...tooltipStyle} />
                    <Bar dataKey="avg" fill="#3B82F6" radius={[0, 4, 4, 0]} name="Average" barSize={10} />
                    <Bar dataKey="peak" fill="#EF4444" radius={[0, 4, 4, 0]} name="Peak Hour" barSize={10} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </DashboardGlassCard>
        </motion.div>

        <motion.div {...stagger(0.25)}>
          <DashboardGlassCard className="p-5 h-full">
            <ChartContainer title="Congestion Zones" subtitle="Active hotspots">
              <div className="space-y-2.5 mt-1">
                {congestionZones.map((zone, i) => (
                  <motion.div
                    key={zone.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] border border-black/[0.04]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: levelColors[zone.level] }} />
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-dash-text truncate">{zone.name}</p>
                        <p className="text-[10px] text-dash-textMuted">{zone.vehicles.toLocaleString()} vehicles · {zone.wait} avg wait</p>
                      </div>
                    </div>
                    <StatusBadge variant={levelBadge[zone.level]} label={zone.level} />
                  </motion.div>
                ))}
              </div>
            </ChartContainer>
          </DashboardGlassCard>
        </motion.div>
      </div>
    </div>
  );
}
