import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';
import { Radio, TrendingUp, Cpu, MessageCircle } from 'lucide-react';
import { staggerContainer, sustainEase } from '@/lib/motionVariants';

const benefits = [
  {
    icon: Radio,
    title: 'Real-Time Sensing',
    description:
      'Live visual and sensor data from every corner of the city, updated continuously.',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Forecasting',
    description:
      'Anticipates energy, traffic, and emissions patterns before they become problems.',
  },
  {
    icon: Cpu,
    title: 'Autonomous Optimization',
    description:
      'Automatically balances competing city systems for maximum efficiency.',
  },
  {
    icon: MessageCircle,
    title: 'Explainable Decisions',
    description:
      'Every recommendation comes with a clear, human-readable reason — never a black box.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: sustainEase as Easing,
    },
  }),
};

const iconBounce = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: (i: number) => ({
    scale: [0.8, 1.08, 1],
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1 + 0.15,
      ease: sustainEase as Easing,
    },
  }),
};

export default function IntelligenceSection() {
  return (
    <section className="py-28 md:py-36 px-6 md:px-16 lg:px-20 bg-sustain-bone" id="intelligence-grid">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: sustainEase as Easing }}
        >
          <h2 className="text-[clamp(28px,4vw,48px)] font-semibold tracking-[-0.03em] text-sustain-ink leading-tight">
            Intelligence, not just data.
          </h2>
          <p className="mt-4 text-lg text-sustain-muted leading-relaxed max-w-[600px] mx-auto">
            Every module is a specialist. Together, they understand the city as a living system.
          </p>
        </motion.div>

        {/* 2×2 Grid */}
        <motion.div
          className="grid sm:grid-cols-2 gap-5 max-w-[900px] mx-auto"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                custom={i}
                variants={cardVariants}
                className="bg-sustain-bone border border-sustain-shadow/[0.08] rounded-[20px] p-7 flex flex-col gap-4 hover:border-sustain-shadow/[0.14] transition-colors duration-300"
              >
                {/* Icon tile */}
                <motion.div
                  custom={i}
                  variants={iconBounce}
                  className="w-12 h-12 rounded-[14px] bg-[#0F9D6B] flex items-center justify-center flex-shrink-0"
                >
                  <Icon size={22} className="text-white" strokeWidth={1.8} />
                </motion.div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-semibold text-sustain-ink tracking-[-0.01em]">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] text-sustain-muted leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
