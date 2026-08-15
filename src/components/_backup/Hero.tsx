import { Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import GlassCard from '@/components/shared/GlassCard';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import { staggerContainer, fadeInUp, sustainEase } from '@/lib/motionVariants';

const DigitalTwinScene = lazy(() => import('@/components/DigitalTwinScene'));

/* ── Floating Stat Card ──────────────────────────────── */
function StatPill({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  return (
    <GlassCard className="px-5 py-3 flex flex-col items-center gap-1" hover={false}>
      <motion.div
        className="float-y"
        style={{ animationDelay: `${delay}s` }}
      >
        <AnimatedCounter
          target={value}
          suffix={suffix}
          className="text-[clamp(20px,2.5vw,28px)] font-semibold text-sustain-ink"
        />
        <p className="text-[12px] text-sustain-muted font-medium whitespace-nowrap">{label}</p>
      </motion.div>
    </GlassCard>
  );
}

/* ── Cloud Layer ─────────────────────────────────────── */
function CloudLayer({ speed, opacity, top }: { speed: number; opacity: number; top: string }) {
  return (
    <div
      className="cloud-layer absolute pointer-events-none"
      style={{
        top,
        opacity,
        animationDuration: `${speed}s`,
        width: '300px',
        height: '60px',
      }}
    >
      <svg viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="150" cy="40" rx="130" ry="20" fill="#E2E8F0" opacity="0.5" />
        <ellipse cx="120" cy="30" rx="80" ry="25" fill="#F1F5F9" opacity="0.6" />
        <ellipse cx="180" cy="28" rx="70" ry="22" fill="#F8FAFC" opacity="0.5" />
      </svg>
    </div>
  );
}

/* ── Leaf Particle ───────────────────────────────────── */
function LeafParticle({ left, delay, duration }: { left: string; delay: number; duration: number }) {
  return (
    <div
      className="leaf-particle absolute pointer-events-none"
      style={{
        left,
        top: '-20px',
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        width: '14px',
        height: '14px',
      }}
    >
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2C6 2 2 6 2 10C6 10 10 6 10 2Z" fill="#22C55E" opacity="0.6" />
        <path d="M10 2C14 2 18 6 18 10C14 10 10 6 10 2Z" fill="#16A34A" opacity="0.5" />
      </svg>
    </div>
  );
}

/* ── Word-by-word Animated H1 ────────────────────────── */
function AnimatedH1() {
  const words = ['The', 'living', 'digital', 'twin', 'for', 'sustainable', 'cities.'];

  return (
    <motion.h1
      className="text-[clamp(40px,6vw,72px)] font-medium tracking-[-0.04em] leading-[1.05] text-sustain-ink"
      variants={staggerContainer(0.06)}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.28em]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: sustainEase as Easing },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/* ── Hero Section ────────────────────────────────────── */
export default function Hero({ onSignIn }: { onSignIn?: () => void } = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const sceneOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const stats = [
    { value: 18, suffix: '%', label: 'Carbon reduction modeled' },
    { value: 9, suffix: '', label: 'AI subsystems' },
    { value: 3, suffix: '', label: 'Live in wards' },
    { value: 24, suffix: '/7', label: 'Anomaly watch' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh w-full overflow-hidden bg-gradient-to-b from-sustain-haze via-white to-sustain-mint/30"
      id="hero"
    >
      {/* ── 3D Scene Background (z-0) ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ opacity: sceneOpacity }}
      >
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-sustain-emerald/30 border-t-sustain-emerald rounded-full animate-spin" />
            </div>
          }
        >
          <DigitalTwinScene className="w-full h-full" />
        </Suspense>
      </motion.div>

      {/* ── Ambient Background Atmosphere (z-10) ── */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <CloudLayer speed={60} opacity={0.18} top="12%" />
        <CloudLayer speed={90} opacity={0.15} top="25%" />
        <CloudLayer speed={75} opacity={0.12} top="5%" />

        <LeafParticle left="15%" delay={0} duration={12} />
        <LeafParticle left="35%" delay={3} duration={15} />
        <LeafParticle left="60%" delay={6} duration={11} />
        <LeafParticle left="80%" delay={2} duration={14} />
        <LeafParticle left="45%" delay={8} duration={13} />
      </div>

      {/* ── Content (z-20) ── */}
      <div className="relative z-20 max-w-[900px] mx-auto text-center px-6 pt-32 pb-20 flex flex-col items-center min-h-svh justify-center">
        {/* Animated H1 */}
        <AnimatedH1 />

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-lg font-normal text-sustain-muted leading-relaxed max-w-[640px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: sustainEase as Easing }}
        >
          SustainAI fuses computer vision, forecasting, and reinforcement learning into one system
          that helps cities see, predict, and act — in real time.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          className="flex items-center gap-4 mt-10 flex-wrap justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: sustainEase as Easing }}
        >
          <button
            type="button"
            onClick={onSignIn ? onSignIn : () => { window.location.hash = '#signin'; }}
            className="bg-sustain-ink text-white rounded-pill px-7 py-4 text-base font-medium hover:bg-sustain-emeraldDark transition-all active:scale-95 shadow-[0_20px_50px_-12px_rgba(34,197,94,0.35)] cursor-pointer"
          >
            Sign in
          </button>
          <div className="flex items-center gap-3">
            <button
              className="w-11 h-11 rounded-full bg-white/60 backdrop-blur-md border border-white/70 flex items-center justify-center hover:bg-white/80 transition-all active:scale-95"
              aria-label="Watch the film"
            >
              <Play size={16} className="text-sustain-ink ml-0.5" fill="currentColor" />
            </button>
            <span className="text-[15px] font-medium text-sustain-ink/70">Watch the film</span>
          </div>
        </motion.div>

        {/* Floating Stat Strip */}
        <motion.div
          className="flex items-center gap-4 mt-14 flex-wrap justify-center"
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, i) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <StatPill
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 0.4}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll Cue ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{ opacity: scrollCueOpacity }}
      >
        <span className="text-[13px] text-sustain-muted font-medium">Scroll to see it work</span>
        <ChevronDown size={20} className="text-sustain-muted scroll-cue-bounce" />
      </motion.div>
    </section>
  );
}
