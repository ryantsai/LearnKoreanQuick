import { BASELINE_KOREAN_VOICE } from "../../src/utils/dialogueVoice.js";

// Offline adapter for the separately owned manifest-bound synthesis runner.
// The runner receives one output per unique request; local aliases are kept in
// the plan and restored when importing the verified result.
export function buildChirpManifest(plan, project, sourceRef) {
  if (!project || !/^[a-z][a-z0-9-]+$/.test(project)) throw new Error("Supply the approved Google project ID.");
  if (plan.budget.totalUsd !== 2) throw new Error("The batch runner requires the approved US$2 cap.");
  const voices = { narrator: BASELINE_KOREAN_VOICE, dialogue_charon: "ko-KR-Chirp3-HD-Charon" };
  return {
    schema_version: 1, project, budget_usd: "2.00", language_code: "ko-KR", speaking_rate: 1.0, voices,
    items: plan.requests.map((request) => {
      const role = Object.keys(voices).find((key) => voices[key] === request.voice);
      if (!role) throw new Error(`Unapproved batch voice: ${request.voice}`);
      const courseIds = [...new Set(request.aliases.flatMap((alias) => alias.lessons))].sort();
      const reference = sourceRef?.(request) ?? (courseIds.length
        ? `repository lesson data: ${courseIds.join(", ")}; vocabularyIndex.js noun exercises where applicable`
        : "repository shared material: lessonData.js, letterPages.js, novelData.js, vocabularyIndex.js");
      if (!reference) throw new Error(`Missing source reference for ${request.key}`);
      const text = request.payload.input.text;
      return { id: request.requestHash, course_id: courseIds.join(",") || "shared-material", role, text,
        output: `public/audio/chirp3-hd/${request.file}`, source_ref: reference,
        characters: [...text].length, utf8_bytes: Buffer.byteLength(text) };
    }),
  };
}
