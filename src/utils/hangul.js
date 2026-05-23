export function getInitialSelection(words) {
  const firstWord = words[0];
  return {
    wordId: firstWord.id,
    syllableIndex: 0,
    partIndex: null
  };
}

export function getSelectedWord(words, selection) {
  return words.find((word) => word.id === selection.wordId) ?? words[0];
}

export function getSelectedSyllable(word, selection) {
  return word.syllables[selection.syllableIndex] ?? word.syllables[0];
}

export function getSelectedPart(syllable, selection) {
  if (selection.partIndex === null || selection.partIndex === undefined) {
    return null;
  }

  return syllable.parts[selection.partIndex] ?? null;
}

export function describeSelection(word, syllable, part) {
  if (part) {
    return {
      title: part.jamo,
      pronunciation: part.sound,
      description: `${syllable.block} 裡面的 ${part.jamo} 發音接近 ${part.sound}`
    };
  }

  return {
    title: syllable.block,
    pronunciation: syllable.roman,
    description: `${syllable.parts.map((partItem) => partItem.jamo).join(" + ")} = ${syllable.block}`
  };
}

export function createSessionSnapshot(state) {
  return {
    selected: state.selected,
    viewedLetters: Array.from(state.viewedLetters),
    practicedWords: Array.from(state.practicedWords),
    practiceCount: state.practiceCount,
    activeLetterSymbol: state.activeLetterSymbol
  };
}

export function restoreSessionSnapshot(rawValue, fallbackSelection) {
  if (!rawValue) {
    return {
      selected: fallbackSelection,
      viewedLetters: new Set(),
      practicedWords: new Set(),
      practiceCount: 0
    };
  }

  try {
    const parsed = JSON.parse(rawValue);
    return {
      selected: parsed.selected ?? fallbackSelection,
      viewedLetters: new Set(parsed.viewedLetters ?? []),
      practicedWords: new Set(parsed.practicedWords ?? []),
      practiceCount: Number(parsed.practiceCount ?? 0),
      activeLetterSymbol: parsed.activeLetterSymbol
    };
  } catch {
    return {
      selected: fallbackSelection,
      viewedLetters: new Set(),
      practicedWords: new Set(),
      practiceCount: 0
    };
  }
}

const initialJamo = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ"
];

const medialJamo = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ"
];

const finalJamo = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ"
];

const jamoSounds = {
  ㄱ: "g/k",
  ㄲ: "kk",
  ㄳ: "ks",
  ㄴ: "n",
  ㄵ: "nj",
  ㄶ: "nh",
  ㄷ: "d/t",
  ㄸ: "tt",
  ㄹ: "r/l",
  ㄺ: "lg",
  ㄻ: "lm",
  ㄼ: "lb",
  ㄽ: "ls",
  ㄾ: "lt",
  ㄿ: "lp",
  ㅀ: "lh",
  ㅁ: "m",
  ㅂ: "b/p",
  ㅃ: "pp",
  ㅄ: "ps",
  ㅅ: "s",
  ㅆ: "ss",
  ㅇ: "silent/ng",
  ㅈ: "j",
  ㅉ: "jj",
  ㅊ: "ch",
  ㅋ: "k",
  ㅌ: "t",
  ㅍ: "p",
  ㅎ: "h",
  ㅏ: "a",
  ㅐ: "ae",
  ㅑ: "ya",
  ㅒ: "yae",
  ㅓ: "eo",
  ㅔ: "e",
  ㅕ: "yeo",
  ㅖ: "ye",
  ㅗ: "o",
  ㅘ: "wa",
  ㅙ: "wae",
  ㅚ: "oe",
  ㅛ: "yo",
  ㅜ: "u",
  ㅝ: "wo",
  ㅞ: "we",
  ㅟ: "wi",
  ㅠ: "yu",
  ㅡ: "eu",
  ㅢ: "ui",
  ㅣ: "i"
};

export function decomposeHangulWord(hangul, roman = "") {
  const romanParts = roman.split("-").filter(Boolean);

  return [...hangul].map((block, index) => {
    const code = block.charCodeAt(0);
    const offset = code - 0xac00;

    if (offset < 0 || offset > 11171) {
      return {
        block,
        roman: romanParts[index] ?? block,
        parts: [{ jamo: block, sound: romanParts[index] ?? block }]
      };
    }

    const initialIndex = Math.floor(offset / 588);
    const medialIndex = Math.floor((offset % 588) / 28);
    const finalIndex = offset % 28;
    const jamos = [initialJamo[initialIndex], medialJamo[medialIndex]];

    if (finalIndex > 0) {
      jamos.push(finalJamo[finalIndex]);
    }

    return {
      block,
      roman: romanParts[index] ?? jamos.map((jamo) => jamoSounds[jamo]).join(""),
      parts: jamos.map((jamo) => ({
        jamo,
        sound: jamoSounds[jamo] ?? jamo
      }))
    };
  });
}
