import { motion } from 'framer-motion';

export default function WizStyleAnimation() {
  return (
    <div className="w-full h-full relative min-h-[400px] flex items-center justify-center">
      <svg viewBox="0 0 600 500" className="w-full h-auto max-w-[600px] drop-shadow-sm overflow-visible">
        <defs>
          <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FCE7F3" stopOpacity="1" /> {/* Soft pink like wiz */}
          </linearGradient>
          <linearGradient id="pipeGrad1" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#3B82F6" /> {/* ocean */}
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
          <linearGradient id="pipeGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background Clouds */}
        <motion.g 
          initial={{ y: 0 }}
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M 120 400 C 80 400 50 370 50 330 C 50 290 80 260 110 260 C 130 200 190 160 260 170 C 310 120 400 120 450 170 C 500 160 550 200 550 260 C 580 270 600 300 600 330 C 600 370 570 400 530 400 Z"
            fill="url(#cloudGrad)"
            stroke="#BFDBFE"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* The Pipes (representing Data Flow / Optimization) */}
        {/* Left Pipe Arc */}
        <path
          d="M 150 280 C 150 100 350 100 350 280"
          fill="none"
          stroke="url(#pipeGrad1)"
          strokeWidth="38"
          strokeLinecap="round"
        />
        <motion.path
          d="M 150 280 C 150 100 350 100 350 280"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeDasharray="6 14"
          animate={{ strokeDashoffset: [120, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Right Pipe L-shape */}
        <path
          d="M 330 220 L 450 220 C 470 220 480 230 480 250 L 480 350 C 480 370 470 380 450 380 L 350 380"
          fill="none"
          stroke="url(#pipeGrad2)"
          strokeWidth="38"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          d="M 330 220 L 450 220 C 470 220 480 230 480 250 L 480 350 C 480 370 470 380 450 380 L 350 380"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeDasharray="6 14"
          animate={{ strokeDashoffset: [120, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Badges/Icons on Pipes */}
        <g transform="translate(180, 160)">
          <circle cx="0" cy="0" r="14" fill="#DBEAFE" />
          {/* Traffic Icon */}
          <path d="M-5 -2 L5 -2 L6 2 L-6 2 Z" fill="#2563EB" />
          <circle cx="-3" cy="4" r="2" fill="#1E3A8A" />
          <circle cx="3" cy="4" r="2" fill="#1E3A8A" />
        </g>
        
        <g transform="translate(250, 115)">
          <circle cx="0" cy="0" r="14" fill="#DBEAFE" />
          {/* Energy/Lightning Icon */}
          <path d="M -2 -6 L -5 1 L 0 1 L -2 7 L 4 0 L -1 0 Z" fill="#2563EB" />
        </g>
        
        <g transform="translate(320, 160)">
          <circle cx="0" cy="0" r="14" fill="#DBEAFE" />
          {/* Leaf/Environment Icon */}
          <path d="M 0 5 C -4 5 -6 1 -6 -3 C -2 -3 0 1 0 5 M 0 5 C 4 5 6 1 6 -3 C 2 -3 0 1 0 5" fill="#2563EB" />
        </g>

        <g transform="translate(420, 220)">
          <circle cx="0" cy="0" r="14" fill="#FCE7F3" />
          {/* Target/Optimization Icon */}
          <circle cx="0" cy="0" r="5" fill="none" stroke="#DB2777" strokeWidth="2" />
          <circle cx="0" cy="0" r="1.5" fill="#DB2777" />
        </g>

        <g transform="translate(480, 290)">
          <circle cx="0" cy="0" r="14" fill="#DBEAFE" />
          {/* Chart Icon */}
          <rect x="-4" y="-2" width="2" height="6" fill="#2563EB" />
          <rect x="-1" y="-5" width="2" height="9" fill="#2563EB" />
          <rect x="2" y="-1" width="2" height="5" fill="#2563EB" />
        </g>

        {/* Wand & Hands */}
        {/* Right Hand holding wand */}
        <motion.g
           animate={{ rotate: [-2, 2, -2], originX: "300px", originY: "100px" }}
           transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Wand */}
          <rect x="230" y="70" width="120" height="14" rx="7" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1.5" transform="rotate(25 290 76)" />
          {/* Wand Tip */}
          <rect x="225" y="70" width="30" height="14" rx="7" fill="#ffffff" stroke="#3B82F6" strokeWidth="1.5" transform="rotate(25 290 76)" />
          
          {/* Fingers Outline */}
          <path d="M 320 60 C 300 40 260 50 260 80 C 260 100 270 120 290 130 C 310 140 330 140 340 120" fill="none" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 335 50 C 320 30 290 40 290 60 C 290 80 290 90 310 100" fill="none" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 360 80 C 340 60 310 70 310 100 C 310 110 320 120 330 120" fill="none" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Arm curve */}
          <path d="M 340 120 C 360 150 390 180 430 190" fill="none" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
        </motion.g>

        {/* Lower Hand interacting with Cloud */}
        <motion.g
           initial={{ x: 0 }}
           animate={{ x: [-4, 4, -4] }}
           transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          {/* Thumb */}
          <path d="M 170 360 C 200 330 260 300 290 310 C 310 320 290 340 260 350" fill="none" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Index */}
          <path d="M 190 380 C 230 380 310 350 330 360 C 350 370 340 380 310 390 C 280 400 250 400 230 400" fill="none" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Middle */}
          <path d="M 230 400 C 260 400 310 380 320 390 C 330 400 310 410 280 420 C 260 425 240 425 230 425" fill="none" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Ring */}
          <path d="M 230 425 C 250 425 290 410 300 420 C 310 430 280 440 250 445" fill="none" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Arm Base */}
          <path d="M 170 360 C 140 380 120 420 100 450" fill="none" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 250 445 C 230 470 190 500 150 520" fill="none" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
        </motion.g>

        {/* Glow Effects / Sparkles */}
        <motion.circle cx="210" cy="80" r="5" fill="#3B82F6" filter="url(#glow)"
           animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
           transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle cx="180" cy="110" r="3" fill="#22C55E" filter="url(#glow)"
           animate={{ scale: [1, 2, 1], opacity: [0.3, 0.8, 0.3] }}
           transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.path d="M 400 70 L 405 60 L 410 70 L 420 75 L 410 80 L 405 90 L 400 80 L 390 75 Z" fill="#FBBF24"
           animate={{ scale: [0.8, 1.1, 0.8], rotate: [0, 90] }}
           transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
