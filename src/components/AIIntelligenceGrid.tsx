import { useState } from 'react';
import type { Easing } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, BarChart3, Share2, Brain, MessageSquareText, Database,
  AlertTriangle, Lightbulb, Settings2,
} from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

import { staggerContainer, fadeInUp, sustainEase } from '@/lib/motionVariants';

const modules = [
  {
    icon: Eye,
    title: 'Computer Vision',
    desc: 'Real-time visual understanding of urban scenes from cameras and satellites.',
    detail: 'Processes live feeds from 200+ cameras across PCMC to detect traffic density, waste accumulation, construction activity, and green cover changes — all in real time.',
  },
  {
    icon: BarChart3,
    title: 'Time-Series Forecasting',
    desc: 'Predictive models for energy, AQI, traffic, and resource demand.',
    detail: 'Temporal fusion transformers forecast 72 hours ahead across 14 urban metrics, enabling proactive resource allocation rather than reactive response.',
  },
  {
    icon: Share2,
    title: 'Graph Neural Networks',
    desc: 'Models relationships between infrastructure, zones, and systems.',
    detail: 'Encodes 12,000+ spatial relationships between roads, buildings, substations, and green zones to understand how a change in one area cascades through the city.',
  },
  {
    icon: Brain,
    title: 'Reinforcement Learning',
    desc: 'Learns optimal policies for traffic, energy, and emissions control.',
    detail: 'Multi-agent RL system discovers signal timing, EV routing, and load-balancing strategies that outperform handcrafted rules by 18–34% on key metrics.',
  },
  {
    icon: MessageSquareText,
    title: 'LLM + RAG',
    desc: 'Natural language interface backed by city-specific knowledge.',
    detail: 'GPT-4 class reasoning augmented with retrieval over 5,000+ municipal documents, enabling planners to query the twin in plain English.',
  },
  {
    icon: Database,
    title: 'Knowledge Graph',
    desc: 'Structured representation of all urban entities and their relationships.',
    detail: 'Neo4j-backed graph with 50,000+ nodes covering every ward, road segment, building cluster, utility connection, and policy document in PCMC.',
  },
  {
    icon: AlertTriangle,
    title: 'Anomaly Detection',
    desc: 'Real-time identification of unusual patterns and emerging issues.',
    detail: 'Isolation forests and autoencoders monitor 300+ data streams 24/7, flagging anomalies within 90 seconds with 94% precision.',
  },
  {
    icon: Lightbulb,
    title: 'Explainable AI',
    desc: 'Every prediction comes with a reason, not a black box.',
    detail: 'SHAP values, attention maps, and counterfactual explanations ensure every recommendation can be understood, audited, and trusted by decision-makers.',
  },
  {
    icon: Settings2,
    title: 'Optimization',
    desc: 'Multi-objective optimization for competing urban goals.',
    detail: 'Pareto-optimal solutions balance carbon reduction, traffic flow, energy efficiency, and citizen comfort — because real cities can\'t optimize just one thing.',
  },
];

export default function AIIntelligenceGrid() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto" id="intelligence">
      <SectionHeading
        eyebrow="9 AI Subsystems"
        title="Intelligence, not just data."
        subtitle="Each module is a specialist. Together, they form a system that understands the city as a living organism."
      />

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10"
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {modules.map((mod, idx) => {
          const Icon = mod.icon;
          const isExpanded = expandedIdx === idx;

          return (
            <motion.div 
              key={mod.title} 
              variants={fadeInUp} 
              className="ai-card-parent h-full"
              onMouseEnter={() => setExpandedIdx(idx)}
              onMouseLeave={() => setExpandedIdx(null)}
            >
              <div className="ai-card h-full">
                <div className="ai-content-box h-[calc(100%-30px)] flex flex-col justify-start">
                  <div className="ai-card-title flex-wrap gap-2">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(34,197,94,0.15)] flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-[#166534]" strokeWidth={2} />
                    </div>
                    <span>{mod.title}</span>
                  </div>

                  <div className="ai-card-content">
                    {mod.desc}
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: sustainEase as Easing }}
                        className="overflow-hidden w-full mt-auto"
                      >
                        <div className="ai-card-detail">
                          {/* Micro-visual: animated SVG */}
                          <div className="mb-3 flex justify-center">
                            <svg viewBox="0 0 120 30" className="w-24 h-8">
                              {[0, 1, 2, 3, 4].map((i) => (
                                <motion.rect
                                  key={i}
                                  x={i * 24 + 2}
                                  y={30}
                                  width={18}
                                  height={0}
                                  rx={3}
                                  fill={i % 2 === 0 ? '#22C55E' : '#166534'}
                                  animate={{ height: [0, 10 + i * 4, 8 + i * 3], y: [30, 20 - i * 4, 22 - i * 3] }}
                                  transition={{ duration: 1.2, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse' }}
                                />
                              ))}
                            </svg>
                          </div>
                          <p>{mod.detail}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
