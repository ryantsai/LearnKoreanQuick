const STORAGE_KEY = "lkq.ttsSpeed";
export const MIN_TTS_SPEED = 0.1;
export const MAX_TTS_SPEED = 2;
export const DEFAULT_TTS_SPEED = 1;

function clampSpeed(value) {
  if (!Number.isFinite(value)) {
    return DEFAULT_TTS_SPEED;
  }
  return Math.min(MAX_TTS_SPEED, Math.max(MIN_TTS_SPEED, value));
}

export function getTtsSpeed() {
  if (typeof localStorage === "undefined") {
    return DEFAULT_TTS_SPEED;
  }
  const stored = Number.parseFloat(localStorage.getItem(STORAGE_KEY));
  if (Number.isNaN(stored)) {
    return DEFAULT_TTS_SPEED;
  }
  return clampSpeed(stored);
}

export function setTtsSpeed(value) {
  const next = clampSpeed(value);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, String(next));
  }
  return next;
}
