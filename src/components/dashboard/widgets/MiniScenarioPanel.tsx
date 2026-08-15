import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import DashboardGlassCard from '../shared/DashboardGlassCard';
import ChartContainer from '../shared/ChartContainer';

const sliders = [
  { label: 'EV Adoption', min: 5, max: 80, defaultValue: 25, unit: '%', key: 'ev' },
  { label: 'Solar Capacity', min: 10, max: 200, defaultValue: 60, unit: 'MW', key: 'solar' },
];

function computeMetrics(values: Record<string, number>) {
  const ev = values.ev ?? 25;
  const solar = values.solar ?? 60;
  const co2 = Math.round(128 - (ev * 0.4) - (solar * 0.15));
  const renewable = Math.min(98, Math.round(18 + (solar * 0.38)));
  return { co2, renewable };
}

export default function MiniScenarioPanel() {
  const [values, setValues] = useState<Record<string, number>>({ ev: 25, solar: 60 });

  const handleChange = useCallback((key: string, val: number) => {
    setValues(prev => ({ ...prev, [key]: val }));
  }, []);

  const metrics = computeMetrics(values);

  return (
    <DashboardGlassCard className="p-4 h-full">
      <ChartContainer title="Quick Scenario" subtitle="What-if simulation">
        <div className="space-y-4">
          {sliders.map((slider) => (
            <div key={slider.key}>
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-[11px] text-dash-textMuted font-medium">{slider.label}</span>
                <span className="text-[12px] font-semibold text-sustain-emerald font-data">
                  {values[slider.key]}{slider.unit}
                </span>
              </div>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                value={values[slider.key]}
                onChange={(e) => handleChange(slider.key, Number(e.target.value))}
                className="w-full h-1 accent-sustain-emerald"
                style={{
                  background: `linear-gradient(to right, #22C55E ${((values[slider.key] - slider.min) / (slider.max - slider.min)) * 100}%, rgba(0,0,0,0.06) 0%)`,
                  height: '4px',
                }}
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-black/[0.02] border border-black/[0.04]">
              <span className="text-[10px] text-dash-textMuted block">CO₂ Forecast</span>
              <motion.span
                className="text-lg font-bold font-data text-emerald-400"
                key={metrics.co2}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {metrics.co2} <span className="text-[10px] text-dash-textMuted">tCO₂</span>
              </motion.span>
            </div>
            <div className="p-3 rounded-xl bg-black/[0.02] border border-black/[0.04]">
              <span className="text-[10px] text-dash-textMuted block">Renewable</span>
              <motion.span
                className="text-lg font-bold font-data text-blue-400"
                key={metrics.renewable}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {metrics.renewable}<span className="text-[10px] text-dash-textMuted">%</span>
              </motion.span>
            </div>
          </div>
        </div>
      </ChartContainer>
    </DashboardGlassCard>
  );
}
