"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CursorParallax } from "../components/hero/CursorParallax";
import { Hero } from "../components/hero/Hero";
import { RegionSelector } from "../components/geography/RegionSelector";
import { LiveSignalFeed } from "../components/news/LiveSignalFeed";
import { SignalDetail } from "../components/news/SignalDetail";
import { DiscoveryPipeline } from "../components/pipeline/DiscoveryPipeline";
import { GlassPanel } from "../components/ui/GlassPanel";
import { getNews, type NewsArticle, type NewsFeed } from "../lib/api";
import { prefersReducedMotion } from "../lib/gsap/animations";

const ForgeScene = dynamic(() => import("../components/scene/ForgeScene").then((module) => module.ForgeScene), { ssr: false, loading: () => <div className="scene-loading">Loading geographic signal field…</div> });

export default function Home() {
  const [region, setRegion] = useState("India");
  const [feed, setFeed] = useState<NewsFeed | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<NewsArticle | null>(null);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => setReducedMotion(prefersReducedMotion()), []);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(null); setSelected(null);
    getNews(region, controller.signal).then(setFeed).catch((reason: unknown) => {
      if ((reason as Error).name !== "AbortError") setError(reason instanceof Error ? reason.message : "Unable to load live signals.");
    }).finally(() => setLoading(false));
    return () => controller.abort();
  }, [region]);

  const articles = feed?.articles ?? [];
  return <main><CursorParallax /><Hero /><section id="explore" className="explore-section"><div className="section-heading"><p className="eyebrow signal">Explore India</p><h2>Watch the geographic signal field respond.</h2><p>Every node represents a returned Phase 2A live signal. Select a region or inspect a node to open its source-backed detail.</p></div><GlassPanel className="explore-panel"><RegionSelector region={region} onChange={setRegion} /><div className="scene-and-status"><div className="explore-scene"><ForgeScene articles={articles} onSignalSelect={setSelected} reducedMotion={reducedMotion} label={`Stylized signal field for ${region}`} /></div><div className="field-status"><span className="status-light" /><p>Active geography</p><strong>{region}</strong><small>{loading ? "Scanning live sources" : `${articles.length} live signals returned`}</small><div className="status-divider" /><p className="future-label">LIVE SIGNAL <span>↓</span> PROBLEM ANALYSIS</p><small>Future capability — no AI analysis is performed in this phase.</small></div></div></GlassPanel></section><LiveSignalFeed region={region} articles={articles} loading={loading} error={error} onSelect={setSelected} /><DiscoveryPipeline /><SignalDetail article={selected} onClose={() => setSelected(null)} /></main>;
}
