import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Maximize2, Layers, Box, Map as MapIcon } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';
import 'leaflet/dist/leaflet.css';

/* ── Map Data ─────────────────────────────────────────── */
const PUNE_CENTER: [number, number] = [18.5204, 73.8567];

const evStations = [
  { pos: [18.5308, 73.8474] as [number, number], name: 'Shivajinagar EV Hub', sessions: 24, available: 8 },
  { pos: [18.5590, 73.7868] as [number, number], name: 'Hinjewadi Tech Park', sessions: 42, available: 3 },
  { pos: [18.6298, 73.7997] as [number, number], name: 'Pimpri Station', sessions: 18, available: 12 },
  { pos: [18.5913, 73.7389] as [number, number], name: 'Wakad Junction', sessions: 31, available: 5 },
  { pos: [18.5518, 73.9060] as [number, number], name: 'Kharadi IT Park', sessions: 27, available: 9 },
  { pos: [18.5074, 73.9066] as [number, number], name: 'Magarpatta City', sessions: 35, available: 4 },
];

const trafficHotspots = [
  { pos: [18.5308, 73.8474] as [number, number], level: 'heavy', name: 'Shivajinagar' },
  { pos: [18.5590, 73.7868] as [number, number], level: 'moderate', name: 'Hinjewadi' },
  { pos: [18.5913, 73.7389] as [number, number], level: 'severe', name: 'Wakad' },
  { pos: [18.5074, 73.9066] as [number, number], level: 'low', name: 'Magarpatta' },
  { pos: [18.6155, 73.7283] as [number, number], level: 'moderate', name: 'Akurdi' },
  { pos: [18.6020, 73.7638] as [number, number], level: 'heavy', name: 'Thergaon' },
];

const solarPlants = [
  { pos: [18.5800, 73.8200] as [number, number], name: 'Aundh Solar Farm', capacity: '12 MW' },
  { pos: [18.5400, 73.9200] as [number, number], name: 'Viman Nagar Solar', capacity: '8 MW' },
  { pos: [18.6400, 73.7600] as [number, number], name: 'PCMC Rooftop Grid', capacity: '22 MW' },
];

const emissionZones = [
  { pos: [18.5204, 73.8567] as [number, number], intensity: 0.8, radius: 1200 },
  { pos: [18.5590, 73.7868] as [number, number], intensity: 0.5, radius: 900 },
  { pos: [18.6298, 73.7997] as [number, number], intensity: 0.6, radius: 1000 },
  { pos: [18.5074, 73.9066] as [number, number], intensity: 0.3, radius: 800 },
];

const trafficColors: Record<string, string> = {
  low: '#22C55E',
  moderate: '#FBBF24',
  heavy: '#F97316',
  severe: '#EF4444',
};

/* ── Layer Toggle ─────────────────────────────────────── */
type LayerName = 'traffic' | 'ev' | 'solar' | 'carbon';

/* ── Animated Map Elements ────────────────────────────── */
function PulsingMarker({ center, color, radius, children }: {
  center: [number, number]; color: string; radius: number; children?: React.ReactNode;
}) {
  return (
    <>
      <CircleMarker
        center={center}
        radius={radius + 4}
        pathOptions={{ color, fillColor: color, fillOpacity: 0.1, weight: 0, opacity: 0.3 }}
      />
      <CircleMarker
        center={center}
        radius={radius}
        pathOptions={{ color, fillColor: color, fillOpacity: 0.6, weight: 2, opacity: 0.8 }}
      >
        {children}
      </CircleMarker>
    </>
  );
}

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
}

export default function DigitalTwinMap() {
  const [is3D, setIs3D] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [layers, setLayers] = useState<Record<LayerName, boolean>>({
    traffic: true,
    ev: true,
    solar: true,
    carbon: false,
  });
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleLayer = (layer: LayerName) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };



  return (
    <motion.div
      ref={containerRef}
      className="relative rounded-dashboard-lg overflow-hidden border border-black/[0.06] bg-dash-card"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: isFullscreen ? '100vh' : '100%' }}
    >
      {/* Title Overlay */}
      <div className="absolute top-4 left-4 z-[1000] flex items-center gap-3">
        <div className="bg-dash-card/90 backdrop-blur-[16px] border border-black/[0.08] rounded-xl px-4 py-2 flex items-center gap-2.5 shadow-sm">
          <span className="text-[14px] font-semibold text-dash-text">Digital Twin of Pune</span>
          <StatusBadge variant="live" label="Live" />
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <button
          onClick={() => setIs3D(!is3D)}
          className="w-9 h-9 bg-dash-card/90 backdrop-blur-[16px] border border-black/[0.08] shadow-sm rounded-xl flex items-center justify-center text-dash-textMuted hover:text-dash-text hover:border-black/[0.15] transition-all"
          title={is3D ? 'Switch to 2D' : 'Switch to 3D'}
        >
          {is3D ? <MapIcon size={14} /> : <Box size={14} />}
        </button>
        <button
          onClick={toggleFullscreen}
          className="w-9 h-9 bg-dash-card/90 backdrop-blur-[16px] border border-black/[0.08] shadow-sm rounded-xl flex items-center justify-center text-dash-textMuted hover:text-dash-text hover:border-black/[0.15] transition-all"
          title="Fullscreen"
        >
          <Maximize2 size={14} />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowLayerPanel(!showLayerPanel)}
            className="w-9 h-9 bg-dash-card/90 backdrop-blur-[16px] border border-black/[0.08] shadow-sm rounded-xl flex items-center justify-center text-dash-textMuted hover:text-dash-text hover:border-black/[0.15] transition-all"
            title="Layers"
          >
            <Layers size={14} />
          </button>
          {showLayerPanel && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-11 top-0 bg-dash-card/95 backdrop-blur-[20px] border border-black/[0.08] rounded-xl p-3 shadow-xl min-w-[160px]"
            >
              <p className="text-[10px] text-dash-textMuted uppercase tracking-wider mb-2 font-semibold">Map Layers</p>
              {([
                { key: 'traffic' as LayerName, label: 'Traffic', color: '#F97316' },
                { key: 'ev' as LayerName, label: 'EV Charging', color: '#22C55E' },
                { key: 'solar' as LayerName, label: 'Solar Plants', color: '#FBBF24' },
                { key: 'carbon' as LayerName, label: 'Carbon Zones', color: '#EF4444' },
              ]).map(l => (
                <button
                  key={l.key}
                  onClick={() => toggleLayer(l.key)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[12px] font-medium transition-colors mb-0.5 ${
                    layers[l.key] ? 'text-dash-text bg-black/[0.04]' : 'text-dash-textDim'
                  }`}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: layers[l.key] ? l.color : 'rgba(0,0,0,0.1)' }}
                  />
                  {l.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={PUNE_CENTER}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        attributionControl={true}
      >
        <MapUpdater center={PUNE_CENTER} zoom={12} />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Carbon Emission Zones */}
        {layers.carbon && emissionZones.map((zone, i) => (
          <CircleMarker
            key={`carbon-${i}`}
            center={zone.pos}
            radius={zone.radius / 40}
            pathOptions={{
              color: `rgba(239,68,68,${zone.intensity * 0.5})`,
              fillColor: `rgba(239,68,68,${zone.intensity * 0.3})`,
              fillOpacity: zone.intensity * 0.4,
              weight: 1,
            }}
          >
            <Popup>
              <div className="text-xs font-medium">
                <span className="text-red-500">Carbon Zone</span>
                <br />Intensity: {Math.round(zone.intensity * 100)}%
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* Traffic Hotspots */}
        {layers.traffic && trafficHotspots.map((spot, i) => (
          <PulsingMarker
            key={`traffic-${i}`}
            center={spot.pos}
            color={trafficColors[spot.level]}
            radius={7}
          >
            <Popup>
              <div className="text-xs font-medium">
                <span className="font-bold">{spot.name}</span>
                <br />Traffic: <span style={{ color: trafficColors[spot.level] }}>{spot.level}</span>
              </div>
            </Popup>
          </PulsingMarker>
        ))}

        {/* EV Stations */}
        {layers.ev && evStations.map((station, i) => (
          <PulsingMarker
            key={`ev-${i}`}
            center={station.pos}
            color="#22C55E"
            radius={5}
          >
            <Popup>
              <div className="text-xs font-medium">
                <span className="font-bold text-emerald-600">{station.name}</span>
                <br />{station.sessions} active · {station.available} available
              </div>
            </Popup>
          </PulsingMarker>
        ))}

        {/* Solar Plants */}
        {layers.solar && solarPlants.map((plant, i) => (
          <PulsingMarker
            key={`solar-${i}`}
            center={plant.pos}
            color="#FBBF24"
            radius={6}
          >
            <Popup>
              <div className="text-xs font-medium">
                <span className="font-bold text-amber-600">{plant.name}</span>
                <br />Capacity: {plant.capacity}
              </div>
            </Popup>
          </PulsingMarker>
        ))}
      </MapContainer>
    </motion.div>
  );
}
