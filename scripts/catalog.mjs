#!/usr/bin/env node
/**
 * Auto-catalog script v2: Scans source-files/ and generates src/data/documents.ts
 * Now with human-readable titles, summaries, and better metadata
 */
import fs from 'fs';
import path from 'path';

const SOURCE = path.resolve('source-files');
const OUT = path.resolve('src/data/documents.ts');

// ===== Human-readable title & summary overrides =====
const TITLE_MAP = {
  'fbi-photo-series-a': 'FBI FLIR/Sensor Imagery — Series A',
  'fbi-photo-series-b': 'FBI Physical Evidence Photographs — Series B',
  'dow-uap-d55-mission-report-syria-november-2016': 'P-8A Observes Unidentified Low-Flying Object — Syria, Nov 2016',
  'dow-uap-d38-range-fouler-debrief-middle-east-may-2020': 'Range Fouler Debrief — Middle East UAP Encounter, May 2020',
  'dos-uap-d1-cable-1-papua-new-guinea-january-1985': 'State Department Cable: UAP Sighting — Papua New Guinea, Jan 1985',
  'dos-uap-d2-cable-2-kazakhstan-january-1994': 'State Department Cable: UAP Report — Kazakhstan, Jan 1994',
  'nasa-uap-d1-apollo-12-transcript-1969': 'Apollo 12 Mission Transcript — Anomalous Observations, 1969',
  'nasa-uap-vm1-apollo-12-1969': 'Apollo 12 Visual Media — Lunar Surface Anomalies, 1969',
  'nasa-uap-vm2-apollo-12-1969': 'Apollo 12 Visual Media VM2 — Lunar Surface Anomaly Image, 1969',
  'nasa-uap-vm3-apollo-12-1969': 'Apollo 12 Visual Media VM3 — Lunar Surface Anomaly Image, 1969',
  'nasa-uap-vm4-apollo-12-1969': 'Apollo 12 Visual Media VM4 — Lunar Surface Anomaly Image, 1969',
  'nasa-uap-vm5-apollo-12-1969': 'Apollo 12 Visual Media VM5 — Lunar Surface Anomaly Image, 1969',
  'nasa-uap-d2-apollo-12-crew-debriefing-1969': 'Apollo 12 Crew Debriefing — UAP Discussion, 1969',
  'nasa-uap-d3-apollo-11-technical-crew-debriefing-1969': 'Apollo 11 Technical Crew Debriefing, 1969',
  'nasa-uap-d4-apollo-11-technical-crew-debriefing-1969': 'Apollo 11 Technical Crew Debriefing — Light Flashes and Observations, 1969',
  'nasa-uap-d4-apollo-17-transcript-1972': 'Apollo 17 Mission Transcript — Anomalous Object, Dec 1972',
  'nasa-uap-d2-apollo-17-transcript-1972': 'Apollo 17 Mission Transcript — UAP and Anomalous Lights, 1972',
  'nasa-uap-d5-apollo-17-crew-debriefing-1973': 'Apollo 17 Crew Debriefing, Jan 1973',
  'nasa-uap-d5-apollo-17-crew-debriefing-for-science-1973': 'Apollo 17 Science Crew Debriefing — Lunar Observations, 1973',
  'nasa-uap-d6-apollo-17-technical-crew-debriefing-1973': 'Apollo 17 Technical Crew Debriefing — Mission Observations, 1973',
  'nasa-uap-vm6-apollo-17-1972': 'Apollo 17 Visual Media VM6 — Lunar Anomaly Image, 1972',
  'nasa-uap-d6-skylab-technical-crew-debriefing-1973': 'Skylab Technical Crew Debriefing, 1973',
  '65-hs1-834228961-62-hq-83894-section-1': 'FBI File 65-HS1-834228961 — 62-HQ-83894 Section 1',
  '65-hs1-834228961-62-hq-83894-section-2': 'FBI File 65-HS1-834228961 — 62-HQ-83894 Section 2',
  '65-hs1-834228961-62-hq-83894-section-3': 'FBI File 65-HS1-834228961 — 62-HQ-83894 Section 3',
  '65-hs1-834228961-62-hq-83894-section-4': 'FBI File 65-HS1-834228961 — 62-HQ-83894 Section 4',
  '65-hs1-834228961-62-hq-83894-section-5': 'FBI File 65-HS1-834228961 — 62-HQ-83894 Section 5',
  '65-hs1-834228961-62-hq-83894-section-6': 'FBI File 65-HS1-834228961 — 62-HQ-83894 Section 6',
  '65-hs1-834228961-62-hq-83894-section-7': 'FBI File 65-HS1-834228961 — 62-HQ-83894 Section 7',
  '65-hs1-834228961-62-hq-83894-section-8': 'FBI File 65-HS1-834228961 — 62-HQ-83894 Section 8',
  '65-hs1-834228961-62-hq-83894-section-9': 'FBI File 65-HS1-834228961 — 62-HQ-83894 Section 9',
  '65-hs1-834228961-62-hq-83894-section-10': 'FBI File 65-HS1-834228961 — 62-HQ-83894 Section 10',
  '65-hs1-834228961-62-hq-83894-serial-130': 'FBI File 65-HS1-834228961 — 62-HQ-83894 Serial 130',
  '65-hs1-834228961-62-hq-83894-serial-220': 'FBI File 65-HS1-834228961 — 62-HQ-83894 Serial 220',
  '65-hs1-834228961-62-hq-83894-sub-a': 'FBI File 65-HS1-834228961 — 62-HQ-83894 Sub A',
  '1006106-dow-uap-pr46-unresolved-uap-report-indopacom-2024': 'DOW-UAP-PR46 — Unresolved UAP Report, INDOPACOM 2024',
  '1006073-dow-uap-pr28-unresolved-uap-report-greece-january-2024': 'DOW-UAP-PR28 — Unresolved UAP Report, Greece January 2024',
  '2024-04-30-composite-sketch': 'UAP Composite Sketch — April 30, 2024',
  'western-us-event-slides-5-08-2026': '"Orbs Launching Orbs" — Western US Event, May 8, 2026',
  'dow-uap-d8-mission-report-djibouti-2025': 'Mission Report: UAP Over Djibouti, 2025',
  'dow-uap-d54-mission-report-mediterranean-sea-na': 'Mission Report: Mediterranean Sea UAP Encounter',
  'dow-uap-d50-email-correspondence-indopacom-april-2025': 'INDOPACOM Email: UAP Correspondence, Apr 2025',
  'dow-uap-pr20': 'DOW Photo/Video Record PR-20',
  'dow-uap-d3-mission-report-arabian-gulf-july-2020': 'Mission Report: Arabian Gulf UAP, Jul 2020',
  'dow-uap-d37-range-fouler-debrief-middle-east-august-2019': 'Range Fouler Debrief — Middle East, Aug 2019',
  'dow-uap-d36-range-fouler-debrief-middle-east-august-2019': 'Range Fouler Debrief — Middle East, Aug 2019 (2)',
  'dow-uap-d52-mission-report-strait-of-hormuz-october-2021': 'Mission Report: Strait of Hormuz UAP, Oct 2021',
  'dow-uap-d53-mission-report-persian-gulf-august-2021': 'Mission Report: Persian Gulf UAP, Aug 2021',
  'dow-uap-d7-mission-report-arabian-gulf-august-2020': 'Mission Report: Arabian Gulf UAP, Aug 2020',
  'dow-uap-d4-mission-report-syria-june-2020': 'Mission Report: Syria UAP Encounter, Jun 2020',
  'dow-uap-d5-mission-report-iraq-august-2020': 'Mission Report: Iraq UAP Encounter, Aug 2020',
  'dow-uap-d6-mission-report-united-arab-emirates-may-2020': 'Mission Report: UAE UAP Encounter, May 2020',
  'dow-uap-d9-mission-report-east-china-sea-na': 'Mission Report: East China Sea UAP Encounter',
  'dow-uap-d10-mission-report-iraq-october-2020': 'Mission Report: Iraq UAP Encounter, Oct 2020',
  'dow-uap-d39-launch-summary-february-2000': 'DOW Launch Summary, Feb 2000',
  'dow-uap-d51-mission-report-gulf-of-aden-na': 'Mission Report: Gulf of Aden UAP Encounter',
  'composite-sketch-2024': 'UAP Witness Composite Sketch, 2024',
};

const SUMMARY_MAP = {
  'fbi-photo-series-a': 'Eight FLIR/forward-looking infrared sensor images from FBI UAP investigations. Multiple images contain heavy redactions (black bars) obscuring portions of the thermal imagery.',
  'fbi-photo-series-b': 'Twenty-four high-resolution physical evidence photographs from FBI case files related to UAP investigations. These images document physical evidence collected during field investigations.',
  'dow-uap-d55-mission-report-syria-november-2016': 'P-8A maritime patrol aircraft observed an unidentified low-flying object 55 NM northwest of Latakia, Syria on November 18, 2016. The object was detected via EO/IR sensor traveling at approximately 500 knots on a southeasterly heading, and was observed passing between Russian naval vessels.',
  'western-us-event-slides-5-08-2026': 'Three teams of federal law enforcement special agents independently observed orange "orbs" launching smaller red "orbs" over the Western United States at dusk over two separate days. The events were witnessed by multiple teams from varying locations.',
  'dos-uap-d1-cable-1-papua-new-guinea-january-1985': 'Diplomatic cable from the U.S. Embassy documenting a UAP sighting reported in Papua New Guinea in January 1985. Transmitted through official State Department channels.',
  'dos-uap-d2-cable-2-kazakhstan-january-1994': 'State Department cable reporting a UAP incident near Kazakhstan in January 1994, transmitted through diplomatic channels.',
  'nasa-uap-d1-apollo-12-transcript-1969': 'One page of the official NASA Apollo 12 mission transcript (November 1969), Tape 90/3, page 742. The page shown covers Houston uplinking a state vector and the lift-off time to the lunar module Intrepid, plus a friendly exchange with the command module pilot aboard Yankee Clipper. It is routine flight-operations dialogue with no unidentified object mentioned on this page.',
  'nasa-uap-vm1-apollo-12-1969': 'Apollo 12 lunar surface photograph (1969) from the NASA UAP release. The frame shows the lunar horizon, long shadows across the surface and the film\'s reseau crosses. A yellow box added for the release enlarges a tiny vertical blue streak just above the horizon on the right. The record does not say what the streak is.',
  'nasa-uap-vm2-apollo-12-1969': 'Apollo 12 visual media file VM2 from the NASA UAP release. Use it with the Apollo 12 transcript and neighboring VM files to compare lunar surface features, shadows, frame edges, and possible anomaly claims.',
  'nasa-uap-vm3-apollo-12-1969': 'Apollo 12 visual media file VM3 from the NASA UAP release. The image is part of the Apollo 12 UFO file set and is best read beside VM1, VM2, VM4, VM5, and the Apollo 12 communications transcript.',
  'nasa-uap-vm4-apollo-12-1969': 'Apollo 12 visual media file VM4 from the NASA UAP release, connected to lunar surface anomaly review. Compare this image with the Apollo 12 transcript and the full VM image set before drawing conclusions.',
  'nasa-uap-vm5-apollo-12-1969': 'Apollo 12 visual media file VM5 from the NASA UAP release. It belongs to the declassified Apollo 12 UFO image group and supports side-by-side review of lunar surface, sky region, and scan artifacts.',
  'nasa-uap-d3-apollo-11-technical-crew-debriefing-1969': 'Technical crew debriefing document from the Apollo 11 mission (July 1969). Crew members discuss observations made during humanity\'s first lunar landing mission.',
  'nasa-uap-d4-apollo-11-technical-crew-debriefing-1969': 'Apollo 11 technical crew debriefing from NASA, included in the declassified UAP archive. Use it as context for Apollo-era light-flash and anomalous-observation claims alongside Apollo 12 and Apollo 17 records.',
  'nasa-uap-d4-apollo-17-transcript-1972': 'Mission transcript from Apollo 17 (December 1972), the final Apollo lunar mission. Contains crew discussion of anomalous object observations.',
  'nasa-uap-d2-apollo-17-transcript-1972': 'One page of the Apollo 17 air-to-ground transcript (Tape 5/2), from about three and a half hours after launch in December 1972. Highlighted lines record the crew describing very bright particles or fragments drifting past the spacecraft during a maneuver, including a comparison to the Fourth of July and jagged, tumbling angular pieces.',
  'nasa-uap-d5-apollo-17-crew-debriefing-for-science-1973': 'Apollo 17 science crew debriefing from NASA, dated 1973. Read this with the Apollo 17 transcript, technical debriefing, and VM6 image to separate mission observations from later UFO interpretations.',
  'nasa-uap-d6-apollo-17-technical-crew-debriefing-1973': 'Apollo 17 technical crew debriefing from NASA, dated 1973. This record provides post-mission operational context for Apollo 17 UAP and anomalous-observation searches.',
  'nasa-uap-vm6-apollo-17-1972': 'Apollo 17 lunar surface photograph (1972) from the NASA UAP release. The frame looks across a flat valley floor toward rounded hills, with a dark shadow at lower left. A yellow box added for the release enlarges a tiny cluster of three faint points in the black sky above the right-hand slope, two bluish and one orange. No explanation is given.',
  'nasa-uap-d6-skylab-technical-crew-debriefing-1973': 'Technical crew debriefing from the Skylab space station program (1973). Crew members discuss observations made during extended orbital operations.',
  '65-hs1-834228961-62-hq-83894-section-1': 'FBI case-file record 65-HS1-834228961, 62-HQ-83894 Section 1. This page indexes the public image file and connects it to neighboring sections, serials, and FBI UAP evidence records.',
  '65-hs1-834228961-62-hq-83894-section-2': 'FBI case-file record 65-HS1-834228961, 62-HQ-83894 Section 2. The record includes an image file and PDF, making it a stronger source page for readers searching the 65-HS1 / 62-HQ-83894 file series.',
  '65-hs1-834228961-62-hq-83894-section-7': 'Folder cover for Section 7 (Serials 302 to 343) of FBI Headquarters file 62-HQ-83894, the file number under which the FBI kept its UFO records. The image shows the envelope, not the case pages: a Central Records Center barcode label, several "Copied for FOIPA" stamps from the 1970s, a "Do Not Destroy" marking and FOIPA number 993087.',
  '65-hs1-834228961-62-hq-83894-section-8': 'Folder cover for Section 8 (Serials 344 to 384) of FBI Headquarters file 62-HQ-83894, the file number under which the FBI kept its UFO records. The image shows the envelope, not the case pages: a barcode label, "Copied for FOIPA" stamps dated 1976 to 1979, two "Do Not Destroy" stamps and FOIPA number 993087.',
  '65-hs1-834228961-62-hq-83894-section-10': 'Folder cover for Section 10 (Serials 448 onward) of FBI Headquarters file 62-HQ-83894, the file number under which the FBI kept its UFO records. The image shows the envelope, not the case pages: a barcode label marked OPEN, several "Copied for FOIPA" stamps from the 1970s, a handwritten note for Serial 449 and a "Use Care in Handling This File" warning.',
  '65-hs1-834228961-62-hq-83894-serial-130': 'FBI case-file record 65-HS1-834228961, 62-HQ-83894 Serial 130. This entry includes a large public PDF and image file connected to the declassified FBI UFO case-file archive.',
  '65-hs1-834228961-62-hq-83894-serial-220': 'FBI case-file record 65-HS1-834228961, 62-HQ-83894 Serial 220. The entry is part of the same FBI file series as Sections 1, 7, 8, and 10.',
  '65-hs1-834228961-62-hq-83894-sub-a': 'FBI case-file record 65-HS1-834228961, 62-HQ-83894 Sub A. Use this page as a companion entry to the main section and serial records in the FBI 62-HQ-83894 series.',
  '1006106-dow-uap-pr46-unresolved-uap-report-indopacom-2024': 'Department of War PR46 unresolved UAP report video from INDOPACOM in 2024. The public record provides the video file and source metadata, while radar, platform details, and assessment context remain outside this page.',
  '1006073-dow-uap-pr28-unresolved-uap-report-greece-january-2024': 'Department of War PR28 unresolved UAP report video from Greece in January 2024. The record is useful for readers searching UAPPR28 or PR28, but the public page should be treated as a video source entry, not a complete case file.',
  '2024-04-30-composite-sketch': 'Public composite sketch dated April 30, 2024, included in the PURSUE archive. This page indexes the image file and connects it to related UAP mission-report and evidence records.',
  'dow-uap-d38-range-fouler-debrief-middle-east-may-2020': 'Standardized military Range Fouler debrief form documenting a UAP encounter in the Middle East, May 2020. Includes radar/FLIR tracking data, object characteristics, and crew narrative description.',
  'dow-uap-d50-email-correspondence-indopacom-april-2025': 'Internal email correspondence from U.S. Indo-Pacific Command (INDOPACOM) regarding UAP encounters in the Indo-Pacific theater, April 2025.',
  'dow-uap-d8-mission-report-djibouti-2025': 'Military mission report documenting a UAP encounter near Djibouti, East Africa in 2025. Filed through Department of War reporting channels.',
};

// Hand-written findings for Release 01 records. Each must describe only what the
// record's own file shows. Records without an entry keep an empty list and are
// treated as thin (noindex, out of sitemap) by src/data/seo.ts.
const KEY_FINDINGS_MAP = {
  'nasa-uap-d1-apollo-12-transcript-1969': [
    'Page 742 of Tape 90/3 runs from mission elapsed time 05 19 14 58 to 05 19 24 05 (day, hour, minute, second), about nine minutes of dialogue.',
    'The speakers are Houston (CC), the lunar module commander (CDR-LM) and the command module pilot (CMP). The vehicles use their Apollo 12 call signs: Intrepid for the lunar module and Yankee Clipper for the command module.',
    'Houston asks first the lunar module crew and then the command module pilot to set their computers to POO and ACCEPT so it can uplink data, including a command module state vector and an RLS (landing-site) update. It also confirms the lunar module lift-off time as 142:03:47, which the crew reads back.',
    'Nothing on this page refers to an unidentified object. It is routine flight-operations traffic ahead of the lunar module ascent.',
    'This record reproduces only this one page. Anyone looking for the passages behind Apollo 12 UFO claims needs the rest of the transcript, which is not shown here.',
  ],
  'nasa-uap-vm1-apollo-12-1969': [
    'The image is a full lunar surface frame with the film\'s reseau crosses visible across it, a strip of film edge along the left and right sides, and long shadows falling across the foreground.',
    'The yellow enlargement box was added for the release and is not part of the original photograph. It magnifies a very small vertical streak just above the horizon on the right side of the frame. At magnification the streak is blue with a reddish point near its lower end.',
    'The streak is tiny relative to the frame, so its size, distance and nature cannot be determined from this image alone.',
    'The release does not say what the streak is. Small colored marks near the edge of a scanned film frame can come from film defects, scan artifacts or optical effects, so the annotation is a claim to test rather than a finding.',
    'Compare this frame with the other Apollo 12 visual media records (VM2 to VM5) and the Apollo 12 transcript before drawing conclusions.',
  ],
  'nasa-uap-d2-apollo-17-transcript-1972': [
    'The page is from Tape 5/2. Its timestamps start around 00 03 25 (about 3 hours 25 minutes after launch), and Houston and the crew are coordinating a spacecraft maneuver with a start time of 03:33:27.',
    'The yellow highlighting appears to have been added for the release rather than being part of the original typescript. It begins where the command module pilot reports a few very bright particles or fragments drifting by as the spacecraft maneuvers.',
    'The lunar module pilot adds that there is a whole bunch of big bright ones at his window and that it looks like the Fourth of July out of the command module pilot\'s window. The command module pilot says some can be seen in shape, as very jagged, angular fragments that are tumbling.',
    'By the crew\'s own description these are fragments seen while the spacecraft maneuvers. Read plainly, that describes debris near the spacecraft rather than a distant unidentified craft, although the transcript itself offers no explanation.',
    'The page ends mid-exchange, so what the crew or Houston concluded next is not visible in this record.',
  ],
  'nasa-uap-vm6-apollo-17-1972': [
    'The frame looks across a flat, pale valley floor toward low rounded hills, with a dark shadow in the lower left and the film\'s reseau crosses visible. Apollo 17 landed in the Taurus-Littrow valley in December 1972.',
    'The yellow enlargement box was added for the release. It magnifies a tiny cluster of three faint points in the black sky above the right-hand slope: two bluish points and one orange one.',
    'The points are extremely small and dim, with no visible shape, so nothing about their size or distance can be read from this image.',
    'The release does not identify them. Faint colored points on scanned color film can also be film or scan artifacts, so treat the annotation as something to test rather than a conclusion.',
    'The Apollo 17 transcript record in this archive describes bright particles seen from the spacecraft during a maneuver early in the flight. That is a different situation from a photograph taken on the lunar surface, and the two should not be merged into one event.',
  ],
  '65-hs1-834228961-62-hq-83894-section-7': [
    'The label identifies the folder as FBI Headquarters, Class/Case 0062 83894, Section 7, covering Serials 302 to 343. A second label on the right repeats 62-HQ-83894, Serials 302-343, Section 7.',
    'Several overlapping "Copied for FOIPA" stamps cover the front, with dates in the late 1970s. They record when the folder was copied for Freedom of Information and Privacy Act processing.',
    'Handwriting on the cover notes Serials 322, 320 and 343, and a handwritten FOIPA number, 993087, appears near the bottom. The cover carries a "Do Not Destroy" marking and a "Transfer-Call 421" stamp.',
    'A blue notice states that declassification authority derives from the FBI Automatic Declassification Guide issued May 24, 2007.',
    'This record provides the folder cover image only. It does not reproduce the serials inside the folder.',
  ],
  '65-hs1-834228961-62-hq-83894-section-8': [
    'The label identifies the folder as FBI Headquarters, Class/Case 0062 83894, Section 8, covering Serials 344 to 384. A second label on the right repeats 62-HQ-83894, Serials 344-384, Section 8.',
    'The "Copied for FOIPA" stamps on this cover carry dates including November 3, 1976, May 1977 and January 18, 1979, spanning the same processing period as the neighboring sections.',
    'Two "Do Not Destroy" stamps appear on the front, and the handwritten FOIPA number 993087 is the same number written on the Section 7 cover. Handwritten numbers near the bottom appear to read 358 and 346.',
    'The cover is stamped "Transfer-Call 3421", while Section 7 carries "Transfer-Call 421".',
    'This record provides the folder cover image only. It does not reproduce the serials inside the folder.',
  ],
  '65-hs1-834228961-62-hq-83894-section-10': [
    'The label identifies the folder as FBI Headquarters, Class/Case 0062 83894, Section 10, starting at Serial 448. The label reads OPEN, and the side label gives an open-ended range, "Serials 448-", rather than a fixed end.',
    'Several "Copied for FOIPA" stamps overlap on the cover with dates in the mid to late 1970s, and a handwritten note marks Serial 449.',
    'The cover carries the warnings "Use Care in Handling This File" and "Do Not Destroy", and a "Transfer-Call 3421" stamp.',
    'Section 10 starts at Serial 448, while Section 8 in this archive ends at Serial 384, so the serials between them (385 to 447) are not part of this record.',
    'This record provides the folder cover image only. It does not reproduce the serials inside the folder.',
  ],
};

// ===== Utility Functions =====
function slugify(s) {
  return s.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
}

function detectAgency(name) {
  if (name.startsWith('dow-') || name.startsWith('DOW-')) return 'DOW';
  if (name.startsWith('fbi-') || name.startsWith('FBI-') || name.match(/^65_hs1/)) return 'FBI';
  if (name.startsWith('nasa-') || name.startsWith('NASA_')) return 'NASA';
  if (name.startsWith('dos-') || name.startsWith('DOS-')) return 'DOS';
  if (name.match(/^(18_|38_|59_|255_|331_|341_|342_)/)) return 'NARA';
  return 'OTHER';
}

function detectCategory(name) {
  if (name.includes('mission-report') || name.includes('mission_report')) return 'mission-report';
  if (name.includes('range-fouler') || name.includes('range_fouler')) return 'range-fouler';
  if (name.includes('cable')) return 'cable';
  if (name.includes('transcript')) return 'transcript';
  if (name.includes('crew-debriefing') || name.includes('crew_debriefing')) return 'crew-debriefing';
  if (name.includes('email')) return 'email';
  if (name.includes('launch-summary') || name.includes('launch_summary')) return 'launch-summary';
  if (name.includes('photo') || name.includes('vm')) return 'photo-evidence';
  if (name.includes('Unresolved_UAP')) return 'video-evidence';
  if (name.includes('section') || name.includes('serial') || name.includes('sub_')) return 'case-file';
  if (name.includes('slides') || name.includes('report')) return 'mission-report';
  if (name.includes('incident') || name.includes('records')) return 'archival';
  return 'archival';
}

function extractLocation(name) {
  const locs = {
    'arabian-gulf': { name: 'Arabian Gulf', region: 'Middle East', lat: 26.0, lng: 52.0 },
    'arabian_gulf': { name: 'Arabian Gulf', region: 'Middle East', lat: 26.0, lng: 52.0 },
    'syria': { name: 'Syria', region: 'Middle East', lat: 35.0, lng: 38.0 },
    'iraq': { name: 'Iraq', region: 'Middle East', lat: 33.0, lng: 44.0 },
    'united-arab-emirates': { name: 'UAE', region: 'Middle East', lat: 24.0, lng: 54.0 },
    'greece': { name: 'Greece', region: 'Europe', lat: 39.0, lng: 22.0 },
    'east-china-sea': { name: 'East China Sea', region: 'Indo-Pacific', lat: 30.0, lng: 125.0 },
    'japan': { name: 'Japan', region: 'Indo-Pacific', lat: 36.0, lng: 140.0 },
    'djibouti': { name: 'Djibouti', region: 'Africa', lat: 11.5, lng: 43.1 },
    'persian-gulf': { name: 'Persian Gulf', region: 'Middle East', lat: 27.0, lng: 51.0 },
    'strait-of-hormuz': { name: 'Strait of Hormuz', region: 'Middle East', lat: 26.5, lng: 56.3 },
    'iran': { name: 'Iran', region: 'Middle East', lat: 32.0, lng: 53.0 },
    'gulf-of-aden': { name: 'Gulf of Aden', region: 'Middle East', lat: 12.5, lng: 47.0 },
    'mediterranean': { name: 'Mediterranean Sea', region: 'Europe', lat: 35.0, lng: 18.0 },
    'middle-east': { name: 'Middle East', region: 'Middle East', lat: 29.0, lng: 47.0 },
    'middle_east': { name: 'Middle East', region: 'Middle East', lat: 29.0, lng: 47.0 },
    'papua-new-guinea': { name: 'Papua New Guinea', region: 'Indo-Pacific', lat: -6.0, lng: 147.0 },
    'kazakhstan': { name: 'Kazakhstan', region: 'Central Asia', lat: 48.0, lng: 68.0 },
    'africa': { name: 'Africa', region: 'Africa', lat: 9.0, lng: 38.0 },
    'indopacom': { name: 'Indo-Pacific', region: 'Indo-Pacific', lat: 15.0, lng: 130.0 },
    'INDOPACOM': { name: 'Indo-Pacific', region: 'Indo-Pacific', lat: 15.0, lng: 130.0 },
    'arabian-sea': { name: 'Arabian Sea', region: 'Middle East', lat: 15.0, lng: 65.0 },
    'arabian_sea': { name: 'Arabian Sea', region: 'Middle East', lat: 15.0, lng: 65.0 },
  };
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(locs)) {
    if (lower.includes(key.toLowerCase())) return val;
  }
  if (lower.includes('apollo') || lower.includes('skylab') || lower.includes('orbit')) {
    return { name: 'Space', region: 'Space', lat: 0, lng: 0 };
  }
  return undefined;
}

function extractYear(name) {
  const matches = name.match(/\b(19[4-9]\d|20[0-2]\d)\b/g);
  if (matches && matches.length > 0) return parseInt(matches[matches.length - 1]);
  return 2026;
}

function extractDate(name) {
  const year = extractYear(name);
  const monthNames = { january: '01', february: '02', march: '03', april: '04',
    may: '05', june: '06', july: '07', august: '08', september: '09',
    october: '10', november: '11', december: '12' };
  const lower = name.toLowerCase();
  for (const [mname, mnum] of Object.entries(monthNames)) {
    if (lower.includes(mname)) return `${year}-${mnum}-01`;
  }
  return `${year}-01-01`;
}

function titleFromFilename(name) {
  let t = name.replace(/\.(jpg|png|mp4|pdf)$/i, '');
  t = t.replace(/[-_]+/g, ' ');
  t = t.replace(/\b\w/g, c => c.toUpperCase());
  t = t.replace(/\bDow\b/gi, 'DOW').replace(/\bUap\b/gi, 'UAP')
       .replace(/\bFbi\b/gi, 'FBI').replace(/\bNasa\b/gi, 'NASA')
       .replace(/\bDos\b/gi, 'DOS').replace(/\bPr(\d)/g, 'PR$1')
       .replace(/\bHs1\b/gi, 'HS1').replace(/\bHq\b/gi, 'HQ')
       .replace(/\bVm(\d)/g, 'VM$1').replace(/\bD(\d)/g, 'D$1');
  return t.trim();
}

// Auto-generate summaries for documents without manual overrides
function generateSummary(doc) {
  const { agency, category, year, location } = doc;
  const agencyNames = { DOW: 'Department of War', FBI: 'Federal Bureau of Investigation', NASA: 'NASA', DOS: 'Department of State', NARA: 'National Archives', OTHER: 'U.S. Government' };
  const catNames = { 'mission-report': 'military mission report', 'range-fouler': 'Range Fouler UAP debrief form', cable: 'diplomatic cable', transcript: 'official transcript', 'photo-evidence': 'photographic evidence', 'video-evidence': 'unresolved UAP video', 'case-file': 'classified case file', email: 'internal email correspondence', archival: 'archival record', 'crew-debriefing': 'crew debriefing document', 'launch-summary': 'launch summary report', presentation: 'briefing presentation' };
  const locStr = location ? ` near ${location.name}` : '';
  return `Declassified ${catNames[category] || 'document'} from the ${agencyNames[agency] || agency}${locStr}, dated ${year}. Released under the PURSUE initiative on May 8, 2026.`;
}

// ===== Build document map =====
const docMap = new Map();

function addFile(subdir, filename, stats) {
  const ext = path.extname(filename).toLowerCase();
  const base = filename.replace(/\.(jpg|png|mp4|pdf)$/i, '');
  const type = ext === '.mp4' ? 'video' : ext === '.pdf' ? 'pdf' : 'image';
  
  let docId = slugify(base);
  if (base.match(/^fbi-photo-[ab]\d+/)) {
    const series = base.match(/^fbi-photo-([ab])/)[1];
    docId = `fbi-photo-series-${series}`;
  }
  
  if (!docMap.has(docId)) {
    const agency = detectAgency(filename);
    const category = detectCategory(filename);
    const location = extractLocation(filename);
    const year = extractYear(filename);
    const fallbackTitle = titleFromFilename(filename);
    
    docMap.set(docId, {
      id: docId,
      slug: docId,
      title: TITLE_MAP[docId] || fallbackTitle,
      agency,
      category,
      date: extractDate(filename),
      year,
      dateReleased: '2026-05-08',
      releaseLabel: 'Release 01',
      sourceUrl: 'https://war.gov/UFO',
      location,
      classification: 'DECLASSIFIED',
      summary: SUMMARY_MAP[docId] || '',
      keyFindings: KEY_FINDINGS_MAP[docId] || [],
      files: [],
      relatedDocs: [],
      tags: [agency.toLowerCase(), category],
      featured: false,
    });
  }
  
  docMap.get(docId).files.push({ type, filename, size: stats.size });
}

// Scan directories
for (const subdir of ['image', 'video', 'pdf']) {
  const dir = path.join(SOURCE, subdir);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (f.startsWith('.')) continue;
    const stats = fs.statSync(path.join(dir, f));
    addFile(subdir, f, stats);
  }
}

// Auto-generate summaries for docs without manual ones
for (const [id, doc] of docMap) {
  if (!doc.summary) {
    doc.summary = generateSummary(doc);
  }
}

// Mark featured documents
const featuredIds = [
  'dow-uap-d55-mission-report-syria-november-2016',
  'nasa-uap-vm1-apollo-12-1969',
  'fbi-photo-series-a',
  'fbi-photo-series-b',
  'dos-uap-d1-cable-1-papua-new-guinea-january-1985',
  'western-us-event-slides-5-08-2026',
  'dow-uap-d38-range-fouler-debrief-middle-east-may-2020',
  'nasa-uap-d3-apollo-11-technical-crew-debriefing-1969',
  'dow-uap-d8-mission-report-djibouti-2025',
];
for (const id of featuredIds) {
  if (docMap.has(id)) docMap.get(id).featured = true;
}

// Filter out placeholder documents without manual summaries.
// These are auto-generated stub pages (templated summary + empty keyFindings)
// that AdSense flags as "low value content". Keeping them out of the catalog
// ensures they are not rebuilt into document pages or the sitemap.
const beforeFilter = docMap.size;
for (const [id, doc] of docMap) {
  if (!SUMMARY_MAP[id]) {
    docMap.delete(id);
  }
}
console.log(`   Filtered out ${beforeFilter - docMap.size} placeholder documents without manual summaries (${docMap.size} remaining)`);

// Populate relatedDocs by agency (after filtering, so no references to placeholders)
for (const [id, doc] of docMap) {
  doc.relatedDocs = Array.from(docMap.values())
    .filter(d => d.agency === doc.agency && d.id !== id)
    .slice(0, 4)
    .map(d => d.id);
}

// Generate TypeScript
const docs = Array.from(docMap.values()).sort((a, b) => b.year - a.year);

let output = `// AUTO-GENERATED by scripts/catalog.mjs — Do not edit manually
import type { DeclassifiedDocument } from './types';
import { release02Documents } from './release-02-documents';
import { release03Documents } from './release-03-documents';
import { release04Documents } from './release-04-documents';
import { release05Documents } from './release-05-documents';

export const release01Documents: DeclassifiedDocument[] = ${JSON.stringify(docs, null, 2)};

export const documents: DeclassifiedDocument[] = [...release05Documents, ...release04Documents, ...release03Documents, ...release02Documents, ...release01Documents].sort((a, b) =>
  b.dateReleased.localeCompare(a.dateReleased) || b.year - a.year || a.title.localeCompare(b.title)
);

export function getDocumentBySlug(slug: string): DeclassifiedDocument | undefined {
  return documents.find(d => d.slug === slug);
}

export function getDocumentsByAgency(agency: string): DeclassifiedDocument[] {
  return documents.filter(d => d.agency === agency);
}

export function getDocumentsByCategory(category: string): DeclassifiedDocument[] {
  return documents.filter(d => d.category === category);
}

export function getFeaturedDocuments(): DeclassifiedDocument[] {
  return documents.filter(d => d.featured);
}

export function getDocumentsByYear(year: number): DeclassifiedDocument[] {
  return documents.filter(d => d.year === year);
}

export function getAllYears(): number[] {
  return [...new Set(documents.map(d => d.year))].sort((a, b) => b - a);
}

export function getAllTags(): string[] {
  return [...new Set(documents.flatMap(d => d.tags))].sort();
}
`;

fs.writeFileSync(OUT, output, 'utf-8');
console.log(`✅ Generated ${docs.length} documents → ${OUT}`);
console.log(`   With titles: ${docs.filter(d => TITLE_MAP[d.id]).length} manual, ${docs.filter(d => !TITLE_MAP[d.id]).length} auto`);
console.log(`   With summaries: ${docs.filter(d => SUMMARY_MAP[d.id]).length} manual, ${docs.filter(d => !SUMMARY_MAP[d.id]).length} auto`);
