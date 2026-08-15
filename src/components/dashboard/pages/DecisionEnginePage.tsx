import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Route, TrendingDown, Battery, ArrowDown, Check, X, Clock, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import DashboardGlassCard from '../shared/DashboardGlassCard';

const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

interface Decision {
  icon: typeof Zap;
  recommendation: string;
  reason: string;
  confidence: number;
  impacts: { label: string; value: string; direction: 'down' | 'up' }[];
  priority: 'high' | 'medium' | 'low';
  color: string;
  expanded?: boolean;
}

const decisions: Decision[] = [
  {
    icon: Zap,
    recommendation: 'Delay EV charging by 30 minutes at Station A',
    reason: 'Grid load is approaching peak (89% capacity). Solar generation expected to increase in 30 minutes as cloud cover clears. Delaying 340 charging sessions redistributes load to solar peak.',
    confidence: 94,
    impacts: [
      { label: 'CO₂ reduction', value: '4.2%', direction: 'down' },
      { label: 'Peak load', value: '12%', direction: 'down' },
      { label: 'Renewable utilization', value: '8%', direction: 'up' },
    ],
    priority: 'high',
    color: '#22C55E',
  },
  {
    icon: Route,
    recommendation: 'Increase green time at Junction B by 8 seconds',
    reason: 'Vehicle queue on Nashik Phata–Wakad corridor is 34% above average. Extending green signal by 8s reduces queue length by 22% without significantly impacting cross traffic.',
    confidence: 89,
    impacts: [
      { label: 'Travel time', value: '8%', direction: 'down' },
      { label: 'Congestion', value: '18%', direction: 'down' },
      { label: 'Vehicle idle emissions', value: '5%', direction: 'down' },
    ],
    priority: 'high',
    color: '#3B82F6',
  },
  {
    icon: TrendingDown,
    recommendation: 'Shift charging loads to solar peak hours (11AM-2PM)',
    reason: 'Solar output will reach 1.1 GW during peak hours. Incentivizing EV charging during this window maximizes renewable utilization and reduces grid carbon intensity.',
    confidence: 91,
    impacts: [
      { label: 'Renewable utilization', value: '12%', direction: 'up' },
      { label: 'Carbon intensity', value: '9%', direction: 'down' },
      { label: 'Grid stability', value: '6%', direction: 'up' },
    ],
    priority: 'medium',
    color: '#FBBF24',
  },
  {
    icon: Battery,
    recommendation: 'Activate battery storage to reduce peak grid load',
    reason: 'Battery storage is at 82% capacity. Deploying 40 MWh during the 5-7 PM peak will reduce grid stress and lower carbon intensity by avoiding fossil fuel peakers.',
    confidence: 92,
    impacts: [
      { label: 'Peak grid load', value: '7%', direction: 'down' },
      { label: 'Carbon emissions', value: '3.8%', direction: 'down' },
      { label: 'Battery level', value: '40 MWh', direction: 'down' },
    ],
    priority: 'medium',
    color: '#22C55E',
  },
  {
    icon: Route,
    recommendation: 'Reroute 12% of traffic via Ravet–Akurdi bypass',
    reason: 'Predicted AQI spike on Aundh Road at 17:30. Redistributing 12% of vehicles via Ravet-Akurdi corridor keeps AQI below 150 while maintaining travel times.',
    confidence: 87,
    impacts: [
      { label: 'AQI improvement', value: '11 points', direction: 'down' },
      { label: 'Travel time impact', value: '+2 min', direction: 'up' },
      { label: 'Emissions', value: '3%', direction: 'down' },
    ],
    priority: 'low',
    color: '#F97316',
  },
];

const history = [
  { action: 'EV charging delayed 20 min at Ward 5', time: '2 hours ago', result: '4.1% CO₂ reduction achieved', status: 'success' },
  { action: 'Green time extended at Hinjewadi Phase 2', time: '4 hours ago', result: '22% queue reduction', status: 'success' },
  { action: 'Battery deployed during morning peak', time: '6 hours ago', result: '8.2% peak load reduction', status: 'success' },
  { action: 'Traffic reroute via Akurdi bypass', time: '8 hours ago', result: 'AQI maintained below 145', status: 'success' },
];

const priorityColors = { high: '#EF4444', medium: '#FBBF24', low: '#22C55E' };

export default function DecisionEnginePage() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  return (
    <div className="space-y-6">
      <motion.div {...stagger(0)}>
        <h1 className="text-2xl font-bold text-dash-text tracking-tight">AI Decision Engine</h1>
        <p className="text-sm text-dash-textMuted mt-1">AI-generated recommendations with confidence levels, expected impact, and reasoning chains.</p>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Active Recommendations', value: '5', color: '#22C55E' },
          { label: 'Avg Confidence', value: '90.6%', color: '#3B82F6' },
          { label: 'Executed Today', value: '4', color: '#FBBF24' },
          { label: 'Success Rate', value: '98.2%', color: '#22C55E' },
        ].map((stat, i) => (
          <motion.div key={stat.label} {...stagger(i * 0.05)}>
            <DashboardGlassCard className="p-4">
              <span className="text-[10px] text-dash-textMuted uppercase tracking-wider">{stat.label}</span>
              <p className="text-2xl font-bold font-data mt-1" style={{ color: stat.color }}>{stat.value}</p>
            </DashboardGlassCard>
          </motion.div>
        ))}
      </div>

      {/* Decisions */}
      <div className="space-y-3">
        {decisions.map((decision, idx) => {
          const Icon = decision.icon;
          const isExpanded = expandedIdx === idx;

          return (
            <motion.div key={idx} {...stagger(0.1 + idx * 0.06)}>
              <DashboardGlassCard className="overflow-hidden">
                <button
                  className="w-full p-5 flex items-start gap-4 text-left"
                  onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${decision.color}15` }}>
                    <Icon size={20} style={{ color: decision.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[14px] font-semibold text-dash-text leading-snug">{decision.recommendation}</h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{ backgroundColor: `${priorityColors[decision.priority]}15`, color: priorityColors[decision.priority] }}>
                          {decision.priority}
                        </span>
                        <span className="text-lg font-bold text-dash-text font-data">{decision.confidence}%</span>
                        {isExpanded ? <ChevronUp size={16} className="text-dash-textMuted" /> : <ChevronDown size={16} className="text-dash-textMuted" />}
                      </div>
                    </div>
                    {/* Impact pills */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {decision.impacts.map((impact) => (
                        <span key={impact.label} className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                          <ArrowDown size={8} className={impact.direction === 'up' ? 'rotate-180' : ''} /> {impact.label}: {impact.value}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 border-t border-black/[0.04]">
                        <div className="pt-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield size={12} className="text-dash-textMuted" />
                            <span className="text-[11px] text-dash-textMuted font-semibold uppercase tracking-wider">Reasoning</span>
                          </div>
                          <p className="text-[12px] text-dash-text leading-relaxed">{decision.reason}</p>

                          <div className="flex gap-2 mt-4">
                            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-400 text-[12px] font-semibold hover:bg-emerald-500/25 transition-colors">
                              <Check size={14} /> Accept
                            </button>
                            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/[0.04] text-dash-textMuted text-[12px] font-semibold hover:bg-black/[0.08] transition-colors">
                              <Clock size={14} /> Defer
                            </button>
                            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-[12px] font-semibold hover:bg-red-500/20 transition-colors">
                              <X size={14} /> Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </DashboardGlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* History */}
      <motion.div {...stagger(0.5)}>
        <DashboardGlassCard className="p-5">
          <h3 className="text-sm font-semibold text-dash-text mb-4">Decision History</h3>
          <div className="space-y-2">
            {history.map((h, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] border border-black/[0.04]"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <Check size={12} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-dash-text">{h.action}</p>
                    <p className="text-[10px] text-dash-textMuted">{h.result}</p>
                  </div>
                </div>
                <span className="text-[10px] text-dash-textDim">{h.time}</span>
              </motion.div>
            ))}
          </div>
        </DashboardGlassCard>
      </motion.div>
    </div>
  );
}
