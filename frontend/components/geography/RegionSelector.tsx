"use client";

const featuredRegions = ["India", "Tamil Nadu", "Kerala", "Karnataka", "Maharashtra", "Telangana", "Andhra Pradesh", "Delhi", "Gujarat", "Rajasthan", "Uttar Pradesh", "West Bengal", "Odisha", "Punjab", "Bihar"];

export function RegionSelector({ region, onChange }: { region: string; onChange: (region: string) => void }) {
  return <div className="region-selector">
    <div><p className="eyebrow">Geographic intelligence</p><h2 className="mt-2 text-2xl font-semibold text-white">Explore India&apos;s live signals</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">Choose a region to focus the signal field and retrieve its source-backed live feed.</p></div>
    <label className="region-select-label">Active region<select aria-label="Select an Indian region" value={region} onChange={(event) => onChange(event.target.value)}>{featuredRegions.map((item) => <option key={item}>{item}</option>)}</select></label>
    <div className="region-chips">{featuredRegions.map((item) => <button key={item} onClick={() => onChange(item)} aria-pressed={region === item} className={region === item ? "active" : ""}>{item}</button>)}</div>
  </div>;
}
