import { readFileSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { courseLessons } from '../src/data/courseLessons.js';
import { specialCourses } from '../src/data/specialCourses.js';
import { audioKey } from '../src/utils/audioIdentity.js';
import { BASELINE_KOREAN_VOICE, getDialogueVoice } from '../src/utils/dialogueVoice.js';
const root = new URL('../public/audio/', import.meta.url);
const catalog = JSON.parse(readFileSync(new URL('catalog.json', root))).entries;
const manifest = JSON.parse(readFileSync(new URL('manifest.json', root)));
const required = catalog.map(entry => ({ ...entry, voice: entry.lang === 'ko-KR' ? BASELINE_KOREAN_VOICE : undefined }));
if (manifest.voiceVariants) for (const lesson of [...courseLessons, ...specialCourses]) for (const dialogue of lesson.dialogues ?? []) for (const line of dialogue.lines ?? []) {
  const text = line.spokenKo ?? line.ko;
  if (!/[가-힣]/u.test(text ?? '')) continue;
  const voice = getDialogueVoice(line.speaker);
  required.push({ key: audioKey(text, 'ko-KR', voice), lang: 'ko-KR', voice });
}
const missing = required.filter(entry => {
  const clip = manifest.clips[entry.key];
  if (!clip || !/^(?:chirp3-hd\/)?[a-f0-9]{24}\.mp3$/.test(clip.file) || !existsSync(new URL(clip.file, root)) || statSync(new URL(clip.file, root)).size < 500 || !(clip.duration > 0)) return true;
  if (manifest.voiceVariants && entry.lang === 'ko-KR') return clip.voice !== entry.voice || !clip.file.startsWith('chirp3-hd/')
    || createHash('sha256').update(readFileSync(new URL(clip.file, root))).digest('hex') !== clip.sha256;
  return clip.file !== entry.file;
});
if (missing.length) {
  console.error(`${missing.length}/${required.length} recordings are missing or invalid. Verify/import the appropriate provider's recordings.`, missing.slice(0, 5).map(e => e.key));
  process.exitCode = 1;
} else {
  console.log(`All ${catalog.length} playable texts have local ${manifest.model} recordings.`);
}
