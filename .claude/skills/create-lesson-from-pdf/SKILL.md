---
name: create-lesson-from-pdf
description: Create a new L2-x Korean lesson in this app from a "L2-xPDF Viewer.pdf" file under docs/lessons/. Use whenever the user asks to add, build, or generate a lesson from a lesson PDF. Covers extracting dialogues/vocabulary, cropping image assets from the PDF, wiring the lesson into courseLessons.js, updating the test, and verifying.
---

# Create a lesson from a PDF

This skill turns a `docs/lessons/L2-<n>PDF Viewer.pdf` into a fully wired lesson in the
"Learn Korean Quick" app, matching the structure of the existing L2-1 … L2-6 lessons.

## When to use

The user says something like "create L2-7 from the PDF", "add the next lesson", or
"do L2-8 (L2-8PDF Viewer.pdf)". Each lesson PDF follows the same Gjun/ABC Online template:
a title slide, 學習目標, 情境對話, 相關單字學習 (vocab photos), 單字練習, optional 句型教學 /
learning tabs, 對話練習, 重點回顧, and a closing 再見 slide.

## Before you start

1. Confirm the PDF exists: `docs/lessons/L2-<n>PDF Viewer.pdf`.
2. Ask the user (only if unstated) whether to work on a feature branch or commit directly
   to `main`. Default to a feature branch + PR unless told otherwise.
3. Read the PDF with the Read tool to extract every Korean line, its 中文 meaning, and the
   vocabulary list. The 情境對話 (page ~3) and 對話練習 (later page) become the two dialogues.

## Key files

- `src/data/courseLessons.js` — all lesson data. Structure: imports → helpers
  (`word`, `withVocabImages`, `line`, `courseAsset`) → word arrays `l21`, `l22`, … →
  `export const courseLessons = [ … ]`.
- `src/data/courseLessons.test.js` — validates lesson shape AND that every referenced
  PNG exists on disk. **You must update the id list** near the top:
  `expect(courseLessons.map((l) => l.id)).toEqual([... , "l2-<n>"])`.
- `public/assets/course-lessons/` — where lesson PNGs live. Naming is strict (see below).
- `src/utils/hangul.js` — `decomposeHangulWord(hangul, roman)` powers the word inspector.

## Helpers and data shape

```js
word(text, roman, zh)              // builds { text, roman, zh, syllables }
withVocabImages("l2-<n>", [words]) // attaches vocab-01..NN images by index
line(speaker, ko, zh, tokens)      // one dialogue line; tokens is an array of word objects
courseAsset("l2-<n>-…")            // -> assetPath("assets/course-lessons/<name>.png")
```

Lesson object (copy the most recent simple lesson, e.g. l2-5 / l2-6, as a template):

```js
{
  id: "l2-<n>",
  label: "L2-<n>",
  titleKo: "<Korean title from slide 1>",
  titleZh: "<中文 title>",
  theme: "<short 中文 theme>",
  sourcePdf: "docs/lessons/L2-<n>PDF Viewer.pdf",
  media: { hero: courseAsset("l2-<n>-dialogue-person") },
  dialogues: [
    { title: "情境對話", image: courseAsset("l2-<n>-dialogue-person"),
      objectImage: courseAsset("l2-<n>-dialogue-object"), lines: [ /* >=4 lines */ ] },
    { title: "對話練習", image: courseAsset("l2-<n>-practice-person"),
      objectImage: courseAsset("l2-<n>-practice-visual"), lines: [ /* >=4 lines */ ] }
  ],
  vocabulary: withVocabImages("l2-<n>", [ /* >=12 word() entries */ ])
}
```

Define a `const l2<n> = [ word(...), ... ]` array for the dialogue vocabulary and reference
entries by index in `line(...)` tokens (reuse repeated words by index). One-off words that
only appear once can be inlined with `word("아", "a", "啊")` directly in the tokens array.

Some older lessons (l2-3, l2-4) also have a `guide` field (numbers/dates learning tab) with
its own test assertions. Only add a `guide` if the PDF has an equivalent reference grid;
otherwise follow the simpler dialogues+vocabulary shape above.

## Romanization rule (critical — the test enforces it)

`decomposeHangulWord` splits `roman` on `-` and asserts
`syllables.length === [...text].length`. So **the roman string must have exactly one
hyphen-separated segment per Hangul character, including spaces**:

- `크게` → `"keu-ge"` (2)   `착각했어요` → `"chak-ga-kae-sseo-yo"` (5)
- For words with a space, the space counts as a character: `버스 정류장` → 6 syllables, so
  `"beo-seu jeong-nyu-jang"` (the space sits inside the middle segment, total segments = 6).
- Use the *pronounced* romanization (liaison/assimilation): `웃는게` → `"un-neun-ge"`,
  `발음이` → `"ba-reum-i"`, `많이` → `"ma-ni"`.

Count `[...text].length` for every word and make the hyphen segments match, or the test fails.

## Image assets

Required PNGs in `public/assets/course-lessons/` (the test fails if any are missing):

- `l2-<n>-dialogue-person`  — also used as `media.hero`
- `l2-<n>-dialogue-object`  — supporting image from the 情境對話 slide
- `l2-<n>-practice-person`  — person from the 對話練習 slide
- `l2-<n>-practice-visual`  — supporting image from the 對話練習 / 句型教學 slide
- `l2-<n>-vocab-01` … `l2-<n>-vocab-12` (one per vocabulary word, ≥12)

Generate them by rasterizing PDF pages with PyMuPDF + PIL and cropping fractional boxes.
Use the bundled helper script as a starting point:

```bash
python .claude/skills/create-lesson-from-pdf/crop_assets.py "docs/lessons/L2-<n>PDF Viewer.pdf" l2-<n>
```

Then **visually verify** each crop with the Read tool and adjust the fractional boxes in the
script until subjects are well framed. The 相關單字學習 vocab slides lay photos out in left/
center/right thirds (≈ x 0.07–0.34 / 0.37–0.63 / 0.66–0.93, y ≈ 0.27–0.61). Render to a temp
dir first (e.g. `tmp_l2n/`) to calibrate, then delete it before committing.

## Verify, then commit

1. `npx vitest run --exclude "**/.claude/**"` — the `--exclude` skips stale local worktrees
   under `.claude/`; all tests must pass (the id-list assertion catches a forgotten test edit).
2. `npm run build` — must succeed.
3. Optionally verify in the browser (Playwright/preview) that the new lesson renders.
4. Clean up any temp render dirs. Stage assets + the two source files.
5. Commit. End the message with:
   `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
6. Push (and open a PR if working on a feature branch). Only commit/push when the user asked.

## Checklist

- [ ] PDF read; all Korean lines + 中文 + vocab extracted
- [ ] 16 PNGs cropped, visually checked, correctly named
- [ ] `const l2<n>` array + lesson object added after the previous lesson
- [ ] `vocabulary` has ≥12 words; each dialogue has ≥4 lines
- [ ] every roman string's hyphen-segment count == its Hangul char count
- [ ] test id list updated to include `"l2-<n>"`
- [ ] `npx vitest run --exclude "**/.claude/**"` and `npm run build` both pass
- [ ] temp artifacts removed; committed with co-author trailer; pushed
