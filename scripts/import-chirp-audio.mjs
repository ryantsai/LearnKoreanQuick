import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, realpathSync, renameSync, writeFileSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { courseLessons } from "../src/data/courseLessons.js";
import { specialCourses } from "../src/data/specialCourses.js";
import { collectAudioCatalog } from "./lib/audio-catalog.mjs";
import { buildGoogleAudioPlan, sha256 } from "./lib/google-audio-plan.mjs";
import { buildImportedManifest, validateChirpResults } from "./lib/chirp-import.mjs";

const args = process.argv.slice(2);
const value = (flag) => args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined;
for (const flag of ["--plan", "--batch", "--results-dir"]) if (!value(flag)) throw new Error(`Required: ${flag}`);
const root = realpathSync(path.resolve(value("--results-dir")));
const source = (relative) => {
  const filename = path.resolve(root, relative);
  if (!filename.startsWith(`${root}${path.sep}`) || lstatSync(filename).isSymbolicLink()
    || !realpathSync(filename).startsWith(`${root}${path.sep}`)) throw new Error("Unsafe result path.");
  return filename;
};
const json = (filename) => JSON.parse(readFileSync(filename));
const plan = json(value("--plan"));
const batchBytes = readFileSync(value("--batch"));
const batch = JSON.parse(batchBytes), batchHash = sha256(batchBytes);
const results = json(source("audio-results.json"));
const verified = validateChirpResults(plan, batch, batchHash, results, (relative) => readFileSync(source(relative)));
const audioRoot = fileURLToPath(new URL("../public/audio/", import.meta.url));
const manifestPath = path.join(audioRoot, "manifest.json");
const oldBytes = readFileSync(manifestPath), existing = JSON.parse(oldBytes);
const activePlan = buildGoogleAudioPlan(collectAudioCatalog(), [...courseLessons, ...specialCourses]);
const imported = buildImportedManifest(existing, activePlan, plan, verified, batchHash);
const chinese = Object.entries(existing.clips).filter(([key]) => key.startsWith("zh-TW:"));
const chineseHashes = new Map(chinese.map(([key, clip]) => [key, sha256(readFileSync(path.join(audioRoot, clip.file)))]));
const run = promisify(execFile);
const pending = [...verified.values()];
let next = 0, decoded = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (next < pending.length) {
    const output = pending[next++];
    await run("ffmpeg", ["-v", "error", "-xerror", "-i", source(output.item.output), "-f", "null", "-"], { timeout: 30000, maxBuffer: 65536 });
    decoded += 1;
    if (decoded % 250 === 0) console.log(`Decoded ${decoded}/${pending.length} MP3 files.`);
  }
}));
// Fail if another task changed the active manifest during the full decode.
if (sha256(readFileSync(manifestPath)) !== sha256(oldBytes)) throw new Error("Active manifest changed during verification; rerun before applying.");
for (const [key, clip] of chinese) if (chineseHashes.get(key) !== sha256(readFileSync(path.join(audioRoot, clip.file)))) throw new Error("Existing Chinese audio changed during verification.");
if (args.includes("--apply")) {
  const requiredFiles = new Set(Object.entries(imported.clips).filter(([key]) => key.startsWith("ko-KR:")).map(([, clip]) => clip.file));
  for (const file of requiredFiles) {
    const destination = path.join(audioRoot, file);
    mkdirSync(path.dirname(destination), { recursive: true });
    const input = source(`public/audio/${file}`);
    if (existsSync(destination) && sha256(readFileSync(destination)) !== sha256(readFileSync(input))) throw new Error("Existing Chirp asset differs; inspect before overwriting.");
    copyFileSync(input, destination);
  }
  writeFileSync(`${manifestPath}.partial`, `${JSON.stringify(imported, null, 2)}\n`);
  renameSync(`${manifestPath}.partial`, manifestPath);
}
console.log(JSON.stringify({ batchHash, decoded, applied: args.includes("--apply"),
  koreanPlaybackKeys: Object.keys(imported.clips).filter((key) => key.startsWith("ko-KR:")).length,
  preservedChineseClips: chinese.length, accountedCostUsd: results.accounted_cost_ceiling_usd,
  excludedDraftOutputs: plan.requests.length - new Set(Object.entries(imported.clips).filter(([key]) => key.startsWith("ko-KR:")).map(([, clip]) => clip.file)).size }, null, 2));
