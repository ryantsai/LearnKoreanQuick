import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { collectAudioCatalog } from "./lib/audio-catalog.mjs";

const args = process.argv.slice(2), outputIndex = args.indexOf("--output");
const output = path.resolve(outputIndex >= 0 ? args[outputIndex + 1] : "tmp/chinese-missing-keys.json");
const manifest = JSON.parse(readFileSync(new URL("../public/audio/manifest.json", import.meta.url)));
const missing = collectAudioCatalog().entries.filter((entry) => entry.lang === "zh-TW" && !manifest.clips[entry.key]);
mkdirSync(path.dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify(missing.map((entry) => entry.key), null, 2)}\n`);
console.log(JSON.stringify({ output, missingChineseClips: missing.length, existingChineseClips: Object.keys(manifest.clips).filter((key) => key.startsWith("zh-TW:")).length, synthesisPerformed: false }, null, 2));
