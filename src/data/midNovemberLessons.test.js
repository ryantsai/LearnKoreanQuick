import { describe, expect, test } from "vitest";
import { courseLessons } from "./courseLessons.js";
import { midNovemberLessons } from "./midNovemberLessons.js";

describe("November 16 and 18 PDF lessons", () => {
  test("uses the screenshot's official metadata and preserves the source conversations", () => {
    const intention = courseLessons.find((lesson) => lesson.id === "b1-31");
    const gym = courseLessons.find((lesson) => lesson.id === "b1-32");
    expect(intention.label).toBe("韓語1級主修會話(六)-4/6堂-20261116(一)");
    expect(gym.label).toBe("韓語1級主修會話(六)-5/6堂-20261118(三)");
    expect(intention.titleKo).toBe("내년 한국에 유학하려고 해요.");
    expect(gym.titleKo).toBe("오늘은 헬스장에 가지 못해요.");
    expect(intention.sourcePdf).toBe("docs/lessons/new/1116.pdf");
    expect(gym.sourcePdf).toBe("docs/lessons/new/1118.pdf");
    expect(intention.dialogues[0].lines.map((line) => line.ko)).toEqual([
      "한국 갔어요?", "네. 갔어요. 그렇지만 시간이 부족해서 학교 구경을 못했어요.",
      "학교 구경이요? 왜요?", "아..사실은 내년 한국에 유학하려고 해요.",
      "그래요? 뭘 공부해요?", "한국에서 디자인을 공부하려고 해요.",
    ]);
    expect(gym.dialogues[0].lines.map((line) => line.ko)).toEqual([
      "오늘 저녁 시간 있어요?", "네, 있어요.", "헬스장에서 같이 운동해요?",
      "미안해요. 발이 아파요. 그래서 오늘은 헬스장에 가지 못해요.",
    ]);
  });

  test("keeps source vocabulary, open exercises, age pronunciation and source discrepancies", () => {
    const [intention, gym] = midNovemberLessons;
    expect(intention.vocabulary).toHaveLength(27);
    expect(gym.vocabulary).toHaveLength(15);
    expect(intention.guide.sections.map((section) => section.words.length)).toEqual([6, 6, 15]);
    expect(gym.guide.sections.map((section) => section.words.length)).toEqual([6, 6, 10]);
    expect(intention.dialogues.map((dialogue) => dialogue.lines.length)).toEqual([6, 8, 7, 6]);
    expect(gym.dialogues.map((dialogue) => dialogue.lines.length)).toEqual([4, 11, 8, 10]);
    expect(intention.dialogues[2].lines[0].spokenKo).toContain("다섯 살");
    expect(intention.dialogues[2].lines[2].spokenKo).toContain("열다섯 살");
    expect(intention.dialogues[3].lines.filter((line) => line.ko.includes("____"))).toHaveLength(3);
    expect(gym.dialogues[3].lines.filter((line) => line.ko.includes("____"))).toHaveLength(5);
    expect(gym.dialogues[1].lines[8].ko).toBe("집에 밥을 먹지 못해요.");
    expect(gym.guide.sourceNotes[1].lines[0]).toContain("집에서");
    expect(intention.guide.practice.items.map((item) => item.answer.text)).toEqual(["먹으려고"]);
    expect(gym.guide.practice.items.map((item) => item.answer.text)).toEqual(["받지 않다", "신지 못하다"]);
    for (const lesson of midNovemberLessons) {
      expect(lesson.guide.practice.prompts).toHaveLength(4);
      expect(lesson.media).toBeUndefined();
      expect(lesson.heroEmoji).toBeTruthy();
      expect(lesson.dialogues.every((dialogue) => !dialogue.image && !dialogue.objectImage)).toBe(true);
      expect(lesson.vocabulary.every((word) => !word.image)).toBe(true);
      const entries = [...lesson.vocabulary, ...lesson.dialogues.flatMap((d) => d.lines.flatMap((line) => line.tokens)),
        ...lesson.guide.sections.flatMap((section) => section.words), ...lesson.guide.practice.items.map((item) => item.answer)];
      for (const word of entries) {
        expect(word.roman.split("-").filter(Boolean), word.text).toHaveLength([...word.text].length);
        expect(word.syllables.map((syllable) => syllable.block).join(""), word.text).toBe(word.text);
      }
    }
  });
});
