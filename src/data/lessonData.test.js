import { describe, expect, test } from "vitest";
import { lessonData } from "./lessonData.js";

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
});
