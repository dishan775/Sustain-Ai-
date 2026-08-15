import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Car, Zap, Leaf, Brain, Share2,
  Settings2, Satellite, FileBarChart, FlaskConical,
  ChevronsLeft, ChevronsRight, Cog,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Car, label: 'Mobility', path: '/dashboard/mobility' },
  { icon: Zap, label: 'Energy', path: '/dashboard/energy' },
  { icon: Leaf, label: 'Carbon', path: '/dashboard/carbon' },
  { icon: Brain, label: 'AI Predictions', path: '/dashboard/predictions' },
  { icon: Share2, label: 'Graph Network', path: '/dashboard/graph' },
  { icon: Settings2, label: 'Decision Engine', path: '/dashboard/decisions' },
  { icon: Satellite, label: 'Monitoring', path: '/dashboard/monitoring' },
  { icon: FileBarChart, label: 'Reports', path: '/dashboard/reports' },
  { icon: FlaskConical, label: 'Scenarios', path: '/dashboard/scenarios' },
  { icon: Cog, label: 'Settings', path: '/dashboard/settings' },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function DashboardSidebar({ collapsed, onToggle }: DashboardSidebarProps) {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.aside
      className="fixed left-4 top-4 bottom-4 z-40 flex flex-col bg-[#F4F7F5] rounded-[28px] shadow-[inset_0_4px_12px_rgba(255,255,255,1),inset_0_-4px_12px_rgba(15,23,42,0.04),0_20px_40px_-12px_rgba(15,23,42,0.12)] border border-white/60 overflow-hidden"
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Wordmark */}
      <div className="flex items-center h-20 px-6 flex-shrink-0 relative z-10">
        <div className="flex items-center gap-0 overflow-hidden">
          <span className="text-[22px] font-semibold text-dash-text tracking-[-0.02em] whitespace-nowrap">
            {collapsed ? (
              <span className="text-sustain-emerald">C</span>
            ) : (
              <>Carbon<span className="text-sustain-emerald">Twin</span></>
            )}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2.5 dash-scrollbar">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === '/dashboard'
              ? location.pathname === '/dashboard'
              : location.pathname.startsWith(item.path);
            const isHovered = hoveredItem === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative flex items-center gap-3 rounded-xl transition-colors duration-200 group"
                style={{
                  padding: collapsed ? '10px 12px' : '10px 14px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                }}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Active/hover background */}
                <AnimatePresence>
                  {(isActive || isHovered) && (
                    <motion.div
                      className={`absolute inset-0 rounded-2xl ${
                        isActive
                          ? 'bg-[#E4EDE7] shadow-[inset_0_3px_6px_rgba(0,0,0,0.06),inset_0_-2px_4px_rgba(255,255,255,0.7)]'
                          : 'bg-white shadow-[0_4px_12px_rgba(15,23,42,0.04),inset_0_2px_4px_rgba(255,255,255,1)] border border-white'
                      }`}
                      layoutId="sidebar-active"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>

                {/* Active indicator dot instead of bar for clay theme */}
                {isActive && (
                  <motion.div
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-sustain-emerald rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                    layoutId="sidebar-indicator"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}

                <Icon
                  size={18}
                  className={`relative z-10 flex-shrink-0 transition-colors duration-200 ${
                    isActive ? 'text-sustain-emerald' : 'text-slate-400 group-hover:text-sustain-emerald'
                  } ${isActive ? (collapsed ? 'ml-0' : 'ml-3') : ''}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {!collapsed && (
                  <span
                    className={`relative z-10 text-[13px] font-semibold whitespace-nowrap transition-colors duration-200 ${
                      isActive ? 'text-sustain-ink' : 'text-slate-500 group-hover:text-sustain-ink'
                    }`}
                  >
                    {item.label}
                  </span>
                )}

                {/* Tooltip for collapsed */}
                {collapsed && isHovered && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-dash-card rounded-lg border border-black/[0.08] text-[12px] text-dash-text font-medium whitespace-nowrap z-50 shadow-xl pointer-events-none">
                    {item.label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 relative z-10">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-slate-500 hover:text-sustain-ink hover:bg-white hover:shadow-[0_4px_12px_rgba(15,23,42,0.04),inset_0_2px_4px_rgba(255,255,255,1)] hover:border hover:border-white transition-all duration-300 text-[12px] font-bold tracking-wide uppercase"
        >
          {collapsed ? <ChevronsRight size={16} /> : <><ChevronsLeft size={16} /> <span>Collapse</span></>}
        </button>
      </div>
    </motion.aside>
  );
}
