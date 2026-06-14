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
    description: 'All records from the 2026 PURSUE release batches, organized for source review and citation.',
    answer: 'The 2026 PURSUE release is the public U.S. government UAP record program indexed by UFO Declassified. The archive groups the May 8, May 22, and June 12, 2026 release batches by source agency, document type, file format, year, and location so researchers can move from a summary claim to the underlying record.',
    criteriaLabel: 'Released under PURSUE in 2026',
    searchHint: 'PURSUE, May 2026, release',
  },
  {
    slug: 'pursue-release-03',
    title: 'PURSUE Release 03',
    shortTitle: 'Release 03',
    description: 'The June 12, 2026 third PURSUE tranche, including AARO videos, CIA historical files, FBI incident material, NASA Gemini records, and Western U.S. event documents.',
    answer: 'PURSUE Release 03 is the third public tranche of UAP files posted on June 12, 2026. It adds nine AARO video files and a larger document package spanning CIA historical material, FBI incident records, NASA Gemini-era debriefings, and Department of War Western U.S. event documents.',
    criteriaLabel: 'Release 03 records from June 12, 2026',
    searchHint: 'Release 03, June 12 2026, AARO, Gemini, Colorado Springs',
  },
  {
    slug: 'pursue-release-02',
    title: 'PURSUE Release 02',
    shortTitle: 'Release 02',
    description: 'The May 22, 2026 second PURSUE tranche, including new Department of War, NASA, DOE, CIA, and ODNI records.',
    answer: 'PURSUE Release 02 is the second public tranche of UAP files posted on May 22, 2026. It adds military sensor videos, NASA audio excerpts, historical intelligence records, Department of Energy material, and ODNI narrative material to the searchable UFO Declassified archive.',
    criteriaLabel: 'Release 02 records from May 22, 2026',
    searchHint: 'Release 02, May 22 2026, Sandia, NASA audio',
  },
  {
    slug: 'fbi-ufo-files',
    title: 'FBI UFO Files',
    shortTitle: 'FBI Files',
    description: 'FBI case files, sensor imagery, physical evidence records, and 65-HS1 / 62-HQ-83894 source pages related to UAP investigations.',
    answer: 'The FBI UFO Files topic collects declassified records attributed to the Federal Bureau of Investigation, including the 65-HS1-834228961 / 62-HQ-83894 file series. These records are useful for tracing case-file language, evidence handling, and investigative metadata inside the broader PURSUE archive.',
    criteriaLabel: 'Agency is FBI',
    searchHint: 'FBI, 65-HS1, 62-HQ-83894, photo evidence',
  },
  {
    slug: 'nasa-apollo-ufo-material',
    title: 'NASA Apollo UFO Material',
    shortTitle: 'NASA Apollo',
    description: 'NASA Apollo 12 and Apollo 17 UFO files, transcripts, crew debriefings, and lunar visual media connected to anomalous-observation searches.',
    answer: 'The NASA Apollo UFO Material topic groups the Apollo 12 transcript and lunar image files, Apollo 17 transcript and VM6 visual media, and Apollo 11 and Apollo 17 crew debriefings in one place. It is designed for readers searching Apollo 12 UFO files, Apollo 12 transcript records, or Apollo 17 UAP material who need a quick path from a claim to the relevant primary records.',
    criteriaLabel: 'NASA records and Apollo-related material',
    searchHint: 'Apollo 12 UFO, Apollo 12 transcript, Apollo 17 UAP',
  },
  {
    slug: 'pentagon-uap-videos',
    title: 'Pentagon UAP Videos',
    shortTitle: 'UAP Videos',
    description: 'Military UAP video records, including PR46, PR28, and related Department of War mission reports.',
    answer: 'The Pentagon UAP Videos topic focuses on video-bearing records and Department of War UAP reports in the PURSUE archive, including records such as DOW-UAP-PR46 and DOW-UAP-PR28. The topic helps researchers separate visual evidence, mission reports, and supporting file metadata before citing a specific record.',
    criteriaLabel: 'Video files or Department of War UAP records',
    searchHint: 'PR46, PR28, UAP video, Department of War',
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
