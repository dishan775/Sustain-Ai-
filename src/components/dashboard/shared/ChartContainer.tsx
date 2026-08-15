import type { ReactNode } from 'react';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function ChartContainer({
  title,
  subtitle,
  action,
  children,
  className = '',
}: ChartContainerProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-dash-text">{title}</h3>
          {subtitle && (
            <p className="text-[11px] text-dash-textMuted mt-0.5">{subtitle}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
