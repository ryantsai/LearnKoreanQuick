const baseUrl = import.meta.env?.BASE_URL ?? "/LearnKoreanQuick/";

export function assetPath(path) {
  return `${baseUrl}${path}`;
}
