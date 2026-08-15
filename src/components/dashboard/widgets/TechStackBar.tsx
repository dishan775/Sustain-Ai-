import { motion } from 'framer-motion';

const techStack = [
  { name: 'Python', color: '#3776AB' },
  { name: 'PyTorch', color: '#EE4C2C' },
  { name: 'TensorFlow', color: '#FF6F00' },
  { name: 'PyG', color: '#3C2179' },
  { name: 'DGL', color: '#00A0E4' },
  { name: 'SUMO', color: '#66B032' },
  { name: 'pandapower', color: '#2196F3' },
  { name: 'PostGIS', color: '#336791' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Grafana', color: '#F46800' },
  { name: 'Airflow', color: '#017CEE' },
];

export default function TechStackBar() {
  return (
    <motion.div
      className="flex items-center gap-3 overflow-x-auto py-3 px-1 dash-scrollbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <span className="text-[10px] text-dash-textDim uppercase tracking-wider font-semibold whitespace-nowrap flex-shrink-0">
        Powered by
      </span>
      <div className="w-px h-3 bg-black/[0.06] flex-shrink-0" />
      {techStack.map((tech, i) => (
        <motion.div
          key={tech.name}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/[0.02] border border-black/[0.04] hover:border-black/[0.1] transition-all flex-shrink-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 + i * 0.04 }}
          whileHover={{ y: -1 }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tech.color }} />
          <span className="text-[10px] font-medium text-dash-textMuted whitespace-nowrap">{tech.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
