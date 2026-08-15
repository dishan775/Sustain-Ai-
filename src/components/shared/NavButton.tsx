import { motion } from 'framer-motion';

interface NavButtonProps {
  label: string;
  href: string;
  activeId: string | null;
  onHover: (id: string | null) => void;
}

export default function NavButton({ label, href, activeId, onHover }: NavButtonProps) {
  const isActive = activeId === label;

  return (
    <a
      href={href}
      className="relative text-[15px] font-medium text-sustain-ink/80 hover:text-sustain-ink transition-colors px-3 py-2"
      onMouseEnter={() => onHover(label)}
      onMouseLeave={() => onHover(null)}
    >
      {label}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-3 right-3 h-[2px] bg-sustain-emerald rounded-full"
          layoutId="nav-underline"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </a>
  );
}
