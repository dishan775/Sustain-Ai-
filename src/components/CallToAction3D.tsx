import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motionVariants';
import { ArrowRight } from 'lucide-react';

function WireframeStructure() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 0.2;
    }
  });

  const lineColor = "#1A1A1A"; // Near black

  return (
    <group ref={groupRef} dispose={null} scale={[0.9, 0.9, 0.9]}>
      {/* Central Base Structure */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[2.2, 1.5, 2.2]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges scale={1} threshold={15} color={lineColor} />
      </mesh>

      {/* Intricate Inner Core */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 3, 1.2]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges scale={1} threshold={15} color={lineColor} />
      </mesh>

      {/* Floating Top Layers */}
      {[...Array(6)].map((_, i) => (
        <mesh key={`layer-${i}`} position={[0, 1.8 + i * 0.45, 0]}>
          <boxGeometry args={[2.8 - i * 0.15, 0.1, 2.8 - i * 0.15]} />
          <meshBasicMaterial transparent opacity={0} />
          <Edges scale={1} threshold={15} color={lineColor} />
        </mesh>
      ))}

      {/* Side Modules */}
      <mesh position={[1.8, -0.5, 1.2]}>
        <boxGeometry args={[1, 1.2, 1]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges scale={1} threshold={15} color={lineColor} />
      </mesh>
      
      <mesh position={[-1.8, -0.5, -1.2]}>
        <boxGeometry args={[1, 1.2, 1]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges scale={1} threshold={15} color={lineColor} />
      </mesh>

      <mesh position={[0, -0.5, -2]}>
        <boxGeometry args={[1.5, 1, 0.8]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges scale={1} threshold={15} color={lineColor} />
      </mesh>

      {/* Suspended Small Nodes */}
      {[...Array(4)].map((_, i) => {
        const x = Math.cos(i * Math.PI / 2) * 2;
        const z = Math.sin(i * Math.PI / 2) * 2;
        return (
          <mesh key={`node-${i}`} position={[x, 0.5, z]}>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshBasicMaterial transparent opacity={0} />
            <Edges scale={1} threshold={15} color={lineColor} />
          </mesh>
        )
      })}

      {/* Directional Data Arrows (Triangles) */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3 + Math.sin(i * 42) * 0.5;
        const y = Math.sin(i * 15) * 2;
        return (
          <mesh 
            key={`arrow-${i}`} 
            position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]} 
            rotation={[Math.PI/2, Math.PI, -angle - Math.PI/2]}
          >
            {/* Using a flat triangle (circle with 3 segments) */}
            <circleGeometry args={[0.15, 3]} />
            <meshBasicMaterial color={lineColor} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
}

interface CallToAction3DProps {
  onSignIn?: () => void;
}

export default function CallToAction3D({ onSignIn }: CallToAction3DProps) {
  return (
    <section className="relative w-full bg-[#B2A594] overflow-hidden py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="z-10"
          >
            <h2 className="font-sans text-[3rem] md:text-[4rem] lg:text-[4.5rem] font-medium tracking-tight text-sustain-ink leading-[1.05] mb-8">
              Our intelligence,<br />
              <span className="text-sustain-ink/80">your sustainable city.</span>
            </h2>
            <p className="text-lg md:text-xl text-sustain-ink/70 mb-10 max-w-md font-data font-medium leading-relaxed">
              Book a demo today and see how SustainAI can build reliable digital twins for your municipality.
            </p>
            <button 
              onClick={onSignIn}
              className="bg-sustain-ink text-white px-7 py-4 rounded-full font-medium text-sm md:text-base hover:bg-black transition-colors flex items-center gap-3 group"
            >
              Get Started
              <span className="bg-white text-sustain-ink p-1 rounded-full group-hover:scale-110 transition-transform flex items-center justify-center h-7 w-7">
                <ArrowRight size={16} strokeWidth={2.5} />
              </span>
            </button>
          </motion.div>

          <div className="relative h-[500px] md:h-[700px] w-full cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [6, 4, 6], fov: 40 }}>
              <ambientLight intensity={1} />
              <WireframeStructure />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
            </Canvas>
          </div>
          
        </div>
      </div>
    </section>
  );
}
