const koreanPattern = /[가-힣]/;
const finalJamo = [
  "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ",
  "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];

function getLastHangulBlock(text) {
  return [...text].reverse().find((character) => koreanPattern.test(character)) ?? "";
}

function getFinalConsonant(text) {
  const block = getLastHangulBlock(text);
  if (!block) return "";
  return finalJamo[(block.charCodeAt(0) - 0xac00) % 28] ?? "";
}

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

export function getPronunciationCases(text, roman) {
  const batchim = getFinalConsonant(text);
  const cases = [
    {
      label: "單獨念／句尾",
      condition: "後面沒有其他音節時",
      explanation: batchim
        ? `最後一個音節有收音 ${batchim}；先把收音留在音節尾端，不要另外加母音。`
        : "最後一個音節沒有收音，保持原本母音結尾。",
      example: `${text} → ${roman}`
    }
  ];

  if (batchim) {
    cases.push({
      label: "後接 ㅇ＋母音",
      condition: "下一音節以不發音的 ㅇ 開頭時",
      explanation: "收音通常移到下一音節開頭形成連音；字仍照原拼法寫，但實際聽感會跨越音節。",
      example: "옷 + 이 → 옷이 [오시]；밥 + 을 → 밥을 [바블]"
    });

    if (/[ㄱㄲㅋㄳㄺ]/.test(batchim)) {
      cases.push({
        label: "後接 ㄴ／ㅁ",
        condition: `收音 ${batchim} 後面接鼻音時`,
        explanation: "ㄱ 類收音常鼻音化為 ㅇ，讓前後發音位置銜接得更自然。",
        example: "국 + 물 → 국물 [궁물]；한국말 → [한궁말]"
      });
    } else if (/[ㄷㅅㅆㅈㅊㅌㅎ]/.test(batchim)) {
      cases.push({
        label: "後接 ㄴ／ㅁ",
        condition: `收音 ${batchim} 後面接鼻音時`,
        explanation: "ㄷ 類收音常鼻音化為 ㄴ。",
        example: "옷 + 맵시 → 옷맵시 [온맵씨]；있는 → [인는]"
      });
    } else if (/[ㅂㅍㄼㄿㅄ]/.test(batchim)) {
      cases.push({
        label: "後接 ㄴ／ㅁ",
        condition: `收音 ${batchim} 後面接鼻音時`,
        explanation: "ㅂ 類收音常鼻音化為 ㅁ。",
        example: "앞 + 문 → 앞문 [암문]；합니다 → [함니다]"
      });
    } else {
      cases.push({
        label: "後接子音",
        condition: "下一音節以一般子音開頭時",
        explanation: `收音 ${batchim} 通常保留在前一音節尾端，再銜接下一個子音。`,
        example: "산 + 길 → 산길 [산낄]；물 + 병 → 물병 [물뼝]"
      });
    }

    cases.push({
      label: "與 ㅎ 相遇",
      condition: "收音和下一音節的 ㅎ 相鄰時",
      explanation: "部分平音會和 ㅎ 合併成送氣音；實際變化依收音種類而定。",
      example: "축하 → [추카]；좋다 → [조타]；입학 → [이팍]"
    });
  } else {
    cases.push({
      label: "後接母音助詞",
      condition: "後面接 은／는、이／가 等助詞時",
      explanation: "因為本字沒有收音，不會發生收音移位；直接平順連接下一個音節。",
      example: "나 + 는 → 나는 [나는]；학교 + 에 → 학교에 [학꾜에]"
    });
    cases.push({
      label: "後接子音",
      condition: "下一個單字以子音開頭時",
      explanation: "保持原本母音結尾，再清楚帶出下一個字的起首子音。",
      example: "같이 + 가요 → 같이 가요 [가치 가요]；바다 + 보다 → 바다보다 [바다보다]"
    });
  }

  if (/[ㅋㅌㅍㅊ]/.test(text)) {
    cases.push({
      label: "氣音辨識",
      condition: "遇到 ㅋ／ㅌ／ㅍ／ㅊ 時",
      explanation: "這些音要明顯送氣；可以把手放在嘴前確認有一股氣流。",
      example: "달 [달] ↔ 탈 [탈]；불 [불] ↔ 풀 [풀]；자 [자] ↔ 차 [차]"
    });
  } else if (/[ㄲㄸㅃㅆㅉ]/.test(text)) {
    cases.push({
      label: "緊音辨識",
      condition: "遇到 ㄲ／ㄸ／ㅃ／ㅆ／ㅉ 時",
      explanation: "喉部保持緊實、聲音短而集中；不要像氣音那樣噴出大量氣流。",
      example: "가 [가] ↔ 까 [까] ↔ 카 [카]；자 [자] ↔ 짜 [짜] ↔ 차 [차]"
    });
  }

  return cases;
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
      pronunciationCases: getPronunciationCases(item.text, item.roman),
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
