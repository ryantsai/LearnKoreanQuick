import { expect, test } from "vitest";
import { courseLessons } from "../data/courseLessons.js";
import { specialCourses } from "../data/specialCourses.js";
import { DIALOGUE_VOICES, getDialogueVoice } from "./dialogueVoice.js";

test("every existing two-person conversation uses fixed, distinct approved voices", () => {
  for (const lesson of [...courseLessons, ...specialCourses]) for (const dialogue of lesson.dialogues ?? []) {
    const roles = [...new Set(dialogue.lines.map((line) => line.speaker))].filter((role) => !["提示", "示例"].includes(role));
    for (const role of roles) expect(Object.hasOwn(DIALOGUE_VOICES, role)).toBe(true);
    if (roles.length === 2) expect(new Set(roles.map(getDialogueVoice)).size).toBe(2);
  }
  expect(getDialogueVoice("toString")).toBe("ko-KR-Chirp3-HD-Kore");
});
