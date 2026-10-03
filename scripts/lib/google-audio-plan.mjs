import { createHash } from "node:crypto";
import { audioKey } from "../../src/utils/audioIdentity.js";
import { BASELINE_KOREAN_VOICE, DIALOGUE_VOICES, getDialogueVoice } from "../../src/utils/dialogueVoice.js";

export const GOOGLE_CHARACTER_PRICE_USD = 0.00003;
export const BULK_BUDGET_USD = 2;
export const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const consonants = Object.fromEntries([..."ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"].map((letter, i) =>
  [letter, ["기역", "쌍기역", "니은", "디귿", "쌍디귿", "리을", "미음", "비읍", "쌍비읍", "시옷", "쌍시옷", "이응", "지읒", "쌍지읒", "치읓", "키읔", "티읕", "피읖", "히읗"][i]]));
const vowels = Object.fromEntries([..."ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ"].map((letter, i) =>
  [letter, [..."아애야얘어에여예오와왜외요우워웨위유으의이"][i]]));

export function googleInputText(text) {
  const normalized = text.normalize("NFC").trim().replace(/\s+/g, " ");
  return consonants[normalized] ?? vowels[normalized]
    ?? normalized.replace(/_{2,}/g, ", ").replace(/[↔→|]/g, ", ").replace(/\s+/g, " ").trim();
}

export function validateSynthesisText(text) {
  if (!/[가-힣]/u.test(text)) throw new Error("Korean synthesis needs pronounceable Hangul text.");
  if (Buffer.byteLength(text) > 5000) throw new Error("Synthesis text exceeds 5,000 UTF-8 bytes.");
  if (/(?:아요|어요|예요|세요|습니다|습니까|합니다|합니까|죠|까요)(?:이|가|하고)$/.test(text)
    || text === "한국에가") {
    throw new Error(`Unreviewed fabricated particle example: ${text}`);
  }
}

export function buildGoogleAudioPlan(catalog, lessons, { budgetUsd = BULK_BUDGET_USD, existingChineseKeys } = {}) {
  if (!Number.isFinite(budgetUsd) || budgetUsd <= 0 || budgetUsd > BULK_BUDGET_USD) {
    throw new Error("This bulk operation cannot exceed its US$2 total cap.");
  }
  const requests = new Map();
  function add(text, voice, lessonIds = []) {
    const key = audioKey(text, "ko-KR", voice);
    const existing = requests.get(key);
    if (existing) {
      existing.lessons = [...new Set([...existing.lessons, ...lessonIds])].sort();
      return;
    }
    const inputText = googleInputText(text);
    validateSynthesisText(inputText);
    const payload = {
      input: { text: inputText },
      voice: { languageCode: "ko-KR", name: voice },
      // Omit speakingRate, pitch and sampleRateHertz: use Google's defaults.
      audioConfig: { audioEncoding: "MP3" },
    };
    const requestHash = sha256(JSON.stringify(payload));
    requests.set(key, {
      key, baseKey: audioKey(text, "ko-KR"), text, lang: "ko-KR", voice,
      file: `${requestHash.slice(0, 24)}.mp3`, requestHash,
      characterCount: [...inputText].length, payload,
      lessons: [...new Set(lessonIds)].sort(),
    });
  }
  for (const entry of catalog.entries.filter((entry) => entry.lang === "ko-KR")) {
    add(entry.text, BASELINE_KOREAN_VOICE, entry.lessons);
  }
  for (const lesson of lessons) {
    for (const dialogue of lesson.dialogues ?? []) {
      for (const line of dialogue.lines ?? []) {
        const text = line.spokenKo ?? line.ko;
        if (!/[가-힣]/u.test(text ?? "")) continue;
        if (line.speaker && !Object.hasOwn(DIALOGUE_VOICES, line.speaker)) {
          throw new Error(`Review the unmapped dialogue role before synthesis: ${line.speaker}`);
        }
        add(text, getDialogueVoice(line.speaker), [lesson.id]);
      }
    }
  }
  const bindings = [...requests.values()].sort((a, b) => a.key.localeCompare(b.key));
  // Letter aliases and equivalent pause-normalized text share one paid request.
  // Every original playback key remains addressable through aliases.
  const uniqueRequests = new Map();
  for (const request of bindings) {
    const current = uniqueRequests.get(request.requestHash);
    const alias = { key: request.key, baseKey: request.baseKey, text: request.text, lessons: request.lessons };
    if (current) current.aliases.push(alias);
    else uniqueRequests.set(request.requestHash, { ...request, aliases: [alias] });
  }
  const entries = [...uniqueRequests.values()];
  const characters = entries.reduce((sum, entry) => sum + entry.characterCount, 0);
  const characterBudget = Math.floor(budgetUsd / GOOGLE_CHARACTER_PRICE_USD);
  if (characters > characterBudget) throw new Error("Planned first attempts exceed the total approved budget.");
  const fingerprint = sha256(JSON.stringify(bindings.map(({ key, requestHash }) => [key, requestHash])));
  return {
    version: 1, provider: "Google Cloud Text-to-Speech", model: "Chirp 3 HD",
    fingerprint, defaultVoice: BASELINE_KOREAN_VOICE,
    budget: { totalUsd: budgetUsd, pricePerCharacterUsd: GOOGLE_CHARACTER_PRICE_USD,
      characterBudget, firstAttemptCharacters: characters,
      firstAttemptGrossUsd: Number((characters * GOOGLE_CHARACTER_PRICE_USD).toFixed(5)),
      remainingRetryCharacters: characterBudget - characters },
    counts: { requests: entries.length, playbackKeys: bindings.length,
      baselineRequests: entries.filter((entry) => entry.voice === BASELINE_KOREAN_VOICE).length,
      roleVariants: entries.filter((entry) => entry.voice !== BASELINE_KOREAN_VOICE).length,
      preservedChineseClips: catalog.entries.filter((entry) => entry.lang === "zh-TW" && (!existingChineseKeys || existingChineseKeys.has(entry.key))).length,
      missingChineseClips: catalog.entries.filter((entry) => entry.lang === "zh-TW" && existingChineseKeys && !existingChineseKeys.has(entry.key)).length },
    // A single worker owns this operation. Reserve every attempt's characters
    // durably before calling Google; unknown outcomes remain charged in ledger.
    resumeContract: { key: "requestHash", receiptFields: ["requestHash", "file", "sha256", "duration"],
      chargeRetries: true, reserveBeforeRequest: true, reuseOnlyVerifiedReceipts: true },
    requests: entries,
  };
}

export function receiptMatches(request, receipt, bytes) {
  return receipt?.requestHash === request.requestHash && receipt.file === request.file
    && /^[a-f0-9]{64}$/.test(receipt.sha256 ?? "") && sha256(bytes) === receipt.sha256
    && bytes.length >= 500 && Number.isFinite(receipt.duration) && receipt.duration > 0;
}
