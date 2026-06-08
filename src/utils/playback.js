export function buildDialoguePlaybackItems(dialogue, includeChinese = false) {
  return dialogue.lines.flatMap((line, lineIndex) => {
    const koreanItems = line.tokens.map((token, tokenIndex) => ({
      type: "korean",
      text: token.text,
      lineIndex,
      tokenIndex,
    }));

    if (!includeChinese) {
      return koreanItems;
    }

    return [
      ...koreanItems,
      {
        type: "chinese",
        text: line.zh,
        lineIndex,
        tokenIndex: null,
      },
    ];
  });
}

export function buildVocabularyPlaybackItems(words, includeChinese = false) {
  return words.flatMap((word, wordIndex) => {
    const koreanItem = {
      type: "korean",
      text: word.text,
      wordIndex,
    };

    if (!includeChinese) {
      return [koreanItem];
    }

    return [
      koreanItem,
      {
        type: "chinese",
        text: word.zh,
        wordIndex,
      },
    ];
  });
}
