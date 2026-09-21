"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "../../lib/gsap/animations";

const stages = ["Live signal", "Problem", "Root cause", "Innovation gap", "Opportunity", "Build"];

export function DiscoveryPipeline() {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => { if (!ref.current || prefersReducedMotion()) return; const context = getGsap().context(() => getGsap().from("[data-pipeline-stage]", { scrollTrigger: { trigger: ref.current, start: "top 80%" }, y: 18, opacity: 0, stagger: 0.08, duration: 0.5 }), ref); return () => context.revert(); }, []);
  return <section ref={ref} id="pipeline" className="pipeline-section"><p className="eyebrow">ForgeAI pathway</p><h2>From a live signal to a buildable direction.</h2><div className="pipeline-track">{stages.map((stage, index) => <div data-pipeline-stage key={stage} className={`pipeline-stage ${index === 0 ? "active" : "future"}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong><small>{index === 0 ? "Active now" : "Future capability"}</small></div>)}</div><p className="pipeline-note">Only <strong>Live signal</strong> is active in Phase 2B. ForgeAI does not yet perform problem, root-cause, gap, or solution analysis.</p></section>;
}
