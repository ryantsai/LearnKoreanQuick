import { describe, expect, test } from "vitest";
import { buildGoogleAudioPlan } from "./google-audio-plan.mjs";
import { buildChirpManifest } from "./chirp-manifest.mjs";

describe("offline Chirp runner handoff", () => {
  test("uses one Korean-only output per paid job and retains exact Unicode counts", () => {
    const plan = buildGoogleAudioPlan({ entries: [
      { text: "ㄱ", lang: "ko-KR", lessons: [] },
      { text: "기역", lang: "ko-KR", lessons: [] },
      { text: "咖啡", lang: "zh-TW", lessons: [] },
    ] }, [{ id: "fixture", dialogues: [{ lines: [{ speaker: "관우", ko: "기역" }] }] }]);
    const manifest = buildChirpManifest(plan, "approved-project");
    expect(manifest.items).toHaveLength(2);
    expect(new Set(manifest.items.map((item) => item.output)).size).toBe(2);
    expect(manifest.items.every((item) => item.characters === [...item.text].length && item.utf8_bytes === Buffer.byteLength(item.text))).toBe(true);
    expect(manifest.items.map((item) => item.role)).toEqual(expect.arrayContaining(["narrator", "dialogue_charon"]));
    expect(manifest.items.every((item) => item.output.startsWith("public/audio/chirp3-hd/"))).toBe(true);
    expect(() => buildChirpManifest(plan, "")).toThrow(/project/);
  });
});
