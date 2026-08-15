import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import DashboardGlassCard from '../shared/DashboardGlassCard';
import StatusBadge from '../shared/StatusBadge';

const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const nodeTypes = [
  { type: 'Road', count: 842, color: '#64748B' },
  { type: 'Junction', count: 156, color: '#F97316' },
  { type: 'Building', count: 2340, color: '#3B82F6' },
  { type: 'EV Charger', count: 48, color: '#22C55E' },
  { type: 'Substation', count: 24, color: '#FBBF24' },
  { type: 'Solar Plant', count: 12, color: '#FBBF24' },
  { type: 'Battery', count: 8, color: '#22C55E' },
];

/* Simple force-directed graph visualization */
function GraphVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;

    // Generate nodes
    const nodes = Array.from({ length: 60 }, (_, i) => ({
      x: Math.random() * W * 0.8 + W * 0.1,
      y: Math.random() * H * 0.8 + H * 0.1,
      vx: 0, vy: 0,
      r: 3 + Math.random() * 4,
      color: ['#22C55E', '#3B82F6', '#FBBF24', '#F97316', '#67E8F9', '#64748B'][i % 6],
      type: i % 6,
    }));

    // Generate edges
    const edges: [number, number][] = [];
    nodes.forEach((_, i) => {
      const connections = 1 + Math.floor(Math.random() * 3);
      for (let c = 0; c < connections; c++) {
        const j = Math.floor(Math.random() * nodes.length);
        if (j !== i) edges.push([i, j]);
      }
    });

    let frame: number;
    let time = 0;

    function animate() {
      if (!ctx) return;
      time += 0.002;
      ctx.clearRect(0, 0, W, H);

      // Draw edges
      edges.forEach(([a, b]) => {
        const na = nodes[a], nb = nodes[b];
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw + animate nodes
      nodes.forEach((node, i) => {
        node.x += Math.sin(time * 2 + i * 0.5) * 0.15;
        node.y += Math.cos(time * 1.5 + i * 0.3) * 0.15;

        // Glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 3);
        gradient.addColorStop(0, node.color + '30');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 3, 0, Math.PI * 2);
        ctx.fill();

        // Node
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      });

      frame = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full rounded-dashboard" style={{ minHeight: 400 }} />;
}

export default function GraphNetworkPage() {
  return (
    <div className="space-y-6">
      <motion.div {...stagger(0)}>
        <h1 className="text-2xl font-bold text-dash-text tracking-tight">Graph Network</h1>
        <p className="text-sm text-dash-textMuted mt-1">Interactive infrastructure graph — nodes represent urban entities, edges represent connections and dependencies.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
        {nodeTypes.map((nt, i) => (
          <motion.div key={nt.type} {...stagger(i * 0.04)}>
            <DashboardGlassCard className="p-3 text-center" hover>
              <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: nt.color }} />
              <p className="text-lg font-bold text-dash-text font-data">{nt.count.toLocaleString()}</p>
              <p className="text-[10px] text-dash-textMuted">{nt.type}s</p>
            </DashboardGlassCard>
          </motion.div>
        ))}
      </div>

      <motion.div {...stagger(0.15)}>
        <DashboardGlassCard className="p-1 overflow-hidden">
          <div className="relative">
            <GraphVisualization />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <StatusBadge variant="live" label="Real-time graph" />
              <span className="text-[10px] text-dash-textMuted">12,480 nodes · 28,340 edges</span>
            </div>
          </div>
        </DashboardGlassCard>
      </motion.div>
    </div>
  );
}
