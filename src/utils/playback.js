export function buildDialoguePlaybackItems(dialogue, includeChinese = false) {
  return dialogue.lines.flatMap((line, lineIndex) => {
    const koreanItems = /[가-힣]/u.test(line.ko ?? '') ? [{
      type: 'korean', text: line.ko, lineIndex, tokenIndex: null,
    }] : [];
    if (!includeChinese) return koreanItems;
    return [...koreanItems, { type: 'chinese', text: line.zh, lineIndex, tokenIndex: null }];
  });
}

export function buildVocabularyPlaybackItems(words, includeChinese = false) {
  return words.flatMap((word, wordIndex) => {
    const koreanItem = { type: 'korean', text: word.text, wordIndex };
    if (!includeChinese) return [koreanItem];
    return [koreanItem, { type: 'chinese', text: word.zh, wordIndex }];
  });
}
