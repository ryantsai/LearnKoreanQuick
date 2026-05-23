export const lessonData = {
  vowels: [
    { id: "v-a", symbol: "ㅏ", roman: "a", zh: "像中文「啊」", example: "아" },
    { id: "v-ae", symbol: "ㅐ", roman: "ae", zh: "像較扁的 e", example: "애" },
    { id: "v-ya", symbol: "ㅑ", roman: "ya", zh: "像「呀」", example: "야" },
    { id: "v-yae", symbol: "ㅒ", roman: "yae", zh: "ya + ae", example: "얘" },
    { id: "v-eo", symbol: "ㅓ", roman: "eo", zh: "嘴巴放鬆的「喔」", example: "어" },
    { id: "v-e", symbol: "ㅔ", roman: "e", zh: "像 e", example: "에" },
    { id: "v-yeo", symbol: "ㅕ", roman: "yeo", zh: "像「呦」的開口版", example: "여" },
    { id: "v-ye", symbol: "ㅖ", roman: "ye", zh: "ye 的聲音", example: "예" },
    { id: "v-o", symbol: "ㅗ", roman: "o", zh: "圓唇的 o", example: "오" },
    { id: "v-wa", symbol: "ㅘ", roman: "wa", zh: "ㅗ + ㅏ", example: "와" },
    { id: "v-wae", symbol: "ㅙ", roman: "wae", zh: "ㅗ + ㅐ", example: "왜" },
    { id: "v-oe", symbol: "ㅚ", roman: "oe", zh: "近似 we", example: "외" },
    { id: "v-yo", symbol: "ㅛ", roman: "yo", zh: "像「唷」", example: "요" },
    { id: "v-u", symbol: "ㅜ", roman: "u", zh: "像「屋」", example: "우" },
    { id: "v-wo", symbol: "ㅝ", roman: "wo", zh: "ㅜ + ㅓ", example: "워" },
    { id: "v-we", symbol: "ㅞ", roman: "we", zh: "ㅜ + ㅔ", example: "웨" },
    { id: "v-wi", symbol: "ㅟ", roman: "wi", zh: "像 wi", example: "위" },
    { id: "v-yu", symbol: "ㅠ", roman: "yu", zh: "像「油」", example: "유" },
    { id: "v-eu", symbol: "ㅡ", roman: "eu", zh: "嘴角拉平的 u", example: "으" },
    { id: "v-ui", symbol: "ㅢ", roman: "ui", zh: "ㅡ + ㅣ", example: "의" },
    { id: "v-i", symbol: "ㅣ", roman: "i", zh: "像「衣」", example: "이" }
  ],
  consonants: [
    { id: "c-g", symbol: "ㄱ", roman: "g/k", zh: "像 g 與 k 之間", example: "가" },
    { id: "c-kk", symbol: "ㄲ", roman: "kk", zh: "緊一點的 k", example: "까" },
    { id: "c-n", symbol: "ㄴ", roman: "n", zh: "像 n", example: "나" },
    { id: "c-d", symbol: "ㄷ", roman: "d/t", zh: "像 d 與 t 之間", example: "다" },
    { id: "c-tt", symbol: "ㄸ", roman: "tt", zh: "緊一點的 t", example: "따" },
    { id: "c-r", symbol: "ㄹ", roman: "r/l", zh: "像 r 與 l 之間", example: "라" },
    { id: "c-m", symbol: "ㅁ", roman: "m", zh: "像 m", example: "마" },
    { id: "c-b", symbol: "ㅂ", roman: "b/p", zh: "像 b 與 p 之間", example: "바" },
    { id: "c-pp", symbol: "ㅃ", roman: "pp", zh: "緊一點的 p", example: "빠" },
    { id: "c-s", symbol: "ㅅ", roman: "s", zh: "像 s", example: "사" },
    { id: "c-ss", symbol: "ㅆ", roman: "ss", zh: "緊一點的 s", example: "싸" },
    { id: "c-ng", symbol: "ㅇ", roman: "ng / silent", zh: "開頭不發音，收尾像 ng", example: "아" },
    { id: "c-j", symbol: "ㅈ", roman: "j", zh: "像 j", example: "자" },
    { id: "c-jj", symbol: "ㅉ", roman: "jj", zh: "緊一點的 j", example: "짜" },
    { id: "c-ch", symbol: "ㅊ", roman: "ch", zh: "像 ch", example: "차" },
    { id: "c-k", symbol: "ㅋ", roman: "k", zh: "送氣 k", example: "카" },
    { id: "c-t", symbol: "ㅌ", roman: "t", zh: "送氣 t", example: "타" },
    { id: "c-p", symbol: "ㅍ", roman: "p", zh: "送氣 p", example: "파" },
    { id: "c-h", symbol: "ㅎ", roman: "h", zh: "像 h", example: "하" }
  ],
  words: [
    {
      id: "gabang",
      hangul: "가방",
      meaning: "書包",
      roman: "ga-bang",
      asset: "/assets/word-gabang.png",
      hint: "上學時背的包包",
      syllables: [
        { block: "가", roman: "ga", parts: [{ jamo: "ㄱ", sound: "g/k" }, { jamo: "ㅏ", sound: "a" }] },
        { block: "방", roman: "bang", parts: [{ jamo: "ㅂ", sound: "b/p" }, { jamo: "ㅏ", sound: "a" }, { jamo: "ㅇ", sound: "ng" }] }
      ]
    },
    {
      id: "namu",
      hangul: "나무",
      meaning: "樹",
      roman: "na-mu",
      asset: "/assets/word-namu.png",
      hint: "公園裡會看到的樹",
      syllables: [
        { block: "나", roman: "na", parts: [{ jamo: "ㄴ", sound: "n" }, { jamo: "ㅏ", sound: "a" }] },
        { block: "무", roman: "mu", parts: [{ jamo: "ㅁ", sound: "m" }, { jamo: "ㅜ", sound: "u" }] }
      ]
    },
    {
      id: "banana",
      hangul: "바나나",
      meaning: "香蕉",
      roman: "ba-na-na",
      asset: "/assets/word-banana.png",
      hint: "韓文和中文外來音都很好記",
      syllables: [
        { block: "바", roman: "ba", parts: [{ jamo: "ㅂ", sound: "b/p" }, { jamo: "ㅏ", sound: "a" }] },
        { block: "나", roman: "na", parts: [{ jamo: "ㄴ", sound: "n" }, { jamo: "ㅏ", sound: "a" }] },
        { block: "나", roman: "na", parts: [{ jamo: "ㄴ", sound: "n" }, { jamo: "ㅏ", sound: "a" }] }
      ]
    },
    {
      id: "uyu",
      hangul: "우유",
      meaning: "牛奶",
      roman: "u-yu",
      asset: "/assets/word-uyu.png",
      hint: "兩個母音音節連在一起",
      syllables: [
        { block: "우", roman: "u", parts: [{ jamo: "ㅇ", sound: "silent" }, { jamo: "ㅜ", sound: "u" }] },
        { block: "유", roman: "yu", parts: [{ jamo: "ㅇ", sound: "silent" }, { jamo: "ㅠ", sound: "yu" }] }
      ]
    }
  ]
};
