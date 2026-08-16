import { useRef } from 'react';
import type { Easing } from 'framer-motion';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { fadeInUp, staggerContainer, sustainEase } from '@/lib/motionVariants';



export default function CarbonIntelligence() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-20 max-w-7xl mx-auto" id="carbon">
      <SectionHeading
        eyebrow="Carbon Intelligence"
        title="Watch the city go green."
        subtitle="Scroll to see how SustainAI models carbon reduction across every ward — from today's baseline to tomorrow's optimized city."
      />

      <div className="grid md:grid-cols-2 gap-16 items-center mt-10">
        {/* City Video */}
        <motion.div
          className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white scale-110"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: sustainEase as Easing }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-black">
            <video 
              src="/city-video.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover scale-[1.35] origin-center"
            />
          </div>
          {/* Subtle inner shadow for depth */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none rounded-2xl" />
        </motion.div>

        {/* Tree Growth + Caption */}
        <motion.div
          className="flex flex-col items-center gap-8"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Animated Tree SVG */}
          <motion.div variants={fadeInUp} className="relative">
            <svg viewBox="0 0 140 180" className="w-32 h-40">
              {/* Trunk */}
              <motion.rect
                x="62"
                y="120"
                width="16"
                height="50"
                rx="4"
                fill="#16A34A"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1, ease: sustainEase as Easing }}
                viewport={{ once: true }}
                style={{ transformOrigin: '70px 170px' }}
              />
              {/* Canopy layers */}
              {[
                { cx: 70, cy: 90, r: 35, delay: 0.3 },
                { cx: 50, cy: 105, r: 28, delay: 0.5 },
                { cx: 90, cy: 105, r: 28, delay: 0.5 },
                { cx: 70, cy: 60, r: 30, delay: 0.7 },
                { cx: 55, cy: 75, r: 22, delay: 0.9 },
                { cx: 85, cy: 75, r: 22, delay: 0.9 },
              ].map((leaf, i) => (
                <motion.circle
                  key={i}
                  cx={leaf.cx}
                  cy={leaf.cy}
                  r={leaf.r}
                  fill="#22C55E"
                  opacity={0.7 - i * 0.05}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.7 - i * 0.05 }}
                  transition={{
                    duration: 0.8,
                    delay: leaf.delay,
                    ease: sustainEase as Easing,
                  }}
                  viewport={{ once: true }}
                />
              ))}
            </svg>

            {/* Child silhouette */}
            <motion.svg
              viewBox="0 0 40 60"
              className="absolute bottom-2 -right-8 w-8 h-12"
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 0.5, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <circle cx="20" cy="10" r="7" fill="#22C55E" />
              <rect x="15" y="18" width="10" height="20" rx="4" fill="#22C55E" />
              <rect x="11" y="38" width="6" height="16" rx="3" fill="#22C55E" />
              <rect x="23" y="38" width="6" height="16" rx="3" fill="#22C55E" />
            </motion.svg>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <p className="text-2xl font-semibold text-sustain-ink">
              <span className="text-sustain-emerald">18%</span> carbon reduction
            </p>
            <p className="text-sustain-muted mt-2 leading-relaxed max-w-sm">
              Modeled across Ward 3, 5, and 7 using multi-objective optimization — verified against
              PCMC's 2024 emissions baseline.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
