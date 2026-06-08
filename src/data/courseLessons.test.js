import { describe, expect, test } from "vitest";
import { courseLessons } from "./courseLessons.js";

describe("courseLessons", () => {
  test("contains the three PDF-backed lessons with dialogues and vocabulary", () => {
    expect(courseLessons.map((lesson) => lesson.id)).toEqual(["l2-1", "l2-2", "l2-3"]);

    for (const lesson of courseLessons) {
      expect(lesson.label).toMatch(/^L2-/);
      expect(lesson.titleKo.length).toBeGreaterThan(0);
      expect(lesson.dialogues.length).toBeGreaterThanOrEqual(1);
      expect(lesson.vocabulary.length).toBeGreaterThanOrEqual(12);

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
      }
    }
  });
});
