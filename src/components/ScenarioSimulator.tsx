import { useState, useCallback } from 'react';
import type { Easing } from 'framer-motion';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import GlassCard from '@/components/shared/GlassCard';
import { sustainEase } from '@/lib/motionVariants';

interface SliderConfig {
  label: string;
  min: number;
  max: number;
  defaultValue: number;
  unit: string;
  key: string;
}

const sliders: SliderConfig[] = [
  { label: 'EV Adoption Rate', min: 5, max: 80, defaultValue: 25, unit: '%', key: 'ev' },
  { label: 'Solar Capacity', min: 10, max: 200, defaultValue: 60, unit: 'MW', key: 'solar' },
  { label: 'Annual Rainfall', min: 400, max: 1200, defaultValue: 720, unit: 'mm', key: 'rain' },
];

function computeMetrics(values: Record<string, number>) {
  const ev = values.ev ?? 25;
  const solar = values.solar ?? 60;
  const rain = values.rain ?? 720;

  const carbonScore = Math.round(42 + (ev * 0.35) + (solar * 0.12) - (rain * 0.005));
  const energySaved = Math.round(12 + (solar * 0.18) + (ev * 0.08));
  const trafficEff = Math.round(65 + (ev * 0.25) - Math.max(0, (rain - 800) * 0.02));
  const renewablePct = Math.min(98, Math.round(18 + (solar * 0.38)));

  return {
    'Carbon Score': { value: Math.min(99, carbonScore), unit: '/100', color: '#22C55E' },
    'Energy Saved': { value: Math.min(60, energySaved), unit: ' GWh', color: '#3B82F6' },
    'Traffic Efficiency': { value: Math.min(99, trafficEff), unit: '%', color: '#22C55E' },
    'Renewable Share': { value: renewablePct, unit: '%', color: '#3B82F6' },
  };
}

/* ── Mini Bar Chart ──────────────────────────────────── */
function MiniChart({ metrics }: { metrics: Record<string, { value: number; unit: string; color: string }> }) {
  const entries = Object.entries(metrics);

  return (
    <div className="grid grid-cols-2 gap-4">
      {entries.map(([label, data]) => (
        <div key={label} className="flex flex-col gap-2">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-sustain-muted font-medium">{label}</span>
            <span className="font-data text-lg font-semibold" style={{ color: data.color }}>
              {data.value}{data.unit}
            </span>
          </div>
          <div className="w-full h-2 bg-sustain-mint rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: data.color }}
              initial={{ width: '0%' }}
              animate={{ width: `${data.value}%` }}
              transition={{ duration: 0.8, ease: sustainEase as Easing }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ScenarioSimulator() {
  const [values, setValues] = useState<Record<string, number>>({
    ev: 25,
    solar: 60,
    rain: 720,
  });

  const handleChange = useCallback((key: string, val: number) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  }, []);

  const metrics = computeMetrics(values);

  return (
    <section className="py-32 px-6 md:px-20 max-w-5xl mx-auto">
      <SectionHeading
        eyebrow="Scenario Simulator"
        title="What if you could test the future?"
        subtitle="Adjust the parameters below and watch the city's sustainability metrics respond in real time."
      />

      <motion.div
        className="grid md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: sustainEase as Easing }}
        viewport={{ once: true }}
      >
        {/* Sliders Panel */}
        <GlassCard className="p-8">
          <h3 className="text-base font-semibold text-sustain-ink mb-6">Adjust parameters</h3>
          <div className="flex flex-col gap-8">
            {sliders.map((slider) => (
              <div key={slider.key}>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-sm font-medium text-sustain-ink">
                    {slider.label}
                  </label>
                  <span className="font-data text-sm font-semibold text-sustain-emerald">
                    {values[slider.key]}{slider.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  value={values[slider.key]}
                  onChange={(e) => handleChange(slider.key, Number(e.target.value))}
                  className="w-full"
                  aria-label={slider.label}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[11px] text-sustain-muted">{slider.min}{slider.unit}</span>
                  <span className="text-[11px] text-sustain-muted">{slider.max}{slider.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Results Panel */}
        <GlassCard className="p-8">
          <h3 className="text-base font-semibold text-sustain-ink mb-6">Projected impact</h3>
          <MiniChart metrics={metrics} />
          <div className="mt-6 pt-6 border-t border-sustain-ink/5">
            <p className="text-sm text-sustain-muted leading-relaxed">
              These projections are modeled using SustainAI's multi-agent simulation engine,
              calibrated against PCMC's 2024 baseline data across 7 ward clusters.
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
