# Korean Learning Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a React/Node Korean learning website with generated word images, Hangul pronunciation breakdowns, and sessionStorage progress.

**Architecture:** Use a Vite React client for all interactive learning UI and an Express server for lesson data plus production static hosting. Keep Hangul decomposition and session state in focused client modules so the app is easy to extend.

**Tech Stack:** React, Vite, Node.js, Express, lucide-react, Web Speech API, CSS modules through plain CSS.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `server/index.js`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles.css`
- Create: `public/assets/`

- [ ] Create the Vite React + Express project files.
- [ ] Install dependencies with `npm install`.
- [ ] Verify `npm run build` succeeds.

### Task 2: Lesson Data and Hangul Helpers

**Files:**
- Create: `src/data/lessonData.js`
- Create: `src/utils/hangul.js`
- Create: `src/utils/speech.js`
- Create: `server/lessonData.js`

- [ ] Define vowels, consonants, words, syllable decompositions, romanization, and Chinese hints.
- [ ] Implement Hangul lookup helpers for whole words, syllables, and parts.
- [ ] Implement Korean speech helper with graceful fallback.

### Task 3: Generated Assets

**Files:**
- Create: `public/assets/word-gabang.png`
- Create: `public/assets/word-namu.png`
- Create: `public/assets/word-banana.png`
- Create: `public/assets/word-uyu.png`

- [ ] Generate four cheerful educational word images with Image Gen.
- [ ] Copy final image files into `public/assets`.
- [ ] Reference the assets from lesson data.

### Task 4: Interactive UI

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/styles.css`

- [ ] Build app shell, alphabet rail, word gallery, pronunciation lab, and progress dock.
- [ ] Persist viewed items and current selection in `sessionStorage`.
- [ ] Make words, syllables, and jamo parts clickable.
- [ ] Add responsive styling and subtle motion.

### Task 5: Verification

**Files:**
- Modify only if issues are found during QA.

- [ ] Run `npm run build`.
- [ ] Start the server with `npm run dev`.
- [ ] Open the local app in the browser.
- [ ] Verify desktop and mobile layout, core clicks, speech buttons, and session restoration.
