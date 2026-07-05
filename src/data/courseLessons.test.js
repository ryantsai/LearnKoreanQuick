import { describe, expect, test } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { courseLessons } from "./courseLessons.js";

describe("courseLessons", () => {
  test("contains the three PDF-backed lessons with dialogues and vocabulary", () => {
    expect(courseLessons.map((lesson) => lesson.id)).toEqual([
      "l2-1",
      "l2-2",
      "l2-3",
      "l2-4",
      "l2-5",
      "l2-6",
      "b1-1",
      "b1-2",
      "b1-3",
      "b1-4"
    ]);

    for (const lesson of courseLessons) {
      expect(lesson.label).toMatch(/^(L2-|初級1-)/);
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

  // Every guide word must keep its romanization aligned with its Hangul
  // syllables so the word inspector can break it down correctly.
  const assertWord = (word) => {
    expect(word.text.length).toBeGreaterThan(0);
    expect(word.roman.length).toBeGreaterThan(0);
    expect(word.zh.length).toBeGreaterThan(0);
    expect(word.syllables).toHaveLength([...word.text].length);
  };

  const assertGuide = (guide) => {
    expect(guide).toBeDefined();
    expect(guide.label.length).toBeGreaterThan(0);
    expect(guide.title.length).toBeGreaterThan(0);
    expect(guide.hint.length).toBeGreaterThan(0);
    expect(guide.sections.length).toBeGreaterThanOrEqual(1);

    for (const section of guide.sections) {
      expect(section.words.length).toBeGreaterThanOrEqual(1);
      for (const entry of section.words) {
        assertWord(entry);
      }
    }

    expect(guide.practice.heading.length).toBeGreaterThan(0);
    expect(guide.practice.items.length).toBeGreaterThanOrEqual(1);
    for (const item of guide.practice.items) {
      expect(item.value.length).toBeGreaterThan(0);
      assertWord(item.answer);
    }
  };

  test("L3 exposes a numbers learning guide with a single grid and price practice", () => {
    const l3 = courseLessons.find((lesson) => lesson.id === "l2-3");
    assertGuide(l3.guide);
    expect(l3.guide.sections).toHaveLength(1);
    expect(l3.guide.sections[0].words).toHaveLength(18);
    expect(l3.guide.practice.items).toHaveLength(8);
  });

  test("L4 exposes a dates learning guide with weekday/month/day grids and date practice", () => {
    const l4 = courseLessons.find((lesson) => lesson.id === "l2-4");
    assertGuide(l4.guide);
    expect(l4.guide.sections).toHaveLength(3);
    expect(l4.guide.sections.map((section) => section.words.length)).toEqual([7, 12, 12]);
    expect(l4.guide.practice.items.length).toBeGreaterThanOrEqual(6);
  });
});
