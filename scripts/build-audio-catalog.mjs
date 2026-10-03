import { mkdirSync, writeFileSync } from 'node:fs';
import { collectAudioCatalog } from './lib/audio-catalog.mjs';

const catalog = collectAudioCatalog();
mkdirSync('public/audio', { recursive: true });
writeFileSync('public/audio/catalog.json', JSON.stringify(catalog, null, 2)+'\n');
console.log(`Catalog: ${catalog.entries.length} unique clips (${catalog.entries.filter(e=>e.lang==='ko-KR').length} Korean).`);
