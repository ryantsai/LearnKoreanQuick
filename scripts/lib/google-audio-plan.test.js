import { describe, expect, test } from "vitest";
import { audioKey } from "../../src/utils/audioIdentity.js";
import { BASELINE_KOREAN_VOICE, getDialogueVoice } from "../../src/utils/dialogueVoice.js";
import { buildGoogleAudioPlan, googleInputText, receiptMatches, sha256, validateSynthesisText } from "./google-audio-plan.mjs";

const catalog = { entries: [
  { text: "안녕하세요", lang: "ko-KR", lessons: ["fixture"] },
  { text: "커피", lang: "ko-KR", lessons: ["fixture"] },
  { text: "咖啡", lang: "zh-TW", lessons: ["fixture"] },
] };
const lessons = [{ id: "fixture", dialogues: [{ lines: [
  { ko: "안녕하세요", speaker: "관우" },
  { ko: "안녕하세요", speaker: "관우" },
  { ko: "커피", speaker: "유미" },
] }] }];

describe("Google Korean audio plan", () => {
  test("deduplicates only necessary role variants and preserves Chinese without synthesis", () => {
    const plan = buildGoogleAudioPlan(catalog, lessons);
    expect(plan.counts).toEqual({ requests: 3, playbackKeys: 3, baselineRequests: 2, roleVariants: 1, preservedChineseClips: 1, missingChineseClips: 0 });
    expect(plan.requests.every((entry) => entry.lang === "ko-KR")).toBe(true);
    expect(plan.requests.filter((entry) => entry.text === "안녕하세요")).toHaveLength(2);
    expect(plan.requests.find((entry) => entry.voice === getDialogueVoice("관우")).key)
      .toBe(audioKey("안녕하세요", "ko-KR", getDialogueVoice("관우")));
    expect(plan.requests.find((entry) => entry.voice === BASELINE_KOREAN_VOICE).file).toMatch(/^[a-f0-9]{24}\.mp3$/);
  });
  test("uses default synthesis rate and budgets exact sent Unicode characters", () => {
    const plan = buildGoogleAudioPlan(catalog, lessons);
    expect(plan.requests.every((entry) => Object.keys(entry.payload.audioConfig).join() === "audioEncoding")).toBe(true);
    expect(plan.budget.firstAttemptCharacters).toBe(12);
    expect(plan.budget.firstAttemptGrossUsd).toBe(0.00036);
    expect(() => buildGoogleAudioPlan(catalog, lessons, { budgetUsd: 2.01 })).toThrow(/cap/);
    expect(() => buildGoogleAudioPlan(catalog, lessons, { budgetUsd: 0.0001 })).toThrow(/budget/);
  });
  test("produces deterministic request identities and refuses unmapped roles", () => {
    expect(buildGoogleAudioPlan(catalog, lessons)).toEqual(buildGoogleAudioPlan(catalog, lessons));
    expect(() => buildGoogleAudioPlan(catalog, [{ id: "fixture", dialogues: [{ lines: [{ ko: "커피", speaker: "unknown" }] }] }]))
      .toThrow(/unmapped/);
    expect(googleInputText("ㄱ")).toBe("기역");
    expect(googleInputText("ㅏ")).toBe("아");
    expect(googleInputText("밥을 ___ 먹어요.")).toBe("밥을 , 먹어요.");
  });
  test.each(["괜찮아요가", "읽습니까가", "한국에가", "먹어요가"])("blocks an unreviewed generated example: %s", text => {
    expect(() => validateSynthesisText(text)).toThrow(/particle/);
  });
  test("deduplicates equivalent spoken letter inputs and does not reject legitimate contrast or location particles", () => {
    const plan = buildGoogleAudioPlan({ entries: [
      { text: "ㄱ", lang: "ko-KR", lessons: [] },
      { text: "기역", lang: "ko-KR", lessons: [] },
    ] }, []);
    expect(plan.counts.requests).toBe(1);
    expect(plan.counts.playbackKeys).toBe(2);
    expect(plan.requests[0].aliases.map((entry) => entry.key)).toEqual(expect.arrayContaining(["ko-KR:ㄱ", "ko-KR:기역"]));
    expect(() => validateSynthesisText("읽습니다만")).not.toThrow();
    expect(() => validateSynthesisText("한국에만")).not.toThrow();
  });
  test("resumes only receipts matching the request, content hash and playable metadata", () => {
    const request = buildGoogleAudioPlan(catalog, lessons).requests[0];
    const bytes = Buffer.alloc(600, 1);
    const receipt = { requestHash: request.requestHash, file: request.file, sha256: sha256(bytes), duration: 1.2 };
    expect(receiptMatches(request, receipt, bytes)).toBe(true);
    expect(receiptMatches(request, { ...receipt, requestHash: "old-voice" }, bytes)).toBe(false);
    expect(receiptMatches(request, receipt, Buffer.alloc(600, 2))).toBe(false);
    expect(receiptMatches(request, { ...receipt, duration: 0 }, bytes)).toBe(false);
  });
});
