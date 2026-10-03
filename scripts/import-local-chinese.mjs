import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, realpathSync, renameSync, writeFileSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectAudioCatalog } from "./lib/audio-catalog.mjs";
import { sha256 } from "./lib/google-audio-plan.mjs";
import { prepareChineseImport } from "./lib/chinese-import.mjs";

const args = process.argv.slice(2), dirIndex = args.indexOf("--results-dir");
if (dirIndex < 0 || !args[dirIndex + 1]) throw new Error("Required: --results-dir <approved isolated local Chinese output>");
const sourceRoot = realpathSync(path.resolve(args[dirIndex + 1]));
const source = (file) => {
  const resolved = path.resolve(sourceRoot, file);
  if (!resolved.startsWith(`${sourceRoot}${path.sep}`) || lstatSync(resolved).isSymbolicLink()
    || !realpathSync(resolved).startsWith(`${sourceRoot}${path.sep}`)) throw new Error("Unsafe Chinese output path.");
  return resolved;
};
const audioRoot = fileURLToPath(new URL("../public/audio/", import.meta.url)), manifestPath = path.join(audioRoot, "manifest.json");
const original = readFileSync(manifestPath), existing = JSON.parse(original);
const staged = JSON.parse(readFileSync(source("manifest.json")));
const prepared = prepareChineseImport(existing, collectAudioCatalog(), staged, (file) => readFileSync(source(file)));
const originalChinese = Object.entries(existing.clips).filter(([key]) => key.startsWith("zh-TW:"));
const oldHashes = new Map(originalChinese.map(([key, clip]) => [key, sha256(readFileSync(path.join(audioRoot, clip.file)))]));
const run = promisify(execFile);
for (const entry of prepared.missing) await run("ffmpeg", ["-v", "error", "-xerror", "-i", source(entry.file), "-f", "null", "-"], { timeout: 30000, maxBuffer: 65536 });
if (sha256(readFileSync(manifestPath)) !== sha256(original)) throw new Error("Active manifest changed during validation; rerun.");
for (const [key, clip] of originalChinese) if (oldHashes.get(key) !== sha256(readFileSync(path.join(audioRoot, clip.file)))) throw new Error("Existing Chinese audio changed.");
if (args.includes("--apply")) {
  mkdirSync(audioRoot, { recursive: true });
  for (const entry of prepared.missing) {
    const destination = path.join(audioRoot, entry.file);
    if (existsSync(destination) && sha256(readFileSync(destination)) !== prepared.manifest.clips[entry.key].sha256) throw new Error("Existing destination differs; inspect before overwriting.");
    copyFileSync(source(entry.file), destination);
  }
  writeFileSync(`${manifestPath}.partial`, `${JSON.stringify(prepared.manifest, null, 2)}\n`);
  renameSync(`${manifestPath}.partial`, manifestPath);
}
console.log(JSON.stringify({ applied: args.includes("--apply"), decodedNewChinese: prepared.missing.length,
  preservedExistingChinese: originalChinese.length, activeManifestComplete: prepared.manifest.complete }, null, 2));
