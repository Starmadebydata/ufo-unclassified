import type { DeclassifiedDocument } from './types';

export interface BlogEntrySummary {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface CaseFileLink {
  slug: string;
  title: string;
  label: string;
}

/**
 * Deterministically match a declassified document record to 1–3 contextually
 * relevant blog analysis articles and (when applicable) a Living Case File.
 * Keeps our 30 deep-dive articles tightly integrated with the 351 document
 * pages that drive search and AI referrals.
 */
export function getRelatedAnalysis(
  doc: DeclassifiedDocument,
  allPosts: BlogEntrySummary[],
  maxArticles = 3
): { articles: BlogEntrySummary[]; caseFile?: CaseFileLink } {
  const byId = new Map(allPosts.map(p => [p.id, p]));
  const pickedIds: string[] = [];
  const add = (id: string) => {
    if (byId.has(id) && !pickedIds.includes(id)) pickedIds.push(id);
  };

  const title = doc.title.toLowerCase();
  const slug = doc.slug.toLowerCase();
  const loc = (doc.location?.name || '').toLowerCase();
  const tags = (doc.tags || []).join(' ').toLowerCase();
  const hay = `${title} ${slug} ${loc} ${tags}`;
  const rel = doc.releaseLabel || 'Release 01';

  // 1. Living Case File match
  let caseFile: CaseFileLink | undefined;
  if (title.includes('triang') || slug.includes('d176')) {
    caseFile = {
      slug: 'triangular-uap-case-file',
      title: 'Triangular UAP Case File (2002–2026)',
      label: 'Living Case File · Updated Release 07',
    };
  } else if (
    title.includes('tremonton') ||
    title.includes('ruppelt') ||
    slug.includes('pr159') ||
    slug.includes('d105-u-s-air-force-flying-discs-file-1952')
  ) {
    caseFile = {
      slug: 'tremonton-utah-ufo-film-1952',
      title: '1952 Tremonton, Utah UFO Film Case File',
      label: 'Living Case File · Updated Release 06',
    };
  } else if (
    title.includes('sandia') ||
    title.includes('los alamos') ||
    title.includes('green fireball') ||
    doc.agency === 'DOE'
  ) {
    caseFile = {
      slug: 'green-fireballs-sandia-1948-1951',
      title: 'Green Fireballs & Sandia Base Case File (1948–1951)',
      label: 'Living Case File · DOE & DOW Records',
    };
  }

  // 2. Specific case / incident / agency matches (highest relevance)
  if (hay.includes('apollo 12')) {
    add('apollo-12-lunar-anomaly-field-guide');
    add('nasa-apollo-ufo-photos-declassified');
  } else if (hay.includes('apollo') || doc.agency === 'NASA') {
    add('nasa-apollo-ufo-photos-declassified');
    add('apollo-12-lunar-anomaly-field-guide');
  }

  if (hay.includes('sandia') || hay.includes('los alamos') || hay.includes('green fireball')) {
    add('sandia-green-fireballs-release-02-analysis');
  }
  if (hay.includes('sary shagan') || (doc.agency === 'CIA' && hay.includes('ussr'))) {
    add('cia-sary-shagan-green-object-release-02-analysis');
  }
  if (hay.includes('robertson') || hay.includes('tremonton') || hay.includes('ruppelt')) {
    add('cia-robertson-panel-1953-ufo-report');
  }
  if (hay.includes('blue book') || hay.includes('battelle') || hay.includes('project sign')) {
    add('project-blue-book-special-report-14-battelle-statistics');
  }
  if (hay.includes('foo fighter') || (doc.year >= 1944 && doc.year <= 1947)) {
    add('foo-fighters-wwii-415th-night-fighter-squadron');
  }
  if (hay.includes('lake huron')) {
    add('lake-huron-uap-video-release-02-analysis');
  }
  if (hay.includes('syria')) {
    add('syrian-uap-instant-acceleration-release-02-analysis');
  }
  if (hay.includes('persian gulf') || hay.includes('arabian gulf') || hay.includes('gulf of oman')) {
    add('persian-gulf-2020-uap-cluster');
  }
  if (hay.includes('western us') || hay.includes('western u.s.')) {
    add('western-us-orbs-release-03-analysis');
    add('orbs-launching-orbs-western-us-event');
  }
  if (hay.includes('colorado springs') || hay.includes('coloradosprings')) {
    add('colorado-springs-uap-low-confidence-analysis');
  }
  if (hay.includes('northeastern') || hay.includes('red orb')) {
    add('northeastern-red-orb-release-03-analysis');
  }
  if (hay.includes('harare') || hay.includes('zimbabwe')) {
    add('harare-airport-uap-cia-high-alert-analysis');
  }
  if (doc.agency === 'ODNI' || hay.includes('orange orb')) {
    add('odni-orange-orb-narrative-release-02-analysis');
  }
  if (doc.agency === 'FBI') {
    if (hay.includes('photo') || hay.includes('65-hs1') || hay.includes('83894')) {
      add('fbi-physical-evidence-photo-lab');
    }
    add('fbi-flying-disc-files-investigation');
  }
  if (doc.files.some(f => f.type === 'video')) {
    add('military-uap-videos-pentagon-released');
  }

  // 3. Release-level coverage fallback
  if (rel === 'Release 08') add('war-gov-ufo-release-08-first-look');
  else if (rel === 'Release 07') add('war-gov-ufo-release-07-first-look');
  else if (rel === 'Release 06') add('war-gov-ufo-release-06-first-look');
  else if (rel === 'Release 04') add('war-gov-ufo-release-04-first-look');
  else if (rel === 'Release 03') add('war-gov-ufo-release-03-analysis');
  else if (rel === 'Release 02') {
    add('war-gov-ufo-release-02-analysis');
    add('war-gov-release-02-evidence-discipline');
  } else {
    add('war-gov-ufo-complete-guide');
  }

  // Ensure at least 2 relevant links when possible
  if (pickedIds.length < 2) {
    add('war-gov-ufo-complete-guide');
  }
  if (pickedIds.length < 2) {
    add('dow-nda-waiver-pursue-whistleblower-pipeline');
  }

  return {
    articles: pickedIds.slice(0, maxArticles).map(id => byId.get(id)!),
    caseFile,
  };
}
