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
