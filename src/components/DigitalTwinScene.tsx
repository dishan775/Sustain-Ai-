import { useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Types ──────────────────────────────────────────── */
export interface CitySceneHandle {
  setScrollProgress: (p: number) => void;
  setFeatureIndex: (idx: number) => void;
}

/* ── Constants ──────────────────────────────────────── */
const BONE_WHITE = '#F7F6F2';
const SHADOW_COLOR = '#0D0D0D';
const EMERALD = '#0F9D6B';
const SKY_BLUE = '#5BACF5';
const CORAL = '#FF6B6B';
const WARM_YELLOW = '#FBBF24';
const BUILDING_BASE = '#E8E6E0';
const BUILDING_LIGHT = '#F0EEEA';
const BUILDING_MID = '#DDD9D2';
const ROAD_COLOR = '#D5D0C8';

/* ── Flat shadow mesh under an object ─────────────── */
function FauxShadow({
  width,
  depth,
  position,
  offsetX = 0.25,
  offsetZ = 0.25,
  opacity = 0.85,
}: {
  width: number;
  depth: number;
  position: [number, number, number];
  offsetX?: number;
  offsetZ?: number;
  opacity?: number;
}) {
  return (
    <mesh
      position={[position[0] + offsetX, 0.005, position[2] + offsetZ]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[width * 1.05, depth * 1.05]} />
      <meshBasicMaterial color={SHADOW_COLOR} transparent opacity={opacity} />
    </mesh>
  );
}

/* ── Edge outline mesh (inverted hull) ───────────── */
function EdgeOutline({
  geometry,
  position,
  scale = [1.03, 1.03, 1.03],
  rotation = [0, 0, 0],
}: {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} scale={scale} rotation={rotation}>
      <primitive object={geometry} attach="geometry" />
      <meshBasicMaterial color="#1A1A1A" side={THREE.BackSide} />
    </mesh>
  );
}

/* ── Roof Details (HVAC / Antennas) ──────────────────── */
function RoofDetails({ position, width, depth }: { position: [number, number, number]; width: number; depth: number }) {
  const hvacGeo = useMemo(() => new THREE.BoxGeometry(0.08, 0.06, 0.08), []);
  const antennaGeo = useMemo(() => new THREE.CylinderGeometry(0.005, 0.005, 0.2, 4), []);
  
  return (
    <group position={position}>
      {/* HVAC 1 */}
      <mesh position={[-width * 0.2, 0.03, depth * 0.2]}>
        <primitive object={hvacGeo} attach="geometry" />
        <meshStandardMaterial color="#B0B6BA" flatShading roughness={0.9} />
      </mesh>
      <EdgeOutline geometry={hvacGeo} position={[-width * 0.2, 0.03, depth * 0.2]} scale={[1.1, 1.1, 1.1]} />
      
      {/* Antenna */}
      <mesh position={[width * 0.3, 0.1, -depth * 0.3]}>
        <primitive object={antennaGeo} attach="geometry" />
        <meshStandardMaterial color="#8B9A7E" flatShading />
      </mesh>
    </group>
  );
}

/* ── Building ────────────────────────────────────────── */
function Building({
  position,
  size,
  color,
  accentColor,
  accentHeight = 0.15,
  accentY,
  hasRoofDetails = true,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  accentColor: string;
  accentHeight?: number;
  accentY?: number;
  hasRoofDetails?: boolean;
}) {
  const [w, h, d] = size;
  const geo = useMemo(() => new THREE.BoxGeometry(w, h, d), [w, h, d]);
  const ay = accentY ?? h * 0.6;

  return (
    <group position={[position[0], 0, position[2]]}>
      {/* Main body */}
      <mesh position={[0, h / 2, 0]}>
        <primitive object={geo} attach="geometry" />
        <meshStandardMaterial color={color} flatShading roughness={0.95} metalness={0} />
      </mesh>
      <EdgeOutline geometry={geo} position={[0, h / 2, 0]} />
      
      {/* Accent strip */}
      <mesh position={[0, ay, d / 2 + 0.005]}>
        <planeGeometry args={[w * 0.85, accentHeight]} />
        <meshStandardMaterial color={accentColor} flatShading roughness={0.8} />
      </mesh>
      
      {/* Flat rooftop */}
      <mesh position={[0, h + 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color={BONE_WHITE} flatShading roughness={1} />
      </mesh>

      {/* Roof Props */}
      {hasRoofDetails && <RoofDetails position={[0, h, 0]} width={w} depth={d} />}

      {/* Hard shadow */}
      <FauxShadow width={w} depth={d} position={[0, 0, 0]} />
    </group>
  );
}

/* ── Wind Turbine ────────────────────────────────────── */
function WindTurbine({ position }: { position: [number, number, number] }) {
  const bladesRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (bladesRef.current) {
      // Smooth continuous rotation
      bladesRef.current.rotation.z += delta * 1.5;
    }
  });

  return (
    <group position={position}>
      {/* Tower */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.015, 0.03, 1.2, 6]} />
        <meshStandardMaterial color="#8B9A7E" flatShading roughness={0.9} />
      </mesh>
      {/* Nacelle */}
      <mesh position={[0, 1.22, 0]}>
        <boxGeometry args={[0.07, 0.05, 0.05]} />
        <meshStandardMaterial color="#A0AE94" flatShading roughness={0.9} />
      </mesh>
      {/* Blades */}
      <group ref={bladesRef} position={[0, 1.22, 0.04]}>
        {[0, 120, 240].map((deg) => (
          <mesh key={deg} rotation={[0, 0, (deg * Math.PI) / 180]} position={[0, 0.35, 0]}>
            <boxGeometry args={[0.02, 0.7, 0.005]} />
            <meshStandardMaterial color="#C8D4BE" flatShading roughness={0.9} />
          </mesh>
        ))}
      </group>
      <FauxShadow width={0.08} depth={0.08} position={[0, 0, 0]} offsetX={0.15} offsetZ={0.15} />
    </group>
  );
}

/* ── Solar Panel Array ───────────────────────────────── */
function SolarPanels({ position, count = 2 }: { position: [number, number, number]; count?: number }) {
  const gleamRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame(({ clock }) => {
    if (gleamRef.current) {
      const cycle = (clock.getElapsedTime() % 4) / 4;
      const gleam = cycle > 0.8 && cycle < 0.9 ? Math.sin((cycle - 0.8) * 10 * Math.PI) : 0;
      gleamRef.current.emissiveIntensity = gleam * 0.8;
    }
  });

  return (
    <group position={position}>
      {Array.from({ length: count }).map((_, row) =>
        [0, 1, 2].map((col) => (
          <mesh
            key={`${row}-${col}`}
            position={[(col - 1) * 0.12, 0.01, (row - 0.5) * 0.1]}
            rotation={[-Math.PI / 6, 0, 0]}
          >
            <planeGeometry args={[0.1, 0.08]} />
            <meshStandardMaterial
              ref={row === 0 && col === 1 ? gleamRef : undefined}
              color="#2D4A6F"
              emissive={WARM_YELLOW}
              emissiveIntensity={0}
              flatShading
              roughness={0.7}
            />
          </mesh>
        ))
      )}
    </group>
  );
}

/* ── Trees and Parks ─────────────────────────────────── */
function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Very smooth, organic swaying
      const t = clock.getElapsedTime() * 0.5 + offset;
      groupRef.current.rotation.z = Math.sin(t) * 0.015;
      groupRef.current.rotation.x = Math.cos(t * 0.8) * 0.015;
    }
  });

  const trunkGeo = useMemo(() => new THREE.CylinderGeometry(0.012, 0.02, 0.16, 5), []);
  const canopyGeo = useMemo(() => new THREE.IcosahedronGeometry(0.09, 1), []);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 0.08, 0]}>
        <primitive object={trunkGeo} attach="geometry" />
        <meshStandardMaterial color="#7A634B" flatShading roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <primitive object={canopyGeo} attach="geometry" />
        <meshStandardMaterial color={EMERALD} flatShading roughness={0.9} />
      </mesh>
      <EdgeOutline geometry={canopyGeo} position={[0, 0.22, 0]} scale={[1.05, 1.05, 1.05]} />
      <FauxShadow width={0.14} depth={0.14} position={[0, 0, 0]} offsetX={0.08} offsetZ={0.08} opacity={0.6} />
    </group>
  );
}

/* ── Urban Props (Streetlights) ──────────────────────── */
function Streetlight({ position, rotation = [0,0,0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.005, 0.008, 0.3, 4]} />
        <meshStandardMaterial color="#94A3B8" flatShading />
      </mesh>
      <mesh position={[0.03, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.004, 0.004, 0.06, 4]} />
        <meshStandardMaterial color="#94A3B8" flatShading />
      </mesh>
      <mesh position={[0.06, 0.295, 0]}>
        <boxGeometry args={[0.02, 0.01, 0.015]} />
        <meshStandardMaterial color="#FBBF24" emissive="#FBBF24" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

/* ── Vehicle (Car / Bus) ─────────────────────────────── */
function Vehicle({
  pathStart,
  pathEnd,
  speed,
  isEV = false,
  isBus = false,
}: {
  pathStart: [number, number, number];
  pathEnd: [number, number, number];
  speed: number;
  isEV?: boolean;
  isBus?: boolean;
}) {
  const ref = useRef<THREE.Group>(null!);
  const offset = useMemo(() => Math.random(), []);
  
  const w = isBus ? 0.07 : 0.05;
  const h = isBus ? 0.06 : 0.035;
  const d = isBus ? 0.18 : 0.09;

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = ((clock.getElapsedTime() * speed * 0.05 + offset) % 1);
      
      // Smooth easing for a more natural drive
      const easedT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; 
      // Actually linear is better for continuous traffic loops
      
      ref.current.position.x = pathStart[0] + (pathEnd[0] - pathStart[0]) * t;
      ref.current.position.z = pathStart[2] + (pathEnd[2] - pathStart[2]) * t;
      
      const angle = Math.atan2(pathEnd[0] - pathStart[0], pathEnd[2] - pathStart[2]);
      ref.current.rotation.y = angle;
    }
  });

  const geo = useMemo(() => new THREE.BoxGeometry(w, h, d), [w, h, d]);

  return (
    <group ref={ref} position={[pathStart[0], 0.04, pathStart[2]]}>
      <mesh position={[0, h/2, 0]}>
        <primitive object={geo} attach="geometry" />
        <meshStandardMaterial color={isBus ? SKY_BLUE : (isEV ? '#E8E6E0' : '#D5D0C8')} flatShading roughness={0.9} />
      </mesh>
      <EdgeOutline geometry={geo} position={[0, h/2, 0]} scale={[1.05, 1.05, 1.05]} />
      
      {/* EV indicator pulse */}
      {isEV && !isBus && (
        <mesh position={[0, h + 0.01, 0]}>
          <sphereGeometry args={[0.015, 6, 6]} />
          <meshStandardMaterial color={EMERALD} emissive={EMERALD} emissiveIntensity={0.8} transparent opacity={0.7} />
        </mesh>
      )}
      <FauxShadow width={w} depth={d} position={[0, 0, 0]} offsetX={0.03} offsetZ={0.03} opacity={0.4} />
    </group>
  );
}

/* ── Data Streams (Floating Particles) ───────────────── */
function DataStream({ curve, speed = 1, color = SKY_BLUE }: { curve: THREE.CatmullRomCurve3, speed?: number, color?: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  const offset = useMemo(() => Math.random(), []);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = ((clock.getElapsedTime() * speed * 0.1 + offset) % 1);
      const point = curve.getPoint(t);
      ref.current.position.copy(point);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.9} />
    </mesh>
  );
}

/* ── Sensor Dot (IoT) ────────────────────────────────── */
function SensorDot({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() + delay;
      // Very smooth breathing
      const pulse = 0.7 + Math.sin(t * 2) * 0.3;
      ref.current.scale.setScalar(pulse);
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshStandardMaterial color={WARM_YELLOW} emissive={WARM_YELLOW} emissiveIntensity={0.5} transparent opacity={0.9} />
    </mesh>
  );
}

/* ── Infrastructure (Roads, Greenway) ────────────────── */
function RoadNetwork() {
  return (
    <group>
      {/* Main horizontal roads */}
      <mesh position={[0, 0.008, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.18, 0.003, 5]} />
        <meshStandardMaterial color={ROAD_COLOR} flatShading roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.008, -1.2]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.16, 0.003, 5]} />
        <meshStandardMaterial color={ROAD_COLOR} flatShading roughness={0.95} />
      </mesh>
      {/* Vertical cross streets */}
      <mesh position={[-1.2, 0.008, -0.6]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.14, 0.003, 2.5]} />
        <meshStandardMaterial color={ROAD_COLOR} flatShading roughness={0.95} />
      </mesh>
      <mesh position={[1.2, 0.008, -0.6]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.14, 0.003, 2.5]} />
        <meshStandardMaterial color={ROAD_COLOR} flatShading roughness={0.95} />
      </mesh>
    </group>
  );
}

function GreenCorridor() {
  const points = useMemo(() => [
    new THREE.Vector3(-2.5, 0.02, 0.6),
    new THREE.Vector3(-1.5, 0.02, 0.4),
    new THREE.Vector3(-0.5, 0.02, 0.7),
    new THREE.Vector3(0.5, 0.02, 0.45),
    new THREE.Vector3(1.5, 0.02, 0.65),
    new THREE.Vector3(2.5, 0.02, 0.4),
  ].map(p => p), []);
  
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.045, 8, false), [curve]);

  return (
    <group>
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial color={EMERALD} flatShading roughness={0.85} />
      </mesh>
      {/* Data streams travelling along the greenway */}
      <DataStream curve={curve} speed={0.8} color={EMERALD} />
      <DataStream curve={curve} speed={0.6} color={SKY_BLUE} />
      
      <mesh position={[0, 0.003, 0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 0.15]} />
        <meshBasicMaterial color={SHADOW_COLOR} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

/* ── Full City Scene ─────────────────────────────────── */
function CityScene() {
  const groupRef = useRef<THREE.Group>(null!);

  // Gentle ambient floating and slow continuous rotation
  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y = -0.3 + Math.sin(clock.getElapsedTime() * 0.5) * 0.015;
      groupRef.current.rotation.y -= delta * 0.08; // Continuous slow rotation like previous version
    }
  });

  const buildings = useMemo(() => [
    // Core high-rises
    { pos: [-0.6, 0, -0.6], size: [0.5, 1.8, 0.45], color: BUILDING_MID, accent: EMERALD },
    { pos: [0.6, 0, -0.4], size: [0.4, 1.5, 0.4], color: BUILDING_BASE, accent: CORAL },
    { pos: [0, 0, -1.8], size: [0.6, 2.2, 0.5], color: BUILDING_LIGHT, accent: SKY_BLUE },
    
    // Mid-rises
    { pos: [-1.6, 0, -0.4], size: [0.45, 1.1, 0.4], color: BUILDING_BASE, accent: EMERALD },
    { pos: [1.6, 0, -0.7], size: [0.35, 1.2, 0.35], color: BUILDING_MID, accent: SKY_BLUE },
    { pos: [-0.4, 0, 0.4], size: [0.38, 0.8, 0.35], color: BUILDING_LIGHT, accent: SKY_BLUE },
    { pos: [0.5, 0, 0.3], size: [0.4, 0.7, 0.4], color: BUILDING_BASE, accent: WARM_YELLOW },
    
    // Smaller commercial / contextual blocks
    { pos: [-1.2, 0, -1.6], size: [0.4, 0.5, 0.4], color: BUILDING_LIGHT, accent: CORAL },
    { pos: [1.1, 0, -1.5], size: [0.5, 0.6, 0.3], color: BUILDING_BASE, accent: EMERALD },
    { pos: [-2.2, 0, 0.2], size: [0.3, 0.4, 0.3], color: BUILDING_MID, accent: SKY_BLUE },
    { pos: [2.1, 0, 0.1], size: [0.3, 0.5, 0.3], color: BUILDING_LIGHT, accent: CORAL },
  ] as const, []);

  // Elevated data link curve
  const dataCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.6, 1.6, -0.6),
    new THREE.Vector3(0, 2.0, -1.8),
    new THREE.Vector3(0.6, 1.3, -0.4),
  ]), []);

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={BONE_WHITE} flatShading roughness={1} />
      </mesh>

      {/* Large aesthetic ground shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0.15]} position={[0.6, 0.002, 0.4]}>
        <planeGeometry args={[4.5, 3.5]} />
        <meshBasicMaterial color={SHADOW_COLOR} transparent opacity={0.12} />
      </mesh>

      <RoadNetwork />
      <GreenCorridor />

      {/* Buildings */}
      {buildings.map((b, i) => (
        <Building key={i} position={b.pos as any} size={b.size as any} color={b.color} accentColor={b.accent} />
      ))}

      {/* Airborne data streams between tall buildings */}
      <DataStream curve={dataCurve} speed={1.2} color={WARM_YELLOW} />
      <DataStream curve={dataCurve} speed={0.9} color={EMERALD} />

      {/* Energy Infrastructure */}
      <WindTurbine position={[-1.6, 1.1, -0.4]} />
      <WindTurbine position={[0, 2.2, -1.8]} />
      
      <SolarPanels position={[-0.6, 1.8, -0.6]} count={3} />
      <SolarPanels position={[0.6, 1.5, -0.4]} count={2} />
      <SolarPanels position={[0.5, 0.7, 0.3]} count={2} />

      {/* Extensive Vegetation */}
      <Tree position={[-0.9, 0, 0.2]} scale={1.0} />
      <Tree position={[-0.7, 0, 0.35]} scale={0.7} />
      <Tree position={[0.9, 0, 0.7]} scale={0.85} />
      <Tree position={[1.1, 0, 0.55]} scale={1.1} />
      <Tree position={[-1.8, 0, 0.5]} scale={1.2} />
      <Tree position={[-2.0, 0, 0.7]} scale={0.8} />
      <Tree position={[1.7, 0, 0.4]} scale={0.9} />
      <Tree position={[2.0, 0, 0.6]} scale={1.0} />
      
      {/* Rooftop Gardens */}
      <Tree position={[-1.2, 0.5, -1.6]} scale={0.6} />
      <Tree position={[1.1, 0.6, -1.5]} scale={0.7} />

      {/* Streetlights */}
      <Streetlight position={[-0.3, 0, -0.1]} />
      <Streetlight position={[0.3, 0, 0.1]} rotation={[0, Math.PI, 0]} />
      <Streetlight position={[-1.0, 0, -0.1]} />
      <Streetlight position={[1.0, 0, 0.1]} rotation={[0, Math.PI, 0]} />

      {/* Vehicles (Dense Traffic) */}
      <Vehicle pathStart={[-2.5, 0, 0]} pathEnd={[2.5, 0, 0]} speed={1} isEV />
      <Vehicle pathStart={[-2.5, 0, 0.05]} pathEnd={[2.5, 0, 0.05]} speed={1.2} />
      <Vehicle pathStart={[2.5, 0, -0.05]} pathEnd={[-2.5, 0, -0.05]} speed={0.8} isBus />
      
      <Vehicle pathStart={[2.5, 0, -1.25]} pathEnd={[-2.5, 0, -1.25]} speed={1.1} isEV />
      <Vehicle pathStart={[-2.5, 0, -1.15]} pathEnd={[2.5, 0, -1.15]} speed={0.9} />
      
      <Vehicle pathStart={[-1.25, 0, -2]} pathEnd={[-1.25, 0, 1]} speed={0.8} />
      <Vehicle pathStart={[-1.15, 0, 1]} pathEnd={[-1.15, 0, -2]} speed={1.3} isEV />
      
      <Vehicle pathStart={[1.25, 0, 1]} pathEnd={[1.25, 0, -2]} speed={0.7} isBus />

      {/* IoT Sensors across the city */}
      <SensorDot position={[-0.6, 2.0, -0.6]} delay={0} />
      <SensorDot position={[0.6, 1.7, -0.4]} delay={1.2} />
      <SensorDot position={[-1.6, 1.35, -0.4]} delay={2.5} />
      <SensorDot position={[1.6, 1.4, -0.7]} delay={0.8} />
      <SensorDot position={[-0.4, 1.0, 0.4]} delay={3.1} />
      <SensorDot position={[0, 2.5, -1.8]} delay={1.8} />

      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 10, 4]} intensity={0.6} color="#FFFFFF" />
      <directionalLight position={[-4, 6, -3]} intensity={0.25} color="#F7F6F2" />
    </group>
  );
}

/* ── Canvas Wrapper ──────────────────────────────────── */
const DigitalTwinScene = forwardRef<CitySceneHandle, { className?: string }>(
  function DigitalTwinScene({ className = '' }, ref) {
    const scrollProgressRef = useRef(0);
    const featureIndexRef = useRef(0);

    useImperativeHandle(ref, () => ({
      setScrollProgress(p: number) {
        scrollProgressRef.current = p;
      },
      setFeatureIndex(idx: number) {
        featureIndexRef.current = idx;
      },
    }));

    return (
      <div className={`w-full h-full ${className}`}>
        <Canvas
          camera={{ position: [5, 4.5, 5], fov: 24 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <CityScene />
        </Canvas>
      </div>
    );
  }
);

export default DigitalTwinScene;
