import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

let instances;
let dispatchEvent;
let playImplementation;
beforeEach(() => {
  vi.resetModules();
  instances = [];
  dispatchEvent = vi.fn();
  playImplementation = () => Promise.resolve();
  vi.stubGlobal('window', { dispatchEvent });
  vi.stubGlobal('CustomEvent', class { constructor(type, options) { this.type = type; this.detail = options?.detail; } });
  vi.stubGlobal('Audio', class {
    constructor(src) { this.src = src; this.pause = vi.fn(); this.play = vi.fn(() => playImplementation()); instances.push(this); }
  });
  vi.stubGlobal('localStorage', { getItem: () => '0.8' });
});
afterEach(() => vi.unstubAllGlobals());
const readyManifest = () => vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ clips: { 'ko-KR:안녕하세요': { file: 'hello.mp3' } } }) }));
const tick = () => new Promise(resolve => setTimeout(resolve, 0));

describe('recorded speech', () => {
  test('regenerated recordings use their own content revision to bypass old browser caches', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ fingerprint: 'old', clips: { 'ko-KR:안녕하세요': { file: 'hello.mp3', revision: 'new' } } }) }));
    const { speakKorean } = await import('./speech.js');
    const result = speakKorean('안녕하세요');
    await tick();
    expect(instances[0].src).toContain('?v=new');
    instances[0].onended();
    expect(await result).toBe(true);
  });
  test('a cancelled clip that resolves its play late does not pause the clip that replaced it', async () => {
    readyManifest();
    const { speakKorean } = await import('./speech.js');
    // Audio.play can finish loading after the learner has already switched clips.
    let started;
    playImplementation = () => new Promise(resolve => { started = resolve; });
    const first = speakKorean('안녕하세요');
    await tick();
    playImplementation = () => Promise.resolve();
    const second = speakKorean('안녕하세요');
    await tick();
    expect(await first).toBe(false);
    expect(instances).toHaveLength(1);
    expect(instances[0].pause).toHaveBeenCalledTimes(1);
    started();
    await tick();
    expect(instances[0].pause).toHaveBeenCalledTimes(1);
    instances[0].onended();
    expect(await second).toBe(true);
  });
  test('reuses one audio element for every clip so iOS keeps playback permission', async () => {
    readyManifest();
    const { speakKorean } = await import('./speech.js');
    const first = speakKorean('안녕하세요');
    await tick();
    instances[0].onended();
    expect(await first).toBe(true);
    const second = speakKorean('안녕하세요');
    await tick();
    instances[0].onended();
    expect(await second).toBe(true);
    expect(instances).toHaveLength(1);
  });
  test('primes the shared element with a silent clip on the first gesture, then stops priming', async () => {
    readyManifest();
    const { speakKorean, unlockAudio } = await import('./speech.js');
    unlockAudio();
    expect(instances).toHaveLength(1);
    expect(instances[0].src).toMatch(/^data:audio\/wav;base64,/);
    await tick();
    expect(instances[0].pause).toHaveBeenCalledTimes(1);
    const result = speakKorean('안녕하세요');
    await tick();
    expect(instances[0].src).toContain('/audio/hello.mp3');
    instances[0].onended();
    expect(await result).toBe(true);
    const plays = instances[0].play.mock.calls.length;
    unlockAudio();
    expect(instances[0].play).toHaveBeenCalledTimes(plays);
    expect(instances[0].src).toContain('/audio/hello.mp3');
  });
  test('installs gesture listeners that prime playback only once', async () => {
    const listeners = new Map();
    window.addEventListener = vi.fn((type, listener) => listeners.set(type, listener));
    window.removeEventListener = vi.fn();
    const { installAudioUnlock } = await import('./speech.js');
    installAudioUnlock();
    installAudioUnlock();
    expect(window.addEventListener).toHaveBeenCalledTimes(4);
    listeners.get('pointerdown')();
    expect(instances).toHaveLength(1);
    expect(instances[0].play).toHaveBeenCalledTimes(1);
  });
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
