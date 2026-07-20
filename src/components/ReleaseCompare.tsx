import { useMemo, useState } from 'react';
import type { ToolDoc } from '../data/toolData';

interface Props {
  docs: ToolDoc[];
  releases: string[];
  releaseColors: Record<string, string>;
}

interface ReleaseStats {
  total: number;
  agencies: [string, number][];
  fileTypes: [string, number][];
  yearMin: number | null;
  yearMax: number | null;
  topLocations: [string, number][];
}

function computeStats(docs: ToolDoc[]): ReleaseStats {
  const agencies = new Map<string, number>();
  const fileTypes = new Map<string, number>();
  const locations = new Map<string, number>();
  let yearMin: number | null = null;
  let yearMax: number | null = null;

  for (const d of docs) {
    agencies.set(d.agency, (agencies.get(d.agency) || 0) + 1);
    for (const t of d.fileTypes) fileTypes.set(t, (fileTypes.get(t) || 0) + 1);
    if (d.location) locations.set(d.location, (locations.get(d.location) || 0) + 1);
    if (yearMin === null || d.year < yearMin) yearMin = d.year;
    if (yearMax === null || d.year > yearMax) yearMax = d.year;
  }
  const sortDesc = (m: Map<string, number>) => [...m.entries()].sort((a, b) => b[1] - a[1]);
  return {
    total: docs.length,
    agencies: sortDesc(agencies),
    fileTypes: sortDesc(fileTypes),
    yearMin,
    yearMax,
    topLocations: sortDesc(locations).slice(0, 5),
  };
}

function BarRow({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-mono">
      <span className="w-20 shrink-0 text-space-300 truncate">{label}</span>
      <div className="flex-1 h-3 bg-space-800 rounded-sm overflow-hidden">
        <div className="h-full rounded-sm" style={{ width: `${(value / max) * 100}%`, backgroundColor: color, opacity: 0.7 }} />
      </div>
      <span className="w-8 text-right text-space-200">{value}</span>
    </div>
  );
}

function StatsColumn({ release, stats, color }: { release: string; stats: ReleaseStats; color: string }) {
  const maxAgency = Math.max(1, ...stats.agencies.map(([, n]) => n));
  const maxType = Math.max(1, ...stats.fileTypes.map(([, n]) => n));
  return (
    <div className="doc-card p-5 flex-1 min-w-0">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="font-mono text-xs uppercase tracking-widest" style={{ color }}>{release}</h3>
        <span className="font-display text-3xl font-bold text-white">{stats.total}</span>
      </div>
      <div className="text-[10px] font-mono text-space-500 uppercase tracking-widest mb-1">Event years</div>
      <div className="text-sm font-mono text-space-200 mb-4">
        {stats.yearMin === stats.yearMax ? stats.yearMin : `${stats.yearMin} – ${stats.yearMax}`}
      </div>

      <div className="text-[10px] font-mono text-space-500 uppercase tracking-widest mb-2">By agency</div>
      <div className="space-y-1.5 mb-4">
        {stats.agencies.map(([a, n]) => <BarRow key={a} label={a} value={n} max={maxAgency} color={color} />)}
      </div>

      <div className="text-[10px] font-mono text-space-500 uppercase tracking-widest mb-2">By file type</div>
      <div className="space-y-1.5 mb-4">
        {stats.fileTypes.map(([t, n]) => <BarRow key={t} label={t} value={n} max={maxType} color={color} />)}
      </div>

      <div className="text-[10px] font-mono text-space-500 uppercase tracking-widest mb-2">Top locations</div>
      <ul className="space-y-1 text-[11px] font-mono text-space-300">
        {stats.topLocations.length === 0 && <li className="text-space-500">No location data</li>}
        {stats.topLocations.map(([loc, n]) => (
          <li key={loc} className="flex justify-between gap-2">
            <span className="truncate">{loc}</span>
            <span className="text-space-200 shrink-0">{n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ReleaseCompare({ docs, releases, releaseColors }: Props) {
  const [left, setLeft] = useState(releases[releases.length - 2] || releases[0]);
  const [right, setRight] = useState(releases[releases.length - 1]);

  const leftStats = useMemo(() => computeStats(docs.filter(d => d.release === left)), [docs, left]);
  const rightStats = useMemo(() => computeStats(docs.filter(d => d.release === right)), [docs, right]);

  const selector = (value: string, onChange: (v: string) => void, id: string) => (
    <select
      id={id}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="bg-space-800 border border-space-600 text-white text-xs font-mono uppercase tracking-wider rounded px-3 py-2 cursor-pointer focus:border-cyan-glow outline-none"
    >
      {releases.map(r => <option key={r} value={r}>{r}</option>)}
    </select>
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <label htmlFor="cmp-left" className="text-[10px] font-mono text-space-500 uppercase tracking-widest">Compare</label>
        {selector(left, setLeft, 'cmp-left')}
        <span className="text-space-500 font-mono text-xs">vs</span>
        {selector(right, setRight, 'cmp-right')}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <StatsColumn release={left} stats={leftStats} color={releaseColors[left] || '#22d3ee'} />
        <StatsColumn release={right} stats={rightStats} color={releaseColors[right] || '#fbbf24'} />
      </div>

      <div className="mt-6 doc-card p-4 text-[11px] font-mono text-space-400 leading-relaxed">
        // Counts are per indexed record in this archive, not per page or per file. A record can contain multiple files.
        Totals here reflect what this site has indexed from War.gov and may lag the official portal by a short time after a new release.
      </div>
    </div>
  );
}
