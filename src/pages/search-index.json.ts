import type { APIRoute } from 'astro';
import { documents } from '../data/documents';

export const GET: APIRoute = () => {
  const searchDocs = documents.map(d => ({
    slug: d.slug,
    title: d.title,
    agency: d.agency,
    category: d.category,
    year: d.year,
    location: d.location?.name || '',
    summary: d.summary,
    release: d.releaseLabel || 'Release 01',
  }));

  return new Response(JSON.stringify(searchDocs), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
