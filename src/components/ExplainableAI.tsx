import type { Easing } from 'framer-motion';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import GlassCard from '@/components/shared/GlassCard';
import { fadeInUp, staggerContainer, sustainEase } from '@/lib/motionVariants';

const factors = [
  { label: 'Traffic density (Ward 7)', value: 38, direction: 'positive' as const, color: '#FBBF24' },
  { label: 'Industrial emissions', value: 28, direction: 'positive' as const, color: '#FBBF24' },
  { label: 'Wind speed', value: -22, direction: 'negative' as const, color: '#22C55E' },
  { label: 'Green cover index', value: -15, direction: 'negative' as const, color: '#22C55E' },
  { label: 'Time of day', value: 12, direction: 'positive' as const, color: '#FBBF24' },
];

export default function ExplainableAI() {
  const maxAbsValue = Math.max(...factors.map((f) => Math.abs(f.value)));

  return (
    <section className="py-32 px-6 md:px-20 max-w-4xl mx-auto">
      <SectionHeading
        eyebrow="Explainable AI"
        title="Every prediction comes with a reason."
        subtitle="Not a black box. SustainAI shows the driving factors behind every recommendation using SHAP-based explanations."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: sustainEase as Easing }}
        viewport={{ once: true }}
      >
        <GlassCard className="p-8 md:p-10">
          {/* Prediction header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-sustain-ink/5">
            <div className="w-3 h-3 rounded-full bg-sustain-amber pulse-dot" />
            <div>
              <span className="text-sm text-sustain-muted">Prediction</span>
              <h3 className="text-2xl font-semibold text-sustain-ink font-data">
                AQI Forecast: <span className="text-sustain-amber">142</span>
              </h3>
            </div>
            <span className="ml-auto bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-pill">
              Moderate
            </span>
          </div>

          {/* SHAP-style bars */}
          <div className="space-y-4">
            <div className="flex items-center text-[11px] text-sustain-muted font-medium mb-2">
              <span className="flex-1 text-right pr-4">← Reduces AQI</span>
              <div className="w-px h-4 bg-sustain-ink/10" />
              <span className="flex-1 pl-4">Increases AQI →</span>
            </div>

            <motion.div
              className="space-y-3"
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {factors.map((factor) => {
                const barWidth = (Math.abs(factor.value) / maxAbsValue) * 100;
                const isNegative = factor.value < 0;

                return (
                  <motion.div
                    key={factor.label}
                    className="flex items-center gap-3"
                    variants={fadeInUp}
                  >
                    <span className="text-sm text-sustain-muted w-40 text-right flex-shrink-0 max-md:w-28 max-md:text-xs">
                      {factor.label}
                    </span>
                    <div className="flex-1 flex items-center h-7 relative">
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-sustain-ink/10" />
                      {isNegative ? (
                        <div className="flex w-1/2 justify-end">
                          <motion.div
                            className="h-6 rounded-l-lg"
                            style={{ backgroundColor: factor.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${barWidth}%` }}
                            transition={{ duration: 0.8, ease: sustainEase as Easing }}
                            viewport={{ once: true }}
                          />
                        </div>
                      ) : (
                        <div className="flex w-1/2 ml-[50%]">
                          <motion.div
                            className="h-6 rounded-r-lg"
                            style={{ backgroundColor: factor.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${barWidth}%` }}
                            transition={{ duration: 0.8, ease: sustainEase as Easing }}
                            viewport={{ once: true }}
                          />
                        </div>
                      )}
                    </div>
                    <span className="font-data text-sm font-semibold w-12 text-right" style={{ color: factor.color }}>
                      {factor.value > 0 ? '+' : ''}{factor.value}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Caption */}
          <p className="mt-8 pt-6 border-t border-sustain-ink/5 text-sm text-sustain-muted leading-relaxed">
            SHAP (SHapley Additive exPlanations) values show each factor's contribution to the prediction.
            Green bars reduce the AQI (beneficial); amber bars increase it. This transparency ensures every
            AI recommendation can be audited, understood, and trusted.
          </p>
        </GlassCard>
      </motion.div>
    </section>
  );
}
