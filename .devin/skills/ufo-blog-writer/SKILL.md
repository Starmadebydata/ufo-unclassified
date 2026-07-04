---
name: ufo-blog-writer
description: |
  End-to-end blog article production pipeline for UFO Declassified (ufo-declassified.com).
  Covers the full workflow: picking a topic from the editorial calendar, researching search
  intent and PAA questions, analyzing PURSUE archive files, writing the draft in the site's
  established style, running AI-tone detection and fixing flagged patterns, generating a
  cover image via FAL/FLUX, building, and committing. Use this skill whenever the user asks
  to write a blog post, write an article, draft analysis, create content, or continue the
  editorial calendar for the UFO Declassified project. Also trigger on "write the next article",
  "continue the calendar", "write about [topic]", or any content production request for this
  site.
allowed-tools:
  - Read
  - Write
  - Edit
  - Exec
  - Grep
  - Glob
  - WebSearch
  - WebFetch
  - AskUserQuestion
  - TodoWrite
---

# UFO Blog Writer

This is the production pipeline for writing blog articles on **UFO Declassified** (ufo-declassified.com).
The site is an Astro static site. Blog posts live in `src/content/blog/*.md`. Cover images live in
`public/blog-assets/`. The editorial calendar is at `editorial-calendar-2026Q3.md` in the project root.

Every article goes through 6 phases. Do not skip phases. Do not batch them.

---

## Phase 1: Topic Selection and Research

### 1.1 Pick the topic

Read `editorial-calendar-2026Q3.md` in the project root. Find the next un-written article in
chronological order. If the user specifies a topic, use that instead.

Check which articles already exist:
```bash
ls src/content/blog/*.md
```

If the planned topic is already written, move to the next one in the calendar.

### 1.2 Research search intent

Run 2-3 web searches in parallel:
- The primary target search phrase from the calendar
- Related questions people ask about the topic
- Competitive landscape (who ranks for this term and what angle they take)

Look for:
- **Google AI Overview**: Does an AI summary appear at the top of the SERP? If so, note what
  follow-up questions it lists. Those questions MUST be covered as H3 subsections in the article.
- **People Also Ask (PAA)**: Collect 3-5 PAA questions. These become H3 entries under a
  "Common Questions" H2 section.
- **Competitor angles**: Note what existing top results do. Your differentiation is always
  "source-first analysis with a judgment" — not news reporting, not catalog listing, not
  sensation.

### 1.3 Identify PURSUE files

Search the document data files for relevant records:
```bash
grep -iE "keyword1|keyword2" src/data/documents.ts src/data/release-02-documents.ts src/data/release-03-documents.ts
```

For each relevant document, extract: `id`, `slug`, `title`, `summary`, `keyFindings`, `sourceUrl`.
These become inline links in the article: `[title](/documents/slug)`.

If no PURSUE file exists for the topic (e.g., WWII foo fighters), the article can still be
written using public sources, but must link to `https://www.war.gov/UFO/` as the archive reference.

### 1.4 Identify internal linking targets

Find 3-6 existing articles to link to:
```bash
grep -liE "keyword" src/content/blog/*.md
```

Internal links are critical for topical authority. Every article should link to 2-4 existing
articles and 1-3 document pages.

---

## Phase 2: Draft Writing

### 2.1 Frontmatter format

Every article starts with this exact frontmatter:

```yaml
---
title: "[Target phrase]: [Unique judgment or angle]"
description: "[1-2 sentence summary that includes the target phrase and the article's unique angle]"
date: "[YYYY-MM-DD]T09:00:00+08:00"
author: "Flynn Lin"
category: "Analysis"
tags: ["tag1", "tag2", ...]
ogImage: "/blog-assets/[slug]-cover.jpg"
featured: true
readingTime: "[N min read"
---
```

The title MUST contain the target search phrase naturally embedded, plus a judgment or angle
that differentiates from competitors. Examples of good titles:
- "Foo Fighters of WWII: The 415th Night Fighter Squadron Files"
- "The CIA Robertson Panel of 1953: How 5 Scientists Dismissed UFOs in 5 Days"

Bad titles (generic, no judgment):
- "Foo Fighters Analysis"
- "The Robertson Panel Report"

### 2.2 Article structure

```markdown
# [Title]

[Opening hook: 2-4 short paragraphs that answer "what is this and why should I care".
The target phrase appears once in the first 100 words. No throat-clearing.]

[1-2 paragraphs linking to PURSUE files and establishing the source-first approach.]

## [Section: What the record/source actually shows]
[Body content]

## [Section: Deeper analysis or context]
[Body content]

## [Section: Comparison or unique angle]
[Body content with internal links to existing articles]

## Common Questions About [Topic]
### [PAA question 1 — verbatim from Google if possible]
[Answer]
### [PAA question 2]
[Answer]
### [PAA question 3]
[Answer]
[... 3-8 PAA questions total]

## What This Means for UAP Research Today
[Closing section: 3-5 short paragraphs. The last paragraph is a punchy single sentence.]

---

*Flynn Lin is the founder and editor of UFO Declassified. You can reach him at [contact@ufo-declassified.com](mailto:contact@ufo-declassified.com) for corrections, tips, or questions about any record on this site. Read more about [the PURSUE archive](/blog/war-gov-ufo-complete-guide/) or browse [all declassified documents](/documents).*
```

### 2.3 Writing style rules (CRITICAL)

These rules define the site's voice. Violating them makes the article recognizable as AI output.

#### Paragraph rhythm
- Short paragraphs. 1-4 sentences each. Many single-sentence paragraphs.
- Mix sentence lengths within paragraphs: some very short (5-8 words), some longer (20-30 words).
- Do NOT write paragraphs longer than 5 sentences.

#### Tone
- Analytical, restrained, judgment-driven. You have an opinion and you state it plainly.
- You report what the source says, then you say what it means.
- No hedging. No "some might argue." No "it is worth considering."
- Use plain statements: "That is not a conclusion about origin. It is a conclusion about pattern."

#### Forbidden patterns (AI tells)
These are the AI-writing patterns that must be avoided. Run the check in Phase 4 to verify.

1. **NO em dashes (—)**. Use commas, colons, or parentheses instead. Zero em dashes per article.
2. **Avoid three-item lists** (the "rule of three"). If you list things, use two items, four
   items, or a different structure. Three items separated by commas with "and" before the last
   is the most common AI tell. Limit to 2-3 instances per article maximum.
3. **Avoid negation parallelism**: "not X, but Y" / "it is not about A, it is about B". Limit
   to 2-3 instances per article.
4. **No dramatic standalone "golden" sentences** as their own paragraph: "That continuity is
   the real story." One per article maximum, and only at a section boundary.
5. **No vague attribution**: "experts say", "researchers believe", "some argue". If you cite
   someone, name them and cite the source.
6. **No AI vocabulary**: "delve into", "tapestry", "vibrant", "underscore", "foster", "landscape"
   (abstract noun), "crucial", "pivotal", "sheds light on", "paves the way for".
7. **No bold text for emphasis** inside paragraphs. Bold is only for UI labels in lists.
8. **No "challenge and future outlook" sections**. End with "What This Means for UAP Research Today".

#### What TO do
- Quote primary sources directly. War diary entries, report text, panel conclusions.
- Use specific numbers: "23 cases out of 2,331", "1,000 man-hours", "12 hours of formal sessions".
- Make comparisons across time: 1944 vs 2026, Robertson Panel vs Science Advisory Council.
- Let the reader reach the conclusion. Present facts that point to a judgment, then state the
  judgment plainly.
- Use first person sparingly. The site's voice is third-person analytical, but "you" (addressing
  the reader) is fine and encouraged: "You can read it yourself. That is the point."

### 2.4 Word count targets

- Deep analysis: 2,500-3,000 words
- Short analysis: 800-1,200 words
- The calendar specifies which type each article is.

---

## Phase 3: AI-Tone Detection and Fixing

After the draft is written, run this detection script:

```bash
# Count AI-writing patterns
echo "=== em dashes ===" ; grep -c "—" src/content/blog/[SLUG].md
echo "=== three-item lists ===" ; grep -c ", and " src/content/blog/[SLUG].md
echo "=== negation parallelism ===" ; grep -ciE "not.*but" src/content/blog/[SLUG].md
echo "=== word count ===" ; wc -w src/content/blog/[SLUG].md
```

### Targets
| Pattern | Target |
|---|---|
| Em dashes (—) | **0** |
| Three-item lists (", and ") | ≤ 5 (natural English uses some) |
| Negation parallelism | ≤ 3 |
| AI vocabulary words | 0 |

### Fixing process
1. Replace every em dash with a comma, colon, or parenthesis.
2. For each three-item list, ask: can one item be removed? Can it be split into two sentences?
   Can it become a different structure?
3. For negation parallelism, rewrite as a direct positive statement.
4. Re-run the counts after fixing.

This phase is not optional. AI-generated text is easily detected by readers and by search
engines. The site's credibility depends on the writing not reading like AI output.

---

## Phase 4: Cover Image Generation

### 4.1 Find the FAL API key

```bash
grep "FAL_API_KEY" /Users/guojian/github/soraprompt/.env
```

The key format is `UUID:hexstring`.

### 4.2 Generate the image

Use FAL's FLUX Pro endpoint (synchronous, not queue):

```python
import requests, json

FAL_KEY = '[key from step 4.1]'
prompt = '[detailed visual prompt - see 4.3 below]'

resp = requests.post(
    'https://fal.run/fal-ai/flux-pro',
    headers={'Authorization': f'Key {FAL_KEY}', 'Content-Type': 'application/json'},
    json={'prompt': prompt, 'image_size': {'width': 1024, 'height': 576}, 'num_images': 1},
    timeout=120,
)
data = resp.json()
if 'images' in data:
    image_url = data['images'][0]['url']
    img_resp = requests.get(image_url, timeout=60)
    with open('public/blog-assets/[SLUG]-cover.jpg', 'wb') as f:
        f.write(img_resp.content)
    print(f'Image saved! Size: {len(img_resp.content)} bytes')
```

### 4.3 Prompt guidelines

The site's visual identity is: **dark, cinematic, declassified-military-archive aesthetic**.
Cover image prompts should include:
- Subject matter from the article (aircraft, meeting room, document, sensor view, etc.)
- "dark, moody, cinematic lighting"
- "deep blacks, muted teal tones, warm [orange/amber] highlights"
- "historical drama film aesthetic" or "declassified government archive aesthetic"
- "dramatic shadows, mysterious mood"
- "No text, no watermark" (always end with this)
- Image size: 1024×576 (16:9 widescreen)

Avoid words that trigger safety filters: "military" combined with "weapon" or "attack" can
cause 403 errors on some providers. Use neutral alternatives: "defense", "government",
"historical" when possible.

### 4.4 FAL endpoint notes

- Use `https://fal.run/fal-ai/flux-pro` (synchronous). Do NOT use the queue endpoint
  (`https://queue.fal.run/...`) — the response URL paths are inconsistent and hard to poll.
- If FLUX Pro fails, try `https://fal.run/fal-ai/flux/schnell` (faster, lower quality).
- OpenRouter image generation (gemini-3-pro-image, flux.2-pro) has been unreliable due to
  provider ToS blocks. FAL is the primary image generation path.

---

## Phase 5: Build and Verify

```bash
cd /Users/guojian/github/ufo-declassified
export PATH="/opt/homebrew/bin:$PATH"
npm run build
```

Check the output for:
- The new article's HTML was generated: `/blog/[slug]/index.html`
- No errors or warnings
- The blog index page was regenerated: `/blog/index.html`

Also verify:
```bash
# Final AI-tone check
grep -c "—" src/content/blog/[SLUG].md  # should be 0
wc -w src/content/blog/[SLUG].md        # should be in target range
```

---

## Phase 6: Commit and Push

### 6.1 Stage only the relevant files

```bash
git add src/content/blog/[SLUG].md public/blog-assets/[SLUG]-cover.jpg
```

Do NOT stage:
- `editorial-calendar-2026Q3.md` (unless it is a new calendar file)
- `output/`, `skills/`, `*.mp3`, or other stray files
- `.env.local` or any environment files

### 6.2 Commit message format

```
Add [short article description] article with cover image

[2-4 line summary of what the article covers, its unique angle, and which
PURSUE files or existing articles it links to.]

Generated with [Devin](https://devin.ai)

Co-Authored-By: Devin <158243242+devin-ai-integration[bot]@users.noreply.github.com>
```

### 6.3 Push

```bash
git push origin main
```

### 6.4 Post-publish checklist (tell the user)

After pushing, remind the user to:
1. Submit the new URL in Google Search Console (URL Inspection → Request Indexing)
2. Check the cover image looks good on the live page
3. Google the target phrase to see if the article starts getting impressions
4. Check Search Console after 1-2 weeks for actual query data

---

## Backward Linking

When a new article is published, check if any existing articles should link TO it.
For example, after publishing the Robertson Panel article, the foo fighters article
should link to it (because the foo fighters article mentions the Robertson Panel).

```bash
grep -liE "keyword from new article" src/content/blog/*.md
```

If an existing article mentions the new article's topic but does not link to it,
add the link. This builds the internal linking network incrementally.

---

## Quick Reference: Article Checklist

Before considering an article done, verify ALL of these:

- [ ] Target search phrase appears in H1, first 100 words, and 1-2 H2 headings
- [ ] 3-8 PAA questions answered as H3 subsections
- [ ] 2-4 internal links to existing blog articles
- [ ] 1-3 links to PURSUE document pages (if relevant files exist)
- [ ] 0 em dashes in the entire article
- [ ] ≤ 5 three-item lists (", and " pattern)
- [ ] ≤ 3 negation parallelism instances
- [ ] 0 AI vocabulary words (delve, tapestry, vibrant, underscore, foster, etc.)
- [ ] Word count in target range (2500-3000 for deep, 800-1200 for short)
- [ ] Cover image generated and saved to `public/blog-assets/[slug]-cover.jpg`
- [ ] Frontmatter `ogImage` path matches the actual image filename
- [ ] Build passes with no errors
- [ ] Author is "Flynn Lin"
- [ ] Closing bio paragraph is present with contact email
- [ ] Committed and pushed to GitHub
