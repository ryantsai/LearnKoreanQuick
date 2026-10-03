import { expect, test } from "vitest";
import { collectAudioCatalog, mergeAudioCatalogs } from "./audio-catalog.mjs";

test("a new lesson context cannot displace current-site playback from a combined batch", () => {
  const current = collectAudioCatalog();
  const withDraft = collectAudioCatalog([{ id: "private-fixture", titleKo: "연습",
    dialogues: [{ lines: [{ ko: "밥을 먹어요.", zh: "吃飯。", tokens: [{ text: "밥을", roman: "ba-beul", zh: "飯（受詞）", partOfSpeech: "expression" }] }] }],
    vocabulary: [] }]);
  const combined = mergeAudioCatalogs(current, withDraft);
  const keys = new Set(combined.entries.map((entry) => entry.key));
  expect(current.entries.every((entry) => keys.has(entry.key))).toBe(true);
  expect(combined.entries.some((entry) => entry.lessons.includes("private-fixture"))).toBe(true);
  expect(new Set(combined.entries.map((entry) => entry.key)).size).toBe(combined.entries.length);
});
