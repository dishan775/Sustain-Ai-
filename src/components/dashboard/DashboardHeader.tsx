import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, ChevronDown, MapPin, Cloud, Sun,
  Search, LogOut, User, X,
  LayoutDashboard, Car, Zap, Leaf, Brain, Share2,
  Settings2, Satellite, FileBarChart, FlaskConical,
  Cog, UserCircle, CornerDownLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

/* ── Search index: all dashboard features with keywords ── */
const searchItems = [
  { icon: LayoutDashboard, label: 'Dashboard Home', path: '/dashboard', desc: 'Overview, KPIs, and live metrics', keywords: ['home', 'overview', 'kpi', 'main', 'dashboard'] },
  { icon: Car, label: 'Mobility', path: '/dashboard/mobility', desc: 'Traffic flow, congestion & EV tracking', keywords: ['traffic', 'transport', 'vehicle', 'ev', 'car', 'congestion', 'mobility'] },
  { icon: Zap, label: 'Energy', path: '/dashboard/energy', desc: 'Grid load, solar, wind & consumption', keywords: ['power', 'electricity', 'grid', 'solar', 'wind', 'energy', 'renewable'] },
  { icon: Leaf, label: 'Carbon', path: '/dashboard/carbon', desc: 'Emissions tracking & reduction targets', keywords: ['co2', 'emissions', 'carbon', 'footprint', 'green', 'sustainability'] },
  { icon: Brain, label: 'AI Predictions', path: '/dashboard/predictions', desc: 'ML forecasts & anomaly detection', keywords: ['ai', 'ml', 'forecast', 'predict', 'anomaly', 'intelligence', 'machine learning'] },
  { icon: Share2, label: 'Graph Network', path: '/dashboard/graph', desc: 'Infrastructure network visualization', keywords: ['graph', 'network', 'nodes', 'connections', 'topology', 'infrastructure'] },
  { icon: Settings2, label: 'Decision Engine', path: '/dashboard/decisions', desc: 'Policy optimization & recommendations', keywords: ['decision', 'policy', 'optimize', 'recommendation', 'engine'] },
  { icon: Satellite, label: 'Monitoring', path: '/dashboard/monitoring', desc: 'Real-time sensor & satellite feeds', keywords: ['monitor', 'sensor', 'satellite', 'realtime', 'live', 'alerts'] },
  { icon: FileBarChart, label: 'Reports', path: '/dashboard/reports', desc: 'Generate & export analytics reports', keywords: ['report', 'export', 'analytics', 'pdf', 'download', 'summary'] },
  { icon: FlaskConical, label: 'Scenarios', path: '/dashboard/scenarios', desc: 'What-if simulations & comparisons', keywords: ['scenario', 'simulation', 'what-if', 'compare', 'model'] },
  { icon: Cog, label: 'Settings', path: '/dashboard/settings', desc: 'App preferences & configurations', keywords: ['settings', 'preferences', 'config', 'configuration', 'options'] },
  { icon: UserCircle, label: 'Profile', path: '/dashboard/profile', desc: 'Your account & personal information', keywords: ['profile', 'account', 'user', 'personal', 'avatar', 'photo'] },
];

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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // ── Search state ──
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Derive display data from Google / Supabase user
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || '';
  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || '';
  const firstName = user?.user_metadata?.first_name || fullName.split(' ')[0] || '';
  const lastName = user?.user_metadata?.last_name || fullName.split(' ').slice(1).join(' ') || '';
  const email = user?.email || '';
  const initials = firstName && lastName
    ? `${firstName[0]}${lastName[0]}`.toUpperCase()
    : email
      ? email[0].toUpperCase()
      : 'G';
  const displayName = fullName || `${firstName} ${lastName}`.trim() || email?.split('@')[0] || 'Guest';

  // ── Filtered search results ──
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return searchItems.filter((item) => {
      if (item.label.toLowerCase().includes(q)) return true;
      if (item.desc.toLowerCase().includes(q)) return true;
      return item.keywords.some((kw) => kw.includes(q));
    });
  }, [searchQuery]);

  const showResults = searchFocused && searchQuery.trim().length > 0;

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [searchResults.length, searchQuery]);

  // ── Navigate to result ──
  const goToResult = useCallback((path: string) => {
    navigate(path);
    setSearchQuery('');
    setSearchFocused(false);
    searchInputRef.current?.blur();
  }, [navigate]);

  // ── Keyboard: ⌘K / Ctrl+K to focus, Escape to close ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchFocused(true);
      }
      if (e.key === 'Escape' && searchFocused) {
        setSearchQuery('');
        setSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [searchFocused]);

  // ── Arrow key navigation inside results ──
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter' && searchResults[activeIndex]) {
      e.preventDefault();
      goToResult(searchResults[activeIndex].path);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-IN', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // ── Highlight matching text ──
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="text-sustain-emerald font-bold">{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <header
      className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 bg-dash-bg/80 backdrop-blur-[20px] border-b border-black/[0.04]"
      style={{ marginLeft: sidebarWidth }}
    >
      {/* Left: City Selector + Search */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-black/[0.04] transition-colors group">
          <MapPin size={14} className="text-sustain-emerald" />
          <span className="text-[13px] font-semibold text-dash-text">Pune, Maharashtra</span>
          <ChevronDown size={12} className="text-dash-textMuted group-hover:text-dash-text transition-colors" />
        </button>

        {/* ══ Functional Search Bar ══ */}
        <div className="hidden lg:block relative" ref={searchContainerRef}>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200 ${
              searchFocused
                ? 'bg-white border-sustain-emerald/40 shadow-[0_0_0_3px_rgba(34,197,94,0.08),0_4px_16px_-4px_rgba(0,0,0,0.06)] w-80'
                : 'bg-black/[0.03] border-black/[0.06] w-64 hover:bg-black/[0.05]'
            }`}
          >
            <Search size={13} className={searchFocused ? 'text-sustain-emerald' : 'text-dash-textMuted'} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search features..."
              className="flex-1 bg-transparent outline-none text-[12px] text-dash-text placeholder:text-dash-textMuted"
            />
            {searchQuery ? (
              <button
                onClick={() => { setSearchQuery(''); searchInputRef.current?.focus(); }}
                className="text-dash-textMuted hover:text-dash-text transition-colors"
              >
                <X size={12} />
              </button>
            ) : (
              <kbd className="text-[10px] bg-black/[0.06] text-dash-textMuted px-1.5 py-0.5 rounded font-mono shrink-0">
                ⌘K
              </kbd>
            )}
          </div>

          {/* ── Search Results Dropdown ── */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-[calc(100%+8px)] w-96 bg-white/95 backdrop-blur-[20px] border border-black/[0.08] rounded-2xl shadow-[0_20px_60px_-12px_rgba(15,23,42,0.15)] overflow-hidden z-50"
              >
                {searchResults.length > 0 ? (
                  <>
                    <div className="px-3 py-2 border-b border-black/[0.05]">
                      <span className="text-[10px] font-semibold text-dash-textMuted uppercase tracking-wider">
                        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="max-h-72 overflow-y-auto dash-scrollbar py-1">
                      {searchResults.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = index === activeIndex;
                        return (
                          <button
                            key={item.path}
                            onClick={() => goToResult(item.path)}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors duration-100 ${
                              isActive
                                ? 'bg-sustain-emerald/[0.07]'
                                : 'hover:bg-black/[0.03]'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? 'bg-sustain-emerald/15 text-sustain-emerald'
                                : 'bg-black/[0.04] text-dash-textMuted'
                            }`}>
                              <Icon size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-[13px] font-semibold truncate ${isActive ? 'text-sustain-emerald' : 'text-dash-text'}`}>
                                {highlightMatch(item.label, searchQuery)}
                              </p>
                              <p className="text-[11px] text-dash-textMuted truncate">
                                {item.desc}
                              </p>
                            </div>
                            {isActive && (
                              <div className="flex items-center gap-1 text-[10px] text-dash-textMuted shrink-0">
                                <CornerDownLeft size={10} />
                                <span>Enter</span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {/* Keyboard hints */}
                    <div className="px-3 py-2 border-t border-black/[0.05] flex items-center gap-3 text-[10px] text-dash-textMuted">
                      <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-black/[0.05] rounded font-mono">↑↓</kbd> Navigate</span>
                      <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-black/[0.05] rounded font-mono">↵</kbd> Open</span>
                      <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-black/[0.05] rounded font-mono">Esc</kbd> Close</span>
                    </div>
                  </>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Search size={20} className="mx-auto text-dash-textMuted/50 mb-2" />
                    <p className="text-[12px] text-dash-textMuted font-medium">No results for "{searchQuery}"</p>
                    <p className="text-[11px] text-dash-textMuted/60 mt-1">Try searching for a feature name like "energy" or "carbon"</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
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
        <div className="relative" ref={notifRef}>
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
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2 rounded-xl hover:bg-black/[0.04] transition-colors px-2 py-1.5"
          >
            {/* Real avatar or initials fallback */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-8 h-8 rounded-full object-cover border-2 border-sustain-emerald/30"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sustain-emerald to-sustain-ocean flex items-center justify-center text-white text-[11px] font-bold">
                {initials}
              </div>
            )}
            {/* Name hidden on small screens */}
            <div className="hidden xl:flex flex-col items-start">
              <span className="text-[12px] font-medium text-dash-text">{displayName}</span>
              <span className="text-[10px] text-dash-textMuted">
                {user ? 'Authenticated' : 'Guest'}
              </span>
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
                className="absolute right-0 top-12 w-56 bg-dash-card/95 backdrop-blur-[20px] border border-black/[0.08] rounded-2xl shadow-2xl overflow-hidden z-50"
              >
                {/* User info in dropdown */}
                <div className="px-4 py-3 border-b border-black/[0.06]">
                  <div className="flex items-center gap-3">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={displayName}
                        className="w-9 h-9 rounded-full object-cover border border-black/10"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sustain-emerald to-sustain-ocean flex items-center justify-center text-white text-[12px] font-bold">
                        {initials}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="text-[12px] font-semibold text-dash-text truncate">{displayName}</p>
                      <p className="text-[10px] text-dash-textMuted truncate">{email || 'Guest User'}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { setShowProfile(false); navigate('/dashboard/profile'); }}
                  className="w-full px-4 py-2.5 flex items-center gap-2.5 text-[12px] text-dash-textMuted hover:text-dash-text hover:bg-black/[0.04] transition-colors"
                >
                  <User size={14} /> Profile
                </button>
                <div className="border-t border-black/[0.06]" />
                <button
                  onClick={handleSignOut}
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
