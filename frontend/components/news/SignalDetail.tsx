"use client";

import { useEffect, useRef } from "react";
import type { NewsArticle } from "../../lib/api";
import { getGsap, prefersReducedMotion } from "../../lib/gsap/animations";

export function SignalDetail({ article, onClose }: { article: NewsArticle | null; onClose: () => void }) {
  const panel = useRef<HTMLElement>(null);
  useEffect(() => { if (article && panel.current && !prefersReducedMotion()) getGsap().fromTo(panel.current, { x: 28, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: "power3.out" }); }, [article]);
  if (!article) return null;
  return <aside ref={panel} className="signal-detail" role="dialog" aria-modal="true" aria-label="Live signal detail"><button className="detail-close" onClick={onClose} aria-label="Close signal detail">×</button><p className="eyebrow signal">Live signal</p><div className="detail-meta"><span>{article.category}</span><span>{article.region}</span></div><h3>{article.title}</h3><p>{article.description || "No source description was supplied for this live signal."}</p><div className="detail-source"><strong>{article.source_name}</strong><time dateTime={article.published_at}>{new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(article.published_at))}</time></div><a className="source-button" href={article.source_url} target="_blank" rel="noreferrer">Read original source <span aria-hidden="true">↗</span></a><p className="detail-future">Live signal ↓ <br />Problem analysis coming next</p></aside>;
}
