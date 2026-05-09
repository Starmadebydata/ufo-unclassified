#!/usr/bin/env node
/**
 * Auto-catalog script v2: Scans source-files/ and generates src/data/documents.ts
 * Now with human-readable titles, summaries, and better metadata
 */
import fs from 'fs';
import path from 'path';

const SOURCE = path.resolve('source-files');
const OUT = path.resolve('src/data/documents.ts');

// ===== Human-readable title & summary overrides =====
const TITLE_MAP = {
  'fbi-photo-series-a': 'FBI FLIR/Sensor Imagery — Series A',
  'fbi-photo-series-b': 'FBI Physical Evidence Photographs — Series B',
  'dow-uap-d55-mission-report-syria-november-2016': 'P-8A Observes Unidentified Low-Flying Object — Syria, Nov 2016',
  'dow-uap-d38-range-fouler-debrief-middle-east-may-2020': 'Range Fouler Debrief — Middle East UAP Encounter, May 2020',
  'dos-uap-d1-cable-1-papua-new-guinea-january-1985': 'State Department Cable: UAP Sighting — Papua New Guinea, Jan 1985',
  'dos-uap-d2-cable-2-kazakhstan-january-1994': 'State Department Cable: UAP Report — Kazakhstan, Jan 1994',
  'nasa-uap-d1-apollo-12-transcript-1969': 'Apollo 12 Mission Transcript — Anomalous Observations, 1969',
  'nasa-uap-vm1-apollo-12-1969': 'Apollo 12 Visual Media — Lunar Surface Anomalies, 1969',
  'nasa-uap-d2-apollo-12-crew-debriefing-1969': 'Apollo 12 Crew Debriefing — UAP Discussion, 1969',
  'nasa-uap-d3-apollo-11-technical-crew-debriefing-1969': 'Apollo 11 Technical Crew Debriefing, 1969',
  'nasa-uap-d4-apollo-17-transcript-1972': 'Apollo 17 Mission Transcript — Anomalous Object, Dec 1972',
  'nasa-uap-d5-apollo-17-crew-debriefing-1973': 'Apollo 17 Crew Debriefing, Jan 1973',
  'nasa-uap-d6-skylab-technical-crew-debriefing-1973': 'Skylab Technical Crew Debriefing, 1973',
  'western-us-event-slides-5-08-2026': '"Orbs Launching Orbs" — Western US Event, May 8, 2026',
  'dow-uap-d8-mission-report-djibouti-2025': 'Mission Report: UAP Over Djibouti, 2025',
  'dow-uap-d54-mission-report-mediterranean-sea-na': 'Mission Report: Mediterranean Sea UAP Encounter',
  'dow-uap-d50-email-correspondence-indopacom-april-2025': 'INDOPACOM Email: UAP Correspondence, Apr 2025',
  'dow-uap-pr20': 'DOW Photo/Video Record PR-20',
  'dow-uap-d3-mission-report-arabian-gulf-july-2020': 'Mission Report: Arabian Gulf UAP, Jul 2020',
  'dow-uap-d37-range-fouler-debrief-middle-east-august-2019': 'Range Fouler Debrief — Middle East, Aug 2019',
  'dow-uap-d36-range-fouler-debrief-middle-east-august-2019': 'Range Fouler Debrief — Middle East, Aug 2019 (2)',
  'dow-uap-d52-mission-report-strait-of-hormuz-october-2021': 'Mission Report: Strait of Hormuz UAP, Oct 2021',
  'dow-uap-d53-mission-report-persian-gulf-august-2021': 'Mission Report: Persian Gulf UAP, Aug 2021',
  'dow-uap-d7-mission-report-arabian-gulf-august-2020': 'Mission Report: Arabian Gulf UAP, Aug 2020',
  'dow-uap-d4-mission-report-syria-june-2020': 'Mission Report: Syria UAP Encounter, Jun 2020',
  'dow-uap-d5-mission-report-iraq-august-2020': 'Mission Report: Iraq UAP Encounter, Aug 2020',
  'dow-uap-d6-mission-report-united-arab-emirates-may-2020': 'Mission Report: UAE UAP Encounter, May 2020',
  'dow-uap-d9-mission-report-east-china-sea-na': 'Mission Report: East China Sea UAP Encounter',
  'dow-uap-d10-mission-report-iraq-october-2020': 'Mission Report: Iraq UAP Encounter, Oct 2020',
  'dow-uap-d39-launch-summary-february-2000': 'DOW Launch Summary, Feb 2000',
  'dow-uap-d51-mission-report-gulf-of-aden-na': 'Mission Report: Gulf of Aden UAP Encounter',
  'composite-sketch-2024': 'UAP Witness Composite Sketch, 2024',
};

const SUMMARY_MAP = {
  'fbi-photo-series-a': 'Eight FLIR/forward-looking infrared sensor images from FBI UAP investigations. Multiple images contain heavy redactions (black bars) obscuring portions of the thermal imagery.',
  'fbi-photo-series-b': 'Twenty-four high-resolution physical evidence photographs from FBI case files related to UAP investigations. These images document physical evidence collected during field investigations.',
  'dow-uap-d55-mission-report-syria-november-2016': 'P-8A maritime patrol aircraft observed an unidentified low-flying object 55 NM northwest of Latakia, Syria on November 18, 2016. The object was detected via EO/IR sensor traveling at approximately 500 knots on a southeasterly heading, and was observed passing between Russian naval vessels.',
  'western-us-event-slides-5-08-2026': 'Three teams of federal law enforcement special agents independently observed orange "orbs" launching smaller red "orbs" over the Western United States at dusk over two separate days. The events were witnessed by multiple teams from varying locations.',
  'dos-uap-d1-cable-1-papua-new-guinea-january-1985': 'Diplomatic cable from the U.S. Embassy documenting a UAP sighting reported in Papua New Guinea in January 1985. Transmitted through official State Department channels.',
  'dos-uap-d2-cable-2-kazakhstan-january-1994': 'State Department cable reporting a UAP incident near Kazakhstan in January 1994, transmitted through diplomatic channels.',
  'nasa-uap-d1-apollo-12-transcript-1969': 'Official NASA transcript from the Apollo 12 mission (November 1969) containing crew communications discussing anomalous observations during the lunar mission.',
  'nasa-uap-vm1-apollo-12-1969': 'Six visual media files from the Apollo 12 mission (1969) showing anomalous features on or near the lunar surface captured during EVA and orbital photography.',
  'nasa-uap-d3-apollo-11-technical-crew-debriefing-1969': 'Technical crew debriefing document from the Apollo 11 mission (July 1969). Crew members discuss observations made during humanity\'s first lunar landing mission.',
  'nasa-uap-d4-apollo-17-transcript-1972': 'Mission transcript from Apollo 17 (December 1972), the final Apollo lunar mission. Contains crew discussion of anomalous object observations.',
  'nasa-uap-d6-skylab-technical-crew-debriefing-1973': 'Technical crew debriefing from the Skylab space station program (1973). Crew members discuss observations made during extended orbital operations.',
  'dow-uap-d38-range-fouler-debrief-middle-east-may-2020': 'Standardized military Range Fouler debrief form documenting a UAP encounter in the Middle East, May 2020. Includes radar/FLIR tracking data, object characteristics, and crew narrative description.',
  'dow-uap-d50-email-correspondence-indopacom-april-2025': 'Internal email correspondence from U.S. Indo-Pacific Command (INDOPACOM) regarding UAP encounters in the Indo-Pacific theater, April 2025.',
  'dow-uap-d8-mission-report-djibouti-2025': 'Military mission report documenting a UAP encounter near Djibouti, East Africa in 2025. Filed through Department of War reporting channels.',
};

// ===== Utility Functions =====
function slugify(s) {
  return s.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}

function detectAgency(name) {
  if (name.startsWith('dow-') || name.startsWith('DOW-')) return 'DOW';
  if (name.startsWith('fbi-') || name.startsWith('FBI-') || name.match(/^65_hs1/)) return 'FBI';
  if (name.startsWith('nasa-') || name.startsWith('NASA_')) return 'NASA';
  if (name.startsWith('dos-') || name.startsWith('DOS-')) return 'DOS';
  if (name.match(/^(18_|38_|59_|255_|331_|341_|342_)/)) return 'NARA';
  return 'OTHER';
}

function detectCategory(name) {
  if (name.includes('mission-report') || name.includes('mission_report')) return 'mission-report';
  if (name.includes('range-fouler') || name.includes('range_fouler')) return 'range-fouler';
  if (name.includes('cable')) return 'cable';
  if (name.includes('transcript')) return 'transcript';
  if (name.includes('crew-debriefing') || name.includes('crew_debriefing')) return 'crew-debriefing';
  if (name.includes('email')) return 'email';
  if (name.includes('launch-summary') || name.includes('launch_summary')) return 'launch-summary';
  if (name.includes('photo') || name.includes('vm')) return 'photo-evidence';
  if (name.includes('Unresolved_UAP')) return 'video-evidence';
  if (name.includes('section') || name.includes('serial') || name.includes('sub_')) return 'case-file';
  if (name.includes('slides') || name.includes('report')) return 'mission-report';
  if (name.includes('incident') || name.includes('records')) return 'archival';
  return 'archival';
}

function extractLocation(name) {
  const locs = {
    'arabian-gulf': { name: 'Arabian Gulf', region: 'Middle East', lat: 26.0, lng: 52.0 },
    'arabian_gulf': { name: 'Arabian Gulf', region: 'Middle East', lat: 26.0, lng: 52.0 },
    'syria': { name: 'Syria', region: 'Middle East', lat: 35.0, lng: 38.0 },
    'iraq': { name: 'Iraq', region: 'Middle East', lat: 33.0, lng: 44.0 },
    'united-arab-emirates': { name: 'UAE', region: 'Middle East', lat: 24.0, lng: 54.0 },
    'greece': { name: 'Greece', region: 'Europe', lat: 39.0, lng: 22.0 },
    'east-china-sea': { name: 'East China Sea', region: 'Indo-Pacific', lat: 30.0, lng: 125.0 },
    'japan': { name: 'Japan', region: 'Indo-Pacific', lat: 36.0, lng: 140.0 },
    'djibouti': { name: 'Djibouti', region: 'Africa', lat: 11.5, lng: 43.1 },
    'persian-gulf': { name: 'Persian Gulf', region: 'Middle East', lat: 27.0, lng: 51.0 },
    'strait-of-hormuz': { name: 'Strait of Hormuz', region: 'Middle East', lat: 26.5, lng: 56.3 },
    'iran': { name: 'Iran', region: 'Middle East', lat: 32.0, lng: 53.0 },
    'gulf-of-aden': { name: 'Gulf of Aden', region: 'Middle East', lat: 12.5, lng: 47.0 },
    'mediterranean': { name: 'Mediterranean Sea', region: 'Europe', lat: 35.0, lng: 18.0 },
    'middle-east': { name: 'Middle East', region: 'Middle East', lat: 29.0, lng: 47.0 },
    'middle_east': { name: 'Middle East', region: 'Middle East', lat: 29.0, lng: 47.0 },
    'papua-new-guinea': { name: 'Papua New Guinea', region: 'Indo-Pacific', lat: -6.0, lng: 147.0 },
    'kazakhstan': { name: 'Kazakhstan', region: 'Central Asia', lat: 48.0, lng: 68.0 },
    'africa': { name: 'Africa', region: 'Africa', lat: 9.0, lng: 38.0 },
    'indopacom': { name: 'Indo-Pacific', region: 'Indo-Pacific', lat: 15.0, lng: 130.0 },
    'INDOPACOM': { name: 'Indo-Pacific', region: 'Indo-Pacific', lat: 15.0, lng: 130.0 },
    'arabian-sea': { name: 'Arabian Sea', region: 'Middle East', lat: 15.0, lng: 65.0 },
    'arabian_sea': { name: 'Arabian Sea', region: 'Middle East', lat: 15.0, lng: 65.0 },
  };
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(locs)) {
    if (lower.includes(key.toLowerCase())) return val;
  }
  if (lower.includes('apollo') || lower.includes('skylab') || lower.includes('orbit')) {
    return { name: 'Space', region: 'Space', lat: 0, lng: 0 };
  }
  return undefined;
}

function extractYear(name) {
  const matches = name.match(/\b(19[4-9]\d|20[0-2]\d)\b/g);
  if (matches && matches.length > 0) return parseInt(matches[matches.length - 1]);
  return 2026;
}

function extractDate(name) {
  const year = extractYear(name);
  const monthNames = { january: '01', february: '02', march: '03', april: '04',
    may: '05', june: '06', july: '07', august: '08', september: '09',
    october: '10', november: '11', december: '12' };
  const lower = name.toLowerCase();
  for (const [mname, mnum] of Object.entries(monthNames)) {
    if (lower.includes(mname)) return `${year}-${mnum}-01`;
  }
  return `${year}-01-01`;
}

function titleFromFilename(name) {
  let t = name.replace(/\.(jpg|png|mp4|pdf)$/i, '');
  t = t.replace(/[-_]+/g, ' ');
  t = t.replace(/\b\w/g, c => c.toUpperCase());
  t = t.replace(/\bDow\b/gi, 'DOW').replace(/\bUap\b/gi, 'UAP')
       .replace(/\bFbi\b/gi, 'FBI').replace(/\bNasa\b/gi, 'NASA')
       .replace(/\bDos\b/gi, 'DOS').replace(/\bPr(\d)/g, 'PR$1')
       .replace(/\bHs1\b/gi, 'HS1').replace(/\bHq\b/gi, 'HQ')
       .replace(/\bVm(\d)/g, 'VM$1').replace(/\bD(\d)/g, 'D$1');
  return t.trim();
}

// Auto-generate summaries for documents without manual overrides
function generateSummary(doc) {
  const { agency, category, year, location } = doc;
  const agencyNames = { DOW: 'Department of War', FBI: 'Federal Bureau of Investigation', NASA: 'NASA', DOS: 'Department of State', NARA: 'National Archives', OTHER: 'U.S. Government' };
  const catNames = { 'mission-report': 'military mission report', 'range-fouler': 'Range Fouler UAP debrief form', cable: 'diplomatic cable', transcript: 'official transcript', 'photo-evidence': 'photographic evidence', 'video-evidence': 'unresolved UAP video', 'case-file': 'classified case file', email: 'internal email correspondence', archival: 'archival record', 'crew-debriefing': 'crew debriefing document', 'launch-summary': 'launch summary report', presentation: 'briefing presentation' };
  const locStr = location ? ` near ${location.name}` : '';
  return `Declassified ${catNames[category] || 'document'} from the ${agencyNames[agency] || agency}${locStr}, dated ${year}. Released under the PURSUE initiative on May 8, 2026.`;
}

// ===== Build document map =====
const docMap = new Map();

function addFile(subdir, filename, stats) {
  const ext = path.extname(filename).toLowerCase();
  const base = filename.replace(/\.(jpg|png|mp4|pdf)$/i, '');
  const type = ext === '.mp4' ? 'video' : ext === '.pdf' ? 'pdf' : 'image';
  
  let docId = slugify(base);
  if (base.match(/^fbi-photo-[ab]\d+/)) {
    const series = base.match(/^fbi-photo-([ab])/)[1];
    docId = `fbi-photo-series-${series}`;
  }
  
  if (!docMap.has(docId)) {
    const agency = detectAgency(filename);
    const category = detectCategory(filename);
    const location = extractLocation(filename);
    const year = extractYear(filename);
    const fallbackTitle = titleFromFilename(filename);
    
    docMap.set(docId, {
      id: docId,
      slug: docId,
      title: TITLE_MAP[docId] || fallbackTitle,
      agency,
      category,
      date: extractDate(filename),
      year,
      dateReleased: '2026-05-08',
      location,
      classification: 'DECLASSIFIED',
      summary: SUMMARY_MAP[docId] || '',
      keyFindings: [],
      files: [],
      relatedDocs: [],
      tags: [agency.toLowerCase(), category],
      featured: false,
    });
  }
  
  docMap.get(docId).files.push({ type, filename, size: stats.size });
}

// Scan directories
for (const subdir of ['image', 'video', 'pdf']) {
  const dir = path.join(SOURCE, subdir);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (f.startsWith('.')) continue;
    const stats = fs.statSync(path.join(dir, f));
    addFile(subdir, f, stats);
  }
}

// Auto-generate summaries for docs without manual ones
for (const [id, doc] of docMap) {
  if (!doc.summary) {
    doc.summary = generateSummary(doc);
  }
}

// Mark featured documents
const featuredIds = [
  'dow-uap-d55-mission-report-syria-november-2016',
  'nasa-uap-vm1-apollo-12-1969',
  'fbi-photo-series-a',
  'fbi-photo-series-b',
  'dos-uap-d1-cable-1-papua-new-guinea-january-1985',
  'western-us-event-slides-5-08-2026',
  'dow-uap-d38-range-fouler-debrief-middle-east-may-2020',
  'nasa-uap-d3-apollo-11-technical-crew-debriefing-1969',
  'dow-uap-d8-mission-report-djibouti-2025',
];
for (const id of featuredIds) {
  if (docMap.has(id)) docMap.get(id).featured = true;
}

// Populate relatedDocs by agency
for (const [id, doc] of docMap) {
  doc.relatedDocs = Array.from(docMap.values())
    .filter(d => d.agency === doc.agency && d.id !== id)
    .slice(0, 4)
    .map(d => d.id);
}

// Generate TypeScript
const docs = Array.from(docMap.values()).sort((a, b) => b.year - a.year);

let output = `// AUTO-GENERATED by scripts/catalog.mjs — Do not edit manually
import type { DeclassifiedDocument } from './types';

export const documents: DeclassifiedDocument[] = ${JSON.stringify(docs, null, 2)};

export function getDocumentBySlug(slug: string): DeclassifiedDocument | undefined {
  return documents.find(d => d.slug === slug);
}

export function getDocumentsByAgency(agency: string): DeclassifiedDocument[] {
  return documents.filter(d => d.agency === agency);
}

export function getDocumentsByCategory(category: string): DeclassifiedDocument[] {
  return documents.filter(d => d.category === category);
}

export function getFeaturedDocuments(): DeclassifiedDocument[] {
  return documents.filter(d => d.featured);
}

export function getDocumentsByYear(year: number): DeclassifiedDocument[] {
  return documents.filter(d => d.year === year);
}

export function getAllYears(): number[] {
  return [...new Set(documents.map(d => d.year))].sort((a, b) => b - a);
}

export function getAllTags(): string[] {
  return [...new Set(documents.flatMap(d => d.tags))].sort();
}
`;

fs.writeFileSync(OUT, output, 'utf-8');
console.log(`✅ Generated ${docs.length} documents → ${OUT}`);
console.log(`   With titles: ${docs.filter(d => TITLE_MAP[d.id]).length} manual, ${docs.filter(d => !TITLE_MAP[d.id]).length} auto`);
console.log(`   With summaries: ${docs.filter(d => SUMMARY_MAP[d.id]).length} manual, ${docs.filter(d => !SUMMARY_MAP[d.id]).length} auto`);
