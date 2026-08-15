import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, ChevronDown, MapPin, Cloud, Sun,
  Search, LogOut, User,
} from 'lucide-react';

const notifications = [
  { id: 1, type: 'warning', text: 'Grid load approaching peak in Ward 7', time: '2m ago' },
  { id: 2, type: 'alert', text: 'Heavy congestion detected in Wakad', time: '8m ago' },
  { id: 3, type: 'info', text: 'EV charging demand increasing (+18%)', time: '15m ago' },
  { id: 4, type: 'success', text: 'Solar generation optimal — 94% capacity', time: '22m ago' },
];

interface DashboardHeaderProps {
  sidebarWidth: number;
}

export default function DashboardHeader({ sidebarWidth }: DashboardHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-IN', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });

  return (
    <header
      className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 bg-dash-bg/80 backdrop-blur-[20px] border-b border-black/[0.04]"
      style={{ marginLeft: sidebarWidth }}
    >
      {/* Left: City Selector */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-black/[0.04] transition-colors group">
          <MapPin size={14} className="text-sustain-emerald" />
          <span className="text-[13px] font-semibold text-dash-text">Pune, Maharashtra</span>
          <ChevronDown size={12} className="text-dash-textMuted group-hover:text-dash-text transition-colors" />
        </button>

        {/* Search */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/[0.03] border border-black/[0.06] text-dash-textMuted">
          <Search size={13} />
          <span className="text-[12px]">Search anything...</span>
          <kbd className="ml-6 text-[10px] bg-black/[0.06] px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </div>
      </div>

      {/* Right: Weather + Time + Notifications + Profile */}
      <div className="flex items-center gap-5">
        {/* Weather */}
        <div className="hidden md:flex items-center gap-2 text-dash-textMuted">
          <div className="relative">
            <Sun size={16} className="text-amber-400" />
            <Cloud size={10} className="absolute -bottom-0.5 -right-1 text-slate-400" />
          </div>
          <span className="text-[13px] font-medium text-dash-text">28°C</span>
          <span className="text-[11px]">Partly Cloudy</span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-5 bg-black/[0.06]" />

        {/* Date/Time */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[12px] font-medium text-dash-text">{formattedDate}</span>
          <span className="text-[11px] text-dash-textMuted font-mono">{formattedTime}</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-black/[0.04] transition-colors"
          >
            <Bell size={16} className="text-dash-textMuted" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sustain-emerald rounded-full dash-live-dot" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 w-80 bg-dash-card/95 backdrop-blur-[20px] border border-black/[0.08] rounded-2xl shadow-2xl overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-black/[0.06]">
                  <h4 className="text-[13px] font-semibold text-dash-text">Notifications</h4>
                </div>
                <div className="max-h-64 overflow-y-auto dash-scrollbar">
                  {notifications.map((n) => (
                    <div key={n.id} className="px-4 py-3 hover:bg-black/[0.03] transition-colors border-b border-black/[0.03] last:border-0">
                      <p className="text-[12px] text-dash-text leading-relaxed">{n.text}</p>
                      <span className="text-[10px] text-dash-textMuted mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2 rounded-xl hover:bg-black/[0.04] transition-colors px-2 py-1.5"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sustain-emerald to-sustain-ocean flex items-center justify-center text-white text-[11px] font-bold">
              DA
            </div>
            {/* Name hidden on small screens */}
            <div className="hidden xl:flex flex-col items-start">
              <span className="text-[12px] font-medium text-dash-text">City Admin</span>
              <span className="text-[10px] text-dash-textMuted">Administrator</span>
            </div>
            <ChevronDown size={12} className="text-dash-textMuted hidden xl:block" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 w-48 bg-dash-card/95 backdrop-blur-[20px] border border-black/[0.08] rounded-2xl shadow-2xl overflow-hidden z-50"
              >
                <button className="w-full px-4 py-2.5 flex items-center gap-2.5 text-[12px] text-dash-textMuted hover:text-dash-text hover:bg-black/[0.04] transition-colors">
                  <User size={14} /> Profile
                </button>
                <div className="border-t border-black/[0.06]" />
                <button
                  onClick={() => { window.location.hash = ''; window.location.pathname = '/'; }}
                  className="w-full px-4 py-2.5 flex items-center gap-2.5 text-[12px] text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
