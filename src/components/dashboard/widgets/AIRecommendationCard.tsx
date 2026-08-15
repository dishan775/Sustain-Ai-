import { Zap, Route, Battery, ArrowDown } from 'lucide-react';
import DashboardGlassCard from '../shared/DashboardGlassCard';
import ChartContainer from '../shared/ChartContainer';

const recommendations = [
  {
    icon: Zap,
    title: 'Delay EV charging by 30 min',
    reason: 'Grid peak at 18:40. Solar expected shortly.',
    impact: '−4.2% CO₂',
    confidence: 94,
    color: '#22C55E',
  },
  {
    icon: Route,
    title: 'Increase green time at Junction B',
    reason: 'Vehicle queue increasing on Wakad corridor.',
    impact: '−8% travel time',
    confidence: 89,
    color: '#3B82F6',
  },
  {
    icon: Battery,
    title: 'Use battery to reduce peak load',
    reason: 'Grid approaching capacity. Battery at 82%.',
    impact: '−7% peak load',
    confidence: 91,
    color: '#FBBF24',
  },
];

export default function AIRecommendationCard() {
  return (
    <DashboardGlassCard className="p-4 h-full">
      <ChartContainer title="AI Decisions" subtitle="Top recommendations">
        <div className="space-y-3">
          {recommendations.map((rec, i) => {
            const Icon = rec.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] hover:border-black/[0.08] transition-all"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${rec.color}15` }}
                >
                  <Icon size={14} style={{ color: rec.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-dash-text leading-tight">{rec.title}</p>
                  <p className="text-[10px] text-dash-textMuted mt-0.5 leading-relaxed">{rec.reason}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <ArrowDown size={8} /> {rec.impact}
                    </span>
                    <span className="text-[10px] text-dash-textMuted">
                      {rec.confidence}% conf.
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ChartContainer>
    </DashboardGlassCard>
  );
}
