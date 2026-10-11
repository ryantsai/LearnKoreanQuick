---
name: create-lesson-from-pdf
description: Create a new Korean lesson in this app from a lesson handout PDF (docs/lessons/new/MMDD.pdf, or an older docs/lessons/L2-<n>PDF Viewer.pdf). Use when the user asks to add, build, or generate a lesson from a lesson PDF. Covers the batch data module, the test updates, the audio pipeline (Chinese generated locally, Korean through the paid batch), and verification.
---

# Create a lesson from a PDF

Turns a lesson handout into a lesson in the Learn Korean Quick app. Follow the newest batch pattern: `src/data/octoberLessons.js` (b1-22) and `src/data/midOctoberLessons.js` (b1-23, b1-24). Older L2 lessons used image crops; see Legacy at the end.

## Before you start

1. Find the PDF. Dated batches live in `docs/lessons/new/MMDD.pdf`. The whole `docs/lessons/` folder is git-ignored, so PDFs are never committed. Check that any `sourcePdf` path you write actually exists.
2. Check dependencies. If `node_modules` is missing, run `npm ci` (not `npm install`, which can rewrite the lockfile). Audio generation needs `.venv-tts` and `.models/qwen3-tts-1.7b` on a CUDA GPU.
3. Read the handout. Many are image-only (PyMuPDF `get_text()` returns nothing). Render each page at 2x zoom into a scratchpad folder and read the PNGs with the Read tool. The Read tool's own PDF rendering needs `pdftoppm`, which may not be installed.
4. Commit only when the user asks. If committing, branch first, never commit directly on `main`, and end the message with the session's attribution trailer.

## Data

- One module per batch: `src/data/<batch>Lessons.js` exports `<batch>Lessons = [...]`. Start the file with a source header: "Source-grounded text from ... The original PDFs and source images stay outside this public repository." In `src/data/courseLessons.js`, add the import and append `...<batch>Lessons` to the merged array.
- Lesson object (b1-22 / b1-23 / b1-24 shape):
  - `id: "b1-<n>"`, `label: "初級1-<n>"`. The label holds until course metadata exists (see below).
  - `titleKo` / `titleZh`: the sentence on the handout's title slide.
  - `theme` (short 中文), `heroEmoji`. New batches use no PDF images, so `heroEmoji` is required whenever there is no `media.hero`.
  - `sourcePdf: "docs/lessons/new/MMDD.pdf"`.
  - `dialogues`: 本課對話 (4 lines); 講義例句 (the handout's printed example sentences, at least 4); 換你說說看 (A/B practice; blanks are `"__________"`).
  - `vocabulary`: every word from the 單字 boxes, at least 12.
  - `guide`: `label`, `title`, `hint`, `sections` (one per handout page group, each with `words`), `practice` (`items` hold only the handout's completed example; `prompts` list everything else, with no unprinted answers), `sourceNotes`, and `references` (the handout's translation appendix).
- Helpers: `word(text, roman, zh, partOfSpeech)` builds an entry. `line(speaker, ko, zh)` builds `tokens` from a lexicon of every Hangul run in the line and throws `Review missing token: …` for any gap, so add each token to the lexicon.
- Romanization: one hyphen-separated segment per character, and a space counts as a character. Give a space its own space-only segment: 손을 씻다 is `son-eul- -ssit-da` (5 characters, 5 segments). Use pronounced forms for liaison and assimilation.
- `decomposeHangulWord` falls back silently when segments are missing, so the explicit assertion in the test is the real check. Do not rely on the generic syllable-length check.
- Translations the handout does not print are allowed, but say so in `sourceNotes` so the user can tell them apart.

## Course metadata

`src/data/courseMetadata.js` is verified-only and takes only `name`, `sessionNumber`, `sessionCount`, and `date`. Take them from the user's confirmed source, such as the school's course list, and keep teacher names, booking status, and class times out of the repo. Until the user confirms the values, leave the lesson unmatched (label `初級1-<n>`) and add its id to the unmatched list in the metadata test. Metadata does not feed the audio catalog, so adding it needs no catalog rebuild.

## Tests

- `src/data/courseLessons.test.js`: add the new ids to the id-list assertion at the top.
- Add per-lesson assertions like the b1-22 block: dialogue line counts, guide section sizes, label, `heroEmoji`, no images, and per-word romanization segment counts.
- Update the unmatched-metadata expectation if new lessons are unmatched.
- Run `npm test`. The old `--exclude "**/.claude/**"` workaround is no longer needed.

## Audio

Every new Korean and Chinese playback key needs an MP3. The app plays only published files, and `audio:verify` checks coverage.

1. After data changes, run `npm run audio:catalog`.
2. Chinese (local GPU, no spend):
   - `npm run audio:chinese:plan` writes `tmp/chinese-missing-keys.json`.
   - Stage the catalog first: `mkdir -p tmp/chinese-serena && cp public/audio/catalog.json tmp/chinese-serena/`. The generator reads its catalog from the output directory.
   - `npm run audio:generate -- --language zh-TW --keys-file tmp/chinese-missing-keys.json --output-dir tmp/chinese-serena`. The script redirects its console output to `tmp/audio-generation.log` and `tmp/audio-generation.err.log`. If it exits 1 with no console output, read the error log.
   - `npm run audio:chinese:import -- --results-dir tmp/chinese-serena` checks the clips. Add `--apply` after review.
3. Korean (paid Google Chirp 3 HD batch; the batch runner is outside this repository):
   - `npm run audio:google:plan` writes `tmp/google-audio-plan.json`. It makes no network call.
   - For new lessons, run `npm run audio:google:delta` to write `tmp/google-audio-delta-plan.json`, which holds only requests no published clip uses. Synthesize those requests only. Import with `--delta` (see the Korean import line below).
   - Count the requests whose file is missing from `public/audio/chirp3-hd/`, plus their characters. That is the spend basis for the user to approve. Do not run the paid batch without explicit approval.
   - `buildChirpManifest(plan, project, sourceRef)` in `scripts/lib/chirp-manifest.mjs` builds the runner's input: schema version 1, the $2.00 cap, the Kore and Charon voices, and one item per request. It requires the approved Google project ID, which only the user provides. The runner itself is not in this repository.
   - Import the batch's verified results with `npm run audio:google:import -- --plan <plan> --batch <batch> --results-dir <dir>`, then add `--apply`. Import Korean only after Chinese coverage is complete.
4. Finish with `npm run audio:verify`. It checks each dialogue line once per occurrence, so a line repeated across lessons is reported twice. Count unique keys before quoting a backlog.

## Verify and report

- `npm test` and `npm run build` must pass.
- `audio:verify` fails until the Korean batch is imported. Report that as an open item, not a passed check.
- In the final message, name each choice: the pattern used, metadata left pending, translations added, and audio still open.

## Legacy: L2 image template

`docs/lessons/L2-<n>PDF Viewer.pdf` lessons (l2-1 to l2-6) and older b1 lessons use cropped PNGs in `public/assets/course-lessons/`, named `<id>-dialogue-person`, `<id>-vocab-NN`, and so on. `crop_assets.py` has page indices hard-coded for that landscape template. It needs recalibration for any new layout. New batches should add no images unless the user asks.

## Checklist

- [ ] Handout read; every Korean line, 中文 gloss, and vocabulary word captured
- [ ] Batch module created with a source header and spread into `courseLessons.js`
- [ ] Every lesson has at least 12 vocabulary words, each dialogue at least 4 lines, and no image references unless requested
- [ ] Per-word romanization segment counts match the character counts, including spaces
- [ ] Test id list and per-lesson assertions updated; `npm test` passes
- [ ] Metadata either added with verified data or left pending and reported
- [ ] `npm run build` passes
- [ ] Chinese clips generated and imported; Korean batch approval requested; `audio:verify` status reported
