import { motion } from 'framer-motion';
import { FileBarChart, Download, Calendar, Clock, FileText, FileJson, Table } from 'lucide-react';
import DashboardGlassCard from '../shared/DashboardGlassCard';

const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const reportTemplates = [
  { name: 'Daily Sustainability Report', frequency: 'Daily', lastGen: '6 hours ago', pages: 12, icon: FileBarChart },
  { name: 'Weekly Carbon Report', frequency: 'Weekly', lastGen: '2 days ago', pages: 28, icon: FileBarChart },
  { name: 'Monthly Energy Report', frequency: 'Monthly', lastGen: '12 days ago', pages: 45, icon: FileBarChart },
  { name: 'Mobility Analytics Report', frequency: 'Weekly', lastGen: '3 days ago', pages: 22, icon: FileBarChart },
  { name: 'AI Decision Log', frequency: 'Daily', lastGen: '8 hours ago', pages: 8, icon: FileBarChart },
  { name: 'Infrastructure Health Report', frequency: 'Monthly', lastGen: '18 days ago', pages: 35, icon: FileBarChart },
];

const recentReports = [
  { name: 'Sustainability_Report_2025-05-20', type: 'PDF', size: '2.4 MB', date: 'May 20, 2025' },
  { name: 'Carbon_Analysis_Week_20', type: 'PDF', size: '4.1 MB', date: 'May 18, 2025' },
  { name: 'Energy_Data_May_2025', type: 'CSV', size: '12.8 MB', date: 'May 15, 2025' },
  { name: 'Traffic_Metrics_Export', type: 'JSON', size: '8.2 MB', date: 'May 14, 2025' },
  { name: 'Monthly_Overview_Apr_2025', type: 'PDF', size: '5.6 MB', date: 'May 1, 2025' },
  { name: 'AI_Decisions_Week_19', type: 'PDF', size: '1.8 MB', date: 'Apr 28, 2025' },
];

const typeIcons: Record<string, typeof FileText> = { PDF: FileText, CSV: Table, JSON: FileJson };

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <motion.div {...stagger(0)}>
        <h1 className="text-2xl font-bold text-dash-text tracking-tight">Reports</h1>
        <p className="text-sm text-dash-textMuted mt-1">Generate and export sustainability, carbon, energy, and mobility reports.</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Reports Generated', value: '142', icon: FileBarChart, color: '#22C55E' },
          { label: 'This Month', value: '18', icon: Calendar, color: '#3B82F6' },
          { label: 'Total Downloads', value: '2,840', icon: Download, color: '#FBBF24' },
          { label: 'Next Scheduled', value: 'In 6h', icon: Clock, color: '#F97316' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} {...stagger(i * 0.05)}>
              <DashboardGlassCard className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                    <Icon size={16} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-dash-text font-data">{stat.value}</p>
                    <p className="text-[10px] text-dash-textMuted">{stat.label}</p>
                  </div>
                </div>
              </DashboardGlassCard>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Report Templates */}
        <motion.div {...stagger(0.1)}>
          <DashboardGlassCard className="p-5 h-full">
            <h3 className="text-sm font-semibold text-dash-text mb-4">Report Templates</h3>
            <div className="space-y-2.5">
              {reportTemplates.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={r.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] hover:border-black/[0.08] transition-all group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <Icon size={14} className="text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-dash-text">{r.name}</p>
                        <p className="text-[10px] text-dash-textMuted">{r.frequency} · {r.pages} pages · Last: {r.lastGen}</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold hover:bg-emerald-500/20 transition-colors opacity-0 group-hover:opacity-100">
                      Generate
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </DashboardGlassCard>
        </motion.div>

        {/* Recent Reports */}
        <motion.div {...stagger(0.15)}>
          <DashboardGlassCard className="p-5 h-full">
            <h3 className="text-sm font-semibold text-dash-text mb-4">Recent Reports</h3>
            <div className="space-y-2.5">
              {recentReports.map((r, i) => {
                const Icon = typeIcons[r.type] || FileText;
                return (
                  <motion.div
                    key={r.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] hover:border-black/[0.08] transition-all group"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={14} className="text-blue-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold text-dash-text truncate">{r.name}</p>
                        <p className="text-[10px] text-dash-textMuted">{r.type} · {r.size} · {r.date}</p>
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/[0.04] transition-colors">
                      <Download size={14} className="text-dash-textMuted group-hover:text-dash-text" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </DashboardGlassCard>
        </motion.div>
      </div>
    </div>
  );
}
