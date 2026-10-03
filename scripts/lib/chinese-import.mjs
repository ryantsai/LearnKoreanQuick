import { sha256 } from "./google-audio-plan.mjs";
import { chineseSpokenText, MACOS_CHINESE_MODEL, MEIJIA_VOICE } from "./macos-chinese.mjs";

export const QWEN_MODEL = "Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice";

export function prepareChineseImport(existing, catalog, staged, readAudio) {
  const qwen = staged.model === QWEN_MODEL && staged.speakers?.["zh-TW"] === "Serena";
  const meijia = staged.model === MACOS_CHINESE_MODEL && staged.speakers?.["zh-TW"] === MEIJIA_VOICE
    && staged.locale === "zh_TW" && staged.synthesisRate === "default"
    && staged.recipe?.inputEncoding === "UTF-8" && staged.recipe?.voice === MEIJIA_VOICE
    && sha256(JSON.stringify(staged.recipe)) === staged.fingerprint;
  if ((!qwen && !meijia) || staged.complete !== true) throw new Error("Expected a complete approved local Chinese batch.");
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
    if (meijia && (clip.voice !== MEIJIA_VOICE || clip.provider !== MACOS_CHINESE_MODEL
      || clip.sha256 !== hash || clip.recipeFingerprint !== staged.fingerprint
      || clip.sourceTextSha256 !== sha256(entry.text) || clip.spokenText !== chineseSpokenText(entry.text)
      || clip.inputSha256 !== sha256(clip.spokenText) || clip.synthesisRate !== "default" || clip.locale !== "zh_TW")) {
      throw new Error(`Taiwan voice input/rate does not match: ${entry.key}`);
    }
    clips[entry.key] = { ...clip, sha256: hash, voice: meijia ? MEIJIA_VOICE : "Serena", provider: staged.model };
  }
  return { missing, manifest: { ...existing, clips,
    ...(meijia ? { model: `${existing.model}; macOS / Meijia (new Chinese)`, providers: { ...existing.providers,
      "zh-TW": "Qwen3-TTS / Serena (existing); macOS / Meijia zh_TW (new additions)" } } : {}),
    complete: catalog.entries.every((entry) => clips[entry.key]) } };
}
