import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { courseLessons } from '../src/data/courseLessons.js';
import { specialCourses } from '../src/data/specialCourses.js';
import { lessonData } from '../src/data/lessonData.js';
import { letterPages } from '../src/data/letterPages.js';
import { novelData } from '../src/data/novelData.js';
import { buildVocabularyIndex } from '../src/data/vocabularyIndex.js';

const entries = new Map();
let priority = 1;
function add(text, lang) {
  if (typeof text !== 'string') return;
  text = text.normalize('NFC').trim().replace(/\s+/g, ' ');
  if (!text || (lang === 'ko-KR' && !/[가-힣ㄱ-ㅎㅏ-ㅣ]/u.test(text))) return;
  const key = `${lang}:${text}`;
  if (entries.has(key)) return;
  entries.set(key, { key, text, lang, priority, file: `${createHash('sha256').update(key).digest('hex').slice(0, 24)}.mp3` });
}
function word(item, bilingual = true) {
  add(item.text ?? item.hangul, 'ko-KR');
  if (bilingual) add(item.zh, 'zh-TW');
}
const lessons = [...courseLessons.slice(-2), ...courseLessons.slice(0, -2), ...specialCourses];
for (const lesson of lessons) {
  priority = ["b1-15", "b1-16"].includes(lesson.id) ? 0 : 1;
  add(lesson.titleKo, 'ko-KR');
  for (const dialogue of lesson.dialogues ?? []) {
    for (const line of dialogue.lines) {
      add(line.ko, 'ko-KR'); add(line.zh, 'zh-TW');
      line.tokens.forEach(item => word(item, false));
    }
  }
  for (const item of [...lesson.vocabulary, ...(lesson.notes ?? [])]) word(item);
  for (const section of lesson.guide?.sections ?? []) section.words.forEach(item => word(item));
  for (const item of lesson.guide?.practice?.items ?? []) word(item.answer, false);
}
priority = 2;
for (const item of buildVocabularyIndex([...courseLessons, ...specialCourses])) {
  word(item);
  item.pronunciationCases.forEach(c => add(c.written, 'ko-KR'));
  item.examples.forEach(e => add(e.ko, 'ko-KR'));
}
for (const item of [...lessonData.vowels, ...lessonData.consonants]) add(item.symbol, 'ko-KR');
lessonData.words.forEach(item => word(item, false));
function walkKorean(value) {
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value)) { value.forEach(walkKorean); return; }
  for (const key of ['text', 'hangul', 'symbol']) add(value[key], 'ko-KR');
  Object.values(value).forEach(walkKorean);
}
walkKorean([letterPages, novelData]);
const catalog = [...entries.values()].sort((a,b) => a.priority-b.priority || a.lang.localeCompare(b.lang) || a.text.length-b.text.length || a.key.localeCompare(b.key));
mkdirSync('public/audio', { recursive: true });
writeFileSync('public/audio/catalog.json', JSON.stringify({ version: 1, entries: catalog }, null, 2)+'\n');
console.log(`Catalog: ${catalog.length} unique clips (${catalog.filter(e=>e.lang==='ko-KR').length} Korean).`);
