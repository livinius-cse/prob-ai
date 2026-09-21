"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getGsap, prefersReducedMotion } from "../../lib/gsap/animations";
import { MagneticButton } from "../ui/MagneticButton";

const HeroScene = dynamic(() => import("./HeroScene").then((module) => module.HeroScene), { ssr: false, loading: () => <div className="scene-loading">Initializing signal field…</div> });

export function Hero() {
  const root = useRef<HTMLElement>(null); const [reducedMotion, setReducedMotion] = useState(true);
  useEffect(() => setReducedMotion(prefersReducedMotion()), []);
  useLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const context = getGsap().context(() => { getGsap().timeline().from("[data-hero-copy]", { y: 28, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }).from("[data-hero-scene]", { scale: 0.92, opacity: 0, duration: 1.1, ease: "power3.out" }, "<0.15"); }, root);
    return () => context.revert();
  }, []);
  return <section ref={root} id="top" className="hero-section"><div className="hero-grid" /><div className="hero-copy"><p data-hero-copy className="eyebrow signal">ForgeAI / Regional intelligence</p><h1 data-hero-copy>Discover what the world needs <span>engineers to solve.</span></h1><p data-hero-copy className="hero-description">ForgeAI transforms real-world signals into engineering opportunities.</p><div data-hero-copy className="hero-actions"><MagneticButton href="#explore">Explore India <span aria-hidden="true">↗</span></MagneticButton><MagneticButton href="#pipeline" variant="secondary">How ForgeAI Works</MagneticButton></div><p data-hero-copy className="hero-disclaimer">Live signals are active now. Problem analysis is a future capability.</p></div><div data-hero-scene className="hero-scene-wrap"><HeroScene reducedMotion={reducedMotion} /></div></section>;
}
