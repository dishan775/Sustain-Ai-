import { useRef } from 'react';
import type { Easing } from 'framer-motion';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import GlassCard from '@/components/shared/GlassCard';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import { fadeInUp, staggerContainer, sustainEase } from '@/lib/motionVariants';

/* ── Sparkline (lightweight SVG, no D3 needed at this scale) ── */
function Sparkline({ data, color, className = '' }: { data: number[]; color: string; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true });

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 30 - ((v - min) / range) * 26;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg ref={ref} viewBox="0 0 100 32" className={`w-20 h-8 ${className}`} preserveAspectRatio="none">
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: sustainEase as Easing }}
      />
    </svg>
  );
}

const metrics = [
  {
    label: 'Carbon Score',
    value: 72,
    suffix: '/100',
    trend: '+8 this quarter',
    color: '#22C55E',
    data: [30, 35, 42, 48, 55, 58, 63, 68, 72],
  },
  {
    label: 'Net Zero Progress',
    value: 34,
    suffix: '%',
    trend: 'On track for 2040',
    color: '#22C55E',
    data: [8, 12, 15, 19, 22, 25, 28, 31, 34],
  },
  {
    label: 'Renewable Share',
    value: 41,
    suffix: '%',
    trend: '+12% YoY',
    color: '#3B82F6',
    data: [18, 22, 25, 28, 30, 33, 36, 39, 41],
  },
  {
    label: 'AQI (Avg)',
    value: 142,
    suffix: '',
    trend: '↓ 18 pts from baseline',
    color: '#FBBF24',
    data: [180, 175, 168, 162, 158, 155, 150, 146, 142],
  },
  {
    label: 'Energy Saved',
    value: 24,
    suffix: ' GWh',
    trend: '+6 GWh vs. last year',
    color: '#3B82F6',
    data: [4, 7, 10, 12, 15, 17, 20, 22, 24],
  },
  {
    label: 'Traffic Efficiency',
    value: 78,
    suffix: '%',
    trend: '+23% post-optimization',
    color: '#22C55E',
    data: [55, 58, 62, 65, 68, 71, 74, 76, 78],
  },
  {
    label: 'CO₂ Reduction',
    value: 18,
    suffix: '%',
    trend: 'Verified vs. 2023 baseline',
    color: '#22C55E',
    data: [2, 4, 6, 8, 10, 12, 14, 16, 18],
  },
];

export default function MetricsBand() {
  return (
    <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto" id="impact">
      <SectionHeading
        eyebrow="Live Metrics"
        title="The numbers that matter."
        subtitle="Real-time sustainability indicators tracked across PCMC's digital twin."
      />

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {metrics.map((metric) => (
          <motion.div key={metric.label} variants={fadeInUp}>
            <GlassCard className="p-6 flex flex-col gap-3">
              <span className="text-sm font-medium text-sustain-muted">{metric.label}</span>
              <div className="flex items-end justify-between">
                <AnimatedCounter
                  target={metric.value}
                  suffix={metric.suffix}
                  className="text-[clamp(32px,4vw,44px)] font-semibold text-sustain-ink"
                />
                <Sparkline data={metric.data} color={metric.color} />
              </div>
              <span className="text-[12px] text-sustain-muted">{metric.trend}</span>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
