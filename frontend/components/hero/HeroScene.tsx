"use client";

import { ForgeScene } from "../scene/ForgeScene";

export function HeroScene({ reducedMotion }: { reducedMotion: boolean }) {
  return <ForgeScene reducedMotion={reducedMotion} label="Animated ForgeAI geographic signal field" />;
}
