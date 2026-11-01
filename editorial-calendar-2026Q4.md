# UFO Declassified — Q4 Editorial Calendar (November–December 2026)

## Strategy Shift (why this differs from Q3)

Q3 ran a fixed 2-posts/week cadence. It produced 26 solid posts but is not
sustainable solo, and it decouples publishing from the audience's actual
attention spike: **new PURSUE tranches**. Q4 switches to an event-driven model:

- **Baseline commitment**: 1 post per week (deep dive OR case file update).
- **Event weeks**: a new war.gov release flexes output up — first-look within
  48h, then follow-up analysis; that week skips the baseline post.
- **Living case files** replace one-off history posts: flagship cases get a
  permanent page that is *updated* each time a new release adds material.
  Cumulative pages outrank and outlive discrete articles.
- **North-star metric**: Release Alert subscribers (newsletter), then organic
  search. Pageviews are a diagnostic, not the goal.

## Playbook A — New Release (event-triggered, ~48h)

1. **T+0–4h**: download tranche from war.gov/UFO (curl_cffi method); quick
   triage — count records by agency/type/era; flag the 3 files worth reading.
2. **T+4–24h**: ingest metadata → `src/data/release-NN-documents.ts`; upload
   media to R2 (probe public bucket after batch — D152-style silent failures);
   update dataset CSV + counts, bump `dataset/CITATION.cff` / `.zenodo.json`,
   publish GitHub release `dataset-vX.Y.Z` (Zenodo auto-versions).
3. **T+24–48h**: publish `/blog/war-gov-ufo-release-NN-first-look/` — record
   counts, the 3 highlights with file IDs, what it does NOT contain.
4. **Same day**: Release Alert email (once newsletter is live) — same 3
   highlights + direct links; share in r/UFOs, r/UAP, X as *answers with
   file IDs*, not bare links.
5. **T+1 week**: one follow-up deep dive on the single most newsworthy record.

## Playbook B — Living Case File (new format)

Convert flagship cases into permanent, updated pages (extend `topics/` or new
`case-files/` routes). Each page: timeline of the case → the released records
(file IDs, links) → what remains classified or unexplained → changelog
("Updated after Release NN added X"). Update whenever a release touches the
case; the changelog gives readers and search engines a reason to return.

**Case file candidates (start with 3 in Q4):**
1. **The Tremonton film (1952)** — Release 06 material; visual case, evergreen.
2. **Green fireballs / Sandia reports (1948–51)** — connects DOE, CIA, DOW files.
3. **Triangular UAP (2000s–2026)** — Release 07's AARO MFR + FBI renderings
   make this the "living" case par excellence; every release seems to add one.

## Playbook C — Deep Dive (baseline, biweekly quality bar)

Same standard as Q3: one search intent, clear judgment in the title ("what the
file shows AND what it's missing"), 2–3 internal links to articles + 2–3 to
document pages, first-look articles linked from the related release.

---

## Calendar

### Week of Nov 2
- Deep: **Release 07 triage** — "Utah Ranch Investigation (D174): what the
  DOW file actually alleges" (fresh tranche, highest interest now).

### Week of Nov 9
- Deep: **"Saudi Arabia, 1957 (D155): an Air Intelligence report the
  ufology literature barely touches"** — first-mover on an untouched record.

### Week of Nov 16
- Case file launch: **Tremonton film** living page (migrate/absorb the
  Release 06 first-look content; 301 or cross-link).

### Week of Nov 23
- Deep: **Triangular UAP case file launch** built on D176 + FBI renderings
  (NASA/DoD imagery already in archive).

### Week of Nov 30
- Methodology (traffic magnet for the tools audience): "How to verify a UAP
  claim against the PURSUE archive — a 15-minute checklist for reporters."

### Week of Dec 7
- Case file: **Green fireballs** living page (absorbs the Sandia post).

### Week of Dec 14
- Deep: editorial — **"Eight months of PURSUE: what the record counts
  actually show"** (agency/type/era breakdown of all 7+ releases; charts from
  the dataset; strong candidate for citations and backlinks).

### Week of Dec 21 (holiday lull — evergreen only)
- Update all living case files with any December release material;
  refresh internal links across the blog.

### Week of Dec 28
- **Year in review: 2026, the year UAP files went mainstream** — the
  archive's biggest traffic patterns + the 10 records that mattered most.
  Doubles as the January newsletter welcome sequence anchor.

---

## Housekeeping (Q4, non-editorial)

- [ ] Newsletter: pick provider (Buttondown or Kit), configure
      `NEWSLETTER.action` in `src/config.ts`, verify double opt-in + list name.
- [ ] Submit `/press/` page URL when pitching journalists; add to email signature.
- [ ] Search Console + Bing: verify both crawl the new `/press/` and case-file
      routes; check CTR on release-07 queries mid-month.
- [ ] R2 media via `media.ufo-declassified.com` — confirm 200s in DevTools
      after cutover; then monitor cache hit rate in Cloudflare dashboard.
- [ ] Kaggle mirror refresh after the next dataset version (web UI, Settings → Update).
