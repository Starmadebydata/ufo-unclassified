import { useState, useMemo, useCallback } from 'react';

interface SearchDoc {
  slug: string;
  title: string;
  agency: string;
  category: string;
  year: number;
  location?: string;
  summary: string;
}

interface Props {
  documents: SearchDoc[];
}

const AGENCY_COLORS: Record<string, string> = {
  DOW: '#f59e0b', FBI: '#3b82f6', NASA: '#06b6d4', DOS: '#a855f7', NARA: '#10b981', OTHER: '#6b7280',
};

export default function SearchBar({ documents }: Props) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return documents
      .filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.agency.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        (d.location && d.location.toLowerCase().includes(q)) ||
        String(d.year).includes(q)
      )
      .slice(0, 8);
  }, [query, documents]);

  const handleFocus = useCallback(() => setIsOpen(true), []);
  const handleBlur = useCallback(() => setTimeout(() => setIsOpen(false), 200), []);

  return (
    <div className="relative w-full max-w-xl mx-auto" id="search-component">
      <div className="relative">
        {/* Terminal prompt prefix */}
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-cyan-400/40 tracking-wider select-none pointer-events-none">
          &gt;_
        </span>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search documents by title, agency, location, year..."
          className="w-full px-5 py-3 pl-12 rounded border border-[rgba(6,182,212,0.15)] bg-[rgba(6,11,20,0.9)] text-white placeholder:text-[#334d8a] focus:outline-none focus:border-[rgba(6,182,212,0.4)] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.08),0_0_20px_rgba(6,182,212,0.05)] backdrop-blur-xl transition-all text-xs font-mono tracking-wide"
          id="search-input"
        />
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#334d8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-[#334d8a] hover:text-cyan-400 transition-colors text-xs font-mono"
          >
            [ESC]
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full rounded border border-[rgba(6,182,212,0.15)] bg-[rgba(6,11,20,0.97)] backdrop-blur-2xl shadow-2xl shadow-black/60 z-50 overflow-hidden">
          {/* Terminal header */}
          <div className="px-4 py-1.5 border-b border-[rgba(6,182,212,0.08)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/60"></span>
            <span className="text-[9px] font-mono text-[#334d8a] tracking-widest uppercase">Query Results — {results.length} matches</span>
          </div>
          {results.map((doc, i) => (
            <a
              key={doc.slug}
              href={`/documents/${doc.slug}`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[rgba(6,182,212,0.06)] transition-colors border-b border-[rgba(6,182,212,0.05)] last:border-0 group"
              id={`search-result-${i}`}
            >
              <span className="text-[9px] font-mono text-[#334d8a] shrink-0 w-4 text-right">{String(i + 1).padStart(2, '0')}</span>
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 shrink-0 font-mono tracking-wider"
                style={{
                  backgroundColor: `${AGENCY_COLORS[doc.agency] || '#6b7280'}12`,
                  color: AGENCY_COLORS[doc.agency] || '#6b7280',
                  border: `1px solid ${AGENCY_COLORS[doc.agency] || '#6b7280'}30`,
                }}
              >
                {doc.agency}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white truncate group-hover:text-cyan-300 transition-colors font-medium">{doc.title}</div>
                <div className="text-[10px] text-[#5070b0] truncate font-mono">
                  {doc.category.replace(/-/g, ' ')} {doc.location ? `// ${doc.location}` : ''} // {doc.year}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full mt-1 w-full rounded border border-[rgba(6,182,212,0.1)] bg-[rgba(6,11,20,0.97)] backdrop-blur-2xl shadow-2xl p-5 text-center z-50">
          <div className="text-[#334d8a] text-xs font-mono">
            <span className="text-red-500/60">ERR</span> No documents found matching "{query}"
          </div>
        </div>
      )}
    </div>
  );
}
