/**
 * Site-wide configuration
 * Media files are served from Cloudflare R2
 */

// R2 public URL for media files (images, videos, PDFs)
export const R2_BASE = 'https://pub-d7148e2b49114a8ab87e9305c11533cf.r2.dev';

// Helper to build media URLs
export function mediaUrl(type: 'image' | 'video' | 'pdf', filename: string): string {
  return `${R2_BASE}/${type}/${filename}`;
}

// For local development, you can override with:
// export const R2_BASE = '/source-files';
