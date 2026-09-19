import { getTtsSpeed } from './ttsSpeed.js';
import { assetPath } from './assets.js';

let manifestPromise;
let active;
let generation = 0;
let player;
let playerUnlocked = false;
let unlockInstalled = false;
let silentClipUrl;
export const audioKey = (text, lang = 'ko-KR') => `${lang}:${text.normalize('NFC').trim().replace(/\s+/g, ' ')}`;

function manifest() {
  if (!manifestPromise) {
    manifestPromise = fetch(assetPath('audio/manifest.json'), { cache: 'no-store' }).then((response) => {
      if (!response.ok) throw new Error('語音資料尚未載入，請稍後再試。');
      return response.json();
    }).then((data) => {
      if (data.complete === false) manifestPromise = undefined;
      return data;
    }).catch((error) => { manifestPromise = undefined; throw error; });
  }
  return manifestPromise;
}

// iOS Safari only allows HTMLMediaElement.play() on an element started inside a
// user gesture. Creating a new Audio() per clip (the old approach) starts
// failing with NotAllowedError once the original tap's activation expires, so
// long "play all" queues stopped after a few clips. One shared element, primed
// on the first gesture, keeps the permission for the whole queue.
function getPlayer() {
  if (!player) {
    player = new Audio();
    player.preload = 'auto';
  }
  return player;
}

function silentClip() {
  if (silentClipUrl) return silentClipUrl;
  const samples = 800;
  const bytes = new Uint8Array(44 + samples * 2);
  const view = new DataView(bytes.buffer);
  const ascii = (offset, text) => {
    for (let index = 0; index < text.length; index += 1) bytes[offset + index] = text.charCodeAt(index);
  };
  ascii(0, 'RIFF');
  view.setUint32(4, 36 + samples * 2, true);
  ascii(8, 'WAVE');
  ascii(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, 8000, true);
  view.setUint32(28, 16000, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  ascii(36, 'data');
  view.setUint32(40, samples * 2, true);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  silentClipUrl = `data:audio/wav;base64,${btoa(binary)}`;
  return silentClipUrl;
}

export function unlockAudio() {
  if (playerUnlocked || active) return;
  const element = getPlayer();
  element.src = silentClip();
  const request = element.play();
  if (!request?.then) return;
  request.then(() => {
    if (active) return;
    playerUnlocked = true;
    element.pause();
  }).catch(() => {});
}

export function installAudioUnlock() {
  if (unlockInstalled || typeof window === 'undefined' || typeof window.addEventListener !== 'function') return;
  unlockInstalled = true;
  const unlock = () => unlockAudio();
  ['pointerdown', 'touchstart', 'touchend', 'click'].forEach((type) => {
    window.addEventListener(type, unlock, { capture: true, passive: true });
  });
}

export function stopSpeech() {
  generation += 1;
  if (active) {
    active.audio.pause();
    active.finish(false);
    active = undefined;
  }
}

export async function speakAudio(text, lang = 'ko-KR') {
  stopSpeech();
  const run = generation;
  // Open-ended exercises have nothing to pronounce until the learner fills them in.
  if (!/[가-힣ㄱ-ㅎㅏ-ㅣ\p{Script=Han}A-Za-z0-9]/u.test(text)) return true;
  try {
    const data = await manifest();
    if (run !== generation) return false;
    const clip = data.clips[audioKey(text, lang)];
    if (!clip) throw new Error('這段語音尚未準備好，請稍後再試。');
    return await new Promise((resolve, reject) => {
      const audio = getPlayer();
      audio.src = assetPath(`audio/${clip.file}?v=${clip.revision ?? data.fingerprint ?? "1"}`);
      audio.playbackRate = getTtsSpeed();
      audio.preservesPitch = true;
      let settled = false;
      const finish = (ok, error) => {
        if (settled) return;
        settled = true;
        audio.onended = null;
        audio.onerror = null;
        if (active?.audio === audio) active = undefined;
        if (error) reject(error); else resolve(ok);
      };
      active = { audio, finish };
      audio.onended = () => finish(true);
      audio.onerror = () => finish(false, new Error('無法播放語音，請檢查連線後再試。'));
      audio.play().then(() => {
        if (run !== generation || settled) {
          finish(false);
          return;
        }
        playerUnlocked = true;
        window.dispatchEvent(new CustomEvent('lkq-audio-ready'));
      }).catch((error) => {
        if (run === generation) finish(false, error);
        else finish(false);
      });
    });
  } catch (error) {
    if (run === generation) {
      const message = error.name === 'NotAllowedError'
        ? '請再按一次播放以允許語音。'
        : /[一-鿿]/u.test(error.message) ? error.message : '無法播放語音，請檢查連線後再試。';
      window.dispatchEvent(new CustomEvent('lkq-audio-error', { detail: message }));
    }
    return false;
  }
}

export function speakKorean(text) {
  return speakAudio(text, 'ko-KR');
}
