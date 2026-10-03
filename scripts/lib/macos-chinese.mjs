export const MACOS_CHINESE_MODEL = "macOS Speech Synthesis";
export const MEIJIA_VOICE = "Meijia (Chinese (Taiwan))";

export function chineseSpokenText(text) {
  const normalized = text.normalize("NFC").trim().replace(/\s+/g, " ");
  // The Chinese cue explains the grammar; do not ask a Mandarin voice to read
  // the Hangul ending labels. Keep the original display/audio key unchanged.
  return normalized === "請自行使用 -(으)면 或 -(으)ㄴ 후에 回答。"
    ? "請自行使用「如果」或「之後」的句型回答。" : normalized;
}

export function macosSayArguments(input, output) {
  // No -r or other rate adjustment: the installed voice's normal default.
  return ["-v", MEIJIA_VOICE, "-f", input, "-o", output];
}
