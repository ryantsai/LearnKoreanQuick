# Korean Learning Site Design

**Goal:** Build a playful but clear Korean learning website for first-time learners, focused on Hangul vowels, basic consonants, simple words, image examples, and clickable pronunciation breakdowns.

**Audience:** Chinese-speaking beginners who want a lively first lesson without losing structure.

**Experience:** A single-page learning app with a bright study surface, clear Hangul cards, an image-backed word gallery, a pronunciation lab, and a session progress dock. The app starts with vowels and common consonants, then uses sample words to show how syllable blocks combine sounds.

**Architecture:** React + Vite renders the learning UI. Node + Express serves the API data and static production build. The browser stores progress in `sessionStorage`, including viewed letters, selected word, selected syllable, and practice count.

**Core Features:**
- Show Korean vowel and consonant cards with romanization and Chinese memory hints.
- Show generated illustration assets for sample words such as `가방`, `나무`, `바나나`, and `우유`.
- Let learners click a whole word, a syllable block, or a jamo part to see pronunciation detail.
- Use Web Speech API with Korean locale when available, with visible fallback pronunciation data.
- Store only temporary learning progress in session storage.

**Testing:** Run install, build, and local server checks. Verify key interactions in a browser: select letters, select words, split syllables, speak whole word, speak part, and reload to confirm session progress restoration.
