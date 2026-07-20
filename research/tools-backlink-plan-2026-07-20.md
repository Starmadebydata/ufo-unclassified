# Tools Backlink Acquisition Plan — 2026-07-20

Goal: accumulate genuine, editorially-given links to the /tools pages (and through them, the domain), as both a recovery signal after the June core-update suppression and a durable traffic channel independent of Google.

Principle: every outreach leads with something the recipient's audience actually wants (a map, a number, a dataset, a tracker), never with "please link to us."

## Asset-to-audience fit

| Tool | Who would link to it | The pitch in one line |
|---|---|---|
| /tools/map | Reddit community, journalists, bloggers | "Every mappable PURSUE record on one map, with honest precision labels" |
| /tools/claims | Skeptic community, journalists, researchers | "The only tracker that separates confirmed / official / unverified UAP claims with sources" |
| /tools/stats | Journalists on deadline, Wikipedia editors, AI engines | "The citable numbers: 207 records, 8 agencies, per-release breakdowns" |
| /tools/videos | Reddit, YouTube creators, forum users | "All 85 released videos in one filterable page" |
| /tools/compare | Researchers, explainer writers | "What each release actually added — ends the cumulative-count confusion" |

## Tier 1 — Release-cycle moments (highest leverage, time-boxed)

The site's proven traffic channel is the release news cycle. Every future release (Release 05 watch) is a link window of ~72 hours.

1. **r/UFOs megathread participation.** Each release gets a moderator megathread. Post substantive top-level comments that answer real questions using the tools (per-release counts from /tools/compare, location clusters from /tools/map), linking naturally. Precedent: uap.watch's "I rebuilt the files into a searchable archive" post earned heavy traction and links.
2. **A dedicated "I built this" post** (one time, not per release) on r/UFOs and r/UFOscience showing the map + video browser + claim tracker. Honest framing: independent archive, what it does and does not claim. Reddit rules: disclose being the builder; engage in comments.
3. **Fast per-release analysis article** (existing editorial pattern) that cites the tools inline — other sites that quote the analysis inherit the tool links.

## Tier 2 — Citable-numbers PR (steady drip)

4. **Wikipedia.** The "United States UFO files" article exists and is actively edited. Do NOT self-insert links. Post on the article's Talk page offering /tools/stats and the archive as an external resource, with a conflict-of-interest disclosure. Wikipedia links are nofollow but produce secondary citations from everyone who researches via Wikipedia.
5. **Journalist outreach around Release 05.** Reporters covering each release need per-release numbers within hours. Short pitch to the handful of bylines that have covered PURSUE (AP, CBS, NBC, Newsweek, NewsNation, The Guardian's world desk): "per-release breakdowns, agency mix, and a sighting map, free to cite with attribution." Include one pre-made chart image.
6. **Skeptic venues for the claim tracker.** Metabunk and similar communities value the confirmed/unverified taxonomy — the claim tracker is the rare UFO-site page a skeptic can endorse. One forum post presenting the format invites scrutiny and links.
7. **Specialist researchers.** UAP Logbook, The Debrief, The Black Vault operate in the same space and link to useful primary tools. Short collegial note, no reciprocity ask.

## Tier 3 — Dataset distribution (compounding, one-time setup)

8. **Publish the document index as an open dataset.** Export the catalog (207 records: id, title, agency, date, release, location, file types, source URL) as CSV/JSON in a public GitHub repo with a citation-and-link request in the README. GitHub repos rank, get starred, and get linked.
9. **Kaggle / data.world upload** of the same CSV with canonical link back. Data-journalism and ML tutorial users cite dataset sources.
10. **Google Dataset Search** already covered: /tools/stats ships Dataset JSON-LD.

## Tier 4 — On-site prerequisites (build once, helps every channel)

11. **Per-tool OG images.** Tools currently share the default OG image; a map screenshot or stats chart as OG raises share CTR everywhere. (Small build task.)
12. **"Cite this page" block on /tools/stats and /tools/map** — a copy-paste citation with URL, mirroring the existing document-page citation block. Makes attribution frictionless.
13. **CSV download button on /tools/stats** — the dataset distribution (item 8) surfaced on-site, so anyone referencing the numbers can pull the data and cite the source.

## Cadence and measurement

- Weekly (15 min): GSC Links report + Bing Webmaster / Ahrefs Webmaster Tools free tier for new referring domains; note which asset earned each link.
- Per release: execute Tier 1 within 72 hours of the drop.
- Monthly: one Tier 2 outreach batch (3–5 contacts max, individually written).
- Do not: buy links, exchange links, mass-email, or post identical copy across forums — any of these worsens the exact algorithmic evaluation we are recovering from.

## Success definition

- 90 days: 10–20 new referring domains, at least 3 from the specialist/press tier; one dataset repo live with external stars/forks.
- Signal to watch: GSC impressions curve during the next Google core update window — links are one input to that re-evaluation.
