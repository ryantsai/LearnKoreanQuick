import { describe, expect, test } from "vitest";
import { lateSeptemberLessons } from "./lateSeptemberLessons.js";

describe("late September PDF lessons", () => {
  test("keeps the source dialogues and leaves learner responses open", () => {
    const [location, transport] = lateSeptemberLessons;
    expect(location.sourcePdf).toBe("docs/lessons/new/0929.pdf");
    expect(location.dialogues[0].lines.map((line) => line.ko)).toEqual([
      "정희 씨, 동대문이 어디에 있어요?",
      "동대문은 을지로 6가 근처에 있어요.",
      "저는 내일 거기에 가요. 정희 씨는요?",
      "저는 내일 시험이 있어요. 그래서 학교에 가요."
    ]);
    expect(location.dialogues[0].lines[1].spokenKo).toContain("육가");
    expect(transport.sourcePdf).toBe("docs/lessons/new/0930.pdf");
    expect(transport.dialogues[0].lines.map((line) => line.ko)).toEqual([
      "민준 씨, 차가 있어요?",
      "아니요, 없어요.",
      "그러면 회사에 어떻게 가요?",
      "지하철로 가요. 관우 씨는요?",
      "저는 오토바이를 타고 가요."
    ]);
    for (const lesson of lateSeptemberLessons) {
      expect(lesson.dialogues[1].lines.some((line) => line.ko.includes("____"))).toBe(true);
      expect(lesson.guide.practice.prompts.length).toBeGreaterThan(0);
    }
  });
});
