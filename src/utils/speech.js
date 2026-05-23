export function speakKorean(text) {
  if (!("speechSynthesis" in window)) {
    return false;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.78;
  utterance.pitch = 1.04;
  window.speechSynthesis.speak(utterance);
  return true;
}
