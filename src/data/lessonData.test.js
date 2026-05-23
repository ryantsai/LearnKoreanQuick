import { describe, expect, test } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { lessonData } from "./lessonData.js";
import { letterPages } from "./letterPages.js";

describe("lessonData", () => {
  test("contains the complete modern Hangul vowel and consonant sets", () => {
    expect(lessonData.vowels.map((item) => item.symbol)).toEqual([
      "ㅏ",
      "ㅐ",
      "ㅑ",
      "ㅒ",
      "ㅓ",
      "ㅔ",
      "ㅕ",
      "ㅖ",
      "ㅗ",
      "ㅘ",
      "ㅙ",
      "ㅚ",
      "ㅛ",
      "ㅜ",
      "ㅝ",
      "ㅞ",
      "ㅟ",
      "ㅠ",
      "ㅡ",
      "ㅢ",
      "ㅣ"
    ]);

    expect(lessonData.consonants.map((item) => item.symbol)).toEqual([
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ"
    ]);
  });

  test("words expose every visible syllable as hoverable jamo parts", () => {
    for (const word of lessonData.words) {
      expect(word.syllables).toHaveLength([...word.hangul].length);

      for (const syllable of word.syllables) {
        expect(syllable.parts.length).toBeGreaterThanOrEqual(2);
        for (const part of syllable.parts) {
          expect(part.jamo).toMatch(/[ㄱ-ㅎㅏ-ㅣ]/);
          expect(part.sound.length).toBeGreaterThan(0);
        }
      }
    }
  });

  test("every Hangul vowel and consonant has an independent learning page with at least five words", () => {
    const symbols = [...lessonData.vowels, ...lessonData.consonants].map((item) => item.symbol);

    expect(letterPages.map((page) => page.symbol)).toEqual(symbols);

    for (const page of letterPages) {
      expect(page.title.length).toBeGreaterThan(0);
      expect(page.memoryImage).toMatch(/\/?assets\/letter-pages\/.+\.png$/);
      expect(page.memoryTip.length).toBeGreaterThan(20);
      expect(page.words.length).toBeGreaterThanOrEqual(5);
      expect(page.words.length).toBeLessThanOrEqual(10);

      for (const word of page.words) {
        expect(word.hangul.length).toBeGreaterThan(0);
        expect(word.zh.length).toBeGreaterThan(0);
        expect(word.roman.length).toBeGreaterThan(0);
        expect(word.image).toMatch(/\/?assets\/letter-pages\/words\/word-\d{3}\.png$/);
        const publicPath = word.image.slice(word.image.indexOf("assets/"));
        expect(existsSync(path.join(process.cwd(), "public", publicPath))).toBe(true);
        expect(word.note.length).toBeGreaterThan(10);
      }

      expect(new Set(page.words.map((word) => word.image)).size).toBe(page.words.length);
    }
  });
});
