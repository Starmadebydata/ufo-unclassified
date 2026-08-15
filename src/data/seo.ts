// SEO quality heuristics for document records.

import type { DeclassifiedDocument } from './types';
import type { CultureRecord } from './culture';

/**
 * A "thin" record is a page whose only unique content is template text with
 * swapped-in identifiers:
 *   - raw DOD/DVIDS asset-number titles (bulk video pages),
 *   - Release 01 placeholder records with no hand-written key findings
 *     (the page falls back to fully generic generated facts),
 *   - boilerplate summaries of the "This page indexes the public …" kind,
 *   - summaries too short to add anything beyond the generated answer block
 *     (agency + date + file counts), which reads as scaled template content.
 *
 * These pages stay available on-site (the database, video browser, and map
 * link to them) but are marked noindex and excluded from the sitemap so
 * search engines evaluate the archive on its substantive pages.
 *
 * Context: Google search impressions collapsed on 2026-06-01 (algorithmic,
 * no manual action) shortly after Release 02 added dozens of template record
 * pages. The index must be restricted to pages with real editorial content.
 *
 * NOTE: the sitemap filter in astro.config.mjs builds its exclusion set from
 * this exact function — the two cannot drift apart.
 */
const MIN_SUMMARY_WORDS = 40;

export function isThinDocument(doc: DeclassifiedDocument): boolean {
  if (/^DOD_\d{6,}/.test(doc.title)) return true;
  if (doc.keyFindings.length === 0) return true;
  if (!doc.summary || doc.summary.includes('This page indexes')) return true;
  if (doc.summary.trim().split(/\s+/).length < MIN_SUMMARY_WORDS) return true;
  return false;
}

/**
 * Film / TV / documentary culture pages are encyclopedia-style entries whose
 * primary sources are third-party references (mostly Wikipedia). They are
 * useful on-site context but should not compete for search indexing against
 * the archive's own records and analysis — to search engines they read as
 * derivative coverage of topics owned by other sites.
 *
 * Report / hearing / journalism / case-file entries stay indexed: they are
 * directly tied to the government record and cross-linked with archive pages.
 *
 * NOTE: the sitemap filter in astro.config.mjs uses this function too.
 */
const THIN_CULTURE_CATEGORIES = new Set(['film', 'series', 'documentary']);

export function isThinCulture(record: Pick<CultureRecord, 'category'>): boolean {
  return THIN_CULTURE_CATEGORIES.has(record.category);
}

/**
 * Release 01 catalog entries defaulted unknown record dates to 2026-01-01
 * (the release year), which made historical files render as "dated 2026".
 * Those records should present as undated instead.
 */
export function isUndatedRecord(doc: DeclassifiedDocument): boolean {
  return (doc.releaseLabel || 'Release 01') === 'Release 01' && doc.date === '2026-01-01';
}
