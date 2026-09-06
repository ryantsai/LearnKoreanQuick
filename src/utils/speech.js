import { getTtsSpeed } from './ttsSpeed.js';
import { assetPath } from './assets.js';

let manifestPromise;
let active;
let generation = 0;
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
      const audio = new Audio(assetPath(`audio/${clip.file}?v=${data.fingerprint ?? "1"}`));
      audio.playbackRate = getTtsSpeed();
      audio.preservesPitch = true;
      const finish = (ok, error) => {
        audio.onended = null;
        audio.onerror = null;
        if (active?.audio === audio) active = undefined;
        if (error) reject(error); else resolve(ok);
      };
      active = { audio, finish };
      audio.onended = () => finish(true);
      audio.onerror = () => finish(false, new Error('無法播放語音，請檢查連線後再試。'));
      audio.play().then(() => {
        if (run === generation) window.dispatchEvent(new CustomEvent('lkq-audio-ready'));
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
