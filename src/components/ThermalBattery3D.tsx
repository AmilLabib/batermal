import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Sphere, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// ─── Wind Turbine ─────────────────────────────────────────────────────────────
// Blade shape: thin elongated tapered geometry
const TurbineBlade = ({ angle }: { angle: number }) => {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.06, 0.1);
    shape.lineTo(0.04, 1.2);
    shape.lineTo(0, 1.4);
    shape.lineTo(-0.04, 1.2);
    shape.lineTo(-0.06, 0.1);
    shape.closePath();
    const extrudeSettings = { depth: 0.02, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2 };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  return (
    <group rotation={[0, 0, angle]}>
      <mesh geometry={geometry} position={[0, 0.05, -0.01]} castShadow>
        <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.2} />
      </mesh>
    </group>
  );
};

const WindTurbine = ({ position }: { position: [number, number, number] }) => {
  const hubRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (hubRef.current) hubRef.current.rotation.z -= delta * 1.5;
  });

  return (
    <group position={position}>
      {/* Foundation */}
      <Cylinder args={[0.12, 0.18, 0.15, 8]} position={[0, -2.02, 0]}>
        <meshStandardMaterial color="#94a3b8" roughness={0.8} />
      </Cylinder>
      {/* Tapered tower */}
      <Cylinder args={[0.06, 0.12, 4, 12]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} metalness={0.1} />
      </Cylinder>
      {/* Nacelle (housing on top) */}
      <group position={[0, 2.1, 0]}>
        <Box args={[0.25, 0.18, 0.35]} castShadow>
          <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.2} />
        </Box>
        {/* Hub */}
        <group position={[0, 0, 0.22]} ref={hubRef}>
          <Sphere args={[0.09, 12, 12]} castShadow>
            <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.3} />
          </Sphere>
          {/* 3 blades evenly spaced */}
          <TurbineBlade angle={0} />
          <TurbineBlade angle={(2 * Math.PI) / 3} />
          <TurbineBlade angle={(4 * Math.PI) / 3} />
        </group>
      </group>
    </group>
  );
};

// ─── Solar Panel ──────────────────────────────────────────────────────────────
const SolarPanel = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Ground legs */}
      <Cylinder args={[0.03, 0.03, 0.6, 6]} position={[-0.4, -1.7, 0.1]} rotation={[0.3, 0, 0]}>
        <meshStandardMaterial color="#64748b" />
      </Cylinder>
      <Cylinder args={[0.03, 0.03, 0.6, 6]} position={[0.4, -1.7, 0.1]} rotation={[0.3, 0, 0]}>
        <meshStandardMaterial color="#64748b" />
      </Cylinder>
      {/* Panel frame */}
      <Box args={[1.2, 0.08, 0.75]} position={[0, -1.4, 0]} rotation={[-0.5, 0, 0]} castShadow>
        <meshStandardMaterial color="#1e3a5f" roughness={0.2} metalness={0.4} />
      </Box>
      {/* Panel cells — 3x2 grid */}
      {[0, 1, 2].map(col =>
        [0, 1].map(row => (
          <Box
            key={`cell-${col}-${row}`}
            args={[0.35, 0.04, 0.3]}
            position={[col * 0.37 - 0.37, -1.38, row * 0.32 - 0.15]}
            rotation={[-0.5, 0, 0]}
          >
            <meshStandardMaterial color="#1d4ed8" roughness={0.1} metalness={0.5} />
          </Box>
        ))
      )}
    </group>
  );
};

// ─── Battery Core (Brick Matrix) ─────────────────────────────────────────────
const BatteryCore = ({ position }: { position: [number, number, number] }) => {
  const cols = 5;
  const rows = 3;
  const depth = 3; // layers front-to-back
  const bW = 0.85;
  const bH = 0.85;
  const bD = 0.85;
  const gap = 0.12;

  // Row colors top→bottom matching image: yellow → orange → hot pink/magenta
  const rowColors = [
    '#f59e0b', // top: amber/yellow
    '#f97316', // mid: orange
    '#e11d48', // bottom: hot pink
  ];

  // Slightly lighter shade for front faces using emissiveIntensity
  const blocks = [];
  for (let d = 0; d < depth; d++) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * (bW + gap) - (cols * (bW + gap)) / 2 + bW / 2;
        const y = (rows - 1 - r) * (bH + gap) - (rows * (bH + gap)) / 2 + bH / 2;
        const z = -d * (bD + gap);
        // Slight gradient per column to give depth
        const brighten = d === 0 ? 1 : 0.75;
        const baseColor = new THREE.Color(rowColors[r]);
        baseColor.multiplyScalar(brighten);

        blocks.push(
          <RoundedBox
            key={`b-${d}-${r}-${c}`}
            args={[bW, bH, bD]}
            radius={0.05}
            smoothness={2}
            position={[x, y, z]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={`#${baseColor.getHexString()}`}
              roughness={0.25}
              metalness={0.05}
              emissive={rowColors[r]}
              emissiveIntensity={d === 0 ? 0.15 : 0.05}
            />
          </RoundedBox>
        );
      }
    }
  }

  // Vertical heat pipes running between columns (front face)
  const pipes = [];
  const totalH = rows * (bH + gap);
  for (let c = 0; c <= cols; c++) {
    const x = c * (bW + gap) - (cols * (bW + gap)) / 2;
    pipes.push(
      <Cylinder
        key={`pipe-${c}`}
        args={[0.045, 0.045, totalH + 0.4, 8]}
        position={[x, 0, bD / 2 + 0.08]}
        castShadow
      >
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.2} />
      </Cylinder>
    );
    // Small cap on top & bottom
    pipes.push(
      <Sphere key={`cap-t-${c}`} args={[0.06, 8, 8]} position={[x, (totalH + 0.4) / 2, bD / 2 + 0.08]}>
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </Sphere>
    );
    pipes.push(
      <Sphere key={`cap-b-${c}`} args={[0.06, 8, 8]} position={[x, -(totalH + 0.4) / 2, bD / 2 + 0.08]}>
        <meshStandardMaterial color="#64748b" metalness={0.8} />
      </Sphere>
    );
  }

  return (
    <group position={position}>
      {blocks}
      {pipes}
    </group>
  );
};

// ─── Heat Exchanger ──────────────────────────────────────────────────────────
const HeatExchanger = ({ position }: { position: [number, number, number] }) => {
  // S-curve snake pipes
  const pipeData = [
    { y: 1.2, color: '#9a3412' }, // orange-800
    { y: 0.4, color: '#c2410c' }, // orange-700
    { y: -0.4, color: '#d97706' }, // amber-600
    { y: -1.2, color: '#b45309' }, // amber-700
  ];

  return (
    <group position={position}>
      {/* Side plates (semi-transparent) */}
      <Box args={[0.15, 3.8, 2.2]} position={[-1.6, 0, 0]}>
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.5} />
      </Box>
      <Box args={[0.15, 3.8, 2.2]} position={[1.6, 0, 0]}>
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.5} />
      </Box>

      {/* Horizontal pipes */}
      {pipeData.map((p, i) => (
        <Cylinder key={`hpipe-${i}`} args={[0.07, 0.07, 3.1, 10]} position={[0, p.y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color={p.color} roughness={0.3} metalness={0.4} />
        </Cylinder>
      ))}

      {/* U-bend connectors on right side */}
      <Cylinder args={[0.07, 0.07, 0.8, 10]} position={[1.55, 0.8, 0]}>
        <meshStandardMaterial color="#9a3412" />
      </Cylinder>
      <Cylinder args={[0.07, 0.07, 0.8, 10]} position={[-1.55, 0, 0]}>
        <meshStandardMaterial color="#c2410c" />
      </Cylinder>
      <Cylinder args={[0.07, 0.07, 0.8, 10]} position={[1.55, -0.8, 0]}>
        <meshStandardMaterial color="#d97706" />
      </Cylinder>

      {/* Fan/Pump at bottom */}
      <group position={[0, -2.2, 0]}>
        <Cylinder args={[0.5, 0.5, 0.25, 20]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.5} />
        </Cylinder>
        <Cylinder args={[0.35, 0.35, 0.3, 20]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#64748b" metalness={0.7} roughness={0.3} />
        </Cylinder>
        {/* Fan blades */}
        {[0, 1, 2, 3].map(i => (
          <Box
            key={`fan-${i}`}
            args={[0.08, 0.3, 0.04]}
            position={[Math.cos((i * Math.PI) / 2) * 0.2, Math.sin((i * Math.PI) / 2) * 0.2, 0]}
            rotation={[0, 0, (i * Math.PI) / 2]}
          >
            <meshStandardMaterial color="#94a3b8" metalness={0.6} />
          </Box>
        ))}
      </group>

      {/* Motor on the right */}
      <group position={[3, -2.2, 0]}>
        <Cylinder args={[0.35, 0.35, 1.0, 16]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.4} />
        </Cylinder>
        {/* Cooling fins */}
        {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
          <Box key={`fin-${i}`} args={[0.06, 0.75, 0.75]} position={[x, 0, 0]}>
            <meshStandardMaterial color="#94a3b8" metalness={0.5} />
          </Box>
        ))}
        {/* Shaft */}
        <Cylinder args={[0.06, 0.06, 0.4, 10]} position={[-0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#06b6d4" metalness={0.8} />
        </Cylinder>
      </group>
    </group>
  );
};

// ─── Main Scene ───────────────────────────────────────────────────────────────
export const ThermalBattery3D = () => {
  return (
    <div className="w-full h-[520px] bg-gradient-to-b from-stone-50 to-white rounded-xl overflow-hidden border border-stone-100 shadow-md relative">
      <Canvas shadows camera={{ position: [2, 3, 18], fov: 42 }}>
        <color attach="background" args={['#f8fafc']} />
        <fog attach="fog" args={['#f8fafc', 25, 50]} />

        <ambientLight intensity={0.55} />
        <directionalLight position={[8, 14, 8]} intensity={1.4} castShadow shadow-mapSize={2048} shadow-bias={-0.001} />
        <directionalLight position={[-8, 8, -6]} intensity={0.4} />
        <pointLight position={[0, 6, 4]} intensity={0.3} color="#fbbf24" />

        <group>
          {/* ── Energy Sources (left) ── */}
          <group position={[-8, 0.5, 0]}>
            <WindTurbine position={[-0.8, 0, -1]} />
            <WindTurbine position={[0.8, 0, 0]} />
            <WindTurbine position={[-1.8, 0, 0.8]} />
            <SolarPanel position={[0.5, 0, 1.5]} />
            <SolarPanel position={[-1.2, 0, 1.8]} />
            {/* Ground */}
            <Box args={[5, 0.08, 5]} position={[0, -2.1, 0]}>
              <meshStandardMaterial color="#e2e8f0" roughness={1} />
            </Box>
          </group>

          {/* ── Left connector wall ── */}
          <Box args={[0.12, 4, 2.8]} position={[-4.2, 0, 0]}>
            <meshStandardMaterial color="#e2e8f0" transparent opacity={0.5} />
          </Box>

          {/* ── Battery Core (center) ── */}
          <BatteryCore position={[0, 0, 0]} />

          {/* ── Right connector wall ── */}
          <Box args={[0.12, 4, 2.8]} position={[3.8, 0, 0]}>
            <meshStandardMaterial color="#e2e8f0" transparent opacity={0.5} />
          </Box>

          {/* ── Heat Exchanger (right) ── */}
          <HeatExchanger position={[6.5, 0, 0]} />

          {/* ── Hot pipe (top, pink) from battery to exchanger ── */}
          <Cylinder args={[0.05, 0.05, 2.5, 8]} position={[2.6, 1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#9a3412" roughness={0.3} metalness={0.3} />
          </Cylinder>
          {/* ── Cold pipe (bottom, blue) from exchanger to battery ── */}
          <Cylinder args={[0.05, 0.05, 2.5, 8]} position={[2.6, -1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#b45309" roughness={0.3} metalness={0.3} />
          </Cylinder>
          {/* ── Power cable from sources to battery ── */}
          <Cylinder args={[0.04, 0.04, 2.5, 8]} position={[-2.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#fbbf24" roughness={0.4} />
          </Cylinder>
        </group>

        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2 + 0.15}
          minDistance={10}
          maxDistance={28}
          autoRotate
          autoRotateSpeed={0.4}
        />
      </Canvas>

      {/* Overlay label */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <h3 className="text-lg font-bold text-stone-800 drop-shadow-sm">Thermal Battery System</h3>
        <p className="text-xs text-stone-500">Interactive 3D · drag to rotate</p>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 pointer-events-none flex flex-col gap-1">
        {[
          { color: '#9a3412', label: 'Hot fluid' },
          { color: '#b45309', label: 'Cold fluid' },
          { color: '#fbbf24', label: 'Power input' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: item.color }} />
            <span className="text-[11px] text-stone-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThermalBattery3D;
