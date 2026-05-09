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
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search documents by title, agency, location, year..."
          className="w-full px-5 py-3.5 pl-12 rounded-xl border border-[rgba(42,58,102,0.5)] bg-[rgba(10,14,26,0.8)] text-white placeholder:text-[#5a73b5] focus:outline-none focus:border-[#06b6d4] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)] backdrop-blur-xl transition-all text-sm"
          id="search-input"
        />
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5a73b5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5a73b5] hover:text-white transition-colors text-sm"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full rounded-xl border border-[rgba(42,58,102,0.5)] bg-[rgba(10,14,26,0.95)] backdrop-blur-xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
          {results.map((doc, i) => (
            <a
              key={doc.slug}
              href={`/documents/${doc.slug}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[rgba(6,182,212,0.08)] transition-colors border-b border-[rgba(42,58,102,0.2)] last:border-0"
              id={`search-result-${i}`}
            >
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                style={{
                  backgroundColor: `${AGENCY_COLORS[doc.agency] || '#6b7280'}20`,
                  color: AGENCY_COLORS[doc.agency] || '#6b7280',
                  border: `1px solid ${AGENCY_COLORS[doc.agency] || '#6b7280'}40`,
                }}
              >
                {doc.agency}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white truncate">{doc.title}</div>
                <div className="text-xs text-[#8a9dd4] truncate">
                  {doc.category.replace(/-/g, ' ')} {doc.location ? `· ${doc.location}` : ''} · {doc.year}
                </div>
              </div>
            </a>
          ))}
          <div className="px-4 py-2 text-xs text-[#5a73b5] bg-[rgba(15,22,41,0.5)]">
            {results.length} result{results.length !== 1 ? 's' : ''} · Press Enter to search all
          </div>
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full rounded-xl border border-[rgba(42,58,102,0.5)] bg-[rgba(10,14,26,0.95)] backdrop-blur-xl shadow-2xl p-6 text-center z-50">
          <div className="text-[#5a73b5] text-sm">No documents found for "{query}"</div>
        </div>
      )}
    </div>
  );
}
