import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NavButton from '@/components/shared/NavButton';

const navLinks = [
  { label: 'Platform', href: '#platform' },
  { label: 'Digital Twin', href: '#digital-twin' },
  { label: 'Research', href: '#research' },
  { label: 'Impact', href: '#impact' },
];

interface NavProps {
  onSignIn?: () => void;
}

export default function Nav({ onSignIn }: NavProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 40], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 40], [0, 0.4]);

  return (
    <motion.nav
      className="sticky top-0 z-50 flex items-center justify-between px-20 pt-6 pb-4 max-md:px-6 max-md:pt-5"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(255,255,255,${v * 0.7})`),
        backdropFilter: useTransform(bgOpacity, (v) => `blur(${v * 24}px)`),
        WebkitBackdropFilter: useTransform(bgOpacity, (v) => `blur(${v * 24}px)`),
        borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(255,255,255,${v})`),
      }}
    >
      {/* Wordmark */}
      <a href="#" className="flex items-center gap-0">
        <span className="font-sans text-[26px] font-semibold text-sustain-ink tracking-[-0.02em]">
          Sustain<span className="text-sustain-emerald">AI</span>
        </span>
      </a>

      {/* Center Nav Links — hidden on mobile */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <NavButton
            key={link.label}
            label={link.label}
            href={link.href}
            activeId={hoveredLink}
            onHover={setHoveredLink}
          />
        ))}
      </div>

      {/* Right CTA buttons */}
      <div className="flex items-center gap-3">
        <a
          href="#demo"
          className="hidden sm:inline-flex border border-sustain-ink/15 rounded-pill px-5 py-2.5 text-[15px] font-medium text-sustain-ink hover:bg-sustain-ink/5 transition-all active:scale-95"
        >
          Book a demo
        </a>
        <button
          type="button"
          onClick={onSignIn}
          className="bg-sustain-ink text-white rounded-pill px-5 py-3 text-[15px] font-medium hover:bg-sustain-emeraldDark transition-all active:scale-95 cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </motion.nav>
  );
}

