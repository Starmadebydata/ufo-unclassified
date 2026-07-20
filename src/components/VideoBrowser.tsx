import { useEffect, useMemo, useState } from 'react';
import type { VideoEntry } from '../data/toolData';

interface Props {
  videos: VideoEntry[];
  releases: string[];
  releaseColors: Record<string, string>;
}

export default function VideoBrowser({ videos, releases, releaseColors }: Props) {
  const [release, setRelease] = useState<string>('all');
  const [agency, setAgency] = useState<string>('all');
  const [active, setActive] = useState<VideoEntry | null>(null);

  const agencies = useMemo(
    () => [...new Set(videos.map(v => v.agency))].sort(),
    [videos]
  );

  const filtered = useMemo(
    () => videos.filter(v =>
      (release === 'all' || v.release === release) &&
      (agency === 'all' || v.agency === agency)
    ),
    [videos, release, agency]
  );

  // Close lightbox on Escape.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  const chip = (selected: boolean, color?: string) =>
    `px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded border transition-all cursor-pointer ${
      selected ? 'text-white' : 'text-space-400 border-space-700 hover:text-white'
    }`;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[9px] font-mono text-space-500 uppercase tracking-widest w-14">Release</span>
        <button className={chip(release === 'all')} style={release === 'all' ? { borderColor: '#22d3ee88', background: '#22d3ee18' } : {}} onClick={() => setRelease('all')}>All</button>
        {releases.map(r => (
          <button
            key={r}
            className={chip(release === r)}
            style={release === r ? { borderColor: releaseColors[r] + '88', background: releaseColors[r] + '18', color: releaseColors[r] } : {}}
            onClick={() => setRelease(r)}
          >{r.replace('Release ', 'R')}</button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="text-[9px] font-mono text-space-500 uppercase tracking-widest w-14">Agency</span>
        <button className={chip(agency === 'all')} style={agency === 'all' ? { borderColor: '#22d3ee88', background: '#22d3ee18' } : {}} onClick={() => setAgency('all')}>All</button>
        {agencies.map(a => (
          <button
            key={a}
            className={chip(agency === a)}
            style={agency === a ? { borderColor: '#22d3ee88', background: '#22d3ee18' } : {}}
            onClick={() => setAgency(a)}
          >{a}</button>
        ))}
        <span className="ml-auto text-[10px] font-mono text-space-400 tracking-wider">{filtered.length} of {videos.length} videos</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map(v => (
          <button
            key={v.videoUrl}
            onClick={() => setActive(v)}
            className="doc-card p-0 overflow-hidden text-left group cursor-pointer"
          >
            <div className="relative aspect-video bg-space-900">
              {v.thumb ? (
                <img src={v.thumb} alt={`Video thumbnail: ${v.docTitle}`} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-space-600 font-mono text-[10px]">NO PREVIEW</div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-space-950/80 border border-cyan-glow/60 flex items-center justify-center">
                  <svg className="w-4 h-4 text-cyan-bright ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
              <span
                className="absolute top-1.5 left-1.5 px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-wider rounded"
                style={{ background: (releaseColors[v.release] || '#22d3ee') + '30', color: releaseColors[v.release] || '#22d3ee' }}
              >{v.release.replace('Release ', 'R')}</span>
            </div>
            <div className="p-2.5">
              <div className="text-[11px] text-white leading-snug line-clamp-2 group-hover:text-cyan-bright transition-colors">{v.docTitle}</div>
              <div className="text-[9px] font-mono text-space-500 mt-1 tracking-wider">
                {v.agency} · {v.year}{v.location ? ` · ${v.location}` : ''}
              </div>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[90] bg-space-950/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Video: ${active.docTitle}`}
        >
          <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-mono text-space-300 truncate pr-4">{active.docTitle}</div>
              <button
                onClick={() => setActive(null)}
                className="text-space-400 hover:text-white font-mono text-xs px-2 py-1 border border-space-700 rounded cursor-pointer shrink-0"
              >ESC / Close ✕</button>
            </div>
            <video
              src={active.videoUrl}
              poster={active.thumb}
              controls
              autoPlay
              playsInline
              className="w-full rounded-lg border border-cyan-glow/30 bg-black"
            />
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-[11px] font-mono">
              <a href={`/documents/${active.docSlug}`} className="text-cyan-bright hover:underline">Open record page →</a>
              {active.sourceUrl && (
                <a href={active.sourceUrl} target="_blank" rel="noopener" className="text-amber-bright hover:underline">Official source ↗</a>
              )}
              <span className="text-space-500">{active.agency} · {active.release} · {active.year}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
