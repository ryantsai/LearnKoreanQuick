const koreanPattern = /[가-힣]/;

function addCandidate(bucket, lesson, item, context = null) {
  if (!item?.text || !koreanPattern.test(item.text)) return;

  const key = item.text.trim();
  const current = bucket.get(key) ?? {
    ...item,
    lessons: [],
    contexts: []
  };

  if (!current.lessons.some((entry) => entry.id === lesson.id)) {
    current.lessons.push({ id: lesson.id, label: lesson.label });
  }

  if (context && !current.contexts.some((entry) => entry.ko === context.ko)) {
    current.contexts.push(context);
  }

  bucket.set(key, current);
}

export function getPronunciationNote(text) {
  if (/[ㅋㅌㅍㅊ]/.test(text)) {
    return "含氣音（ㅋ／ㅌ／ㅍ／ㅊ）；發音時要讓氣流清楚送出。";
  }
  if (/[ㄲㄸㅃㅆㅉ]/.test(text)) {
    return "含緊音；聲帶保持緊實，發音短而集中，不要額外送氣。";
  }
  if (/ㅎ/.test(text)) {
    return "含 ㅎ；和相鄰音節連讀時可能產生送氣，請先慢速逐音節練習。";
  }
  if (/[ㄱ-ㅎ]$/.test(text) || /[각-힣]/.test(text)) {
    return "留意音節收尾與下一音節的連接；先慢讀，再用自然速度連讀。";
  }
  return "按音節清楚發音，再逐步加快到自然語速。";
}

export function buildVocabularyIndex(lessons) {
  const bucket = new Map();

  for (const lesson of lessons) {
    for (const dialogue of lesson.dialogues ?? []) {
      for (const dialogueLine of dialogue.lines ?? []) {
        const context = { ko: dialogueLine.ko, zh: dialogueLine.zh, label: dialogue.title };
        for (const token of dialogueLine.tokens ?? []) addCandidate(bucket, lesson, token, context);
      }
    }

    for (const item of lesson.vocabulary ?? []) addCandidate(bucket, lesson, item);
    for (const item of lesson.notes ?? []) addCandidate(bucket, lesson, item);

    for (const section of lesson.guide?.sections ?? []) {
      for (const item of section.words ?? []) addCandidate(bucket, lesson, item);
    }
    for (const practice of lesson.guide?.practice?.items ?? []) {
      addCandidate(bucket, lesson, practice.answer, {
        ko: practice.answer.text,
        zh: practice.answer.zh,
        label: lesson.guide.practice.heading
      });
    }
  }

  return [...bucket.values()]
    .map((item) => ({
      ...item,
      explanation: `「${item.text}」表示${item.zh.replace(/[。.]$/, "")}。`,
      pronunciationNote: getPronunciationNote(item.text),
      examples: [
        ...item.contexts.slice(0, 2),
        {
          ko: `오늘 “${item.text}” 표현을 연습합니다.`,
          zh: `今天練習「${item.text}」這個表達。`,
          label: "學習語境"
        }
      ].slice(0, 2)
    }))
    .sort((a, b) => a.text.localeCompare(b.text, "ko"));
}

