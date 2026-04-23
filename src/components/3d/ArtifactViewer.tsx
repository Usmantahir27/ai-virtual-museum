"use client";

import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Button from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Color per artifact type                                            */
/* ------------------------------------------------------------------ */

const TYPE_COLORS: Record<string, string> = {
  scroll: "#C9A96E",
  sculpture: "#E8DCC8",
  vessel: "#C9A96E",
  coin: "#D4A017",
  jewellery: "#D4A017",
  weapon: "#8A8A8A",
  tool: "#6B5E4A",
  textile: "#C9A96E",
  mosaic: "#C1440E",
  architecture: "#E8DCC8",
  default: "#C9A96E",
};

/* ------------------------------------------------------------------ */
/*  Type-specific 3D geometry components                               */
/* ------------------------------------------------------------------ */

/** Sculpture: a classical bust / head + torso shape */
function SculptureShape({ color }: { color: string }) {
  return (
    <group>
      {/* Head */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.05} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.14, 0.2, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.05} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, -0.15, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.35, 0.6, 16]} />
        <meshStandardMaterial color={color} roughness={0.65} metalness={0.05} />
      </mesh>
      {/* Base cut */}
      <mesh position={[0, -0.48, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.38, 0.06, 16]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </mesh>
    </group>
  );
}

/** Vessel: an amphora / vase using LatheGeometry */
function VesselShape({ color }: { color: string }) {
  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector2(0.0, -0.6),
      new THREE.Vector2(0.25, -0.58),
      new THREE.Vector2(0.32, -0.45),
      new THREE.Vector2(0.35, -0.2),
      new THREE.Vector2(0.3, 0.1),
      new THREE.Vector2(0.2, 0.3),
      new THREE.Vector2(0.14, 0.42),
      new THREE.Vector2(0.12, 0.5),
      new THREE.Vector2(0.16, 0.55),
      new THREE.Vector2(0.17, 0.6),
      new THREE.Vector2(0.15, 0.62),
      new THREE.Vector2(0.0, 0.62),
    ];
    return new THREE.LatheGeometry(points, 32);
  }, []);

  return (
    <mesh geometry={geometry} position={[0, -0.05, 0]} castShadow>
      <meshStandardMaterial
        color={color}
        roughness={0.5}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/** Scroll / Tablet: a stone tablet or clay cylinder */
function ScrollShape({ color }: { color: string }) {
  return (
    <group>
      {/* Main tablet slab */}
      <mesh castShadow>
        <boxGeometry args={[0.55, 0.85, 0.12]} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.0} />
      </mesh>
      {/* Rounded top */}
      <mesh position={[0, 0.425, 0]} castShadow>
        <cylinderGeometry args={[0.275, 0.275, 0.12, 32, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.0} />
      </mesh>
      {/* Inscription lines (decorative ridges) */}
      {[-0.25, -0.1, 0.05, 0.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0.065]}>
          <boxGeometry args={[0.4, 0.02, 0.01]} />
          <meshStandardMaterial color="#6B5E4A" roughness={1} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}

/** Coin: a flat disc with relief detail */
function CoinShape({ color }: { color: string }) {
  return (
    <group rotation={[0.3, 0, 0.1]}>
      {/* Main disc */}
      <mesh castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.06, 48]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Inner ring */}
      <mesh position={[0, 0.032, 0]}>
        <torusGeometry args={[0.3, 0.02, 8, 48]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.75} />
      </mesh>
      {/* Center profile (raised bump) */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.65} />
      </mesh>
    </group>
  );
}

/** Jewellery: a mask / crown shape */
function JewelleryShape({ color }: { color: string }) {
  return (
    <group>
      {/* Mask face shape - oval */}
      <mesh castShadow>
        <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.5]} />
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.75}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Nose ridge */}
      <mesh position={[0, 0.05, 0.33]} castShadow>
        <boxGeometry args={[0.06, 0.2, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.7} />
      </mesh>
      {/* Eye sockets */}
      {[-0.12, 0.12].map((x, i) => (
        <mesh key={i} position={[x, 0.15, 0.32]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#1A1410" roughness={1} metalness={0} />
        </mesh>
      ))}
      {/* Brow ridge */}
      <mesh position={[0, 0.25, 0.28]} castShadow>
        <boxGeometry args={[0.35, 0.04, 0.08]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  );
}

/** Weapon: a sword on display */
function WeaponShape({ color }: { color: string }) {
  return (
    <group rotation={[0, 0, 0.15]}>
      {/* Blade */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[0.06, 0.7, 0.015]} />
        <meshStandardMaterial color={color} roughness={0.15} metalness={0.85} />
      </mesh>
      {/* Blade tip */}
      <mesh position={[0, 0.62, 0]} castShadow>
        <coneGeometry args={[0.03, 0.1, 4]} />
        <meshStandardMaterial color={color} roughness={0.15} metalness={0.85} />
      </mesh>
      {/* Guard */}
      <mesh position={[0, -0.12, 0]} castShadow>
        <boxGeometry args={[0.25, 0.04, 0.04]} />
        <meshStandardMaterial color="#D4A017" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Grip */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.035, 0.3, 8]} />
        <meshStandardMaterial color="#4A3520" roughness={0.9} metalness={0.0} />
      </mesh>
      {/* Pommel */}
      <mesh position={[0, -0.48, 0]} castShadow>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#D4A017" roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}

/** Tool: a seal / stamp / instrument */
function ToolShape({ color }: { color: string }) {
  return (
    <group>
      {/* Square seal face */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.15]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Handle / knob on top */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.25, 12]} />
        <meshStandardMaterial color={color} roughness={0.75} metalness={0.1} />
      </mesh>
      {/* Carved intaglio lines on face */}
      {[-0.12, 0, 0.12].map((y, i) => (
        <mesh key={i} position={[0, -0.1 + y * 0.8, 0.08]}>
          <boxGeometry args={[0.35, 0.025, 0.01]} />
          <meshStandardMaterial color="#3A2E22" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

/** Textile: a draped cloth on a frame */
function TextileShape({ color }: { color: string }) {
  return (
    <group>
      {/* Hanging rod */}
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshStandardMaterial color="#4A3520" roughness={0.8} />
      </mesh>
      {/* Fabric panel - slightly angled for drape feel */}
      <mesh position={[0, 0, 0.02]} castShadow>
        <planeGeometry args={[0.7, 0.9]} />
        <meshStandardMaterial
          color={color}
          roughness={0.9}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Decorative border stripes */}
      {[-0.42, 0.42].map((y, i) => (
        <mesh key={i} position={[0, y, 0.025]}>
          <planeGeometry args={[0.7, 0.04]} />
          <meshStandardMaterial color="#D4A017" roughness={0.8} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* Woven pattern center */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshStandardMaterial color="#C1440E" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/** Mosaic: a decorated panel of tiles */
function MosaicShape({ color }: { color: string }) {
  const tiles = useMemo(() => {
    const list: { x: number; y: number; c: string }[] = [];
    const palette = ["#C1440E", "#1B3A6B", "#D4A017", "#C9A96E", "#F5EDD6", "#6B5E4A"];
    for (let row = -3; row <= 3; row++) {
      for (let col = -4; col <= 4; col++) {
        list.push({
          x: col * 0.085,
          y: row * 0.085,
          c: palette[(Math.abs(row * 7 + col * 3)) % palette.length],
        });
      }
    }
    return list;
  }, []);

  return (
    <group>
      {/* Backing stone slab */}
      <mesh castShadow>
        <boxGeometry args={[0.85, 0.65, 0.08]} />
        <meshStandardMaterial color={color} roughness={0.9} metalness={0} />
      </mesh>
      {/* Mosaic tiles */}
      {tiles.map((t, i) => (
        <mesh key={i} position={[t.x, t.y, 0.045]}>
          <boxGeometry args={[0.07, 0.07, 0.015]} />
          <meshStandardMaterial color={t.c} roughness={0.6} metalness={0.05} />
        </mesh>
      ))}
    </group>
  );
}

/** Architecture: a temple column section / arch */
function ArchitectureShape({ color }: { color: string }) {
  return (
    <group>
      {/* Base */}
      <mesh position={[0, -0.45, 0]} castShadow>
        <boxGeometry args={[0.7, 0.1, 0.7]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.05} />
      </mesh>
      {/* Left column */}
      <mesh position={[-0.22, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 0.9, 16]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Right column */}
      <mesh position={[0.22, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 0.9, 16]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Entablature (lintel) */}
      <mesh position={[0, 0.52, 0]} castShadow>
        <boxGeometry args={[0.7, 0.08, 0.18]} />
        <meshStandardMaterial color={color} roughness={0.75} metalness={0.05} />
      </mesh>
      {/* Pediment (triangular top) */}
      <mesh position={[0, 0.66, 0]} castShadow rotation={[0, 0, 0]}>
        <coneGeometry args={[0.4, 0.2, 3]} />
        <meshStandardMaterial color={color} roughness={0.75} metalness={0.05} />
      </mesh>
      {/* Column fluting detail (ridges) */}
      {[-0.22, 0.22].map((x, i) => (
        <mesh key={i} position={[x, 0.05, 0.07]}>
          <boxGeometry args={[0.01, 0.85, 0.01]} />
          <meshStandardMaterial color="#6B5E4A" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Shape router                                                       */
/* ------------------------------------------------------------------ */

const SHAPE_MAP: Record<string, React.FC<{ color: string }>> = {
  sculpture: SculptureShape,
  vessel: VesselShape,
  scroll: ScrollShape,
  coin: CoinShape,
  jewellery: JewelleryShape,
  weapon: WeaponShape,
  tool: ToolShape,
  textile: TextileShape,
  mosaic: MosaicShape,
  architecture: ArchitectureShape,
};

/* ------------------------------------------------------------------ */
/*  Pedestal                                                           */
/* ------------------------------------------------------------------ */

function Pedestal() {
  return (
    <group position={[0, -1.2, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.7, 0.5, 32]} />
        <meshStandardMaterial color="#3A2E22" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.26, 0]} receiveShadow>
        <cylinderGeometry args={[0.65, 0.65, 0.02, 32]} />
        <meshStandardMaterial color="#4A3E32" roughness={0.7} metalness={0.15} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Rotating artifact wrapper                                          */
/* ------------------------------------------------------------------ */

function ArtifactShape({
  artifactType,
  presentationMode,
}: {
  artifactType: string;
  presentationMode: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const color = TYPE_COLORS[artifactType] ?? TYPE_COLORS.default;
  const ShapeComponent = SHAPE_MAP[artifactType] ?? SculptureShape;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      <ShapeComponent color={color} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene lighting                                                     */
/* ------------------------------------------------------------------ */

function SceneLighting({ presentationMode }: { presentationMode: boolean }) {
  return (
    <>
      <ambientLight
        intensity={presentationMode ? 0.1 : 0.35}
        color="#F5EDD6"
      />
      <directionalLight
        position={[-3, 5, 2]}
        intensity={presentationMode ? 0.4 : 0.9}
        color="#FFF8E7"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight
        color="#F5EDD6"
        groundColor="#1A1410"
        intensity={presentationMode ? 0.1 : 0.25}
      />
      {/* Warm fill from the side */}
      <pointLight
        position={[3, 2, -2]}
        intensity={presentationMode ? 0.2 : 0.4}
        color="#D4A017"
        distance={10}
      />
      {presentationMode && (
        <spotLight
          position={[0, 5, 0]}
          angle={0.4}
          penumbra={0.6}
          intensity={2.5}
          color="#F5EDD6"
          castShadow
        />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene                                                              */
/* ------------------------------------------------------------------ */

function Scene({
  artifactType,
  presentationMode,
}: {
  artifactType: string;
  presentationMode: boolean;
}) {
  return (
    <>
      <SceneLighting presentationMode={presentationMode} />
      <ArtifactShape
        artifactType={artifactType}
        presentationMode={presentationMode}
      />
      <Pedestal />
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        maxPolarAngle={Math.PI / 1.8}
        minDistance={2}
        maxDistance={6}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading fallback                                                   */
/* ------------------------------------------------------------------ */

function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-obsidian/50">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
        <span className="font-display text-xs uppercase tracking-[0.2em] text-stone">
          Loading artifact...
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main exported component                                            */
/* ------------------------------------------------------------------ */

interface ArtifactViewerProps {
  artifactName: string;
  artifactType: string;
}

export default function ArtifactViewer({
  artifactName,
  artifactType,
}: ArtifactViewerProps) {
  const [presentationMode, setPresentationMode] = useState(false);

  return (
    <div className="relative h-full w-full">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          shadows
          camera={{ position: [0, 0.8, 3.5], fov: 45 }}
          className="h-full w-full"
          style={{
            background: presentationMode
              ? "radial-gradient(ellipse at center, #1A1410 0%, #0D0A07 100%)"
              : "#1A1410",
          }}
        >
          <Scene
            artifactType={artifactType}
            presentationMode={presentationMode}
          />
        </Canvas>
      </Suspense>

      {/* Artifact label overlay */}
      <div className="pointer-events-none absolute bottom-4 left-4">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-gold/60">
          {artifactType}
        </p>
        <p className="font-body text-sm text-parchment/50">{artifactName}</p>
      </div>

      {/* Presentation mode toggle */}
      <div className="absolute right-4 top-4">
        <Button
          variant={presentationMode ? "primary" : "ghost"}
          size="sm"
          onClick={() => setPresentationMode(!presentationMode)}
        >
          {presentationMode ? "Exit Presentation" : "Presentation Mode"}
        </Button>
      </div>
    </div>
  );
}
