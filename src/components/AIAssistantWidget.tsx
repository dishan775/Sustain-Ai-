import { useState } from 'react';
import type { Easing } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { sustainEase } from '@/lib/motionVariants';

const conversation = [
  {
    role: 'user' as const,
    text: 'Why is Ward 7 flagged?',
  },
  {
    role: 'assistant' as const,
    text: 'Ward 7 is flagged due to a 34% spike in traffic density on the Nashik Phata–Wakad corridor, which is driving AQI to 156 — above the 150 threshold. Contributing factors include construction activity on 3 sites and reduced wind speed (4 km/h vs 12 km/h average).',
  },
  {
    role: 'user' as const,
    text: 'What action do you recommend?',
  },
  {
    role: 'assistant' as const,
    text: 'I recommend rerouting 12% of northbound traffic through the Ravet–Akurdi bypass and temporarily extending green signal duration by 8 seconds on the main corridor. This should bring AQI below 145 within 90 minutes. Confidence: 87%.',
  },
];

/* ── Spark Icon (AI character) ───────────────────────── */
function SparkIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="16" cy="16" r="14" fill="#22C55E" opacity="0.15" />
      <circle cx="16" cy="16" r="8" fill="#22C55E" opacity="0.3" />
      <circle cx="16" cy="16" r="4" fill="#22C55E" />
      {/* Spark rays */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line
          key={deg}
          x1="16"
          y1="16"
          x2={16 + Math.cos((deg * Math.PI) / 180) * 12}
          y2={16 + Math.sin((deg * Math.PI) / 180) * 12}
          stroke="#22C55E"
          strokeWidth="1"
          opacity="0.3"
        />
      ))}
    </svg>
  );
}

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 w-[380px] max-w-[calc(100vw-48px)] bg-white/80 backdrop-blur-[24px] border border-white/70 rounded-organic shadow-[0_30px_80px_-15px_rgba(34,197,94,0.15)] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: sustainEase as Easing }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-sustain-ink/5">
              <div className="flex items-center gap-3">
                <SparkIcon className="w-7 h-7 spark-breathe" />
                <div>
                  <h4 className="text-sm font-semibold text-sustain-ink">SustainAI Assistant</h4>
                  <span className="text-[11px] text-sustain-emerald font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sustain-emerald" /> Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-sustain-ink/5 flex items-center justify-center transition-colors"
                aria-label="Close assistant"
              >
                <X size={16} className="text-sustain-muted" />
              </button>
            </div>

            {/* Conversation */}
            <div className="px-5 py-4 space-y-4 max-h-[360px] overflow-y-auto">
              {conversation.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.3 }}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-sustain-ink text-white rounded-br-md'
                        : 'bg-sustain-mint/60 text-sustain-ink rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-sustain-ink/5 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about any ward or metric..."
                className="flex-1 text-sm bg-transparent outline-none text-sustain-ink placeholder:text-sustain-muted/50 px-2 py-2"
                readOnly
              />
              <button className="w-9 h-9 rounded-full bg-sustain-emerald flex items-center justify-center hover:bg-sustain-emeraldDark transition-colors active:scale-95">
                <Send size={14} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-[20px] border border-white/70 shadow-[0_12px_40px_-8px_rgba(34,197,94,0.25)] flex items-center justify-center hover:shadow-[0_16px_50px_-8px_rgba(34,197,94,0.35)] transition-shadow active:scale-95"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} className="text-sustain-ink" />
            </motion.div>
          ) : (
            <motion.div key="spark" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <SparkIcon className="w-8 h-8 spark-breathe" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
