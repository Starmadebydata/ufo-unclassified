/**
 * Site-wide configuration
 * Media files are served from Cloudflare R2
 */

// R2 public URL for media files (images, videos, PDFs)
export const R2_BASE = 'https://pub-d7148e2b49114a8ab87e9305c11533cf.r2.dev';

export const SITE_NAME = 'UFO Declassified';
export const ARCHIVE_DATASET_NAME = 'UFO Declassified PURSUE Document Archive';
export const ARCHIVE_DATASET_DESCRIPTION =
  'A searchable public archive of declassified UAP and UFO records released under the PURSUE initiative beginning May 8, 2026, including Release 01 through Release 04 source agency metadata, file formats, record dates, locations, summaries, and citation pages.';
export const ARCHIVE_SOURCE_URL = 'https://war.gov/UFO';
export const ARCHIVE_RELEASE_DATE = '2026-05-08';

// Helper to build media URLs
export function mediaUrl(type: 'image' | 'video' | 'pdf' | 'audio', filename: string): string {
  return `${R2_BASE}/${type}/${filename}`;
}

export function fileUrl(file: { type: 'image' | 'video' | 'pdf' | 'audio'; filename: string; url?: string }): string {
  return file.url || mediaUrl(file.type, file.filename);
}

export function fileThumbnailUrl(file: { type: 'image' | 'video' | 'pdf' | 'audio'; filename: string; thumbnailUrl?: string; url?: string }): string | undefined {
  if (file.thumbnailUrl) return file.thumbnailUrl;
  if (file.type === 'image') return fileUrl(file);
  return undefined;
}

export function makeArchiveDatasetSchema(site: URL | string) {
  const baseUrl = typeof site === 'string' ? site : site.href;
  const siteHome = new URL('/', baseUrl).href;

  return {
    '@type': 'Dataset',
    name: ARCHIVE_DATASET_NAME,
    description: ARCHIVE_DATASET_DESCRIPTION,
    url: new URL('/documents', baseUrl).href,
    sameAs: ARCHIVE_SOURCE_URL,
    isBasedOn: ARCHIVE_SOURCE_URL,
    datePublished: ARCHIVE_RELEASE_DATE,
    license: new URL('/terms', baseUrl).href,
    isAccessibleForFree: true,
    keywords: ['UAP', 'UFO', 'PURSUE', 'Release 04', 'declassified records', 'government documents'],
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteHome,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteHome,
    },
  };
}

// For local development, you can override with:
// export const R2_BASE = '/source-files';
