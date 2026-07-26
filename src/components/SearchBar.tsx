import { useState, useMemo, useCallback } from 'react';

interface SearchDoc {
  slug: string;
  title: string;
  agency: string;
  category: string;
  year: number;
  location?: string;
  summary: string;
  release?: string;
}

interface Props {
  documents: SearchDoc[];
  suggestedQueries?: string[];
}

const AGENCY_COLORS: Record<string, string> = {
  DOW: '#f59e0b', FBI: '#3b82f6', NASA: '#06b6d4', DOS: '#a855f7', NARA: '#10b981', CIA: '#f97316', ODNI: '#14b8a6', DOE: '#eab308', OTHER: '#6b7280',
};

export default function SearchBar({ documents, suggestedQueries = [] }: Props) {
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
        (d.release && d.release.toLowerCase().includes(q)) ||
        (d.location && d.location.toLowerCase().includes(q)) ||
        String(d.year).includes(q)
      )
      .slice(0, 8);
  }, [query, documents]);

  const handleFocus = useCallback(() => setIsOpen(true), []);
  const handleBlur = useCallback(() => setTimeout(() => setIsOpen(false), 200), []);
  const handleSuggestion = useCallback((term: string) => {
    setQuery(term);
    setIsOpen(true);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto" id="search-component">
      <div className="relative">
        {/* Terminal prompt prefix */}
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-cyan-300/70 tracking-wider select-none pointer-events-none">
          &gt;_
        </span>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search title, agency, location, year..."
          className="w-full px-5 py-3 pl-12 rounded border border-[rgba(6,182,212,0.28)] bg-[rgba(6,11,20,0.92)] text-white placeholder:text-[#7a9fd4] focus:outline-none focus:border-[rgba(34,211,238,0.75)] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.12),0_0_20px_rgba(6,182,212,0.12)] backdrop-blur-xl transition-all text-sm font-mono tracking-wide"
          id="search-input"
          aria-label="Search the UFO document archive"
        />
        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a9fd4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-[#7a9fd4] hover:text-cyan-300 transition-colors text-xs font-mono"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>

      {suggestedQueries.length > 0 && (!query || query.length < 2) && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-space-300">
          <span className="text-space-300">Try</span>
          {suggestedQueries.map(term => (
            <button
              type="button"
              key={term}
              onMouseDown={event => event.preventDefault()}
              onClick={() => handleSuggestion(term)}
              className="rounded border border-cyan-glow/25 bg-space-900/70 px-2.5 py-1 text-cyan-bright transition-colors hover:border-cyan-bright hover:bg-cyan-glow/10"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {isOpen && results.length > 0 && (
        <div className="mt-2 w-full rounded border border-[rgba(6,182,212,0.24)] bg-[rgba(6,11,20,0.97)] backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden max-h-[360px] overflow-y-auto">
          {/* Terminal header */}
          <div className="px-4 py-1.5 border-b border-[rgba(6,182,212,0.12)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/60"></span>
            <span className="text-[9px] font-mono text-[#7a9fd4] tracking-widest uppercase">Query Results - {results.length} matches</span>
          </div>
          {results.map((doc, i) => (
            <a
              key={doc.slug}
              href={`/documents/${doc.slug}/`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[rgba(6,182,212,0.08)] transition-colors border-b border-[rgba(6,182,212,0.08)] last:border-0 group"
              id={`search-result-${i}`}
            >
              <span className="text-[9px] font-mono text-[#7a9fd4] shrink-0 w-4 text-right">{String(i + 1).padStart(2, '0')}</span>
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
                <div className="text-sm text-white truncate group-hover:text-cyan-300 transition-colors font-medium">{doc.title}</div>
                <div className="text-[10px] text-[#7a9fd4] truncate font-mono">
                  {doc.release ? `${doc.release} / ` : ''}{doc.category.replace(/-/g, ' ')} {doc.location ? `/ ${doc.location}` : ''} / {doc.year}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="mt-2 w-full rounded border border-[rgba(6,182,212,0.18)] bg-[rgba(6,11,20,0.97)] backdrop-blur-2xl shadow-2xl p-5 text-center">
          <div className="text-[#7a9fd4] text-xs font-mono">
            <span className="text-red-500/60">ERR</span> No documents found matching "{query}"
          </div>
        </div>
      )}
    </div>
  );
}
