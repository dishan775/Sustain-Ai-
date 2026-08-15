import { useState } from 'react';
import type { Easing } from 'framer-motion';
import { motion } from 'framer-motion';
import { Sun, Cloud, Zap, Battery, Building2 } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { sustainEase } from '@/lib/motionVariants';

/* ── Power Node ──────────────────────────────────────── */
function PowerNode({
  icon: Icon,
  label,
  x,
  y,
  active,
}: {
  icon: typeof Sun;
  label: string;
  x: number;
  y: number;
  active: boolean;
}) {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: sustainEase as Easing }}
      viewport={{ once: true }}
    >
      <rect
        x={x - 35}
        y={y - 35}
        width="70"
        height="70"
        rx="20"
        fill="white"
        stroke={active ? '#22C55E' : '#E2E8F0'}
        strokeWidth="2"
        filter="url(#softShadow)"
      />
      <foreignObject x={x - 20} y={y - 22} width="40" height="40">
        <div className="w-full h-full flex items-center justify-center">
          <Icon size={22} className={active ? 'text-sustain-emerald' : 'text-sustain-muted'} strokeWidth={1.8} />
        </div>
      </foreignObject>
      <text
        x={x}
        y={y + 52}
        textAnchor="middle"
        className="text-[11px] font-medium"
        fill="#64748B"
      >
        {label}
      </text>
    </motion.g>
  );
}

export default function EnergyIntelligence() {
  const [isSunny, setIsSunny] = useState(true);

  const flowSpeed = isSunny ? 2.5 : 5;
  const flowColor = isSunny ? '#22C55E' : '#3B82F6';
  const dotCount = isSunny ? 4 : 2;

  return (
    <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Energy Intelligence"
        title="Follow the power."
        subtitle="Watch energy flow from source to consumption in real time. Toggle weather conditions to see how the grid adapts."
      />

      {/* Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-white rounded-pill border border-sustain-ink/10 p-1 flex gap-1">
          <button
            onClick={() => setIsSunny(true)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-pill text-sm font-medium transition-all ${
              isSunny ? 'bg-sustain-emerald text-white' : 'text-sustain-muted hover:text-sustain-ink'
            }`}
          >
            <Sun size={16} /> Sunny day
          </button>
          <button
            onClick={() => setIsSunny(false)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-pill text-sm font-medium transition-all ${
              !isSunny ? 'bg-sustain-ocean text-white' : 'text-sustain-muted hover:text-sustain-ink'
            }`}
          >
            <Cloud size={16} /> Cloudy day
          </button>
        </div>
      </div>

      {/* Power Flow Diagram */}
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <svg viewBox="0 0 700 200" className="w-full">
          <defs>
            <filter id="softShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#22C55E" floodOpacity="0.1" />
            </filter>
            {/* Flow paths */}
            <path id="path-solar-battery" d="M 115 100 L 260 100" />
            <path id="path-battery-grid" d="M 330 100 L 440 100" />
            <path id="path-grid-building" d="M 510 100 L 590 100" />
          </defs>

          {/* Connection lines */}
          <motion.line
            x1="115" y1="100" x2="260" y2="100"
            stroke={flowColor}
            strokeWidth="2"
            strokeDasharray="6 4"
            animate={{ strokeDashoffset: [20, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            opacity={0.5}
          />
          <motion.line
            x1="330" y1="100" x2="440" y2="100"
            stroke={flowColor}
            strokeWidth="2"
            strokeDasharray="6 4"
            animate={{ strokeDashoffset: [20, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            opacity={0.5}
          />
          <motion.line
            x1="510" y1="100" x2="590" y2="100"
            stroke={flowColor}
            strokeWidth="2"
            strokeDasharray="6 4"
            animate={{ strokeDashoffset: [20, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            opacity={0.5}
          />

          {/* Flow particles */}
          {Array.from({ length: dotCount }).map((_, i) => (
            <motion.circle
              key={`p1-${i}-${isSunny}`}
              r="4"
              fill={flowColor}
              animate={{
                cx: [115, 260],
                cy: [100, 100],
              }}
              transition={{ duration: flowSpeed, delay: i * (flowSpeed / dotCount), repeat: Infinity, ease: 'linear' }}
              opacity={0.8}
            />
          ))}
          {Array.from({ length: dotCount }).map((_, i) => (
            <motion.circle
              key={`p2-${i}-${isSunny}`}
              r="4"
              fill={flowColor}
              animate={{
                cx: [330, 440],
                cy: [100, 100],
              }}
              transition={{ duration: flowSpeed, delay: i * (flowSpeed / dotCount) + 0.3, repeat: Infinity, ease: 'linear' }}
              opacity={0.8}
            />
          ))}
          {Array.from({ length: dotCount }).map((_, i) => (
            <motion.circle
              key={`p3-${i}-${isSunny}`}
              r="4"
              fill={flowColor}
              animate={{
                cx: [510, 590],
                cy: [100, 100],
              }}
              transition={{ duration: flowSpeed, delay: i * (flowSpeed / dotCount) + 0.6, repeat: Infinity, ease: 'linear' }}
              opacity={0.8}
            />
          ))}

          {/* Nodes */}
          <PowerNode icon={Sun} label="Solar" x={80} y={100} active={isSunny} />
          <PowerNode icon={Battery} label="Battery" x={295} y={100} active={true} />
          <PowerNode icon={Zap} label="Grid" x={475} y={100} active={true} />
          <PowerNode icon={Building2} label="Buildings" x={625} y={100} active={true} />
        </svg>
      </motion.div>

      {/* Status indicator */}
      <motion.div
        className="text-center mt-8"
        key={isSunny ? 'sunny' : 'cloudy'}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-pill text-sm font-medium ${
          isSunny
            ? 'bg-sustain-mint text-sustain-emeraldDark'
            : 'bg-blue-50 text-sustain-oceanDark'
        }`}>
          {isSunny ? (
            <><Sun size={14} /> Solar output: 94% — Grid drawing minimal</>
          ) : (
            <><Cloud size={14} /> Solar output: 31% — Battery supplementing grid</>
          )}
        </span>
      </motion.div>
    </section>
  );
}
