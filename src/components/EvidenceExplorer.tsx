import { useMemo, useState } from 'react';
import type { ToolDoc } from '../data/toolData';
import type { EvidenceLabel } from '../data/evidence';

interface Props {
  docs: ToolDoc[];
  labelOrder: EvidenceLabel[];
  labelInfo: Record<EvidenceLabel, { label: string; color: string; layer: 'derived' | 'editorial'; description: string }>;
}

export default function EvidenceExplorer({ docs, labelOrder, labelInfo }: Props) {
  const [active, setActive] = useState<Set<EvidenceLabel>>(new Set());

  const counts = useMemo(() => {
    const m = new Map<EvidenceLabel, number>();
    for (const l of labelOrder) m.set(l, 0);
    for (const d of docs) for (const l of d.evidenceLabels) m.set(l, (m.get(l) || 0) + 1);
    return m;
  }, [docs, labelOrder]);

  const filtered = useMemo(() => {
    if (active.size === 0) return docs;
    return docs.filter(d => d.evidenceLabels.some(l => active.has(l)));
  }, [docs, active]);

  const toggle = (l: EvidenceLabel) => {
    setActive(prev => {
      const next = new Set(prev);
      if (next.has(l)) next.delete(l); else next.add(l);
      return next;
    });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {labelOrder.map(l => {
          const info = labelInfo[l];
          const selected = active.has(l);
          return (
            <button
              key={l}
              onClick={() => toggle(l)}
              title={info.description}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded border transition-all cursor-pointer ${
                selected ? 'text-white' : 'text-space-400 hover:text-white'
              }`}
              style={selected ? { borderColor: info.color + '88', background: info.color + '18', color: info.color } : { borderColor: 'var(--color-space-700)' }}
            >
              {info.label} <span className="opacity-60">({counts.get(l) || 0})</span>
            </button>
          );
        })}
        {active.size > 0 && (
          <button onClick={() => setActive(new Set())} className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded border border-space-700 text-space-500 hover:text-white cursor-pointer">
            Clear
          </button>
        )}
        <span className="ml-auto text-[10px] font-mono text-space-400 tracking-wider self-center">{filtered.length} of {docs.length} records</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {filtered.slice(0, 120).map(d => (
          <a
            key={d.slug}
            href={`/documents/${d.slug}`}
            className="doc-card p-3 group cursor-pointer"
          >
            <div className="text-[11px] text-white leading-snug line-clamp-2 group-hover:text-cyan-bright transition-colors">{d.title}</div>
            <div className="text-[9px] font-mono text-space-500 mt-1.5">{d.agency} · {d.release} · {d.year}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {d.evidenceLabels.map(l => (
                <span key={l} className="w-1.5 h-1.5 rounded-full" style={{ background: labelInfo[l].color }} title={labelInfo[l].label}></span>
              ))}
            </div>
          </a>
        ))}
      </div>
      {filtered.length > 120 && (
        <p className="text-[10px] font-mono text-space-500 mt-4">
          Showing the first 120 of {filtered.length} matching records. Narrow the filter or browse the full{' '}
          <a href="/documents" className="text-cyan-bright hover:underline">document database</a>.
        </p>
      )}
    </div>
  );
}
