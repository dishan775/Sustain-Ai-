const variants = {
  live: {
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
    animate: true,
  },
  good: {
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
    animate: false,
  },
  warning: {
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    dot: 'bg-amber-400',
    animate: true,
  },
  critical: {
    bg: 'bg-red-500/15',
    text: 'text-red-400',
    dot: 'bg-red-400',
    animate: true,
  },
  info: {
    bg: 'bg-blue-500/15',
    text: 'text-blue-400',
    dot: 'bg-blue-400',
    animate: false,
  },
  neutral: {
    bg: 'bg-black/5',
    text: 'text-dash-textMuted',
    dot: 'bg-dash-textMuted',
    animate: false,
  },
};

interface StatusBadgeProps {
  variant: keyof typeof variants;
  label: string;
  className?: string;
}

export default function StatusBadge({ variant, label, className = '' }: StatusBadgeProps) {
  const v = variants[variant];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${v.bg} ${v.text} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${v.dot} ${v.animate ? 'dash-live-dot' : ''}`} />
      {label}
    </span>
  );
}
