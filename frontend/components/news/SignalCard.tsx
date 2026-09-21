"use client";

import type { NewsArticle } from "../../lib/api";

export function SignalCard({ article, onSelect }: { article: NewsArticle; onSelect: (article: NewsArticle) => void }) {
  return <article data-signal-card className="signal-card"><div className="card-labels"><span>{article.category}</span><span>{article.region}</span></div><button onClick={() => onSelect(article)} className="signal-card-title" aria-label={`Inspect live signal: ${article.title}`}>{article.title}</button><p>{article.description || "No source description was provided for this live signal."}</p><div className="card-footer"><div><strong>{article.source_name}</strong><time dateTime={article.published_at}>{new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(article.published_at))}</time></div><a href={article.source_url} target="_blank" rel="noreferrer">Source ↗</a></div></article>;
}
