"use client";

import { useEffect, useState } from "react";
import { getNews, type NewsFeed } from "../lib/api";

const regions = ["India", "Tamil Nadu", "Kerala", "Karnataka", "Maharashtra", "Telangana", "Andhra Pradesh", "Delhi", "Gujarat", "Rajasthan", "Uttar Pradesh", "West Bengal", "Odisha", "Punjab", "Bihar"];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function Home() {
  const [region, setRegion] = useState("India");
  const [feed, setFeed] = useState<NewsFeed | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(null);
    getNews(region, controller.signal).then(setFeed).catch((reason: unknown) => {
      if ((reason as Error).name !== "AbortError") setError(reason instanceof Error ? reason.message : "Unable to load live signals.");
    }).finally(() => setLoading(false));
    return () => controller.abort();
  }, [region]);

  return <main className="min-h-screen bg-ink text-slate-100">
    <section className="relative overflow-hidden border-b border-slate-800"><div className="grid-background absolute inset-0" />
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8"><a className="flex items-center gap-3 font-semibold" href="#top"><span className="grid h-9 w-9 place-items-center rounded-lg bg-forge text-lg font-black text-ink">F</span>Forge<span className="-ml-3 text-forge">AI</span></a><a className="rounded-full border border-slate-600 px-4 py-2 text-sm" href="#signals">Live signals</a></nav>
      <div id="top" className="relative mx-auto max-w-6xl px-6 pb-16 pt-12 lg:px-8 lg:pb-24"><p className="text-sm font-semibold uppercase tracking-[.18em] text-forge">Regional intelligence</p><h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">Explore live signals shaping <span className="text-forge">India&apos;s engineering challenges.</span></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">ForgeAI collects regional news as input for future problem discovery. This phase surfaces source-backed live signals—without AI analysis or recommendations.</p></div>
    </section>
    <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8"><div className="rounded-2xl border border-slate-700 bg-panel/70 p-5"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-wider text-forge">Choose a region</p><h2 className="mt-2 text-2xl font-semibold text-white">Regional signal scanner</h2><p className="mt-1 text-sm text-slate-400">Select a region now; this selector is ready for a future geographic visualization.</p></div><label className="text-sm text-slate-300">Region<select value={region} onChange={(event) => setRegion(event.target.value)} className="mt-2 block w-full rounded-lg border border-slate-600 bg-ink px-4 py-3 text-white outline-none focus:border-forge sm:w-64">{regions.map((item) => <option key={item}>{item}</option>)}</select></label></div><div className="mt-5 flex flex-wrap gap-2">{regions.map((item) => <button key={item} onClick={() => setRegion(item)} className={`rounded-full px-3 py-1.5 text-sm transition ${region === item ? "bg-forge font-semibold text-ink" : "border border-slate-600 text-slate-300 hover:border-slate-400"}`}>{item}</button>)}</div></div></section>
    <section id="signals" className="mx-auto max-w-6xl px-6 pb-20 lg:px-8"><div className="flex items-end justify-between border-b border-slate-800 pb-5"><div><p className="text-sm font-semibold uppercase tracking-wider text-forge">Live signals</p><h2 className="mt-2 text-3xl font-semibold text-white">{region}</h2></div>{feed && <p className="text-sm text-slate-400">{feed.count} recent signals</p>}</div>
      {loading && <p className="py-16 text-lg text-slate-300">Scanning live signals...</p>}
      {error && <div className="my-8 rounded-xl border border-red-400/30 bg-red-400/10 p-5 text-red-100"><p className="font-semibold">Couldn&apos;t reach the signal feed.</p><p className="mt-1 text-sm">{error} Check that the backend is running and try again.</p></div>}
      {!loading && !error && feed?.articles.length === 0 && <p className="py-16 text-lg text-slate-400">No recent signals were found for this region.</p>}
      <div className="grid gap-5 py-7 md:grid-cols-2">{feed?.articles.map((article) => <article key={article.id} className="flex flex-col rounded-2xl border border-slate-700 bg-panel/40 p-6"><div className="flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-orange-300/10 px-2.5 py-1 text-orange-200">{article.category}</span><span className="rounded-full border border-slate-700 px-2.5 py-1 text-slate-400">{article.region}</span></div><h3 className="mt-5 text-xl font-semibold leading-7 text-white">{article.title}</h3><p className="mt-3 line-clamp-3 leading-6 text-slate-400">{article.description || "No source description was provided for this signal."}</p><div className="mt-6 flex items-end justify-between gap-3 text-sm"><p className="text-slate-500">{article.source_name}<br />{formatDate(article.published_at)}</p><a className="font-semibold text-forge hover:text-orange-300" href={article.source_url} target="_blank" rel="noreferrer">View source →</a></div></article>)}</div>
      <p className="text-sm leading-6 text-slate-500">Signals are collected from configured public RSS feeds and classified with transparent keyword/location rules. Geographic classification is not perfect and is not AI problem analysis.</p>
    </section>
  </main>;
}
