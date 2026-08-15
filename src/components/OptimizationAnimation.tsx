import { motion } from 'framer-motion';

export default function OptimizationAnimation() {
  return (
    <div className="w-full h-full relative min-h-[400px] flex items-center justify-center">
      <svg viewBox="0 0 600 500" className="w-full h-auto max-w-[550px] overflow-visible">
        <defs>
          <linearGradient id="aiCoreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="trafficGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="energyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="emissionsGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          
          <filter id="glowEffect">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background Network / Constellation */}
        <g stroke="#E2E8F0" strokeWidth="1" opacity="0.6">
          <circle cx="300" cy="250" r="180" fill="none" strokeDasharray="4 12" />
          <circle cx="300" cy="250" r="110" fill="none" strokeDasharray="2 6" />
        </g>
        
        {/* Animated Spinners */}
        <motion.circle cx="300" cy="250" r="180" fill="none" stroke="#22C55E" strokeWidth="1.5" strokeDasharray="100 1000" strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '300px 250px' }}
        />
        <motion.circle cx="300" cy="250" r="110" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="60 600" strokeLinecap="round"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '300px 250px' }}
        />

        {/* Connections (Straight Lines) */}
        {/* Traffic to Core */}
        <line x1="300" y1="90" x2="300" y2="250" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
        <motion.line x1="300" y1="90" x2="300" y2="250" stroke="url(#trafficGrad)" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 20"
          animate={{ strokeDashoffset: [60, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Energy to Core */}
        <line x1="140" y1="340" x2="300" y2="250" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
        <motion.line x1="140" y1="340" x2="300" y2="250" stroke="url(#energyGrad)" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 20"
          animate={{ strokeDashoffset: [60, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Emissions to Core */}
        <line x1="460" y1="340" x2="300" y2="250" stroke="#F1F5F9" strokeWidth="6" strokeLinecap="round" />
        <motion.line x1="460" y1="340" x2="300" y2="250" stroke="url(#emissionsGrad)" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 20"
          animate={{ strokeDashoffset: [60, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Central Core */}
        <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          {/* Hexagon */}
          <polygon points="300,205 340,227 340,273 300,295 260,273 260,227" fill="url(#aiCoreGrad)" filter="url(#glowEffect)" />
          {/* Inner details */}
          <circle cx="300" cy="250" r="18" fill="#ffffff" opacity="0.9" />
          <motion.circle cx="300" cy="250" r="10" fill="#047857" 
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.g>

        {/* Outer Nodes */}
        {/* Traffic Node (Top) */}
        <motion.g animate={{ y: [-6, 6, -6] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <circle cx="300" cy="90" r="38" fill="#ffffff" stroke="url(#trafficGrad)" strokeWidth="4" />
          {/* Car Icon */}
          <path d="M285 92 L290 82 H310 L315 92 V102 H285 Z" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="292" cy="102" r="4" fill="#2563EB" />
          <circle cx="308" cy="102" r="4" fill="#2563EB" />
          {/* Label */}
          <text x="300" y="35" textAnchor="middle" fill="#64748B" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">Traffic</text>
        </motion.g>

        {/* Energy Node (Bottom Left) */}
        <motion.g animate={{ y: [-5, 5, -5] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
          <circle cx="140" cy="340" r="38" fill="#ffffff" stroke="url(#energyGrad)" strokeWidth="4" />
          {/* Lightning Icon */}
          <path d="M142 325 L130 342 H142 L138 355 L152 338 H140 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" strokeLinejoin="round" />
          <text x="140" y="405" textAnchor="middle" fill="#64748B" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">Energy</text>
        </motion.g>

        {/* Emissions Node (Bottom Right) */}
        <motion.g animate={{ y: [-4, 4, -4] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
          <circle cx="460" cy="340" r="38" fill="#ffffff" stroke="url(#emissionsGrad)" strokeWidth="4" />
          {/* Factory / Leaf Icon */}
          <path d="M448 345 V330 L458 335 V325 L468 332 V345 Z" fill="#D1FAE5" stroke="#059669" strokeWidth="2" strokeLinejoin="round" />
          <path d="M455 335 Q465 320 475 335" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <text x="460" y="405" textAnchor="middle" fill="#64748B" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">Emissions</text>
        </motion.g>
        
        {/* Magic "Optimized" pulses going outward from core */}
        <motion.circle r="6" fill="#22C55E" filter="url(#glowEffect)"
          animate={{ cx: [300, 300], cy: [250, 90], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
        />
        <motion.circle r="6" fill="#22C55E" filter="url(#glowEffect)"
          animate={{ cx: [300, 140], cy: [250, 340], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
        />
        <motion.circle r="6" fill="#22C55E" filter="url(#glowEffect)"
          animate={{ cx: [300, 460], cy: [250, 340], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
        />
      </svg>
    </div>
  );
}
