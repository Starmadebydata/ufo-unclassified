# Release-day outreach templates

Ready-to-fire copy for the four actions in the "Release 0N 窗口" section of
[backlink-research-2026-07-26.md](../backlink-research-2026-07-26.md). Every
prior release (01 through 05) skipped all four. Release 05 in particular:
the site's own coverage landed 9 days late (2026-08-16 for an 2026-08-07
release) and no analysis article or outreach happened at all. These
templates exist so the delay next time is "how long to fill in the blanks",
not "start from a blank page while the news cycle is already three days old."

Fill every [[TOKEN]]. Do not post any of these until Step 1 (the article) is
live — every template links to it.

---

## Timing

| T+ | Action |
|---|---|
| 0-4h | Publish the first-look article (`research/templates/release-first-look.md`). Everything below links to it, so it has to exist first. |
| 0-4h | Post the Metabunk reply (the thread usually already exists — search `metabunk.org/tags/uap/` or the prior release's thread number + 1; do not open a new thread). |
| 4-12h | Post the r/UFOs megathread comment once the mods have opened it. Disclose you are the site's developer. |
| 12-24h | Send the journalist emails. By this point the article and tool-page updates are live, so every link in the email resolves. |
| Within 72h | Everything above should be done. After 72h the news cycle has moved on and the same actions return much less. |

---

## 1. Metabunk reply

Post as a reply in the existing per-release thread, addressed to whatever
specific record or claim is under discussion there — not as a standalone
self-introduction. Metabunk's culture rewards "here is the sourcing on that
specific file," not "check out my site."

> Cross-referencing this against our index: [[RECORD_TITLE]] ([[RECORD_URL]])
> carries these source-status labels: [[LABELS, e.g. "public rendition,
> officially unresolved"]]. [[ONE OR TWO SENTENCES ON WHAT THAT DOES AND
> DOES NOT ESTABLISH — e.g. "the video is a public rendition, not raw
> sensor output, so the chain-of-custody caveats apply" or "AARO's own
> release notes label this case unresolved, not explained."]]
>
> Full breakdown of what changed in this release vs. the last one: [[LINK
> TO /tools/compare]]. Disclosure: I run ufo-declassified.com, an
> independent index of the PURSUE releases — happy to take corrections on
> anything above.

---

## 2. r/UFOs megathread comment

Post once the release megathread exists (mods open one within hours of every
release). Answer the question people are actually asking in that thread —
usually "what's actually new this time" — rather than leading with the site.

> If you're trying to figure out what's actually new in Release [[NN]] vs.
> the cumulative total: [[N]] new records this release, [[N]] total across
> all five releases. Full per-release breakdown (agency mix, file types,
> what's new vs. carried over from the running count) here: [[LINK TO
> /tools/compare]].
>
> Full text of what we've indexed so far: [[LINK TO /documents?release=
> Release%20[[NN]]]]. (I maintain this site independently, not affiliated
> with DOW/AARO — flagging that up front.)

---

## 3. Journalist outreach email

Send individually, not as a group blast, to reporters who have covered
prior PURSUE releases: AP, CBS, NBC, Newsweek, NewsNation, Guardian US.
Look up the specific byline that covered Release [[NN-1]] or [[NN-2]] at
each outlet — a named, personalized email gets read; a generic press-list
send gets filtered.

Subject: `PURSUE Release [[NN]] — per-release numbers if useful for your coverage`

> Hi [[NAME]],
>
> I saw your coverage of [[PRIOR RELEASE THEY COVERED]]. I maintain
> ufo-declassified.com, an independent index of the PURSUE releases, and
> wanted to flag a few things that might save you time on Release [[NN]]:
>
> - Per-release breakdown (agency mix, file types, new vs. cumulative
>   counts): [[LINK TO /tools/compare]]
> - Full running total across all releases, with a citation block:
>   [[LINK TO /tools/stats]]
> - The complete catalog as a dataset, DOI-archived on Zenodo (CC BY 4.0,
>   free to reuse with attribution): https://doi.org/10.5281/zenodo.21605258
>
> Everything above is free to cite or screenshot. Happy to answer questions
> on sourcing for any specific record, or to pull a specific cut of the data
> if that's more useful than what's already on the page.
>
> [[Attach or link one static chart image if you have one ready — a
> screenshot of the /tools/compare view for this release works.]]
>
> Flynn Lin
> ufo-declassified.com

---

## 4. Post-publish technical checklist

Not outreach, but has to happen the same day for the links above to be
correct when people click them:

- [ ] `src/data/toolData.ts`: `RELEASES` and `RELEASE_COLORS` include
      Release [[NN]] (the four /tools pages derive their "Releases 01-0N"
      text from this automatically — see `RELEASE_RANGE_LABEL` — but the
      array itself still has to be updated by hand).
- [ ] `src/pages/tools/compare.astro`: add a bullet describing Release
      [[NN]]'s character to the "Reading the differences" list.
- [ ] `dataset/uap-documents.csv` + `dataset/README.md` + `dataset/CITATION.cff`
      + `dataset/.zenodo.json`: run `./dataset/refresh.sh`, bump the version,
      publish a new Zenodo version (concept DOI stays the same — see
      `research/zenodo-upload-checklist.md`).
- [ ] `public/llms.txt`: bump the release count and add the new article
      under Analysis Articles.
- [ ] Google Search Console: request indexing for the new article URL.
