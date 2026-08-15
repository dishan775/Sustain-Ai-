import { motion } from 'framer-motion';
import {
  Leaf, Cloud, Zap, Sun, Car, BatteryCharging, Wind,
} from 'lucide-react';
import KPICard from '../widgets/KPICard';
import DigitalTwinMap from '../widgets/DigitalTwinMap';
import CarbonEmissionsChart from '../widgets/CarbonEmissionsChart';
import EnergyMixChart from '../widgets/EnergyMixChart';
import TrafficStatusChart from '../widgets/TrafficStatusChart';
import AIRecommendationCard from '../widgets/AIRecommendationCard';
import MiniScenarioPanel from '../widgets/MiniScenarioPanel';
import TechStackBar from '../widgets/TechStackBar';
import DashboardGlassCard from '../shared/DashboardGlassCard';
import ChartContainer from '../shared/ChartContainer';
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

/* ── Mock Data ───────────────────────────────────────── */
const mobilityData = [
  { t: '6AM', density: 30 }, { t: '8AM', density: 72 }, { t: '10AM', density: 65 },
  { t: '12PM', density: 58 }, { t: '2PM', density: 54 }, { t: '4PM', density: 68 },
  { t: '6PM', density: 85 }, { t: '8PM', density: 55 }, { t: '10PM', density: 35 },
];

const energyData = [
  { t: '6AM', demand: 0.8, solar: 0.1 }, { t: '8AM', demand: 1.1, solar: 0.4 },
  { t: '10AM', demand: 1.2, solar: 0.8 }, { t: '12PM', demand: 1.28, solar: 1.1 },
  { t: '2PM', demand: 1.3, solar: 0.9 }, { t: '4PM', demand: 1.35, solar: 0.5 },
  { t: '6PM', demand: 1.4, solar: 0.15 }, { t: '8PM', demand: 1.15, solar: 0 },
];

const carbonSources = [
  { source: 'Transport', value: 48, color: '#F97316' },
  { source: 'Buildings', value: 27, color: '#3B82F6' },
  { source: 'Industry', value: 15, color: '#FBBF24' },
  { source: 'Other', value: 10, color: '#64748B' },
];

const tooltipStyle = {
  contentStyle: { background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: '8px 12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
  labelStyle: { color: '#64748B', fontSize: 11, fontWeight: 600 },
  itemStyle: { color: '#0F172A', fontSize: 12, fontWeight: 600 },
};

/* ── Page Component ───────────────────────────────────── */
export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* ── KPI Row ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
        <KPICard icon={Leaf} label="Carbon Score" value="72/100" trend="↑ 8 this quarter" trendDirection="up" color="#22C55E" delay={0} gauge={72} />
        <KPICard icon={Cloud} label="CO₂ Emission" value="128.6 tCO₂" trend="↓ 8.5% vs yesterday" trendDirection="up" color="#64748B" delay={0.05} />
        <KPICard icon={Zap} label="Energy Demand" value="1.28 GW" trend="Peak in 45 min" trendDirection="neutral" color="#3B82F6" delay={0.1} />
        <KPICard icon={Sun} label="Renewable" value="38%" trend="↑ 12% YoY" trendDirection="up" color="#FBBF24" delay={0.15} gauge={38} />
        <KPICard icon={Car} label="Active Vehicles" value="45,234" trend="Morning rush" trendDirection="neutral" color="#F97316" delay={0.2} />
        <KPICard icon={BatteryCharging} label="EV Charging" value="1,246" trend="Live sessions" trendDirection="neutral" color="#22C55E" delay={0.25} />
        <KPICard icon={Wind} label="AQI Index" value="42" trend="Good" trendDirection="up" color="#67E8F9" delay={0.3} gauge={42} />
      </div>

      {/* ── Main Grid: Map + Right Analytics ────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4" style={{ minHeight: 480 }}>
        {/* Digital Twin Map */}
        <div className="min-h-[400px] xl:min-h-0">
          <DigitalTwinMap />
        </div>

        {/* Right Analytics Column */}
        <div className="flex flex-col gap-4">
          <CarbonEmissionsChart />
          <EnergyMixChart />
          <TrafficStatusChart />
        </div>
      </div>

      {/* ── Bottom Intelligence Row ─────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Mobility Analytics */}
        <DashboardGlassCard className="p-4">
          <ChartContainer title="Mobility Analytics" subtitle="Vehicle density (24hr)">
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mobilityData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="mobilityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F97316" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" tick={{ fill: '#64748B', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Area type="monotone" dataKey="density" stroke="#F97316" strokeWidth={2} fill="url(#mobilityGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        </DashboardGlassCard>

        {/* Energy Management */}
        <DashboardGlassCard className="p-4">
          <ChartContainer title="Energy Management" subtitle="Demand vs Solar generation (GW)">
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={energyData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FBBF24" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#FBBF24" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" tick={{ fill: '#64748B', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Area type="monotone" dataKey="demand" stroke="#3B82F6" strokeWidth={2} fill="url(#demandGrad)" />
                  <Area type="monotone" dataKey="solar" stroke="#FBBF24" strokeWidth={2} fill="url(#solarGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        </DashboardGlassCard>

        {/* Carbon Intelligence */}
        <DashboardGlassCard className="p-4">
          <ChartContainer title="Carbon Intelligence" subtitle="Emission sources breakdown">
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={carbonSources} margin={{ top: 5, right: 5, bottom: 0, left: -20 }} barCategoryGap="20%">
                  <XAxis dataKey="source" tick={{ fill: '#64748B', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1200}>
                    {carbonSources.map((entry, i) => (
                      <motion.rect key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        </DashboardGlassCard>

        {/* AI Decision Engine */}
        <AIRecommendationCard />
      </div>

      {/* ── Scenario + Extra ───────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MiniScenarioPanel />
        <DashboardGlassCard className="p-4">
          <ChartContainer title="AI Sustainability Assistant" subtitle="Ask anything about the city">
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                <p className="text-[11px] text-dash-text">"Why did carbon emissions increase today?"</p>
                <p className="text-[10px] text-dash-textMuted mt-1.5 leading-relaxed">
                  Transport emissions rose 12% due to Wakad corridor congestion. Industrial output in Ward 7 also spiked. Recommend activating battery storage and rerouting traffic via Ravet bypass.
                </p>
              </div>
              <div className="flex gap-2">
                {['Traffic outlook?', 'Solar forecast', 'Peak demand?'].map(q => (
                  <button
                    key={q}
                    className="px-3 py-1.5 rounded-lg bg-black/[0.03] border border-black/[0.06] text-[10px] text-dash-textMuted hover:text-dash-text hover:border-black/[0.12] transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </ChartContainer>
        </DashboardGlassCard>
      </div>

      {/* ── Tech Stack ─────────────────────────────────── */}
      <TechStackBar />
    </div>
  );
}
