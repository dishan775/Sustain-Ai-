import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Wind Turbine ────────────────────────────────────── */
function WindTurbine({ position }: { position: [number, number, number] }) {
  const bladesRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (bladesRef.current) {
      bladesRef.current.rotation.z += delta * 1.2;
    }
  });

  return (
    <group position={position}>
      {/* Tower */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 1.4, 6]} />
        <meshStandardMaterial color="#94A3B8" />
      </mesh>
      {/* Nacelle */}
      <mesh position={[0, 1.42, 0]}>
        <boxGeometry args={[0.12, 0.08, 0.08]} />
        <meshStandardMaterial color="#CBD5E1" />
      </mesh>
      {/* Blades */}
      <group ref={bladesRef} position={[0, 1.42, 0.06]}>
        {[0, 120, 240].map((deg) => (
          <mesh key={deg} rotation={[0, 0, (deg * Math.PI) / 180]} position={[0, 0.35, 0]}>
            <boxGeometry args={[0.03, 0.7, 0.01]} />
            <meshStandardMaterial color="#E2E8F0" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ── Building ────────────────────────────────────────── */
function Building({
  position,
  size,
  color,
  emissiveIntensity = 0.1,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  emissiveIntensity?: number;
}) {
  return (
    <mesh position={[position[0], position[1] + size[1] / 2, position[2]]}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive="#22C55E"
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
}

/* ── Solar Panel Dot ─────────────────────────────────── */
function SolarDot({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.sin(clock.getElapsedTime() * 2 + offset) * 0.4;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial color="#FBBF24" emissive="#FBBF24" emissiveIntensity={0.5} />
    </mesh>
  );
}

/* ── Road ────────────────────────────────────────────── */
function Road({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const dx = end[0] - start[0];
  const dz = end[2] - start[2];
  const length = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dx, dz);

  return (
    <mesh
      position={[(start[0] + end[0]) / 2, 0.01, (start[2] + end[2]) / 2]}
      rotation={[0, angle, 0]}
    >
      <boxGeometry args={[0.15, 0.01, length]} />
      <meshStandardMaterial color="#CBD5E1" />
    </mesh>
  );
}

/* ── Data Flow Particle ──────────────────────────────── */
function DataFlowParticle({
  startPos,
  endPos,
  speed,
}: {
  startPos: [number, number, number];
  endPos: [number, number, number];
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const offset = useMemo(() => Math.random(), []);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = ((clock.getElapsedTime() * speed * 0.15 + offset) % 1);
      ref.current.position.x = startPos[0] + (endPos[0] - startPos[0]) * t;
      ref.current.position.y = 0.06;
      ref.current.position.z = startPos[2] + (endPos[2] - startPos[2]) * t;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 6, 6]} />
      <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={1} transparent opacity={0.8} />
    </mesh>
  );
}

/* ── City Scene ──────────────────────────────────────── */
function CityScene() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  const buildings: { pos: [number, number, number]; size: [number, number, number]; color: string }[] = [
    { pos: [-1.2, 0, -0.5], size: [0.4, 1.2, 0.4], color: '#E2E8F0' },
    { pos: [-0.6, 0, -0.8], size: [0.35, 0.8, 0.35], color: '#F1F5F9' },
    { pos: [-0.6, 0, 0.2], size: [0.5, 1.5, 0.4], color: '#E2E8F0' },
    { pos: [0, 0, -0.6], size: [0.3, 1.0, 0.3], color: '#F8FAFC' },
    { pos: [0.1, 0, 0.5], size: [0.45, 1.8, 0.45], color: '#E2E8F0' },
    { pos: [0.7, 0, -0.3], size: [0.4, 1.3, 0.35], color: '#F1F5F9' },
    { pos: [0.8, 0, 0.6], size: [0.35, 0.7, 0.35], color: '#E2E8F0' },
    { pos: [1.3, 0, 0.0], size: [0.3, 1.1, 0.4], color: '#F8FAFC' },
    { pos: [-0.2, 0, 0.9], size: [0.3, 0.6, 0.3], color: '#F1F5F9' },
    { pos: [1.0, 0, -0.8], size: [0.25, 0.9, 0.25], color: '#E2E8F0' },
  ];

  const roads: { start: [number, number, number]; end: [number, number, number] }[] = [
    { start: [-1.8, 0, 0], end: [1.8, 0, 0] },
    { start: [0, 0, -1.2], end: [0, 0, 1.2] },
    { start: [-1.8, 0, -0.5], end: [1.8, 0, -0.5] },
    { start: [0.5, 0, -1.2], end: [0.5, 0, 1.2] },
  ];

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="#D1FAE5" transparent opacity={0.5} />
      </mesh>

      {/* Roads */}
      {roads.map((road, i) => (
        <Road key={i} start={road.start} end={road.end} />
      ))}

      {/* Data flow particles on roads */}
      {roads.map((road, i) => (
        <DataFlowParticle key={`flow-${i}`} startPos={road.start} endPos={road.end} speed={1 + i * 0.3} />
      ))}

      {/* Buildings */}
      {buildings.map((b, i) => (
        <Building
          key={i}
          position={b.pos}
          size={b.size}
          color={b.color}
          emissiveIntensity={0.05 + (i % 3) * 0.04}
        />
      ))}

      {/* Solar panel dots on some rooftops */}
      {buildings.slice(0, 5).map((b, i) => (
        <SolarDot key={`solar-${i}`} position={[b.pos[0], b.size[1] + 0.05, b.pos[2]]} />
      ))}

      {/* Wind turbines */}
      <WindTurbine position={[-1.6, 0, 1.0]} />
      <WindTurbine position={[1.5, 0, 0.9]} />
      <WindTurbine position={[0.3, 0, -1.1]} />

      {/* Depth fog plane */}
      <mesh position={[0, 1.5, -2.5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[8, 4]} />
        <meshBasicMaterial color="#D1FAE5" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

/* ── Canvas Wrapper ──────────────────────────────────── */
export default function DigitalTwinScene({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [3, 2.5, 3], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={0.8} color="#FFFFFF" />
        <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#D1FAE5" />
        <CityScene />
      </Canvas>
    </div>
  );
}
