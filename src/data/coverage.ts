// Media coverage data for the PURSUE UFO document release

export type CoverageCategory = 'breaking' | 'analysis' | 'reaction' | 'international' | 'opinion' | 'science' | 'congress';

export interface CoverageItem {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  category: CoverageCategory;
  date: string;           // ISO date
  summary: string;
  keyQuote?: string;
  quoteAttribution?: string;
  tags: string[];
  featured?: boolean;
}

export const COVERAGE_CATEGORIES: Record<CoverageCategory, { label: string; code: string; color: string }> = {
  breaking: { label: 'Breaking News', code: '[BRK]', color: '#ef4444' },
  analysis: { label: 'Analysis', code: '[ANL]', color: '#06b6d4' },
  reaction: { label: 'Reaction', code: '[RXN]', color: '#f59e0b' },
  international: { label: 'International', code: '[INT]', color: '#a855f7' },
  opinion: { label: 'Opinion', code: '[OPN]', color: '#6366f1' },
  science: { label: 'Science', code: '[SCI]', color: '#10b981' },
  congress: { label: 'Congress', code: '[CON]', color: '#f97316' },
};

export const coverage: CoverageItem[] = [
  // Breaking News
  {
    id: 'cbs-ufo-files-released',
    title: 'Trump administration releases declassified UFO documents, photos and videos',
    source: 'CBS News',
    sourceUrl: 'https://www.cbsnews.com/news/trump-ufo-files-declassified-documents/',
    category: 'breaking',
    date: '2026-05-08',
    summary: 'The Trump administration launched war.gov/UFO, releasing 162 previously classified files — including 120 PDFs, 28 videos, and 14 images — as part of the PURSUE initiative. Defense Secretary Pete Hegseth stated the files had "long fueled justified speculation" and that it was time for the public to have access.',
    keyQuote: 'These files have long fueled justified speculation. It is time for the public to see it for themselves.',
    quoteAttribution: 'Pete Hegseth, Secretary of War',
    tags: ['war.gov', 'PURSUE', 'launch', 'Hegseth'],
    featured: true,
  },
  {
    id: 'guardian-ufo-release',
    title: 'US government releases trove of UFO documents in unprecedented transparency move',
    source: 'The Guardian',
    sourceUrl: 'https://www.theguardian.com/world/2026/may/08/ufo-documents-release-pursue',
    category: 'breaking',
    date: '2026-05-08',
    summary: 'The Guardian reports on the historic release of 162 declassified UAP files spanning decades, from 1947 FBI flying disc investigations to 2026 military sensor footage. The files include Apollo mission transcripts where astronauts reported anomalous objects, and recent videos showing craft performing "impossible" maneuvers.',
    tags: ['declassified', 'transparency', 'historic'],
    featured: true,
  },
  {
    id: 'washpost-ufo-files',
    title: "What's in Trump's UFO document dump — and what's not",
    source: 'Washington Post',
    sourceUrl: 'https://www.washingtonpost.com/national-security/2026/05/08/ufo-files-trump-pursue/',
    category: 'analysis',
    date: '2026-05-08',
    summary: 'The Washington Post provides a detailed breakdown of the 162 released files, noting that 108 contain significant redactions. The analysis highlights gaps between what transparency advocates hoped for and what was actually released, while acknowledging the historic nature of the disclosure.',
    keyQuote: 'The administration emphasized they are not providing definitive answers, but rather allowing the public to make their own determinations.',
    quoteAttribution: 'Washington Post analysis',
    tags: ['analysis', 'redactions', 'transparency'],
    featured: true,
  },

  // Analysis
  {
    id: 'twz-military-videos',
    title: 'Breaking Down the 28 Military UAP Videos Just Released by the Pentagon',
    source: 'The War Zone',
    sourceUrl: 'https://www.twz.com/2026/05/08/breaking-down-28-military-uap-videos/',
    category: 'analysis',
    date: '2026-05-08',
    summary: 'The War Zone provides frame-by-frame analysis of the 28 military sensor videos released under PURSUE. Notable footage includes a diamond-shaped object captured near Greece in 2024, and several "Range Fouler" encounters showing objects performing sudden 90-degree turns at hypersonic speeds.',
    tags: ['video-analysis', 'military', 'sensor-data', 'Range Fouler'],
  },
  {
    id: 'cnet-apollo-transcripts',
    title: "NASA's Apollo transcripts reveal what astronauts saw — and couldn't explain",
    source: 'CNET',
    sourceUrl: 'https://www.cnet.com/science/nasas-apollo-transcripts-uap/',
    category: 'analysis',
    date: '2026-05-09',
    summary: 'CNET examines the newly declassified Apollo mission transcripts, including Apollo 11, 12, and 17, where astronauts reported unusual lights and unidentified objects during lunar missions. The transcripts include crew debriefing documents that were previously classified.',
    tags: ['NASA', 'Apollo', 'transcripts', 'space'],
  },
  {
    id: 'tnw-web-analysis',
    title: "War.gov/UFO: Inside the government's chaotic document dump",
    source: 'The Next Web',
    sourceUrl: 'https://thenextweb.com/news/war-gov-ufo-analysis',
    category: 'analysis',
    date: '2026-05-09',
    summary: 'TNW examines the technical aspects of the release — the file formats, metadata, redaction patterns, and the overwhelmed war.gov servers. The initial batch of 162 files totals roughly 2.3 GB, with file sizes ranging from 15 KB to 800 MB for the largest video.',
    tags: ['technical', 'web', 'data', 'files'],
  },

  // Congressional Reactions
  {
    id: 'pbs-congress-reaction',
    title: 'Congress reacts to UFO document release: "This is just the beginning"',
    source: 'PBS NewsHour',
    sourceUrl: 'https://www.pbs.org/newshour/politics/congress-ufo-release-reaction',
    category: 'congress',
    date: '2026-05-08',
    summary: 'PBS reports on Congressional reactions to the PURSUE release. Rep. Tim Burchett praised the transparency move. Rep. Anna Paulina Luna indicated she expects specific whistleblower-identified videos in upcoming releases. Some lawmakers urged continued pressure for full, unredacted disclosure.',
    keyQuote: "The President kept his word. But this is just the beginning — we need the unredacted files.",
    quoteAttribution: 'Rep. Tim Burchett (R-TN)',
    tags: ['Congress', 'Burchett', 'Luna', 'disclosure'],
  },
  {
    id: 'opb-bipartisan-uap',
    title: 'Bipartisan push for full UAP disclosure intensifies after PURSUE launch',
    source: 'OPB / NPR',
    sourceUrl: 'https://www.opb.org/article/2026/05/09/uap-disclosure-bipartisan/',
    category: 'congress',
    date: '2026-05-09',
    summary: 'A bipartisan group of lawmakers is using the momentum from the PURSUE release to push for comprehensive UAP disclosure legislation, building on the framework established by the 2023 UAP Disclosure Act. Senators from both parties are calling for a review board with subpoena power.',
    tags: ['bipartisan', 'legislation', 'disclosure act'],
  },

  // Reactions
  {
    id: 'military-times-veterans',
    title: 'Military veterans react to declassified UAP encounter videos',
    source: 'Military Times',
    sourceUrl: 'https://www.militarytimes.com/news/2026/05/09/veterans-react-uap-videos/',
    category: 'reaction',
    date: '2026-05-09',
    summary: 'Military Times features reactions from veterans who served in units referenced in the declassified reports. Several former pilots and sensor operators confirm the authenticity of the footage, noting similarities to encounters they personally witnessed but could never discuss publicly.',
    tags: ['veterans', 'military', 'pilots', 'confirmation'],
  },
  {
    id: 'reddit-crowdsource',
    title: 'Reddit communities launch crowd-sourced analysis of PURSUE files',
    source: 'Reddit / Community',
    sourceUrl: 'https://www.reddit.com/r/UFOs/',
    category: 'reaction',
    date: '2026-05-08',
    summary: 'Online communities, particularly on Reddit, have mobilized to crowd-source analysis of the 162 released files. Users are creating improved interfaces, enhanced video stabilization of sensor footage, and collaborative databases. Multiple sub-communities are performing frame-by-frame analysis.',
    tags: ['Reddit', 'crowd-source', 'community', 'analysis'],
  },
  {
    id: 'fox-live-coverage',
    title: 'LIVE: Experts react as Pentagon releases UFO files to public',
    source: 'Fox News / LiveNOW',
    sourceUrl: 'https://www.livenowfox.com/ufo-files-released',
    category: 'breaking',
    date: '2026-05-08',
    summary: "LiveNOW from FOX provided continuous live coverage of the document release, featuring real-time expert analysis. The broadcast included interviews with former intelligence officials and UAP researchers reviewing the files as they became available on war.gov/UFO.",
    tags: ['live', 'TV', 'expert', 'real-time'],
  },

  // Science
  {
    id: 'nasa-isaacman-statement',
    title: 'NASA Administrator supports PURSUE transparency, commits to scientific analysis',
    source: 'NASA / Xinhua',
    sourceUrl: 'https://www.news.cn/2026/05/08/nasa-pursue-uap/',
    category: 'science',
    date: '2026-05-08',
    summary: "NASA Administrator Jared Isaacman expressed support for the PURSUE initiative, emphasizing NASA's commitment to rigorous scientific research and data analysis of the released materials. The agency plans to convene an independent review panel to examine the Apollo-era documents.",
    keyQuote: "Science demands transparency. We welcome the opportunity to apply rigorous analysis to these materials.",
    quoteAttribution: 'Jared Isaacman, NASA Administrator',
    tags: ['NASA', 'Isaacman', 'science', 'review panel'],
  },
  {
    id: 'pbs-experts-caution',
    title: 'UAP experts urge caution: raw files can be easily misinterpreted',
    source: 'PBS NewsHour',
    sourceUrl: 'https://www.pbs.org/newshour/science/uap-experts-caution',
    category: 'science',
    date: '2026-05-09',
    summary: 'Former officials from the Pentagon\'s All-domain Anomaly Resolution Office (AARO) warn that without professional analysis, released sensor videos can be misinterpreted. Experts note that many "unidentified" objects may have conventional explanations — sensor artifacts, optical phenomena, or adversary technology.',
    keyQuote: 'Publicizing raw files without context may simply fuel further conspiracy theories and arm-chair pseudoscience.',
    quoteAttribution: 'Former AARO official',
    tags: ['AARO', 'caution', 'misinterpretation', 'expert'],
  },

  // International
  {
    id: 'aa-turkey-reaction',
    title: 'World leaders react to unprecedented US UAP disclosure',
    source: 'Anadolu Agency',
    sourceUrl: 'https://www.aa.com.tr/en/world/uap-disclosure-international-reaction/',
    category: 'international',
    date: '2026-05-09',
    summary: 'Anadolu Agency reports on international reactions to the PURSUE release. European and Asian governments are closely monitoring the disclosure. Some nations are reportedly considering similar transparency measures for their own UAP records, while intelligence analysts assess implications for global security frameworks.',
    tags: ['international', 'Europe', 'Asia', 'global'],
  },
  {
    id: 'xinhua-china-reaction',
    title: 'China watches US UAP disclosure with measured interest',
    source: 'Xinhua News Agency',
    sourceUrl: 'https://www.news.cn/2026/05/09/us-uap-disclosure/',
    category: 'international',
    date: '2026-05-09',
    summary: "Chinese state media provides measured coverage of the PURSUE release, noting the historic nature of the disclosure while questioning whether all significant materials have been included. Analysts in Beijing observe that the State Department cables reference UAP sightings reported through international embassy channels.",
    tags: ['China', 'international', 'diplomacy', 'embassy'],
  },

  // Opinion
  {
    id: 'latimes-opinion',
    title: 'Opinion: The UFO files are out. Now the real work begins.',
    source: 'Los Angeles Times',
    sourceUrl: 'https://www.latimes.com/opinion/story/2026-05-09/ufo-files-pursue-analysis',
    category: 'opinion',
    date: '2026-05-09',
    summary: 'An LA Times editorial argues that while the PURSUE release is a milestone for government transparency, the 108 redacted files and absence of certain expected documents suggest the disclosure is incomplete. The piece calls for sustained public pressure and independent scientific review.',
    tags: ['opinion', 'editorial', 'transparency', 'redactions'],
  },
  {
    id: 'independent-distraction',
    title: 'Critics call UFO release a "shiny object" distraction from policy issues',
    source: 'The Independent',
    sourceUrl: 'https://www.independent.co.uk/news/world/americas/ufo-release-distraction/',
    category: 'opinion',
    date: '2026-05-09',
    summary: 'The Independent reports on critics who label the PURSUE release as political theater designed to distract from domestic policy controversies. Opposition voices argue the timing and spectacle of the release serve the administration\'s media strategy rather than genuine scientific inquiry.',
    tags: ['criticism', 'politics', 'distraction', 'media'],
  },

  // More Analysis
  {
    id: 'aviation-week-technical',
    title: "Technical analysis: What the PURSUE sensor data actually shows",
    source: 'Aviation Week',
    sourceUrl: 'https://aviationweek.com/defense/uap-pursue-sensor-analysis',
    category: 'analysis',
    date: '2026-05-10',
    summary: 'Aviation Week provides a deeply technical analysis of the FLIR, radar, and multi-sensor data included in the PURSUE release. The article examines the flight characteristics recorded in the Range Fouler incidents, noting objects that appear to exceed known aerodynamic performance envelopes.',
    tags: ['FLIR', 'radar', 'sensor', 'technical', 'aerodynamics'],
  },
  {
    id: 'military-com-war-gov',
    title: "War.gov/UFO becomes most-visited government page in history",
    source: 'Military.com',
    sourceUrl: 'https://www.military.com/daily-news/2026/05/09/war-gov-ufo-traffic.html',
    category: 'breaking',
    date: '2026-05-09',
    summary: 'Military.com reports that war.gov/UFO became the most-visited government web page in history within 24 hours of launch, overwhelming servers and requiring emergency infrastructure scaling. The site has drawn visitors from over 180 countries, demonstrating the global appetite for UAP transparency.',
    keyQuote: 'The traffic to war.gov/UFO exceeded anything we have previously experienced on any government website.',
    quoteAttribution: 'Department of War spokesperson',
    tags: ['traffic', 'war.gov', 'record', 'global'],
    featured: true,
  },
  {
    id: 'engadget-tech-response',
    title: 'How tech communities are building tools to analyze the UFO files',
    source: 'Engadget',
    sourceUrl: 'https://www.engadget.com/science/ufo-pursue-tech-community/',
    category: 'reaction',
    date: '2026-05-10',
    summary: 'Engadget covers the rapid mobilization of developer communities building open-source tools to analyze the PURSUE files. Projects include AI-powered document OCR for the redacted PDFs, video enhancement pipelines for sensor footage, and geographic mapping of reported encounter locations.',
    tags: ['tech', 'open-source', 'AI', 'tools', 'community'],
  },
  {
    id: 'spokesman-local-impact',
    title: 'Local communities near reported UAP sites react to declassified files',
    source: 'The Spokesman-Review',
    sourceUrl: 'https://www.spokesman.com/stories/2026/may/09/uap-local-reaction/',
    category: 'reaction',
    date: '2026-05-09',
    summary: 'Local news outlets in communities near documented UAP encounter sites report heightened interest and tourism. Residents in areas referenced in the declassified files share their own accounts and express both excitement and concern about the implications of the disclosures.',
    tags: ['local', 'community', 'tourism', 'witness'],
  },
];

export function getCoverageByCategory(category: CoverageCategory): CoverageItem[] {
  return coverage.filter(c => c.category === category);
}

export function getFeaturedCoverage(): CoverageItem[] {
  return coverage.filter(c => c.featured);
}
