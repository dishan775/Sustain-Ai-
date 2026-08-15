import { useRef, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '@/lib/scrollTriggers';
import type { CitySceneHandle } from '@/components/DigitalTwinScene';

const DigitalTwinScene = lazy(() => import('@/components/DigitalTwinScene'));

const features = [
  {
    number: '01',
    tag: 'SENSING, CONNECTED!',
    title: 'Real-Time Urban Pulse',
    description:
      'Every sensor, camera, and data stream feeds into one living model. The city becomes visible in ways never before possible.',
    cta: 'Watch the demo',
    featureIndex: 1,
  },
  {
    number: '02',
    tag: 'TWIN, REFLECTED!',
    title: 'Digital Mirror of the City',
    description:
      'A complete digital replica that mirrors the real city in real time — every building, road, and energy flow, simulated and synchronized.',
    cta: 'Watch the demo',
    featureIndex: 2,
  },
  {
    number: '03',
    tag: 'ENERGY, BALANCED!',
    title: 'Optimized Power Grid',
    description:
      'Solar capture, EV charging loads, and grid demand — balanced automatically by AI that learns the city\'s energy rhythms.',
    cta: 'Watch the demo',
    featureIndex: 3,
  },
  {
    number: '04',
    tag: 'MOBILITY, OPTIMIZED!',
    title: 'Intelligent Movement',
    description:
      'Traffic signals, transit routes, and bike corridors — orchestrated together so the whole city moves smarter, not just faster.',
    cta: 'Watch the demo',
    featureIndex: 4,
  },
];

export default function FeatureSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<CitySceneHandle>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    // Each feature section pins and drives the camera
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;

      const st = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          onEnter: () => {
            if (sceneRef.current) {
              sceneRef.current.setFeatureIndex(features[i].featureIndex);
            }
          },
          onEnterBack: () => {
            if (sceneRef.current) {
              sceneRef.current.setFeatureIndex(features[i].featureIndex);
            }
          },
        },
      });

      // Animate the annotation panel
      const textEl = panel.querySelector('.feature-text');
      if (textEl) {
        st.fromTo(
          textEl,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
          0
        );
      }

      if (st.scrollTrigger) {
        triggers.push(st.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {features.map((feature, i) => (
        <div
          key={feature.number}
          ref={(el) => { panelRefs.current[i] = el; }}
          className="relative w-full h-svh overflow-hidden bg-sustain-bone paper-grain"
        >
          {/* Grid: left annotation + right 3D scene */}
          <div className="h-full flex items-center">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-20 grid md:grid-cols-[380px_1fr] gap-12 items-center">
              {/* Left: Annotation Panel */}
              <div className="feature-text flex flex-col gap-6">
                {/* Circled number */}
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full border-2 border-sustain-shadow/20 flex items-center justify-center text-[15px] font-bold text-sustain-ink">
                    {feature.number}
                  </span>
                  <span className="text-[12px] font-semibold tracking-[0.15em] text-sustain-emerald uppercase">
                    {feature.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[clamp(28px,3.5vw,44px)] font-semibold tracking-[-0.03em] text-sustain-ink leading-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] text-sustain-muted leading-relaxed max-w-[350px]">
                  {feature.description}
                </p>

                {/* CTA pill */}
                <motion.button
                  className="self-start flex items-center gap-2 border border-sustain-shadow/15 rounded-pill px-5 py-2.5 text-[14px] font-medium text-sustain-ink hover:bg-sustain-shadow/[0.03] transition-all active:scale-95"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <polygon points="4,2 12,7 4,12" fill="currentColor" />
                  </svg>
                  {feature.cta}
                </motion.button>
              </div>

              {/* Right: 3D Scene */}
              <div className="relative w-full h-[60vh] md:h-[75vh] rounded-[24px] overflow-hidden">
                {i === 0 && (
                  <Suspense
                    fallback={
                      <div className="w-full h-full flex items-center justify-center bg-sustain-bone">
                        <div className="w-8 h-8 border-2 border-sustain-emerald/30 border-t-sustain-emerald rounded-full animate-spin" />
                      </div>
                    }
                  >
                    <DigitalTwinScene ref={sceneRef} className="w-full h-full" />
                  </Suspense>
                )}
                {i > 0 && (
                  <div className="w-full h-full bg-sustain-bone/50 flex items-center justify-center">
                    {/* Reuse the same canvas — it follows scroll. On non-first panels, 
                        the canvas is in the first panel but the camera has moved. 
                        We show a gradient overlay to indicate scene continuity. */}
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-sustain-emerald/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-sustain-emerald">{feature.number}</span>
                      </div>
                      <p className="text-sm text-sustain-muted">Scene camera: {feature.tag}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Need to import ScrollTrigger for the cleanup
import { ScrollTrigger } from '@/lib/scrollTriggers';
