// SEO quality heuristics for document records.

import type { DeclassifiedDocument } from './types';

/**
 * A "thin" record is a bulk-published asset page whose only unique content is a
 * swapped-in asset number: raw DOD/DVIDS filename titles with template summaries.
 * These stay available on-site (the video browser links to them) but are marked
 * noindex and excluded from the sitemap so search engines evaluate the archive
 * on its substantive pages.
 *
 * NOTE: the sitemap filter in astro.config.mjs uses the equivalent URL pattern
 * /-dod-\d{6,}/ — keep the two in sync if this heuristic changes.
 */
export function isThinDocument(doc: DeclassifiedDocument): boolean {
  return /^DOD_\d{6,}/.test(doc.title);
}
