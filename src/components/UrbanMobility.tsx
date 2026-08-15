import type { Easing } from 'framer-motion';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { fadeInUp, staggerContainer, sustainEase } from '@/lib/motionVariants';

/* ── Vehicle ─────────────────────────────────────────── */
function Vehicle({
  type,
  y,
  speed,
  delay,
  color,
}: {
  type: 'car' | 'bus' | 'cyclist';
  y: number;
  speed: number;
  delay: number;
  color: string;
}) {
  const width = type === 'bus' ? 60 : type === 'car' ? 36 : 20;
  const height = type === 'bus' ? 22 : type === 'car' ? 16 : 28;

  return (
    <motion.g
      animate={{ x: [-80, 820] }}
      transition={{ duration: speed, delay, repeat: Infinity, ease: 'linear' }}
    >
      {type === 'car' && (
        <>
          <rect x={0} y={y} width={width} height={height} rx={6} fill={color} />
          <rect x={4} y={y - 6} width={width - 16} height={8} rx={4} fill={color} opacity={0.7} />
          <circle cx={8} cy={y + height} r={4} fill="#475569" />
          <circle cx={width - 8} cy={y + height} r={4} fill="#475569" />
        </>
      )}
      {type === 'bus' && (
        <>
          <rect x={0} y={y} width={width} height={height} rx={4} fill={color} />
          <rect x={4} y={y + 3} width={10} height={8} rx={2} fill="white" opacity={0.5} />
          <rect x={18} y={y + 3} width={10} height={8} rx={2} fill="white" opacity={0.5} />
          <rect x={32} y={y + 3} width={10} height={8} rx={2} fill="white" opacity={0.5} />
          <rect x={46} y={y + 3} width={10} height={8} rx={2} fill="white" opacity={0.5} />
          <circle cx={12} cy={y + height} r={4} fill="#475569" />
          <circle cx={width - 12} cy={y + height} r={4} fill="#475569" />
        </>
      )}
      {type === 'cyclist' && (
        <>
          <circle cx={10} cy={y} r={4} fill={color} />
          <rect x={7} y={y + 5} width={6} height={12} rx={3} fill={color} />
          <circle cx={10} cy={y + 24} r={6} fill="none" stroke={color} strokeWidth={2} />
        </>
      )}
    </motion.g>
  );
}

/* ── Traffic Light ───────────────────────────────────── */
function TrafficLight({ x }: { x: number }) {
  return (
    <g>
      <rect x={x} y={50} width={12} height={36} rx={4} fill="#334155" />
      <rect x={x + 3} y={60} width={6} height={60} rx={2} fill="#475569" />
      <motion.circle
        cx={x + 6}
        cy={57}
        r={4}
        animate={{
          fill: ['#EF4444', '#EF4444', '#FBBF24', '#22C55E', '#22C55E', '#FBBF24', '#EF4444'],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </g>
  );
}

/* ── EV Charging Station ─────────────────────────────── */
function EVCharger({ x }: { x: number }) {
  return (
    <g>
      <rect x={x} y={85} width={16} height={24} rx={4} fill="#22C55E" />
      <motion.rect
        x={x + 4}
        y={90}
        width={8}
        height={4}
        rx={1}
        fill="#D1FAE5"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <text x={x + 8} y={80} textAnchor="middle" className="text-[8px] font-medium" fill="#22C55E">⚡</text>
    </g>
  );
}

export default function UrbanMobility() {
  return (
    <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto overflow-hidden">
      <SectionHeading
        eyebrow="Urban Mobility"
        title="Streets that think."
        subtitle="AI-optimized traffic flow, smart signals, and integrated EV charging — all coordinated in real time."
      />

      <motion.div
        className="max-w-4xl mx-auto bg-gradient-to-b from-sustain-haze to-white rounded-organic border border-sustain-ink/5 p-8 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: sustainEase as Easing }}
        viewport={{ once: true }}
      >
        <svg viewBox="0 0 760 180" className="w-full" preserveAspectRatio="xMidYMid meet">
          {/* Sky gradient */}
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#D1FAE5" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect width="760" height="180" fill="url(#skyGrad)" rx="16" />

          {/* Road */}
          <rect x="0" y="120" width="760" height="40" rx="0" fill="#CBD5E1" />
          {/* Road markings */}
          {Array.from({ length: 20 }).map((_, i) => (
            <rect key={i} x={i * 40 + 5} y={138} width={20} height={3} rx={1} fill="white" opacity={0.6} />
          ))}

          {/* Sidewalk */}
          <rect x="0" y="112" width="760" height="8" rx="0" fill="#E2E8F0" />
          <rect x="0" y="160" width="760" height="8" rx="0" fill="#E2E8F0" />

          {/* Trees */}
          {[80, 240, 450, 640].map((x) => (
            <g key={`tree-${x}`}>
              <rect x={x} y={75} width={4} height={37} rx={2} fill="#16A34A" />
              <circle cx={x + 2} cy={68} r={14} fill="#22C55E" opacity={0.7} />
              <circle cx={x - 6} cy={74} r={10} fill="#16A34A" opacity={0.5} />
              <circle cx={x + 10} cy={74} r={10} fill="#16A34A" opacity={0.5} />
            </g>
          ))}

          {/* Traffic lights */}
          <TrafficLight x={200} />
          <TrafficLight x={520} />

          {/* EV Charger */}
          <EVCharger x={360} />

          {/* Vehicles */}
          <Vehicle type="car" y={126} speed={7} delay={0} color="#3B82F6" />
          <Vehicle type="bus" y={124} speed={10} delay={2} color="#22C55E" />
          <Vehicle type="car" y={142} speed={6} delay={4} color="#8B5CF6" />
          <Vehicle type="car" y={142} speed={8} delay={1} color="#F97316" />
          <Vehicle type="cyclist" y={100} speed={12} delay={3} color="#22C55E" />

          {/* Pedestrian */}
          <motion.g
            animate={{ x: [300, 340, 300] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx={0} cy={100} r={4} fill="#64748B" opacity={0.6} />
            <rect x={-3} y={105} width={6} height={10} rx={3} fill="#64748B" opacity={0.5} />
          </motion.g>
        </svg>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="flex flex-wrap justify-center gap-8 mt-12"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {[
          { label: 'Signal optimization', value: '23% faster' },
          { label: 'EV charging utilization', value: '89%' },
          { label: 'Pedestrian safety score', value: '4.7/5' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            className="text-center"
            variants={fadeInUp}
          >
            <p className="text-2xl font-semibold text-sustain-emerald font-data">{stat.value}</p>
            <p className="text-sm text-sustain-muted mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
