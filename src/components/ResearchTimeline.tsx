import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import { gsap } from '@/lib/scrollTriggers';

const stages = [
  { label: 'Data', desc: 'Multi-source ingestion' },
  { label: 'Graph', desc: 'Knowledge representation' },
  { label: 'Prediction', desc: 'Temporal forecasting' },
  { label: 'Optimization', desc: 'Multi-objective search' },
  { label: 'Decision', desc: 'Actionable recommendations' },
  { label: 'Impact', desc: 'Measurable outcomes' },
];

export default function ResearchTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const nodes = timelineRef.current.querySelectorAll('.timeline-node');
    const lines = timelineRef.current.querySelectorAll('.timeline-line');

    const ctx = gsap.context(() => {
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: node,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-32 px-6 md:px-20 max-w-6xl mx-auto" id="research">
      <SectionHeading
        eyebrow="Research Innovation"
        title="From data to impact."
        subtitle="A unified research pipeline that transforms raw urban data into measurable sustainability outcomes."
      />

      <div ref={timelineRef} className="relative">
        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:flex items-start justify-between relative">
          {stages.map((stage, i) => (
            <div key={stage.label} className="flex flex-col items-center relative z-10" style={{ flex: 1 }}>
              {/* Node */}
              <div className="timeline-node w-14 h-14 rounded-full bg-sustain-emerald flex items-center justify-center shadow-[0_8px_30px_-5px_rgba(34,197,94,0.3)]">
                <span className="text-white text-sm font-semibold">{i + 1}</span>
              </div>
              {/* Label */}
              <h4 className="mt-4 text-base font-semibold text-sustain-ink text-center">{stage.label}</h4>
              <p className="mt-1 text-xs text-sustain-muted text-center max-w-[120px]">{stage.desc}</p>

              {/* Connecting line (except last) */}
              {i < stages.length - 1 && (
                <div
                  className="timeline-line absolute top-7 h-[2px] bg-sustain-emerald/30"
                  style={{
                    left: '57%',
                    right: '-57%',
                    transformOrigin: 'left center',
                  }}
                >
                  {/* Animated dashes */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, #22C55E 0, #22C55E 6px, transparent 6px, transparent 12px)',
                      backgroundSize: '12px 2px',
                    }}
                    animate={{ backgroundPositionX: ['0px', '12px'] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="flex md:hidden flex-col gap-8">
          {stages.map((stage, i) => (
            <div key={stage.label} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="timeline-node w-10 h-10 rounded-full bg-sustain-emerald flex items-center justify-center shadow-[0_8px_30px_-5px_rgba(34,197,94,0.3)]">
                  <span className="text-white text-xs font-semibold">{i + 1}</span>
                </div>
                {i < stages.length - 1 && (
                  <div className="timeline-line w-[2px] h-12 bg-sustain-emerald/30 mt-2" style={{ transformOrigin: 'top center' }} />
                )}
              </div>
              <div className="pt-2">
                <h4 className="text-base font-semibold text-sustain-ink">{stage.label}</h4>
                <p className="text-sm text-sustain-muted mt-0.5">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
