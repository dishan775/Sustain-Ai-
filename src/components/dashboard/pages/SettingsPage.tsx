import { motion } from 'framer-motion';
import { Cog, Database, Bell, Shield, MapPin, Code, User, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardGlassCard from '../shared/DashboardGlassCard';
import StatusBadge from '../shared/StatusBadge';

const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const settingsSections = [
  {
    icon: Database, title: 'Data Sources', description: 'Configure data ingestion pipelines',
    settings: [
      { label: 'PCMC Traffic API', status: 'Connected', value: 'v2.1' },
      { label: 'MSEDCL Energy Feed', status: 'Connected', value: 'Real-time' },
      { label: 'Weather Station API', status: 'Connected', value: '18 stations' },
      { label: 'Satellite Imagery', status: 'Connected', value: 'Sentinel-2' },
    ],
  },
  {
    icon: Cog, title: 'Model Settings', description: 'AI model configuration and parameters',
    settings: [
      { label: 'Forecasting Model', status: 'Active', value: 'TFT v3.2' },
      { label: 'Graph Neural Network', status: 'Active', value: 'GAT v2.1' },
      { label: 'RL Policy', status: 'Active', value: 'PPO Multi-Agent' },
      { label: 'Computer Vision', status: 'Active', value: 'YOLOv8 Custom' },
    ],
  },
  {
    icon: Bell, title: 'Alert Thresholds', description: 'Configure notification triggers',
    settings: [
      { label: 'AQI Warning', status: 'Enabled', value: '> 150' },
      { label: 'Grid Load Critical', status: 'Enabled', value: '> 85%' },
      { label: 'Congestion Alert', status: 'Enabled', value: '> 75% density' },
      { label: 'Carbon Spike', status: 'Enabled', value: '> 15% increase' },
    ],
  },
  {
    icon: Shield, title: 'User & Permissions', description: 'Access control and role management',
    settings: [
      { label: 'City Administrators', status: 'Active', value: '4 users' },
      { label: 'Energy Managers', status: 'Active', value: '6 users' },
      { label: 'Traffic Managers', status: 'Active', value: '8 users' },
      { label: 'Researchers', status: 'Active', value: '12 users' },
    ],
  },
];

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <motion.div {...stagger(0)}>
        <h1 className="text-2xl font-bold text-dash-text tracking-tight">Settings</h1>
        <p className="text-sm text-dash-textMuted mt-1">System configuration, data sources, model settings, and user management.</p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: MapPin, label: 'City Config', color: '#22C55E' },
          { icon: Code, label: 'API Keys', color: '#3B82F6' },
          { icon: User, label: 'My Profile', color: '#FBBF24', to: '/dashboard/profile' },
          { icon: Palette, label: 'Appearance', color: '#F97316' },
        ].map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.div key={action.label} {...stagger(i * 0.05)}>
              <div onClick={() => action.to && navigate(action.to)}>
                <DashboardGlassCard className="p-4 cursor-pointer" hover glow="green">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${action.color}15` }}>
                      <Icon size={18} style={{ color: action.color }} />
                    </div>
                    <span className="text-[13px] font-semibold text-dash-text">{action.label}</span>
                  </div>
                </DashboardGlassCard>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {settingsSections.map((section, si) => {
          const Icon = section.icon;
          return (
            <motion.div key={section.title} {...stagger(0.1 + si * 0.08)}>
              <DashboardGlassCard className="p-5 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-black/[0.04] flex items-center justify-center">
                    <Icon size={16} className="text-dash-text" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-dash-text">{section.title}</h3>
                    <p className="text-[10px] text-dash-textMuted">{section.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {section.settings.map((s, i) => (
                    <motion.div
                      key={s.label}
                      className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] border border-black/[0.04]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + si * 0.1 + i * 0.05 }}
                    >
                      <span className="text-[12px] text-dash-text">{s.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-dash-textMuted font-data">{s.value}</span>
                        <StatusBadge variant="good" label={s.status} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </DashboardGlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
