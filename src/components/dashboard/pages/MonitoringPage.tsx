import { motion } from 'framer-motion';
import { Satellite, Camera, Eye, MapPin, CloudRain, Thermometer } from 'lucide-react';
import DashboardGlassCard from '../shared/DashboardGlassCard';
import StatusBadge from '../shared/StatusBadge';

const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const monitoringSources = [
  { icon: Camera, label: 'Traffic Cameras', count: '248 active', status: 'live' as const, color: '#3B82F6' },
  { icon: Satellite, label: 'Satellite Imagery', count: 'Updated 2h ago', status: 'good' as const, color: '#67E8F9' },
  { icon: Eye, label: 'CV Detection', count: '12 streams', status: 'live' as const, color: '#22C55E' },
  { icon: MapPin, label: 'IoT Sensors', count: '1,420 deployed', status: 'live' as const, color: '#FBBF24' },
  { icon: Thermometer, label: 'Weather Stations', count: '18 active', status: 'live' as const, color: '#F97316' },
  { icon: CloudRain, label: 'Air Quality', count: '32 monitors', status: 'live' as const, color: '#67E8F9' },
];

const cameraFeeds = [
  { name: 'Wakad Junction Cam 1', status: 'Active', detections: 'Heavy traffic', vehicles: 342 },
  { name: 'Hinjewadi Entry Gate', status: 'Active', detections: 'Moderate flow', vehicles: 198 },
  { name: 'Nashik Phata Bridge', status: 'Active', detections: 'Construction zone', vehicles: 256 },
  { name: 'Pimpri Station Rd', status: 'Active', detections: 'Normal', vehicles: 124 },
  { name: 'Aundh–Baner Link', status: 'Active', detections: 'Heavy congestion', vehicles: 418 },
  { name: 'Kharadi IT Park', status: 'Active', detections: 'Moderate', vehicles: 287 },
];

const detections = [
  { type: 'Construction Activity', location: 'Wakad Sector 3', confidence: 94, time: '12 min ago' },
  { type: 'Green Cover Change', location: 'Thergaon Hills', confidence: 88, time: '2 hours ago' },
  { type: 'Road Surface Damage', location: 'Akurdi Station Rd', confidence: 91, time: '45 min ago' },
  { type: 'Waste Accumulation', location: 'Ward 7 Market', confidence: 86, time: '1 hour ago' },
  { type: 'Infrastructure Change', location: 'Ravet Flyover', confidence: 92, time: '3 hours ago' },
];

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <motion.div {...stagger(0)}>
        <h1 className="text-2xl font-bold text-dash-text tracking-tight">Monitoring</h1>
        <p className="text-sm text-dash-textMuted mt-1">Environmental and infrastructure monitoring through satellite imagery, computer vision, and IoT sensors.</p>
      </motion.div>

      {/* Sources */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {monitoringSources.map((source, i) => {
          const Icon = source.icon;
          return (
            <motion.div key={source.label} {...stagger(i * 0.05)}>
              <DashboardGlassCard className="p-4" hover>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${source.color}15` }}>
                    <Icon size={16} style={{ color: source.color }} />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-dash-text">{source.label}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[10px] text-dash-textMuted">{source.count}</p>
                      <StatusBadge variant={source.status} label={source.status} />
                    </div>
                  </div>
                </div>
              </DashboardGlassCard>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4">
        {/* Camera Grid */}
        <motion.div {...stagger(0.15)}>
          <DashboardGlassCard className="p-5">
            <h3 className="text-sm font-semibold text-dash-text mb-4">Traffic Camera Feeds</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {cameraFeeds.map((cam, i) => (
                <motion.div
                  key={cam.name}
                  className="aspect-video rounded-xl bg-gradient-to-br from-dash-card to-dash-surface border border-black/[0.04] overflow-hidden relative group"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  {/* Simulated camera feed */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera size={24} className="text-dash-textDim" />
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-2.5">
                    <p className="text-[10px] font-semibold text-white truncate">{cam.name}</p>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[9px] text-black/60">{cam.detections}</span>
                      <span className="text-[9px] text-emerald-400 font-data">{cam.vehicles} vehicles</span>
                    </div>
                  </div>
                  {/* Live dot */}
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 dash-live-dot" />
                    <span className="text-[8px] text-red-400 font-semibold">LIVE</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </DashboardGlassCard>
        </motion.div>

        {/* AI Detections */}
        <motion.div {...stagger(0.2)}>
          <DashboardGlassCard className="p-5 h-full">
            <h3 className="text-sm font-semibold text-dash-text mb-4">AI Detections</h3>
            <div className="space-y-2.5">
              {detections.map((d, i) => (
                <motion.div
                  key={d.type}
                  className="p-3 rounded-xl bg-black/[0.02] border border-black/[0.04]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.08 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[12px] font-semibold text-dash-text">{d.type}</p>
                      <p className="text-[10px] text-dash-textMuted mt-0.5">{d.location}</p>
                    </div>
                    <StatusBadge variant="info" label={`${d.confidence}%`} />
                  </div>
                  <p className="text-[9px] text-dash-textDim mt-1.5">{d.time}</p>
                </motion.div>
              ))}
            </div>
          </DashboardGlassCard>
        </motion.div>
      </div>
    </div>
  );
}
