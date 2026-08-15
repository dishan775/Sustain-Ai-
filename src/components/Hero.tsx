import { useRef, useState, Suspense, lazy, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { staggerContainer, sustainEase } from '@/lib/motionVariants';
import type { CitySceneHandle } from '@/components/DigitalTwinScene';

const DigitalTwinScene = lazy(() => import('@/components/DigitalTwinScene'));

/* ── Word-by-word Animated H1 ────────────────────────── */
function AnimatedH1() {
  const line1 = ['The', 'living', 'digital', 'twin'];
  const line2 = ['for', 'sustainable', 'cities.'];

  return (
    <motion.h1
      className="text-[clamp(36px,5vw,64px)] font-semibold tracking-[-0.04em] leading-[1.08] text-sustain-ink"
      variants={staggerContainer(0.06)}
      initial="hidden"
      animate="visible"
    >
      <span className="block">
        {line1.map((word, i) => (
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
      </span>
      <span className="block">
        {line2.map((word, i) => (
          <motion.span
            key={i + 4}
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
      </span>
    </motion.h1>
  );
}

/* ── Stat Pill ───────────────────────────────────────── */
function StatPill({ number, suffix, label }: { number: string; suffix: string; label: string }) {
  return (
    <div className="bg-sustain-bone border border-sustain-shadow/[0.08] rounded-pill px-5 py-3 flex flex-col items-center gap-0.5 min-w-[120px]">
      <span className="text-xl font-bold text-sustain-ink tabular-nums">
        {number}<span className="text-base font-semibold text-sustain-muted">{suffix}</span>
      </span>
      <span className="text-[11px] text-sustain-muted font-medium whitespace-nowrap">{label}</span>
    </div>
  );
}

/* ── Corner Readout ──────────────────────────────────── */
function CornerReadout({ scrollProgress }: { scrollProgress: number }) {
  const co2 = (scrollProgress * 12.7).toFixed(2);
  const energy = (scrollProgress * 23.4).toFixed(1);

  return (
    <div className="fixed top-20 left-6 z-40 flex flex-col gap-1 font-mono text-[11px] text-sustain-shadow/40 pointer-events-none select-none">
      <span className="corner-blink">CO₂ SAVED <span className="text-sustain-emerald/60 tabular-nums">{co2} t</span></span>
      <span className="corner-blink" style={{ animationDelay: '1.5s' }}>
        ENERGY OPT <span className="text-sustain-emerald/60 tabular-nums">{energy}%</span>
      </span>
    </div>
  );
}

/* ── Hero Section ────────────────────────────────────── */
export default function Hero({ onSignIn }: { onSignIn?: () => void } = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<CitySceneHandle>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Time-based ticking for the corner readout instead of scroll
  useEffect(() => {
    let animationFrameId: number;
    let startTime = performance.now();

    const updateProgress = (time: number) => {
      // Very slow increase to simulate live data ticking up
      const elapsed = time - startTime;
      setScrollProgress(elapsed * 0.00005);
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleSignIn = useCallback(() => {
    if (onSignIn) onSignIn();
    else window.location.hash = '#signin';
  }, [onSignIn]);

  const stats = [
    { number: '18', suffix: '%', label: 'Carbon reduction modeled' },
    { number: '9', suffix: '', label: 'AI subsystems' },
    { number: '3', suffix: '', label: 'Live pilot wards' },
    { number: '24', suffix: '/7', label: 'Anomaly watch' },
  ];

  return (
    <>
      <CornerReadout scrollProgress={scrollProgress} />

      <section
        ref={sectionRef}
        className="relative w-full min-h-svh overflow-hidden bg-sustain-bone paper-grain"
        id="hero"
      >
        {/* ── 3D Scene (right 2/3) ── */}
        <div className="absolute inset-0 z-0">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center bg-sustain-bone">
                <div className="w-8 h-8 border-2 border-sustain-emerald/30 border-t-sustain-emerald rounded-full animate-spin" />
              </div>
            }
          >
            <DigitalTwinScene ref={sceneRef} className="w-full h-full" />
          </Suspense>
        </div>

        {/* ── Hero Content (Centered) ── */}
        <div
          ref={contentRef}
          className="relative z-20 h-full flex items-center justify-center pt-16"
        >
          <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-20 flex flex-col items-center text-center">
            <div className="max-w-[720px] flex flex-col items-center">
              {/* Animated Headline */}
              <AnimatedH1 />

              {/* Subhead */}
              <motion.p
                className="mt-6 text-[16px] md:text-lg font-normal text-sustain-muted leading-relaxed max-w-[480px]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: sustainEase as Easing }}
              >
                SustainAI fuses computer vision, forecasting, and optimization into one system
                that helps cities see, predict, and act — in real time.
              </motion.p>

              {/* CTA Row */}
              <motion.div
                className="flex items-center justify-center gap-4 mt-8 flex-wrap"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: sustainEase as Easing }}
              >
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="bg-sustain-ink text-white rounded-pill px-7 py-3.5 text-[15px] font-medium hover:bg-sustain-shadow transition-all active:scale-95 cursor-pointer"
                >
                  Get started
                </button>
                <div className="flex items-center gap-3">
                  <button
                    className="w-11 h-11 rounded-full border-2 border-sustain-emerald/50 flex items-center justify-center hover:border-sustain-emerald hover:bg-sustain-emerald/5 transition-all active:scale-95"
                    aria-label="Watch the film"
                  >
                    <Play size={14} className="text-sustain-ink ml-0.5" fill="currentColor" />
                  </button>
                  <span className="text-[14px] font-medium text-sustain-ink/60">Watch the film</span>
                </div>
              </motion.div>

              {/* Stat Strip */}
              <motion.div
                className="flex items-center justify-center gap-3 mt-10 flex-wrap"
                variants={staggerContainer(0.1)}
                initial="hidden"
                animate="visible"
              >
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: sustainEase as Easing },
                      },
                    }}
                  >
                    <StatPill number={stat.number} suffix={stat.suffix} label={stat.label} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Scroll Cue ── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-[12px] text-sustain-muted font-medium tracking-wide uppercase">
            Scroll to see it work
          </span>
          <ChevronDown size={18} className="text-sustain-muted scroll-cue-bounce" />
        </motion.div>
      </section>
    </>
  );
}
