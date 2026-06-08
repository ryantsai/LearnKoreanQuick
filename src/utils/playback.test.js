import { describe, expect, test } from "vitest";
import { buildDialoguePlaybackItems, buildVocabularyPlaybackItems } from "./playback.js";

describe("playback sequencing", () => {
  const dialogue = {
    lines: [
      {
        zh: "你好。",
        tokens: [
          { text: "안녕하세요" },
          { text: "유미" },
        ],
      },
      {
        zh: "謝謝。",
        tokens: [{ text: "감사합니다" }],
      },
    ],
  };

  test("builds Korean-only dialogue playback in spoken token order", () => {
    expect(buildDialoguePlaybackItems(dialogue)).toEqual([
      { type: "korean", text: "안녕하세요", lineIndex: 0, tokenIndex: 0 },
      { type: "korean", text: "유미", lineIndex: 0, tokenIndex: 1 },
      { type: "korean", text: "감사합니다", lineIndex: 1, tokenIndex: 0 },
    ]);
  });

  test("adds Chinese after each dialogue sentence when requested", () => {
    expect(buildDialoguePlaybackItems(dialogue, true)).toEqual([
      { type: "korean", text: "안녕하세요", lineIndex: 0, tokenIndex: 0 },
      { type: "korean", text: "유미", lineIndex: 0, tokenIndex: 1 },
      { type: "chinese", text: "你好。", lineIndex: 0, tokenIndex: null },
      { type: "korean", text: "감사합니다", lineIndex: 1, tokenIndex: 0 },
      { type: "chinese", text: "謝謝。", lineIndex: 1, tokenIndex: null },
    ]);
  });

  test("adds Chinese after each vocabulary word when requested", () => {
    const words = [
      { text: "커피", zh: "咖啡" },
      { text: "와플", zh: "鬆餅" },
    ];

    expect(buildVocabularyPlaybackItems(words, true)).toEqual([
      { type: "korean", text: "커피", wordIndex: 0 },
      { type: "chinese", text: "咖啡", wordIndex: 0 },
      { type: "korean", text: "와플", wordIndex: 1 },
      { type: "chinese", text: "鬆餅", wordIndex: 1 },
    ]);
  });
});
