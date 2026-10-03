import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { courseLessons } from "../src/data/courseLessons.js";
import { specialCourses } from "../src/data/specialCourses.js";
import { collectAudioCatalog, mergeAudioCatalogs } from "./lib/audio-catalog.mjs";
import { buildGoogleAudioPlan } from "./lib/google-audio-plan.mjs";

const args = process.argv.slice(2);
const value = (flag) => args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined;
const extraPath = value("--extra-lessons");
const extras = extraPath ? (await import(pathToFileURL(path.resolve(extraPath)).href)).default : [];
if (!Array.isArray(extras)) throw new Error("Extra lesson module must export a default array.");
// New lesson contexts can displace a fallback dictionary example. Fund both
// current playback and the reviewed draft, so the current site stays covered.
const catalog = mergeAudioCatalogs(collectAudioCatalog(), collectAudioCatalog(extras));
const existingManifest = JSON.parse(readFileSync(new URL("../public/audio/manifest.json", import.meta.url)));
const existingChineseKeys = new Set(Object.keys(existingManifest.clips).filter((key) => key.startsWith("zh-TW:")));
const plan = buildGoogleAudioPlan(catalog, [...courseLessons, ...extras, ...specialCourses], { existingChineseKeys });
const output = path.resolve(value("--output") ?? "tmp/google-audio-plan.json");
mkdirSync(path.dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify(plan, null, 2)}\n`);
console.log(JSON.stringify({ output, fingerprint: plan.fingerprint, counts: plan.counts, budget: plan.budget }, null, 2));
