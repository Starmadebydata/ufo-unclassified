# Zenodo 上传填表清单

> **v1 已于 2026-07-26 发布。**
>
> - **Concept DOI（对外引用一律用这个）**：`10.5281/zenodo.21605258` — <https://doi.org/10.5281/zenodo.21605258>
> - 版本 DOI（v1）：`10.5281/zenodo.21605259`
> - 记录页：<https://zenodo.org/records/21605259>
>
> 下面的清单保留给**后续版本**使用（Release 05 之后走"发布后续版本"一节）。

手动上传用。逐项复制粘贴到 <https://zenodo.org/uploads/new> 的表单里。

（`.zenodo.json` 是同一份元数据的机器可读版本，用途不同：将来把 GitHub 仓库接上 Zenodo 自动集成后，打 release tag 时 Zenodo 会自己读它。手动上传不需要打开那个文件。）

---

## 1. Files（上传文件）

拖入这两个：

- `uap-documents.csv`
- `README.md`

> 不要传 `.zenodo.json` / `CITATION.cff` / `refresh.sh` / `LICENSE`——它们是仓库工作文件，不是数据集内容。License 在表单里选，不用当附件传。

## 2. Basic information

**Resource type**

```
Dataset
```

**Title**

```
PURSUE UAP Documents Dataset: A structured catalog of declassified U.S. government UAP records (2026)
```

**Creators**

| 字段 | 值 |
|---|---|
| Family name | `Lin` |
| Given names | `Flynn` |
| Affiliation | `UFO Declassified` |
| ORCID | 有就填，没有留空 |

**Publication date**

```
2026-07-26
```

**Description**（Zenodo 描述框支持富文本，直接粘贴下面的正文，分段保留）

> A structured catalog of every U.S. government UAP record released under the PURSUE initiative (Presidential Unsealing and Reporting System for UAP Encounters), covering all public tranches from May 8, 2026 onward: **207 records, 1948–2026, 9 source agencies, 4 releases**.
>
> This is a finding aid, not a document dump. Each row identifies one released record and states its releasing agency, the document/event year, the release tranche, the file-package composition, the location as named in the record, the official source URL, and — the part that does not exist in any other public index of these files — a set of **source-status labels** describing what kind of evidence the record is.
>
> Source-status labels are applied in two layers. Layer 1 is derived mechanically from record metadata and covers all 207 records: *official-source* (207), *public-rendition* (85), *historical-archival* (66), *witness-testimony* (54). Layer 2 is editorial and applied only where a record has been researched in depth and the basis can be stated in writing: *official-analysis*, *partial-explanation*, *unresolved*, *context-gap* — 17 label applications across 11 records. Labels are verifiable statements about a record's sourcing; they are not quality ratings and not judgments about what the underlying events were.
>
> Composition by release: Release 01 (2026-05-08, 31 records), Release 02 (2026-05-22, 64), Release 03 (2026-06-12, 72), Release 04 (2026-07-10, 40). By agency: Department of War (109), FBI (34), NASA (29), CIA (21), Department of Energy (5), Department of State (2), ODNI (1), ICA (1), other (5). By file type: video (85), PDF (74), image (42), audio (7).
>
> Fields: `slug`, `title`, `agency`, `year`, `release`, `location`, `file_types`, `evidence_labels`, `record_url`. Known limitations — including that `location` is free text as released rather than geocoded, that `year` is the document/event year rather than the release year, and that editorial-label coverage is intentionally incomplete — are documented in full in the accompanying README.
>
> The canonical, always-current version is regenerated on every build of the source archive at https://ufo-declassified.com/dataset/uap-documents.csv. The underlying documents are public-domain works of the U.S. government, hosted at war.gov/ufo. This dataset is the independent index built on top of them, and is not affiliated with any U.S. government agency.

## 3. License

**Access right**

```
Open Access
```

**License**

```
Creative Commons Attribution 4.0 International (CC BY 4.0)
```

## 4. Keywords

一行一个：

```
UAP
UFO
PURSUE
declassified documents
government transparency
FOIA
Department of War
AARO
open government data
archival metadata
unidentified anomalous phenomena
```

**Language**

```
English (eng)
```

## 5. Related works（重要——这是把 DOI 和站点绑定的地方）

Zenodo 表单里逐条添加 identifier + relation：

| Identifier | Relation | Resource type |
|---|---|---|
| `https://ufo-declassified.com/dataset/uap-documents.csv` | is identical to | Dataset |
| `https://ufo-declassified.com/tools/evidence` | is documented by | Other |
| `https://ufo-declassified.com/tools/stats` | is documented by | Other |
| `https://ufo-declassified.com/` | is supplement to | Other |
| `https://war.gov/ufo` | is derived from | Other |

> 这五条不要省。它们是 Zenodo 记录页上指回本站的实际链接，也是这次上传的外链价值所在。

## 6. Version

```
1.0.0
```

## 7. Additional notes

```
The underlying U.S. government records are public-domain works of the United States government. The catalog itself — the indexing, metadata normalization, and source-status labeling — is released under CC BY 4.0. Not affiliated with any U.S. government agency.
```

---

## 发布后立刻要做的

1. **记下 DOI**（形如 `10.5281/zenodo.XXXXXXX`）。
2. 回填到三个地方：`dataset/README.md` 的 Citation 段、`dataset/CITATION.cff` 的 `doi:` 字段、`dataset/.zenodo.json`。
3. 站内 `/tools/stats` 与文档页的 citation 块加上 DOI，让"引用本页"具备学术格式。
4. 到 <https://datasetsearch.research.google.com> 检查是否已被收录（通常几天内）。

> Zenodo 的 DOI 分两个：一个是**版本 DOI**（指向 1.0.0 这一版），一个是**concept DOI**（永远指向最新版）。对外引用一律用 **concept DOI**。

## 后续版本

Release 05 落地、数据更新后：

```bash
./dataset/refresh.sh
```

它会拉新快照并打印构成差异。数字变了就更新 `README.md` 和 `.zenodo.json`，把 `CITATION.cff` 与 `.zenodo.json` 的版本号 bump 到 1.1.0，再到 Zenodo 记录页点 "New version" 上传——**concept DOI 不变**，已经引用过你的人不会断链。
