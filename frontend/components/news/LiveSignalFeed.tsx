"use client";

import { useLayoutEffect, useRef } from "react";
import type { NewsArticle } from "../../lib/api";
import { getGsap, prefersReducedMotion } from "../../lib/gsap/animations";
import { SignalCard } from "./SignalCard";

export function LiveSignalFeed({ region, articles, loading, error, onSelect }: { region: string; articles: NewsArticle[]; loading: boolean; error: string | null; onSelect: (article: NewsArticle) => void }) {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => { if (!ref.current || loading || prefersReducedMotion()) return; const context = getGsap().context(() => getGsap().from("[data-signal-card]", { y: 18, opacity: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" }), ref); return () => context.revert(); }, [articles, loading]);
  return <section ref={ref} id="signals" className="live-feed"><div className="feed-header"><div><p className="eyebrow signal">Live signal feed</p><h2>{region}</h2></div><p>{loading ? "Updating field…" : `${articles.length} returned signals`}</p></div>{loading && <div className="feed-state"><span className="scan-dot" />Scanning live signals...</div>}{error && <div className="feed-state error"><strong>Unable to reach live signals.</strong><br />{error} Ensure the local backend is running.</div>}{!loading && !error && articles.length === 0 && <div className="feed-state">No recent signals were found for this region.</div>}{!loading && !error && <div className="signal-grid">{articles.map((article) => <SignalCard key={article.id} article={article} onSelect={onSelect} />)}</div>}</section>;
}
