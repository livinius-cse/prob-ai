"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import type { NewsArticle } from "../../lib/api";
import { FloatingGeometry } from "./FloatingGeometry";
import { SignalNodes } from "../geography/SignalNodes";

function SceneContents({ articles, onSignalSelect, reducedMotion }: { articles: NewsArticle[]; onSignalSelect: (article: NewsArticle) => void; reducedMotion: boolean }) {
  const group = useRef<Group>(null);
  useFrame(({ pointer, clock }) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y += (pointer.x * 0.16 - group.current.rotation.y) * 0.025;
    group.current.rotation.x = pointer.y * 0.08;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.55) * 0.04;
  });
  return <group ref={group}><ambientLight intensity={1.6} /><pointLight position={[2, 2, 3]} intensity={14} color="#55d9ff" /><pointLight position={[-2, -1, 2]} intensity={8} color="#b28cff" /><FloatingGeometry reducedMotion={reducedMotion} /><SignalNodes articles={articles} onSelect={onSignalSelect} /></group>;
}

export function ForgeScene({ articles = [], onSignalSelect, reducedMotion = false, label = "Stylized geographic live-signal field" }: { articles?: NewsArticle[]; onSignalSelect?: (article: NewsArticle) => void; reducedMotion?: boolean; label?: string }) {
  return <div className="forge-scene" role="img" aria-label={label}><Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4.7], fov: 42 }} gl={{ antialias: true, powerPreference: "high-performance" }}><SceneContents articles={articles} onSignalSelect={onSignalSelect ?? (() => undefined)} reducedMotion={reducedMotion} /></Canvas><p className="scene-note">Stylized regional signal field · not a geographic boundary map</p></div>;
}
