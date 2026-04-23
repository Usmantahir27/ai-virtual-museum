"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

/* ------------------------------------------------------------------ */
/*  Theme colors                                                       */
/* ------------------------------------------------------------------ */

const themeColors: Record<GalleryTheme, string> = {
  egypt: "#D4A017",
  greece: "#1B3A6B",
  mesopotamia: "#C1440E",
  rome: "#B8860B",
};

export type GalleryTheme = "egypt" | "greece" | "mesopotamia" | "rome";

export interface GalleryArtifact {
  name: string;
  color: string;
  imageUrl?: string;
  slug?: string;
}

interface GalleryRoomProps {
  theme: GalleryTheme;
  artifacts: GalleryArtifact[];
  onArtifactClick?: (artifact: GalleryArtifact) => void;
}

/* ------------------------------------------------------------------ */
/*  3D Scene                                                           */
/* ------------------------------------------------------------------ */

function Room({
  theme,
  artifacts,
  onArtifactClick,
}: {
  theme: GalleryTheme;
  artifacts: GalleryArtifact[];
  onArtifactClick?: (artifact: GalleryArtifact) => void;
}) {
  const accent = themeColors[theme];

  return (
    <>
      <ambientLight intensity={0.3} color="#F5EDD6" />
      <pointLight position={[-3.5, 2.5, -1]} intensity={8} color="#D4A017" distance={8} decay={2} />
      <pointLight position={[3.5, 2.5, -1]} intensity={8} color="#D4A017" distance={8} decay={2} />
      <pointLight position={[0, 4, 0]} intensity={2} color="#C9A96E" distance={10} />

      {/* Spotlight per artwork */}
      {artifacts.slice(0, 3).map((_, i) => {
        const xPos = (i - 1) * 2.8;
        return (
          <spotLight
            key={`spot-${i}`}
            position={[xPos, 4.5, -2]}
            angle={0.4}
            penumbra={0.6}
            intensity={3}
            color="#F5EDD6"
            distance={6}
            target-position={[xPos, 2.5, -4]}
          />
        );
      })}

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#2A2318" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2.5, -4]} receiveShadow>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#1E1A14" roughness={0.9} metalness={0.05} />
      </mesh>
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#1E1A14" roughness={0.9} metalness={0.05} />
      </mesh>
      <mesh position={[5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#1E1A14" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Torch sconces */}
      <mesh position={[-3.5, 2.8, -1]}>
        <cylinderGeometry args={[0.06, 0.08, 0.4, 8]} />
        <meshStandardMaterial color="#6B5E4A" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[3.5, 2.8, -1]}>
        <cylinderGeometry args={[0.06, 0.08, 0.4, 8]} />
        <meshStandardMaterial color="#6B5E4A" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Artworks on back wall */}
      {artifacts.slice(0, 3).map((artifact, i) => {
        const xPos = (i - 1) * 2.8;
        return (
          <group key={artifact.name} position={[xPos, 2.8, -3.95]}>
            {/* Frame */}
            <mesh>
              <planeGeometry args={[1.6, 2]} />
              <meshStandardMaterial color="#2A2014" roughness={0.8} metalness={0.1} />
            </mesh>

            {/* Artwork — real image via HTML overlay or bright colour */}
            <Html
              position={[0, 0, 0.02]}
              center
              transform
              distanceFactor={4.5}
              style={{ pointerEvents: "auto" }}
            >
              <div
                className="flex h-[170px] w-[130px] cursor-pointer items-center justify-center overflow-hidden border border-gold/20 transition-all hover:border-gold/50 hover:shadow-[0_0_20px_rgba(212,160,23,0.3)]"
                style={{ background: artifact.color }}
                onClick={() => onArtifactClick?.(artifact)}
              >
                {artifact.imageUrl ? (
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.name}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="h-full w-full" style={{ background: artifact.color }} />
                )}
              </div>
            </Html>

            {/* Frame accent strip */}
            <mesh position={[0, 1.05, 0.005]}>
              <planeGeometry args={[1.6, 0.06]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} />
            </mesh>

            {/* Name plaque */}
            <Html position={[0, -1.2, 0.02]} center>
              <div
                className="cursor-pointer whitespace-nowrap rounded bg-obsidian/80 px-2 py-0.5 font-display text-[10px] uppercase tracking-[0.15em] text-gold/80 border border-gold/20 transition-colors hover:bg-obsidian hover:text-gold"
                onClick={() => onArtifactClick?.(artifact)}
              >
                {artifact.name}
              </div>
            </Html>
          </group>
        );
      })}

      {/* Floor accent strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, -3.5]}>
        <planeGeometry args={[8, 0.15]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Export                                                             */
/* ------------------------------------------------------------------ */

export default function GalleryRoom({ theme, artifacts, onArtifactClick }: GalleryRoomProps) {
  return (
    <div className="relative h-full w-full min-h-[500px]">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center bg-obsidian">
            <span className="font-display text-sm uppercase tracking-[0.2em] text-stone/50">
              Loading gallery...
            </span>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 2.5, 5], fov: 55 }}
          gl={{ antialias: true, alpha: false }}
          shadows
          style={{ width: "100%", height: "100%" }}
        >
          <fog attach="fog" args={["#1A1410", 6, 16]} />
          <color attach="background" args={["#1A1410"]} />
          <Room theme={theme} artifacts={artifacts} onArtifactClick={onArtifactClick} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            target={[0, 2, -2]}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
