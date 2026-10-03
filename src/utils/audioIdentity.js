import { BASELINE_KOREAN_VOICE } from "./dialogueVoice.js";

export function audioKey(text, lang = "ko-KR", voice) {
  const key = `${lang}:${text.normalize("NFC").trim().replace(/\s+/g, " ")}`;
  return lang === "ko-KR" && voice && voice !== BASELINE_KOREAN_VOICE
    ? `${key}|voice=${voice}` : key;
}
