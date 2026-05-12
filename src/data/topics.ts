export interface ArchiveTopic {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  answer: string;
  criteriaLabel: string;
  searchHint: string;
}

export const archiveTopics: ArchiveTopic[] = [
  {
    slug: 'pursue-release-2026',
    title: '2026 PURSUE Release',
    shortTitle: 'PURSUE Release',
    description: 'All records from the first public PURSUE release, organized for source review and citation.',
    answer: 'The 2026 PURSUE release is the first public batch of U.S. government UAP records indexed by UFO Declassified. The archive groups the May 8, 2026 release by source agency, document type, file format, year, and location so researchers can move from a summary claim to the underlying record.',
    criteriaLabel: 'Released on May 8, 2026',
    searchHint: 'PURSUE, May 8 2026, release',
  },
  {
    slug: 'fbi-ufo-files',
    title: 'FBI UFO Files',
    shortTitle: 'FBI Files',
    description: 'FBI case files, sensor imagery, and physical evidence records related to UAP investigations.',
    answer: 'The FBI UFO Files topic collects declassified records attributed to the Federal Bureau of Investigation. These records are useful for tracing case-file language, evidence handling, and investigative metadata inside the broader PURSUE archive.',
    criteriaLabel: 'Agency is FBI',
    searchHint: 'FBI, case file, photo evidence',
  },
  {
    slug: 'nasa-apollo-ufo-material',
    title: 'NASA Apollo UFO Material',
    shortTitle: 'NASA Apollo',
    description: 'NASA transcripts, crew debriefings, and visual media connected to Apollo-era anomalous observations.',
    answer: 'The NASA Apollo UFO Material topic groups NASA records, Apollo mission transcripts, crew debriefings, and space-flight media in one place. It is designed for readers who need a quick path from a claim about Apollo-era anomalous observations to the relevant primary records.',
    criteriaLabel: 'NASA records and Apollo-related material',
    searchHint: 'NASA, Apollo, crew debriefing',
  },
  {
    slug: 'pentagon-uap-videos',
    title: 'Pentagon UAP Videos',
    shortTitle: 'UAP Videos',
    description: 'Military UAP video records and related Department of War mission reports.',
    answer: 'The Pentagon UAP Videos topic focuses on video-bearing records and Department of War UAP reports in the PURSUE archive. The topic helps researchers separate visual evidence, mission reports, and supporting file metadata before citing a specific record.',
    criteriaLabel: 'Video files or Department of War UAP records',
    searchHint: 'video, Department of War, mission report',
  },
  {
    slug: 'historical-flying-disc-records',
    title: 'Historical Flying Disc Records',
    shortTitle: 'Historical Records',
    description: 'Older National Archives and historical records, including flying-disc era material from the 1940s through early space age.',
    answer: 'The Historical Flying Disc Records topic highlights older UAP-related material in the archive, including National Archives records and references to flying-disc investigations. It is intended for historical research where the year, source agency, and original document title matter more than modern terminology.',
    criteriaLabel: 'Historical records from 1963 or earlier, plus flying-disc references',
    searchHint: 'flying discs, National Archives, 1949',
  },
];

export function getTopicBySlug(slug: string): ArchiveTopic | undefined {
  return archiveTopics.find(topic => topic.slug === slug);
}
