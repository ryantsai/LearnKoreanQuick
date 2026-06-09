# L3 Numbers Pronunciation Tab — Design

## Goal

For course lesson **L3 (`l2-3`, 이거 얼마예요?)**, extract the "learning numbers"
content from `docs/lessons/L2-3PDF Viewer.pdf` and present it as pronunciation
guides in a **3rd tab** within the lesson reader.

Source pages:

- **Page 7 — 學習說出數字**: a Sino-Korean number table (numerals → Hangul).
- **Page 8 — 練習說出價錢**: practice questions asking the student to convert
  prices (300, 659, 1,500, …) into Korean.

Per the request, practice questions show **only the answer** — the Korean
spelled out plus how it is pronounced (romanization + audio). They are not
interactive fill-in exercises.

## Data model

Add a `numbers` field to the `l2-3` lesson object in
`src/data/courseLessons.js`. The field is optional; only L3 defines it, but any
lesson may opt in.

```js
numbers: {
  label: "數字",          // nav-item label
  title: "學習說出數字",   // section heading
  table: [ word(hangul, roman, numeral), ... ],   // page 7
  practice: [ { value: "300", answer: word(hangul, roman, "300 원") }, ... ] // page 8
}
```

`word(text, roman, zh)` is the existing helper; it precomputes syllable
breakdowns via `decomposeHangulWord(text, roman)`.

### `table` (page 7)

| 數字 | 韓文 | roman |
|---|---|---|
| 1 | 일 | il |
| 2 | 이 | i |
| 3 | 삼 | sam |
| 4 | 사 | sa |
| 5 | 오 | o |
| 6 | 육 | yuk |
| 7 | 칠 | chil |
| 8 | 팔 | pal |
| 9 | 구 | gu |
| 10 | 십 | sip |
| 100 | 백 | baek |
| 200 | 이백 | i-baek |
| 1,000 | 천 | cheon |
| 3,000 | 삼천 | sam-cheon |
| 10,000 | 만 | man |
| 40,000 | 사만 | sa-man |
| 100,000 | 십만 | sip-man |
| 600,000 | 육십만 | yuk-sip-man |

### `practice` (page 8) — answers spelled out

| 價錢 | 韓文 (拼出) | roman (發音) |
|---|---|---|
| 300 | 삼백 | sam-baek |
| 659 | 육백오십구 | yuk-baek-o-sip-gu |
| 1,500 | 천오백 | cheon-o-baek |
| 4,300 | 사천삼백 | sa-cheon-sam-baek |
| 6,208 | 육천이백팔 | yuk-cheon-i-baek-pal |
| 19,154 | 만구천백오십사 | man-gu-cheon-baek-o-sip-sa |
| 83,400 | 팔만삼천사백 | pal-man-sam-cheon-sa-baek |
| 500,689 | 오십만육백팔십구 | o-sip-man-yuk-baek-pal-sip-gu |

**Romanization constraint:** `decomposeHangulWord` splits the roman string on
`-` and maps each part to one Hangul syllable by index. Every multi-syllable
entry's romanization must therefore have exactly as many hyphen-delimited parts
as Hangul characters (verified for all entries above, e.g. 육십만 → `yuk-sip-man`,
오십만육백팔십구 → `o-sip-man-yuk-baek-pal-sip-gu`).

## UI changes — `CourseLessonReader` (`src/App.jsx`)

- **View state:** introduce `view` state with values `"dialogue"` (default) and
  `"numbers"`, alongside the existing `dialogueIndex`.
- **Nav:** under the existing "對話" nav, render a 3rd nav item — labeled with
  `lesson.numbers.label` — only when `lesson.numbers` exists. Dialogue items set
  `view="dialogue"` + `dialogueIndex`; the numbers item sets `view="numbers"`.
  Active styling reflects the current view.
- **Study area:**
  - `view==="dialogue"` → existing dialogue card + 單字 + 價格練習 (unchanged).
  - `view==="numbers"` → a new **NumbersGuide** section instead: the number
    table rendered as a clickable grid, then the practice list showing each
    `value` → its Korean `answer` + romanization.
- **Interaction:** each number/answer is a button wired to the existing
  `handleWordClick`, reusing the current audio playback and `WordInspectorPopup`
  (syllable breakdown + 發音 button). No new playback machinery.
- **Reset:** extend the effect that runs on `dialogueIndex` change to also run on
  `view` change — call `stopPlayback()` and clear `selectedWord`.

## Styling — `src/styles.css`

Reuse existing classes (`course-vocab-card`, `course-vocab-grid`,
`course-note-list`, `story-word`, `course-vocab-item`). Add a small amount of CSS
only if the number-table grid needs a distinct layout (e.g. a compact
numeral-over-Hangul cell). No new dependencies.

## Out of scope

- No fill-in / answer-checking interactivity (answers are shown directly).
- No changes to L1, L2-1, or L2-2.
- No auto-play loop for the numbers tab (per-item click playback only).

## Testing

- Existing tests in `src/data/courseLessons.test.js` should continue to pass; add
  coverage asserting `l2-3.numbers` exists with the expected table/practice
  lengths and that each entry's romanization part count matches its Hangul
  length (the inspector's alignment invariant).
