import { sha256 } from "./google-audio-plan.mjs";

export const QWEN_MODEL = "Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice";

export function prepareChineseImport(existing, catalog, staged, readAudio) {
  if (staged.model !== QWEN_MODEL || staged.speakers?.["zh-TW"] !== "Serena" || staged.complete !== true) {
    throw new Error("Expected a complete isolated Qwen / Serena Chinese batch.");
  }
  const missing = catalog.entries.filter((entry) => entry.lang === "zh-TW" && !existing.clips[entry.key]);
  const stagedKeys = Object.keys(staged.clips ?? {}).sort();
  if (JSON.stringify(stagedKeys) !== JSON.stringify(missing.map((entry) => entry.key).sort())) {
    throw new Error("Chinese batch must contain exactly the current missing keys; existing clips cannot be regenerated.");
  }
  const clips = { ...existing.clips };
  for (const entry of missing) {
    const clip = staged.clips[entry.key];
    if (clip.file !== entry.file || !/^[a-f0-9]{24}\.mp3$/.test(clip.file) || !Number.isFinite(clip.duration) || clip.duration <= 0) {
      throw new Error(`Invalid Chinese recording metadata: ${entry.key}`);
    }
    const bytes = readAudio(clip.file), hash = sha256(bytes);
    if (bytes.length < 500 || clip.revision !== hash.slice(0, 16)) throw new Error(`Corrupt Chinese recording: ${entry.key}`);
    clips[entry.key] = { ...clip, sha256: hash, voice: "Serena", provider: QWEN_MODEL };
  }
  return { missing, manifest: { ...existing, clips,
    complete: catalog.entries.every((entry) => clips[entry.key]) } };
}
