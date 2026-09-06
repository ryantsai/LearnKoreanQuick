import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

let instances;
let dispatchEvent;
beforeEach(() => {
  vi.resetModules();
  instances = [];
  dispatchEvent = vi.fn();
  vi.stubGlobal('window', { dispatchEvent });
  vi.stubGlobal('CustomEvent', class { constructor(type, options) { this.type = type; this.detail = options?.detail; } });
  vi.stubGlobal('Audio', class {
    constructor(src) { this.src = src; this.pause = vi.fn(); this.play = vi.fn().mockResolvedValue(); instances.push(this); }
  });
  vi.stubGlobal('localStorage', { getItem: () => '0.8' });
});
afterEach(() => vi.unstubAllGlobals());
const readyManifest = () => vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ clips: { 'ko-KR:안녕하세요': { file: 'hello.mp3' } } }) }));
const tick = () => new Promise(resolve => setTimeout(resolve, 0));

describe('recorded speech', () => {
  test('uses base-aware audio URLs and pitch-preserving selected speed', async () => {
    readyManifest();
    const { speakKorean } = await import('./speech.js');
    const result = speakKorean(' 안녕하세요 ');
    await tick();
    expect(instances[0].src).toContain('/audio/hello.mp3');
    expect(instances[0].playbackRate).toBe(0.8);
    expect(instances[0].preservesPitch).toBe(true);
    instances[0].onended();
    expect(await result).toBe(true);
  });
  test('stop settles the pending promise so a queue cannot hang', async () => {
    readyManifest();
    const { speakKorean, stopSpeech } = await import('./speech.js');
    const result = speakKorean('안녕하세요');
    await tick();
    stopSpeech();
    expect(instances[0].pause).toHaveBeenCalled();
    expect(await result).toBe(false);
  });
  test('cancellation while loading prevents late audio from starting', async () => {
    let complete;
    vi.stubGlobal('fetch', () => new Promise(resolve => { complete = resolve; }));
    const { speakKorean, stopSpeech } = await import('./speech.js');
    const result = speakKorean('안녕하세요');
    stopSpeech();
    complete({ ok: true, json: async () => ({ clips: { 'ko-KR:안녕하세요': { file: 'hello.mp3' } } }) });
    expect(await result).toBe(false);
    expect(instances).toHaveLength(0);
  });
  test('missing clips stop playback and surface an actionable error', async () => {
    readyManifest();
    const { speakKorean } = await import('./speech.js');
    expect(await speakKorean('없는 문장')).toBe(false);
    expect(dispatchEvent.mock.calls[0][0].type).toBe('lkq-audio-error');
    expect(instances).toHaveLength(0);
  });
  test('blank exercises do not attempt to speak underscores', async () => {
    readyManifest();
    const { speakKorean } = await import('./speech.js');
    expect(await speakKorean('__________.')).toBe(true);
    expect(fetch).not.toHaveBeenCalled();
  });
});
