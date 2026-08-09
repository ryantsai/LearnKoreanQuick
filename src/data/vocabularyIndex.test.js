import { describe, expect, test } from "vitest";
import { courseLessons } from "./courseLessons.js";
import { buildVocabularyIndex } from "./vocabularyIndex.js";

describe("buildVocabularyIndex", () => {
  const vocabulary = buildVocabularyIndex(courseLessons);

  test("collects and deduplicates vocabulary from every lesson section", () => {
    expect(vocabulary.length).toBeGreaterThan(200);
    expect(vocabulary.filter((item) => item.text === "안")).toHaveLength(1);
    expect(vocabulary.find((item) => item.text === "안").lessons.some((lesson) => lesson.id === "b1-10")).toBe(true);
    expect(vocabulary.some((item) => item.text === "대만이")).toBe(true);
  });

  test("keeps only standalone words and excludes phrases or sentences", () => {
    expect(vocabulary.every((item) => /^(?:[가-힣]+|[A-Za-z]+[가-힣]+)$/.test(item.text))).toBe(true);
    expect(vocabulary.some((item) => item.text === "밥을 먹다")).toBe(false);
    expect(vocabulary.some((item) => item.text === "공부하고 텔레비전을 봅니다.")).toBe(false);
    expect(vocabulary.some((item) => item.text === "민준①")).toBe(false);
  });

  test("provides explanations, pronunciation guidance, and usage examples", () => {
    for (const item of vocabulary) {
      expect(item.explanation.length).toBeGreaterThan(0);
      expect(item.pronunciationNote.length).toBeGreaterThan(0);
      expect(item.pronunciationCases.length).toBeGreaterThanOrEqual(3);
      expect(item.pronunciationCases[0].written.length).toBeGreaterThan(0);
      expect(item.pronunciationCases[0].pronounced.length).toBeGreaterThan(0);
      expect(item.pronunciationCases[0].drill.length).toBeGreaterThan(0);
      expect(item.examples.length).toBeGreaterThanOrEqual(1);
      expect(item.examples[0].ko.length).toBeGreaterThan(0);
      expect(item.examples[0].zh.length).toBeGreaterThan(0);
    }
  });

  test("teaches the selected word through exact boundary transformations", () => {
    const mot = vocabulary.find((item) => item.text === "못");
    expect(mot.pronunciationCases.map((item) => [item.written, item.pronounced])).toEqual(expect.arrayContaining([
      ["못", "몯"],
      ["못이", "모시"],
      ["못만", "몬만"],
      ["못하고", "모타고"]
    ]));
  });
});
