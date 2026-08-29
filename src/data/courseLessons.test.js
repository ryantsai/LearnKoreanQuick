import { describe, expect, test } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { courseLessons } from "./courseLessons.js";

describe("courseLessons", () => {
  test("contains every PDF-backed lesson with dialogues and vocabulary", () => {
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
      "b1-4",
      "b1-5",
      "b1-6",
      "b1-7",
      "b1-8",
      "b1-9",
      "b1-10",
      "b1-11",
      "b1-12",
      "b1-13",
      "b1-14"
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

  test("b1-8 preserves the -고 guide, source references, and open prompts", () => {
    const b18 = courseLessons.find((lesson) => lesson.id === "b1-8");
    expect(b18.dialogues).toHaveLength(4);
    expect(b18.dialogues.map((dialogue) => dialogue.lines.length)).toEqual([4, 4, 4, 4]);
    expect(b18.vocabulary).toHaveLength(18);
    assertGuide(b18.guide);
    expect(b18.guide.practice.prompts).toHaveLength(9);
    expect(b18.guide.sourceNotes).toHaveLength(1);
    expect(b18.guide.references).toHaveLength(1);
    expect(b18.guide.references[0].entries).toHaveLength(4);

    const words = [
      ...b18.dialogues.flatMap((dialogue) => dialogue.lines.flatMap((lineItem) => lineItem.tokens)),
      ...b18.vocabulary,
      ...b18.guide.sections.flatMap((section) => section.words),
      ...b18.guide.practice.items.map((item) => item.answer)
    ];
    for (const item of words) {
      expect(item.roman.split("-").filter(Boolean)).toHaveLength([...item.text].length);
    }
  });

  test("b1-7 preserves the 장소 dialogue, fixed examples, open prompts, and PDF appendices", () => {
    const b17 = courseLessons.find((lesson) => lesson.id === "b1-7");
    expect(b17.sourcePdf).toBe("docs/lessons/new/0804.pdf");
    expect(b17.dialogues).toHaveLength(1);
    expect(b17.dialogues[0].lines).toHaveLength(5);
    expect(b17.vocabulary).toHaveLength(12);
    assertGuide(b17.guide);
    expect(b17.guide.practice.items).toHaveLength(9);
    expect(b17.guide.practice.prompts).toHaveLength(6);
    expect(b17.guide.sourceNotes).toHaveLength(6);
    expect(b17.guide.references).toHaveLength(2);
    expect(b17.guide.references[0].entries).toHaveLength(5);
    expect(b17.guide.references[1].entries).toHaveLength(5);

    const words = [
      ...b17.dialogues.flatMap((dialogue) => dialogue.lines.flatMap((lineItem) => lineItem.tokens)),
      ...b17.vocabulary,
      ...b17.guide.sections.flatMap((section) => section.words),
      ...b17.guide.practice.items.map((item) => item.answer)
    ];
    for (const item of words) {
      expect(item.roman.split("-").filter(Boolean)).toHaveLength([...item.text].length);
    }
  });

  test("adds the 0811 and 0813 lessons with their printed grammar focus", () => {
    const b19 = courseLessons.find((lesson) => lesson.id === "b1-9");
    const b110 = courseLessons.find((lesson) => lesson.id === "b1-10");

    expect(b19.sourcePdf).toBe("docs/lessons/new/0811.pdf");
    expect(b19.titleKo).toContain("습하고 덥습니다");
    expect(b19.guide.title).toContain("-고");
    expect(b19.vocabulary).toHaveLength(12);

    expect(b110.sourcePdf).toBe("docs/lessons/new/0813.pdf");
    expect(b110.titleKo).toContain("안 합니까");
    expect(b110.guide.title).toContain("못");
    expect(b110.vocabulary).toHaveLength(12);
  });

  test("adds the 0817 and 0819 lessons with past tense and noun-linking vocabulary", () => {
    const b111 = courseLessons.find((lesson) => lesson.id === "b1-11");
    const b112 = courseLessons.find((lesson) => lesson.id === "b1-12");

    expect(b111.sourcePdf).toBe("docs/lessons/new/0817.pdf");
    expect(b111.titleKo).toContain("뭐 했습니까");
    expect(b111.guide.title).toContain("-았／었／였-");
    expect(b111.vocabulary).toHaveLength(16);
    expect(b111.guide.practice.prompts).toHaveLength(4);

    expect(b112.sourcePdf).toBe("docs/lessons/new/0819.pdf");
    expect(b112.titleKo).toContain("김밥하고 라면");
    expect(b112.guide.title).toContain("하고、와／과");
    expect(b112.vocabulary).toHaveLength(20);
    expect(b112.guide.practice.prompts).toHaveLength(5);
  });

  test("adds the 0901 and 0903 lessons with both Korean number systems", () => {
    const b113 = courseLessons.find((lesson) => lesson.id === "b1-13");
    const b114 = courseLessons.find((lesson) => lesson.id === "b1-14");

    expect(b113.sourcePdf).toBe("docs/lessons/new/0901.pdf");
    expect(b113.titleKo).toContain("전화 번호도 압니까");
    expect(b113.guide.title).toContain("몇 번");
    expect(b113.vocabulary).toHaveLength(17);
    expect(b113.guide.practice.prompts).toHaveLength(5);

    expect(b114.sourcePdf).toBe("docs/lessons/new/0903.pdf");
    expect(b114.titleKo).toContain("외국 사람이 많습니까");
    expect(b114.guide.title).toContain("數冠形詞");
    expect(b114.vocabulary).toHaveLength(19);
    expect(b114.guide.practice.prompts).toHaveLength(5);
  });
});
