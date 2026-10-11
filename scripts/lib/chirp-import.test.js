import { describe, expect, test } from "vitest";
import { buildGoogleAudioPlan, sha256 } from "./google-audio-plan.mjs";
import { buildChirpManifest } from "./chirp-manifest.mjs";
import { buildDeltaManifest, buildImportedManifest, runnerJobHash, selectDeltaPlan, validateChirpResults } from "./chirp-import.mjs";

function fixture() {
  const plan = buildGoogleAudioPlan({ entries: [{ text: "커피", lang: "ko-KR", lessons: ["fixture"] }] }, []);
  const batch = buildChirpManifest(plan, "approved-project");
  const item = batch.items[0], bytes = Buffer.alloc(600, 3), hash = sha256(JSON.stringify(batch));
  const job = runnerJobHash(item, batch.voices);
  const result = { id: item.id, course_id: item.course_id, role: item.role, output: item.output,
    characters: item.characters, utf8_bytes: item.utf8_bytes, job_key: job, attempt_id: 1,
    voice: batch.voices[item.role], speaking_rate: 1, audio_encoding: "MP3", http_status: 200,
    text_sha256: sha256(item.text), audio_bytes: bytes.length, audio_sha256: sha256(bytes), duration_seconds: 1.2 };
  const results = { manifest_sha256: hash, project: batch.project, quota_project_header: batch.project,
    budget_usd: 2, items: [result], output_count: 1, unique_request_count: 1, attempt_count: 1,
    accounted_cost_ceiling_usd: 0.00006,
    attempts: [{ attempt_id: 1, job_key: job, cost_microusd: 60, status: "succeeded", http_status: 200 }] };
  return { plan, batch, hash, results, bytes };
}
describe("verified Chirp import", () => {
  test("matches the Python runner's canonical request bytes including the 1.0 float", () => {
    expect(runnerJobHash({ text: "커피", role: "narrator" }, { narrator: "ko-KR-Chirp3-HD-Kore" }))
      .toBe("01446064253c702b85a392c9ce9bc141697f519594bd7c6ca873c6f811d01ce6");
  });
  test("preserves complete Chinese records and imports only current Korean playback keys", () => {
    const f = fixture(), chinese = { file: "existing.mp3", duration: 2.3, extra: "preserve", voice: "Meijia (Chinese (Taiwan))", provider: "macOS Speech Synthesis" };
    const verified = validateChirpResults(f.plan, f.batch, f.hash, f.results, () => f.bytes);
    const manifest = buildImportedManifest({ clips: { "zh-TW:咖啡": chinese }, speakers: { "zh-TW": "Serena" }, model: "Qwen", providers: { "zh-TW": "Qwen / Serena + macOS / Meijia" } }, f.plan, f.plan, verified, f.hash);
    expect(manifest.clips["zh-TW:咖啡"]).toEqual(chinese);
    expect(manifest.clips["ko-KR:커피"].voice).toBe("ko-KR-Chirp3-HD-Kore");
    expect(manifest.voiceVariants).toBe(true);
    expect(manifest.speakers["zh-TW"]).toBe("Serena");
    expect(manifest.providers["zh-TW"]).toBe("Qwen / Serena + macOS / Meijia");
  });
  test.each(["hash", "voice", "budget", "duration", "accounting", "output", "content", "missing"])("rejects %s failure before publishing", (failure) => {
    const f = fixture();
    if (failure === "hash") f.results.manifest_sha256 = "wrong";
    if (failure === "voice") f.results.items[0].voice = "old";
    if (failure === "budget") f.results.accounted_cost_ceiling_usd = 2.1;
    if (failure === "duration") f.results.items[0].duration_seconds = 0;
    if (failure === "accounting") f.results.attempts[0].cost_microusd = 0;
    if (failure === "output") f.results.items[0].output = "../unsafe.mp3";
    if (failure === "content") f.bytes = Buffer.alloc(600, 4);
    if (failure === "missing") f.results.items = [];
    expect(() => validateChirpResults(f.plan, f.batch, f.hash, f.results, () => f.bytes)).toThrow();
  });
  test("rejects an uncovered current key rather than switching to a partial batch", () => {
    const f = fixture();
    const other = buildGoogleAudioPlan({ entries: [{ text: "차", lang: "ko-KR", lessons: [] }] }, []);
    const verified = validateChirpResults(f.plan, f.batch, f.hash, f.results, () => f.bytes);
    expect(() => buildImportedManifest({ clips: {} }, other, f.plan, verified, f.hash)).toThrow(/not covered/);
  });
  test("blocks a newly published bilingual lesson until its missing Chinese recording exists", () => {
    const f = fixture();
    const active = buildGoogleAudioPlan({ entries: [
      { text: "커피", lang: "ko-KR", lessons: ["fixture"] },
      { text: "未錄製中文", lang: "zh-TW", lessons: ["fixture"] },
    ] }, []);
    const verified = validateChirpResults(f.plan, f.batch, f.hash, f.results, () => f.bytes);
    expect(() => buildImportedManifest({ clips: {} }, active, f.plan, verified, f.hash)).toThrow(/Chinese playback is not covered/);
    expect(buildImportedManifest({ clips: { "zh-TW:未錄製中文": { file: "existing.mp3", duration: 1 } } }, active, f.plan, verified, f.hash).complete).toBe(true);
  });
});

describe("delta Chirp import", () => {
  function deltaFixture() {
    const activePlan = buildGoogleAudioPlan({ entries: [
      { text: "커피", lang: "ko-KR", lessons: ["fixture"] },
      { text: "차", lang: "ko-KR", lessons: ["fixture"] },
    ] }, []);
    const published = activePlan.requests.find((request) => request.payload.input.text === "커피");
    const fresh = activePlan.requests.find((request) => request.payload.input.text === "차");
    const publishedBytes = Buffer.alloc(600, 5), freshBytes = Buffer.alloc(600, 9);
    const existing = { speakers: { "ko-KR": "ko-KR-Chirp3-HD-Kore", "zh-TW": "Serena" }, providers: { "zh-TW": "local" }, model: "Qwen",
      clips: { [published.aliases[0].key]: { file: `chirp3-hd/${published.file}`, duration: 1.1, voice: published.voice, sha256: sha256(publishedBytes), revision: "old" } } };
    const deltaPlan = selectDeltaPlan(activePlan, existing);
    const batch = buildChirpManifest(deltaPlan, "approved-project");
    const item = batch.items[0], hash = sha256(JSON.stringify(batch));
    const job = runnerJobHash(item, batch.voices);
    const result = { id: item.id, course_id: item.course_id, role: item.role, output: item.output, characters: item.characters,
      utf8_bytes: item.utf8_bytes, job_key: job, attempt_id: 1, voice: batch.voices[item.role], speaking_rate: 1, audio_encoding: "MP3",
      http_status: 200, text_sha256: sha256(item.text), audio_bytes: freshBytes.length, audio_sha256: sha256(freshBytes), duration_seconds: 1.2 };
    const results = { manifest_sha256: hash, project: batch.project, quota_project_header: batch.project, budget_usd: 2,
      items: [result], output_count: 1, unique_request_count: 1, attempt_count: 1, accounted_cost_ceiling_usd: item.text.length * 30 / 1e6,
      attempts: [{ attempt_id: 1, job_key: job, cost_microusd: item.text.length * 30, status: "succeeded", http_status: 200 }] };
    const verified = validateChirpResults(deltaPlan, batch, hash, results, () => freshBytes);
    const readPublished = (relative) => relative === `chirp3-hd/${published.file}` ? publishedBytes : Buffer.alloc(0);
    return { activePlan, published, fresh, existing, deltaPlan, verified, hash, readPublished };
  }
  test("keeps published clips whose bytes still match and synthesizes only the fresh request", () => {
    const f = deltaFixture();
    expect(f.deltaPlan.requests.map((request) => request.payload.input.text)).toEqual(["차"]);
    expect(f.deltaPlan.delta).toEqual({ sourceFingerprint: f.activePlan.fingerprint, freshRequests: 1, keptRequests: 1 });
    const manifest = buildDeltaManifest(f.existing, f.activePlan, f.deltaPlan, f.verified, f.hash, f.readPublished);
    expect(manifest.clips[f.published.aliases[0].key]).toEqual(f.existing.clips[f.published.aliases[0].key]);
    expect(manifest.clips[f.fresh.aliases[0].key]).toMatchObject({ file: `chirp3-hd/${f.fresh.file}`, revision: f.hash, voice: "ko-KR-Chirp3-HD-Kore" });
    expect(manifest.complete).toBe(true);
  });
  test("refuses to keep a published clip whose bytes changed", () => {
    const f = deltaFixture();
    expect(() => buildDeltaManifest(f.existing, f.activePlan, f.deltaPlan, f.verified, f.hash, () => Buffer.alloc(600, 1))).toThrow(/not covered/);
  });
  test("refuses to buy a request that a published clip already uses", () => {
    const f = deltaFixture();
    expect(() => buildDeltaManifest(f.existing, f.activePlan, { ...f.deltaPlan, requests: [f.published] }, f.verified, f.hash, f.readPublished))
      .toThrow(/already published/);
  });
  test("rejects a request that is only partly published", () => {
    const partial = { budget: { pricePerCharacterUsd: 0.00003, characterBudget: 66666 }, fingerprint: "f",
      requests: [{ key: "ko-KR:x", characterCount: 1, aliases: [{ key: "ko-KR:x" }, { key: "ko-KR:x|alt" }] }] };
    expect(() => selectDeltaPlan(partial, { clips: { "ko-KR:x": {} } })).toThrow(/Partly published/);
  });
});
