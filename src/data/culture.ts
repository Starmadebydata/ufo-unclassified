// Global UFO films, television, documentaries, reports, and public milestones.

export type CultureCategory =
  | 'film'
  | 'series'
  | 'documentary'
  | 'journalism'
  | 'official-report'
  | 'public-hearing'
  | 'case-file';

export interface CultureItem {
  id: string;
  title: string;
  year: number;
  region: string;
  category: CultureCategory;
  format: string;
  coverImage: string;
  coverPosition?: string;
  summary: string;
  whyItMatters: string;
  tags: string[];
  sourceUrl?: string;
  featured?: boolean;
}

export interface CultureFAQ {
  question: string;
  answer: string;
}

export interface CultureDetail {
  seoTitle: string;
  seoDescription: string;
  directAnswer: string;
  context: string[];
  impact: string[];
  boundaryNote: string;
  keyFacts: string[];
  sourceNote: string;
  faqs: CultureFAQ[];
  relatedCultureIds: string[];
  relatedTopicSlugs?: string[];
  relatedDocumentSlugs?: string[];
}

export type CultureRecord = CultureItem & {
  detail: CultureDetail;
};

export const CULTURE_CATEGORIES: Record<CultureCategory, { label: string; code: string; color: string }> = {
  film: { label: 'Film', code: 'FILM', color: '#22d3ee' },
  series: { label: 'TV Series', code: 'TV', color: '#a855f7' },
  documentary: { label: 'Documentary', code: 'DOC', color: '#10b981' },
  journalism: { label: 'Journalism', code: 'NEWS', color: '#f59e0b' },
  'official-report': { label: 'Official Report', code: 'RPT', color: '#ef4444' },
  'public-hearing': { label: 'Public Hearing', code: 'HEAR', color: '#f97316' },
  'case-file': { label: 'Case File', code: 'CASE', color: '#6366f1' },
};

export const screenWorks: CultureItem[] = [
  {
    id: 'day-earth-stood-still',
    title: 'The Day the Earth Stood Still',
    year: 1951,
    region: 'United States',
    category: 'film',
    format: 'Feature film',
    coverImage: '/blog-assets/sandia-green-fireballs-1948-1950-cover.jpg',
    coverPosition: 'center 38%',
    summary: 'A flying saucer lands in Washington, D.C., turning the UFO image into a Cold War warning about fear, weapons, and first contact.',
    whyItMatters: 'It helped define the classic saucer arrival story for postwar cinema.',
    tags: ['Cold War', 'flying saucer', 'first contact'],
    sourceUrl: 'https://www.britannica.com/topic/The-Day-the-Earth-Stood-Still-film-1951',
    featured: true,
  },
  {
    id: 'mysterians',
    title: 'The Mysterians',
    year: 1957,
    region: 'Japan',
    category: 'film',
    format: 'Feature film',
    coverImage: '/blog-assets/cia-sary-shagan-green-object-1973-cover.jpg',
    coverPosition: 'center 42%',
    summary: 'Toho mixed alien visitors, hidden bases, disaster spectacle, and postwar science anxiety into one of Japan\'s early widescreen UFO stories.',
    whyItMatters: 'It shows how the flying saucer idea moved beyond U.S. popular culture.',
    tags: ['Japan', 'Toho', 'invasion'],
    sourceUrl: 'https://www.tohokingdom.com/movies/mysterians.htm',
  },
  {
    id: 'close-encounters',
    title: 'Close Encounters of the Third Kind',
    year: 1977,
    region: 'United States',
    category: 'film',
    format: 'Feature film',
    coverImage: '/blog-assets/nasa-uap-vm6-apollo-17-1972.jpg',
    coverPosition: 'center 44%',
    summary: 'Steven Spielberg turned UFO contact into a story of obsession, sound, light, official secrecy, and a peaceful encounter at Devil\'s Tower.',
    whyItMatters: 'It became one of the reference points for how UFO contact is staged on screen.',
    tags: ['Spielberg', 'contact', 'government secrecy'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Close_Encounters_of_the_Third_Kind',
    featured: true,
  },
  {
    id: 'x-files',
    title: 'The X-Files',
    year: 1993,
    region: 'United States / Canada',
    category: 'series',
    format: 'Television series',
    coverImage: '/blog-assets/fbi-case-62-hq-83894-section-1.jpg',
    coverPosition: 'center 22%',
    summary: 'FBI agents investigate unexplained cases, turning UFO cover-ups, whistleblowers, black projects, and public distrust into long-running television mythology.',
    whyItMatters: 'It made UFO secrecy part of mainstream serialized TV language.',
    tags: ['FBI', 'conspiracy', 'television'],
    sourceUrl: 'https://www.britannica.com/topic/The-X-Files',
    featured: true,
  },
  {
    id: 'arrival',
    title: 'Arrival',
    year: 2016,
    region: 'United States / Canada',
    category: 'film',
    format: 'Feature film',
    coverImage: '/blog-assets/nasa-uap-vm1-apollo-12-1969.jpg',
    coverPosition: 'center 54%',
    summary: 'A linguist is asked to communicate with visitors whose craft appear across the world, shifting the UFO story from threat response to interpretation.',
    whyItMatters: 'It treats contact as a problem of language, time, and human cooperation.',
    tags: ['language', 'global event', 'first contact'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Arrival_(film)',
  },
  {
    id: 'phenomenon',
    title: 'The Phenomenon',
    year: 2020,
    region: 'United States',
    category: 'documentary',
    format: 'Documentary film',
    coverImage: '/blog-assets/dow-uap-d56-range-fouler-arabian-sea-august-2020.jpg',
    coverPosition: 'center 46%',
    summary: 'James Fox surveys decades of UFO cases, military testimony, nuclear-site reports, and the renewed public attention after the Pentagon video era.',
    whyItMatters: 'It packages modern disclosure arguments for a broad documentary audience.',
    tags: ['documentary', 'Pentagon videos', 'witnesses'],
    sourceUrl: 'https://tv.apple.com/us/movie/el-fenomeno/umc.cmc.e8djkr1rhg7vubj9zgnv7b0a',
  },
  {
    id: 'nope',
    title: 'Nope',
    year: 2022,
    region: 'United States',
    category: 'film',
    format: 'Feature film',
    coverImage: '/blog-assets/release02-pr071-lake-huron.jpg',
    coverPosition: 'center 40%',
    summary: 'Jordan Peele reframes the flying saucer as spectacle, predation, media capture, and the human urge to turn danger into an image.',
    whyItMatters: 'It shows how the UFO image still works in horror, westerns, and media criticism.',
    tags: ['horror', 'spectacle', 'flying saucer'],
    sourceUrl: 'https://www.cbsnews.com/news/jordan-peele-nope-keke-palmer-movie/',
  },
  {
    id: 'ufo-sweden',
    title: 'UFO Sweden / Watch the Skies',
    year: 2022,
    region: 'Sweden',
    category: 'film',
    format: 'Feature film',
    coverImage: '/blog-assets/fbi-photo-b18.jpg',
    coverPosition: 'center 30%',
    summary: 'A Swedish adventure film follows a young woman and a UFO association investigating a missing father and possible contact.',
    whyItMatters: 'It brings local UFO club culture and family mystery into a European genre frame.',
    tags: ['Sweden', 'adventure', 'investigation'],
    sourceUrl: 'https://cineuropa.org/en/film/436279/',
  },
  {
    id: 'moment-of-contact',
    title: 'Moment of Contact',
    year: 2022,
    region: 'Brazil / United States',
    category: 'documentary',
    format: 'Documentary film',
    coverImage: '/blog-assets/fbi-photo-a1.jpg',
    coverPosition: 'center 28%',
    summary: 'A documentary centered on reported 1996 events in Varginha, Brazil, including claims of a UFO crash and unusual beings.',
    whyItMatters: 'It gives an international case a documentary treatment aimed at English-speaking viewers.',
    tags: ['Brazil', 'Varginha', 'documentary'],
    sourceUrl: 'https://tv.apple.com/us/movie/momento-de-contacto/umc.cmc.eq4hi5uneea0v3a7e1sqrq9f',
  },
  {
    id: 'encounters-netflix',
    title: 'Encounters',
    year: 2023,
    region: 'Global',
    category: 'documentary',
    format: 'Documentary series',
    coverImage: '/blog-assets/western-us-event-slides-2026.jpg',
    coverPosition: 'center 50%',
    summary: 'A Netflix series built around multiple-witness UFO accounts from different countries and communities.',
    whyItMatters: 'It reflects the current shift toward global, witness-centered UFO storytelling.',
    tags: ['Netflix', 'global cases', 'witnesses'],
    sourceUrl: 'https://www.netflix.com/title/81489034',
  },
];

export const reportMilestones: CultureItem[] = [
  {
    id: 'kenneth-arnold-flying-saucer',
    title: 'Kenneth Arnold and the "flying saucer" wave',
    year: 1947,
    region: 'United States',
    category: 'journalism',
    format: 'News event',
    coverImage: '/blog-assets/release02-pr050-iran-formation.jpg',
    coverPosition: 'center 42%',
    summary: 'A private pilot reported seeing fast-moving objects near Mount Rainier, helping launch the modern "flying saucer" news cycle.',
    whyItMatters: 'The phrase and the pattern of mass public attention became part of UFO culture almost immediately.',
    tags: ['flying saucer', 'press', 'postwar'],
    sourceUrl: 'https://www.britannica.com/topic/unidentified-flying-object',
  },
  {
    id: 'project-blue-book',
    title: 'Project BLUE BOOK records',
    year: 1952,
    region: 'United States',
    category: 'case-file',
    format: 'Government case archive',
    coverImage: '/blog-assets/fbi-photo-b10.jpg',
    coverPosition: 'center 24%',
    summary: 'The U.S. Air Force program collected and evaluated UFO reports from the early Cold War through 1969.',
    whyItMatters: 'It remains one of the largest official public archives for historical UFO reporting.',
    tags: ['Air Force', 'archive', 'case files'],
    sourceUrl: 'https://www.archives.gov/research/military/air-force/ufos',
    featured: true,
  },
  {
    id: 'rendlesham-forest',
    title: 'Rendlesham Forest files',
    year: 1980,
    region: 'United Kingdom',
    category: 'case-file',
    format: 'Released government file',
    coverImage: '/blog-assets/dow-uap-d62-strait-of-hormuz-september-2020.jpg',
    coverPosition: 'center 16%',
    summary: 'The UK National Archives holds files and correspondence around reported lights near RAF Woodbridge and Rendlesham Forest.',
    whyItMatters: 'It is one of Britain\'s best-known UFO cases and a major example of archival public interest.',
    tags: ['United Kingdom', 'National Archives', 'military base'],
    sourceUrl: 'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/postwar/ufo-reports/',
  },
  {
    id: 'belgian-ufo-wave',
    title: 'Belgian UFO wave',
    year: 1989,
    region: 'Belgium',
    category: 'journalism',
    format: 'Mass-sighting reports',
    coverImage: '/blog-assets/release02-pr098-persian-gulf-formation.jpg',
    coverPosition: 'center 48%',
    summary: 'A wave of reports described large triangular objects over Belgium, drawing police, press, and military attention.',
    whyItMatters: 'It became one of Europe\'s most cited modern UFO waves.',
    tags: ['Belgium', 'triangles', 'mass sightings'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Belgian_UFO_wave',
  },
  {
    id: 'dod-navy-videos',
    title: 'Department of Defense releases Navy UAP videos',
    year: 2020,
    region: 'United States',
    category: 'official-report',
    format: 'Official video release',
    coverImage: '/blog-assets/dow-uap-d38-range-fouler-middle-east-may-2020.jpg',
    coverPosition: 'center 42%',
    summary: 'The Department of Defense authorized public release of three Navy videos showing unidentified aerial phenomena.',
    whyItMatters: 'It moved several widely discussed clips from leaked internet material into official public release.',
    tags: ['Navy', 'Pentagon', 'video'],
    sourceUrl: 'https://www.defense.gov/News/Releases/release/article/2165713/statement-by-the-department-of-defense-on-the-release-of-historical-navy-videos/',
    featured: true,
  },
  {
    id: 'sixty-minutes-uap',
    title: '60 Minutes brings military UAP reports to prime-time TV',
    year: 2021,
    region: 'United States',
    category: 'journalism',
    format: 'Broadcast report',
    coverImage: '/video-thumbnails/1006083_DOW-UAP-PR36_Unresolved_UAP_Report_Middle_East_May_2020.jpg',
    coverPosition: 'center 48%',
    summary: 'CBS interviewed pilots, former officials, and investigators about UAPs regularly reported in restricted U.S. airspace.',
    whyItMatters: 'It helped move the topic from niche communities into mainstream broadcast journalism.',
    tags: ['CBS', 'pilots', 'broadcast'],
    sourceUrl: 'https://www.cbsnews.com/news/ufo-military-intelligence-60-minutes-2021-08-29/',
  },
  {
    id: 'odni-preliminary-assessment',
    title: 'ODNI Preliminary Assessment on UAP',
    year: 2021,
    region: 'United States',
    category: 'official-report',
    format: 'Intelligence report',
    coverImage: '/blog-assets/odni-usper-narrative-redacted-cover.jpg',
    coverPosition: 'center 24%',
    summary: 'The Office of the Director of National Intelligence released an unclassified assessment on unidentified aerial phenomena.',
    whyItMatters: 'It gave the public a formal intelligence frame for UAP reporting and data gaps.',
    tags: ['ODNI', 'assessment', 'UAP'],
    sourceUrl: 'https://www.dni.gov/index.php/newsroom/reports-publications/reports-publications-2021/3550-preliminary-assessment-unidentified-aerial-phenomena',
    featured: true,
  },
  {
    id: 'house-oversight-2023',
    title: 'House Oversight UAP hearing',
    year: 2023,
    region: 'United States',
    category: 'public-hearing',
    format: 'Congressional hearing',
    coverImage: '/blog-assets/release02-pr071-lake-huron-intercept.jpg',
    coverPosition: 'center 44%',
    summary: 'The House Oversight Committee held a public hearing on UAP, national security, public safety, and government transparency.',
    whyItMatters: 'It put military witnesses and whistleblower claims into a public congressional record.',
    tags: ['Congress', 'hearing', 'transparency'],
    sourceUrl: 'https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-implications-on-national-security-public-safety-and-government-transparency/',
  },
  {
    id: 'nasa-uap-report',
    title: 'NASA UAP Independent Study Team report',
    year: 2023,
    region: 'United States',
    category: 'official-report',
    format: 'Scientific advisory report',
    coverImage: '/blog-assets/nasa-uap-vm3-apollo-12-1969.jpg',
    coverPosition: 'center 56%',
    summary: 'NASA published recommendations on how the agency could contribute to better UAP data collection and analysis.',
    whyItMatters: 'It framed UAP as a data-quality and scientific-method problem rather than only a defense topic.',
    tags: ['NASA', 'science', 'data'],
    sourceUrl: 'https://science.nasa.gov/uap/',
  },
  {
    id: 'aaro-historical-report',
    title: 'AARO Historical Record Report, Volume I',
    year: 2024,
    region: 'United States',
    category: 'official-report',
    format: 'Historical government report',
    coverImage: '/blog-assets/release02-pr051-syrian-instant-acceleration-cover.jpg',
    coverPosition: 'center 48%',
    summary: 'The All-domain Anomaly Resolution Office published a historical review of U.S. government involvement with UAP.',
    whyItMatters: 'It became a major official reference point for the dispute over hidden programs and historical claims.',
    tags: ['AARO', 'history', 'official record'],
    sourceUrl: 'https://www.aaro.mil/Portals/136/PDFs/AARO_Historical_Record_Report_Volume_1_2024.pdf',
  },
];

export const cultureItems = [...screenWorks, ...reportMilestones];

const cultureDetailsById: Record<string, CultureDetail> = {
  'day-earth-stood-still': {
    seoTitle: 'The Day the Earth Stood Still and the UFO First-Contact Template',
    seoDescription: 'A citation-ready guide to The Day the Earth Stood Still, the 1951 UFO film that shaped Cold War first-contact imagery and flying saucer cinema.',
    directAnswer: 'The Day the Earth Stood Still is a 1951 U.S. feature film about a saucer landing in Washington, D.C. It matters to UFO culture because it turned the flying saucer image into a public story about Cold War fear, weapons, authority, and peaceful contact.',
    context: [
      'The film appeared only a few years after the 1947 flying saucer news wave, when newspapers, military statements, and public speculation had made unidentified objects part of daily conversation.',
      'Its central image is not a hidden sighting or a vague light in the sky. A craft lands in the national capital, forcing the public, military, press, and political system to react in the open.',
    ],
    impact: [
      'It helped establish the classic UFO arrival scene: the quiet craft, the crowd, the nervous state response, and the visitor who becomes a test of human behavior.',
      'Later first-contact films often work either with or against this template, especially when they show official secrecy, public panic, or a choice between communication and force.',
    ],
    boundaryNote: 'This is a fictional film. The page treats it as cultural history, not as evidence of a UFO event.',
    keyFacts: [
      'Released in 1951 as a U.S. feature film.',
      'Uses a flying saucer landing in Washington, D.C. as its central public event.',
      'Connects UFO imagery to Cold War anxiety, nuclear weapons, and first contact.',
      'Best read beside early postwar UFO news and official case-file culture.',
    ],
    sourceNote: 'The external reference is used for film identification and background. UFO Declassified adds the cultural analysis and links to related archive topics.',
    faqs: [
      {
        question: 'Is The Day the Earth Stood Still based on a real UFO case?',
        answer: 'No. It is a fictional feature film. Its importance is that it translated early flying saucer anxiety into a lasting screen language for first contact.',
      },
      {
        question: 'Why does this film belong in a UFO research culture guide?',
        answer: 'It shows how quickly the saucer image moved from news reports into mainstream entertainment and public-policy allegory.',
      },
      {
        question: 'What should readers compare it with?',
        answer: 'Compare it with the 1947 Kenneth Arnold news cycle, Project BLUE BOOK records, and later contact films such as Close Encounters of the Third Kind.',
      },
    ],
    relatedCultureIds: ['kenneth-arnold-flying-saucer', 'close-encounters', 'project-blue-book', 'arrival'],
    relatedTopicSlugs: ['historical-flying-disc-records'],
  },
  mysterians: {
    seoTitle: 'The Mysterians and Japan\'s Early UFO Invasion Cinema',
    seoDescription: 'A concise guide to The Mysterians, Toho\'s 1957 UFO and alien-invasion film, and its place in international UFO culture.',
    directAnswer: 'The Mysterians is a 1957 Japanese feature film from Toho that mixes alien visitors, hidden bases, disaster spectacle, and postwar science anxiety. It matters because it shows that UFO cinema was not only an American Cold War genre.',
    context: [
      'By the late 1950s, flying saucer stories had become an international screen language. The Mysterians translated that language into a Japanese science-fiction setting shaped by postwar technology and disaster imagery.',
      'The film uses alien arrival and futuristic weapons as public crisis material, which places UFO spectacle next to national recovery, defense, and scientific ambition.',
    ],
    impact: [
      'It broadened UFO screen culture beyond U.S. saucer films and helped show how local film industries could adapt the same symbol to different historical memories.',
      'Its hidden-base and alien-demand structure also echoes later invasion stories where contact is less a mystery than a geopolitical emergency.',
    ],
    boundaryNote: 'This is a fictional film. It is included for cultural influence and international context, not as a source record.',
    keyFacts: [
      'Released in Japan in 1957.',
      'Produced within Toho\'s postwar science-fiction and effects tradition.',
      'Uses alien visitors, saucer-like craft, and military response as central elements.',
      'Useful for comparing U.S. and Japanese UFO storytelling in the 1950s.',
    ],
    sourceNote: 'The external reference identifies the film and production context. The interpretation here focuses on UFO culture and global genre movement.',
    faqs: [
      {
        question: 'Is The Mysterians a documentary?',
        answer: 'No. It is a fictional Japanese science-fiction film.',
      },
      {
        question: 'Why is it important to UFO culture?',
        answer: 'It shows the flying saucer idea spreading into non-U.S. cinema and being reshaped by Japanese postwar science-fiction concerns.',
      },
      {
        question: 'What other Culture pages connect to it?',
        answer: 'It connects well with The Day the Earth Stood Still, UFO Sweden, and other international UFO screen works.',
      },
    ],
    relatedCultureIds: ['day-earth-stood-still', 'ufo-sweden', 'close-encounters', 'arrival'],
  },
  'close-encounters': {
    seoTitle: 'Close Encounters of the Third Kind and Modern UFO Contact Cinema',
    seoDescription: 'A GEO-ready guide to Close Encounters of the Third Kind, Spielberg\'s 1977 first-contact film and its role in UFO culture.',
    directAnswer: 'Close Encounters of the Third Kind is a 1977 U.S. feature film that made UFO contact feel visual, musical, obsessive, and official at the same time. It remains one of the most influential screen references for peaceful contact and government secrecy.',
    context: [
      'The film arrives after decades of saucer reports, official investigations, and popular speculation. It does not simply show a UFO sighting; it follows the effect of the encounter on ordinary witnesses.',
      'Its use of light, sound, coded communication, and a restricted meeting site helped define how audiences imagine a large-scale contact event.',
    ],
    impact: [
      'The film made wonder, not only fear, a dominant UFO emotion in mainstream cinema.',
      'It also fused witness obsession with official secrecy, a combination that later television, documentaries, and disclosure narratives would reuse repeatedly.',
    ],
    boundaryNote: 'This is a fictional film. The page discusses its cultural role and does not present it as evidence.',
    keyFacts: [
      'Released in 1977 as a U.S. feature film.',
      'Centers on UFO witnesses, official secrecy, and a staged first-contact event.',
      'Popularized a visual vocabulary of bright craft, musical communication, and a hidden government operation.',
      'Frequently cited as a reference point for peaceful UFO contact stories.',
    ],
    sourceNote: 'The source link is used for film identification. UFO Declassified adds a research-facing summary, cultural boundaries, and links to related records.',
    faqs: [
      {
        question: 'Is Close Encounters of the Third Kind based on a real case?',
        answer: 'No single public source record makes it a direct case adaptation. It is a fictional first-contact story built from broader UFO-era ideas.',
      },
      {
        question: 'Why is the film important for UFO vocabulary?',
        answer: 'It gave audiences a durable image of peaceful contact, official staging, witness compulsion, and communication through light and sound.',
      },
      {
        question: 'How does it differ from invasion films?',
        answer: 'It treats contact as mysterious and transformative rather than primarily military or apocalyptic.',
      },
    ],
    relatedCultureIds: ['day-earth-stood-still', 'x-files', 'arrival', 'project-blue-book'],
    relatedTopicSlugs: ['historical-flying-disc-records'],
  },
  'x-files': {
    seoTitle: 'The X-Files and the Mainstream UFO Cover-Up Mythology',
    seoDescription: 'A guide to The X-Files, the 1993 television series that made UFO secrecy, whistleblowers, and government mistrust part of mainstream TV.',
    directAnswer: 'The X-Files is a 1993 television series about FBI agents investigating unexplained cases. It matters to UFO culture because it turned government secrecy, black projects, informants, and public distrust into a long-running mainstream mythology.',
    context: [
      'The series arrived at a moment when cable news, tabloid television, conspiracy culture, and renewed interest in historical UFO claims were feeding each other.',
      'Its UFO episodes did not stand alone. They sat inside a wider structure of classified programs, missing evidence, unreliable witnesses, and institutions that could hide or distort facts.',
    ],
    impact: [
      'The show made the language of cover-ups familiar to viewers who were not already part of UFO communities.',
      'It also shaped the way later documentaries and online debates framed witnesses, insiders, secrecy, and the demand for disclosure.',
    ],
    boundaryNote: 'This is a fictional television series. It is included as a cultural reference, not as a source for factual claims.',
    keyFacts: [
      'Premiered in 1993.',
      'Follows FBI agents investigating paranormal and unexplained cases.',
      'Made UFO secrecy and hidden programs a mainstream serialized-TV theme.',
      'Useful for understanding how entertainment influenced the public language of disclosure.',
    ],
    sourceNote: 'The external source identifies the series. The analysis here focuses on the show\'s influence on UFO public vocabulary.',
    faqs: [
      {
        question: 'Did The X-Files report real UFO evidence?',
        answer: 'No. It is a fictional drama, although it drew from public anxieties, folklore, and claims already circulating in UFO culture.',
      },
      {
        question: 'Why does The X-Files still matter?',
        answer: 'Many later conversations about whistleblowers, hidden programs, and official denial use a vocabulary that the show helped popularize.',
      },
      {
        question: 'What should it be read beside?',
        answer: 'Read it beside Project BLUE BOOK, modern congressional hearings, and documentaries about UAP disclosure to separate culture from records.',
      },
    ],
    relatedCultureIds: ['project-blue-book', 'close-encounters', 'house-oversight-2023', 'phenomenon'],
    relatedTopicSlugs: ['fbi-ufo-files', 'historical-flying-disc-records'],
    relatedDocumentSlugs: ['65-hs1-834228961-62-hq-83894-section-1', 'fbi-photo-series-a'],
  },
  arrival: {
    seoTitle: 'Arrival and the UFO Contact Story as a Language Problem',
    seoDescription: 'A research-friendly guide to Arrival, the 2016 film that reframed UFO contact around language, interpretation, and global cooperation.',
    directAnswer: 'Arrival is a 2016 feature film about a linguist asked to communicate with visitors whose craft appear around the world. It matters because it shifts the UFO contact story from invasion response to interpretation, language, time, and cooperation.',
    context: [
      'Arrival uses the global arrival of unknown craft as the start of a communications problem. The central question is not only what the visitors are, but whether humans can understand them without projecting fear onto them.',
      'The film belongs to a quieter branch of UFO storytelling where meaning, perception, and translation are more important than pursuit or combat.',
    ],
    impact: [
      'It updated first-contact cinema for a globalized era, where many governments react at once and information control becomes part of the drama.',
      'It also made expert interpretation, not only military response, the central tool for dealing with an unknown aerial or extraterrestrial event.',
    ],
    boundaryNote: 'This is a fictional film. It is included for its cultural treatment of contact and interpretation.',
    keyFacts: [
      'Released in 2016.',
      'Centers on a linguist and a global first-contact event.',
      'Treats UFO contact as a question of language, time, and cooperation.',
      'Connects well to earlier peaceful-contact films but uses a more analytic tone.',
    ],
    sourceNote: 'The source link identifies the film. This page adds the UFO-culture framing and related archive pathways.',
    faqs: [
      {
        question: 'Is Arrival about UFO evidence?',
        answer: 'No. It is a fictional first-contact film, not a documentary or official record.',
      },
      {
        question: 'Why is Arrival useful in a UFO culture guide?',
        answer: 'It shows how modern contact stories can focus on interpretation and data rather than only threat, pursuit, or secrecy.',
      },
      {
        question: 'Which older films does it echo?',
        answer: 'It echoes peaceful-contact traditions associated with The Day the Earth Stood Still and Close Encounters of the Third Kind.',
      },
    ],
    relatedCultureIds: ['close-encounters', 'day-earth-stood-still', 'nasa-uap-report', 'encounters-netflix'],
  },
  phenomenon: {
    seoTitle: 'The Phenomenon Documentary and the Modern UFO Disclosure Argument',
    seoDescription: 'A guide to The Phenomenon, the 2020 UFO documentary that packaged military testimony, historical cases, and disclosure arguments for a wider audience.',
    directAnswer: 'The Phenomenon is a 2020 documentary film that surveys UFO cases, military testimony, nuclear-site reports, and the renewed public attention after the Pentagon video era. It matters because it helped package modern disclosure arguments for a broad documentary audience.',
    context: [
      'The documentary sits in the period after leaked and officially acknowledged Navy UAP videos brought the topic back into mainstream journalism.',
      'It links older historical cases with contemporary pilots, officials, and public demands for transparency, creating a bridge between classic UFO culture and the current UAP debate.',
    ],
    impact: [
      'It gave viewers a compact disclosure narrative: credible witnesses, official reluctance, historical continuity, and a call for public attention.',
      'It also helped shift some public discussion from fringe entertainment toward testimony, records, and institutional accountability.',
    ],
    boundaryNote: 'This is a documentary. It should be read as a presentation of claims, testimony, and interpretation, not as a government source record by itself.',
    keyFacts: [
      'Released in 2020.',
      'Directed toward a broad audience interested in UFO disclosure.',
      'Connects historical cases with modern military and government-adjacent testimony.',
      'Best evaluated alongside primary records and official reports.',
    ],
    sourceNote: 'The external reference identifies viewing availability. UFO Declassified separates the documentary argument from primary-source records.',
    faqs: [
      {
        question: 'Is The Phenomenon an official government report?',
        answer: 'No. It is an independent documentary. It may discuss official material, but it is not itself an official source.',
      },
      {
        question: 'Why is it important after the Navy videos?',
        answer: 'It helped connect public interest in those videos with a longer disclosure narrative and older UFO cases.',
      },
      {
        question: 'How should researchers use it?',
        answer: 'Use it as a cultural and documentary overview, then verify specific claims against primary sources where available.',
      },
    ],
    relatedCultureIds: ['dod-navy-videos', 'odni-preliminary-assessment', 'house-oversight-2023', 'aaro-historical-report'],
    relatedTopicSlugs: ['pentagon-uap-videos', 'pursue-release-2026'],
    relatedDocumentSlugs: ['release-02-file-057-dow-uap-pr098-ufos-in-formation-over-persian-gulf', 'release-02-file-002-dow-uap-pr051-syrian-uap-instant-acceleration'],
  },
  nope: {
    seoTitle: 'Nope and the UFO as Spectacle, Predator, and Captured Image',
    seoDescription: 'A guide to Nope, Jordan Peele\'s 2022 film that reframes the UFO image through horror, spectacle, media capture, and the urge to document danger.',
    directAnswer: 'Nope is a 2022 U.S. feature film that reframes the flying saucer image through horror, spectacle, predation, and media capture. It matters because it asks why people try to turn danger into an image they can own, sell, or prove.',
    context: [
      'The film appears in an era when unexplained aerial footage circulates instantly and public arguments often depend on whether an image can be captured, authenticated, or monetized.',
      'Instead of treating the UFO only as a vehicle, Nope uses the saucer form as a visual trap: something people watch before they understand the danger of watching.',
    ],
    impact: [
      'It updates UFO cinema for the age of viral footage, surveillance, and spectacle.',
      'It also connects UFO imagery to westerns, horror, Hollywood labor, and the ethics of looking.',
    ],
    boundaryNote: 'This is a fictional film. It is included for cultural analysis, not as evidence or reporting.',
    keyFacts: [
      'Released in 2022.',
      'Uses UFO imagery inside a horror and western framework.',
      'Focuses on spectacle, media capture, and the desire to document the extraordinary.',
      'Useful for comparing fictional UFO imagery with modern video-driven UAP debates.',
    ],
    sourceNote: 'The external source provides film and interview context. This page focuses on how the film changes the cultural meaning of the saucer image.',
    faqs: [
      {
        question: 'Is Nope a UFO disclosure film?',
        answer: 'No. It is a fictional horror film that uses UFO imagery to explore spectacle and image-making.',
      },
      {
        question: 'Why does Nope matter to modern UFO culture?',
        answer: 'It reflects a period when public UFO debate is heavily shaped by images, videos, leaks, and arguments over proof.',
      },
      {
        question: 'How is it different from classic saucer films?',
        answer: 'Classic saucer films often focus on arrival or invasion. Nope focuses on the act of watching and recording the unknown.',
      },
    ],
    relatedCultureIds: ['close-encounters', 'x-files', 'dod-navy-videos', 'phenomenon'],
    relatedTopicSlugs: ['pentagon-uap-videos'],
  },
  'ufo-sweden': {
    seoTitle: 'UFO Sweden / Watch the Skies and European UFO Club Culture',
    seoDescription: 'A guide to UFO Sweden, the 2022 Swedish adventure film that places UFO investigation inside local club culture and family mystery.',
    directAnswer: 'UFO Sweden, also known internationally as Watch the Skies, is a 2022 Swedish feature film about a young woman and a UFO association investigating a missing father and possible contact. It matters because it brings local UFO club culture into a European genre frame.',
    context: [
      'The film is built around investigation outside the formal state archive: enthusiasts, local memory, personal loss, and the stubborn pursuit of a case that others dismiss.',
      'That makes it useful for understanding a different side of UFO culture, where clubs and civilian groups preserve questions long after official attention moves on.',
    ],
    impact: [
      'It gives UFO storytelling a local, European, and emotionally personal form rather than a Pentagon-centered frame.',
      'It also shows how UFO stories can function as family mystery, adventure, and community memory.',
    ],
    boundaryNote: 'This is a fictional film. It is included as culture, not as a verified UFO case file.',
    keyFacts: [
      'Released in Sweden in 2022.',
      'Internationally associated with the title Watch the Skies.',
      'Centers on civilian UFO investigators and a family mystery.',
      'Useful for comparing state-centered UAP narratives with local enthusiast culture.',
    ],
    sourceNote: 'The external reference is used for film identification and release context. UFO Declassified adds the cultural analysis.',
    faqs: [
      {
        question: 'Is UFO Sweden a documentary?',
        answer: 'No. It is a fictional adventure film.',
      },
      {
        question: 'Why is civilian UFO culture important?',
        answer: 'Civilian clubs, witnesses, and local investigators often shape how cases are remembered outside official archives.',
      },
      {
        question: 'What does the film add to the Culture page?',
        answer: 'It widens the map beyond U.S. films and official UAP debates by showing a European local-investigation story.',
      },
    ],
    relatedCultureIds: ['mysterians', 'moment-of-contact', 'encounters-netflix', 'rendlesham-forest'],
  },
  'moment-of-contact': {
    seoTitle: 'Moment of Contact and the Varginha UFO Case in Documentary Culture',
    seoDescription: 'A guide to Moment of Contact, the 2022 documentary about reported 1996 events in Varginha, Brazil, and its role in international UFO culture.',
    directAnswer: 'Moment of Contact is a 2022 documentary centered on reported 1996 events in Varginha, Brazil, including claims of a UFO crash and unusual beings. It matters because it gives a major international UFO case an English-language documentary treatment.',
    context: [
      'The documentary focuses on witness claims, local memory, and contested accounts around Varginha rather than a newly released official file.',
      'Its importance is partly geographic: it reminds English-speaking audiences that UFO culture has major cases and communities outside the United States.',
    ],
    impact: [
      'It helped bring the Varginha case to a broader streaming and documentary audience.',
      'It also illustrates the difference between a witness-centered documentary and an official public record.',
    ],
    boundaryNote: 'This is a documentary about claims and reported events. It should not be treated as a verified government record by itself.',
    keyFacts: [
      'Released in 2022.',
      'Focuses on reported events in Varginha, Brazil, in 1996.',
      'Presents witness-centered and case-centered documentary material.',
      'Useful for comparing international UFO cases with U.S. disclosure narratives.',
    ],
    sourceNote: 'The external reference identifies viewing availability. Researchers should verify specific claims through primary sources where possible.',
    faqs: [
      {
        question: 'Is Moment of Contact an official report?',
        answer: 'No. It is a documentary film about a reported case and related claims.',
      },
      {
        question: 'Why does Varginha matter in UFO culture?',
        answer: 'It is one of the best-known Brazilian UFO narratives and is frequently discussed in international UFO communities.',
      },
      {
        question: 'How should readers evaluate it?',
        answer: 'Treat it as a documentary presentation of claims and compare any factual assertions with original records or independent reporting when available.',
      },
    ],
    relatedCultureIds: ['encounters-netflix', 'phenomenon', 'ufo-sweden', 'belgian-ufo-wave'],
  },
  'encounters-netflix': {
    seoTitle: 'Encounters on Netflix and the Global Witness-Centered UFO Series',
    seoDescription: 'A guide to Encounters, the 2023 Netflix documentary series built around multiple-witness UFO accounts from different countries and communities.',
    directAnswer: 'Encounters is a 2023 Netflix documentary series built around multiple-witness UFO accounts from different countries and communities. It matters because it reflects the current shift toward global, witness-centered UFO storytelling.',
    context: [
      'The series uses place-based stories and community memory instead of presenting UFOs only through U.S. military or intelligence institutions.',
      'Its structure is useful for understanding how streaming platforms package UFO material for audiences who expect human stories, not just documents or sensor clips.',
    ],
    impact: [
      'It makes international witness communities part of mainstream UFO documentary culture.',
      'It also shows the tension between compelling testimony and the need for source discipline when claims move into search and AI answers.',
    ],
    boundaryNote: 'This is a documentary series. It presents accounts and interpretation; it is not an official source archive.',
    keyFacts: [
      'Released in 2023 as a documentary series.',
      'Centers on multiple-witness accounts and global locations.',
      'Reflects streaming-era UFO storytelling.',
      'Best used as a cultural overview rather than a primary record.',
    ],
    sourceNote: 'The external source identifies the series. UFO Declassified frames it beside official reports and source-record pages.',
    faqs: [
      {
        question: 'Is Encounters an official investigation?',
        answer: 'No. It is a documentary series, not a government investigation or archive.',
      },
      {
        question: 'Why does the global framing matter?',
        answer: 'It shows that UFO culture is shaped by many local communities, not only U.S. military reporting.',
      },
      {
        question: 'How should researchers use the series?',
        answer: 'Use it to identify narratives and communities, then seek primary records or original reporting for specific claims.',
      },
    ],
    relatedCultureIds: ['moment-of-contact', 'ufo-sweden', 'phenomenon', 'house-oversight-2023'],
  },
  'kenneth-arnold-flying-saucer': {
    seoTitle: 'Kenneth Arnold, the 1947 Flying Saucer Wave, and Modern UFO Culture',
    seoDescription: 'A guide to Kenneth Arnold\'s 1947 sighting report near Mount Rainier and how it helped launch the modern flying saucer news cycle.',
    directAnswer: 'Kenneth Arnold was a private pilot whose 1947 report of fast-moving objects near Mount Rainier helped launch the modern "flying saucer" news cycle. It matters because the phrase and the pattern of mass public attention became part of UFO culture almost immediately.',
    context: [
      'The Arnold report belongs to the postwar moment when aviation, radar, atomic anxiety, and public fascination with new technology were all intensifying.',
      'The event did not create every UFO belief, but it gave newspapers and audiences a durable phrase and a repeatable public pattern: sighting, report, military interest, press amplification, and copycat attention.',
    ],
    impact: [
      'The flying saucer label became one of the most successful media phrases in the history of UFO culture.',
      'It also gave later investigators, skeptics, and storytellers a starting point for the modern era of public UFO reporting.',
    ],
    boundaryNote: 'This page treats the Arnold report as a news and cultural milestone. It does not claim to resolve what Arnold saw.',
    keyFacts: [
      'The report occurred in 1947 near Mount Rainier.',
      'Arnold described fast-moving objects while flying as a private pilot.',
      'News coverage helped popularize the phrase "flying saucer".',
      'The episode is a major starting point for modern UFO public history.',
    ],
    sourceNote: 'The external source provides broad UFO historical context. UFO Declassified places the event inside the site\'s culture and archive map.',
    faqs: [
      {
        question: 'Did Kenneth Arnold use the exact phrase flying saucer as an object label?',
        answer: 'The phrase became popular through press coverage of his description. The important cultural point is that the label quickly spread through news and public conversation.',
      },
      {
        question: 'Why is 1947 important?',
        answer: 'It is the year often used to mark the beginning of the modern U.S. UFO era, especially because of the Arnold report and the wave of reports that followed.',
      },
      {
        question: 'Is this page a case solution?',
        answer: 'No. It is a cultural and historical guide to the report\'s public impact.',
      },
    ],
    relatedCultureIds: ['day-earth-stood-still', 'project-blue-book', 'rendlesham-forest', 'belgian-ufo-wave'],
    relatedTopicSlugs: ['historical-flying-disc-records'],
  },
  'project-blue-book': {
    seoTitle: 'Project BLUE BOOK Records and the Public UFO Archive',
    seoDescription: 'A citation-ready guide to Project BLUE BOOK, the U.S. Air Force UFO program whose records remain central to historical UFO research.',
    directAnswer: 'Project BLUE BOOK was a U.S. Air Force program that collected and evaluated UFO reports from the early Cold War through 1969. Its public records remain one of the most important official archives for historical UFO reporting.',
    context: [
      'Project BLUE BOOK sits at the center of official U.S. UFO history because it created a formal channel for receiving, classifying, and explaining reports.',
      'The program also shaped public expectations: people learned to ask whether a case was investigated, explained, unresolved, or withheld.',
    ],
    impact: [
      'It gave UFO culture an official archive to argue with, cite, distrust, or revisit.',
      'Modern disclosure debates still inherit questions that BLUE BOOK made familiar: who collected reports, what counted as evidence, and how official conclusions were reached.',
    ],
    boundaryNote: 'This page summarizes the public record and cultural importance of Project BLUE BOOK. It does not claim that every case in the archive has the same evidentiary value.',
    keyFacts: [
      'Operated by the U.S. Air Force beginning in 1952.',
      'Collected and evaluated UFO reports until the program ended in 1969.',
      'Public records are held through U.S. archival channels.',
      'A major reference point for official UFO case-file culture.',
    ],
    sourceNote: 'The external reference points to the U.S. National Archives guide. UFO Declassified adds the site-specific culture framing and related archive links.',
    faqs: [
      {
        question: 'Is Project BLUE BOOK still active?',
        answer: 'No. The Air Force program ended in 1969. Its records remain important for historical research.',
      },
      {
        question: 'Why does BLUE BOOK matter today?',
        answer: 'It created one of the largest public official record sets for older UFO reports and shaped how people expect governments to document unexplained sightings.',
      },
      {
        question: 'Does BLUE BOOK prove or disprove all UFO claims?',
        answer: 'No. It is an archive and an official program history. Individual cases still need careful source review.',
      },
    ],
    relatedCultureIds: ['kenneth-arnold-flying-saucer', 'x-files', 'odni-preliminary-assessment', 'aaro-historical-report'],
    relatedTopicSlugs: ['historical-flying-disc-records', 'fbi-ufo-files'],
    relatedDocumentSlugs: ['65-hs1-834228961-62-hq-83894-section-1', '65-hs1-101634279-100-de-18221-serial-844'],
  },
  'rendlesham-forest': {
    seoTitle: 'Rendlesham Forest Files and Britain\'s Best-Known UFO Case',
    seoDescription: 'A guide to the Rendlesham Forest UFO files, the 1980 RAF Woodbridge reports, and their role in British UFO public history.',
    directAnswer: 'The Rendlesham Forest files concern reported lights and unusual events near RAF Woodbridge in December 1980. They matter because the case became one of Britain\'s best-known UFO stories and a major example of archival public interest.',
    context: [
      'Rendlesham sits at the meeting point of military setting, witness testimony, official correspondence, and long public fascination.',
      'Its importance is not only the reported event, but the way files, witnesses, and later retellings kept the case alive as a British public-record question.',
    ],
    impact: [
      'The case became a reference point for how national archives and released files can sustain UFO interest decades after an event.',
      'It also shows that UFO culture is strongly shaped by local geography: bases, forests, nearby communities, and national media memory.',
    ],
    boundaryNote: 'This page treats Rendlesham as a public-record and cultural milestone. It does not settle the cause of the reported events.',
    keyFacts: [
      'Reported events took place in December 1980.',
      'Associated with RAF Woodbridge and Rendlesham Forest in the United Kingdom.',
      'Public interest is tied to released files, witness accounts, and official correspondence.',
      'One of the best-known UK UFO cases.',
    ],
    sourceNote: 'The external reference points to the UK National Archives UFO reports guide. UFO Declassified summarizes why the case matters in culture and records.',
    faqs: [
      {
        question: 'Is Rendlesham an official proof case?',
        answer: 'No. It is a famous case with official files and witness accounts, but this page does not claim a final explanation.',
      },
      {
        question: 'Why does the archive matter?',
        answer: 'Released files let researchers distinguish the original record from later retellings and speculation.',
      },
      {
        question: 'Why is it often compared with U.S. cases?',
        answer: 'It combines military setting, witness claims, and public records in a way that resembles major U.S. UFO debates.',
      },
    ],
    relatedCultureIds: ['project-blue-book', 'belgian-ufo-wave', 'kenneth-arnold-flying-saucer', 'ufo-sweden'],
    relatedTopicSlugs: ['historical-flying-disc-records'],
  },
  'belgian-ufo-wave': {
    seoTitle: 'The Belgian UFO Wave and Europe\'s Triangle-Sighting Reports',
    seoDescription: 'A guide to the 1989 Belgian UFO wave, triangular-object reports, and its role in European UFO media and public discussion.',
    directAnswer: 'The Belgian UFO wave refers to a series of reports beginning in 1989 that described large triangular objects over Belgium. It matters because it became one of Europe\'s most cited modern UFO waves, drawing police, press, public, and military attention.',
    context: [
      'Unlike a single isolated sighting, the Belgian wave became important because reports accumulated across time and communities.',
      'The triangle shape also became part of modern UFO vocabulary, distinct from older flying saucer imagery.',
    ],
    impact: [
      'The case helped make triangular craft a recognizable UFO category in European and global discussion.',
      'It also illustrates how mass-sighting narratives depend on press coverage, institutional response, witness volume, and later interpretation.',
    ],
    boundaryNote: 'This page treats the Belgian wave as a reporting and culture milestone. It does not provide a final explanation for the sightings.',
    keyFacts: [
      'The wave began in 1989.',
      'Reports often described large triangular objects.',
      'Belgian police, press, public, and military attention made the case widely known.',
      'A major European UFO-wave reference point.',
    ],
    sourceNote: 'The external reference is used for broad case identification. Researchers should compare it with primary reporting and official material when available.',
    faqs: [
      {
        question: 'Was the Belgian UFO wave a single event?',
        answer: 'No. It was a wave of reports over time rather than one isolated sighting.',
      },
      {
        question: 'Why are triangles important in UFO culture?',
        answer: 'Triangle reports became a major modern category, distinct from the classic saucer shape of the 1940s and 1950s.',
      },
      {
        question: 'Does this page claim the objects were extraterrestrial?',
        answer: 'No. It summarizes the public significance of the reports without assigning a final cause.',
      },
    ],
    relatedCultureIds: ['rendlesham-forest', 'kenneth-arnold-flying-saucer', 'encounters-netflix', 'moment-of-contact'],
  },
  'dod-navy-videos': {
    seoTitle: 'DoD Navy UAP Video Release and the Mainstream Pentagon UFO Era',
    seoDescription: 'A guide to the Department of Defense release of three Navy UAP videos in 2020 and why it changed mainstream UFO discussion.',
    directAnswer: 'In 2020, the Department of Defense authorized public release of three Navy videos showing unidentified aerial phenomena. The release mattered because it moved widely discussed clips from leaked internet material into official public release.',
    context: [
      'The videos had already become prominent in public debate before the official release. The 2020 statement changed their status by confirming that the Department of Defense authorized their public availability.',
      'That shift made the videos central to journalism, congressional interest, and later official UAP reporting.',
    ],
    impact: [
      'The release helped move UAP from fringe discussion into mainstream defense, intelligence, and aviation coverage.',
      'It also made video provenance a central question: who recorded the clip, how it was released, and what official language did or did not say about it.',
    ],
    boundaryNote: 'The videos show unidentified aerial phenomena in official release language. This page does not claim a specific origin or explanation for the objects.',
    keyFacts: [
      'The Department of Defense authorized release in 2020.',
      'The release concerned three Navy videos.',
      'The public framing used UAP language rather than older flying saucer terminology.',
      'A key milestone in the modern Pentagon UAP era.',
    ],
    sourceNote: 'The external reference is the Department of Defense release statement. UFO Declassified connects that milestone to related archive material.',
    faqs: [
      {
        question: 'Did the 2020 DoD release say the objects were alien?',
        answer: 'No. The official release described the material as unidentified aerial phenomena and did not assign an extraterrestrial origin.',
      },
      {
        question: 'Why did the release matter if the videos were already public?',
        answer: 'Official authorization changed the provenance and made the videos easier to cite in mainstream reporting and policy discussion.',
      },
      {
        question: 'What should readers compare with this release?',
        answer: 'Compare it with the ODNI 2021 assessment, later hearings, and source video records in the archive.',
      },
    ],
    relatedCultureIds: ['sixty-minutes-uap', 'odni-preliminary-assessment', 'phenomenon', 'house-oversight-2023'],
    relatedTopicSlugs: ['pentagon-uap-videos', 'pursue-release-2026'],
    relatedDocumentSlugs: ['release-02-file-057-dow-uap-pr098-ufos-in-formation-over-persian-gulf', 'release-02-file-002-dow-uap-pr051-syrian-uap-instant-acceleration'],
  },
  'sixty-minutes-uap': {
    seoTitle: '60 Minutes UAP Report and Prime-Time Military UFO Coverage',
    seoDescription: 'A guide to the 2021 60 Minutes UAP segment that brought military UAP reports, pilots, and officials into prime-time television.',
    directAnswer: 'The 2021 60 Minutes UAP report brought military UAP accounts, pilots, former officials, and investigators into prime-time television. It mattered because it helped move the topic from niche communities into mainstream broadcast journalism.',
    context: [
      'The segment aired during a period of rising public attention after the Navy videos and before the ODNI preliminary assessment became a major reference point.',
      'Its value as a culture milestone is that it translated defense and intelligence discussion into a format familiar to general audiences.',
    ],
    impact: [
      'It made UAP a living-room news subject rather than only an online or specialist topic.',
      'It also helped normalize interviews with pilots and former officials as a major format for public UAP discussion.',
    ],
    boundaryNote: 'This is journalism, not an official report. It should be read beside primary government documents and source records.',
    keyFacts: [
      'Aired in 2021.',
      'Focused on military UAP reporting and restricted airspace concerns.',
      'Used interviews with pilots, former officials, and investigators.',
      'Important for mainstreaming the modern UAP debate.',
    ],
    sourceNote: 'The external reference points to the CBS report. UFO Declassified adds archive context and links to official-report milestones.',
    faqs: [
      {
        question: 'Is the 60 Minutes segment an official source?',
        answer: 'No. It is a news report. It can introduce the issue, but official claims should be checked against primary records.',
      },
      {
        question: 'Why did the segment matter?',
        answer: 'It brought military UAP discussion to a broad prime-time audience and reinforced that the topic had entered mainstream journalism.',
      },
      {
        question: 'What official material should be read with it?',
        answer: 'Read it beside the 2020 DoD video release and the 2021 ODNI preliminary assessment.',
      },
    ],
    relatedCultureIds: ['dod-navy-videos', 'odni-preliminary-assessment', 'phenomenon', 'house-oversight-2023'],
    relatedTopicSlugs: ['pentagon-uap-videos'],
  },
  'odni-preliminary-assessment': {
    seoTitle: 'ODNI Preliminary Assessment on UAP and the 2021 Intelligence Frame',
    seoDescription: 'A guide to the 2021 ODNI Preliminary Assessment on Unidentified Aerial Phenomena and why it became a core official reference.',
    directAnswer: 'The ODNI Preliminary Assessment on UAP is a 2021 unclassified intelligence report on unidentified aerial phenomena. It matters because it gave the public a formal intelligence frame for UAP reporting, data limitations, and unresolved cases.',
    context: [
      'The report arrived after intense public attention around Navy videos, military reporting, and congressional interest.',
      'Its importance lies in the shift from entertainment vocabulary to institutional questions: reporting channels, data quality, flight safety, national security, and analytic uncertainty.',
    ],
    impact: [
      'It gave journalists, lawmakers, and researchers an official document to cite when discussing UAP as a defense and intelligence issue.',
      'It also made data gaps a central theme in public UAP discussion.',
    ],
    boundaryNote: 'This is an official public assessment. It should be cited carefully for what it says, and not stretched beyond its stated findings.',
    keyFacts: [
      'Released in 2021 by the Office of the Director of National Intelligence.',
      'Uses UAP terminology and focuses on reporting and assessment limits.',
      'Became a major public reference for modern UAP debate.',
      'Best read with the DoD video release and later congressional hearings.',
    ],
    sourceNote: 'The external reference points to the ODNI report page. UFO Declassified adds the citation-ready context and related archive pathways.',
    faqs: [
      {
        question: 'Did the ODNI report prove extraterrestrial activity?',
        answer: 'No. The public assessment focused on UAP reporting, data limits, and categories of possible explanation.',
      },
      {
        question: 'Why is it important for GEO and AI citation?',
        answer: 'It is a compact official source that gives search systems and readers a stable reference for the modern intelligence framing of UAP.',
      },
      {
        question: 'What changed after the report?',
        answer: 'The public debate increasingly used defense, intelligence, aviation safety, and data-quality language rather than only UFO folklore language.',
      },
    ],
    relatedCultureIds: ['dod-navy-videos', 'sixty-minutes-uap', 'nasa-uap-report', 'aaro-historical-report'],
    relatedTopicSlugs: ['pentagon-uap-videos', 'pursue-release-2026'],
    relatedDocumentSlugs: ['release-02-file-057-dow-uap-pr098-ufos-in-formation-over-persian-gulf'],
  },
  'house-oversight-2023': {
    seoTitle: 'House Oversight 2023 UAP Hearing and the Public Congressional Record',
    seoDescription: 'A guide to the 2023 House Oversight UAP hearing on national security, public safety, transparency, and government accountability.',
    directAnswer: 'The 2023 House Oversight UAP hearing was a public congressional hearing about unidentified anomalous phenomena, national security, public safety, and government transparency. It mattered because it placed witness testimony and disclosure claims into a public congressional record.',
    context: [
      'The hearing belongs to a period when UAP discussion moved from videos and reports into oversight, testimony, and questions about what agencies should disclose.',
      'Its importance is not that every claim was proven on the spot. Its importance is that claims, witness identities, and institutional questions were aired in a formal public setting.',
    ],
    impact: [
      'It gave the modern disclosure debate a visible congressional stage.',
      'It also showed how UAP discussion had become tied to oversight, public trust, aviation safety, and national security language.',
    ],
    boundaryNote: 'A hearing is a public record of testimony and questions. It is not the same as verified proof of every claim made during testimony.',
    keyFacts: [
      'Held in 2023 by the House Oversight Committee.',
      'Focused on UAP, national security, public safety, and transparency.',
      'Included public witness testimony.',
      'A major milestone in congressional UAP visibility.',
    ],
    sourceNote: 'The external reference points to the House Oversight hearing page. UFO Declassified adds context and separates testimony from documentary proof.',
    faqs: [
      {
        question: 'Did the hearing settle the UAP issue?',
        answer: 'No. It created a public record of testimony and questions, but it did not resolve every claim.',
      },
      {
        question: 'Why does a hearing matter for UFO culture?',
        answer: 'It moved disclosure claims into a formal government setting, changing how mainstream audiences encountered the topic.',
      },
      {
        question: 'How should readers use the hearing page?',
        answer: 'Use it as a public-record milestone and verify specific claims against documents, reports, or additional testimony.',
      },
    ],
    relatedCultureIds: ['odni-preliminary-assessment', 'aaro-historical-report', 'phenomenon', 'sixty-minutes-uap'],
    relatedTopicSlugs: ['pentagon-uap-videos', 'pursue-release-2026'],
  },
  'nasa-uap-report': {
    seoTitle: 'NASA UAP Independent Study Team Report and the Data-Quality Frame',
    seoDescription: 'A guide to NASA\'s 2023 UAP Independent Study Team report and why it framed UAP as a scientific data and method problem.',
    directAnswer: 'NASA\'s UAP Independent Study Team report is a 2023 public report recommending how NASA could contribute to better UAP data collection and analysis. It mattered because it framed UAP as a data-quality and scientific-method problem rather than only a defense topic.',
    context: [
      'The report arrived after UAP had already become a defense and intelligence issue in public debate. NASA\'s role was different: scientific credibility, open data, instrumentation, and method.',
      'The key cultural shift is that UAP could be discussed in terms of better observation and data standards rather than only secrecy, witnesses, or military threat.',
    ],
    impact: [
      'It gave science-facing readers a clearer way to approach the topic without accepting weak claims or dismissing all reports in advance.',
      'It also created a bridge between space-agency records, modern UAP debate, and the broader archive of NASA-related material.',
    ],
    boundaryNote: 'This is an official report about study methods and recommendations. It should not be misread as NASA confirming extraterrestrial craft.',
    keyFacts: [
      'Published by NASA in 2023.',
      'Focused on data collection, analysis, and NASA\'s possible role.',
      'Framed UAP as a scientific and data-quality challenge.',
      'Useful beside NASA archive records and modern UAP reports.',
    ],
    sourceNote: 'The external reference points to NASA\'s UAP page. UFO Declassified connects the report to related NASA material in the archive.',
    faqs: [
      {
        question: 'Did NASA say UAP are extraterrestrial?',
        answer: 'No. The report focused on data quality, collection, and analysis rather than confirming an extraterrestrial explanation.',
      },
      {
        question: 'Why is NASA\'s role different from the Pentagon\'s?',
        answer: 'NASA brings scientific method, open-data expectations, and instrumentation expertise rather than military incident reporting.',
      },
      {
        question: 'What should researchers read with this report?',
        answer: 'Read it beside NASA-related archive topics and official intelligence or defense reports to compare different institutional frames.',
      },
    ],
    relatedCultureIds: ['odni-preliminary-assessment', 'aaro-historical-report', 'arrival', 'encounters-netflix'],
    relatedTopicSlugs: ['nasa-apollo-ufo-material', 'pursue-release-2026'],
    relatedDocumentSlugs: ['nasa-uap-d5-apollo-17-crew-debriefing-for-science-1973', 'nasa-uap-d2-apollo-17-transcript-1972', 'nasa-uap-d1-apollo-12-transcript-1969'],
  },
  'aaro-historical-report': {
    seoTitle: 'AARO Historical Record Report Volume I and U.S. Government UAP History',
    seoDescription: 'A guide to AARO\'s 2024 Historical Record Report, Volume I, and its role in public debate over U.S. government UAP history and hidden-program claims.',
    directAnswer: 'AARO Historical Record Report, Volume I is a 2024 government report reviewing U.S. government involvement with UAP and historical claims. It mattered because it became a major official reference point in the dispute over hidden programs and the history of UAP investigations.',
    context: [
      'The report sits in a contested environment: whistleblower claims, congressional attention, public skepticism, and demands for source records.',
      'Its role is not only informational. It became part of the debate over whether official historical reviews are complete, persuasive, and trusted by the public.',
    ],
    impact: [
      'It gave agencies, journalists, and researchers a formal report to cite when discussing historical UAP claims.',
      'It also sharpened the need to separate what a report concludes from what individual witnesses or advocates claim elsewhere.',
    ],
    boundaryNote: 'This is an official report. It should be cited for its stated findings and compared with underlying records where possible.',
    keyFacts: [
      'Published in 2024 by AARO.',
      'Reviews historical U.S. government involvement with UAP.',
      'Addresses public claims about hidden programs and historical investigations.',
      'A major official reference for modern UAP history debates.',
    ],
    sourceNote: 'The external reference points to the public PDF. UFO Declassified adds citation structure, related milestones, and archive links.',
    faqs: [
      {
        question: 'What is AARO?',
        answer: 'AARO is the All-domain Anomaly Resolution Office, the U.S. government office associated with resolving reports of anomalous phenomena across domains.',
      },
      {
        question: 'Did the report end the public debate?',
        answer: 'No. It became a major official reference, but public disagreement over claims, sources, and trust continued.',
      },
      {
        question: 'How should researchers cite it?',
        answer: 'Cite the report directly for its conclusions, and use source records where possible when discussing specific historical claims.',
      },
    ],
    relatedCultureIds: ['odni-preliminary-assessment', 'house-oversight-2023', 'nasa-uap-report', 'project-blue-book'],
    relatedTopicSlugs: ['pursue-release-2026', 'pentagon-uap-videos', 'historical-flying-disc-records'],
  },
};

function fallbackDetail(item: CultureItem): CultureDetail {
  const categoryLabel = CULTURE_CATEGORIES[item.category].label.toLowerCase();
  return {
    seoTitle: `${item.title} and UFO Culture`,
    seoDescription: `${item.title} is a ${categoryLabel} entry in the UFO Declassified culture guide, with context, source notes, and related records.`,
    directAnswer: `${item.title} is a ${item.year} ${item.format.toLowerCase()} connected to UFO culture. ${item.whyItMatters}`,
    context: [item.summary],
    impact: [item.whyItMatters],
    boundaryNote: 'This page separates cultural significance from source evidence.',
    keyFacts: [
      `Year: ${item.year}.`,
      `Region: ${item.region}.`,
      `Format: ${item.format}.`,
      `Category: ${CULTURE_CATEGORIES[item.category].label}.`,
    ],
    sourceNote: 'The external reference is provided for verification and context.',
    faqs: [
      {
        question: `Why is ${item.title} included?`,
        answer: item.whyItMatters,
      },
    ],
    relatedCultureIds: [],
  };
}

export const cultureRecords: CultureRecord[] = cultureItems.map(item => ({
  ...item,
  detail: cultureDetailsById[item.id] || fallbackDetail(item),
}));

export function getCultureHref(item: Pick<CultureItem, 'id'>): string {
  return `/culture/${item.id}`;
}

export function getCultureRecordById(id: string): CultureRecord | undefined {
  return cultureRecords.find(item => item.id === id);
}

export function getRelatedCulture(item: CultureRecord, limit = 4): CultureRecord[] {
  const explicit = item.detail.relatedCultureIds
    .map(id => getCultureRecordById(id))
    .filter((record): record is CultureRecord => Boolean(record));
  const fallback = cultureRecords.filter(candidate =>
    candidate.id !== item.id &&
    !explicit.some(related => related.id === candidate.id) &&
    (candidate.category === item.category || candidate.region === item.region || candidate.tags.some(tag => item.tags.includes(tag)))
  );

  return [...explicit, ...fallback].slice(0, limit);
}

export function getFeaturedCulture(): CultureRecord[] {
  return cultureRecords.filter(item => item.featured);
}
