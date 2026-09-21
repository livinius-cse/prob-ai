"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

export function FloatingGeometry({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.z = clock.elapsedTime * 0.08 + pointer.x * 0.08;
    group.current.rotation.x = pointer.y * 0.12;
  });
  return <group ref={group}>
    <mesh rotation={[0.5, 0.2, 0]}><torusGeometry args={[1.65, 0.012, 12, 96]} /><meshBasicMaterial color="#55d9ff" transparent opacity={0.35} /></mesh>
    <mesh rotation={[1.25, -0.3, 0.55]}><torusGeometry args={[1.28, 0.008, 10, 72]} /><meshBasicMaterial color="#b28cff" transparent opacity={0.38} /></mesh>
    {Array.from({ length: 18 }, (_, index) => <mesh key={index} position={[Math.sin(index * 4.7) * 1.9, Math.cos(index * 2.3) * 1.45, -0.2]}><sphereGeometry args={[0.018, 8, 8]} /><meshBasicMaterial color={index % 2 ? "#55d9ff" : "#b28cff"} /></mesh>)}
  </group>;
}
