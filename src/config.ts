/**
 * Site-wide configuration
 * Media files are served from Cloudflare R2
 */

// R2 public URL for media files (images, videos, PDFs)
export const R2_BASE = 'https://pub-d7148e2b49114a8ab87e9305c11533cf.r2.dev';

export const SITE_NAME = 'UFO Declassified';
export const ARCHIVE_DATASET_NAME = 'UFO Declassified PURSUE Document Archive';
export const ARCHIVE_DATASET_DESCRIPTION =
  'A searchable public archive of declassified UAP and UFO records released under the PURSUE initiative beginning May 8, 2026, including Release 01 through Release 07 source agency metadata, file formats, record dates, locations, summaries, and citation pages.';
export const ARCHIVE_SOURCE_URL = 'https://war.gov/UFO';
export const ARCHIVE_RELEASE_DATE = '2026-05-08';

// Zenodo concept DOI for the published catalog export — always resolves to the
// latest version, so it is the one to cite. The v1 version DOI is ...259.
export const ARCHIVE_DOI = '10.5281/zenodo.23854002';
export const ARCHIVE_DOI_URL = `https://doi.org/${ARCHIVE_DOI}`;

// Newsletter — the "Release Alert" list. The signup box renders on the
// homepage and at the end of blog posts only when `action` is set, so the
// site deploys safely before the list exists.
//
// Setup (one-time): create a hosted embed form with your provider, then fill
// in the form's POST endpoint and any hidden fields it requires. Examples:
//   Buttondown: action 'https://buttondown.email/api/emails/embed-subscribe/<list>'
//               hidden { embed: '1' }
//   Kit:        action 'https://app.kit.com/forms/<id>/subscriptions'
//               hidden fields as given by Kit's embed snippet
//   Mailchimp:  action 'https://<dc>.list-manage.com/subscribe/post?u=<u>&id=<id>'
//               hidden { b_<u>_<id>: '' } per their embed code
export const NEWSLETTER = {
  action: '',
  hidden: {} as Record<string, string>,
};

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
    sameAs: [ARCHIVE_SOURCE_URL, ARCHIVE_DOI_URL],
    isBasedOn: ARCHIVE_SOURCE_URL,
    datePublished: ARCHIVE_RELEASE_DATE,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'DOI',
      value: ARCHIVE_DOI,
      url: ARCHIVE_DOI_URL,
    },
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: 'text/csv',
      contentUrl: new URL('/dataset/uap-documents.csv', baseUrl).href,
    },
    keywords: ['UAP', 'UFO', 'PURSUE', 'Release 07', 'declassified records', 'government documents'],
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
