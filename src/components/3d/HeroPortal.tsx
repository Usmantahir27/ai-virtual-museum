"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GoldParticles from "./GoldParticles";

/* ------------------------------------------------------------------ */
/*  Procedural texture generators                                      */
/* ------------------------------------------------------------------ */

/** Simple seeded pseudo-random for deterministic textures */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Procedural marble texture — veins + colour variation */
function createMarbleTexture(
  width = 512,
  height = 512,
  seed = 42,
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const rand = seededRandom(seed);

  // Base warm marble
  ctx.fillStyle = "#C2B8A3";
  ctx.fillRect(0, 0, width, height);

  // Layered noise patches for colour variation
  for (let i = 0; i < 600; i++) {
    const x = rand() * width;
    const y = rand() * height;
    const r = rand() * 40 + 8;
    const alpha = rand() * 0.12 + 0.02;
    const colors = ["#A89478", "#D4C9B0", "#8B7D6B", "#BFB49A", "#9E9484"];
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = colors[Math.floor(rand() * colors.length)];
    ctx.globalAlpha = alpha;
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Veins — thin wandering dark lines
  for (let v = 0; v < 8; v++) {
    ctx.beginPath();
    let vx = rand() * width;
    let vy = 0;
    ctx.moveTo(vx, vy);
    while (vy < height) {
      vx += (rand() - 0.5) * 30;
      vy += rand() * 18 + 4;
      ctx.lineTo(vx, vy);
    }
    ctx.strokeStyle = rand() > 0.5 ? "#7A7060" : "#6B6050";
    ctx.globalAlpha = rand() * 0.25 + 0.08;
    ctx.lineWidth = rand() * 1.8 + 0.4;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Fine surface grain
  for (let i = 0; i < 3000; i++) {
    const x = rand() * width;
    const y = rand() * height;
    ctx.fillStyle = rand() > 0.5 ? "#B0A690" : "#A09880";
    ctx.globalAlpha = rand() * 0.15;
    ctx.fillRect(x, y, rand() * 3 + 1, rand() * 3 + 1);
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/** Weathered stone texture — age stains, erosion, cracks */
function createWeatheredTexture(
  width = 512,
  height = 512,
  seed = 99,
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const rand = seededRandom(seed);

  // Base stone
  ctx.fillStyle = "#B5A994";
  ctx.fillRect(0, 0, width, height);

  // Large weathering patches (darker age stains)
  for (let i = 0; i < 30; i++) {
    const x = rand() * width;
    const y = rand() * height;
    const r = rand() * 80 + 30;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, `rgba(90, 80, 60, ${rand() * 0.2 + 0.05})`);
    gradient.addColorStop(1, "rgba(90, 80, 60, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  // Greenish lichen patches
  for (let i = 0; i < 12; i++) {
    const x = rand() * width;
    const y = rand() * height;
    const r = rand() * 25 + 8;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(85, 95, 70, ${rand() * 0.12 + 0.03})`;
    ctx.fill();
  }

  // Cracks
  for (let c = 0; c < 5; c++) {
    ctx.beginPath();
    let cx = rand() * width;
    let cy = rand() * height;
    ctx.moveTo(cx, cy);
    const segments = Math.floor(rand() * 12) + 5;
    for (let s = 0; s < segments; s++) {
      cx += (rand() - 0.5) * 40;
      cy += rand() * 25 + 5;
      ctx.lineTo(cx, cy);
    }
    ctx.strokeStyle = "#5A5040";
    ctx.globalAlpha = rand() * 0.3 + 0.1;
    ctx.lineWidth = rand() * 1.2 + 0.3;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Pitting / erosion holes
  for (let i = 0; i < 200; i++) {
    const x = rand() * width;
    const y = rand() * height;
    const r = rand() * 2.5 + 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "#8A7D6A";
    ctx.globalAlpha = rand() * 0.3 + 0.1;
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/** Bump map from a colour texture — extracts luminance as height */
function createBumpFromTexture(
  source: THREE.CanvasTexture,
  strength = 1,
): THREE.CanvasTexture {
  const srcCanvas = source.image as HTMLCanvasElement;
  const w = srcCanvas.width;
  const h = srcCanvas.height;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(srcCanvas, 0, 0);
  const imageData = ctx.getImageData(0, 0, w, h);
  const d = imageData.data;

  for (let i = 0; i < d.length; i += 4) {
    const lum = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114);
    const val = Math.min(255, Math.max(0, 128 + (lum - 128) * strength));
    d[i] = d[i + 1] = d[i + 2] = val;
  }
  ctx.putImageData(imageData, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/* ------------------------------------------------------------------ */
/*  Doric Column                                                       */
/* ------------------------------------------------------------------ */

const GOLD_TRIM = "#C9A96E";

function FlutedShaft({ height, radius }: { height: number; radius: number }) {
  const fluteCount = 20;

  const { marbleTex, marbleBump, fluteTex } = useMemo(() => {
    const marble = createMarbleTexture(512, 512, 42);
    marble.repeat.set(1, 2);
    const bump = createBumpFromTexture(marble, 1.5);
    bump.repeat.set(1, 2);
    const flute = createWeatheredTexture(64, 256, 77);
    return { marbleTex: marble, marbleBump: bump, fluteTex: flute };
  }, []);

  const flutes = useMemo(() => {
    return Array.from({ length: fluteCount }, (_, i) => {
      const angle = (i / fluteCount) * Math.PI * 2;
      const x = Math.cos(angle) * (radius + 0.015);
      const z = Math.sin(angle) * (radius + 0.015);
      return { x, z, angle };
    });
  }, [radius]);

  return (
    <group>
      <mesh>
        <cylinderGeometry args={[radius * 0.92, radius, height, 32]} />
        <meshStandardMaterial
          map={marbleTex}
          bumpMap={marbleBump}
          bumpScale={0.04}
          roughness={0.65}
          metalness={0.05}
          emissive="#8B7D6B"
          emissiveIntensity={0.04}
        />
      </mesh>

      {flutes.map((f, i) => (
        <mesh
          key={i}
          position={[f.x, 0, f.z]}
          rotation={[0, -f.angle, 0]}
        >
          <boxGeometry args={[0.015, height * 0.96, 0.04]} />
          <meshStandardMaterial
            map={fluteTex}
            color="#7A7060"
            roughness={0.85}
            metalness={0.03}
          />
        </mesh>
      ))}
    </group>
  );
}

function DoricColumn({ position, seed = 42 }: { position: [number, number, number]; seed?: number }) {
  const shaftHeight = 5;
  const radius = 0.32;

  const { weatheredTex, weatheredBump, capitalTex, capitalBump } = useMemo(() => {
    const wt = createWeatheredTexture(512, 512, seed);
    const wb = createBumpFromTexture(wt, 2);
    const ct = createWeatheredTexture(256, 256, seed + 100);
    const cb = createBumpFromTexture(ct, 1.8);
    return { weatheredTex: wt, weatheredBump: wb, capitalTex: ct, capitalBump: cb };
  }, [seed]);

  return (
    <group position={position}>
      {/* ── Stylobate (stepped base) ── */}
      <mesh position={[0, -2.85, 0]}>
        <boxGeometry args={[1.0, 0.15, 1.0]} />
        <meshStandardMaterial
          map={weatheredTex}
          bumpMap={weatheredBump}
          bumpScale={0.03}
          roughness={0.8}
          metalness={0.03}
        />
      </mesh>
      <mesh position={[0, -2.68, 0]}>
        <boxGeometry args={[0.88, 0.12, 0.88]} />
        <meshStandardMaterial
          map={weatheredTex}
          bumpMap={weatheredBump}
          bumpScale={0.025}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* ── Fluted shaft ── */}
      <FlutedShaft height={shaftHeight} radius={radius} />

      {/* ── Capital assembly ── */}
      <group position={[0, shaftHeight / 2, 0]}>
        {/* Annulets — 3 thin rings at the top of the shaft */}
        {[0, 0.05, 0.1].map((dy, i) => (
          <mesh key={`annulet-${i}`} position={[0, dy, 0]}>
            <torusGeometry args={[radius * 0.93 - i * 0.01, 0.018, 8, 32]} />
            <meshStandardMaterial
              map={capitalTex}
              roughness={0.55}
              metalness={0.08}
              emissive="#8B7D6B"
              emissiveIntensity={0.04}
            />
          </mesh>
        ))}

        {/* Echinus — the curved cushion flaring outward */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.52, radius * 0.92, 0.18, 32]} />
          <meshStandardMaterial
            map={capitalTex}
            bumpMap={capitalBump}
            bumpScale={0.03}
            roughness={0.55}
            metalness={0.06}
            emissive="#8B7D6B"
            emissiveIntensity={0.04}
          />
        </mesh>

        {/* Neck molding between echinus and abacus */}
        <mesh position={[0, 0.34, 0]}>
          <cylinderGeometry args={[0.54, 0.52, 0.04, 32]} />
          <meshStandardMaterial
            color={GOLD_TRIM}
            roughness={0.4}
            metalness={0.3}
            emissive={GOLD_TRIM}
            emissiveIntensity={0.06}
          />
        </mesh>

        {/* Abacus — thick square slab */}
        <mesh position={[0, 0.44, 0]}>
          <boxGeometry args={[1.1, 0.16, 1.1]} />
          <meshStandardMaterial
            map={capitalTex}
            bumpMap={capitalBump}
            bumpScale={0.025}
            roughness={0.55}
            metalness={0.06}
            emissive="#8B7D6B"
            emissiveIntensity={0.04}
          />
        </mesh>

        {/* Top edge trim */}
        <mesh position={[0, 0.53, 0]}>
          <boxGeometry args={[1.12, 0.02, 1.12]} />
          <meshStandardMaterial
            color={GOLD_TRIM}
            roughness={0.4}
            metalness={0.3}
            emissive={GOLD_TRIM}
            emissiveIntensity={0.06}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene                                                              */
/* ------------------------------------------------------------------ */

function Scene() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const angle = t * 0.06;
    state.camera.position.x = Math.sin(angle) * 6.5 * 0.25;
    state.camera.position.z = 4 + Math.cos(angle) * 6.5 * 0.12;
    state.camera.position.y = 1.6 + Math.sin(t * 0.1) * 0.15;
    state.camera.lookAt(0, 0.3, -1);
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} color="#C9A96E" />

      <spotLight
        position={[0, 8, 0]}
        angle={0.3}
        penumbra={0.8}
        intensity={3}
        color="#D4A017"
        castShadow
        target-position={[0, 0, 0]}
      />

      <pointLight position={[-2.5, 0.5, 3]} intensity={2.5} color="#D4A017" distance={7} decay={2} />
      <pointLight position={[2.5, 0.5, 3]} intensity={2.5} color="#D4A017" distance={7} decay={2} />
      <pointLight position={[0, 3, 2]} intensity={1.5} color="#F5EDD6" distance={8} decay={2} />

      <pointLight position={[-5, 2, -3]} intensity={0.6} color="#1B3A6B" />
      <pointLight position={[5, 2, -3]} intensity={0.6} color="#C1440E" />

      {/* Each column gets a unique seed for distinct weathering */}
      <DoricColumn position={[-2.6, 0, -1.2]} seed={42} />
      <DoricColumn position={[-1.6, 0, 0.6]} seed={137} />
      <DoricColumn position={[2.6, 0, -1.2]} seed={251} />
      <DoricColumn position={[1.6, 0, 0.6]} seed={389} />

      <GoldParticles />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1A1410" roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Export                                                             */
/* ------------------------------------------------------------------ */

export default function HeroPortal() {
  return (
    <div className="absolute inset-0">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center bg-obsidian">
            <span className="font-display text-sm uppercase tracking-[0.2em] text-stone/50">
              Loading...
            </span>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 1.6, 6], fov: 50 }}
          gl={{ antialias: true, alpha: false }}
          style={{ position: "absolute", inset: 0 }}
        >
          <fog attach="fog" args={["#1A1410", 6, 20]} />
          <color attach="background" args={["#1A1410"]} />
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
