import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectAudioCatalog } from "./lib/audio-catalog.mjs";
import { sha256 } from "./lib/google-audio-plan.mjs";
import { chineseSpokenText, macosSayArguments, MACOS_CHINESE_MODEL, MEIJIA_VOICE } from "./lib/macos-chinese.mjs";

const run = promisify(execFile), args = process.argv.slice(2), outputIndex = args.indexOf("--output-dir");
const output = path.resolve(outputIndex >= 0 ? args[outputIndex + 1] : "tmp/chinese-meijia");
const audioRoot = fileURLToPath(new URL("../public/audio/", import.meta.url));
if (output === path.resolve(audioRoot) || output.startsWith(`${path.resolve(audioRoot)}${path.sep}`)) throw new Error("Generate to an isolated staging directory.");
const existing = JSON.parse(readFileSync(path.join(audioRoot, "manifest.json")));
const missing = collectAudioCatalog().entries.filter((entry) => entry.lang === "zh-TW" && !existing.clips[entry.key]);
if (missing.length !== 64) throw new Error(`This approved operation is exactly 64 missing Chinese clips; found ${missing.length}.`);
console.log(JSON.stringify({ output, clips: missing.length, voice: MEIJIA_VOICE, locale: "zh_TW", synthesisRate: "default", paidCostUsd: 0, execute: args.includes("--execute") }));
if (!args.includes("--execute")) process.exit(0);
if (process.platform !== "darwin") throw new Error("This generator requires the installed macOS Taiwan voice.");
const installed = await run("/usr/bin/say", ["-v", "?"]);
if (!installed.stdout.split("\n").some((line) => line.startsWith(MEIJIA_VOICE) && /\bzh_TW\b/.test(line))) throw new Error("The approved Taiwan voice is not installed; no downloads are attempted.");
const systemVersion = (await run("/usr/bin/sw_vers", ["-productVersion"])).stdout.trim();
const recipe = { model: MACOS_CHINESE_MODEL, voice: MEIJIA_VOICE, locale: "zh_TW", synthesisRate: "default",
  inputEncoding: "UTF-8", audioEncoding: "MP3", bitrateKbps: 96, systemVersion,
  generatorSha256: sha256(readFileSync(fileURLToPath(import.meta.url))) };
const manifest = { version: 1, model: MACOS_CHINESE_MODEL, fingerprint: sha256(JSON.stringify(recipe)),
  speakers: { "zh-TW": MEIJIA_VOICE }, locale: "zh_TW", synthesisRate: "default", recipe, complete: false, clips: {} };
mkdirSync(output, { recursive: true });
mkdirSync(path.join(output, "inputs"), { recursive: true });
mkdirSync(path.join(output, "aiff"), { recursive: true });
for (const [index, entry] of missing.entries()) {
  const spokenText = chineseSpokenText(entry.text), stem = entry.file.replace(/\.mp3$/, "");
  if (!/[\p{Script=Han}]/u.test(spokenText) || /[가-힣ㄱ-ㅎㅏ-ㅣ]/u.test(spokenText)) throw new Error("Review mixed-language Chinese narration before synthesis.");
  const input = path.join(output, "inputs", `${stem}.txt`), aiff = path.join(output, "aiff", `${stem}.aiff`), destination = path.join(output, entry.file);
  writeFileSync(input, spokenText, "utf8");
  if (readFileSync(input, "utf8") !== spokenText) throw new Error("UTF-8 round trip failed.");
  await run("/usr/bin/say", macosSayArguments(input, aiff), { timeout: 30000 });
  await run("ffmpeg", ["-v", "error", "-y", "-i", aiff, "-codec:a", "libmp3lame", "-b:a", "96k", destination], { timeout: 30000 });
  const info = JSON.parse((await run("ffprobe", ["-v", "error", "-show_entries", "format=duration:stream=sample_rate,channels", "-of", "json", destination])).stdout);
  const duration = Number(info.format.duration);
  const decoded = (await run("ffmpeg", ["-v", "error", "-xerror", "-i", destination, "-f", "f32le", "-acodec", "pcm_f32le", "-ac", "1", "pipe:1"], { encoding: "buffer", timeout: 30000, maxBuffer: 8_000_000 })).stdout;
  let peak = 0, squares = 0;
  for (let offset = 0; offset + 4 <= decoded.length; offset += 4) {
    const value = decoded.readFloatLE(offset);
    if (!Number.isFinite(value)) throw new Error("Invalid decoded audio samples.");
    peak = Math.max(peak, Math.abs(value)); squares += value * value;
  }
  const rms = Math.sqrt(squares / (decoded.length / 4));
  if (!Number.isFinite(duration) || duration <= 0.12 || duration > 3 + [...spokenText].length * 0.7 || peak < 0.002 || rms < 0.001) throw new Error(`Invalid/silent/excess speech: ${entry.key}`);
  const bytes = readFileSync(destination), hash = sha256(bytes);
  manifest.clips[entry.key] = { file: entry.file, duration, revision: hash.slice(0, 16), sha256: hash,
    voice: MEIJIA_VOICE, provider: MACOS_CHINESE_MODEL, locale: "zh_TW", synthesisRate: "default",
    sourceTextSha256: sha256(entry.text), inputSha256: sha256(spokenText), spokenText,
    normalization: spokenText === entry.text ? "Traditional Chinese NFC; text unchanged" : "Korean grammar labels spoken as Chinese meanings: 如果 / 之後",
    sampleRate: Number(info.streams[0].sample_rate), channels: info.streams[0].channels,
    decodedPeak: Number(peak.toFixed(6)), decodedRms: Number(rms.toFixed(6)), recipeFingerprint: manifest.fingerprint };
  writeFileSync(path.join(output, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  if ((index + 1) % 8 === 0) console.log(`Generated and decoded ${index + 1}/${missing.length} Taiwan Chinese clips.`);
}
manifest.complete = true;
writeFileSync(path.join(output, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ output, complete: true, clips: Object.keys(manifest.clips).length, fingerprint: manifest.fingerprint, paidCostUsd: 0 }));
