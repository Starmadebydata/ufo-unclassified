// Claim Tracker data — editorially maintained.
// Each entry tracks a public claim related to the PURSUE releases: who made it,
// what its current verification status is, and what evidence would settle it.
// Update `lastUpdated` whenever an entry's status or notes change.

export type ClaimStatus =
  | 'confirmed'      // independently confirmed by a named institution or official record
  | 'official'       // official government statement; accurate as a statement, contents not independently audited
  | 'in-progress'    // an announced process that has not yet produced its outcome
  | 'unverified'     // asserted publicly; no independent confirmation
  | 'clarified';     // a circulating confusion that has been resolved by checking sources

export interface TrackedClaim {
  id: string;
  title: string;
  claim: string;
  claimants: string;
  firstReported: string;
  status: ClaimStatus;
  statusNote: string;
  whatWouldConfirm: string;
  sources: { label: string; url: string }[];
  related?: { label: string; href: string }[];
  lastUpdated: string;
}

export const STATUS_INFO: Record<ClaimStatus, { label: string; color: string; order: number; description: string }> = {
  'confirmed':   { label: 'Confirmed', color: '#00ff88', order: 1, description: 'Independently confirmed by a named institution or record. Confirmation of existence is not confirmation of interpretation.' },
  'official':    { label: 'Official statement', color: '#22d3ee', order: 2, description: 'Stated by a government office. Accurately quoted, but the underlying data has not been independently audited.' },
  'in-progress': { label: 'In progress', color: '#fbbf24', order: 3, description: 'An announced process — legislation, release, publication — whose outcome has not yet arrived.' },
  'unverified':  { label: 'Unverified', color: '#ff6b35', order: 4, description: 'Publicly asserted by named individuals. No documentary or institutional confirmation is on the public record.' },
  'clarified':   { label: 'Clarified', color: '#8fb0e0', order: 5, description: 'A circulating misreading that source-checking has resolved.' },
};

export const trackedClaims: TrackedClaim[] = [
  {
    id: '1952-washington-tape',
    title: 'A 1952 audio tape of an Air Force UFO briefing exists at MIT Lincoln Laboratory',
    claim: 'A reel-to-reel recording of a 1952 briefing between Air Force officials and scientists about the July 1952 Washington, D.C. sightings exists, and MIT Lincoln Laboratory has agreed to make it available.',
    claimants: 'Rep. Eric Burlison (R-MO), announced at the Disclosure Forum, June 25, 2026; existence confirmed by MIT Lincoln Laboratory legal staff per press reporting.',
    firstReported: '2026-06-25',
    status: 'confirmed',
    statusNote: 'The tape\'s existence is confirmed. Its contents are not public and no release date has been announced. Confirmation that a tape exists is not confirmation of what is on it.',
    whatWouldConfirm: 'Public release of the audio with provenance documentation from Lincoln Laboratory, ideally alongside a transcript and chain-of-custody note.',
    sources: [
      { label: 'The Hill', url: 'https://thehill.com/homenews/5944717-ufo-washington-invasion-evidence/' },
      { label: 'NewsNation', url: 'https://www.newsnationnow.com/prime/invasion-of-washington-tape-ufo-uap/' },
    ],
    related: [{ label: 'Disclosure Forum 2026 analysis', href: '/blog/disclosure-forum-2026-what-actually-moved/' }],
    lastUpdated: '2026-07-20',
  },
  {
    id: 'aaro-40-percent-unresolved',
    title: 'AARO: ~40% of the Western U.S. orb reports remain unresolved',
    claim: 'After first-stage analysis of the October 2023 Western U.S. event, roughly 60 percent of reported phenomena are plausibly attributable to military aircraft activity, while about 40 percent lack a reasonable explanation.',
    claimants: 'AARO director Dr. Jon Kosloski, report dated June 5, 2026, published in PURSUE Release 03.',
    firstReported: '2026-06-12',
    status: 'official',
    statusNote: 'This is an official analytic finding published in the release itself. The underlying sensor and flight-log data behind the percentages has not been publicly released for independent re-analysis.',
    whatWouldConfirm: 'Release of the correlation dataset (ADS-B, radar, flight logs, witness timing) so independent analysts can reproduce the 60/40 split.',
    sources: [
      { label: 'War.gov Release 03', url: 'https://www.war.gov/News/Releases/Release/Article/4515408/department-of-war-publishes-third-release-of-unidentified-anomalous-phenomena-f/' },
    ],
    related: [{ label: 'Western U.S. orbs analysis', href: '/blog/western-us-orbs-release-03-analysis/' }],
    lastUpdated: '2026-07-20',
  },
  {
    id: 'billion-views',
    title: 'The PURSUE archive has received over a billion views',
    claim: 'War.gov/UFO received more than 1 billion hits after launch; figures of 1.5 billion views were cited by late June 2026.',
    claimants: 'Department of War (May 22, 2026 release announcement); Avi Loeb citing 1.5 billion at the Disclosure Forum.',
    firstReported: '2026-05-22',
    status: 'official',
    statusNote: 'Official traffic figures. "Hits" and "views" are not defined, and no independent analytics audit exists.',
    whatWouldConfirm: 'A methodology note defining the metric, or third-party traffic estimates consistent with the claimed order of magnitude.',
    sources: [
      { label: 'War.gov Release 02 announcement', url: 'https://www.war.gov/News/Releases/Release/Article/4499305/department-of-war-publishes-second-release-of-unidentified-anomalous-phenomena/' },
      { label: 'Loeb, Disclosure Forum remarks', url: 'https://avi-loeb.medium.com/uap-disclosure-forum-in-the-u-s-senate-10a8d3af1028' },
    ],
    lastUpdated: '2026-07-20',
  },
  {
    id: 'whistleblower-immunity-list',
    title: 'A White House whistleblower immunity list is being assembled',
    claim: 'Rep. Luna\'s team is compiling a list of names to submit to the White House (via Deputy Chief of Staff Stephen Miller) for immunity grants covering people who claim knowledge of recovered nonhuman technology or biological material.',
    claimants: 'Rep. Anna Paulina Luna (R-FL), stated at and around the Disclosure Forum, June 2026.',
    firstReported: '2026-06-25',
    status: 'in-progress',
    statusNote: 'A described process, not a completed one. No immunity grant, named recipient, or resulting testimony is on the public record.',
    whatWouldConfirm: 'A formal immunity grant becoming public, followed by on-record testimony that includes verifiable specifics.',
    sources: [
      { label: 'IBTimes UK', url: 'https://www.ibtimes.co.uk/whistleblower-protections-ufo-uap-disclosure-1805905' },
    ],
    related: [{ label: 'Disclosure Forum 2026 analysis', href: '/blog/disclosure-forum-2026-what-actually-moved/' }],
    lastUpdated: '2026-07-20',
  },
  {
    id: 'uap-disclosure-act-revival',
    title: 'The UAP Disclosure Act will be revived',
    claim: 'Sen. Mike Rounds pledged to reintroduce the UAP Disclosure Act after it was excluded from the FY2026 NDAA for the third consecutive year.',
    claimants: 'Sen. Mike Rounds (R-SD), Disclosure Forum, June 25, 2026; earlier colloquy with Sen. Schumer.',
    firstReported: '2026-06-25',
    status: 'in-progress',
    statusNote: 'A pledge, not a bill. The FY2026 NDAA did retain a narrower provision requiring Pentagon briefings on NORAD/NORTHCOM UAP intercepts since 2004.',
    whatWouldConfirm: 'Introduced legislation with the records-review-board provisions intact, surviving conference.',
    sources: [
      { label: 'S.Amdt.3111 text', url: 'https://www.congress.gov/amendment/119th-congress/senate-amendment/3111/text' },
      { label: 'The Disclosure Era', url: 'https://www.thedisclosureera.com/articles/uap-disclosure-act-stalls-again-uapda-excluded-from-fy2026-defense-bill' },
    ],
    lastUpdated: '2026-07-20',
  },
  {
    id: 'galileo-summer-papers',
    title: 'The Galileo Project will publish observatory results in summer 2026',
    claim: 'Multiple scientific papers based on the project\'s three multi-sensor observatories (including Las Vegas) are planned for release this summer.',
    claimants: 'Avi Loeb, Galileo Project director, June 2026.',
    firstReported: '2026-06-15',
    status: 'in-progress',
    statusNote: 'Announced but not yet published as of this update. Peer-review status of any resulting papers should be checked when they appear.',
    whatWouldConfirm: 'Papers appearing in peer-reviewed venues with released datasets.',
    sources: [
      { label: 'Loeb, Medium', url: 'https://avi-loeb.medium.com/about-uap-and-interstellar-objects-28de976438f9' },
    ],
    related: [{ label: 'UAP Science Advisory Council analysis', href: '/blog/uap-science-advisory-council-what-15-scientists-can-change/' }],
    lastUpdated: '2026-07-20',
  },
  {
    id: 'nonhuman-biologics',
    title: 'The U.S. government possesses nonhuman biological specimens',
    claim: 'Authorities hold biological material connected to recovered unidentified craft.',
    claimants: 'David Grusch (2023 testimony); revisited at the June 2026 Disclosure Forum without new evidence.',
    firstReported: '2023-07-26',
    status: 'unverified',
    statusNote: 'The inspector general found Grusch\'s complaint procedurally "credible and urgent" — a finding about process, not about the truth of the specific claims. No physical evidence has been produced publicly in three years.',
    whatWouldConfirm: 'Physical material made available for independent laboratory analysis with documented provenance, or primary records identifying the program and custody chain.',
    sources: [
      { label: 'IBTimes UK forum coverage', url: 'https://www.ibtimes.co.uk/ufo-disclosure-forum-washington-1804997' },
    ],
    related: [{ label: 'Disclosure Forum 2026 analysis', href: '/blog/disclosure-forum-2026-what-actually-moved/' }],
    lastUpdated: '2026-07-20',
  },
  {
    id: 'contractor-loophole',
    title: 'UAP material is held by private contractors to evade FOIA',
    claim: 'Sensitive UAP-related material sits with private defense contractors specifically because contractor holdings fall outside Freedom of Information Act requests.',
    claimants: 'Rep. Eric Burlison; consistent with earlier Grusch claims about compartmentalization.',
    firstReported: '2026-06-25',
    status: 'unverified',
    statusNote: 'A structurally coherent theory argued from inference. No documentary evidence identifying such a program or contractor has been presented publicly.',
    whatWouldConfirm: 'A named program, contract vehicle, or audit trail placing UAP material with a specific contractor — from records, testimony under oath, or an inspector-general finding.',
    sources: [
      { label: 'IBTimes UK', url: 'https://www.ibtimes.co.uk/ufo-disclosure-forum-washington-1804997' },
    ],
    lastUpdated: '2026-07-20',
  },
  {
    id: 'withheld-better-footage',
    title: 'Better UAP footage is being withheld from the PURSUE releases',
    claim: 'The most compelling videos in government hands have not been included in the public releases.',
    claimants: 'Rep. Tim Burchett; UFO media figures including Jeremy Corbell and Ross Coulthart, from Release 02 onward.',
    firstReported: '2026-05-22',
    status: 'unverified',
    statusNote: 'A political and media claim. FOIA reporting (The Black Vault) does show that analysis records behind some released footage remain withheld — which is related but not the same claim.',
    whatWouldConfirm: 'Specific withheld footage being identified in official records, or released material matching the prior descriptions.',
    sources: [
      { label: 'The Black Vault on withheld analysis records', url: 'https://www.theblackvault.com/documentarchive/all-analysis-and-records-withheld-on-dods-own-released-uap-footage/' },
    ],
    lastUpdated: '2026-07-20',
  },
  {
    id: 'pantex-missing-pages',
    title: 'The Pantex/DOE record is missing pages 1–4',
    claim: 'The DOE-UAP-D001 Pantex imagery record released in Release 02 appears as pages 5–6 of a six-page document, with the first four pages absent from the public file.',
    claimants: 'Community source-control researchers (r/UFOs), May 2026.',
    firstReported: '2026-05-23',
    status: 'unverified',
    statusNote: 'Reported by researchers from file inspection; not acknowledged or explained by the Department of War or DOE.',
    whatWouldConfirm: 'Official confirmation of the page count, release of the missing pages, or an archival note explaining the gap.',
    sources: [
      { label: 'r/UFOs source-control thread', url: 'https://www.reddit.com/r/UFOs/comments/1tl42x8/sourcecontrol_note_on_wargovs_may_22_uap_release/' },
    ],
    lastUpdated: '2026-07-20',
  },
  {
    id: '222-files-confusion',
    title: '"Release 02 contained 222 new files"',
    claim: 'Circulating coverage described the May 22 release as adding 222 files.',
    claimants: 'Various press and social media summaries, May 2026.',
    firstReported: '2026-05-22',
    status: 'clarified',
    statusNote: '222 was the cumulative count of active War.gov records at the time. Release 02 itself added 64 records (51 video, 7 audio, 6 PDF). This archive indexes the tranches separately.',
    whatWouldConfirm: 'Resolved — verified against the official portal and this site\'s per-release index.',
    sources: [
      { label: 'War.gov Release 02 announcement', url: 'https://www.war.gov/News/Releases/Release/Article/4499305/department-of-war-publishes-second-release-of-unidentified-anomalous-phenomena/' },
    ],
    related: [{ label: 'Release Comparator', href: '/tools/compare/' }],
    lastUpdated: '2026-07-20',
  },
];
