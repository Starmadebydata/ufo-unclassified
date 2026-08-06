// SEO quality heuristics for document records.

import type { DeclassifiedDocument } from './types';

/**
 * A "thin" record is a page whose only unique content is template text with
 * swapped-in identifiers:
 *   - raw DOD/DVIDS asset-number titles (bulk video pages),
 *   - Release 01 placeholder records with no hand-written key findings
 *     (the page falls back to fully generic generated facts),
 *   - boilerplate summaries of the "This page indexes the public …" kind.
 *
 * These pages stay available on-site (the database, video browser, and map
 * link to them) but are marked noindex and excluded from the sitemap so
 * search engines evaluate the archive on its substantive pages.
 *
 * NOTE: the sitemap filter in astro.config.mjs builds its exclusion set from
 * this exact function — the two cannot drift apart.
 */
export function isThinDocument(doc: DeclassifiedDocument): boolean {
  if (/^DOD_\d{6,}/.test(doc.title)) return true;
  if (doc.keyFindings.length === 0) return true;
  if (!doc.summary || doc.summary.includes('This page indexes')) return true;
  return false;
}

/**
 * Release 01 catalog entries defaulted unknown record dates to 2026-01-01
 * (the release year), which made historical files render as "dated 2026".
 * Those records should present as undated instead.
 */
export function isUndatedRecord(doc: DeclassifiedDocument): boolean {
  return (doc.releaseLabel || 'Release 01') === 'Release 01' && doc.date === '2026-01-01';
}
