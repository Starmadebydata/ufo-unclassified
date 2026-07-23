// Static CSV export of the full document catalog, for the /tools/stats download link
// and for external distribution (GitHub/Kaggle re-upload). Regenerated on every build.
import type { APIRoute } from 'astro';
import { getToolDocs } from '../../data/toolData';

export const prerender = true;

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export const GET: APIRoute = () => {
  const docs = getToolDocs();
  const header = ['slug', 'title', 'agency', 'year', 'release', 'location', 'file_types', 'evidence_labels', 'record_url'];
  const rows = docs.map(d => [
    d.slug,
    d.title,
    d.agency,
    String(d.year),
    d.release,
    d.location || '',
    d.fileTypes.join(';'),
    d.evidenceLabels.join(';'),
    `https://ufo-declassified.com/documents/${d.slug}/`,
  ].map(csvEscape).join(','));

  const csv = [header.join(','), ...rows].join('\n') + '\n';

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="uap-declassified-documents.csv"',
    },
  });
};
