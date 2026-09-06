import { readFileSync, existsSync, statSync } from 'node:fs';
const root = new URL('../public/audio/', import.meta.url);
const catalog = JSON.parse(readFileSync(new URL('catalog.json', root))).entries;
const manifest = JSON.parse(readFileSync(new URL('manifest.json', root)));
const missing = catalog.filter(entry => {
  const clip = manifest.clips[entry.key];
  return !clip || clip.file !== entry.file || !existsSync(new URL(clip.file, root)) || statSync(new URL(clip.file, root)).size < 500 || !(clip.duration > 0);
});
if (missing.length) {
  console.error(`${missing.length}/${catalog.length} recordings are missing or invalid. Run npm run audio:generate.`, missing.slice(0, 5).map(e => e.key));
  process.exitCode = 1;
} else {
  console.log(`All ${catalog.length} playable texts have local ${manifest.model} recordings.`);
}
