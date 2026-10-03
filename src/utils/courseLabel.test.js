import { describe, expect, test } from "vitest";
import { applyCourseMetadata, formatCourseLabel } from "./courseLabel.js";

// User-provided format example; this is not a mapping to an existing lesson.
const example = { name: "韓語1級主修會話(五)", sessionNumber: 1, sessionCount: 6, date: "20261008" };

describe("course labels", () => {
  test("matches the requested format exactly", () => {
    expect(formatCourseLabel(example)).toBe("韓語1級主修會話(五)-1/6堂-20261008(四)");
  });

  test.each([
    ["20261004", "日"], ["20261005", "一"], ["20261006", "二"],
    ["20261007", "三"], ["20261008", "四"], ["20261009", "五"], ["20261010", "六"]
  ])("uses the Traditional Chinese weekday for %s", (date, weekday) => {
    expect(formatCourseLabel({ ...example, date })).toBe(`${example.name}-1/6堂-${date}(${weekday})`);
  });

  test("accepts a leap day and the final session", () => {
    expect(formatCourseLabel({ ...example, sessionNumber: 6, date: "20280229" }))
      .toBe("韓語1級主修會話(五)-6/6堂-20280229(二)");
  });

  test.each([
    { name: "" }, { name: undefined }, { name: "   " },
    { sessionNumber: 0 }, { sessionNumber: 7 }, { sessionNumber: 1.5 },
    { sessionCount: 0 }, { sessionCount: undefined }, { sessionCount: "6" },
    { date: undefined }, { date: "1008" }, { date: "2026-10-08" },
    { date: "20260229" }, { date: "20260931" }, { date: "20261301" }
  ])("rejects incomplete or invalid metadata: %j", (override) => {
    expect(() => formatCourseLabel({ ...example, ...override })).toThrow();
  });

  test("preserves unmatched lessons without inferring metadata", () => {
    const lesson = { id: "l2-1", label: "L2-1", sourcePdf: "docs/lessons/L2-1PDF Viewer.pdf" };
    expect(applyCourseMetadata(lesson, undefined)).toBe(lesson);
    expect(() => applyCourseMetadata(lesson, { name: example.name })).toThrow();
  });

  test("changes only display naming and adds metadata without mutating a lesson", () => {
    const lesson = Object.freeze({
      id: "fixture", label: "舊名稱", titleKo: "안녕하세요", titleZh: "你好",
      sourcePdf: "original.pdf", media: {}, dialogues: [], vocabulary: [], guide: {}
    });
    const renamed = applyCourseMetadata(lesson, example);
    expect(renamed.label).toBe(formatCourseLabel(example));
    expect(renamed.courseMetadata).toBe(example);
    for (const key of Object.keys(lesson).filter((key) => key !== "label")) {
      expect(renamed[key]).toBe(lesson[key]);
    }
    expect(lesson.label).toBe("舊名稱");
  });
});
