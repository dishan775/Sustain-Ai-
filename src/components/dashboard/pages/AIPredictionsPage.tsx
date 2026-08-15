import { motion } from 'framer-motion';
import { Zap, Car, Sun, Cloud, BatteryCharging, Leaf } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
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

const trafficForecast = [
  { t: 'Now', actual: 45, predicted: 45 }, { t: '+1h', predicted: 52 }, { t: '+2h', predicted: 58 },
  { t: '+3h', predicted: 48 }, { t: '+6h', predicted: 35 }, { t: '+12h', predicted: 28 },
  { t: '+24h', predicted: 42 }, { t: '+48h', predicted: 46 }, { t: '+72h', predicted: 44 },
];

const energyForecast = [
  { t: 'Now', actual: 1.28, predicted: 1.28 }, { t: '+1h', predicted: 1.35 }, { t: '+2h', predicted: 1.42 },
  { t: '+3h', predicted: 1.45 }, { t: '+6h', predicted: 1.32 }, { t: '+12h', predicted: 0.85 },
  { t: '+24h', predicted: 1.22 }, { t: '+48h', predicted: 1.30 }, { t: '+72h', predicted: 1.28 },
];

const solarForecast = [
  { t: 'Now', actual: 1.05, predicted: 1.05 }, { t: '+1h', predicted: 0.95 }, { t: '+2h', predicted: 0.72 },
  { t: '+3h', predicted: 0.45 }, { t: '+6h', predicted: 0.0 }, { t: '+12h', predicted: 0.0 },
  { t: '+24h', predicted: 0.85 }, { t: '+48h', predicted: 1.1 }, { t: '+72h', predicted: 0.92 },
];

const carbonForecast = [
  { t: 'Now', actual: 128, predicted: 128 }, { t: '+1h', predicted: 132 }, { t: '+2h', predicted: 138 },
  { t: '+3h', predicted: 135 }, { t: '+6h', predicted: 122 }, { t: '+12h', predicted: 95 },
  { t: '+24h', predicted: 126 }, { t: '+48h', predicted: 130 }, { t: '+72h', predicted: 125 },
];

const predictions = [
  { icon: Car, title: 'Traffic Volume', current: '45,234 vehicles', forecast: '↑ 15% in 2 hours', confidence: 92, status: 'warning' as const, color: '#F97316' },
  { icon: Zap, title: 'Energy Demand', current: '1.28 GW', forecast: 'Peak 1.45 GW in 3h', confidence: 94, status: 'warning' as const, color: '#3B82F6' },
  { icon: Sun, title: 'Solar Generation', current: '1.05 GW', forecast: '↓ 60% by 4PM', confidence: 88, status: 'info' as const, color: '#FBBF24' },
  { icon: BatteryCharging, title: 'EV Charging', current: '1,246 sessions', forecast: '↑ 22% by evening', confidence: 86, status: 'info' as const, color: '#22C55E' },
  { icon: Leaf, title: 'Carbon Emissions', current: '128.6 tCO₂', forecast: 'Spike at 5PM', confidence: 84, status: 'warning' as const, color: '#22C55E' },
  { icon: Cloud, title: 'Air Quality', current: 'AQI 42', forecast: '↑ to 68 by evening', confidence: 81, status: 'good' as const, color: '#67E8F9' },
];

const accuracyMetrics = [
  { model: 'Traffic Prediction', accuracy: 94.2, lastWeek: 93.8 },
  { model: 'Energy Demand', accuracy: 96.1, lastWeek: 95.7 },
  { model: 'Solar Forecast', accuracy: 91.5, lastWeek: 90.2 },
  { model: 'Carbon Forecast', accuracy: 89.8, lastWeek: 88.4 },
  { model: 'AQI Prediction', accuracy: 87.3, lastWeek: 86.9 },
];

export default function AIPredictionsPage() {
  return (
    <div className="space-y-6">
      <motion.div {...stagger(0)}>
        <h1 className="text-2xl font-bold text-dash-text tracking-tight">AI Predictions</h1>
        <p className="text-sm text-dash-textMuted mt-1">72-hour forecasts across traffic, energy, solar, and carbon — powered by temporal fusion transformers.</p>
      </motion.div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {predictions.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div key={p.title} {...stagger(i * 0.06)}>
              <DashboardGlassCard className="p-4" hover glow="green">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${p.color}15` }}>
                    <Icon size={18} style={{ color: p.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[13px] font-semibold text-dash-text">{p.title}</h3>
                      <StatusBadge variant={p.status} label={`${p.confidence}%`} />
                    </div>
                    <p className="text-[15px] font-bold text-dash-text font-data mt-1">{p.current}</p>
                    <p className="text-[11px] text-dash-textMuted mt-0.5">{p.forecast}</p>
                  </div>
                </div>
              </DashboardGlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Forecast Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {[
          { title: 'Traffic Forecast', subtitle: '72-hour vehicle density (thousands)', data: trafficForecast, key: 'predicted', actualKey: 'actual', color: '#F97316' },
          { title: 'Energy Demand Forecast', subtitle: '72-hour demand (GW)', data: energyForecast, key: 'predicted', actualKey: 'actual', color: '#3B82F6' },
          { title: 'Solar Generation Forecast', subtitle: '72-hour output (GW)', data: solarForecast, key: 'predicted', actualKey: 'actual', color: '#FBBF24' },
          { title: 'Carbon Emissions Forecast', subtitle: '72-hour CO₂ (tCO₂)', data: carbonForecast, key: 'predicted', actualKey: 'actual', color: '#22C55E' },
        ].map((chart, i) => (
          <motion.div key={chart.title} {...stagger(0.15 + i * 0.08)}>
            <DashboardGlassCard className="p-5">
              <ChartContainer title={chart.title} subtitle={chart.subtitle}>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chart.data} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                      <XAxis dataKey="t" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip {...tooltipStyle} />
                      {chart.actualKey && <Line type="monotone" dataKey={chart.actualKey} stroke={chart.color} strokeWidth={2} dot={{ r: 3, fill: chart.color }} name="Actual" connectNulls={false} />}
                      <Line type="monotone" dataKey={chart.key} stroke={chart.color} strokeWidth={2} strokeDasharray="6 3" dot={false} name="Forecast" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </ChartContainer>
            </DashboardGlassCard>
          </motion.div>
        ))}
      </div>

      {/* Model Accuracy */}
      <motion.div {...stagger(0.5)}>
        <DashboardGlassCard className="p-5">
          <ChartContainer title="Model Accuracy" subtitle="Prediction performance metrics">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-1">
              {accuracyMetrics.map((m, i) => (
                <motion.div
                  key={m.model}
                  className="p-4 rounded-xl bg-black/[0.02] border border-black/[0.04] text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.08 }}
                >
                  <p className="text-[10px] text-dash-textMuted mb-2">{m.model}</p>
                  <p className="text-2xl font-bold text-emerald-400 font-data">{m.accuracy}%</p>
                  <p className="text-[10px] text-dash-textMuted mt-1">
                    Last week: {m.lastWeek}% <span className="text-emerald-400">↑</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </ChartContainer>
        </DashboardGlassCard>
      </motion.div>
    </div>
  );
}
