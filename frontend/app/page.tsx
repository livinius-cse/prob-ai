const stages = ["Signal", "Problem", "Cause", "Gap", "Opportunity"];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-ink">
      <section className="relative isolate border-b border-slate-800">
        <div className="grid-background absolute inset-0 -z-10" />
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
          <a className="flex items-center gap-3 font-semibold tracking-tight" href="#top" aria-label="ForgeAI home">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-forge text-lg font-black text-ink">F</span>
            <span>Forge<span className="text-forge">AI</span></span>
          </a>
          <a href="#dashboard" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-forge hover:text-white">Product preview</a>
        </nav>

        <div id="top" className="mx-auto max-w-6xl px-6 pb-24 pt-16 text-center lg:px-8 lg:pb-32 lg:pt-24">
          <p className="animate-rise mx-auto mb-6 w-fit rounded-full border border-orange-300/20 bg-orange-300/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-orange-200">Engineering problem discovery</p>
          <h1 className="animate-rise mx-auto max-w-4xl text-5xl font-semibold tracking-tight text-white [animation-delay:100ms] sm:text-6xl lg:text-7xl">Discover what the world needs solved — <span className="text-forge">and what you could build.</span></h1>
          <p className="animate-rise mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-300 [animation-delay:200ms]">ForgeAI is a workspace for turning real-world challenges into clearer engineering opportunities. Start with the signal, then build toward a solution with confidence.</p>
          <div className="animate-rise mt-10 flex flex-col justify-center gap-3 sm:flex-row [animation-delay:300ms]">
            <a href="#dashboard" className="rounded-full bg-forge px-6 py-3 font-semibold text-ink transition hover:bg-orange-300">Explore Problems <span aria-hidden="true">→</span></a>
            <a href="#how-it-works" className="rounded-full border border-slate-600 px-6 py-3 font-semibold text-white transition hover:border-slate-400">How it works</a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-forge">Why ForgeAI</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Important problems are everywhere. Finding the right one is hard.</h2>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-slate-300">Engineers often see the world&apos;s symptoms without a clear path to the underlying challenge. ForgeAI is being built to connect real-world context with structured discovery—so ideas begin with needs worth solving.</p>
      </section>

      <section id="how-it-works" className="border-y border-slate-800 bg-panel/40">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-forge">How it will work</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[['1', 'Observe', 'Bring real-world events and signals into one focused workspace.'], ['2', 'Understand', 'Trace the problem context, constraints, and gaps that matter.'], ['3', 'Build', 'Turn a validated opportunity into a practical engineering direction.']].map(([number, title, description]) => (
              <article key={number} className="rounded-2xl border border-slate-700 bg-ink/70 p-6">
                <span className="text-sm font-bold text-forge">0{number}</span><h3 className="mt-8 text-xl font-semibold text-white">{title}</h3><p className="mt-3 leading-7 text-slate-400">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">The discovery workflow is planned for future phases. No live sources or analysis are connected yet.</p>
        </div>
      </section>

      <section id="dashboard" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-700 bg-panel shadow-glow">
          <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4"><div><p className="font-semibold text-white">Discovery workspace</p><p className="mt-1 text-sm text-slate-400">Foundation preview</p></div><span className="rounded-full border border-slate-600 px-3 py-1 text-xs text-slate-300">Coming soon</span></div>
          <div className="grid gap-5 p-5 md:grid-cols-[180px_1fr]">
            <aside className="rounded-xl border border-slate-700 bg-ink/60 p-4"><p className="text-xs font-medium uppercase tracking-wider text-slate-500">Workspace</p><div className="mt-4 space-y-2 text-sm"><p className="rounded-md bg-slate-800 px-3 py-2 text-white">Overview</p><p className="px-3 py-2 text-slate-500">Signals</p><p className="px-3 py-2 text-slate-500">Opportunities</p></div></aside>
            <div className="rounded-xl border border-dashed border-slate-600 bg-ink/40 p-6"><p className="text-sm font-medium text-slate-300">From real-world context to a buildable direction</p><div className="mt-8 flex flex-wrap items-center gap-2">{stages.map((stage, index) => <div key={stage} className="flex items-center gap-2"><span className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-300">{stage}</span>{index < stages.length - 1 && <span className="text-slate-600">→</span>}</div>)}</div><p className="mt-8 max-w-xl text-sm leading-6 text-slate-500">This is a product shell only. ForgeAI will populate this space once discovery capabilities are built in later phases.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
