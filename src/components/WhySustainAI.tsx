import { motion } from 'framer-motion';
import { slideInLeft, slideInRight, staggerContainer } from '@/lib/motionVariants';
import OptimizationAnimation from './OptimizationAnimation';

export default function WhySustainAI() {
  return (
    <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto" id="platform">
      <motion.div
        className="grid md:grid-cols-2 gap-16 items-center"
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Left: Headline */}
        <motion.div variants={slideInLeft}>
          <span className="inline-flex items-center gap-2 bg-sustain-mint text-sustain-emeraldDark text-[13px] font-medium px-4 py-1.5 rounded-pill mb-6">
            <span className="w-2 h-2 rounded-full bg-sustain-emerald pulse-dot" />
            Why SustainAI
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-medium tracking-[-0.03em] text-sustain-ink leading-tight">
            Cities optimize traffic, energy, and emissions separately.{' '}
            <span className="text-sustain-emerald">SustainAI optimizes them together.</span>
          </h2>
          <p className="mt-6 text-lg text-sustain-muted leading-relaxed">
            Siloed systems create conflict — optimizing one metric degrades another. SustainAI's
            multi-objective engine finds the Pareto-optimal solution across all urban systems
            simultaneously.
          </p>
        </motion.div>

        {/* Right: Animated graphic */}
        <motion.div
          className="flex justify-center items-center w-full"
          variants={slideInRight}
        >
          <OptimizationAnimation />
        </motion.div>
      </motion.div>
    </section>
  );
}
