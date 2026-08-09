import { describe, expect, test } from "vitest";
import { courseLessons } from "./courseLessons.js";
import { buildVocabularyIndex } from "./vocabularyIndex.js";

describe("buildVocabularyIndex", () => {
  const vocabulary = buildVocabularyIndex(courseLessons);

  test("collects and deduplicates vocabulary from every lesson section", () => {
    expect(vocabulary.length).toBeGreaterThan(250);
    expect(vocabulary.filter((item) => item.text === "안")).toHaveLength(1);
    expect(vocabulary.find((item) => item.text === "안").lessons.some((lesson) => lesson.id === "b1-10")).toBe(true);
    expect(vocabulary.some((item) => item.text === "대만이")).toBe(true);
  });

  test("provides explanations, pronunciation guidance, and usage examples", () => {
    for (const item of vocabulary) {
      expect(item.explanation.length).toBeGreaterThan(0);
      expect(item.pronunciationNote.length).toBeGreaterThan(0);
      expect(item.examples.length).toBeGreaterThanOrEqual(1);
      expect(item.examples[0].ko.length).toBeGreaterThan(0);
      expect(item.examples[0].zh.length).toBeGreaterThan(0);
    }
  });
});
