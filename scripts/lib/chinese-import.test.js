import { describe, expect, test } from "vitest";
import { sha256 } from "./google-audio-plan.mjs";
import { prepareChineseImport, QWEN_MODEL } from "./chinese-import.mjs";

function fixture() {
  const bytes = Buffer.alloc(600, 2), file = "a".repeat(24) + ".mp3";
  const old = { file: "existing.mp3", duration: 1.4, revision: "preserve" };
  const existing = { model: "existing-provider", clips: { "zh-TW:咖啡": old, "ko-KR:커피": old } };
  const catalog = { entries: [{ lang: "zh-TW", key: "zh-TW:咖啡", file: old.file }, { lang: "zh-TW", key: "zh-TW:下班之後有事", file }, { lang: "ko-KR", key: "ko-KR:커피", file: old.file }] };
  const staged = { model: QWEN_MODEL, speakers: { "zh-TW": "Serena" }, complete: true,
    clips: { "zh-TW:下班之後有事": { file, duration: 2.1, revision: sha256(bytes).slice(0, 16) } } };
  return { bytes, old, existing, catalog, staged };
}
describe("isolated missing Chinese import", () => {
  test("adds only missing Serena clips while preserving every existing record", () => {
    const f = fixture(), result = prepareChineseImport(f.existing, f.catalog, f.staged, () => f.bytes);
    expect(result.missing).toHaveLength(1);
    expect(result.manifest.clips["zh-TW:咖啡"]).toBe(f.old);
    expect(result.manifest.clips["ko-KR:커피"]).toBe(f.old);
    expect(result.manifest.model).toBe(f.existing.model);
    expect(result.manifest.clips["zh-TW:下班之後有事"].voice).toBe("Serena");
    expect(result.manifest.complete).toBe(true);
  });
  test.each(["voice", "incomplete", "overwrite", "hash"])("rejects %s instead of changing existing Chinese voices", (failure) => {
    const f = fixture();
    if (failure === "voice") f.staged.speakers["zh-TW"] = "mainland-Chirp";
    if (failure === "incomplete") f.staged.complete = false;
    if (failure === "overwrite") f.staged.clips["zh-TW:咖啡"] = f.old;
    if (failure === "hash") f.bytes = Buffer.alloc(600, 3);
    expect(() => prepareChineseImport(f.existing, f.catalog, f.staged, () => f.bytes)).toThrow();
  });
});
