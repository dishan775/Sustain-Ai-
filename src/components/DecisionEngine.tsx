import { motion } from 'framer-motion';
import { ArrowDown, TrendingDown, Zap, Route } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import GlassCard from '@/components/shared/GlassCard';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import { fadeInUp, staggerContainer } from '@/lib/motionVariants';

const decisions = [
  {
    icon: Zap,
    recommendation: 'Delay EV charging by 20 minutes',
    reason: 'Grid demand peaks at 18:40. Shifting 340 charging sessions to 19:00 reduces peak load by 12% without impacting commuters.',
    confidence: 94,
    impact: '−4.2% CO₂e',
    impactDirection: 'down' as const,
  },
  {
    icon: Route,
    recommendation: 'Increase green signal duration on Ward 7 corridor',
    reason: 'Traffic density on Nashik Phata–Wakad corridor is 34% above average. Extending green by 8s reduces queue length by 22%.',
    confidence: 89,
    impact: '−18% congestion',
    impactDirection: 'down' as const,
  },
  {
    icon: TrendingDown,
    recommendation: 'Reroute 12% of traffic via Ward 5',
    reason: 'Predicted AQI spike on Aundh Road at 17:30. Redistributing 12% of vehicles via Ravet–Akurdi corridor keeps AQI below 150.',
    confidence: 87,
    impact: '−11 AQI points',
    impactDirection: 'down' as const,
  },
];

export default function DecisionEngine() {
  return (
    <section className="py-32 px-6 md:px-20 max-w-4xl mx-auto">
      <SectionHeading
        eyebrow="AI Decision Engine"
        title="Recommendations, not just reports."
        subtitle="SustainAI doesn't just predict — it recommends specific actions with confidence levels and expected impact."
      />

      <motion.div
        className="flex flex-col gap-5"
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {decisions.map((decision, idx) => {
          const Icon = decision.icon;

          return (
            <motion.div key={idx} variants={fadeInUp}>
              <GlassCard className="p-6 md:p-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-sustain-mint flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-sustain-emerald" strokeWidth={1.8} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <h3 className="text-lg font-semibold text-sustain-ink leading-snug">
                        {decision.recommendation}
                      </h3>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        {/* Confidence */}
                        <div className="text-right">
                          <div className="flex items-baseline gap-1">
                            <AnimatedCounter
                              target={decision.confidence}
                              suffix="%"
                              className="text-2xl font-semibold text-sustain-ink"
                            />
                          </div>
                          <span className="text-[11px] text-sustain-muted">confidence</span>
                        </div>

                        {/* Impact tag */}
                        <span className="inline-flex items-center gap-1 bg-sustain-mint text-sustain-emeraldDark text-sm font-semibold px-3 py-1.5 rounded-pill whitespace-nowrap">
                          <ArrowDown size={14} />
                          {decision.impact}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-sustain-muted mt-3 leading-relaxed">
                      {decision.reason}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
