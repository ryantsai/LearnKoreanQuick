import { describe, expect, test } from "vitest";
import { existsSync } from "node:fs";
import { courseLessons } from "./courseLessons.js";
import { novemberLessons } from "./novemberLessons.js";

describe("November 9 and 10 PDF lessons", () => {
  test("uses the verified official sessions and preserves the complete source conversations", () => {
    const bag = courseLessons.find((lesson) => lesson.id === "b1-29");
    const travel = courseLessons.find((lesson) => lesson.id === "b1-30");
    expect(bag.label).toBe("韓語1級主修會話(六)-2/6堂-20261109(一)");
    expect(travel.label).toBe("韓語1級主修會話(六)-3/6堂-20261110(二)");
    expect(bag.titleKo).toBe("이건 제 가방이에요.");
    expect(travel.titleKo).toBe("한국에 혼자 갈 수 있어요?");
    expect(bag.dialogues[0].lines.map((line) => line.ko)).toEqual([
      "이 가방 누구 거예요?", "이건 제 가방이에요.", "새 가방이에요? 언제 샀어요?",
      "네, 새 가방이에요. 어제 중산지하상가에서 샀어요.", "예뻐요. 요즘 이런 가방이 유행이에요.",
    ]);
    expect(travel.dialogues[0].lines.map((line) => line.ko)).toEqual([
      "관우 씨, 다음 달에 한국 가요?", "네. 그렇지만 비행기표 아직 안 샀어요.",
      "친구하고 같이 가요?", "아니요. 혼자 가요.", "한국에 혼자 갈 수 있어요?", "네, 혼자 갈 수 있어요.",
    ]);
    expect(bag.dialogues.map((dialogue) => dialogue.lines.length)).toEqual([5, 7, 8]);
    expect(travel.dialogues.map((dialogue) => dialogue.lines.length)).toEqual([6, 10, 8]);
  });

  test("keeps all pronoun forms, activity words and open exercises without silently fixing source text", () => {
    const [bag, travel] = novemberLessons;
    expect(bag.sourcePdf).toBe("docs/lessons/new/1109.pdf");
    expect(travel.sourcePdf).toBe("docs/lessons/new/1110.pdf");
    expect(bag.guide.sections.map((section) => section.words.length)).toEqual([8, 12, 30, 2]);
    expect(travel.guide.sections.map((section) => section.words.length)).toEqual([7, 6, 10]);
    expect(bag.guide.sections[2].words.map((word) => word.text)).toContain("저게");
    expect(bag.vocabulary).toHaveLength(18);
    expect(travel.vocabulary).toHaveLength(18);
    expect(bag.dialogues[2].lines.filter((line) => line.ko.includes("____"))).toHaveLength(4);
    expect(travel.dialogues[2].lines.filter((line) => line.ko.includes("____"))).toHaveLength(4);
    expect(bag.guide.practice.items.map((item) => item.answer.text)).toEqual(["이게"]);
    expect(travel.guide.practice.items.map((item) => item.answer.text)).toEqual(["학교에 갈 수 있다", "중국에 갈 수 없다"]);
    expect(bag.guide.practice.prompts).toHaveLength(3);
    expect(travel.guide.practice.prompts).toHaveLength(7);
    expect(travel.guide.practice.prompts[4].ko).toContain("오토바이를 발 수 있어요?");
    expect(travel.guide.practice.prompts[4].zh).toContain("誤植");
    expect(bag.guide.sourceNotes[1].lines[0]).toContain("省略");
  });

  test("keeps reviewed token romanization aligned and source images out of public assets", () => {
    for (const lesson of novemberLessons) {
      expect(lesson.heroEmoji).toBeTruthy();
      expect(lesson.media).toBeUndefined();
      expect(lesson.dialogues.every((dialogue) => !dialogue.image && !dialogue.objectImage)).toBe(true);
      expect(lesson.vocabulary.every((word) => !word.image)).toBe(true);
      // Source PDFs are local-only; do not require them in a clean CI checkout.
      expect(lesson.sourcePdf).toMatch(/^docs\/lessons\/new\/11(09|10)\.pdf$/);
      const words = [...lesson.vocabulary, ...lesson.dialogues.flatMap((d) => d.lines.flatMap((line) => line.tokens)),
        ...lesson.guide.sections.flatMap((s) => s.words), ...lesson.guide.practice.items.map((item) => item.answer)];
      for (const word of words) {
        expect(word.roman.split("-").filter(Boolean), word.text).toHaveLength([...word.text].length);
        expect(word.syllables.map((syllable) => syllable.block).join(""), word.text).toBe(word.text);
      }
      expect(existsSync(`public/assets/course-lessons/${lesson.id}-dialogue-person.png`)).toBe(false);
    }
  });
});
