"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Mesh } from "three";
import type { NewsArticle } from "../../lib/api";

export const REGION_POSITIONS: Record<string, [number, number, number]> = {
  India: [0, 0, 0], Delhi: [-0.25, 1.15, 0], Punjab: [-0.65, 1.1, 0], Rajasthan: [-0.85, 0.55, 0], Gujarat: [-1.05, -0.05, 0], Maharashtra: [-0.55, -0.55, 0], Goa: [-0.75, -0.85, 0], Karnataka: [-0.18, -0.75, 0], Kerala: [0.0, -1.2, 0], "Tamil Nadu": [0.42, -1.1, 0], Telangana: [0.34, -0.45, 0], "Andhra Pradesh": [0.72, -0.55, 0], Odisha: [0.95, 0.0, 0], "West Bengal": [1.15, 0.45, 0], Bihar: [0.75, 0.75, 0], "Uttar Pradesh": [0.3, 0.8, 0], "Madhya Pradesh": [-0.2, 0.25, 0], Chhattisgarh: [0.32, 0.2, 0], Jharkhand: [0.8, 0.48, 0], Haryana: [-0.45, 0.98, 0], "Himachal Pradesh": [-0.45, 1.38, 0], Uttarakhand: [0.0, 1.35, 0], Assam: [1.52, 0.7, 0],
};

const categoryColors: Record<string, string> = { Infrastructure: "#55d9ff", Transportation: "#55d9ff", Climate: "#ffc35a", Environment: "#7be6a6", Energy: "#b28cff", Water: "#55d9ff", Healthcare: "#ff7d8c", Agriculture: "#7be6a6", Technology: "#b28cff", "Public Safety": "#ff7d8c", Education: "#b28cff", Manufacturing: "#ffc35a", "Urban Development": "#55d9ff", General: "#b5c2d6" };

function offset(id: string) { return ((id.charCodeAt(0) % 7) - 3) * 0.06; }

function SignalNode({ article, onSelect }: { article: NewsArticle; onSelect: (article: NewsArticle) => void }) {
  const mesh = useRef<Mesh>(null); const [hovered, setHovered] = useState(false);
  const base = REGION_POSITIONS[article.region] ?? REGION_POSITIONS.India;
  const color = categoryColors[article.category] ?? categoryColors.General;
  useFrame(({ clock }) => { if (mesh.current) mesh.current.scale.setScalar(hovered ? 1.55 : 1 + Math.sin(clock.elapsedTime * 2 + base[0]) * 0.14); });
  return <group position={[base[0] + offset(article.id), base[1] + offset(article.id.slice(1)), 0.18]}>
    <mesh ref={mesh} onPointerOver={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }} onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }} onClick={(event) => { event.stopPropagation(); onSelect(article); }}>
      <sphereGeometry args={[0.075, 18, 18]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 3 : 1.5} />
    </mesh>
    {hovered && <Html distanceFactor={7} position={[0.16, 0.12, 0]}><div className="scene-tooltip"><strong>{article.title}</strong><span>{article.source_name} · {article.region}</span></div></Html>}
  </group>;
}

export function SignalNodes({ articles, onSelect }: { articles: NewsArticle[]; onSelect: (article: NewsArticle) => void }) {
  return <>{articles.slice(0, 24).map((article) => <SignalNode key={article.id} article={article} onSelect={onSelect} />)}</>;
}
