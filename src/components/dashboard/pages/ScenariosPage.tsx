import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
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

interface Slider {
  label: string; min: number; max: number; defaultValue: number; unit: string; key: string; step?: number;
}

const sliders: Slider[] = [
  { label: 'EV Adoption Rate', min: 5, max: 80, defaultValue: 25, unit: '%', key: 'ev' },
  { label: 'Solar Capacity', min: 10, max: 500, defaultValue: 60, unit: ' MW', key: 'solar' },
  { label: 'Traffic Volume', min: 50, max: 150, defaultValue: 100, unit: '%', key: 'traffic', step: 5 },
  { label: 'Battery Storage', min: 0, max: 200, defaultValue: 50, unit: ' MWh', key: 'battery' },
  { label: 'Green Cover', min: 10, max: 50, defaultValue: 22, unit: '%', key: 'green' },
];

function computeScenario(values: Record<string, number>) {
  const { ev = 25, solar = 60, traffic = 100, battery = 50, green = 22 } = values;
  const co2 = Math.max(60, Math.round(145 - (ev * 0.5) - (solar * 0.15) - (battery * 0.1) - (green * 0.3) + (traffic - 100) * 0.3));
  const energyDemand = Math.round(1.28 + (ev * 0.008) + (traffic - 100) * 0.005, );
  const renewable = Math.min(98, Math.round(18 + (solar * 0.38) + (battery * 0.05)));
  const gridLoad = Math.min(99, Math.max(30, Math.round(64 + (ev * 0.2) - (solar * 0.1) - (battery * 0.08) + (traffic - 100) * 0.15)));
  const aqi = Math.max(20, Math.round(42 + (traffic - 100) * 0.5 - (ev * 0.15) - (green * 0.4)));
  const carbonScore = Math.min(99, Math.round(72 + (ev * 0.2) + (solar * 0.08) + (green * 0.3) - (traffic - 100) * 0.2));

  return {
    metrics: [
      { name: 'CO₂ (tCO₂)', baseline: 128, scenario: co2, color: co2 < 128 ? '#22C55E' : '#EF4444' },
      { name: 'Demand (GW)', baseline: 1.28, scenario: Math.round(energyDemand * 100) / 100, color: energyDemand < 1.28 ? '#22C55E' : '#F97316' },
      { name: 'Renewable (%)', baseline: 38, scenario: renewable, color: renewable > 38 ? '#22C55E' : '#EF4444' },
      { name: 'Grid Load (%)', baseline: 64, scenario: gridLoad, color: gridLoad < 64 ? '#22C55E' : '#F97316' },
      { name: 'AQI', baseline: 42, scenario: aqi, color: aqi < 42 ? '#22C55E' : '#FBBF24' },
      { name: 'Carbon Score', baseline: 72, scenario: carbonScore, color: carbonScore > 72 ? '#22C55E' : '#EF4444' },
    ],
    radar: [
      { axis: 'Carbon', A: 72, B: carbonScore },
      { axis: 'Energy', A: 65, B: Math.min(100, renewable) },
      { axis: 'Traffic', A: 70, B: Math.max(20, 100 - (traffic - 50)) },
      { axis: 'Air Quality', A: 75, B: Math.max(20, 100 - aqi) },
      { axis: 'Grid', A: 60, B: Math.max(20, 100 - gridLoad) },
      { axis: 'Green Cover', A: 55, B: Math.min(100, green * 3) },
    ],
  };
}

const presets = [
  { name: 'Aggressive EV', values: { ev: 70, solar: 60, traffic: 100, battery: 50, green: 22 } },
  { name: 'Solar Max', values: { ev: 25, solar: 400, traffic: 100, battery: 150, green: 22 } },
  { name: 'High Traffic', values: { ev: 25, solar: 60, traffic: 140, battery: 50, green: 22 } },
  { name: 'Green City', values: { ev: 50, solar: 300, traffic: 80, battery: 120, green: 45 } },
];

export default function ScenariosPage() {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(sliders.map(s => [s.key, s.defaultValue]))
  );
  const [isSimulating, setIsSimulating] = useState(false);

  const handleChange = useCallback((key: string, val: number) => {
    setValues(prev => ({ ...prev, [key]: val }));
  }, []);

  const reset = () => {
    setValues(Object.fromEntries(sliders.map(s => [s.key, s.defaultValue])));
  };

  const loadPreset = (preset: typeof presets[number]) => {
    setIsSimulating(true);
    setTimeout(() => {
      setValues(preset.values);
      setIsSimulating(false);
    }, 600);
  };

  const scenario = computeScenario(values);

  return (
    <div className="space-y-6">
      <motion.div {...stagger(0)}>
        <h1 className="text-2xl font-bold text-dash-text tracking-tight">Scenario Simulator</h1>
        <p className="text-sm text-dash-textMuted mt-1">What-if simulation lab — test how changes in EV adoption, solar capacity, and traffic affect the city.</p>
      </motion.div>

      {/* Presets */}
      <motion.div {...stagger(0.05)} className="flex flex-wrap gap-2">
        {presets.map(p => (
          <button
            key={p.name}
            onClick={() => loadPreset(p)}
            className="px-4 py-2 rounded-xl bg-black/[0.03] border border-black/[0.06] text-[12px] font-medium text-dash-textMuted hover:text-dash-text hover:border-black/[0.12] transition-all"
          >
            {p.name}
          </button>
        ))}
        <button onClick={reset} className="px-4 py-2 rounded-xl bg-black/[0.03] border border-black/[0.06] text-[12px] font-medium text-dash-textMuted hover:text-red-400 hover:border-red-500/20 transition-all flex items-center gap-1.5">
          <RotateCcw size={12} /> Reset
        </button>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6">
        {/* Sliders */}
        <motion.div {...stagger(0.1)}>
          <DashboardGlassCard className="p-6 h-full">
            <h3 className="text-sm font-semibold text-dash-text mb-5 flex items-center gap-2">
              <FlaskConical size={16} className="text-sustain-emerald" /> Parameters
            </h3>
            <div className="space-y-6">
              {sliders.map(slider => (
                <div key={slider.key}>
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="text-[12px] font-medium text-dash-text">{slider.label}</label>
                    <span className="text-[13px] font-bold text-sustain-emerald font-data">
                      {values[slider.key]}{slider.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    step={slider.step || 1}
                    value={values[slider.key]}
                    onChange={e => handleChange(slider.key, Number(e.target.value))}
                    className="w-full"
                    style={{
                      background: `linear-gradient(to right, #22C55E ${((values[slider.key] - slider.min) / (slider.max - slider.min)) * 100}%, rgba(255,255,255,0.06) 0%)`,
                      height: '4px',
                    }}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-dash-textDim">{slider.min}{slider.unit}</span>
                    <span className="text-[10px] text-dash-textDim">{slider.max}{slider.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </DashboardGlassCard>
        </motion.div>

        {/* Results */}
        <div className="space-y-4">
          {/* Metrics Comparison */}
          <motion.div {...stagger(0.15)}>
            <DashboardGlassCard className="p-5">
              <ChartContainer title="Projected Impact" subtitle="Baseline vs Scenario comparison"
                action={isSimulating ? <StatusBadge variant="live" label="Simulating..." /> : <StatusBadge variant="good" label="Ready" />}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mt-2">
                  {scenario.metrics.map((m, i) => {
                    const diff = m.scenario - m.baseline;
                    const isPositive = m.name.includes('Renewable') || m.name.includes('Score') ? diff > 0 : diff < 0;
                    return (
                      <motion.div
                        key={m.name}
                        className="p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.06 }}
                      >
                        <span className="text-[10px] text-dash-textMuted block mb-1">{m.name}</span>
                        <motion.span
                          className="text-xl font-bold font-data block"
                          style={{ color: m.color }}
                          key={m.scenario}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {m.scenario}
                        </motion.span>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          {isPositive ? <TrendingDown size={10} className="text-emerald-400" /> : <TrendingUp size={10} className="text-red-400" />}
                          <span className={`text-[10px] font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                            {diff > 0 ? '+' : ''}{typeof m.baseline === 'number' && m.baseline > 10 ? diff : diff.toFixed(2)}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </ChartContainer>
            </DashboardGlassCard>
          </motion.div>

          {/* Radar Chart */}
          <motion.div {...stagger(0.25)}>
            <DashboardGlassCard className="p-5">
              <ChartContainer title="City Health Radar" subtitle="Multi-dimensional sustainability comparison">
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={scenario.radar} cx="50%" cy="50%" outerRadius="75%">
                      <PolarGrid stroke="rgba(255,255,255,0.06)" />
                      <PolarAngleAxis dataKey="axis" tick={{ fill: '#64748B', fontSize: 11 }} />
                      <Radar name="Baseline" dataKey="A" stroke="#64748B" fill="#64748B" fillOpacity={0.1} strokeWidth={1} />
                      <Radar name="Scenario" dataKey="B" stroke="#22C55E" fill="#22C55E" fillOpacity={0.15} strokeWidth={2} />
                      <Tooltip {...tooltipStyle} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-6 mt-2">
                  <span className="flex items-center gap-2 text-[11px] text-dash-textMuted"><span className="w-3 h-0.5 bg-dash-textMuted" /> Baseline</span>
                  <span className="flex items-center gap-2 text-[11px] text-emerald-400"><span className="w-3 h-0.5 bg-emerald-400" /> Scenario</span>
                </div>
              </ChartContainer>
            </DashboardGlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
