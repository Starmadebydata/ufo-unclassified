# PURSUE UAP Documents Dataset

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23854002.svg)](https://doi.org/10.5281/zenodo.23854002)

A structured catalog of every U.S. government UAP record released under the **PURSUE** initiative (Presidential Unsealing and Reporting System for UAP Encounters), covering all public tranches from May 8, 2026 onward.

**351 records · 1947–2026 · 12 source agencies · 7 releases**

This is a *finding aid*, not a document dump. Each row identifies one released record, states which agency released it, when the underlying event or document dates from, which tranche it arrived in, what file types it contains, and — the part that does not exist anywhere else — **what kind of evidence it is**.

The underlying documents are U.S. government works in the public domain, hosted at [war.gov/ufo](https://war.gov/ufo). This dataset is the independent index built on top of them.

---

## Files

| File | Description |
|---|---|
| `uap-documents.csv` | The catalog. One row per record, UTF-8, comma-delimited, RFC 4180 quoting. |
| `CITATION.cff` | Machine-readable citation metadata. |
| `LICENSE` | Full CC BY 4.0 license text. |
| `NOTICE` | Attribution and the exact scope of the license. |
| `refresh.sh` | Pulls a fresh snapshot from the live site and reports what changed. |
| `.zenodo.json` | Machine-readable Zenodo metadata, read by Zenodo's GitHub integration on tagged releases. |

The canonical, always-current version is regenerated on every build of the source site:

```
https://ufo-declassified.com/dataset/uap-documents.csv
```

The copy in this repository is a snapshot. For the live file, use the URL above.

---

## Field definitions

| Field | Type | Description |
|---|---|---|
| `slug` | string | Stable identifier for the record. Unique across the dataset. Forms the record URL. |
| `title` | string | Record title as released, lightly normalized for readability. |
| `agency` | enum | Releasing agency code. See table below. |
| `year` | integer | Year of the underlying document or event, **not** the release year. Range 1947–2026. |
| `release` | enum | Which PURSUE tranche the record arrived in: `Release 01`–`Release 07`. |
| `location` | string | Place named in the record, as released. Empty when the record names no location. 294 of 351 records carry one. Free text, not normalized to a gazetteer — see *Known limitations*. |
| `file_types` | string | Semicolon-delimited set of file formats in the record's package: `pdf`, `video`, `image`, `audio`. |
| `evidence_labels` | string | Semicolon-delimited source-status labels. See *Source-status labels* below. |
| `record_url` | URL | Canonical page for the record, carrying the full metadata, official source link, and citation block. |

### Agency codes

| Code | Full name | Records |
|---|---|---|
| `DOW` | Department of War | 220 |
| `FBI` | Federal Bureau of Investigation | 52 |
| `NASA` | National Aeronautics and Space Administration | 29 |
| `CIA` | Central Intelligence Agency | 23 |
| `DOE` | Department of Energy | 5 |
| `DOS` | Department of State | 4 |
| `LLE` | Local Law Enforcement | 8 |
| `ODNI` | Office of the Director of National Intelligence | 1 |
| `ICA` | Intelligence Community Assessment | 1 |
| `EOP` | Executive Office of the President | 2 |
| `USG` | U.S. Government (Interagency) | 1 |
| `OTHER` | Other / mixed provenance | 5 |

### Release schedule

| Release | Date posted | Records |
|---|---|---|
| Release 01 | 2026-05-08 | 31 |
| Release 02 | 2026-05-22 | 64 |
| Release 03 | 2026-06-12 | 72 |
| Release 04 | 2026-07-10 | 40 |
| Release 05 | 2026-08-07 | 41 |
| Release 06 | 2026-09-18 | 75 |
| Release 07 | 2026-10-23 | 28 |

### File type distribution

pdf 182 · video 116 · image 45 · audio 8

(Counts exceed 351 because a record's package may contain more than one format.)

---

## Source-status labels

The `evidence_labels` column is the distinguishing feature of this dataset. It answers a question the raw releases do not: *what kind of thing is this record, evidentially?*

Labels are **verifiable statements about a record's sourcing**. They are not quality ratings, not confidence scores, and not judgments about what the underlying event was. A record labeled `unresolved` is one the releasing agency itself declined to explain — the label reports the government's position, it does not endorse any interpretation.

Two layers are applied.

### Layer 1 — derived (mechanical, applies to all records)

Computed deterministically from record metadata. Reproducible; no human judgment involved.

| Label | Meaning | Count |
|---|---|---|
| `official-source` | The record carries a link to its official government source page. | 351 |
| `public-rendition` | Video files are official public renditions, not raw sensor data. Chain-of-custody caveats apply. | 116 |
| `historical-archival` | A scanned historical record. Valuable as institutional history, not as a modern case file. | 150 |
| `witness-testimony` | Primarily first-person account: transcript, debriefing, interview, or case file. | 85 |

Derivation rules:
- `official-source` — record or any of its files has a `sourceUrl`.
- `public-rendition` — record package contains at least one `video` file.
- `historical-archival` — record category is `archival`, or `year < 2000`.
- `witness-testimony` — record category is one of `transcript`, `crew-debriefing`, `case-file`, `range-fouler`.

### Layer 2 — editorial (judgment, applied selectively)

Applied **only** to records researched in depth. Each editorial label carries a written note stating its basis on the record's page, and where a supporting analysis exists, a link to it. Records without editorial labels are not "unlabeled by oversight" — they are records where no such determination has been researched, and the absence should be read that way.

| Label | Meaning |
|---|---|
| `official-analysis` | An official analytic assessment (AARO, ICA, or agency) exists in the public file. |
| `partial-explanation` | Officials offered a partial or low-confidence conventional explanation, on the record. |
| `unresolved` | The releasing agency itself labels the case unresolved or unidentified. |
| `context-gap` | A specific missing piece — pages, radar data, analysis records — has been publicly documented. |

Editorial labels are deliberately sparse — 17 label applications across 11 of the 351 records as of this snapshot. Sparseness is the point: a claim that a case is officially unresolved should be traceable to a specific line in a specific document, and most records have not been read that closely.

Browse the labels interactively: <https://ufo-declassified.com/tools/evidence>

---

## Known limitations

Stated plainly, because a dataset that hides its edges is not usable for research.

1. **`location` is free text as released.** It is not geocoded, not normalized to a gazetteer, and its precision varies from an exact facility ("Pantex Plant") to a broad region ("Western United States") to a release-batch descriptor ("DOD UAP video release"). The site's map view assigns explicit precision tiers; the CSV does not carry them. Do not treat `location` as a coordinate.
2. **`year` is the document/event year, not the release year.** Records released in 2026 about 1952 events carry `1952`. Records that are themselves 2026 artifacts carry `2026`.
3. **56 records carry no location.** Empty string, not null.
4. **Editorial labels have incomplete coverage** by design — see above. Absence of `unresolved` does not mean a case is resolved.
5. **Titles are as released**, including inconsistent agency file-numbering conventions. They have not been rewritten for uniformity.
6. **This dataset indexes what was released, not what exists.** The PURSUE program is ongoing and the underlying holdings are far larger than what has been made public. Counts are a snapshot of public releases through 2026-09-18.
7. **No document text.** This is metadata only. Full documents live at their official source URLs, linked from each record page.

---

## Provenance and method

Records are indexed from the official PURSUE release pages at war.gov/ufo as each tranche is posted. For every record the index captures the releasing agency, the document/event year, the file package composition, the location as named in the record, and the official source URL. Derived labels are computed from that metadata at build time. Editorial labels are added only where the record has been read and the basis can be written down.

The CSV is regenerated from the live index on every deployment of <https://ufo-declassified.com>, so the canonical URL never drifts from the site.

---

## Citation

If you use this dataset, cite it. Attribution is the only thing asked in return.

```
Lin, Flynn. (2026). PURSUE UAP Documents Dataset: A structured catalog of
declassified U.S. government UAP records (2026). Zenodo.
https://doi.org/10.5281/zenodo.23854002
```

BibTeX:

```bibtex
@dataset{lin_pursue_uap_documents_2026,
  author    = {Lin, Flynn},
  title     = {PURSUE UAP Documents Dataset: A structured catalog of
               declassified U.S. government UAP records},
  year      = {2026},
  publisher = {Zenodo},
  doi       = {10.5281/zenodo.23854002},
  url       = {https://doi.org/10.5281/zenodo.23854002}
}
```

**DOIs.** `10.5281/zenodo.23854002` is the *concept* DOI — it always resolves to the
latest version and is the one to cite. `10.5281/zenodo.23854053` identifies v1.3.0
specifically; use it only when you need to pin the exact snapshot you worked from.
From v1.3.0 onward, versions are published automatically from the GitHub
[releases](https://github.com/Starmadebydata/ufo-unclassified/releases). Earlier
versions (v1.0.0, v1.1.0) live under the previous concept record
`10.5281/zenodo.21605258`, which remains valid and citable.

When citing an **individual record**, prefer its `record_url` — that page carries the official source link, the full metadata, and its own citation block.

When citing **aggregate figures** (record counts, per-release breakdowns, agency composition), cite <https://ufo-declassified.com/tools/stats>, which carries a copy-paste citation block and is regenerated with the data.

---

## License

The underlying U.S. government records are public domain works of the United States government.

This catalog — the indexing, metadata normalization, and source-status labeling — is released under **CC BY 4.0**. Use it, redistribute it, build on it commercially; just attribute it.

---

## Related

- Full archive: <https://ufo-declassified.com>
- Evidence Explorer: <https://ufo-declassified.com/tools/evidence>
- Archive Statistics: <https://ufo-declassified.com/tools/stats>
- Sighting Map: <https://ufo-declassified.com/tools/map>
- Release Comparator: <https://ufo-declassified.com/tools/compare>
- Official source: <https://war.gov/ufo>
- Also mirrored on Kaggle: <https://www.kaggle.com/datasets/feifeiai/pursue-uap-documents-dataset>

Not affiliated with any U.S. government agency.
