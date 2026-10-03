export const BASELINE_KOREAN_VOICE = "ko-KR-Chirp3-HD-Kore";

// Fixed role casting. Vocabulary, letter names and narration keep Kore.
// Only dialogue sentences needing another voice receive an extra recording.
export const DIALOGUE_VOICES = Object.freeze({
  유미: BASELINE_KOREAN_VOICE,
  관우: "ko-KR-Chirp3-HD-Charon",
  지민: "ko-KR-Chirp3-HD-Charon",
  의사: "ko-KR-Chirp3-HD-Charon",
  환자: BASELINE_KOREAN_VOICE,
  점원: "ko-KR-Chirp3-HD-Charon",
  이모: "ko-KR-Chirp3-HD-Charon",
  민준: BASELINE_KOREAN_VOICE,
  提示: BASELINE_KOREAN_VOICE,
  示例: BASELINE_KOREAN_VOICE,
  A: "ko-KR-Chirp3-HD-Charon",
  B: BASELINE_KOREAN_VOICE,
  주인: "ko-KR-Chirp3-HD-Charon",
  정희: BASELINE_KOREAN_VOICE,
});

export function getDialogueVoice(speaker) {
  return Object.hasOwn(DIALOGUE_VOICES, speaker) ? DIALOGUE_VOICES[speaker] : BASELINE_KOREAN_VOICE;
}
