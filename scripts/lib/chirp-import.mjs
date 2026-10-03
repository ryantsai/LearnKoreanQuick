import { sha256 } from "./google-audio-plan.mjs";
import { BASELINE_KOREAN_VOICE } from "../../src/utils/dialogueVoice.js";

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}

export function runnerJobHash(item, voices) {
  // Python's runner serializes its float as 1.0. JS JSON.stringify emits 1;
  // retain the runner's exact canonical bytes for cross-language receipts.
  return sha256(`{"audioConfig":{"audioEncoding":"MP3","speakingRate":1.0},"input":${canonical({ text: item.text })},"voice":${canonical({ languageCode: "ko-KR", name: voices[item.role] })}}`);
}

// Reject incomplete or mismatched output before touching the active manifest.
// Returning source data never implies that MP3 decoding has passed; the CLI
// must independently decode every result before --apply is allowed.
export function validateChirpResults(plan, batch, batchHash, results, readAudio) {
  if (results.manifest_sha256 !== batchHash || results.budget_usd !== 2
    || results.project !== batch.project || results.quota_project_header !== batch.project) throw new Error("Batch identity or budget does not match.");
  if (batch.schema_version !== 1 || batch.language_code !== "ko-KR" || batch.speaking_rate !== 1
    || plan.requests.length !== batch.items.length || results.items.length !== batch.items.length
    || results.output_count !== batch.items.length || results.unique_request_count !== plan.requests.length) throw new Error("Incomplete batch result.");
  const requests = new Map(plan.requests.map((request) => [request.requestHash, request]));
  const outputs = new Map();
  const jobs = new Map();
  for (const item of batch.items) {
    const request = requests.get(item.id);
    if (!request || outputs.has(item.id) || item.text !== request.payload.input.text
      || request.requestHash !== sha256(JSON.stringify(request.payload))
      || request.file !== `${request.requestHash.slice(0, 24)}.mp3`
      || ![BASELINE_KOREAN_VOICE, "ko-KR-Chirp3-HD-Charon"].includes(request.voice)
      || batch.voices[item.role] !== request.voice || item.characters !== [...item.text].length
      || item.utf8_bytes !== Buffer.byteLength(item.text)
      || item.output !== `public/audio/chirp3-hd/${request.file}`) throw new Error("Approved source plan differs from the batch manifest.");
    outputs.set(item.id, { item, request });
    jobs.set(runnerJobHash(item, batch.voices), item.text.length * 30);
  }
  if (jobs.size !== batch.items.length) throw new Error("Expected one output per unique paid request.");
  const attempts = new Map();
  const attemptsByJob = new Map();
  let cost = 0;
  for (const attempt of results.attempts) {
    if (!Number.isInteger(attempt.attempt_id) || attempts.has(attempt.attempt_id)
      || jobs.get(attempt.job_key) !== attempt.cost_microusd
      || !["succeeded", "http_error", "uncertain"].includes(attempt.status)) throw new Error("Invalid attempt accounting.");
    attempts.set(attempt.attempt_id, attempt);
    attemptsByJob.set(attempt.job_key, (attemptsByJob.get(attempt.job_key) ?? 0) + 1);
    if (attemptsByJob.get(attempt.job_key) > 2) throw new Error("Batch exceeded its retry limit.");
    cost += attempt.cost_microusd;
  }
  if (results.attempt_count !== attempts.size || cost > 2_000_000
    || Math.abs(results.accounted_cost_ceiling_usd * 1_000_000 - cost) > 0.001) throw new Error("Batch exceeded or misstated the approved budget.");
  const verified = new Map();
  for (const result of results.items) {
    const approved = outputs.get(result.id);
    if (!approved || verified.has(result.id)) throw new Error("Unknown or duplicate audio result.");
    const { item, request } = approved;
    const attempt = attempts.get(result.attempt_id);
    if (result.output !== item.output || result.course_id !== item.course_id || result.role !== item.role
      || result.characters !== item.characters || result.utf8_bytes !== item.utf8_bytes
      || result.job_key !== runnerJobHash(item, batch.voices) || result.voice !== request.voice
      || result.speaking_rate !== 1 || result.audio_encoding !== "MP3" || result.http_status !== 200
      || result.text_sha256 !== sha256(item.text) || attempt?.job_key !== result.job_key
      || attempt.status !== "succeeded" || attempt.http_status !== 200
      || !Number.isFinite(result.duration_seconds) || result.duration_seconds <= 0) throw new Error("Audio receipt differs from the approved request.");
    const bytes = readAudio(item.output);
    if (bytes.length < 500 || bytes.length !== result.audio_bytes || sha256(bytes) !== result.audio_sha256) throw new Error("Missing or corrupt audio output.");
    verified.set(result.id, { item, request, result });
  }
  return verified;
}

export function buildImportedManifest(existing, activePlan, batchPlan, verified, batchHash) {
  const requested = new Map(batchPlan.requests.flatMap((request) => request.aliases.map((alias) => [alias.key, request])));
  const clips = Object.fromEntries(Object.entries(existing.clips).filter(([key]) => key.startsWith("zh-TW:")));
  for (const active of activePlan.requests) for (const alias of active.aliases) {
    const request = requested.get(alias.key);
    const output = request && verified.get(request.requestHash);
    if (!output || active.payload.input.text !== request.payload.input.text || active.voice !== request.voice) throw new Error(`Current playback is not covered: ${alias.key}`);
    clips[alias.key] = { file: `chirp3-hd/${request.file}`, duration: output.result.duration_seconds,
      voice: request.voice, sha256: output.result.audio_sha256, revision: batchHash };
  }
  return { version: 2, model: "Google Cloud Text-to-Speech Chirp 3 HD (Korean); Qwen3-TTS (Chinese)",
    fingerprint: batchHash, speakers: { ...existing.speakers, "ko-KR": BASELINE_KOREAN_VOICE },
    voiceVariants: true, complete: true,
    providers: { "ko-KR": "Google Cloud Text-to-Speech Chirp 3 HD", "zh-TW": existing.providers?.["zh-TW"] ?? existing.model }, clips };
}
