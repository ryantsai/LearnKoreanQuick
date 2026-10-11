import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { selectDeltaPlan } from "./lib/chirp-import.mjs";

const args = process.argv.slice(2);
const value = (flag) => args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined;
const plan = JSON.parse(readFileSync(path.resolve(value("--plan") ?? "tmp/google-audio-plan.json"), "utf8"));
const manifest = JSON.parse(readFileSync(new URL("../public/audio/manifest.json", import.meta.url), "utf8"));
// Only requests with no published clip are sent to Google; published requests are kept.
const delta = selectDeltaPlan(plan, manifest);
const output = path.resolve(value("--output") ?? "tmp/google-audio-delta-plan.json");
mkdirSync(path.dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify(delta, null, 2)}\n`);
console.log(JSON.stringify({ output, sourceFingerprint: plan.fingerprint, delta: delta.delta, budget: delta.budget }, null, 2));
