// Compact document summaries shared by the /tools pages.
// Built at compile time from the full catalog; only ships the fields the tools need.

import { documents } from './documents';
import { GEO_OVERLAY, UNMAPPABLE_LOCATIONS } from './geo';
import type { GeoPrecision } from './geo';

export interface ToolDoc {
  slug: string;
  title: string;
  agency: string;
  year: number;
  release: string;
  location?: string;
  fileTypes: string[];
}

export interface MapLocation {
  name: string;
  lat: number;
  lng: number;
  precision: GeoPrecision;
  note?: string;
  docs: ToolDoc[];
}

export function getToolDocs(): ToolDoc[] {
  return documents.map(d => ({
    slug: d.slug,
    title: d.title,
    agency: d.agency,
    year: d.year,
    release: d.releaseLabel || 'Release 01',
    location: d.location?.name,
    fileTypes: [...new Set(d.files.map(f => f.type))],
  }));
}

export function getMapLocations(): { locations: MapLocation[]; unmappableCount: number; unlocatedCount: number } {
  const docs = getToolDocs();
  const byName = new Map<string, ToolDoc[]>();
  let unmappableCount = 0;
  let unlocatedCount = 0;

  for (const doc of docs) {
    if (!doc.location) {
      unlocatedCount++;
      continue;
    }
    if (UNMAPPABLE_LOCATIONS.has(doc.location)) {
      unmappableCount++;
      continue;
    }
    const list = byName.get(doc.location) || [];
    list.push(doc);
    byName.set(doc.location, list);
  }

  const locations: MapLocation[] = [];
  for (const [name, locDocs] of byName) {
    const geo = GEO_OVERLAY[name];
    if (!geo) {
      // No coordinates yet — count as unlocated rather than silently dropping.
      unlocatedCount += locDocs.length;
      continue;
    }
    locations.push({ name, ...geo, docs: locDocs });
  }
  locations.sort((a, b) => b.docs.length - a.docs.length);

  return { locations, unmappableCount, unlocatedCount };
}

export const RELEASES = ['Release 01', 'Release 02', 'Release 03', 'Release 04'];

export const RELEASE_COLORS: Record<string, string> = {
  'Release 01': '#22d3ee', // cyan-bright
  'Release 02': '#fbbf24', // amber-bright
  'Release 03': '#00ff88', // neon-green
  'Release 04': '#a855f7', // purple
};
