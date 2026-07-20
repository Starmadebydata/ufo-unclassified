import { useEffect, useRef, useState } from 'react';
import type { MapLocation } from '../data/toolData';

interface Props {
  locations: MapLocation[];
  releases: string[];
  releaseColors: Record<string, string>;
  unmappableCount: number;
}

// Dominant release for a location decides marker color.
function dominantRelease(loc: MapLocation): string {
  const counts = new Map<string, number>();
  for (const d of loc.docs) counts.set(d.release, (counts.get(d.release) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

function popupHtml(loc: MapLocation, filtered: MapLocation['docs']): string {
  const precisionLabel =
    loc.precision === 'exact' ? 'Exact location' :
    loc.precision === 'approx' ? 'Approximate centroid' :
    'Broad region — indicative position only';
  const shown = filtered.slice(0, 6);
  const more = filtered.length - shown.length;
  return `
    <div style="min-width:220px;max-width:280px;font-family:'JetBrains Mono',monospace;">
      <div style="font-weight:700;color:#fff;font-size:13px;margin-bottom:2px;">${loc.name}</div>
      <div style="font-size:10px;color:#8fb0e0;margin-bottom:6px;">${precisionLabel}${loc.note ? ' · ' + loc.note : ''}</div>
      <div style="font-size:10px;color:#6f8dcc;margin-bottom:6px;">${filtered.length} record${filtered.length === 1 ? '' : 's'}</div>
      ${shown.map(d => `
        <a href="/documents/${d.slug}" style="display:block;font-size:11px;color:#22d3ee;text-decoration:none;padding:2px 0;border-top:1px solid rgba(82,112,168,.2);">
          <span style="color:#8fb0e0;">[${d.agency}]</span> ${d.title.length > 46 ? d.title.slice(0, 46) + '…' : d.title}
        </a>`).join('')}
      ${more > 0 ? `<div style="font-size:10px;color:#6f8dcc;padding-top:4px;">+ ${more} more — see <a href="/documents" style="color:#22d3ee;">document database</a></div>` : ''}
    </div>`;
}

export default function SightingMap({ locations, releases, releaseColors, unmappableCount }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const [active, setActive] = useState<Set<string>>(new Set(releases));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');
      if (cancelled || !mapRef.current || leafletRef.current) return;

      const map = L.map(mapRef.current, {
        center: [28, 10],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        worldCopyJump: true,
        attributionControl: true,
      });
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
      }).addTo(map);

      leafletRef.current = { L, map };
      layerRef.current = L.layerGroup().addTo(map);
      setReady(true);
    })();
    return () => {
      cancelled = true;
      if (leafletRef.current) {
        leafletRef.current.map.remove();
        leafletRef.current = null;
      }
    };
  }, []);

  // Redraw markers whenever the release filter changes.
  useEffect(() => {
    if (!ready || !leafletRef.current) return;
    const { L } = leafletRef.current;
    const layer = layerRef.current;
    layer.clearLayers();

    for (const loc of locations) {
      const filtered = loc.docs.filter(d => active.has(d.release));
      if (filtered.length === 0) continue;
      const color = releaseColors[dominantRelease({ ...loc, docs: filtered })] || '#22d3ee';
      const radius = Math.min(6 + Math.sqrt(filtered.length) * 3.5, 26);
      const marker = L.circleMarker([loc.lat, loc.lng], {
        radius,
        color,
        weight: 1.5,
        opacity: 0.9,
        fillColor: color,
        fillOpacity: loc.precision === 'region' ? 0.12 : 0.3,
        dashArray: loc.precision === 'region' ? '4 4' : undefined,
      });
      marker.bindPopup(popupHtml(loc, filtered), { className: 'sighting-popup' });
      marker.bindTooltip(`${loc.name} (${filtered.length})`, { direction: 'top', opacity: 0.9 });
      marker.addTo(layer);
    }
  }, [ready, active, locations, releaseColors]);

  const toggle = (r: string) => {
    setActive(prev => {
      const next = new Set(prev);
      if (next.has(r)) { if (next.size > 1) next.delete(r); } else next.add(r);
      return next;
    });
  };

  const visibleCount = locations.reduce(
    (sum, loc) => sum + loc.docs.filter(d => active.has(d.release)).length, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {releases.map(r => (
          <button
            key={r}
            onClick={() => toggle(r)}
            className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded border transition-all cursor-pointer ${
              active.has(r)
                ? 'text-white border-transparent'
                : 'text-space-500 border-space-700 opacity-50'
            }`}
            style={active.has(r) ? { backgroundColor: releaseColors[r] + '22', borderColor: releaseColors[r] + '66', color: releaseColors[r] } : {}}
          >
            <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: releaseColors[r] }}></span>
            {r}
          </button>
        ))}
        <span className="ml-auto text-[10px] font-mono text-space-400 tracking-wider">
          {visibleCount} mapped records · {unmappableCount} orbital/undisclosed records not shown
        </span>
      </div>

      <div
        ref={mapRef}
        className="w-full rounded-lg border border-cyan-glow/20 overflow-hidden"
        style={{ height: '560px', background: '#060b14' }}
      />

      <div className="flex flex-wrap gap-4 mt-3 text-[10px] font-mono text-space-400 tracking-wider">
        <span><span className="inline-block w-3 h-3 rounded-full border border-space-400 mr-1.5 align-middle" style={{ background: 'rgba(143,176,224,.3)' }}></span>Solid fill — exact or country-level location</span>
        <span><span className="inline-block w-3 h-3 rounded-full border border-dashed border-space-400 mr-1.5 align-middle"></span>Dashed — broad operational region, indicative position only</span>
        <span>Marker size scales with record count</span>
      </div>
    </div>
  );
}
