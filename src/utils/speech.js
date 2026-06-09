import { getTtsSpeed } from "./ttsSpeed.js";

const BASE_RATE = 0.78;

export function speakKorean(text) {
  if (!("speechSynthesis" in window)) {
    return false;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = BASE_RATE * getTtsSpeed();
  utterance.pitch = 1.04;
  window.speechSynthesis.speak(utterance);
  return true;
}
