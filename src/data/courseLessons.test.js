import { describe, expect, test } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { courseLessons } from "./courseLessons.js";

describe("courseLessons", () => {
  test("contains the three PDF-backed lessons with dialogues and vocabulary", () => {
    expect(courseLessons.map((lesson) => lesson.id)).toEqual(["l2-1", "l2-2", "l2-3"]);

    for (const lesson of courseLessons) {
      expect(lesson.label).toMatch(/^L2-/);
      expect(lesson.titleKo.length).toBeGreaterThan(0);
      expect(lesson.dialogues.length).toBeGreaterThanOrEqual(1);
      expect(lesson.vocabulary.length).toBeGreaterThanOrEqual(12);
      expect(lesson.media.hero).toMatch(/assets\/course-lessons\/.+\.png$/);

      for (const imagePath of [
        lesson.media.hero,
        ...lesson.dialogues.map((dialogue) => dialogue.image).filter(Boolean),
        ...lesson.dialogues.map((dialogue) => dialogue.objectImage).filter(Boolean),
      ]) {
        const publicPath = imagePath.slice(imagePath.indexOf("assets/"));
        expect(existsSync(path.join(process.cwd(), "public", publicPath))).toBe(true);
      }

      for (const dialogue of lesson.dialogues) {
        expect(dialogue.lines.length).toBeGreaterThanOrEqual(4);
        for (const line of dialogue.lines) {
          expect(line.speaker.length).toBeGreaterThan(0);
          expect(line.ko.length).toBeGreaterThan(0);
          expect(line.zh.length).toBeGreaterThan(0);
          expect(line.tokens.length).toBeGreaterThan(0);
          for (const token of line.tokens) {
            expect(token.text.length).toBeGreaterThan(0);
            expect(token.roman.length).toBeGreaterThan(0);
            expect(token.zh.length).toBeGreaterThan(0);
          }
        }
      }

      for (const word of lesson.vocabulary) {
        expect(word.text.length).toBeGreaterThan(0);
        expect(word.roman.length).toBeGreaterThan(0);
        expect(word.zh.length).toBeGreaterThan(0);
        expect(word.syllables).toHaveLength([...word.text].length);
        expect(word.image).toMatch(/assets\/course-lessons\/.+\.png$/);
        const publicPath = word.image.slice(word.image.indexOf("assets/"));
        expect(existsSync(path.join(process.cwd(), "public", publicPath))).toBe(true);
      }
    }
  });

  test("L3 exposes a numbers pronunciation guide with table and practice answers", () => {
    const l3 = courseLessons.find((lesson) => lesson.id === "l2-3");
    expect(l3.numbers).toBeDefined();
    expect(l3.numbers.label.length).toBeGreaterThan(0);
    expect(l3.numbers.title.length).toBeGreaterThan(0);
    expect(l3.numbers.table).toHaveLength(18);
    expect(l3.numbers.practice).toHaveLength(8);

    // Every number word must keep its romanization aligned with its Hangul
    // syllables so the word inspector can break it down correctly.
    const assertWord = (word) => {
      expect(word.text.length).toBeGreaterThan(0);
      expect(word.roman.length).toBeGreaterThan(0);
      expect(word.zh.length).toBeGreaterThan(0);
      expect(word.syllables).toHaveLength([...word.text].length);
    };

    for (const entry of l3.numbers.table) {
      assertWord(entry);
    }

    for (const item of l3.numbers.practice) {
      expect(item.value.length).toBeGreaterThan(0);
      assertWord(item.answer);
    }
  });
});
