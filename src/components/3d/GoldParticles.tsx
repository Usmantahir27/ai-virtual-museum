"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 1500;
const CYLINDER_RADIUS = 3;
const CYLINDER_HEIGHT = 8;

export default function GoldParticles() {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * CYLINDER_RADIUS;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * CYLINDER_HEIGHT;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const pos = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Gentle upward float
      arr[i3 + 1] += delta * (0.15 + Math.sin(i) * 0.05);
      // Slight horizontal drift
      arr[i3] += Math.sin(i + arr[i3 + 1] * 0.5) * delta * 0.02;
      arr[i3 + 2] += Math.cos(i + arr[i3 + 1] * 0.3) * delta * 0.02;

      // Reset particle when it rises above the cylinder
      if (arr[i3 + 1] > CYLINDER_HEIGHT / 2) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * CYLINDER_RADIUS;
        arr[i3] = Math.cos(angle) * r;
        arr[i3 + 1] = -CYLINDER_HEIGHT / 2;
        arr[i3 + 2] = Math.sin(angle) * r;
      }
    }

    pos.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#D4A017"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}
