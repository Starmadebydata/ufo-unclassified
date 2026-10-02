// Evidence source-status labels — two layers:
//   1. deriveLabels(): mechanical facts derived from record metadata (applies to all records)
//   2. EDITORIAL_OVERRIDES: judgment labels, only for records this site has researched in depth;
//      each carries a note explaining the basis and, where available, the supporting article.
//
// Labels are verifiable statements about a record's sourcing — not quality ratings and
// not judgments about what the underlying event was.

import type { DeclassifiedDocument } from './types';

export type EvidenceLabel =
  | 'official-source'
  | 'public-rendition'
  | 'historical-archival'
  | 'witness-testimony'
  | 'official-analysis'
  | 'partial-explanation'
  | 'unresolved'
  | 'context-gap';

export const LABEL_INFO: Record<EvidenceLabel, { label: string; color: string; layer: 'derived' | 'editorial'; description: string }> = {
  'official-source': {
    label: 'Official source linked',
    color: '#00ff88',
    layer: 'derived',
    description: 'The record carries a link to its official government source page.',
  },
  'public-rendition': {
    label: 'Public rendition video',
    color: '#22d3ee',
    layer: 'derived',
    description: 'Video files are official public renditions, not raw sensor data. Chain-of-custody caveats apply.',
  },
  'historical-archival': {
    label: 'Historical archival record',
    color: '#8fb0e0',
    layer: 'derived',
    description: 'A scanned historical record. Valuable as institutional history, not as a modern case file.',
  },
  'witness-testimony': {
    label: 'Witness testimony',
    color: '#a855f7',
    layer: 'derived',
    description: 'The record is primarily first-person account: transcript, debriefing, interview, or case file.',
  },
  'official-analysis': {
    label: 'Official analysis on record',
    color: '#fbbf24',
    layer: 'editorial',
    description: 'An official analytic assessment (AARO, ICA, or agency) exists in the public file.',
  },
  'partial-explanation': {
    label: 'Partial explanation offered',
    color: '#f59e0b',
    layer: 'editorial',
    description: 'Officials offered a partial or low-confidence conventional explanation, on the record.',
  },
  'unresolved': {
    label: 'Officially unresolved',
    color: '#ff6b35',
    layer: 'editorial',
    description: 'The releasing agency itself labels the case unresolved or unidentified.',
  },
  'context-gap': {
    label: 'Documented context gap',
    color: '#dc2626',
    layer: 'editorial',
    description: 'A specific missing piece (pages, radar data, analysis records) has been documented publicly.',
  },
};

/** Layer 1 — mechanical derivation from record metadata. */
export function deriveLabels(doc: DeclassifiedDocument): EvidenceLabel[] {
  const labels: EvidenceLabel[] = [];
  const hasOfficialUrl = Boolean(doc.sourceUrl) || doc.files.some(f => Boolean(f.sourceUrl));
  if (hasOfficialUrl) labels.push('official-source');
  if (doc.files.some(f => f.type === 'video')) labels.push('public-rendition');
  if (doc.category === 'archival' || doc.year < 2000) labels.push('historical-archival');
  if (['transcript', 'crew-debriefing', 'case-file', 'range-fouler'].includes(doc.category)) {
    labels.push('witness-testimony');
  }
  return labels;
}

interface EditorialOverride {
  labels: EvidenceLabel[];
  note: string;
  articleHref?: string;
}

/** Layer 2 — judgment labels, only where this site's research supports them. */
export const EDITORIAL_OVERRIDES: Record<string, EditorialOverride> = {
  'release-03-file-028-dow-uap-d077-unresolved-case-analysis-update-western-united-states-event': {
    labels: ['official-analysis', 'partial-explanation', 'unresolved'],
    note: 'AARO analysis attributes ~60% of reported activity to military aircraft; ~40% remains without a reasonable explanation.',
    articleHref: '/blog/western-us-orbs-release-03-analysis/',
  },
  'release-03-file-040-fbi-uap-d001-fd-302-unresolved-uap-report-coloradosprings-2022': {
    labels: ['official-analysis', 'partial-explanation'],
    note: 'An ICA assessment offers a natural-phenomenon explanation, explicitly at low confidence.',
    articleHref: '/blog/colorado-springs-uap-low-confidence-analysis/',
  },
  'release-03-file-041-fbi-uap-d002-fd-1057-unresolved-uap-report-coloradosprings-2022': {
    labels: ['official-analysis', 'partial-explanation'],
    note: 'Part of the Colorado Springs case packet; the low-confidence natural explanation applies to the case as a whole.',
    articleHref: '/blog/colorado-springs-uap-low-confidence-analysis/',
  },
  'release-02-file-002-dow-uap-pr051-syrian-uap-instant-acceleration': {
    labels: ['unresolved'],
    note: 'Released under an unresolved-case designation; the public rendition lacks the sensor context needed for independent assessment.',
    articleHref: '/blog/syrian-uap-instant-acceleration-release-02-analysis/',
  },
  'release-02-file-030-dow-uap-pr071-usaf-ang-f-16c-callsign-callsign-shoots-down-uap-over-lake-huron-with-weapon-syste': {
    labels: ['unresolved', 'context-gap'],
    note: 'The 2023 Lake Huron object was never officially identified; FOIA reporting shows analysis records behind released footage remain withheld.',
    articleHref: '/blog/lake-huron-uap-video-release-02-analysis/',
  },
  'release-03-file-016-cia-uap-017-placement-on-high-alert-due-to-perceived-aggressive-foreign-posturing': {
    labels: ['unresolved', 'context-gap'],
    note: 'The cable reports possible radar and optical observation, but no radar data, ATC records, or witness statements are public.',
    articleHref: '/blog/harare-airport-uap-cia-high-alert-analysis/',
  },
  'release-02-file-007-doe-uap-d001-enhanced-pantex-imagery': {
    labels: ['context-gap'],
    note: 'Researchers report the public file appears as pages 5-6 of a six-page document; the gap is unacknowledged officially.',
    articleHref: '/tools/claims/#pantex-missing-pages',
  },
  'release-02-file-005-odni-uap-d001-usper-narrative-senior-usic-official': {
    labels: ['witness-testimony', 'unresolved'],
    note: 'A first-person narrative from a senior intelligence official — powerful as testimony, uncorroborated as evidence.',
    articleHref: '/blog/odni-orange-orb-narrative-release-02-analysis/',
  },
  'release-02-file-003-dow-uap-d017-uap-reported-at-sandia-base-1948-1950': {
    labels: ['unresolved'],
    note: '209 sightings near sensitive New Mexico facilities, 1948-1950; the green-fireball question was never formally closed.',
    articleHref: '/blog/sandia-green-fireballs-release-02-analysis/',
  },
  'release-03-file-010-cia-uap-011-the-sary-shagan-weapons-testing-range': {
    labels: ['unresolved'],
    note: 'Cold War intelligence report of a green object at a Soviet test range; no resolution appears in the released file.',
    articleHref: '/blog/cia-sary-shagan-green-object-release-02-analysis/',
  },
  'release-03-file-043-fbi-uap-d004-fd-1057-02-northeastern-us-2024': {
    labels: ['unresolved'],
    note: 'FBI interview records for the Northeastern red-orb sightings; no official identification is on the record.',
    articleHref: '/blog/northeastern-red-orb-release-03-analysis/',
  },
};

export interface RecordEvidence {
  labels: EvidenceLabel[];
  note?: string;
  articleHref?: string;
}

/** Merge both layers for a record. */
export function getRecordEvidence(doc: DeclassifiedDocument): RecordEvidence {
  const derived = deriveLabels(doc);
  const override = EDITORIAL_OVERRIDES[doc.id];
  if (!override) return { labels: derived };
  return {
    labels: [...new Set([...derived, ...override.labels])],
    note: override.note,
    articleHref: override.articleHref,
  };
}
